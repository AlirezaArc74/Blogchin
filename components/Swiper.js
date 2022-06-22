import styles from "../styles/Swiper.module.css"
import { Swiper, SwiperSlide } from "swiper/react";
// import sliderPic1 from "../public/rel.jpeg"
// import sliderPic2 from "../public/book1.jpeg"
// import sliderPic3 from "../public/book2.jpeg"



// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper";
import Image from "next/image";

const SwiperComp = () => {
  
  return (
    <>
      <div className={styles.main}>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false
        }}
        pagination={{
          clickable: true
        }}
        navigation={true}
        modules={[Autoplay, Pagination]}
        // className="mySwiper"
      >
        <SwiperSlide className={styles.image} > <Image  src={sliderPic1} layout="fill" /> </SwiperSlide>
        <SwiperSlide className={styles.image}> <Image  src={sliderPic2} layout="fill" />  </SwiperSlide>
        <SwiperSlide className={styles.image}><Image  src={sliderPic3} layout="fill" /> </SwiperSlide>
        
      </Swiper>
      </div>
    </>
  );
};

export default SwiperComp;
