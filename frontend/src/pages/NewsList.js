import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Box, Container, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { getAllNews } from '../services/newsService';
const NewsList = () => {
    const [news, setNews] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchNews = async () => {
            try {
                const data = await getAllNews();
                setNews(data);
            }
            catch (error) {
                console.error('Error fetching news:', error);
                setError(error.message || 'Unknown error');
            }
        };
        fetchNews();
    }, []);
    return (_jsx(Container, { sx: { py: 4 }, children: _jsx(Box, { sx: { display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center' }, children: news.map((item) => (_jsx(Box, { sx: { flex: '1 1 300px', maxWidth: '400px', minWidth: '280px' }, children: _jsxs(Card, { sx: { height: '100%', display: 'flex', flexDirection: 'column' }, children: [item.image_url && (_jsx(CardMedia, { component: "img", height: "200", image: item.image_url, alt: item.title })), _jsxs(CardContent, { children: [_jsx(Typography, { variant: "h6", gutterBottom: true, children: item.title }), _jsxs(Typography, { variant: "body2", color: "text.secondary", children: [item.author, " \u2014 ", new Date(item.date).toLocaleDateString()] })] })] }) }, item.id))) }) }));
};
export default NewsList;
