import { useState } from 'react'
import {
    Container,
    Typography,
    TextField,
    Button,
    Box,
    Snackbar,
    Alert
} from '@mui/material'
import { createNews } from '../services/newsService'
import { useNavigate } from 'react-router-dom'
import { useUnsavedChangesWarning } from '../hooks/useUnsavedChangesWarning'

const CreateNews = () => {
    const [formData, setFormData] = useState({
        title: '',
        body: '',
        image_url: '',
        author: '',
        date: ''
    })

    

    const [errors, setErrors] = useState({
        title: '',
        body: '',
        author: '',
        date: '',
        image_url: ''
    })

    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)


    const navigate = useNavigate()

    const hasUnsavedChanges = Object.values(formData).some(val => val.trim() !== '')
        useUnsavedChangesWarning(!isSubmitting && hasUnsavedChanges)


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
        setErrors({ ...errors, [e.target.name]: '' })
    }

    const validate = () => {
        const newErrors: typeof errors = {
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
      
        setErrors(newErrors)
        return Object.values(newErrors).every(error => error === '')
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!validate()) return
      
        try {
          setIsSubmitting(true)
          await createNews(formData)
          navigate('/')
        } catch (error) {
          console.error('Failed to create news:', error)
        } finally {
          setIsSubmitting(false)
        }
    }

    const handleCancel = () => {
        if (hasUnsavedChanges) {
          const confirmLeave = window.confirm('You have unsaved changes. Are you sure you want to cancel?')
          if (!confirmLeave) return
        }
        navigate('/')
      }

    return (
        <Container maxWidth="sm" sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom>Create News</Typography>
            <form onSubmit={handleSubmit}>
                <Box display="flex" flexDirection="column" gap={2}>
                    <TextField
                        name="title"
                        label="Title"
                        value={formData.title}
                        onChange={handleChange}
                        error={!!errors.title}
                        helperText={errors.title}
                        fullWidth
                    />
                    <TextField
                        name="body"
                        label="Body"
                        value={formData.body}
                        onChange={handleChange}
                        error={!!errors.body}
                        helperText={errors.body}
                        multiline
                        rows={4}
                        fullWidth
                    />
                    <TextField
                        name="image_url"
                        label="Image URL"
                        value={formData.image_url}
                        onChange={handleChange}
                        error={!!errors.image_url}
                        helperText={errors.image_url}
                        fullWidth
                    />
                    <TextField
                        name="author"
                        label="Author"
                        value={formData.author}
                        onChange={handleChange}
                        error={!!errors.author}
                        helperText={errors.author}
                        fullWidth
                    />
                    <TextField
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
                    <Box display="flex" flexDirection="row" gap={2} justifyContent="flex-end" mt={2}>
                        <Button type="submit" variant="contained" disabled={isSubmitting}>
                            {isSubmitting ? 'Creating...' : 'Create'}
                        </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={handleCancel}
                            >
                                Cancel
                        </Button>
                    </Box>
                </Box>
            </form>
            <Snackbar open={success} autoHideDuration={3000} onClose={() => setSuccess(false)}>
                <Alert onClose={() => setSuccess(false)} severity="success" sx={{ width: '100%' }}>
                    News created successfully!
                </Alert>
            </Snackbar>
        </Container>
    )
}

export default CreateNews
