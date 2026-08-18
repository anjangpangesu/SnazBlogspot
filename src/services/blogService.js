import blogsData from '../data/blogs.json';

export const getBlogs = async () => {
  return blogsData;
};

export const getBlog = async (id) => {
  return blogsData.find(blog => blog.id === id) || null;
};
