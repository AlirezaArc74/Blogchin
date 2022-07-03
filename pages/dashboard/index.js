import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import Cookies from "universal-cookie";
import styles from "../../styles/dashboard.module.css";
import background from "./../../public/images/dashboard.jpg";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRouter } from "next/router";

// export const getServerSideProps = async ({req, response}) => {

//   console.log(req)
//   const cookies = new Cookies(req.headers.cookie);
//   const token = `ut ${cookies.get("ut")}`;

//   const res = await fetch("http://localhost:4000/user/me", {
//           method: "POST", // or 'PUT'
//           headers: {
//             "Content-Type": "application/json",
//             auth: token,
//           },
//           body: JSON.stringify({}),
//         })

//     const data = await res.json()

//     return {
//       props: {userData: data}
//     }
// }

// const UID = () => {
//   return new Date().getTime() + String(Math.random()).slice(3, 9);
// };

const Dashboard = () => {
  const [mobileNavbar, setMobileNavbar] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const [file, setFile] = useState(null);

  const cookies = new Cookies();
  const route = useRouter();
  const token = `ut ${cookies.get("ut")}`;

  // console.log(data)
  // useEffect(() => {
  //   if(!token) return route.push('/')
  // },[])

  // useEffect(() => {
  //   try {
  //     fetch("http://localhost:4000/user/me", {
  //       method: "POST", // or 'PUT'
  //       headers: {
  //         "Content-Type": "application/json",
  //         auth: token,
  //       },
  //       body: JSON.stringify({}),
  //     })
  //       .then((response) => {
  //         return response.json();
  //       })
  //       .then((data) => {
  //         if (data.msg === "Unauthorized") {
  //           return route.push("/login");
  //         }
  //         // console.log(data);
  //         if (data) setIsLoading(false);
  //         setData(data);
  //       });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, []);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const res = await fetch("http://localhost:4000/user/me", {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
            auth: token,
          },
          body: JSON.stringify({}),
        });
        const data = await res.json();
        if (data.msg === "Unauthorized") {
          return route.push("/login");
        }
        // console.log(data);
        if (data) setIsLoading(false);
        setData(data);
      };

      const result = fetchData()

    } catch (error) {
      console.log(error);
    }
  },[]);

  const openMobileNavbarClick = () => {
    setMobileNavbar(!mobileNavbar);
  };

  const logoutClick = () => {
    cookies.remove(`ut`, { path: "/" });
    console.log("lol");
    setTimeout(() => {
      route.push("/");
    }, 2000);
  };

  useEffect(() => {
    // console.log(file)
    if (file) {
      submitAvatar(file);
    }
  }, [file]);

  const handleUserEdit = () => {
    try {
      fetch("http://localhost:4000/user/edit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          auth: token,
        },
        body: JSON.stringify({
          name: data.name,
          bio: data.bio,
        }),
      })
        .then((res) => {
          console.log(res);
          return res.json();
        })
        .then((data) => {
          console.log(data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const onfilechange = useCallback((e) => setFile(e.target.files[0]), [file]);

  // console.log(file)
  const submitAvatar = async (file) => {
    try {
      console.log(file);

      if (!file) return alert("why");

      const formData = new FormData();
      formData.append("avatar", file);

      fetch("http://localhost:4000/user/update-avatar", {
        method: "POST",
        headers: {
          auth: token,
        },
        body: formData,
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
        });
    } catch (error) {
      console.log(error);
    }
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
          <input
            id="myInput"
            className={styles.inpFile}
            onChange={onfilechange}
            type="file"
          />
          <label className={styles.label} htmlFor="myInput">
            <Image
              className={styles.avatar}
              src={`${process.env.customeKey}/${data?.avatar}`}
              loader={() => `${process.env.customeKey}/${data?.avatar}?w=${50}`}
              placeholder="blur"
              blurDataURL={`${process.env.customeKey}/${data?.avatar}`}
              width={50}
              height={50}
            />
          </label>
        </div>

        <div className={styles.profile}>
          <div className={styles.nameHolder}>
            <p>name:</p>
            <input
              className={styles.nameInp}
              type="text"
              maxLength={20}
              value={data?.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
          </div>
          <div className={styles.usernameHolder}>
            <p>Username:</p>
            <input
              className={styles.usernameInp}
              type="text"
              value={data?.username}
              onChange={(e) => setData({ ...data, username: e.target.value })}
            />
          </div>
        </div>

        <div className={styles.menuIcon}>
          <MenuIcon onClick={() => openMobileNavbarClick()} fontSize="large" />
        </div>

        <div className={styles.bioHolder}>
          <p>Bio:</p>
          <textarea
            className={styles.bioInp}
            type="text"
            value={data?.bio}
            onChange={(e) => setData({ ...data, bio: e.target.value })}
            maxLength={100}
          />
        </div>

        <button onClick={() => handleUserEdit()} className={styles.editBtn}>
          Edit
        </button>

        <button className={styles.profBtn}>change profile</button>

        {mobileNavbar ? (
          <>
            <div className={styles.mobileNav}>
              <ul className={styles.mobileUl}>
                <Link href="/dashboard/newblog">
                  <li>New Blog </li>
                </Link>
                <Link href="/dashboard/dashboardblogs">
                  <li>My Blogs </li>
                </Link>
                <Link href="/">
                  <li>Home </li>
                </Link>
              </ul>
            </div>
          </>
        ) : null}
      </section>
      <section className={styles.desktapNav}>
        <ul className={styles.desktapUl}>
          <Link href="/dashboard/newblog">
            <li>New Blog </li>
          </Link>
          <Link href="/dashboard/dashboardblogs">
            <li>My Blogs </li>
          </Link>
          <Link href="/">
            <li>Home </li>
          </Link>
        </ul>
      </section>
      <LogoutIcon
        onClick={() => logoutClick()}
        fontSize="large"
        className={styles.logoutIcon}
      />
      {/* <User data={data} />; */}
    </>
  );
};

export default Dashboard;
