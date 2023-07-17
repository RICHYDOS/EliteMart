import { useState, useEffect } from "react";
import { FormApi } from "./formApi";
import { styles } from "../../styles";
import { useNavigate } from "react-router-dom";

const Form = ({ setMsg, msg, allow, setAllow }) => {
  const [formCheck, setFormCheck] = useState([]);
  const navigate = useNavigate();
  const [enable, setEnable] = useState(false);
  const [allowSubmit, setAllowSubmit] = useState(false);
  const [pageName, setPageName] = useState("");

  const [formData, setFormData] = useState({
    Email: "",
    Password: "",
  });

  const [data, setData] = useState({
    password: "",
  });

  function Change(event) {
    setFormData((prevFormData) => {
      const { name, value } = event.target;
      return {
        ...prevFormData,
        [name]: value,
      };
    });
    setData((prevData) => {
      const { name, value } = event.target;
      return {
        ...prevData,
        [name]: value,
      };
    });
  }

  useEffect(() => {
    async function fetchLoginData() {
      const result = await FormApi.read();
      setFormCheck(result);
    }

    fetchLoginData();
  }, [2]);

  useEffect(() => {
    async function submitData() {
      await FormApi.create(formData);
      const result = FormApi.Array[0];
      if (result === 200) {
        setMessage("Sign up completed successfully");
        setPageName("/Login")
        clearFields();
      } else {
        setMessage(/*"Sorry couldn't sign up."*/ result);
      }
      clearFields();
      FormApi.Array.pop();
    }
    if (allowSubmit) {
      submitData();
    }
  }, [allowSubmit]);

  function loginSubmit(event) {
    event.preventDefault();
    for (let i = 0; i < formCheck.length; i++) {
      if (
        formData.Email === formCheck[i].Email &&
        formData.Password === formCheck[i].Password
      ) {
        setMessage("Login Successful");
        setPageName("/Home");
        break;
      } else {
        setMessage("Login Failed, Try Again.");
      }
    }
    clearFields();
  }

  function signupSubmit(event) {
    event.preventDefault();
    if (
      formData.Email !== "" &&
      data.password !== "" &&
      formData.Password !== ""
    ) {
      setAllowSubmit(true);
    } else {
      setMessage("Please fill all the fields.");
    }
  }

  function clearFields() {
    setFormData((prevData) => {
      return {
        ...prevData,
        Email: "",
        Password: "",
      };
    });
    setData((prevData) => {
      return {
        ...prevData,
        password: "",
      };
    });
  }

  function setMessage(value) {
    setMsg((prevMsg) => {
      return {
        ...prevMsg,
        value: value,
        show: true,
      };
    });
  }

  useEffect(() => {
    if (formData.Password === data.password) {
      setEnable(true);
    } else {
      setEnable(false);
    }
  }, [formData]);

  useEffect(() => {
    if (!msg.show) {
      navigate(pageName, { replace: true });
    }
    },
    [msg.show]
  );

  const headings = allow ? (
    <div>
      <h1 className={`${styles.heroHeadText}`}>Sign Up!</h1>
      <p className={`${styles.heroSubText} `}>Sign up to access the website</p>
    </div>
  ) : (
    <div>
      <h1 className={`${styles.heroHeadText}`}>Welcome Back!</h1>
      <p className={`${styles.heroSubText} `}>Login to access the website</p>
    </div>
  );

  return (
    <form
      onSubmit={allow ? signupSubmit : loginSubmit}
      className={`sm:w-[550px] w-full ss:mx-2 sm:mx-0 bg-white shadow-card rounded-2xl ${styles.padding}`}
    >
      {headings}
      <div className="mt-[40px] w-full">
        <label>Email</label>
        <input
          type="text"
          placeholder="Enter Email"
          onChange={Change}
          className="input-text block w-full xs:w-3/4"
          name="Email"
          value={formData.Email}
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter Password"
          onChange={Change}
          className="input-text block w-full xs:w-3/4"
          name="Password"
          value={formData.Password}
        />
        <label className={`${allow ? "block" : "hidden"} w-full xs:w-3/4`}>
          Confirm Password
        </label>
        <input
          type="password"
          placeholder="Confirm the above Password"
          className={`${allow ? "block" : "hidden"} input-text w-full xs:w-3/4`}
          onChange={Change}
          name="password"
          value={data.password}
        />
        {allow && enable === false && (
          <span style={{ color: "red" }}>Passwords do not match</span>
        )}
        <button className="btn">{allow ? "Sign up" : "Login"}</button>
        {allow ? (
          <a
            onClick={() => setAllow(false)}
            className="my-[20px] text-[#0b2a43] w-fit block underline cursor-pointer"
          >
            Already have an account? Login!
          </a>
        ) : (
          <a
            onClick={() => setAllow(true)}
            className="my-[20px] text-[#0b2a43] w-fit block underline cursor-pointer"
          >
            Don't have an account? Sign up!
          </a>
        )}
      </div>
    </form>
  );
};

export default Form;
