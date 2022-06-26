import Image from "next/image";
import { useState } from "react";
import styles from "../../styles/User.module.css";
import { AllState } from "../../UserContext";

const User = () => {
  const { data, setData } = AllState();
  const [image, setImage] = useState();
  console.log(data);

  return (
    <>
      <section className={styles.main}>
        <input
          id="myInput"
          className={styles.inpFile}
          onChange={(e) => setImage(e.target.files[0])}
          type="file"
        />

        <label className={styles.label} htmlFor="myInput">
          <Image
            className={styles.avatar}
            src={`${process.env.customeKey}/${data.avatar}`}
            loader={() => `${process.env.customeKey}/${data.avatar}?w=${120}`}
            placeholder="blur"
            blurDataURL={`${process.env.customeKey}/${data.avatar}`}
            width={120}
            height={120}
          />
        </label>

        <section className={styles.profileHolder}>
          <div className={styles.nameHolder}>
            <p>name:</p>
            <input
              className={styles.nameInp}
              type="text"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
          </div>

          <div className={styles.usernameHolder}>
            <p>Username:</p>
            <input
              className={styles.usernameInp}
              type="text"
              value={data.username}
              onChange={(e) => setData({ ...data, username: e.target.value })}
            />
          </div>

          <div className={styles.bioHolder}>
            <p>Bio:</p>
            <textarea
              className={styles.bioInp}
              type="text"
              value={data.bio}
              onChange={(e) => setData({ ...data, bio: e.target.value })}
              maxLength={100}
            />
          </div>
        </section>
      </section>
    </>
  );
};

export default User;
