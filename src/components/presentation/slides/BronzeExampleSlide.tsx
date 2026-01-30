import { ExternalLink } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface BronzeExampleSlideProps {
  exampleNumber: number;
  promptText: string;
  bronzeFileName: string;
  embedUrl: string;
  viewUrl: string;
}

const BronzeExampleSlide = ({
  exampleNumber,
  promptText,
  bronzeFileName,
  embedUrl,
  viewUrl,
}: BronzeExampleSlideProps) => {
  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-4">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">
          Bronze Response Example #{exampleNumber}
        </h2>
        <p className="text-muted-foreground text-sm mt-1">
          Prompt on top, Bronze response below
        </p>
      </div>

      {/* Stacked vertically with larger sizes */}
      <div className="space-y-4">
        {/* Prompt - taller */}
        <div className="border rounded-lg bg-card overflow-hidden">
          <div className="px-4 py-2 border-b bg-muted/30">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Prompt
            </h3>
          </div>
          <ScrollArea className="h-[280px]">
            <div className="p-4">
              <pre className="whitespace-pre-wrap text-sm text-foreground font-sans leading-relaxed">
                {promptText}
              </pre>
            </div>
          </ScrollArea>
        </div>

        {/* Bronze Response (embedded) - larger with zoom out */}
        <div className="border rounded-lg bg-card overflow-hidden">
          <div className="px-4 py-2 border-b bg-muted/30 flex items-center justify-between">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Bronze Response
            </h3>
            <a
              href={viewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline"
            >
              {bronzeFileName}
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <div className="h-[500px] bg-muted/5 overflow-hidden">
            {/* Use CSS transform to zoom out the iframe content */}
            <div className="w-[125%] h-[125%] origin-top-left" style={{ transform: "scale(0.8)" }}>
              <iframe
                src={embedUrl}
                className="w-full h-full border-0"
                title={bronzeFileName}
                allow="autoplay"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BronzeExampleSlide;
