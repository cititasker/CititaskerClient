// "use client";
// import React from "react";
// import { ROUTES } from "@/constant";
// import FormButton from "../forms/FormButton";

// const CantFind = () => {


//   return (
//     <div className="bg-[#02163799] w-full px-4 py-10 text-center flex flex-col items-center justify-center">
//       <h2 className="text-[20px] md:text-[40px] font-semibold text-white">
//         Can’t find what you need?
//       </h2>
//       <p className="text-[16px] text-white mb-4 max-w-md">
//         You can count on CitiTasker to get you the help that you need.
//       </p>
//     <FormButton
//             href={ROUTES.POST_TASK}
//             text="Post a task & get offers"
//             className="mt-auto text-[16px] !bg-white !text-primary"
//           />
//     </div>
//   );
// };

// export default CantFind;


"use client";
import React from "react";
import FormButton from "../forms/FormButton";

interface CantFindProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  className?: string;
}

const CantFind = ({
  title,
  description,
  buttonText,
  buttonLink,
  className = "",
}: CantFindProps) => {
  return (
    <div className={`bg-[#02163799] w-full px-4 py-10 text-center flex flex-col items-center justify-center ${className}`}>
      <h2 className="text-[20px] md:text-[40px] font-semibold text-white">
        {title}
      </h2>
      <p className="text-[16px] text-white mb-4 max-w-lg">{description}</p>
      <FormButton
        href={buttonLink}
        text={buttonText}
        className="mt-aut text-[16px] !bg-white !text-primary"
      />
    </div>
  );
};

export default CantFind;
