import { Outlet } from "react-router-dom";
import { Footer, Header, Navbar } from "../components";

const HomeLayout = () => {
  return (
    <>
      <Header />
      <Navbar />
      {/* <nav>
        <span className='text-4xl text-primary' >Comfy</span>
      </nav> */}
      <section className="align-element">
        <Outlet />
      </section>
      <Footer/>
    </>
  );
};
export default HomeLayout;
