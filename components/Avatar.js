import styles from "../styles/Avatar.module.css";
import { AllState } from "../UserContext";
import Image from "next/image";

const Avatar = () => {
  
  const {data} = AllState()

  return (
    <>
    <div>
      <Image
        className={styles.avatar}
        src={`${process.env.customeKey}/${data.avatar}`}
        loader={() => `${process.env.customeKey}/${data.avatar}?w=${50}`}
        placeholder="blur"
        blurDataURL={`${process.env.customeKey}/${data.avatar}`}
        width={50}
        height={50}
      />
      </div>
    </>
  );
};

export default Avatar;
