import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface SignatureRequest {
  token: string;
  signatureType: 'provider' | 'client';
  signatureData?: string;
  signatureName?: string;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { token, signatureType, signatureData, signatureName }: SignatureRequest = await req.json();

    console.log('Processing signature submission:', { token, signatureType, hasData: !!signatureData, hasName: !!signatureName });

    // Validate input
    if (!token || !signatureType) {
      return new Response(
        JSON.stringify({ error: 'Token and signature type are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!signatureData && !signatureName) {
      return new Response(
        JSON.stringify({ error: 'Either signature data or signature name is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Fetch contract using service role to bypass RLS
    const { data: contract, error: fetchError } = await supabase
      .from('contracts')
      .select('*')
      .eq('signature_token', token)
      .single();

    if (fetchError || !contract) {
      console.error('Contract not found:', fetchError);
      return new Response(
        JSON.stringify({ error: 'Contract not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check if signature link has expired
    if (contract.signature_link_expires_at) {
      const expiresAt = new Date(contract.signature_link_expires_at);
      if (expiresAt < new Date()) {
        return new Response(
          JSON.stringify({ error: 'Signature link has expired' }),
          { status: 410, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    // Check if this party has already signed
    if (signatureType === 'provider' && contract.provider_signed_at) {
      return new Response(
        JSON.stringify({ error: 'Provider has already signed this contract' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (signatureType === 'client' && contract.client_signed_at) {
      return new Response(
        JSON.stringify({ error: 'Client has already signed this contract' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Prepare update data
    const updateData: any = {};
    const now = new Date().toISOString();

    if (signatureType === 'provider') {
      updateData.provider_signed_at = now;
      updateData.provider_signature_data = signatureData || null;
      updateData.provider_signature_name = signatureName || null;
    } else {
      updateData.client_signed_at = now;
      updateData.client_signature_data = signatureData || null;
      updateData.client_signature_name = signatureName || null;
    }

    // Check if both parties will have signed after this update
    const providerSigned = signatureType === 'provider' || contract.provider_signed_at;
    const clientSigned = signatureType === 'client' || contract.client_signed_at;

    if (providerSigned && clientSigned) {
      updateData.fully_signed_at = now;
      updateData.status = 'signed';
      console.log('Both parties signed - updating status to signed');
    }

    // Update contract using service role
    const { data: updatedContract, error: updateError } = await supabase
      .from('contracts')
      .update(updateData)
      .eq('id', contract.id)
      .select()
      .single();

    if (updateError) {
      console.error('Error updating contract:', updateError);
      return new Response(
        JSON.stringify({ error: 'Failed to save signature' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Signature saved successfully:', { 
      contractId: contract.id, 
      signatureType, 
      status: updatedContract.status 
    });

    return new Response(
      JSON.stringify({ 
        success: true, 
        contract: updatedContract,
        message: providerSigned && clientSigned 
          ? 'Contract is now fully signed!' 
          : 'Signature saved successfully. Waiting for the other party to sign.'
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
