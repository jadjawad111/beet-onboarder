import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Check, RotateCcw } from "lucide-react";
import BeetIcon from "./BeetIcon";

interface ChecklistItem {
  id: string;
  label: string;
  subItems?: string[];
}

interface ChecklistGroup {
  title: string;
  requirement: string;
  items: ChecklistItem[];
  requireAll?: boolean;
}

interface ChecklistBoardProps {
  groups: ChecklistGroup[];
  storagePrefix: string;
}

const ChecklistBoard = ({ groups, storagePrefix }: ChecklistBoardProps) => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(`${storagePrefix}-checklist`);
    if (saved) {
      setCheckedItems(JSON.parse(saved));
    }
  }, [storagePrefix]);

  // Save to localStorage
  const handleToggle = (itemId: string) => {
    const newChecked = { ...checkedItems, [itemId]: !checkedItems[itemId] };
    setCheckedItems(newChecked);
    localStorage.setItem(`${storagePrefix}-checklist`, JSON.stringify(newChecked));
  };

  // Clear all items in a group
  const handleClearGroup = (group: ChecklistGroup) => {
    const newChecked = { ...checkedItems };
    group.items.forEach((item) => {
      delete newChecked[item.id];
      if (item.subItems) {
        item.subItems.forEach((_, subIndex) => {
          delete newChecked[`${item.id}-${subIndex}`];
        });
      }
    });
    setCheckedItems(newChecked);
    localStorage.setItem(`${storagePrefix}-checklist`, JSON.stringify(newChecked));
  };
  const getGroupProgress = (group: ChecklistGroup) => {
    let total = 0;
    let checked = 0;
    group.items.forEach((item) => {
      total++;
      if (checkedItems[item.id]) checked++;
      if (item.subItems) {
        item.subItems.forEach((_, subIndex) => {
          const subId = `${item.id}-${subIndex}`;
          total++;
          if (checkedItems[subId]) checked++;
        });
      }
    });
    return { checked, total };
  };

  return (
    <div className="space-y-8">
      {groups.map((group, groupIndex) => {
        const progress = getGroupProgress(group);
        const isComplete = group.requireAll 
          ? progress.checked === progress.total 
          : progress.checked >= 1;

        return (
          <div key={groupIndex} className="rounded-2xl border bg-card overflow-hidden">
            {/* Group Header */}
            <div className="p-6 border-b bg-muted/30">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold text-foreground">{group.title}</h3>
                <div className="flex items-center gap-2">
                  {progress.checked > 0 && (
                    <button
                      onClick={() => handleClearGroup(group)}
                      className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 text-foreground hover:from-yellow-500 hover:to-amber-600 shadow-sm hover:shadow transition-all"
                    >
                      <RotateCcw className="h-3 w-3" />
                      Clear
                    </button>
                  )}
                  <span className={cn(
                    "text-sm font-medium px-3 py-1 rounded-full",
                    isComplete 
                      ? "bg-secondary/30 text-secondary-foreground" 
                      : "bg-muted text-muted-foreground"
                  )}>
                    {progress.checked} / {progress.total}
                  </span>
                </div>
              </div>
              <p className="text-sm font-medium text-foreground">
                {group.requirement}
              </p>
            </div>

            {/* Items */}
            <div className="p-4 space-y-2">
              {group.items.map((item) => (
                <div key={item.id}>
                  <ChecklistItemRow
                    id={item.id}
                    label={item.label}
                    isChecked={!!checkedItems[item.id]}
                    onToggle={() => handleToggle(item.id)}
                    isParent={!!item.subItems?.length}
                  />
                  
                  {/* Sub-items */}
                  {item.subItems && (
                    <div className="ml-8 mt-1 space-y-1">
                      {item.subItems.map((subLabel, subIndex) => {
                        const subId = `${item.id}-${subIndex}`;
                        return (
                          <ChecklistItemRow
                            key={subId}
                            id={subId}
                            label={subLabel}
                            isChecked={!!checkedItems[subId]}
                            onToggle={() => handleToggle(subId)}
                            isSmall
                          />
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>

          </div>
        );
      })}
    </div>
  );
};

interface ChecklistItemRowProps {
  id: string;
  label: string;
  isChecked: boolean;
  onToggle: () => void;
  isParent?: boolean;
  isSmall?: boolean;
}

const ChecklistItemRow = ({ 
  id, 
  label, 
  isChecked, 
  onToggle, 
  isParent,
  isSmall 
}: ChecklistItemRowProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    if (!isChecked) {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 600);
    }
    onToggle();
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "w-full flex items-center gap-3 rounded-lg transition-all text-left border",
        isSmall ? "p-2" : "p-3",
        isChecked 
          ? "bg-muted/40 border-border" 
          : "bg-card border-border/50 hover:bg-muted/30 hover:border-border"
      )}
    >
      {/* Checkbox / Beet Icon */}
      <div className={cn(
        "flex-shrink-0 rounded-md border-2 flex items-center justify-center transition-all overflow-hidden",
        isSmall ? "w-5 h-5" : "w-6 h-6",
        isChecked 
          ? "border-primary bg-primary" 
          : "border-muted-foreground/40 bg-card"
      )}>
        {isChecked && (
          <Check className={cn(
            "text-white",
            isSmall ? "h-3 w-3" : "h-4 w-4"
          )} />
        )}
      </div>

      {/* Label */}
      <span className={cn(
        "flex-1 transition-all",
        isSmall ? "text-sm" : "text-base",
        isParent && "font-semibold",
        isChecked 
          ? "text-muted-foreground line-through decoration-muted-foreground/50" 
          : "text-foreground"
      )}>
        {label}
      </span>
    </button>
  );
};

export default ChecklistBoard;
