import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../styles/Login.module.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Cookies from "universal-cookie";
import Image from "next/image";
import { InputAdornment, FormControl, Input } from "@mui/material";

const axios = require("axios");

const Login = () => {
  const [loginUsernameInput, setLoginUsernameInput] = useState("");
  const [loginPasswordInput, setLoginPasswordInput] = useState("");
  const [visibility, setVisibility] = useState(false);
  const [isUserLogedIn, setIsUserLogedIn] = useState("");

  // const { token, setToken } = AllState();

  const route = useRouter();
  const cookies = new Cookies();
  const token = cookies.get("ut");

  const visibilityIconClick = () => {
    setVisibility(!visibility);
  };

  useEffect(() => {
    setIsUserLogedIn(token);
  }, [token]);

  if (isUserLogedIn) route.push("/dashboard");

  const loginSubmit = () => {
    axios
      .post("http://localhost:4000/user/login", {
        username: loginUsernameInput,
        password: loginPasswordInput,
      })
      .then((res) => {
        console.log(res);
        cookies.set("ut", res.data.token);
        setToken(rea?.data?.token);
      })
      .catch((error) => {
        console.log(error);
      });
    setLoginPasswordInput("");
    setLoginUsernameInput("");
    setTimeout(() => {
      route.push("/dashboard");
    }, 2000);

    console.log(token);
    // const boro = () => {
    // }
  };

  return (
    <>
      <section>
        <Image src="/images/loginBackground.jpg" layout="fill" />
        {/* <div
          className={styles.image}
          style={{
            backgroundImage: `url(${logBack.src})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        ></div> */}
      </section>

      <section className={styles.login}>
        <div className={styles.container}>
          <input
            autoComplete="off"
            onChange={(e) => setLoginUsernameInput(e.target.value)}
            value={loginUsernameInput}
            type="text"
            placeholder="Username"
            className={styles.usernameInput}
          />
          {/* <input
            onChange={(e) => setLoginPasswordInput(e.target.value)}
            value={loginPasswordInput}
            type={visibility ? "text" : "password"}
            placeholder="Password"
            className={styles.passwordInput}
            disableUnderline={true}
          />
          <VisibilityIcon
              onClick={() => {
                visibilityIconClick();
              }}
              className={styles.visibilityIcon}
            /> */}
          <FormControl
            // className={styles.passwordInput}
            sx={{ m: 0.5, width: "18ch" }}
            variant="standard"
            auto
          >
            <Input
              className={styles.passwordInput}
              placeholder="Password"
              required="true"
              autoComplete="new-password"
              disableUnderline={true}
              id="standard-adornment-password"
              type={visibility ? "text" : "password"}
              value={loginPasswordInput}
              onChange={(e) => setLoginPasswordInput(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <VisibilityIcon
                    className={styles.visibilityIcon}
                    fontSize="large"
                    onClick={() => {
                      visibilityIconClick();
                    }}
                  />
                </InputAdornment>
              }
            />
          </FormControl>

          <br />
          <button className={styles.btn} onClick={() => loginSubmit()}>
            Login
          </button>

          <button className={styles.backClick} onClick={() => route.push("/")}>
            Home
          </button>
        </div>
      </section>
    </>
  );
};

export default Login;
