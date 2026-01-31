import { FileSpreadsheet, FileText, ExternalLink, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface InputFileExampleSlideProps {
  exampleNumber: number;
  title: string;
  domain: string;
  promptExcerpt: React.ReactNode;
  inputFileDescription: string;
  inputFileUrl?: string;
  inputFileName?: string;
  referenceHighlights: {
    quote: string;
    explanation: string;
  }[];
  qualityNotes: string[];
}

const InputFileExampleSlide = ({
  exampleNumber,
  title,
  domain,
  promptExcerpt,
  inputFileDescription,
  inputFileUrl,
  inputFileName,
  referenceHighlights,
  qualityNotes,
}: InputFileExampleSlideProps) => {
  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
          Example #{exampleNumber}: {domain}
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">
          {title}
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Left: Prompt Excerpt */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <FileText className="w-4 h-4" />
            Prompt Excerpt
          </div>
          <Card className="bg-muted/30 border-dashed">
            <CardContent className="p-4">
              <div className="text-sm leading-relaxed text-foreground max-h-[300px] overflow-y-auto">
                {promptExcerpt}
              </div>
            </CardContent>
          </Card>

          {/* Input File Link */}
          {inputFileUrl && (
            <Card className="border-primary/30 bg-primary/5">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <FileSpreadsheet className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-muted-foreground">Input File</p>
                      <p className="font-medium text-foreground text-sm">
                        {inputFileName || inputFileDescription}
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <a href={inputFileUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-1" />
                      View
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right: How it's referenced */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <CheckCircle2 className="w-4 h-4 text-green-600" />
            How the Input is Referenced
          </div>
          
          <div className="space-y-3">
            {referenceHighlights.map((highlight, idx) => (
              <Card key={idx} className="border-green-500/30 bg-green-500/5">
                <CardContent className="p-4">
                  <p className="text-sm font-medium text-green-700 dark:text-green-400 mb-2 italic">
                    "{highlight.quote}"
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {highlight.explanation}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quality notes */}
          <Card>
            <CardContent className="p-4">
              <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">Why this works</p>
              <ul className="space-y-1">
                {qualityNotes.map((note, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-foreground">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    {note}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InputFileExampleSlide;
