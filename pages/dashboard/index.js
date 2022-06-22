import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import styles from "../../styles/dashboard.module.css";
import background from "./../../public/images/dashboard.jpg";
import nextConfig from "../../next.config";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRouter } from "next/router";
import { AllState } from "../../UserContext";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mobileNavbar, setMobileNavbar] = useState(false);

  const { data, setData } = AllState();

  const cookies = new Cookies();
  const route = useRouter();
  const token = cookies.get("ut");

  // useEffect(() => {
  //   if(!token) return route.push('/')
  // },[])

  useEffect(() => {
    try {
      fetch("http://localhost:4000/user/me", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
          auth: `ut ${cookies.get("ut")} `,
        },
        body: JSON.stringify({}),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.msg === "Unauthorized") {
            return route.push("/login");
          }
          // console.log(data);
          if (data) setIsLoading(false);
          setUserData(data);
          setData(data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  console.log(userData);

  const openMobileNavbarClick = () => {
    // console.log("lol")
    setMobileNavbar(!mobileNavbar);
  };

  const logoutClick = () => {
    console.log("lol");
    cookies.remove(`ut`, { path: "/" });
    setTimeout(() => {
      route.push("/");
    }, 2000);
  };

  if (isLoading) return <h1> Please wait data is loading... </h1>;

  return (
    <>
      <Image
        className={styles.backImage}
        src={background}
        placeholder="blur"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
      />
      <section className={styles.sideBar}>
        <div className={styles.avatarHolder}>
          <Image
            className={styles.avatar}
            src={`${process.env.customeKey}/${userData.avatar}`}
            loader={() =>
              `${process.env.customeKey}/${userData.avatar}?w=${100}`
            }
            placeholder="blur"
            blurDataURL={`${process.env.customeKey}/${userData.avatar}`}
            width={50}
            height={50}
            onError={(e) =>
              (e.target =
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkM9w2sPr7n7QFY9C9chGoe_pNV6pWJr0IoA&usqp=CAU")
            }
          />
        </div>

        <div className={styles.profile}>
          <h5>Name: {userData.name}</h5>
          <h5>Username: {userData.username}</h5>
        </div>

        <div className={styles.menuIcon}>
          <MenuIcon onClick={() => openMobileNavbarClick()} fontSize="large" />
        </div>

        {mobileNavbar ? (
          <>
            <div className={styles.mobileNav}>
              <ul className={styles.mobileUl}>
                <Link href="/dashboard/user">
                  <li>User </li>
                </Link>
                <Link href="/dashboard/newblog">
                  <li>New Blog </li>
                </Link>
                <Link href="/dashboard/blogsdashboard">
                  <li>My Blogs </li>
                </Link>
              </ul>
            </div>
          </>
        ) : null}
      </section>

      <section className={styles.desktapNav}>
        <ul className={styles.desktapUl}>
          <Link href="/dashboard/user">
            <li>User </li>
          </Link>
          <Link href="/dashboard/newblog">
            <li>New Blog </li>
          </Link>
          <Link href="/dashboard/dashboardblogs">
            <li>My Blogs </li>
          </Link>
        </ul>
      </section>
      <LogoutIcon
        onClick={() => logoutClick()}
        fontSize="large"
        className={styles.logoutIcon}
      />
    </>
  );
};

export default Dashboard;
