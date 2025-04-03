import { useEffect, useState } from 'react'
import {
  Container,
  Typography,
  Button,
  Box,
  CircularProgress,
  Snackbar,
  Alert
} from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { getNewsById, updateNews, NewsItem } from '../services/newsService'
import CustomTextField from '../components/CustomTextField'
import { validateNews, NewsFormErrors } from '../utils/validateNews'

const EditNews = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [formData, setFormData] = useState<NewsItem | null>(null)
  const [errors, setErrors] = useState<NewsFormErrors>({
    title: '',
    body: '',
    author: '',
    date: '',
    image_url: ''
  })
  const [loading, setLoading] = useState(true)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        if (id) {
          const news = await getNewsById(Number(id))
          setFormData(news)
        }
      } catch (err) {
        setError('News not found.')
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!formData) return
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
  }

  const validate = () => {
    if (!formData) return false
    const validationErrors = validateNews(formData)
    setErrors(validationErrors)
    return Object.values(validationErrors).every(error => error === '')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData || !id) return
    if (!validate()) return

    try {
      setIsSubmitting(true)
      await updateNews(Number(id), formData)
      setSuccess(true)
      setTimeout(() => navigate(`/news/${id}`), 1000)
    } catch (err) {
      console.error(err)
      setError('Failed to update news.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    )
  }

  if (!formData) {
    return (
      <Container>
        <Typography variant="h5" color="error" mt={5}>
          {error}
        </Typography>
        <Button onClick={() => navigate(-1)} variant="outlined" sx={{ mt: 2 }}>
          Go Back
        </Button>
      </Container>
    )
  }

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>Edit News</Typography>
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" gap={2}>
          <CustomTextField
            name="title"
            label="Title"
            value={formData.title}
            onChange={handleChange}
            error={!!errors.title}
            helperText={errors.title}
            fullWidth
          />
          <CustomTextField
            name="body"
            label="Body"
            value={formData.body}
            onChange={handleChange}
            error={!!errors.body}
            helperText={errors.body}
            fullWidth
            multiline
            rows={4}
          />
          <CustomTextField
            name="image_url"
            label="Image URL"
            value={formData.image_url}
            onChange={handleChange}
            error={!!errors.image_url}
            helperText={errors.image_url}
            fullWidth
          />
          <CustomTextField
            name="author"
            label="Author"
            value={formData.author}
            onChange={handleChange}
            error={!!errors.author}
            helperText={errors.author}
            fullWidth
          />
          <CustomTextField
            name="date"
            label="Date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            error={!!errors.date}
            helperText={errors.date}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />

          <Box display="flex" gap={2} justifyContent="flex-end">
            <Button type="submit" variant="contained" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save'}
            </Button>
            <Button variant="outlined" onClick={() => navigate(-1)}>Cancel</Button>
          </Box>
        </Box>
      </form>
      <Snackbar open={success} autoHideDuration={3000} onClose={() => setSuccess(false)}>
        <Alert onClose={() => setSuccess(false)} severity="success" sx={{ width: '100%' }}>
          News updated successfully!
        </Alert>
      </Snackbar>
    </Container>
  )
}

export default EditNews
