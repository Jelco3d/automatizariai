import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.58.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface CalcomBooking {
  id: number;
  uid: string;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  duration: number;
  status: 'ACCEPTED' | 'PENDING' | 'CANCELLED';
  location?: string;
  meetingUrl?: string;
  attendees?: Array<{
    name: string;
    email: string;
    timeZone: string;
  }>;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const calcomApiKey = Deno.env.get('CAL_COM_API_KEY');

    if (!calcomApiKey) {
      throw new Error('CAL_COM_API_KEY not configured');
    }

    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get user from JWT
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);

    if (userError || !user) {
      throw new Error('Unauthorized');
    }

    const { date } = await req.json();
    
    // Default to today if no date provided
    const targetDate = date ? new Date(date) : new Date();
    const startOfDay = new Date(targetDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(targetDate.setHours(23, 59, 59, 999));

    console.log(`Fetching Cal.com bookings for ${startOfDay.toISOString()} to ${endOfDay.toISOString()}`);

    // Fetch bookings from Cal.com API
    const calcomResponse = await fetch(
      `https://api.cal.com/v2/bookings?afterStart=${startOfDay.toISOString()}&beforeEnd=${endOfDay.toISOString()}`,
      {
        headers: {
          'Authorization': `Bearer ${calcomApiKey}`,
          'Content-Type': 'application/json',
          'cal-api-version': '2024-08-13',
        },
      }
    );

    if (!calcomResponse.ok) {
      const errorText = await calcomResponse.text();
      console.error('Cal.com API error:', errorText);
      throw new Error(`Cal.com API error: ${calcomResponse.status}`);
    }

    const calcomData = await calcomResponse.json();
    const bookings: CalcomBooking[] = calcomData.data?.bookings || [];

    console.log(`Found ${bookings.length} bookings from Cal.com`);

    // Upsert bookings into database
    const upsertPromises = bookings.map(async (booking) => {
      const bookingData = {
        user_id: user.id,
        booking_id: String(booking.id),
        booking_uid: booking.uid,
        title: booking.title,
        description: booking.description || null,
        start_time: new Date(booking.startTime).toISOString(),
        end_time: new Date(booking.endTime).toISOString(),
        duration: booking.duration,
        status: booking.status.toLowerCase(),
        meeting_url: booking.meetingUrl || null,
        location: booking.location || null,
        attendees: booking.attendees || [],
        metadata: booking,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from('calendar_bookings')
        .upsert(bookingData, { 
          onConflict: 'user_id,booking_uid',
          ignoreDuplicates: false 
        });

      if (error) {
        console.error('Error upserting booking:', error);
        throw error;
      }
    });

    await Promise.all(upsertPromises);

    // Fetch updated bookings from database
    const { data: dbBookings, error: dbError } = await supabase
      .from('calendar_bookings')
      .select('*')
      .eq('user_id', user.id)
      .gte('start_time', startOfDay.toISOString())
      .lte('end_time', endOfDay.toISOString())
      .order('start_time', { ascending: true });

    if (dbError) {
      throw dbError;
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        bookings: dbBookings,
        count: dbBookings?.length || 0 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error syncing bookings:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false 
      }),
      { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
