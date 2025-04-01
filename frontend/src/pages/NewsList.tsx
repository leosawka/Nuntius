import { useEffect, useState } from 'react'
import {
  Box,
  Container,
  Card,
  CardContent,
  CardMedia,
  Typography
} from '@mui/material'
import { getAllNews, NewsItem } from '../services/newsService'

const NewsList = () => {
  const [news, setNews] = useState<NewsItem[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await getAllNews()
        setNews(data)
      } catch (error: any) {
        console.error('Error fetching news:', error)
        setError(error.message || 'Unknown error')
      }
    }

    fetchNews()
  }, [])

  return (
    <Container sx={{ py: 4 }}>
      <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center'}}>
        {news.map((item) => (
          <Box key={item.id} sx={{flex: '1 1 300px', maxWidth: '400px', minWidth: '280px'}}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              {item.image_url && (<CardMedia component="img" height="200" image={item.image_url} alt={item.title}/>)}
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.author} — {new Date(item.date).toLocaleDateString()}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>
    </Container>
  )
}

export default NewsList
