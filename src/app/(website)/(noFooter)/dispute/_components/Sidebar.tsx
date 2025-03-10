import Typography from "@mui/material/Typography";
import React from "react";

const Sidebar = () => {
  return (
    <div className="lg:max-w-[400px] w-full rounded-30 overflow-auto bg-white h-fit">
      <div className="bg-primary h-[70px] px-[30px] flex items-center text-white">
        Dispute Details
      </div>
      <div className="px-[30px] py-3">
        <div className="w-full flex justify-between items-center mb-10">
          <div className="max-w-[209px]">
            <Typography className="text-dark-grey-2 mb-1">
              Task Status
            </Typography>
            <Typography className="text-black-2">Status</Typography>
          </div>
          <div className="max-w-[209px]">
            <Typography className="text-dark-grey-2 mb-1">Proposal</Typography>
            <Typography className="text-black-2">Partial Refund </Typography>
          </div>
        </div>
        <div className="w-full flex justify-between items-center mb-10">
          <div className="max-w-[209px]">
            <Typography className="text-dark-grey-2 mb-1">Reason</Typography>
            <Typography className="text-black-2">
              Taskers requested to cancel the task
            </Typography>
          </div>
          <div className="max-w-[209px]">
            <Typography className="text-dark-grey-2 mb-1">
              Refund Amount
            </Typography>
            <Typography className="text-black-2">N60,000.00</Typography>
          </div>
        </div>
        <div className="mb-8">
          <Typography className="text-xl text-dark-grey-2 mb-2">
            Details
          </Typography>
          <div className="text-black-2">
            Horem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
            turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus
            nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum
            tellus elit sed risus. Maecenas eget condimentum velit, sit amet
            feugiat lectus. Class aptent taciti sociosqu ad litora torquent per
            conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus
            enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex.
            Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum
            lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in
            elementum tellus.
          </div>
        </div>
        <div>Images</div>
      </div>
    </div>
  );
};

export default Sidebar;
