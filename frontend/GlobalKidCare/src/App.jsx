import { BrowserRouter, Routes, Route } from "react-router-dom";
import DataProvider from "./dataContext"
import { Landing, Access, Volunteer, Error } from "./pages";

function App() {
  return (
    <BrowserRouter>
      <DataProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/access" element={<Access />} />
          <Route path="/volunteer" element={<Volunteer />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </DataProvider>
    </BrowserRouter>
  );
}

export default App;