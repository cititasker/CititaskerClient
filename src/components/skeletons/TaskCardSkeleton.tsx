import { Card, Skeleton } from "@mui/material";
import React from "react";

const TaskCardSkeleton = () => {
  return (
    <Card elevation={0} className="px-7 py-4 rounded-[25px]">
      <div className="flex justify-between items-center w-full mb-4">
        <Skeleton animation="wave" variant="circular" width={50} height={50} />
        <Skeleton animation="wave" variant="rounded" width={47} height={20} />
      </div>
      <Skeleton animation="wave" variant="text" width="144px" height={20} />
      <Skeleton animation="wave" variant="text" width="80%" height={20} />
      <Skeleton animation="wave" variant="text" width="100%" height={20} />
      <div className="mt-3 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Skeleton
            animation="wave"
            variant="circular"
            width={18}
            height={18}
          />
          <Skeleton animation="wave" variant="text" width="130px" height={20} />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton
            animation="wave"
            variant="circular"
            width={18}
            height={18}
          />
          <Skeleton animation="wave" variant="text" width="70%" height={20} />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton
            animation="wave"
            variant="circular"
            width={18}
            height={18}
          />
          <Skeleton animation="wave" variant="text" width="20%" height={20} />
        </div>
      </div>
    </Card>
  );
};

export default TaskCardSkeleton;
