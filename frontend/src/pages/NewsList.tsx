import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Box,
  Container,
  Card,
  CardContent,
  CardMedia,
  Typography,
  TextField
} from '@mui/material'
import { getAllNews, searchNews, NewsItem } from '../services/newsService'
import CustomTextField from '../components/CustomTextField'

const NewsList = () => {
  const [news, setNews] = useState<NewsItem[]>([])
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (searchTerm.trim()) {
          const results = await searchNews(searchTerm)
          setNews(results)
        } else {
          const data = await getAllNews()
          setNews(data)
        }
      } catch (error: any) {
        console.error('Error fetching news:', error)
        setError(error.message || 'Unknown error')
      }
    }

    const delayDebounce = setTimeout(() => {
      fetchData()
    }, 500)

    return () => clearTimeout(delayDebounce)
  }, [searchTerm])

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <CustomTextField
        label="Search"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 4, width: { xs: '100%', sm: '800px' }, mx: 'auto', display: 'block' }}
      />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 3
          }}
        >
          {news.map((item) => (
            <Box
              key={item.id}
              sx={{
                flex: '1 1 300px',
                maxWidth: '400px',
                minWidth: '280px'
              }}
            >
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
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
    </Container>
  )
}

export default NewsList
