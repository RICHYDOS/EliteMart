import { useState, useEffect } from "react";
import { FormApi } from "./formApi";
import { styles } from "../../styles";
import { useNavigate } from "react-router-dom";
import { logo, google } from "../../assets";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";


const Form = ({ setMsg, msg, allow, setAllow }) => {
  const [formCheck, setFormCheck] = useState([]);
  const navigate = useNavigate();
  const [allowSubmit, setAllowSubmit] = useState(false);
  const [pageName, setPageName] = useState("");

  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Password: "",
  });

  function Change(event) {
    setFormData((prevFormData) => {
      const { name, value } = event.target;
      return {
        ...prevFormData,
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
        setAllow(false);
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
      formData.Name !== "" &&
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
        Name: "",
        Email: "",
        Password: "",
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
    if (!msg.show) {
      navigate(pageName, { replace: true });
    }
  }, [msg.show]);

  const login = useGoogleLogin({
    onSuccess: async response => {
      const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: {
          "Authorization": `Bearer ${response.access_token}`
        }
      })
      console.log(res.data)
    }
  })

  const headings = allow ? (
    <div className="mt-10">
      <h1 className={`${styles.heroHeadText}`}>Welcome to Global Kids Care!</h1>
      <p className={`${styles.heroSubText} `}>
        Enter your details to get started
      </p>
    </div>
  ) : (
    <div className="mt-10">
      <h1 className={`${styles.heroHeadText}`}>Welcome Back!</h1>
      <p className={`${styles.heroSubText} `}>
        Enter details to continue to website
      </p>
    </div>
  );

  return (
    <div className="flex rounded-2xl min-h-[670px] lg:h-[670px] shadow-card bg-white relative lg:flex-row flex-col  overflow-auto">
      <form className={`md:w-[550px] w-full ss:mx-2 md:mx-0 ${styles.padding}`}>
        <img src={logo} className="h-5 inset-0 absolute m-5 w-[140px]" />
        {headings}
        <div className="mt-5 flex flex-col gap-5">
          <button className="border-2 border-[#28AEA3] rounded-2xl p-2 flex gap-1 w-[180px]" onClick={() => login()} >
            <img src={google} className="w-6" />
            Log In with Google
          </button>
          <div className="w-full flex items-center justify-center gap-1">
            <hr className="w-[45%] border-[#28AEA3]" />
            OR
            <hr className="w-[45%] border-[#28AEA3]" />
          </div>
        </div>
        <div className="mt-[20px] w-full">
          <label className={`${allow ? "block" : "hidden"} w-full xs:w-3/4`}>
            Full Name
          </label>
          <input
            type="text"
            placeholder="Enter Full Name"
            onChange={Change}
            className={`${
              allow ? "block" : "hidden"
            } input-text w-full xs:w-3/4`}
            name="Name"
            value={formData.Name}
          />
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
          <button className="btn" onClick={allow ? signupSubmit : loginSubmit}>
            {allow ? "Sign up" : "Login"}
          </button>
          {allow ? (
            <div className="flex my-[20px] gap-1">
              Have an account?
              <a
                onClick={() => setAllow(false)}
                className=" text-[#28AEA3] font-medium w-fit block cursor-pointer"
              >
                Sign in
              </a>
            </div>
          ) : (
            <div className="flex my-[20px] gap-1">
              Don't Have an account?
              <a
                onClick={() => setAllow(true)}
                className=" text-[#28AEA3] font-medium w-fit block cursor-pointer"
              >
                Sign up
              </a>
            </div>
          )}
        </div>
      </form>
      <div className="lg:w-[385px] w-full lg:h-full h-[500px] bg-cover bg-no-repeat bg-access-pattern flex flex-col justify-center items-center gap-5">
        <h1 className="text-white w-4/5 text-[30px] font-medium text-center">Join other volunteers in this exercise as we give to charity.</h1>
        <h2 className="text-white w-4/5 text-md text-center font-normal">
          ‘we can’t help everyone, but everyone can help someone’ -Ronald Reagan
        </h2>
        <button className="btn">Gallery</button>
      </div>
    </div>
  );
};

export default Form;
