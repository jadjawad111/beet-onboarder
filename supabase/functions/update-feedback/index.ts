import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return new Response(
        JSON.stringify({ error: "Missing id" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Extract the feedback - it could be the entire body minus the id, or a nested feedback object
    let feedbackData: unknown;
    if (body.feedback) {
      // If feedback is explicitly provided as a field
      feedbackData = body.feedback;
    } else {
      // Otherwise, use all fields except id as the feedback
      const { id: _, ...rest } = body;
      feedbackData = rest;
    }

    // Store feedback as JSON string
    const feedbackString = typeof feedbackData === 'string' 
      ? feedbackData 
      : JSON.stringify(feedbackData);

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { data, error } = await supabase
      .from("prompt_submissions")
      .update({ feedback: feedbackString, status: "completed" })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating feedback:", error);
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, data }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
