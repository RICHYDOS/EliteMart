import { useState, useEffect } from "react";
import { StarsCanvas } from "../canvas";
import { motion } from "framer-motion";
import {
  scribble,
  chart,
  bank,
  naira,
  twitter,
  facebook,
  instagram,
  image1,
  image2,
  image3,
  image4,
} from "../assets";
import { fadeIn, slideIn, staggerContainer } from "../utils/motion";
import { useNavigate } from "react-router-dom";
import AnimatedNumbers from "react-animated-numbers";

const Landing = () => {
  const navigate = useNavigate();
  const [fund, setFunds] = useState(12530650);
  const [num, setNum] = useState(30250);

  return (
    <div className="w-full flex flex-col h-fit overflow-hidden">
      <div className="bg-primary h-screen flex flex-col items-center justify-center gap-10">
        <div className="w-4/5 h-10 flex items-center justify-center gap-8 z-10 text-white text-[22px]">
          <p
            className="hover:border-b-white hover:border-b-2 cursor-pointer transition duration-500"
            onClick={() => navigate("/access")}
          >
            Volunteer
          </p>
          <p className="hover:border-b-white hover:border-b-2 cursor-pointer transition duration-500" onClick={() => navigate("/donation")}>
            Donate
          </p>
          <p className="hover:border-b-white hover:border-b-2 cursor-pointer transition duration-500" onClick={() => navigate("/about")}>
            About
          </p>
        </div>
        <div className="top w-4/5 h-3/5 flex items-center flex-col">
          <h1 className="text-white flex items-center font-normal  uppercase md:text-9xl text-7xl text-center h-full">
            Global Kids Care
          </h1>
          
        </div>
      </div>
      <div className="bg-black sm:h-[400px] flex items-center p-3 relative z-0">
        <div className="lg:w-2/4 w-4/5 flex flex-col gap-5 ml-[10%] text-white">
          <h2 className=" sm:text-[40px] text-[30px]">The Future Is Bright</h2>
          <p>
            Welcome to Hope for Kids, where we're shaping a brighter future for
            children worldwide.
          </p>
          <p>
            We’re on a mission to provide care, love, and support to
            underprivileged kids – and we need your help!
          </p>
          <p>
            Are you ready to make a difference? It’s time to embrace change and
            offer a helping hand to those who need it most.
          </p>
        </div>
        <StarsCanvas color="#fff" />
      </div>
      <motion.section
        variants={staggerContainer()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className={`bg-white w-full mx-auto relative z-0`}
      >
        <motion.div
          variants={slideIn("up", "", 0.1, 1)}
          className="w-full h-[550px] flex flex-col items-center justify-center gap-10"
        >
          <img src={scribble} alt="Scribble" className="max-w-[250px] w-1/4" />
          <div className="text-[#586F7C] h-max md:p-0 p-10 md:w-2/5 w-full flex flex-col gap-5 items-center">
            <h2 className="md:text-[50px] text-3xl ">Join the Revolution</h2>
            <p>
              Become a volunteer today and help us bring change to children
              around the world. Lets join forces and create a better tomorrow
              for these young souls.
            </p>
          </div>
          <button className="p-3 text-white bg-black rounded-lg hover:bg-slate-600 text-xl sm:w-fit w-4/5" onClick={() => navigate("/access")}>
            Volunteer Now
          </button>
        </motion.div>
      </motion.section>
      <motion.section
        variants={staggerContainer()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className={`bg-white w-full mx-auto flex lg:flex-row flex-col justify-evenly items-center border-none gap-5 relative z-0 `}
      >
        <motion.div
          variants={slideIn("left", "tween", 0.1, 1)}
          className="max-w-[500px] lg:w-2/5 w-4/5 h-[450px] flex flex-col items-center justify-center gap-10 bg-[#f2f2f2] rounded-lg"
        >
          <img
            src={chart}
            alt="kids helped"
            className="max-w-[200px] w-[15%]"
          />
          <AnimatedNumbers
            animateToNumber={num}
            fontStyle={{ fontSize: 52, }}
            includeComma
            configs={(number, index) => {
              return { mass: 1, tension: 230 * (index + 1), friction: 140 };
            }}
          ></AnimatedNumbers>
          <h2 className="text-xl ">Kids Helped</h2>
        </motion.div>
        <motion.div
          variants={slideIn("right", "tween", 0.1, 1)}
          className="max-w-[500px] lg:w-2/5 w-4/5 h-[450px] flex flex-col items-center justify-center gap-10 bg-[#f2f2f2] rounded-lg"
        >
          <img
            src={bank}
            alt="funds raised"
            className="max-w-[200px] w-[15%]"
          />
          <h2 className="flex gap-1 font-normal text-4xl">
            <img src={naira} />
            <AnimatedNumbers
            animateToNumber={fund}
            fontStyle={{ fontSize: 52, }}
            includeComma
            configs={(number, index) => {
              return { mass: 1, tension: 210 * (index + 1), friction: 140 };
            }}
          ></AnimatedNumbers>
          </h2>
          <h2 className="text-xl">Funds Raised</h2>
        </motion.div>
      </motion.section>
      <div className="bg-white min-h-[500px] mx-[10%] mt-10 ">
        <h1 className="text-[50px]">Our Impact</h1>
        <p>
          We are building an inclusive society where every child has equal
          chances
        </p>
        <div className="grid grid-cols-auto gap-[20px] h-max my-5">
          <img src={image1} className="w-[400px]" />
          <img src={image2} className="w-[400px]" />
          <img src={image3} className="w-[400px]" />
          <img src={image4} className="w-[400px]" />
        </div>
      </div>
      <div className="flex justify-between items-center mx-[10%] my-5">
        <p>2023 Hope for Kids</p>
        <div className="flex gap-10">
          <img src={twitter} className="w-10 cursor-pointer" />
          <img src={instagram} className="w-10 cursor-pointer" />
          <img src={facebook} className="w-10 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default Landing;
