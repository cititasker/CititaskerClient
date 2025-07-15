import { Badge } from "@/components/ui/badge";
import React from "react";

interface IProps {
  skills: { name: string }[];
}
export default function Skills({ skills }: IProps) {
  return (
    <div>
      {skills?.length > 0 && (
        <section>
          <p className="text-sm font-bold mb-3">Skills</p>
          <div className="flex flex-wrap gap-2.5">
            {skills.map((s, i) => (
              <Badge
                key={i}
                className="bg-light-grey hover:bg-light-grey/45 text-black-2 px-4 py-2 text-sm rounded-full"
              >
                {s.name}
              </Badge>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
