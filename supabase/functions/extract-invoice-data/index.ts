import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import pdfParse from "npm:pdf-parse@1.1.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { filePath } = await req.json();
    
    if (!filePath) {
      throw new Error('File path is required');
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!LOVABLE_API_KEY || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error('Missing required environment variables');
    }

    console.log('Extracting invoice data from:', filePath);

    // Initialize Supabase client
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Download the PDF file from storage
    const { data: fileData, error: downloadError } = await supabase.storage
      .from('payable-invoices-pdfs')
      .download(filePath);

    if (downloadError) {
      console.error('Error downloading file:', downloadError);
      throw new Error('Failed to download PDF file');
    }

    // Convert file to buffer for pdf-parse
    const arrayBuffer = await fileData.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    
    console.log('File downloaded, extracting text with pdf-parse...');

    // Extract text from PDF using pdf-parse
    const pdfData = await pdfParse(buffer);
    const fullText = pdfData.text;

    console.log('Text extracted from PDF, length:', fullText.length);
    console.log('PDF info - Pages:', pdfData.numpages, 'Version:', pdfData.version);

    // Prepare the AI request with tool calling for structured extraction
    const aiPayload = {
      model: "google/gemini-2.5-flash",
      messages: [
        {
          role: "system",
          content: `You are an expert at extracting structured data from invoices. 
Extract the following information accurately from the provided invoice text:
- Supplier name (Furnizor/Vânzător/From/Vendor)
- Supplier CUI/CIF (Tax registration number/VAT ID/Tax ID)
- Invoice number (Număr factură/Invoice number/Invoice #)
- Issue date (Data emiterii/Invoice date/Date)
- Due date (Data scadentă/Data plății/Due date/Payment due)
- Total amount (Total de plată/Amount due/Total)

Return the data in the specified format. If a field is not found, return null for that field.
For dates, use YYYY-MM-DD format.
For total amount, extract only the numeric value without currency symbols.`
        },
        {
          role: "user",
          content: `Please extract the invoice data from this invoice text:\n\n${fullText}`
        }
      ],
      tools: [
        {
          type: "function",
          function: {
            name: "extract_invoice_data",
            description: "Extract structured invoice data from the document",
            parameters: {
              type: "object",
              properties: {
                supplier_name: {
                  type: "string",
                  description: "The name of the supplier/vendor"
                },
                supplier_cui: {
                  type: "string",
                  description: "The CUI/CIF tax registration number"
                },
                invoice_number: {
                  type: "string",
                  description: "The invoice number"
                },
                issue_date: {
                  type: "string",
                  description: "The issue date in YYYY-MM-DD format"
                },
                due_date: {
                  type: "string",
                  description: "The due date in YYYY-MM-DD format"
                },
                total: {
                  type: "number",
                  description: "The total amount to pay (numeric value only)"
                }
              },
              required: ["supplier_name", "invoice_number", "issue_date", "due_date", "total"],
              additionalProperties: false
            }
          }
        }
      ],
      tool_choice: {
        type: "function",
        function: { name: "extract_invoice_data" }
      }
    };

    console.log('Calling Lovable AI for extraction...');

    // Call Lovable AI
    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(aiPayload),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('AI API error:', aiResponse.status, errorText);
      throw new Error(`AI extraction failed: ${errorText}`);
    }

    const aiData = await aiResponse.json();
    console.log('AI response received:', JSON.stringify(aiData, null, 2));

    // Extract the tool call response
    const toolCall = aiData.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall || toolCall.function.name !== "extract_invoice_data") {
      throw new Error('No valid invoice data extraction in AI response');
    }

    const extractedData = JSON.parse(toolCall.function.arguments);
    console.log('Extracted invoice data:', extractedData);

    return new Response(
      JSON.stringify({ success: true, data: extractedData }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Error in extract-invoice-data function:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});