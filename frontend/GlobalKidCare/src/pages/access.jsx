import { useState } from "react";
import { Form } from "./accessComponent";
import { Alert } from "./mainComponent";
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
        } w-full h-full bg-secondary flex items-center justify-center`}
      >
        <Form setMsg={setMessage} msg={message} allow={allow} setAllow={setAllow} />
      </div>
      <Alert msg={message} setMsg={setMessage} />
    </div>
  );
};

export default Access;
