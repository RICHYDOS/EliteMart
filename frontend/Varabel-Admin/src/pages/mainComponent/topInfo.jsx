import { useState, useEffect } from "react";
import { user, arrow, notification, varabel, menu, setting, signout, user1, setting1 } from "../../assets";
import { useUsername, useWindowWidth } from "../../dataContext";
// import { TableObject } from "./table/tableinfo";

const Top = ({ Head, details, bool, deleteIndexes, setShow }) => {
  const [allowDelete, setAllowDelete] = useState(false);
  const [style, setStyle] = useState(false);
  const username = useUsername();
  const windowWidth = useWindowWidth();
  const [view, setView] = useState(false);

  const deleteStyle = bool
    ? {
        top: "0px",
      }
    : {};

  function del() {
    setAllowDelete(!allowDelete);
  }


  // React.useEffect(() => {
  //   async function deleteData(){
  //     for(let i = 0; i < deleteIndexes.length; i++){
  //       await TableObject.delete(deleteIndexes[i])
  //     }
  //   }

  //   async function handleDeletes(){
  //     await deleteData()
  //     window.location.reload()
  //   }
  //   if(allowDelete){
  //     handleDeletes()
  //   }

  // }, [allowDelete]);

  return (
    <div className="h-[80px] flex items-center justify-between bg-white pr-8 shadow-miniCard cursor-default">
      {/* <div className="delete-container" style={deleteStyle}>
        <label>Are you sure you want to delete?</label>
        <button onClick={del}>Delete</button>
      </div> */}
      <img src={windowWidth >= 640 ? varabel : menu} alt="Varabel logo" className={`w-[35px] sm:w-[300px] ml-10 sm:ml-0 ${style && windowWidth < 640 && "border-[3px] border-quartiary rounded-md"} p-1`} onClick={() => {setShow((prevShow) => !prevShow); setStyle(!style);}}/>
      <div className="lg:block hidden">
        <h2 className="font-semibold text-[36px]">{Head}</h2>
        <label className="font-normal text-[16px] text-[#7d7d7d] leading-5">
          {details}
        </label>
      </div>
      <div className="flex items-center justify-center gap-3">
        <img src={notification} className="xs:w-8 w-6" />
        <span className="xs:w-[50px] xs:h-[50px] w-[35px] h-[35px] rounded-full bg-quartiary flex items-center justify-center">
          <img src={user} />
        </span>
        <h3 className="md:block hidden">{username}</h3>
        <img src={arrow} className=" xs:ml-3 ml-1 cursor-pointer" onClick={() => setView(!view)} />
        <div className={`absolute right-10 top-[68px] z-40 bg-white shadow-lg w-[200px] h-[120px] rounded-lg flex-col justify-evenly items-center ${view ? "flex":"hidden"}`}>
          <div className="img-box"><img src={user1} className="img" />Profile</div>
          <div className="img-box"><img src={setting1} className="img" />Settings</div>
          <div className="img-box"><img src={signout} className="img" />Log out</div>
        </div>
      </div>
    </div>
  );
};

export default Top;
