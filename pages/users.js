import { useEffect, useState } from "react";
import styles from "../styles/UserHome.module.css";

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
            <>
              <div className={styles.card}>
                <div>
                  <img
                    className={styles.image}
                    src={`${process.env.customeKey}/${item?.avatar}`}
                    alt="user avatar"
                  />
                </div>
                <div className={styles.asl}>
                  <h3>{item?.username}</h3>
                  <h4> Name: {item?.name} </h4>
                  <p>Bio: {item?.bio}</p>
                  <button className={styles.btn}>See blogs</button>
                </div>
              </div>
              
            </>
          );
        })}
      </div>
    </>
  );
};

export default Users;
