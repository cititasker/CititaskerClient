import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Sparkles } from "lucide-react";
import { useState } from "react";

export const SkillsSection = ({ skills }: { skills: string[] }) => {
  const [showAll, setShowAll] = useState(false);
  const displayLimit = 6;
  const hasMoreSkills = skills?.length > displayLimit;
  const displayedSkills = showAll ? skills : skills?.slice(0, displayLimit);

  if (!skills?.length) {
    return (
      <div className="text-center py-6">
        <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <Sparkles className="w-6 h-6 text-neutral-400" />
        </div>
        <p className="text-sm text-text-muted">No skills added yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {displayedSkills.map((skill, index) => (
          <Badge
            key={index}
            variant="secondary"
            className="px-3 py-1.5 bg-gradient-to-r from-primary-50 to-secondary-50 text-text-primary text-xs font-medium rounded-full border border-primary-200 hover:from-primary-100 hover:to-secondary-100 transition-all duration-200"
          >
            {skill}
          </Badge>
        ))}
      </div>

      {hasMoreSkills && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowAll(!showAll)}
          className="w-full text-primary hover:text-primary-600 hover:bg-primary-50"
        >
          {showAll ? (
            <>
              <ChevronUp className="w-4 h-4 mr-2" />
              Show Less
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4 mr-2" />
              Show {skills.length - displayLimit} More
            </>
          )}
        </Button>
      )}
    </div>
  );
};
