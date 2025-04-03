import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getNewsById } from '../services/newsService';
import { Container, Typography, Card, CardContent, CardMedia, CircularProgress, Box, Button, Breadcrumbs } from '@mui/material';
const NewsDetail = () => {
    const { id } = useParams();
    const [news, setNews] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchNews = async () => {
            try {
                if (id) {
                    const data = await getNewsById(Number(id));
                    setNews(data);
                }
            }
            catch (error) {
                console.error('Error fetching news:', error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchNews();
    }, [id]);
    if (loading) {
        return (_jsx(Box, { display: "flex", justifyContent: "center", mt: 10, children: _jsx(CircularProgress, {}) }));
    }
    if (!news) {
        return (_jsxs(Container, { children: [_jsx(Typography, { variant: "h5", color: "error", mt: 5, children: "News not found." }), _jsx(Button, { component: Link, to: "/", variant: "outlined", sx: { mt: 2 }, children: "Go back" })] }));
    }
    return (_jsx(Box, { sx: { display: 'flex', justifySelf: 'center', py: 4 }, children: _jsxs(Card, { sx: { width: '95vw' }, children: [_jsx(Box, { sx: { px: 3, pt: 2 }, children: _jsxs(Breadcrumbs, { "aria-label": "breadcrumb", sx: { mb: 2 }, children: [_jsx(Link, { to: "/", style: { textDecoration: 'none', color: 'inherit' }, children: "Home" }), _jsx(Typography, { color: "text.primary", children: news.title })] }) }), news.image_url && (_jsx(CardMedia, { component: "img", height: "300", image: news.image_url, alt: news.title, sx: { width: '100vw', objectFit: 'cover' } })), _jsxs(CardContent, { children: [_jsx(Typography, { variant: "h4", gutterBottom: true, children: news.title }), _jsxs(Typography, { variant: "subtitle1", color: "text.secondary", gutterBottom: true, children: [news.author, " \u2014 ", new Date(news.date).toLocaleDateString()] }), _jsx(Typography, { variant: "body1", mt: 2, children: news.body }), _jsxs(Box, { sx: {
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                                mt: 3
                            }, children: [_jsx(Button, { sx: {
                                        transition: 'transform 0.2s',
                                        '&:hover': { transform: 'scale(1.02)', boxShadow: 6 }
                                    }, variant: "outlined", color: "primary", children: "Edit" }), _jsx(Button, { sx: {
                                        transition: 'transform 0.2s',
                                        '&:hover': { transform: 'scale(1.02)', boxShadow: 6 }
                                    }, variant: "outlined", color: "error", children: "Delete" })] })] })] }) }));
};
export default NewsDetail;
