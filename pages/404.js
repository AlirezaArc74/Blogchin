import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styles from '../styles/Home.module.css'
import Image from "next/image";


const NotFound = () => {

    const router = useRouter()

    useEffect(() => {
        setTimeout(() => {
            router.push("/")

        },1000)
    },[])
  return (
    <>
      <div className={styles.notfound}>
          {/* <Image src="/images/book1.jpeg" layout="fill"/> */}
        <h1>Oooops.....</h1>
        <h2>That page connot be found</h2>
        <p>
          Go back to the
          <Link href="/">
            <a> Homepage</a>
          </Link>
        </p>
      </div>
    </>
  );
};

export default NotFound;
