import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const lovableApiKey = Deno.env.get('LOVABLE_API_KEY')!;

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log('Starting business insights generation...');

    // Get all users with admin role
    const { data: adminUsers, error: adminError } = await supabase
      .from('user_roles')
      .select('user_id')
      .eq('role', 'admin');

    if (adminError) {
      console.error('Error fetching admin users:', adminError);
      throw adminError;
    }

    if (!adminUsers || adminUsers.length === 0) {
      console.log('No admin users found');
      return new Response(
        JSON.stringify({ message: 'No admin users to process' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Processing ${adminUsers.length} admin user(s)`);

    // Process each admin user
    for (const admin of adminUsers) {
      await generateInsightsForUser(supabase, lovableApiKey, admin.user_id);
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        message: `Insights generated for ${adminUsers.length} user(s)`
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in generate-business-insights:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

async function generateInsightsForUser(supabase: any, lovableApiKey: string, userId: string) {
  console.log(`Generating insights for user: ${userId}`);

  // Define time period (last 7 days)
  const periodEnd = new Date();
  const periodStart = new Date();
  periodStart.setDate(periodStart.getDate() - 7);

  // Fetch business data
  const [invoicesData, quotesData, contractsData, clientsData] = await Promise.all([
    supabase.from('invoices').select('*').gte('created_at', periodStart.toISOString()),
    supabase.from('quotes').select('*').gte('created_at', periodStart.toISOString()),
    supabase.from('contracts').select('*').gte('created_at', periodStart.toISOString()),
    supabase.from('clients').select('*').gte('created_at', periodStart.toISOString())
  ]);

  const invoices = invoicesData.data || [];
  const quotes = quotesData.data || [];
  const contracts = contractsData.data || [];
  const clients = clientsData.data || [];

  // Calculate metrics
  const metrics = {
    newInvoices: invoices.length,
    newQuotes: quotes.length,
    newContracts: contracts.length,
    newClients: clients.length,
    totalRevenue: invoices
      .filter((inv: any) => inv.status === 'paid')
      .reduce((sum: number, inv: any) => sum + Number(inv.total), 0),
    pendingInvoices: invoices.filter((inv: any) => inv.status === 'pending').length,
    overdueInvoices: invoices.filter((inv: any) => inv.status === 'overdue').length,
    activeContracts: contracts.filter((c: any) => 
      !c.end_date || new Date(c.end_date) >= new Date()
    ).length,
    quotesConverted: quotes.filter((q: any) => q.status === 'accepted').length,
  };

  // Prepare data for AI analysis
  const businessData = {
    period: `${periodStart.toLocaleDateString('ro-RO')} - ${periodEnd.toLocaleDateString('ro-RO')}`,
    metrics,
    invoices: invoices.map((inv: any) => ({
      status: inv.status,
      total: inv.total,
      due_date: inv.due_date,
      created_at: inv.created_at
    })),
    quotes: quotes.map((q: any) => ({
      status: q.status,
      total: q.total,
      created_at: q.created_at
    })),
    contracts: contracts.map((c: any) => ({
      status: c.status,
      total_value: c.total_value,
      contract_type: c.contract_type
    }))
  };

  // Call AI for analysis
  const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${lovableApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'google/gemini-2.5-flash',
      messages: [
        {
          role: 'system',
          content: `Ești un asistent AI pentru analiza afacerii. Analizează datele de business și generează insights utile, recomandări și observații în limba română. 
          
Răspunde în format JSON strict cu această structură:
{
  "summary": "Un rezumat al situației curente a afacerii (2-3 propoziții)",
  "insights": [
    {
      "title": "Titlu insight",
      "description": "Descriere detaliată",
      "type": "positive" | "warning" | "neutral"
    }
  ],
  "recommendations": [
    "Recomandare 1",
    "Recomandare 2",
    "Recomandare 3"
  ]
}`
        },
        {
          role: 'user',
          content: `Analizează datele următoare de business și oferă insights detaliate:\n\n${JSON.stringify(businessData, null, 2)}`
        }
      ]
    }),
  });

  if (!aiResponse.ok) {
    const errorText = await aiResponse.text();
    console.error('AI API error:', aiResponse.status, errorText);
    throw new Error(`AI API error: ${aiResponse.status}`);
  }

  const aiData = await aiResponse.json();
  const aiContent = aiData.choices[0].message.content;
  
  // Parse AI response
  let aiAnalysis;
  try {
    // Extract JSON from markdown code blocks if present
    const jsonMatch = aiContent.match(/```json\s*([\s\S]*?)\s*```/) || 
                     aiContent.match(/```\s*([\s\S]*?)\s*```/);
    const jsonStr = jsonMatch ? jsonMatch[1] : aiContent;
    aiAnalysis = JSON.parse(jsonStr);
  } catch (parseError) {
    console.error('Error parsing AI response:', parseError);
    console.log('AI response was:', aiContent);
    // Fallback to basic structure
    aiAnalysis = {
      summary: 'Nu s-au putut genera insights automate.',
      insights: [],
      recommendations: []
    };
  }

  // Save insights to database
  const { error: insertError } = await supabase
    .from('business_insights')
    .insert({
      user_id: userId,
      insights: aiAnalysis.insights || [],
      summary: aiAnalysis.summary || 'Niciun rezumat disponibil',
      metrics,
      recommendations: aiAnalysis.recommendations || [],
      period_start: periodStart.toISOString(),
      period_end: periodEnd.toISOString()
    });

  if (insertError) {
    console.error('Error saving insights:', insertError);
    throw insertError;
  }

  console.log(`Insights generated successfully for user: ${userId}`);
}
