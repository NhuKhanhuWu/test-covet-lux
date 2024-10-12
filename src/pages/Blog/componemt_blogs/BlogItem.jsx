/** @format */
import styles from "../Blogs.module.css";
import { Link } from "react-router-dom";

function BigBlogItem({ blog }) {
  const postDate = new Date(blog?.creationAt);
  // const [isHover, setHover] = useState(false);

  return (
    <Link to={`/test-covet-lux/blog?id=${blog.id}`} className={styles.blogItem}>
      <div className={styles.imgContainer}>
        <img
          alt={blog.title}
          src={blog.images[0]}
          className={`img ${styles.blogImg}`}
          loading="lazy"></img>
        <img
          alt={blog.title}
          src={blog.images[1]}
          className={`img ${styles.blogImg}`}
          loading="lazy"></img>
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
