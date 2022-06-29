import styles from "../../styles/NewBlog.module.css";
import { Editor } from "@tinymce/tinymce-react";
import { useRef, useState } from "react";
import Head from "next/head";
import Cookies from "universal-cookie";
import { ErrorToast, SuccessToast } from "../../components/Toast";
import { Toaster } from "react-hot-toast";

const NewBlog = () => {
  const [title, setTitle] = useState("");
  const [essayURL, setEssayURL] = useState("");
  const editorRef = useRef(null);
  const cookies = new Cookies();
  const token = `ut ${cookies.get("ut")}`;

  const submitEssay = () => {
    fetch("http://localhost:4000/blog/write", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        auth: token,
      },
      body: JSON.stringify({
        title: title,
        content: editorRef.current.getContent(),
        imgurl: essayURL,
      })
    })
    .then((res) => {
      console.log(res);
      return res.json();
    })
    .then((data) => {
      if(data.msg === "ok") SuccessToast("Your essay submited")
      if(data.msg === "bad request: bad inputs") ErrorToast("Please fill the inputs")
      console.log(data);
      setTitle("")
      setEssayURL("")
    })
  };

  return (
    <>
    <Toaster />
      <Head>
        <script
          src="https://cdn.tiny.cloud/1/c5z4fa6vguypc5cqkbvq3rzzfxwjvho0jk53egogbgwc50t0/tinymce/6/tinymce.min.js"
          referrerpolicy="origin"
        ></script>
      </Head>
      <section className={styles.main}>
        <div className={styles.tyni}>
        <Editor
          onInit={(evt, editor) => (editorRef.current = editor)}
          init={{
            width: "100%",
            height: 350,
            menubar: false,
            plugins: [
              "advlist autolink lists link image charmap print preview anchor",
              "searchreplace visualblocks code fullscreen",
              "insertdatetime media table paste code help wordcount",
            ],
            toolbar:
              "undo redo | formatselect | " +
              "bold italic backcolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
        />
        </div>
      </section>

      <section className={styles.inputs}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.input}
            type="text"
            placeholder="title"
          />
          <br />
          <input
            value={essayURL}
            onChange={(e) => setEssayURL(e.target.value)}
            className={styles.input}
            type="text"
            placeholder="image URL"
          />
          <br />

          <button onClick={() => submitEssay()} className={styles.button}>
            submit
          </button>
        </section>
    </>
  );
};

export default NewBlog;
