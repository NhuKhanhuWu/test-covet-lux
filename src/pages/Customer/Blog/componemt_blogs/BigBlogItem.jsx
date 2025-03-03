/** @format */
import { Link } from "react-router-dom";

import styles from "../Blogs.module.css";
import Img from "../../../../components/Img.jsx";

function BigBlogItem({ blog }) {
  const postDate = new Date(blog?.creationAt);

  return (
    <Link to={`/test-covet-lux/blog?id=${blog.id}`} className={styles.blogItem}>
      <div className={styles.imgContainer}>
        <Img
          alt={blog.title}
          imgSrc={blog.images[0]}
          elClass={`img ${styles.blogImg}`}></Img>
        <Img
          alt={blog.title}
          imgSrc={blog.images[1]}
          elClass={`img ${styles.blogImg}`}></Img>
      </div>

      <div className={styles.blogTxt}>
        <div className={`thin-txt`}>
          Posted on {postDate.toLocaleDateString("en-GB")}
        </div>

        <div className={styles.blogTitle}>{blog.title}</div>

        <p className={`thin-txt ${styles.blogSummary}`}>
          {blog.description.slice(0, 150)}...
        </p>
      </div>
    </Link>
  );
}

export default BigBlogItem;
