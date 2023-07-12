import { createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Product from "./pages/productspage/product";
// import Add from "./forms/addFormPage/addPage";
// import Edit from "./forms/editFormPage/editPage";
import DataProvider from "./dataContext"
import { Login, Error, SignUp, Home } from "./pages";

function App() {
  return (
    <BrowserRouter>
      <DataProvider>
        <Routes>
          <Route index element={<Login />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Sign up" element={<SignUp />} />
          {/* <Route path="/Products" element={<Product />} />
          <Route path="/EditWindow" element={<Edit />} />
          <Route path="/AddWindow" element={<Add />} /> */}
          <Route path="/Home" element={<Home />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </DataProvider>
    </BrowserRouter>
  );
}

export default App;
