import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaClock, FaArrowLeft } from "react-icons/fa";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../locales";
import { n8nService } from "../services/n8nService";
import { normalizeUrl } from "../utils/urlUtils";
import Badge from "../components/atoms/Badge";
import Button from "../components/atoms/Button";
import SEOHead from "../components/molecules/SEOHead";

const slugify = (text) =>
  String(text)
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-\u0080-\uFFFF]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

const BlogDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language];
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toc, setToc] = useState([]);
  const [activeHeadingId, setActiveHeadingId] = useState("");
  const contentRef = useRef(null);

  useEffect(() => {
    fetchBlogPost();
  }, [id]);

  // Highlight TOC item for the section currently in view
  useEffect(() => {
    if (!post || !contentRef.current || toc.length === 0) return;
    const headings = contentRef.current.querySelectorAll("h2[id], h3[id]");
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;
        const byTop = [...visible].sort(
          (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
        );
        setActiveHeadingId(byTop[0].target.id);
      },
      {
        rootMargin: "-80px 0px -70% 0px",
        threshold: 0,
      }
    );

    headings.forEach((h) => observer.observe(h));
    return () => headings.forEach((h) => observer.unobserve(h));
  }, [post, toc.length]);

  // Build TOC and add ids to headings, add copy buttons to code blocks
  useEffect(() => {
    if (!post || !contentRef.current) return;
    const el = contentRef.current;
    const headings = el.querySelectorAll("h2, h3");
    const entries = [];
    headings.forEach((h) => {
      const level = h.tagName === "H2" ? 2 : 3;
      const text = h.textContent || "";
      const slug = slugify(text) || `heading-${entries.length}`;
      h.id = slug;
      entries.push({ level, text, id: slug });
    });
    setToc(entries);

    const pres = el.querySelectorAll("pre");
    pres.forEach((pre) => {
      if (pre.closest(".blog-code-wrapper")) return;
      const wrapper = document.createElement("div");
      wrapper.className = "blog-code-wrapper relative group";
      pre.parentNode.insertBefore(wrapper, pre);
      wrapper.appendChild(pre);
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className =
        "absolute top-2 right-2 px-3 py-1.5 text-xs font-medium rounded-lg bg-gray-700 text-white hover:bg-gray-600 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity";
      btn.innerHTML = `<span class="copy-text">${t.blog.copy}</span><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>`;
      btn.addEventListener("click", () => {
        const code = pre.querySelector("code")
          ? pre.querySelector("code").textContent
          : pre.textContent;
        navigator.clipboard?.writeText(code).then(() => {
          const span = btn.querySelector(".copy-text");
          if (span) {
            span.textContent = t.blog.copied;
            setTimeout(() => {
              span.textContent = t.blog.copy;
            }, 2000);
          }
        });
      });
      pre.classList.add("!mt-0", "!rounded-b-lg");
      wrapper.appendChild(btn);
    });
  }, [post, t.blog.copy, t.blog.copied]);

  const fetchBlogPost = async () => {
    setLoading(true);
    setError(null);
    try {
      const posts = await n8nService.getPosts();
      const foundPost = posts.find((p) => (p.id || p._id)?.toString() === id);

      if (foundPost) {
        setPost(foundPost);
      } else {
        setError(t.blog.notFound);
      }
    } catch (err) {
      setError(t.blog.error);
      console.error("Error fetching post:", err);
    } finally {
      setLoading(false);
    }
  };

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

  if (loading) {
    return (
      <section className="section-container min-h-screen">
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          <p className="mt-4 text-gray-600">{t.blog.loading}</p>
        </div>
      </section>
    );
  }

  if (error || !post) {
    return (
      <section className="section-container min-h-screen">
        <div className="text-center py-12">
          <p className="text-red-600 text-lg mb-4">
            {error || t.blog.notFound}
          </p>
          <Button onClick={() => navigate("/blog")}>{t.blog.backToBlog}</Button>
        </div>
      </section>
    );
  }

  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
  const blogUrl = `${baseUrl}/blog-detail/${id}`;
  const ogImage = normalizeUrl(post.image || `${baseUrl}/og-image.svg`);

  return (
    <article className="section-container min-h-screen lg:pr-[18rem]">
      <SEOHead
        title={`${post.title} | S2 Solutions`}
        description={
          post.excerpt ||
          post.description ||
          post.content?.substring(0, 160) ||
          "Bài viết từ S2 Solutions"
        }
        image={ogImage}
        url={blogUrl}
        type="article"
      />
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1 min-w-0 max-w-4xl">
          <Button
            variant="ghost"
            onClick={() => navigate("/blog")}
            className="mb-8">
            <FaArrowLeft className="inline mr-2" />
            {t.blog.backToBlog}
          </Button>

          {post.image && (
            <div className="w-full h-80 lg:h-96 overflow-hidden rounded-xl mb-8 flex justify-center">
              <img
                src={normalizeUrl(post.image)}
                alt={post.title}
                className="w-full h-full object-cover max-w-4xl mx-auto"
              />
            </div>
          )}

          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-slate-100 mb-4">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-gray-600 dark:text-slate-400 mb-4">
              {post.publishedAt && (
                <div className="flex items-center gap-2">
                  <FaCalendarAlt />
                  <span>{formatDate(post.publishedAt)}</span>
                </div>
              )}
              {post.readTime && (
                <div className="flex items-center gap-2">
                  <FaClock />
                  <span>
                    {post.readTime} {t.blog.minutesRead}
                  </span>
                </div>
              )}
            </div>

            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <Badge key={index} variant="default">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </header>

          <div className="prose prose-lg max-w-none blog-detail-content">
            <div
              ref={contentRef}
              className="text-gray-700 dark:text-slate-300 leading-relaxed"
              dangerouslySetInnerHTML={{
                __html:
                  post.content ||
                  post.description ||
                  post.excerpt ||
                  "Nội dung bài viết...",
              }}
            />
          </div>

          {post.url && (
            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-slate-600">
              <a
                href={normalizeUrl(post.url)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2">
                {t.blog.readOriginal}
              </a>
            </div>
          )}
        </motion.div>

        {toc.length > 0 && (
          <aside
            className="hidden lg:block fixed w-56 xl:w-64 max-h-[calc(100vh-6rem)] overflow-y-auto z-20"
            style={{
              left: "calc(50vw + 17rem + 20px)",
              top: "calc(6rem + 110px)",
            }}
            aria-label={t.blog.tableOfContents}>
            <nav className="rounded-xl border-2 border-gray-200 dark:border-slate-500 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm p-4 shadow-md dark:shadow-none ring-1 ring-gray-200/50 dark:ring-slate-600/50">
              <h2 className="text-sm font-semibold text-gray-900 dark:text-slate-100 mb-3">
                {t.blog.tableOfContents}
              </h2>
              <ul className="space-y-1.5 text-sm">
                {toc.map(({ level, text, id: headingId }) => {
                  const isActive = activeHeadingId === headingId;
                  return (
                    <li
                      key={headingId}
                      style={{ paddingLeft: level === 3 ? "1rem" : 0 }}
                      className="truncate">
                      <a
                        href={`#${headingId}`}
                        className={`block py-1.5 px-2 -mx-2 rounded-lg transition-colors ${
                          isActive
                            ? "bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 font-semibold"
                            : "text-gray-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-slate-700/50"
                        }`}>
                        {text}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </aside>
        )}
      </div>
    </article>
  );
};

export default BlogDetailPage;
