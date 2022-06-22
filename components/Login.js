import styles from "../styles/LogCompo.module.css";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/router";
import Cookies from "universal-cookie";
import { AllState } from "../UserContext";
import { useEffect, useState } from "react";

const Login = () => {
  const { data, setData } = AllState();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)

  const cookies = new Cookies();
  const route = useRouter();
  const token = cookies.get("ut");

  // console.log(token)

  useEffect(() => {
    setIsUserLoggedIn(token)
  },[token])

  

  return (
    <>
      {isUserLoggedIn ? (
        <section className={styles.tokenExist}>hello</section>
      ) : (
        <section className={styles.main}>
          <h2 className={styles.loginHeader}>
            Login if you want to create your essay
          </h2>
          <div className={styles.btnHolder}>
            <button onClick={() => route.push("/login")} className={styles.btn}>
              Login
            </button>
            <br />
            <button
              onClick={() => route.push("/signup")}
              className={styles.btn}
            >
              Sign Up
            </button>
          </div>
        </section>
      )}
    </>
  );
};

export default Login;
