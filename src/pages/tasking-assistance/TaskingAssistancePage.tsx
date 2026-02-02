import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Send, Loader2, CheckCircle2, Upload, X, FileText, Image as ImageIcon, Sparkles } from "lucide-react";
import FeedbackDisplay from "@/components/tasking-assistance/FeedbackDisplay";

interface UploadedFile {
  file: File;
  preview?: string;
}

const TaskingAssistancePage = () => {
  const [taskId, setTaskId] = useState("");
  const [promptText, setPromptText] = useState("");
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    
    if (files.length + selectedFiles.length > 5) {
      toast({
        title: "Too many files",
        description: "You can upload a maximum of 5 files.",
        variant: "destructive",
      });
      return;
    }

    const validFiles = selectedFiles.filter(file => {
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: `${file.name} exceeds 10MB limit.`,
          variant: "destructive",
        });
        return false;
      }
      return true;
    });

    const newFiles: UploadedFile[] = validFiles.map(file => ({
      file,
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
    }));

    setFiles(prev => [...prev, ...newFiles]);
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => {
      const newFiles = [...prev];
      if (newFiles[index].preview) {
        URL.revokeObjectURL(newFiles[index].preview!);
      }
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  const uploadFiles = async (): Promise<string[]> => {
    const urls: string[] = [];
    
    for (const { file } of files) {
      const timestamp = Date.now();
      const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const filePath = `${timestamp}-${sanitizedName}`;
      
      const { error } = await supabase.storage
        .from('prompt-attachments')
        .upload(filePath, file);
      
      if (error) throw error;
      
      const { data: urlData } = supabase.storage
        .from('prompt-attachments')
        .getPublicUrl(filePath);
      
      urls.push(urlData.publicUrl);
    }
    
    return urls;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!promptText.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter your prompt text.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const attachmentUrls = files.length > 0 ? await uploadFiles() : [];

      const { data, error } = await supabase.from("prompt_submissions").insert({
        task_id: taskId.trim() || null,
        prompt_text: promptText.trim(),
        submission_type: "prompt",
        attachment_urls: attachmentUrls,
      }).select().single();

      if (error) throw error;

      // Trigger Zapier webhook
      try {
        await fetch("https://hooks.zapier.com/hooks/catch/25935708/ul9kd5j/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          mode: "no-cors",
          body: JSON.stringify({
            id: data.id,
            task_id: data.task_id,
            prompt_text: data.prompt_text,
            attachment_urls: data.attachment_urls,
            created_at: data.created_at,
          }),
        });
      } catch (webhookError) {
        console.error("Zapier webhook failed:", webhookError);
      }

      setSubmittedId(data.id);
      toast({
        title: "Prompt Submitted!",
        description: "Your prompt has been submitted for feedback.",
      });

      files.forEach(f => {
        if (f.preview) URL.revokeObjectURL(f.preview);
      });
      
      setTaskId("");
      setPromptText("");
      setFiles([]);
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

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) return <ImageIcon className="h-4 w-4" />;
    return <FileText className="h-4 w-4" />;
  };

  // Show feedback view after submission
  if (submittedId) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center px-4 py-12">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-6">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-3xl font-semibold text-foreground mb-3">
              Beet Tasking Assistant
            </h1>
          </div>
          <FeedbackDisplay
            submissionId={submittedId}
            onClose={() => setSubmittedId(null)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center px-4 py-12 relative">
      {/* WIP Sticker */}
      <div className="absolute top-6 right-6 z-10">
        <div className="relative">
          <div className="bg-warning text-warning-foreground font-bold text-lg px-6 py-3 rounded-lg shadow-lg transform rotate-12 border-4 border-warning-foreground/20">
            🚧 WORK IN PROGRESS 🚧
          </div>
        </div>
      </div>

      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-6">
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-3xl font-semibold text-foreground mb-3">
            Beet Tasking Assistant
          </h1>
          <p className="text-muted-foreground">
            Submit your prompt and input files for automated feedback
          </p>
          <p className="text-sm text-muted-foreground/70 mt-2 max-w-md mx-auto">
            Note: This tool provides general direction on how to improve your task. 
            It will not catch everything and may sometimes overflag issues.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Step 1: Task ID */}
          <Card className="border bg-card/50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Step 1
                </span>
                <span className="text-sm font-medium text-foreground">Task ID</span>
              </div>
              <Input
                id="taskId"
                placeholder="Enter your task ID (optional)"
                value={taskId}
                onChange={(e) => setTaskId(e.target.value)}
                disabled={isSubmitting}
                className="bg-muted/30 border-muted"
              />
            </CardContent>
          </Card>

          {/* Step 2: Prompt */}
          <Card className="border bg-card/50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Step 2
                </span>
                <span className="text-sm font-medium text-foreground">Prompt</span>
              </div>
              <Textarea
                id="prompt"
                placeholder="Input your Prompt, Prompt Context, and Formatting Context here"
                value={promptText}
                onChange={(e) => setPromptText(e.target.value)}
                className="min-h-[160px] resize-y bg-muted/30 border-muted"
                disabled={isSubmitting}
              />
              <p className="text-xs text-muted-foreground mt-2">
                {promptText.length} characters
              </p>
            </CardContent>
          </Card>

          {/* Step 3: File Upload */}
          <Card className="border bg-card/50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Step 3
                </span>
                <span className="text-sm font-medium text-foreground">Input Files</span>
                <span className="text-xs text-muted-foreground">(optional)</span>
              </div>
              
              <div 
                className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary/30 transition-colors cursor-pointer bg-muted/20"
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  onChange={handleFileSelect}
                  className="hidden"
                  accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg,.gif,.xlsx,.xls,.csv,.ppt,.pptx,.rtf,.odt,.ods,.odp,.json,.xml,.md,.html"
                  disabled={isSubmitting || files.length >= 5}
                />
                <Upload className="h-8 w-8 text-muted-foreground/50 mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">
                  Click to upload a file
                </p>
                <p className="text-xs text-muted-foreground/70 mt-1">
                  XLSX, PPTX, PDF, DOCX (max 10MB)
                </p>
              </div>

              {files.length > 0 && (
                <div className="mt-4 space-y-2">
                  {files.map((uploadedFile, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border"
                    >
                      {uploadedFile.preview ? (
                        <img
                          src={uploadedFile.preview}
                          alt={uploadedFile.file.name}
                          className="w-10 h-10 object-cover rounded"
                        />
                      ) : (
                        <div className="w-10 h-10 flex items-center justify-center bg-muted rounded">
                          {getFileIcon(uploadedFile.file)}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {uploadedFile.file.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {(uploadedFile.file.size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFile(index)}
                        disabled={isSubmitting}
                        className="h-8 w-8"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full h-12 text-base font-medium"
            disabled={isSubmitting}
            size="lg"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="h-5 w-5" />
                Submit for Feedback
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default TaskingAssistancePage;
