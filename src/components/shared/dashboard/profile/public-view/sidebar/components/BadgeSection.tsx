import Image from "next/image";
import Badge1 from "@/../public/images/license1.jpg";

export const BadgeSection = ({ user }: { user: any }) => {
  const badges = user?.badges || [];
  const completedJobs = user?.completed_jobs || 0;
  const yearsOfExperience = user?.years_of_experience || 0;

  return (
    <div className="space-y-4">
      {/* Achievement Badges */}
      {badges.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {badges.map((badge: any, index: number) => (
            <div key={index} className="relative group">
              <Image
                src={badge.image || Badge1}
                alt={badge.name || "Achievement badge"}
                width={48}
                height={48}
                className="rounded-lg shadow-sm group-hover:scale-105 transition-transform"
              />
            </div>
          ))}
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        {completedJobs > 0 && (
          <div className="text-center p-3 bg-success-light rounded-lg border border-success/20">
            <p className="text-lg font-bold text-success">{completedJobs}</p>
            <p className="text-xs text-success/80">Jobs Done</p>
          </div>
        )}

        {yearsOfExperience > 0 && (
          <div className="text-center p-3 bg-primary-50 rounded-lg border border-primary/20">
            <p className="text-lg font-bold text-primary">
              {yearsOfExperience}+
            </p>
            <p className="text-xs text-primary/80">Years Exp</p>
          </div>
        )}
      </div>
    </div>
  );
};
