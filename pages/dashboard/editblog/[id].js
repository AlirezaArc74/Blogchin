import styles from "../../../styles/EditBlog.module.css";
import { Editor } from "@tinymce/tinymce-react";
import { useEffect, useRef, useState } from "react";
import Cookies from "universal-cookie";

export const getServerSideProps = async (context) => {
  const { id } = context.params;
  console.log(id);
  const res = await fetch(`http://localhost:4000/blog/single-blog/${id}`);
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
};

const Edit = ({ data }) => {
  const [userData, setUserData] = useState(null);
  const editorRef = useRef(null);
  const cookies = new Cookies();
  const token = `ut ${cookies.get("ut")}`;

  useEffect(() => {
    setUserData(data);
  }, [data]);

  const submitEssayEdit = () => {
    {
      console.log(userData?._id);
    }
    try {
      fetch("http://localhost:4000/blog/edit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          auth: token,
        },
        body: JSON.stringify({
          blogId: userData?._id, // the id of the blog u want to edita
          data: {
            title: userData?.title,
            content: editorRef.current.getContent(),
            imgurl: userData?.imgurl,
          },
        }),
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

  console.log(data);
  return (
    <>
      <section className={styles.main}>
        <div className={styles.tiny}>
        <Editor
          initialValue={userData?.content}
          className={styles.tyni}
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
          className={styles.input}
          onChange={(e) => setUserData({ ...userData, title: e.target.value })}
          type="text"
          value={userData?.title}
        />
        <br />
        <input
          className={styles.input}
          onChange={(e) => setUserData({ ...userData, imgurl: e.target.value })}
          type="text"
          value={userData?.imgurl}
        />
        <br />

        <button className={styles.button} onClick={() => submitEssayEdit()}>
          submit
        </button>
      </section>
    </>
  );
};

export default Edit;
