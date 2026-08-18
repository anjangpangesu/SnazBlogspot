import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getBlogs } from '../services/blogService';
import ReactMarkdown from 'react-markdown';

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      const fetchedBlogs = await getBlogs();
      setBlogs(fetchedBlogs.filter(blog => blog.published));
      setLoading(false);
    };
    fetchBlogs();
  }, []);

  if (loading) {
    return <div className="text-center mt-4">Loading blogs...</div>;
  }

  return (
    <div>
      <h1 className="page-title">Latest Articles</h1>
      {blogs.length === 0 ? (
        <div className="text-center">No articles published yet.</div>
      ) : (
        <div className="blog-grid">
          {blogs.map(blog => (
            <div key={blog.id} className="card">
              <h2 className="card-title">
                <Link to={`/post/${blog.id}`}>{blog.title}</Link>
              </h2>
              <div className="card-meta">
                {new Date(blog.date).toLocaleDateString()}
              </div>
              <div className="card-excerpt">
                {blog.content.substring(0, 150)}...
              </div>
              <div style={{ marginTop: 'auto' }}>
                <Link to={`/post/${blog.id}`} className="btn btn-outline" style={{ fontSize: '0.875rem' }}>
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
