import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { getBlog } from '../services/blogService';

const Post = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      const fetchedBlog = await getBlog(id);
      setBlog(fetchedBlog);
      setLoading(false);
    };
    fetchBlog();
  }, [id]);

  if (loading) {
    return <div className="text-center mt-4">Loading article...</div>;
  }

  if (!blog) {
    return (
      <div className="text-center mt-4">
        <h2>Article not found</h2>
        <Link to="/" className="btn btn-primary mt-4">Return Home</Link>
      </div>
    );
  }

  return (
    <article>
      <div className="post-header">
        <h1 className="post-title">{blog.title}</h1>
        <div className="card-meta">
          Published on {new Date(blog.date).toLocaleDateString()}
        </div>
      </div>
      <div className="post-content">
        <ReactMarkdown>{blog.content}</ReactMarkdown>
      </div>
      <div className="mt-4 pt-4" style={{ borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" className="btn btn-outline">Back to Home</Link>
        <button 
          className="btn btn-primary"
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard!');
          }}
        >
          Share Article
        </button>
      </div>
    </article>
  );
};

export default Post;
