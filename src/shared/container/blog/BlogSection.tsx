import React from 'react';
import Link from 'next/link';
import BlogCard from './BlogCard';
import { BlogInfoDummy } from '@/shared/models/static/WebinarInfoDummy';

interface BlogSectionProps {
  category: 'karir' | 'studi';
  title?: string;
  maxItems?: number;
}

export default function BlogSection({ 
  category, 
  title = "Blog Pilihan K-Zen",
  maxItems = 4
}: BlogSectionProps) {
  const filteredBlogs = BlogInfoDummy
    .filter(blog => blog.category === category)
    .slice(0, maxItems);

  const [featuredBlog, ...otherBlogs] = filteredBlogs;

  if (!featuredBlog) return null;

  return (
    <div className='py-20 px-20'>
      <div className='flex justify-between items-center mb-12'>
        <h2 className='text-4xl font-semibold text-Kzen-dark'>
          {title}
        </h2>
        <Link 
          href="/blog" 
          className='text-Kzen-primary hover:text-Kzen-secondary transition-colors text-lg font-medium'
        >
          Lihat Semua
        </Link>
      </div>

      <div className='grid grid-cols-2 gap-8'>
        <div>
          <BlogCard
            title={featuredBlog.title}
            description={featuredBlog.description}
            date={featuredBlog.date}
            image={featuredBlog.image}
            featured={true}
          />
        </div>

        <div className='space-y-4'>
          {otherBlogs.map((blog, index) => (
            <BlogCard
              key={index}
              title={blog.title}
              description={blog.description}
              date={blog.date}
              image={blog.image}
              featured={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
}