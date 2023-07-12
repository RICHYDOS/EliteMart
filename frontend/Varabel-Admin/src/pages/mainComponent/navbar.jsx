import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWindowWidth } from "../../dataContext";
import navImg from "./navImg";

const Navbar = ({ show, setShow, word }) => {
  const [images, setImages] = useState(navImg);
  const navigate = useNavigate();
  const windowWidth = useWindowWidth();

  function selected(id, bool) {
    setImages((prevImages) => {
      return prevImages.map((Image) =>
        Image.id === id && Image.word != word
          ? {
              ...Image,
              selected: bool,
            }
          : Image
      );
    });
  }

  function linkClicked(word) {
    navigate(`/${word}`);
  }

  useEffect(() => {
    setImages((prevImages) => {
      return prevImages.map((Image) =>
        Image.word === word
          ? {
              ...Image,
              selected: true,
              preSelected: true,
            }
          : Image
      );
    });
  }, []);

  const imageElement = images.map((image) => (
    <li
      onMouseOver={() => selected(image.id, true)}
      onMouseOut={() => selected(image.id, false)}
      onClick={() => linkClicked(image.word)}
      className={`w-full h-[50px] flex items-center gap-7 mb-2 cursor-pointer`}
      key={image.id}
    >
      <div
        className={`w-1 h-full rounded-xl ${
          image.preSelected && "bg-quartiary"
        } `}
      ></div>
      <div className="w-3/4 flex gap-2">
        <img src={image.src} className={`${image.selected && "navSvg"}`} />
        <h3 className={`${image.selected && "font-semibold text-quartiary"}`}>
          {image.word}
        </h3>
      </div>
    </li>
  ));

 const display = show ? windowWidth <= 639 && "block absolute left-0 h-[calc(100%-80px)]" : "hidden"
  return (
    <div className={`w-1/5 max-w-[250px] min-w-[205px] bg-white z-10 shadow-card sm:block ${display}`}>
      <nav className="w-full mt-5">
        <ul className="flex items-end justify-center gap-1 flex-col w-full h-full">
          {imageElement}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
