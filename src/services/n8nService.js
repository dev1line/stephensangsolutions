import axios from 'axios'

const N8N_WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL || ''

class N8nService {
  /**
   * Lấy danh sách bài viết blog từ n8n webhook
   * @returns {Promise<Array>} Danh sách bài viết
   */
  async getPosts() {
    if (!N8N_WEBHOOK_URL) {
      console.warn('N8N_WEBHOOK_URL chưa được cấu hình')
      return []
    }

    try {
      const response = await axios.get(`${N8N_WEBHOOK_URL}?action=getPosts`, {
        timeout: 10000,
      })
      return response.data.posts || response.data || []
    } catch (error) {
      console.error('Error fetching posts from n8n:', error)
      throw new Error('Không thể tải bài viết từ n8n')
    }
  }

  /**
   * Gửi form liên hệ qua n8n webhook
   * @param {Object} formData - Dữ liệu form liên hệ
   * @returns {Promise<void>}
   */
  async sendContactForm(formData) {
    if (!N8N_WEBHOOK_URL) {
      console.warn('N8N_WEBHOOK_URL chưa được cấu hình')
      // Fallback: chỉ log ra console trong development
      if (import.meta.env.DEV) {
        console.log('Contact form data:', formData)
        return Promise.resolve()
      }
      throw new Error('N8N webhook chưa được cấu hình')
    }

    try {
      await axios.post(
        `${N8N_WEBHOOK_URL}?action=contact`,
        {
          ...formData,
          timestamp: new Date().toISOString(),
        },
        {
          timeout: 10000,
        }
      )
    } catch (error) {
      console.error('Error sending contact form to n8n:', error)
      throw new Error('Không thể gửi form liên hệ')
    }
  }

  /**
   * Trigger n8n workflow để tự động upload blog post
   * N8n workflow sẽ tự động lấy bài viết từ nguồn (RSS, API, etc.) và cập nhật
   * @param {Object} postData - Dữ liệu bài viết (optional, n8n có thể tự lấy)
   * @returns {Promise<void>}
   */
  async triggerBlogPostUpload(postData = null) {
    if (!N8N_WEBHOOK_URL) {
      console.warn('N8N_WEBHOOK_URL chưa được cấu hình')
      return
    }

    try {
      await axios.post(
        `${N8N_WEBHOOK_URL}?action=uploadPost`,
        {
          post: postData,
          timestamp: new Date().toISOString(),
        },
        {
          timeout: 15000,
        }
      )
    } catch (error) {
      console.error('Error triggering blog post upload:', error)
      throw new Error('Không thể trigger n8n workflow')
    }
  }
}

export const n8nService = new N8nService()

