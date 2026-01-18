export const DescriptionSection = ({
  description,
}: {
  description: string;
}) => (
  <section className="space-y-4">
    <h2 className="text-lg sm:text-xl font-semibold text-text-primary">
      Description
    </h2>
    <div className="prose prose-sm max-w-none">
      <p className="text-text-secondary leading-relaxed whitespace-pre-wrap">
        {description}
      </p>
    </div>
  </section>
);
