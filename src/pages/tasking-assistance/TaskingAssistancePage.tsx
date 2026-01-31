import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Send, Loader2, CheckCircle2 } from "lucide-react";
import beetIcon from "@/assets/beet-icon.png";

const TaskingAssistancePage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [promptText, setPromptText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !promptText.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter your name and prompt text.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("prompt_submissions").insert({
        submitter_name: name.trim(),
        submitter_email: email.trim() || null,
        prompt_text: promptText.trim(),
        submission_type: "prompt",
      });

      if (error) throw error;

      setIsSubmitted(true);
      toast({
        title: "Prompt Submitted!",
        description: "Your prompt has been submitted for feedback. You'll receive a response soon.",
      });

      // Reset form after short delay
      setTimeout(() => {
        setName("");
        setEmail("");
        setPromptText("");
        setIsSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error("Error submitting prompt:", error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your prompt. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-6 md:p-10">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <img src={beetIcon} alt="Beet" className="w-12 h-12" />
          <div>
            <h1 className="text-3xl font-bold text-foreground">Beet Tasking Assistant</h1>
            <p className="text-muted-foreground">Submit your prompts for automated feedback</p>
          </div>
        </div>

        {/* Submission Form */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Send className="h-5 w-5 text-primary" />
              Submit a Prompt for Feedback
            </CardTitle>
            <CardDescription>
              Enter your prompt below and our automated system will provide feedback to help you improve.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name *</Label>
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email (optional)</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="prompt">Your Prompt *</Label>
                <Textarea
                  id="prompt"
                  placeholder="Paste or type your prompt here..."
                  value={promptText}
                  onChange={(e) => setPromptText(e.target.value)}
                  className="min-h-[200px] resize-y"
                  disabled={isSubmitting}
                />
                <p className="text-xs text-muted-foreground">
                  {promptText.length} characters
                </p>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting || isSubmitted}
                size="lg"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : isSubmitted ? (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    Submitted!
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Submit for Feedback
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="mt-6 bg-muted/50">
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-2">How it works</h3>
            <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
              <li>Enter your name and paste your prompt above</li>
              <li>Click submit to send it for review</li>
              <li>Our automated system will analyze your prompt</li>
              <li>You'll receive feedback to help improve your prompt writing</li>
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TaskingAssistancePage;
