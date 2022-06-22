import styles from "../styles/Footer.module.css";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import { useState } from "react";

const Footer = () => {
  const [footerExpand, setFooterExpand] = useState(true);

  const expandFooterIcon = () => {
    console.log("lol");
    setFooterExpand(!footerExpand);
  };

  return (
    <>
      <section className={styles.main}>
        {/* <div className={styles.collapse}>
          <h4>item </h4>
          <ExpandCircleDownIcon
            onClick={() => expandFooterIcon()}
            className={footerExpand ? styles.closed : styles.expanded}
          />
        </div>
        <p className={styles.closed}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
        </p> */}
      </section>
    </>
  );
};

export default Footer;
