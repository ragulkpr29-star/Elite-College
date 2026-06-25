import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Staff from "./pages/Staff";
import Placement from "./pages/Placement";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import "./App.css";

export default function App() {
  const [page, setPage] = useState("home");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  const pages = {
    home:      <Home      setPage={setPage} />,
    about:     <About     setPage={setPage} />,
    staff:     <Staff     setPage={setPage} />,
    placement: <Placement setPage={setPage} />,
    faq:       <FAQ       setPage={setPage} />,
    contact:   <Contact   setPage={setPage} />,
    login:     <Login     setPage={setPage} />,
    signup:    <Signup    setPage={setPage} />,
    profile:   <Profile   setPage={setPage} />,
    forgot:    <ForgotPassword setPage={setPage} />,
    privacy:   <PrivacyPolicy  setPage={setPage} />,
    terms:     <TermsConditions setPage={setPage} />,
  };

  return (
    <div>
      <Navbar page={page} setPage={setPage} />
      <main>{pages[page] ?? pages["home"]}</main>
      <Footer setPage={setPage} />
    </div>
  );
}
