/** @format */
import { PropTypes } from "proptype";
import styles from "./BlogItem.module.css";

function BlogItem({ blog }) {
  return (
    <div className={styles.blog}>
      <div className="overflow-container">
        <img
          alt={blog.title}
          src={blog.images[0]}
          className={`img overflow-item ${styles.blogImg}`}></img>
      </div>

      <p className={styles.title}>{blog.title}</p>
      <p className={styles.category}>{blog.category.name}</p>
      <p>{blog.description.slice(0, 100)}[...]</p>
    </div>
  );
}

BlogItem.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    images: PropTypes.array.isRequired,
    description: PropTypes.string,
    category: PropTypes.shape({
      name: PropTypes.string,
    }),
  }).isRequired,
};

export default BlogItem;
