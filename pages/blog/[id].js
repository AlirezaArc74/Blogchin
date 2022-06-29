import { useRouter } from "next/router";
import styles from '../../styles/HomeBlogId.module.css'
import { useState, useEffect } from "react";

export const getStaticPaths = async () => {
  const res = await fetch(`http://localhost:4000/blog/`);
  const data = await res.json();
  console.log(data);

  const paths = data.map((item) => {
    return {
      params: { id: item._id },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const res = await fetch(`http://localhost:4000/blog/single-blog/${id}`);
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
};

const Blgo = ({ data }) => {
  const [userData, setUserData] = useState(null);
  console.log(data);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    setUserData(data);
  }, [data]);

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
        </div>
      </section>
    </>
  );
};

export default Blgo;
