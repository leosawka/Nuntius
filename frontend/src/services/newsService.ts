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

export async function searchNews(term: string): Promise<NewsItem[]> {
  const response = await fetch(`${API_BASE_URL}/news/search?term=${encodeURIComponent(term)}`)
  if (!response.ok) throw new Error('Failed to search news')
  return response.json()
}

export const getNewsById = async (id: number): Promise<NewsItem> => {
  const response = await axios.get(`${API_BASE_URL}/news/${id}`)
  return response.data
}

export const createNews = async (newsData: Omit<NewsItem, 'id'>): Promise<void> => {
  await axios.post(`${API_BASE_URL}/news`, newsData)
}

export const updateNews = async (id: number, data: NewsItem): Promise<NewsItem> => {
  const response = await axios.put(`${API_BASE_URL}/news/${id}`, data)
  return response.data
}


export const deleteNews = async (id: number): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/news/${id}`)
}
