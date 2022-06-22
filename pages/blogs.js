import axios from "axios";

export const getStaticProps = async () => {
  const { data } = await axios.get("http://localhost:4000/blog");

  return {
    props: {
      data,
    },
  };
};

const Blogs = ({ data }) => {
  console.log(data);
  return (
    <>
      <div>blogs page</div>
    </>
  );
};

export default Blogs;
