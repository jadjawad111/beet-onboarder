import { useState, useEffect } from "react";
import { AlertOctagon, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface GateBlockProps {
  id: string;
  title: string;
  description: string;
  buttonText: string;
  children: React.ReactNode;
}

const GateBlock = ({ id, title, description, buttonText, children }: GateBlockProps) => {
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(`gate-${id}`);
    if (saved === "true") {
      setUnlocked(true);
    }
  }, [id]);

  const handleUnlock = () => {
    setUnlocked(true);
    localStorage.setItem(`gate-${id}`, "true");
  };

  if (!unlocked) {
    return (
      <div className="rounded-xl border-2 border-destructive/50 bg-destructive/10 p-8 my-6 text-center">
        <div className="w-16 h-16 rounded-full bg-destructive/20 flex items-center justify-center mx-auto mb-4">
          <ShieldAlert className="h-8 w-8 text-destructive" />
        </div>
        <h3 className="text-xl font-bold text-destructive mb-2">{title}</h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">{description}</p>
        <Button
          onClick={handleUnlock}
          variant="destructive"
          size="lg"
          className="font-semibold"
        >
          {buttonText}
        </Button>
      </div>
    );
  }

  return <>{children}</>;
};

export default GateBlock;
