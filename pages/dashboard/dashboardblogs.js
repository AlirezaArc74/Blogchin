import { useEffect } from "react";
import Cookies from "universal-cookie";

export const getStaticProps = async () => {
  const cookies = new Cookies();
  const token = `ut ${cookies.get("ut")}`;
  console.log("test")
  const res = await fetch("http://localhost:4000/blog/my-blogs",{
    
    method: "GET",
    headers: {
      auth: token
    },
  });
  const data = await res.json();
  return {
    props: {
      data
    }
  }
};

const Dashboardblogs = ({data}) => {

console.log(data)
  return (
    <>
      <div>dashboard blogs page</div>
    </>
  );
};

export default Dashboardblogs;
