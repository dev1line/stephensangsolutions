/**
 * Normalize URL để tránh lỗi Protocol Mismatch
 * Tự động chuyển HTTP thành HTTPS khi đang chạy trên HTTPS
 * @param {string} url - URL cần normalize
 * @returns {string} URL đã được normalize
 */
export const normalizeUrl = (url) => {
  if (!url || typeof url !== "string") return url;

  // Nếu đang chạy trên HTTPS và URL là HTTP, chuyển sang HTTPS
  if (typeof window !== "undefined" && window.location.protocol === "https:") {
    if (url.startsWith("http://")) {
      return url.replace("http://", "https://");
    }
  }

  return url;
};
