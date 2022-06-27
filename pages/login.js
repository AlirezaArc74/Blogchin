import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../styles/Login.module.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Cookies from "universal-cookie";
import Image from "next/image";
import { InputAdornment, FormControl, Input } from "@mui/material";
import { Toaster } from "react-hot-toast";
import { ErrorToast, SuccessToast } from "../components/Toast";

const axios = require("axios");

const Login = () => {
  const [loginUsernameInput, setLoginUsernameInput] = useState("");
  const [loginPasswordInput, setLoginPasswordInput] = useState("");
  const [visibility, setVisibility] = useState(false);
  const [isUserLogedIn, setIsUserLogedIn] = useState("");
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
        if(res.data.token) SuccessToast("Success")
      })
      .catch((error) => {
        if (error.response.data.msg === "bad request: no such user exists") ErrorToast("no such user exists")
        if (error.response.data.msg === "password doesnt match") ErrorToast("password doesnt match")
        if (error.response.data.msg === "bad inputs") ErrorToast("Please enter your username")
        console.log(error);
      });
    setLoginPasswordInput("");
    setLoginUsernameInput("");
    setTimeout(() => {
      route.push("/dashboard");
    }, 2000);
  };

  return (
    <>
    <Toaster />
      <section>
        <Image src="/images/loginBackground.jpg" layout="fill" />
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
          <FormControl
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
