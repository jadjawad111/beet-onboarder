import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, PenLine } from "lucide-react";
import { cn } from "@/lib/utils";

interface PracticeBlockProps {
  id: string;
  prompt: string;
  exampleAnswer: string;
}

const PracticeBlock = ({ id, prompt, exampleAnswer }: PracticeBlockProps) => {
  const [response, setResponse] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(`practice-${id}`);
    if (saved) {
      setResponse(saved);
    }
  }, [id]);

  const handleChange = (value: string) => {
    setResponse(value);
    localStorage.setItem(`practice-${id}`, value);
  };

  return (
    <div className="rounded-xl border-2 border-accent bg-accent/10 p-6 my-6">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
          <PenLine className="h-5 w-5 text-accent-foreground" />
        </div>
        <div>
          <h4 className="font-semibold">Practice Exercise</h4>
          <p className="text-sm text-muted-foreground">{prompt}</p>
        </div>
      </div>

      <Textarea
        value={response}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Write your response here..."
        className="min-h-[150px] mb-4"
      />

      <Button
        variant="outline"
        onClick={() => setShowAnswer(!showAnswer)}
        className="gap-2"
      >
        {showAnswer ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        {showAnswer ? "Hide Example Answer" : "Show Example Answer"}
      </Button>

      <div
        className={cn(
          "overflow-hidden transition-all duration-300",
          showAnswer ? "max-h-[500px] opacity-100 mt-4" : "max-h-0 opacity-0"
        )}
      >
        <div className="p-4 rounded-lg bg-muted border">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
            Example Answer
          </p>
          <p className="text-sm whitespace-pre-wrap">{exampleAnswer}</p>
        </div>
      </div>
    </div>
  );
};

export default PracticeBlock;
