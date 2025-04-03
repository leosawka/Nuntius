import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Container, Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
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
    return (_jsxs(Container, { sx: { py: 4 }, children: [_jsx(Box, { display: "flex", justifyContent: "flex-end", sx: { mb: 2 }, children: _jsx(Button, { variant: "contained", component: Link, to: "/create", sx: { textTransform: 'none' }, children: "+ Create News" }) }), _jsx(Box, { sx: {
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: 3,
                }, children: news.map((item) => (_jsx(Box, { sx: {
                        flex: '1 1 300px',
                        minWidth: '280px',
                        display: 'flex',
                        justifyContent: 'center',
                    }, children: _jsxs(Card, { sx: { width: '100vw', display: 'flex', flexDirection: 'column' }, children: [item.image_url && (_jsx(CardMedia, { component: "img", height: "200", image: item.image_url, alt: item.title })), _jsxs(CardContent, { children: [_jsx(Typography, { variant: "h6", gutterBottom: true, component: Link, to: `/news/${item.id}`, sx: { textDecoration: 'none', color: 'inherit' }, children: item.title }), _jsxs(Typography, { variant: "body2", color: "text.secondary", children: [item.author, " \u2014 ", new Date(item.date).toLocaleDateString()] })] })] }) }, item.id))) })] }));
};
export default NewsList;
