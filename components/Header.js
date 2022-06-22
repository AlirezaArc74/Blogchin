import styles from "../styles/Header.module.css";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import { useState } from "react";
const Header = () => {
  const [mobileNavbar, setMobileNavbar] = useState(false);

  const openMobileNavbarClick = () => {
    // console.log("lol")
    setMobileNavbar(!mobileNavbar);
  };
  return (
    <>
      <section className={styles.main}>
        <div className={styles.menuIcon}>
          <MenuIcon onClick={() => openMobileNavbarClick()} fontSize="large" />
        </div>
        <Link href="/">
          <a className={styles.welcome}> Welcome to blog post app </a>
        </Link>
        {mobileNavbar ? (
          <>
            <div className={styles.mobileNav}>
              <ul className={styles.mobileUl}>
                <Link href="/blogs">
                  <li>Blogs </li>
                </Link>
                <Link href="/users">
                  <li>Users </li>
                </Link>
                <li>About </li>
              </ul>
            </div>
          </>
        ) : null}

        <div className={styles.desktapNav}>
          <ul className={styles.desktapUl}>
            <Link href="/blogs">
              <li>Blogs </li>
            </Link>
            <Link href="/users">
              <li>Users </li>
            </Link>
            <li>About </li>
          </ul>
        </div>

      </section>
    </>
  );
};

export default Header;
