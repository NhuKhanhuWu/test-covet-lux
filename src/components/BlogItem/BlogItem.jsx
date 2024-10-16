/** @format */
import styles from "./BlogItem.module.css";
import { Link } from "react-router-dom";

function BlogItem({ blog }) {
  return (
    <Link to={`/test-covet-lux/blog?id=${blog.id}`} className={styles.blog}>
      <div className="overflow-container">
        <img
          alt={blog.title}
          src={blog?.images[0]?.replace("[", "").replace('"', "")}
          className={`img overflow-item ${styles.blogImg}`}
          loading="lazy"></img>
      </div>

      <p className={styles.title}>{blog.title}</p>
      <p className={styles.category}>{blog.category.name}</p>
      <p>{blog.description.slice(0, 100)}[...]</p>
    </Link>
  );
}

export default BlogItem;
