import { motion } from "framer-motion";
import { FaCalendarAlt, FaClock, FaExternalLinkAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext";
import { translations } from "../../locales";
import { normalizeUrl } from "../../utils/urlUtils";
import Badge from "../atoms/Badge";

const BlogCard = ({ post, index = 0 }) => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language];

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const locale = language === "vi" ? "vi-VN" : "en-US";
    return date.toLocaleDateString(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleClick = () => {
    navigate(`/blog-detail/${post.id || index}`);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="card flex flex-col cursor-pointer group"
      onClick={handleClick}>
      {post.image && (
        <div className="w-full h-48 overflow-hidden rounded-lg mb-4">
          <img
            src={normalizeUrl(post.image)}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>
      )}
      <h3 className="text-xl font-bold text-gray-800 dark:text-slate-100 mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
        {post.title}
      </h3>
      <p className="text-gray-600 dark:text-slate-300 mb-4 flex-grow line-clamp-3">
        {post.excerpt ||
          post.description ||
          post.content?.substring(0, 150) + "..."}
      </p>
      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-slate-400 mb-4">
        {post.publishedAt && (
          <div className="flex items-center gap-1">
            <FaCalendarAlt />
            <span>{formatDate(post.publishedAt)}</span>
          </div>
        )}
        {post.readTime && (
          <div className="flex items-center gap-1">
            <FaClock />
            <span>
              {post.readTime} {t.blog.minutes}
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {post.tags?.map((tag, tagIndex) => (
          <Badge key={tagIndex} variant="default">
            {tag}
          </Badge>
        ))}
      </div>
      <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400 group-hover:text-primary-700 dark:group-hover:text-primary-300 font-medium">
        {t.blog.readMore}
        <FaExternalLinkAlt className="text-sm group-hover:translate-x-1 transition-transform" />
      </div>
    </motion.article>
  );
};

export default BlogCard;
