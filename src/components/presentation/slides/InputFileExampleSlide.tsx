import { FileSpreadsheet, FileText, ExternalLink, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface InputFileExampleSlideProps {
  exampleNumber: number;
  title: string;
  domain: string;
  promptExcerpt: React.ReactNode;
  inputFileDescription: string;
  inputFileUrl?: string;
  inputFileEmbedUrl?: string;
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
  inputFileEmbedUrl,
  inputFileName,
  referenceHighlights,
  qualityNotes,
}: InputFileExampleSlideProps) => {
  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-4">
        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
          Example #{exampleNumber}: {domain}
        </p>
        <h2 className="text-xl md:text-2xl font-bold text-foreground">
          {title}
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Left Column: Prompt + How Referenced */}
        <div className="space-y-4">
          {/* Prompt Excerpt */}
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
              <FileText className="w-4 h-4" />
              Prompt Excerpt
            </div>
            <Card className="bg-muted/30 border-dashed">
              <CardContent className="p-3">
                <div className="text-sm leading-relaxed text-foreground max-h-[180px] overflow-y-auto">
                  {promptExcerpt}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* How it's referenced */}
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              How the Input is Referenced
            </div>
            <div className="space-y-2">
              {referenceHighlights.map((highlight, idx) => (
                <Card key={idx} className="border-primary/30 bg-primary/5">
                  <CardContent className="p-3">
                    <p className="text-sm font-medium text-primary mb-1 italic">
                      "{highlight.quote}"
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {highlight.explanation}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Quality notes */}
          <Card>
            <CardContent className="p-3">
              <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">Why this works</p>
              <ul className="space-y-1">
                {qualityNotes.map((note, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-foreground">
                    <CheckCircle2 className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" />
                    {note}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Input File Embed */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <FileSpreadsheet className="w-4 h-4" />
              Input File: {inputFileName || inputFileDescription}
            </div>
            {inputFileUrl && (
              <Button variant="ghost" size="sm" asChild className="h-7 text-xs">
                <a href={inputFileUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-3 h-3 mr-1" />
                  Open
                </a>
              </Button>
            )}
          </div>
          
          {inputFileEmbedUrl ? (
            <div className="rounded-lg border bg-background overflow-hidden h-[400px]">
              <iframe
                src={inputFileEmbedUrl}
                className="w-full h-full"
                title={inputFileName || inputFileDescription}
                allow="autoplay"
              />
            </div>
          ) : inputFileUrl ? (
            <Card className="border-primary/30 bg-primary/5 h-[400px] flex items-center justify-center">
              <CardContent className="text-center">
                <FileSpreadsheet className="w-12 h-12 text-primary/40 mx-auto mb-3" />
                <p className="text-sm text-muted-foreground mb-3">
                  Preview not available for this file type
                </p>
                <Button variant="outline" size="sm" asChild>
                  <a href={inputFileUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Open in New Tab
                  </a>
                </Button>
              </CardContent>
            </Card>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default InputFileExampleSlide;
