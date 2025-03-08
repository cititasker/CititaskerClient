import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import FormSwitch from "../forms/FormSwitch";

const Notification = () => {
  const [email, setEmail] = useState(false);
  const [sms, setSms] = useState(false);

  const toggleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.checked);
  };
  const toggleSMS = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSms(e.target.checked);
  };
  return (
    <div className="w-full">
      <div className="w-full rounded-30 border-[0.8px] border-solid border-light-grey px-8 py-6">
        <Typography className="text-xl text-black font-semibold mb-2">
          Transactional
        </Typography>
        <Typography className="text-black font-normal">
          You will always receive important notifications about any payments,
          cancellations and your account.
        </Typography>
        <div className="mt-8 flex items-center gap-8">
          <FormSwitch value={email} handleChange={toggleEmail} label="Email" />
          <FormSwitch value={sms} handleChange={toggleSMS} label="SMS" />
        </div>
      </div>
      <div className="w-full rounded-30 border-[0.8px] border-solid border-light-grey px-8 py-6">
        <Typography className="text-xl text-black font-semibold mb-2">
          Message
        </Typography>
        <Typography className="text-black font-normal">
          You will always receive important notifications about any payments,
          cancellations and your account.
        </Typography>
        <div className="mt-8 flex items-center gap-8">
          <FormSwitch value={email} handleChange={toggleEmail} label="Email" />
          <FormSwitch value={sms} handleChange={toggleSMS} label="SMS" />
        </div>
      </div>
      <div className="w-full rounded-30 border-[0.8px] border-solid border-light-grey px-8 py-6">
        <Typography className="text-xl text-black font-semibold mb-2">
          Reminder
        </Typography>
        <Typography className="text-black font-normal">
          You will always receive important notifications about any payments,
          cancellations and your account.
        </Typography>
        <div className="mt-8 flex items-center gap-8">
          <FormSwitch value={email} handleChange={toggleEmail} label="Email" />
          <FormSwitch value={sms} handleChange={toggleSMS} label="SMS" />
        </div>
      </div>
      <div className="w-full rounded-30 border-[0.8px] border-solid border-light-grey px-8 py-6">
        <Typography className="text-xl text-black font-semibold mb-2">
          Others
        </Typography>
        <Typography className="text-black font-normal">
          You will always receive important notifications about any payments,
          cancellations and your account.
        </Typography>
        <div className="mt-8 flex items-center gap-8">
          <FormSwitch value={email} handleChange={toggleEmail} label="Email" />
          <FormSwitch value={sms} handleChange={toggleSMS} label="SMS" />
        </div>
      </div>
    </div>
  );
};

export default Notification;
