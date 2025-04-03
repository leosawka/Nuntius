import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Container, Typography, Button, Box, Snackbar, Alert } from '@mui/material';
import { createNews } from '../services/newsService';
import { useNavigate } from 'react-router-dom';
import { useUnsavedChangesWarning } from '../hooks/useUnsavedChangesWarning';
import CustomTextField from '../components/CustomTextField';
import { validateNews } from '../utils/validateNews';
const CreateNews = () => {
    const [formData, setFormData] = useState({
        title: '',
        body: '',
        image_url: '',
        author: '',
        date: ''
    });
    const [errors, setErrors] = useState({
        title: '',
        body: '',
        author: '',
        date: '',
        image_url: ''
    });
    const [success, setSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const hasUnsavedChanges = Object.values(formData).some(val => val.trim() !== '');
    useUnsavedChangesWarning(!isSubmitting && hasUnsavedChanges);
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateNews(formData);
        setErrors(validationErrors);
        const hasError = Object.values(validationErrors).some(msg => msg !== '');
        if (hasError)
            return;
        try {
            setIsSubmitting(true);
            await createNews(formData);
            setSuccess(true);
            setTimeout(() => navigate('/'), 1000);
        }
        catch (error) {
            console.error('Failed to create news:', error);
        }
        finally {
            setIsSubmitting(false);
        }
    };
    const handleCancel = () => {
        if (hasUnsavedChanges) {
            const confirmLeave = window.confirm('You have unsaved changes. Are you sure you want to cancel?');
            if (!confirmLeave)
                return;
        }
        navigate('/');
    };
    return (_jsxs(Container, { maxWidth: "sm", sx: { color: 'whitesmoke', py: 4 }, children: [_jsx(Typography, { variant: "h4", gutterBottom: true, children: "Create News" }), _jsx("form", { onSubmit: handleSubmit, children: _jsxs(Box, { display: "flex", flexDirection: "column", gap: 2, children: [_jsx(CustomTextField, { name: "title", label: "Title", value: formData.title, onChange: handleChange, error: !!errors.title, helperText: errors.title, fullWidth: true }), _jsx(CustomTextField, { name: "body", label: "Body", value: formData.body, onChange: handleChange, error: !!errors.body, helperText: errors.body, multiline: true, rows: 4, fullWidth: true }), _jsx(CustomTextField, { name: "image_url", label: "Image URL", value: formData.image_url, onChange: handleChange, error: !!errors.image_url, helperText: errors.image_url, fullWidth: true }), _jsx(CustomTextField, { name: "author", label: "Author", value: formData.author, onChange: handleChange, error: !!errors.author, helperText: errors.author, fullWidth: true }), _jsx(CustomTextField, { name: "date", label: "Date", type: "date", value: formData.date, onChange: handleChange, error: !!errors.date, helperText: errors.date, InputLabelProps: { shrink: true }, fullWidth: true }), _jsxs(Box, { display: "flex", gap: 2, justifyContent: "flex-end", mt: 2, children: [_jsx(Button, { type: "submit", variant: "contained", disabled: isSubmitting, children: isSubmitting ? 'Creating...' : 'Create' }), _jsx(Button, { variant: "outlined", color: "secondary", onClick: handleCancel, children: "Cancel" })] })] }) }), _jsx(Snackbar, { open: success, autoHideDuration: 3000, onClose: () => setSuccess(false), children: _jsx(Alert, { onClose: () => setSuccess(false), severity: "success", sx: { width: '100%' }, children: "News created successfully!" }) })] }));
};
export default CreateNews;
