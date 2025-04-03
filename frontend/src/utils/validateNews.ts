export interface NewsFormData {
    title: string
    body: string
    image_url: string
    author: string
    date: string
  }
  
  export interface NewsFormErrors {
    title: string
    body: string
    author: string
    date: string
    image_url: string
  }
  
  export function validateNews(formData: NewsFormData): NewsFormErrors {
    const newErrors: NewsFormErrors = {
      title: '',
      body: '',
      author: '',
      date: '',
      image_url: ''
    }
  
    if (!formData.title.trim()) newErrors.title = 'Title is required'
    if (!formData.body.trim()) newErrors.body = 'Body is required'
    if (!formData.author.trim()) newErrors.author = 'Author is required'
  
    if (!formData.date.trim()) {
      newErrors.date = 'Date is required'
    } else {
      const selectedDate = new Date(formData.date)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      if (selectedDate > today) {
        newErrors.date = 'Date cannot be in the future'
      }
    }
  
    if (formData.image_url.trim()) {
      const urlRegex = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,6})(\/[\w.-]*)*\/?(\?.*)?$/i
      if (!urlRegex.test(formData.image_url)) {
        newErrors.image_url = 'Invalid URL'
      }
    }
  
    return newErrors
  }
  