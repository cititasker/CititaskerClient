import Image from "next/image";
import React from "react";
import { Tasker } from "./tasker.types";

const TaskerCard: React.FC<{ tasker: Tasker }> = ({ tasker }) => {
  return (
    <div className="flex-shrink-0 w-64 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group cursor-pointer">
      <div className="p-4 flex items-center gap-3">
        <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-primary/10 group-hover:ring-primary/30 transition-all">
          <Image
            src={tasker.image}
            alt={tasker.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
            sizes="64px"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-text-black truncate group-hover:text-primary transition-colors">
            {tasker.name}
          </h3>
          <p className="text-sm text-dark-grey truncate">{tasker.profession}</p>
        </div>
      </div>
      <div className="px-4 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <span className="text-yellow-500">⭐</span>
          <span className="font-medium text-sm text-text-black">
            {tasker.rating}
          </span>
          <span className="text-xs text-dark-grey">({tasker.reviewCount})</span>
        </div>
        <div className="font-semibold text-text-black">
          ₦{tasker.price.toLocaleString()}
        </div>
      </div>
    </div>
  );
};

export default TaskerCard;
