import { motion } from 'framer-motion';

const blogPosts = [
  {
    id: 1,
    title: "Building Scalable React Applications",
    excerpt: "Learn the best practices for building large-scale React applications with modern architecture...",
    date: "May 10, 2025",
    readTime: "5 min read",
    category: "React",
    image: "https://picsum.photos/seed/react/400/250"
  },
  {
    id: 2,
    title: "The Power of TypeScript in Modern Development",
    excerpt: "Discover how TypeScript can improve your development workflow and catch errors early...",
    date: "May 8, 2025",
    readTime: "4 min read",
    category: "TypeScript",
    image: "https://picsum.photos/seed/typescript/400/250"
  },
  // Add more blog posts as needed
];

const Blog = () => {
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 dark:text-white">
          Latest Articles
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 text-sm px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400 text-sm ml-4">
                    {post.readTime}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2 dark:text-white">
                  {post.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 dark:text-gray-400 text-sm">
                    {post.date}
                  </span>
                  <button className="text-blue-600 dark:text-blue-400 hover:underline">
                    Read More →
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
