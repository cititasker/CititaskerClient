// "use client";
// import React from "react";
// import FormButton from "../forms/FormButton";
// import { Input } from "@/components/ui/input";

// export default function Hero() {
//   return (
//     <main className="w-full text-white pt-32 pb-10">
//       <section className="bg-[#021637]">
//         <div className="px-4 md:px-16 mx-auto py-10 md:py-20">
//           <p className="text-sm mb-2">Welcome Judith!</p>
//           <h1 className="text-3xl sm:text-5xl font-bold mb-2">
//             Post a task. Get it done.
//           </h1>
//           <p className="text-base sm:text-lg text-gray-300 mb-3">
//             Connect with verified taskers in your city.
//           </p>

//           {/* Search bar */}

//           <div className="relative w-full mb-4">
//             <Input
//               type="text"
//               placeholder="What task do you need done?"
//               className="w-full bg-white text-black px-4 py-4 pr-28 rounded-full"
//             />
//             <FormButton className="absolute right-1 top-1 bottom-0 !h-10">
//               Post task
//             </FormButton>
//           </div>

//           {/* Suggested tags */}
//           <div className="flex flex-wrap justify-start gap-2 text-sm text-white/80">
//             {[
//               "Clean my house",
//               "Fix my door",
//               "Catering for birthday party",
//               "Deliver something for me",
//               "Mount my TV",
//               "Paint my room",
//             ].map((tag, idx) => (
//               <span
//                 key={idx}
//                 className="bg-white/10 border border-white/20 px-3 py-1 rounded-full"
//               >
//                 {tag}
//               </span>
//             ))}
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// }



"use client";

import React, { useState } from "react";
import FormButton from "../forms/FormButton";
import { Input } from "@/components/ui/input";

export default function Hero() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const tags = [
    "Clean my house",
    "Fix my door",
    "Catering for birthday party",
    "Deliver something for me",
    "Mount my TV",
    "Paint my room",
  ];

  return (
    <main className="w-full text-white pt-32 pb-10 relative overflow-hidden">
      {/* Background Shapes */}
      <section className="bg-[#021637] relative z-10">
        {/* Shape 1 */}
        <div className="absolute top-10 -left-10 w-40 h-40 bg-blue-500/20 rounded-full blur-2xl z-0"></div>
        {/* Shape 2 */}
        <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-purple-400/20 rounded-full blur-3xl z-0 -translate-x-1/2"></div>
        {/* Shape 3 */}
        <div className="absolute top-1/2 right-0 w-40 h-40 bg-teal-400/10 rounded-full blur-2xl z-0"></div>

        <div className="relative z-10 px-4 md:px-16 mx-auto py-10 md:py-20">
          <p className="text-sm mb-2">Welcome Judith!</p>
          <h1 className="text-3xl sm:text-5xl font-bold mb-2">
            Post a task. Get it done.
          </h1>
          <p className="text-base sm:text-lg text-gray-300 mb-3">
            Connect with verified taskers in your city.
          </p>

          {/* Search bar */}
          <div className="relative w-full mb-4">
            <Input
              type="text"
              placeholder="What task do you need done?"
              className="w-full bg-white text-black px-4 py-4 pr-28 rounded-full"
            />
            <FormButton className="absolute right-1 top-1 bottom-0 !h-10">
              Post task
            </FormButton>
          </div>

          {/* Suggested tags */}
          <div className="flex flex-wrap justify-start gap-2 text-sm text-white/80">
            {tags.map((tag, idx) => {
              const isSelected = selectedTag === tag;
              return (
                <button
                  key={idx}
                  onClick={() =>
                    setSelectedTag(isSelected ? null : tag)
                  }
                  className={`px-3 py-1 rounded-full border transition-all duration-200
                    ${
                      isSelected
                        ? "bg-white text-[#021637] font-medium"
                        : "bg-white/10 border-white/20 text-white/80"
                    }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
