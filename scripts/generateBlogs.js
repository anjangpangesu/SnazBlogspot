import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDir = path.join(process.cwd(), 'content', 'blogs');
const outputDir = path.join(process.cwd(), 'src', 'data');
const outputFile = path.join(outputDir, 'blogs.json');

const generateBlogs = () => {
  if (!fs.existsSync(contentDir)) {
    fs.mkdirSync(contentDir, { recursive: true });
  }

  const files = fs.readdirSync(contentDir);
  const blogs = files
    .filter(filename => filename.endsWith('.md'))
    .map(filename => {
      const filePath = path.join(contentDir, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);
      
      return {
        id: filename.replace(/\.md$/, ''),
        title: data.title,
        date: data.date ? new Date(data.date).getTime() : Date.now(),
        published: data.published !== false,
        content: content
      };
    })
    .sort((a, b) => b.date - a.date); // Sort by date descending

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(outputFile, JSON.stringify(blogs, null, 2));
  console.log(`Generated ${blogs.length} blogs into src/data/blogs.json`);
};

generateBlogs();
