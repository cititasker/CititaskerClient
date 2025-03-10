import { Skeleton } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React from "react";
import TaskCardSkeleton from "./TaskCardSkeleton";

const PageSkeleton = () => {
  return (
    <div className="container pt-[100px] w-full bg-light-grey">
      <Grid
        container
        spacing={2}
        className="h-[calc(100vh-100px)] overflow-hidden"
      >
        <Grid size={{ xs: 12, md: 3 }}>
          <Skeleton
            animation="wave"
            sx={{ bgcolor: "#fff", borderRadius: "20px" }}
            variant="rounded"
            width="100%"
            height={493}
          />
        </Grid>

        <Grid container spacing={2} size={{ xs: 12, md: 9 }}>
          <Grid size={{ xs: 12, md: 4 }}>
            <div className="flex flex-col gap-3 w-full overflow-auto">
              {Array.from({ length: 3 }).map((_, index) => (
                <TaskCardSkeleton key={index} />
              ))}
            </div>
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <Skeleton
              animation="wave"
              variant="rounded"
              height="100%"
              width="100%"
              sx={{ bgcolor: "grey.200" }}
            />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default PageSkeleton;
