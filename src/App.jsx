import { BrowserRouter as Router, Routes, Route, Link, Outlet } from 'react-router-dom';
import Home from './pages/Home';
import Post from './pages/Post';
import './index.css';

const Layout = () => {
  return (
    <>
      <header className="header">
        <div className="header-content">
          <Link to="/" className="brand">Blogspot</Link>
          <nav className="nav-links">
            <Link to="/" className="nav-link">Home</Link>
            <a href="/admin" className="nav-link">Admin (CMS)</a>
          </nav>
        </div>
      </header>
      <main className="container">
        <Outlet />
      </main>
    </>
  );
};

function App() {
  return (
    <Router basename="/SnazBlogspot">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="post/:id" element={<Post />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
