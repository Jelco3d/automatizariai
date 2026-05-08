import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const GATEWAY_URL = "https://connector-gateway.lovable.dev/google_calendar/calendar/v3";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const GOOGLE_CALENDAR_API_KEY = Deno.env.get("GOOGLE_CALENDAR_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");
    if (!GOOGLE_CALENDAR_API_KEY) throw new Error("GOOGLE_CALENDAR_API_KEY is not configured");

    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const token = authHeader.replace("Bearer ", "");
    const { data: claimsData, error: claimsError } = await supabase.auth.getClaims(token);
    if (claimsError || !claimsData?.claims) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const userId = claimsData.claims.sub as string;

    const body = await req.json().catch(() => ({}));
    const dateStr = body?.date as string | undefined;
    const center = dateStr ? new Date(dateStr) : new Date();
    const timeMin = new Date(center);
    timeMin.setDate(timeMin.getDate() - 1);
    timeMin.setHours(0, 0, 0, 0);
    const timeMax = new Date(center);
    timeMax.setDate(timeMax.getDate() + 30);
    timeMax.setHours(23, 59, 59, 999);

    const params = new URLSearchParams({
      timeMin: timeMin.toISOString(),
      timeMax: timeMax.toISOString(),
      singleEvents: "true",
      orderBy: "startTime",
      maxResults: "250",
    });

    const gcalRes = await fetch(
      `${GATEWAY_URL}/calendars/primary/events?${params.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "X-Connection-Api-Key": GOOGLE_CALENDAR_API_KEY,
        },
      }
    );

    if (!gcalRes.ok) {
      const errText = await gcalRes.text();
      throw new Error(`Google Calendar API failed [${gcalRes.status}]: ${errText}`);
    }

    const gcal = await gcalRes.json();
    const events: any[] = gcal.items || [];

    const rows = events
      .filter((e) => e.start && (e.start.dateTime || e.start.date))
      .map((e) => {
        const startISO = e.start.dateTime || `${e.start.date}T00:00:00Z`;
        const endISO = e.end?.dateTime || (e.end?.date ? `${e.end.date}T00:00:00Z` : startISO);
        const start = new Date(startISO);
        const end = new Date(endISO);
        const duration = Math.max(0, Math.round((end.getTime() - start.getTime()) / 60000));

        let meetingUrl: string | null = e.hangoutLink || null;
        if (!meetingUrl && e.conferenceData?.entryPoints?.length) {
          const ep = e.conferenceData.entryPoints.find((p: any) => p.uri) || e.conferenceData.entryPoints[0];
          meetingUrl = ep?.uri || null;
        }

        const status =
          e.status === "cancelled" ? "cancelled" : e.status === "tentative" ? "tentative" : "accepted";

        const attendees = Array.isArray(e.attendees)
          ? e.attendees.map((a: any) => ({
              email: a.email,
              name: a.displayName || a.email,
              responseStatus: a.responseStatus,
            }))
          : [];

        return {
          user_id: userId,
          booking_id: String(e.id),
          booking_uid: String(e.iCalUID || e.id),
          title: e.summary || "(fără titlu)",
          description: e.description || null,
          start_time: start.toISOString(),
          end_time: end.toISOString(),
          duration,
          status,
          meeting_url: meetingUrl,
          location: e.location || null,
          attendees,
          metadata: e,
        };
      });

    if (rows.length > 0) {
      // Delete existing rows in window for this user, then insert fresh
      await supabase
        .from("calendar_bookings")
        .delete()
        .eq("user_id", userId)
        .gte("start_time", timeMin.toISOString())
        .lte("start_time", timeMax.toISOString());

      const { error: insertError } = await supabase.from("calendar_bookings").insert(rows);
      if (insertError) throw new Error(`DB insert failed: ${insertError.message}`);
    }

    return new Response(JSON.stringify({ count: rows.length }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("sync-google-calendar error:", error);
    const msg = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
