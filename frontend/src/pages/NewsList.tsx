import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Box,
  Container,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button
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
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 3,
        }}
      >
        {news.map((item) => (
          <Box
            key={item.id}
            sx={{
              flex: '1 1 300px',
              minWidth: '280px',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Card sx={{ width: '100vw', display: 'flex', flexDirection: 'column' }}>
              {item.image_url && (
                <CardMedia
                  component="img"
                  height="200"
                  image={item.image_url}
                  alt={item.title}
                />
              )}
              <CardContent>
                <Typography
                  variant="h6"
                  gutterBottom
                  component={Link}
                  to={`/news/${item.id}`}
                  sx={{ textDecoration: 'none', color: 'inherit' }}
                >
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
