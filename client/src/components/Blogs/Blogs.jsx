import React from 'react';
import BlogCard from './BlogCard'; // Import BlogCard component
import Img1 from '../Blogs/blog1.webp';
import Img2 from '../Blogs/blog2.webp';
import Img3 from '../Blogs/blog3.jpg';

const BlogData = [
  {
    img: Img1,
    title: 'No one has ever become poor from giving.',
    description: 'Lorem ipsum dolor sit amet.',
    date: 'April 22, 2024',
    writer: 'John',
  },
  {
    img: Img2,
    title: 'The secret of getting ahead is getting started.',
    description: 'Start your journey today with a focused mind.',
    date: 'April 23, 2024',
    writer: 'Jane',
  },
  {
    img: Img3,
    title: 'Dream big, work hard, and stay humble.',
    description: 'Never forget the importance of humility in success.',
    date: 'April 24, 2024',
    writer: 'Alice',
  },
];

const Blogs = () => {
  return (
    <div className="dark:bg-gray-900 dark:text-white">
      <div className="container mx-auto py-8 px-4">
        <h1 className="mb-8 border-l-8 pl-4 text-center text-3xl font-bold">Our Latest Blogs</h1>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {BlogData.map((blog, index) => (
            <BlogCard
              key={index} // Use `index` as a key if titles aren't guaranteed unique
              img={blog.img}
              title={blog.title}
              description={blog.description}
              date={blog.date}
              writer={blog.writer}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
