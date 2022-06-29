import { useEffect, useState } from "react";
import styles from "../styles/UserHome.module.css"

export const getStaticProps = async () => {
  const res = await fetch("http://localhost:4000/user/");
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
};

const Users = ({ data }) => {
  const [userData, setUserData] = useState("");

  // useEffect(() => {
  //   setUserData(data);
  // }, [data]);
  // console.log(userData);
  return (
    <>
      <div className={styles.container}>
        {data.map((item) => {
          return (
            <div className={styles.card}>
              <div>
                <img className={styles.image} src={`${process.env.customeKey}/${item?.avatar}`} />
                <h3>{item?.username}</h3>
              </div>
              <div>
                <h4> Name: {item?.name} </h4>
                <p>Bio: {item?.bio}</p>
                <button>See blogs</button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Users;
