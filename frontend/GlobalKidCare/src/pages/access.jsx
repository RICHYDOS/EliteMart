import { useState } from "react";
import { Form } from "./accessComponent";
import { Alert } from "./mainComponent";
import { StarsCanvas } from "../canvas";
const Access = () => {
  const [message, setMessage] = useState({
    value: "",
    show: false,
  });

  const [allow, setAllow] = useState(false)
  return (
    <div className="relative w-full h-screen">
      <div
        className={`${
          message.show && "brightness-50 pointer-events-none"
        } w-full h-full bg-[#dcdfd4] flex items-center justify-center relative z-0`}
      >
        <Form setMsg={setMessage} msg={message} allow={allow} setAllow={setAllow} />
        <StarsCanvas color="#23202b" />
      </div>
      <Alert msg={message} setMsg={setMessage} />
    </div>
  );
};

export default Access;
