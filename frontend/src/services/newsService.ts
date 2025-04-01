import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL

export interface NewsItem {
  id: number
  title: string
  body: string
  image_url: string
  author: string
  date: string
}

export const getAllNews = async (): Promise<NewsItem[]> => {
  const response = await axios.get<NewsItem[]>(`${API_BASE_URL}/news`)
  return response.data
}