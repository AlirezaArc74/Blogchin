import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper";
import styles from "../../styles/DashboardBlog.module.css";
import Link from "next/link";

// export const getServerSideProps = async ({ req, response }) => {
//   console.log("hello");
//   const cookies = new Cookies(req.headers.cookie);
//   const token = `ut ${cookies.get("ut")}`;
//   console.log(token);
//   const res = await fetch("http://localhost:4000/blog/my-blogs", {
//     method: "GET",
//     headers: {
//       auth: token,
//     },
//   });

//   const data = await res.json();
//   console.log(data);
//   const oldData = data.map((item) => {
//     return {
//       ...item,
//       isSelected: false,
//     };
//   });
//   return {
//     props: {
//       oldData,
//     },
//   };
// };

const Dashboardblogs = () => {
  const [data, setData] = useState([]);
  // useEffect(() => {
  //   setData(oldData);
  // }, []);
  const cookie = new Cookies();
  const token = `ut ${cookie.get("ut")}`;

  useEffect(() => {
    try {
      const fetchData = async () => {
        const res = await fetch("http://localhost:4000/blog/my-blogs", {
          method: "GET",
          headers: {
            auth: token,
          },
        });
        const data = await res.json();
        const oldData = data.map((item) => {
          return {
            ...item,
            isSelected: false,
          };
        });
        setData(oldData);
      };

      const result = fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const showTitle = (i) => {
    const arr = [...data];

    const p = arr.findIndex((item, index) => index === i);
    console.log(p);
    if (p === -1) return null;

    arr[p].isSelected = true;

    setData(arr);
  };

  const hideTitle = (i) => {
    const arr = [...data];

    const p = arr.findIndex((item, index) => index === i);
    if (p === -1) return null;

    arr[p].isSelected = false;

    setData(arr);
  };

  const click = () => {
  };

  return (
    <>
      <section className={styles.main}>
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
        >
          {data.map((item, i) => {
            return (
              <SwiperSlide>
                <div
                  onMouseEnter={() => showTitle(i)}
                  onMouseLeave={() => hideTitle(i)}
                  key={item._id}
                  onClick={() => click()}
                >
                  <Link href={`/dashboard/blog/${item._id}`}>
                    <img src={item.imgurl} className={styles.image} />
                  </Link>
                  {console.log(item.isSelected)}
                  {item.isSelected ? (
                    <p className={styles.title}> {item.title} </p>
                  ) : null}
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </section>
    </>
  );
};

export default Dashboardblogs;
