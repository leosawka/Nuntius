import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getNewsById, NewsItem } from '../services/newsService'
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Box,
  Button,
  Breadcrumbs
} from '@mui/material'

const NewsDetail = () => {
  const { id } = useParams<{ id: string }>()
  const [news, setNews] = useState<NewsItem | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        if (id) {
          const data = await getNewsById(Number(id))
          setNews(data)
        }
      } catch (error) {
        console.error('Error fetching news:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [id])

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    )
  }

  if (!news) {
    return (
      <Container>
        <Typography variant="h5" color="error" mt={5}>
          News not found.
        </Typography>
        <Button component={Link} to="/" variant="outlined" sx={{ mt: 2 }}>
          Go back
        </Button>
      </Container>
    )
  }

  return (
    <Box sx={{ display: 'flex', justifySelf: 'center', py: 4 }}>
      <Card sx={{ width: '95vw'}}>
        <Box sx={{ px: 3, pt: 2 }}>
          <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              Home
            </Link>
            <Typography color="text.primary">{news.title}</Typography>
          </Breadcrumbs>
        </Box>
        {news.image_url && (
          <CardMedia
            component="img"
            height="300"
            image={news.image_url}
            alt={news.title}
            sx={{ width: '100vw', objectFit: 'cover' }}
          />
        )}
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {news.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            {news.author} — {new Date(news.date).toLocaleDateString()}
          </Typography>
          <Typography variant="body1" mt={2}>
            {news.body}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              mt: 3
            }}
          >
            <Button
              sx={{
                transition: 'transform 0.2s',
                '&:hover': { transform: 'scale(1.02)', boxShadow: 6 }
              }}
              variant="outlined"
              color="primary"
            >
              Edit
            </Button>
            <Button
              sx={{
                transition: 'transform 0.2s',
                '&:hover': { transform: 'scale(1.02)', boxShadow: 6 }
              }}
              variant="outlined"
              color="error"
            >
              Delete
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )  
}

export default NewsDetail
