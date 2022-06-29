import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../../../styles/DashBlogId.module.css";
import StarRatings from "react-star-ratings";
import { Rating } from "react-simple-star-rating";

// const cookies = new Cookies();
// const token = `ut ${cookies.get("ut")}`;

// export const getStaticPaths = async () => {
//   const res = await fetch(`http://localhost:4000/blog`);
//   const data = await res.json();
//   console.log(data)

//  const paths = data.map((item) => {
//     return {
//       params: { id: item._id.toString() },
//     };
//   });

//   return {
//     paths,
//     fallback: false
//   }
// };

export const getServerSideProps = async (context) => {
  const { id } = context.params;
  const res = await fetch(`http://localhost:4000/blog/single-blog/${id}`);
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
};

const BlogById = ({ data }) => {
  const [userData, setUserData] = useState(null);
  const router = useRouter();
  // const { id } = router.query;

  useEffect(() => {
    setUserData(data);
  }, [data]);
  console.log(data);

  return (
    <>
      <section className={styles.main}>
        <h4 className={styles.title}> {userData?.title} </h4>
        <img src={userData?.imgurl} className={styles.image} />
        <p
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: userData?.content }}
        ></p>
        <div className={styles.star}>
          <Rating
            initialValue={userData?.averageScore}
            readonly={true}
            size={25}
          />
        </div>
        <button
          onClick={() => router.push(`/dashboard/editblog/${userData?._id}`)}
          className={styles.Editbtn}
        >
          Edit
        </button>
      </section>
    </>
  );
};

export default BlogById;
