import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Send, Loader2, CheckCircle2, Upload, X, FileText, Image as ImageIcon } from "lucide-react";
import beetIcon from "@/assets/beet-icon.png";

interface UploadedFile {
  file: File;
  preview?: string;
}

const TaskingAssistancePage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [promptText, setPromptText] = useState("");
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    
    // Limit to 5 files
    if (files.length + selectedFiles.length > 5) {
      toast({
        title: "Too many files",
        description: "You can upload a maximum of 5 files.",
        variant: "destructive",
      });
      return;
    }

    // Check file sizes (max 10MB each)
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
    
    // Reset input
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
      // Upload files first
      const attachmentUrls = files.length > 0 ? await uploadFiles() : [];

      const { error } = await supabase.from("prompt_submissions").insert({
        submitter_name: name.trim(),
        submitter_email: email.trim() || null,
        prompt_text: promptText.trim(),
        submission_type: "prompt",
        attachment_urls: attachmentUrls,
      });

      if (error) throw error;

      setIsSubmitted(true);
      toast({
        title: "Prompt Submitted!",
        description: "Your prompt has been submitted for feedback. You'll receive a response soon.",
      });

      // Cleanup file previews
      files.forEach(f => {
        if (f.preview) URL.revokeObjectURL(f.preview);
      });

      // Reset form after short delay
      setTimeout(() => {
        setName("");
        setEmail("");
        setPromptText("");
        setFiles([]);
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

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) return <ImageIcon className="h-4 w-4" />;
    return <FileText className="h-4 w-4" />;
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

              {/* File Upload Section */}
              <div className="space-y-3">
                <Label>Attachments (optional)</Label>
                <div className="border-2 border-dashed rounded-lg p-4 text-center hover:border-primary/50 transition-colors">
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    onChange={handleFileSelect}
                    className="hidden"
                    accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg,.gif,.xlsx,.xls,.csv,.ppt,.pptx,.rtf,.odt,.ods,.odp,.json,.xml,.md,.html"
                    disabled={isSubmitting}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isSubmitting || files.length >= 5}
                    className="gap-2"
                  >
                    <Upload className="h-4 w-4" />
                    Upload Files
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">
                    PDF, Word, Excel, PowerPoint, CSV, images, and more (max 10MB each, up to 5 files)
                  </p>
                </div>

                {/* File List */}
                {files.length > 0 && (
                  <div className="space-y-2">
                    {files.map((uploadedFile, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-2 rounded-lg bg-muted/50 border"
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
              <li>Optionally attach input files (PDFs, images, documents)</li>
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
