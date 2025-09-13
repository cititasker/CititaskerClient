import React from "react";

const EmptyBioState = () => (
  <div className="bg-neutral-100 rounded-xl p-6 text-center min-h-[120px] flex items-center justify-center">
    <p className="text-text-muted text-sm max-w-sm">
      Let others know more about your background, experience, and what makes you
      unique.
    </p>
  </div>
);

interface BioProps {
  bio: string;
  className?: string;
}

export default function Bio({ bio, className = "" }: BioProps) {
  return (
    <section className={`space-y-3 ${className}`}>
      <h3 className="text-sm font-semibold text-text-primary">About Me</h3>
      {bio ? (
        <div
          className="prose prose-sm text-text-secondary leading-relaxed"
          dangerouslySetInnerHTML={{ __html: bio }}
        />
      ) : (
        <EmptyBioState />
      )}
    </section>
  );
}
