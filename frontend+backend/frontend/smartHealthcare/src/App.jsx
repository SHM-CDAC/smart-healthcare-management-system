import { useEffect } from "react";

import { Outlet } from "react-router";
import Header from "./components/common/header";
import Footer from "./components/common/footer";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Header />
      <ToastContainer  />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
