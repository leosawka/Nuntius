import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Container, Typography, Button, Box, CircularProgress, Snackbar, Alert } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { getNewsById, updateNews } from '../services/newsService';
import CustomTextField from '../components/CustomTextField';
import { validateNews } from '../utils/validateNews';
const EditNews = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState(null);
    const [errors, setErrors] = useState({
        title: '',
        body: '',
        author: '',
        date: '',
        image_url: ''
    });
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    useEffect(() => {
        const fetchNews = async () => {
            try {
                if (id) {
                    const news = await getNewsById(Number(id));
                    setFormData(news);
                }
            }
            catch (err) {
                setError('News not found.');
            }
            finally {
                setLoading(false);
            }
        };
        fetchNews();
    }, [id]);
    const handleChange = (e) => {
        if (!formData)
            return;
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    };
    const validate = () => {
        if (!formData)
            return false;
        const validationErrors = validateNews(formData);
        setErrors(validationErrors);
        return Object.values(validationErrors).every(error => error === '');
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData || !id)
            return;
        if (!validate())
            return;
        try {
            setIsSubmitting(true);
            await updateNews(Number(id), formData);
            setSuccess(true);
            setTimeout(() => navigate(`/news/${id}`), 1000);
        }
        catch (err) {
            console.error(err);
            setError('Failed to update news.');
        }
        finally {
            setIsSubmitting(false);
        }
    };
    if (loading) {
        return (_jsx(Box, { display: "flex", justifyContent: "center", mt: 10, children: _jsx(CircularProgress, {}) }));
    }
    if (!formData) {
        return (_jsxs(Container, { children: [_jsx(Typography, { variant: "h5", color: "error", mt: 5, children: error }), _jsx(Button, { onClick: () => navigate(-1), variant: "outlined", sx: { mt: 2 }, children: "Go Back" })] }));
    }
    return (_jsxs(Container, { maxWidth: "sm", sx: { py: 4 }, children: [_jsx(Typography, { variant: "h4", gutterBottom: true, children: "Edit News" }), _jsx("form", { onSubmit: handleSubmit, children: _jsxs(Box, { display: "flex", flexDirection: "column", gap: 2, children: [_jsx(CustomTextField, { name: "title", label: "Title", value: formData.title, onChange: handleChange, error: !!errors.title, helperText: errors.title, fullWidth: true }), _jsx(CustomTextField, { name: "body", label: "Body", value: formData.body, onChange: handleChange, error: !!errors.body, helperText: errors.body, fullWidth: true, multiline: true, rows: 4 }), _jsx(CustomTextField, { name: "image_url", label: "Image URL", value: formData.image_url, onChange: handleChange, error: !!errors.image_url, helperText: errors.image_url, fullWidth: true }), _jsx(CustomTextField, { name: "author", label: "Author", value: formData.author, onChange: handleChange, error: !!errors.author, helperText: errors.author, fullWidth: true }), _jsx(CustomTextField, { name: "date", label: "Date", type: "date", value: formData.date, onChange: handleChange, error: !!errors.date, helperText: errors.date, InputLabelProps: { shrink: true }, fullWidth: true }), _jsxs(Box, { display: "flex", gap: 2, justifyContent: "flex-end", children: [_jsx(Button, { type: "submit", variant: "contained", disabled: isSubmitting, children: isSubmitting ? 'Saving...' : 'Save' }), _jsx(Button, { variant: "outlined", onClick: () => navigate(-1), children: "Cancel" })] })] }) }), _jsx(Snackbar, { open: success, autoHideDuration: 3000, onClose: () => setSuccess(false), children: _jsx(Alert, { onClose: () => setSuccess(false), severity: "success", sx: { width: '100%' }, children: "News updated successfully!" }) })] }));
};
export default EditNews;
