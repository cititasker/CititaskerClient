import { Card, Skeleton } from "@mui/material";
import React from "react";

const TaskDetailSkeleton = () => {
  return (
    <Card elevation={0} className="h-full px-[52px] py-5 rounded-[25px] mt-3">
      <div className="w-full h-[48px] items-center justify-between flex mb-8">
        <Skeleton animation="wave" variant="text" width={92} height={20} />
        <div className="flex gap-3 items-center">
          <Skeleton animation="wave" variant="text" width={67} height={20} />
          <Skeleton animation="wave" variant="text" width={74} height={20} />
          <Skeleton animation="wave" variant="text" width={60} height={20} />
        </div>
      </div>

      <div className="flex gap-4 flex-row justify-between w-full mb-[48px]">
        <div className="flex gap-4">
          <div className="flex flex-col items-center">
            <Skeleton
              animation="wave"
              variant="circular"
              width={80}
              height={80}
              className="mb-2"
            />
            <Skeleton
              animation="wave"
              variant="text"
              width={65}
              height={18}
              className="mb-1"
            />
            <Skeleton animation="wave" variant="text" width={52} height={16} />
          </div>
          <div className="">
            <div className="flex gap-2 mb-5">
              <Skeleton
                animation="wave"
                variant="rectangular"
                width={54}
                height={20}
                className="rounded-[40px]"
              />
              <Skeleton
                animation="wave"
                variant="rectangular"
                width={70}
                height={20}
                className="rounded-[40px]"
              />
              <Skeleton
                animation="wave"
                variant="rectangular"
                width={80}
                height={20}
                className="rounded-[40px]"
              />
            </div>
            <Skeleton
              animation="wave"
              variant="text"
              width={205}
              height={35}
              className="mb-5"
            />
            <div className="flex flex-col gap-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex gap-2">
                  <Skeleton
                    animation="wave"
                    variant="circular"
                    width={20}
                    height={20}
                    className="shrink-0"
                  />
                  <div className="w-full">
                    <Skeleton
                      animation="wave"
                      variant="text"
                      width={106}
                      height={18}
                    />
                    <Skeleton
                      animation="wave"
                      variant="text"
                      width={60}
                      height={14}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-5 max-w-[217px] w-full">
          <Skeleton
            animation="wave"
            variant="rounded"
            width="100%"
            height={180}
            className="mb-2"
          />
          <Skeleton
            animation="wave"
            variant="rounded"
            width="100%"
            height={51}
            className="mt-2 rounded-[10px]"
          />
        </div>
      </div>

      <div className="w-full mb-7">
        <Skeleton
          animation="wave"
          variant="text"
          width={109}
          height={30}
          className="mb-3"
        />
        <Skeleton animation="wave" variant="text" width="100%" height={20} />
        <Skeleton animation="wave" variant="text" width="100%" height={20} />
        <Skeleton animation="wave" variant="text" width="80%" height={20} />
        <Skeleton animation="wave" variant="text" width="30%" height={20} />
      </div>
      <div className="w-full mb-7">
        <Skeleton
          animation="wave"
          variant="text"
          width={109}
          height={30}
          className="mb-3"
        />
        <div className="flex items-center gap-5">
          <Skeleton
            animation="wave"
            variant="rounded"
            width={100}
            height={90}
            className="rounded-[10px]"
          />
          <Skeleton
            animation="wave"
            variant="rounded"
            width={100}
            height={90}
            className="rounded-[10px]"
          />
        </div>
      </div>
    </Card>
  );
};

export default TaskDetailSkeleton;
