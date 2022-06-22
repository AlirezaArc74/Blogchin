import Footer from "../components/Footer";
import Header from "../components/Header";
import Login from "../components/Login";
import SwiperComp from "../components/Swiper";
import Tick from "../components/Tick";
import styles from "../styles/Home.module.css";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Header />
      {/* <SwiperComp /> */}
      <div>
        {/* <img src="/images/loginBackground.jpg" /> */}
        <Image src="/images/loginBackground.jpg" layout="fill" />
      </div>
      {/* <div
      className={styles.image}
        style={{
          backgroundImage: `url(${backPic.src})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
      </div> */}
      <Login />
      <Footer />
    </>
  );
}
