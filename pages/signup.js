import styles from "../styles/Signup.module.css";
import { useEffect, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useRouter } from "next/router";
import Cookies from "universal-cookie";
import Image from "next/image";
import { InputAdornment, FormControl, Input } from "@mui/material";

const axios = require("axios");

const SignUp = (blogUser) => {
  const [signupUsernameInput, setSignupUsernameInput] = useState("");
  const [signupNameInput, setSignupNameInput] = useState("");
  const [signupPasswordInput, setSignupPasswordInput] = useState("");
  const [visibility, setVisibility] = useState(false);
  const [isUserLogedIn, setIsUserLogedIn] = useState("");

  const route = useRouter();
  const cookies = new Cookies();
  const token = cookies.get("ut");

  useEffect(() => {
    setIsUserLogedIn(token);
  }, [token]);

  if (isUserLogedIn) route.push("/dashboard");

  const signupSubmit = async () => {
    axios
      .post("http://localhost:4000/user/signup", {
        username: signupUsernameInput,
        name: signupNameInput,
      })
      .then((res) => {
        console.log(res.data.token);
        cookies.set("ut", res.data.token);
      })
      .catch((error) => console.log(error));
    setSignupUsernameInput("");
    setSignupNameInput("");
    setSignupPasswordInput("");
    route.push("/login");
  };

  console.log(signupUsernameInput, signupNameInput);

  const visibilityIconClick = () => {
    setVisibility(!visibility);
  };

  return (
    <>
      <section className={styles.imageContainer}>
        <Image src="/images/loginBackground.jpg" layout="fill" />
      </section>

      <section className={styles.signup}>
        <div className={styles.container}>
          <input
            onChange={(e) => setSignupUsernameInput(e.target.value)}
            value={signupUsernameInput}
            type="text"
            placeholder="Username"
            className={styles.usernameInput}
          />

          <input
            onChange={(e) => setSignupNameInput(e.target.value)}
            value={signupNameInput}
            type="text"
            placeholder="Name"
            className={styles.nameInput}
          />

          <FormControl sx={{ m: 0.5, width: "18ch" }} variant="standard" auto>
            <Input
              autoFocus="true"
              className={styles.passwordInput}
              placeholder="Password"
              required="true"
              autoComplete="new-password"
              disableUnderline={true}
              id="standard-adornment-password"
              type={visibility ? "text" : "password"}
              value={signupPasswordInput}
              onChange={(e) => setSignupPasswordInput(e.target.value)}
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
          <button className={styles.btn} onClick={() => signupSubmit()}>
            Sign Up
          </button>

          <button className={styles.backClick} onClick={() => route.push("/")}>
            Home
          </button>
        </div>
      </section>
    </>
  );
};

export default SignUp;
