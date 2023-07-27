import { useState } from "react";
import { Form } from "./accessComponent";
import { Alert } from "./mainComponent";

const Access = () => {
  const [message, setMessage] = useState({
    value: "",
    show: false,
  });

  const [allow, setAllow] = useState(true)
  return (
    <div className="relative w-full">
      <div
        className={`${
          message.show && "brightness-50 pointer-events-none"
        } w-full min-h-screen bg-secondary flex items-center justify-center relative z-0 p-5`}
      >
        <Form setMsg={setMessage} msg={message} allow={allow} setAllow={setAllow} />
      </div>
      <Alert msg={message} setMsg={setMessage} />
    </div>
  );
};

export default Access;
