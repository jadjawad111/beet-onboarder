import { useState, useEffect, useCallback } from "react";
import CharacteristicsGrid from "./CharacteristicsGrid";

interface Characteristic {
  title: string;
  description: string;
}

interface DualGridGateProps {
  rubricCharacteristics: Characteristic[];
  criterionCharacteristics: Characteristic[];
  onGateUnlock?: () => void;
}

/**
 * A wrapper that renders two CharacteristicsGrid components and only
 * calls onGateUnlock when BOTH grids have all items revealed.
 */
const DualGridGate = ({ 
  rubricCharacteristics, 
  criterionCharacteristics, 
  onGateUnlock 
}: DualGridGateProps) => {
  const [grid1Complete, setGrid1Complete] = useState(false);
  const [grid2Complete, setGrid2Complete] = useState(false);

  const handleGrid1Complete = useCallback(() => {
    setGrid1Complete(true);
  }, []);

  const handleGrid2Complete = useCallback(() => {
    setGrid2Complete(true);
  }, []);

  useEffect(() => {
    if (grid1Complete && grid2Complete && onGateUnlock) {
      onGateUnlock();
    }
  }, [grid1Complete, grid2Complete, onGateUnlock]);

  return (
    <div className="space-y-8">
      {/* Good Rubric section */}
      <div className="space-y-3">
        <div className="pb-2 border-b border-primary/30">
          <h3 className="text-lg font-bold text-primary">What makes a good Rubric?</h3>
          <p className="text-xs text-muted-foreground mt-1">Click each to learn more:</p>
        </div>
        <CharacteristicsGrid
          characteristics={rubricCharacteristics}
          onAllRevealed={handleGrid1Complete}
        />
      </div>

      {/* Good Criterion section */}
      <div className="space-y-3">
        <div className="pb-2 border-b border-primary/30">
          <h3 className="text-lg font-bold text-primary">What makes a good Criterion?</h3>
        </div>
        
        <div className="text-sm text-muted-foreground space-y-2">
          <p>
            A good criterion is written such that a judge model will be able to evaluate its output.
          </p>
          <p>
            Each criterion should measure one meaningful aspect of the output, provide enough clarity to judge it reliably, and be structured so it can be programmatically evaluated by a judge model.
          </p>
          <p>
            Because criteria are evaluated automatically and in isolation, they must follow specific rules.
          </p>
        </div>
        
        <p className="text-xs text-muted-foreground pt-2">Click each to learn more:</p>
        
        <CharacteristicsGrid
          characteristics={criterionCharacteristics}
          onAllRevealed={handleGrid2Complete}
        />
      </div>
      
      <p className="text-sm text-muted-foreground italic pt-4 border-t border-border">
        This section gives you intuition for why these rules matter. Next, we will deep dive into each guideline with concrete definitions, good and bad examples, and common mistakes to avoid when writing criteria.
      </p>
    </div>
  );
};

export default DualGridGate;