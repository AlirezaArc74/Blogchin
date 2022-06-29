import axios from "axios";
import styles from "../styles/Blogs.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";
import Link from "next/link";

export const getStaticProps = async () => {
  const { data } = await axios.get("http://localhost:4000/blog");

  return {
    props: {
      data,
    },
  };
};

const Blogs = ({ data }) => {
  console.log(data);
  return (
    <>
      <section className={styles.main}>
        <Swiper
          slidesPerView={3}
          spaceBetween={40}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination, Navigation]}
        >
          {data.map((item) => {
            return (
              <div>
                <SwiperSlide className={styles.swiperSlider}>
                  <h5 className={styles.title}> {item.title} </h5>
                  <Link href={`/blog/${item._id}`}>
                    <img className={styles.image} src={item.imgurl} />
                  </Link>

                  <div className={styles.icons}>
                    <FavoriteBorderIcon className={styles.icon}/>
                    <ChatBubbleOutlineIcon className={styles.icon}/>
                    <ShareIcon className={styles.icon}/>
                  </div>
                </SwiperSlide>
              </div>
            );
          })}
        </Swiper>
      </section>
    </>
  );
};

export default Blogs;
