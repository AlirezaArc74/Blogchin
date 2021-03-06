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
  const handleCloseNavbar = () => {
    setMobileNavbar(false);
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
                  <li onClick={handleCloseNavbar}>Blogs </li>
                </Link>
                <Link href="/users">
                  <li onClick={handleCloseNavbar}>Users </li>
                </Link>
                <Link href="/dashboard">
                  <li onClick={handleCloseNavbar}>Dashboard </li>
                </Link>
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
            <Link href="/dashboard">
              <li>Dashboard </li>
            </Link>
          </ul>
        </div>
      </section>
    </>
  );
};

export default Header;
