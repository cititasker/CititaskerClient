import React from "react";

export default function Bio({ bio }: { bio: string }) {
  return (
    <section>
      <p className="text-sm font-bold mb-3">About me</p>
      {bio ? (
        <div dangerouslySetInnerHTML={{ __html: bio }} />
      ) : (
        <div className="text-sm font-inter bg-light-grey px-5 min-h-[123px] flex items-center justify-center text-center rounded-[10px]">
          Let Taskers know more about you.
        </div>
      )}
    </section>
  );
}
