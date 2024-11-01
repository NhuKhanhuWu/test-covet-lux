/** @format */
import { Link } from "react-router-dom";

import styles from "./BlogItem.module.css";
import Img from "../Img.jsx";

function BlogItem({ blog }) {
  return (
    <Link to={`/test-covet-lux/blog?id=${blog.id}`} className={styles.blog}>
      <div className="overflow-container">
        <Img
          alt={blog.title}
          imgSrc={blog.images[0]}
          elClass={`img overflow-item ${styles.blogImg}`}></Img>
      </div>

      <p className={styles.title}>{blog.title}</p>
      <p className={styles.category}>{blog.category.name}</p>
      <p>{blog.description.slice(0, 100)}[...]</p>
    </Link>
  );
}

export default BlogItem;
