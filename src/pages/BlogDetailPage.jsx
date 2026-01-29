import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaClock } from "react-icons/fa";
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
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toc, setToc] = useState([]);
  const [activeHeadingId, setActiveHeadingId] = useState("");
  const [tocOverflow, setTocOverflow] = useState({}); // id -> pixels to scroll
  const [tocHoveredId, setTocHoveredId] = useState(null);
  const contentRef = useRef(null);
  const tocNavRef = useRef(null);

  useEffect(() => {
    fetchBlogPost();
  }, [id, language]);

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
          (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
        );
        setActiveHeadingId(byTop[0].target.id);
      },
      {
        rootMargin: "-80px 0px -70% 0px",
        threshold: 0,
      },
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

  // Measure TOC item overflow (title too long) for scroll-on-hover animation
  useEffect(() => {
    if (!toc.length || !tocNavRef.current) return;
    const measure = () => {
      const ul = tocNavRef.current;
      if (!ul) return;
      const links = ul.querySelectorAll("a[data-toc-id]");
      const next = {};
      links.forEach((a) => {
        const id = a.getAttribute("data-toc-id");
        const span = a.querySelector(".toc-title-span");
        if (!id || !span) return;
        const overflow = span.scrollWidth - a.clientWidth;
        if (overflow > 0) next[id] = Math.ceil(overflow);
      });
      setTocOverflow((prev) =>
        JSON.stringify(prev) === JSON.stringify(next) ? prev : next,
      );
    };
    const raf = requestAnimationFrame(() => measure());
    return () => cancelAnimationFrame(raf);
  }, [toc]);

  const fetchBlogPost = async () => {
    setLoading(true);
    setError(null);
    try {
      const posts = await n8nService.getPosts(language);
      const foundPost = posts.find((p) => (p.id || p._id)?.toString() === id);

      if (foundPost) {
        setPost(foundPost);
        const currentId = (foundPost.id || foundPost._id)?.toString();
        const currentTags = new Set(
          Array.isArray(foundPost.tags) ? foundPost.tags : [],
        );
        const others = posts
          .filter((p) => (p.id || p._id)?.toString() !== currentId)
          .map((p) => {
            const pTags = Array.isArray(p.tags) ? p.tags : [];
            const matchCount = pTags.filter((t) => currentTags.has(t)).length;
            return { post: p, matchCount };
          })
          .sort((a, b) => b.matchCount - a.matchCount)
          .slice(0, 3)
          .map(({ post: p }) => p);
        setRelatedPosts(others);
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
  const ogImage = normalizeUrl(post.image || `${baseUrl}/og-image.png`);

  return (
    <article className="section-container min-h-screen w-full max-w-full overflow-x-hidden">
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
      {/* Desktop: wrapper gom content + chỗ phụ lục, phụ lục fixed đặt sát cạnh phải */}
      <div className="w-full max-w-full min-w-0 mx-auto lg:max-w-6xl lg:pr-[17rem] flex flex-col lg:flex-row lg:items-start gap-6 md:gap-8 lg:gap-10 xl:gap-12 lg:min-w-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1 min-w-0 max-w-4xl overflow-x-hidden">
          {post.image && (
            <div className="w-full h-64 sm:h-72 md:h-80 lg:h-96 overflow-hidden rounded-xl mb-6 md:mb-8 flex justify-center">
              <img
                src={normalizeUrl(post.image)}
                alt={post.title}
                className="w-full h-full object-cover max-w-4xl mx-auto"
              />
            </div>
          )}

          <header className="mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-slate-100 mb-4 md:mb-6">
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

          <div className="prose prose-lg max-w-none blog-detail-content break-words overflow-x-auto">
            <div
              ref={contentRef}
              className="text-gray-700 dark:text-slate-300 leading-relaxed min-w-0"
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

          {relatedPosts.length > 0 && (
            <section className="mt-16 pt-12 border-t border-gray-200 dark:border-slate-600">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-100 mb-6">
                {t.blog.relatedPosts}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {relatedPosts.map((related, index) => (
                  <button
                    key={related.id || related._id || index}
                    type="button"
                    onClick={() =>
                      navigate(`/blog-detail/${related.id || related._id}`)
                    }
                    className="text-left rounded-xl border-2 border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800/50 hover:border-primary-500 dark:hover:border-primary-500 transition-colors overflow-hidden group">
                    {related.image && (
                      <div className="w-full h-36 overflow-hidden">
                        <img
                          src={normalizeUrl(related.image)}
                          alt={related.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 dark:text-slate-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 line-clamp-2">
                        {related.title}
                      </h3>
                      <p className="mt-1 text-sm text-gray-600 dark:text-slate-400 line-clamp-2">
                        {related.excerpt || related.description || ""}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          )}
        </motion.div>

        {toc.length > 0 && (
          <aside
            className="hidden lg:block fixed right-6 top-24 w-56 xl:w-64 max-h-[calc(100vh-6rem)] overflow-y-auto z-20 lg:right-[max(1.5rem,calc(50vw-36rem))]"
            aria-label={t.blog.tableOfContents}>
            <nav className="rounded-xl border-2 border-gray-200 dark:border-slate-500 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm p-4 shadow-md dark:shadow-none ring-1 ring-gray-200/50 dark:ring-slate-600/50">
              <h2 className="text-sm font-semibold text-gray-900 dark:text-slate-100 mb-3">
                {t.blog.tableOfContents}
              </h2>
              <ul ref={tocNavRef} className="space-y-1.5 text-sm">
                {toc.map(({ level, text, id: headingId }) => {
                  const isActive = activeHeadingId === headingId;
                  const overflowPx = tocOverflow[headingId] ?? 0;
                  const isHovered = tocHoveredId === headingId;
                  const shouldScroll = overflowPx > 0 && isHovered;
                  return (
                    <li
                      key={headingId}
                      style={{ paddingLeft: level === 3 ? "1rem" : 0 }}>
                      <a
                        href={`#${headingId}`}
                        data-toc-id={headingId}
                        className={`block py-1.5 px-2 -mx-2 rounded-lg overflow-hidden transition-colors ${
                          isActive
                            ? "bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 font-semibold"
                            : "text-gray-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-slate-700/50"
                        }`}
                        onMouseEnter={() => setTocHoveredId(headingId)}
                        onMouseLeave={() => setTocHoveredId(null)}>
                        <span
                          className="toc-title-span whitespace-nowrap inline-block transition-transform duration-500 ease-out"
                          style={{
                            transform: shouldScroll
                              ? `translateX(-${overflowPx + 25}px)`
                              : "translateX(0)",
                          }}>
                          {text}
                        </span>
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
