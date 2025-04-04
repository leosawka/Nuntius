import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Container, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { getAllNews, searchNews } from '../services/newsService';
import CustomTextField from '../components/CustomTextField';
const NewsList = () => {
    const [news, setNews] = useState([]);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (searchTerm.trim()) {
                    const results = await searchNews(searchTerm);
                    setNews(results);
                }
                else {
                    const data = await getAllNews();
                    setNews(data);
                }
            }
            catch (error) {
                console.error('Error fetching news:', error);
                setError(error.message || 'Unknown error');
            }
        };
        const delayDebounce = setTimeout(() => {
            fetchData();
        }, 500);
        return () => clearTimeout(delayDebounce);
    }, [searchTerm]);
    return (_jsxs(Container, { maxWidth: "md", sx: { py: 4 }, children: [_jsx(CustomTextField, { label: "Search", variant: "outlined", fullWidth: true, value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), sx: { mb: 4, width: { xs: '100%', sm: '800px' }, mx: 'auto', display: 'block' } }), _jsx(Container, { maxWidth: "md", sx: { py: 4 }, children: _jsx(Box, { sx: {
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        gap: 3
                    }, children: news.map((item) => (_jsx(Box, { sx: {
                            flex: '1 1 300px',
                            maxWidth: '400px',
                            minWidth: '280px'
                        }, children: _jsxs(Card, { sx: {
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column'
                            }, children: [item.image_url && (_jsx(CardMedia, { component: "img", height: "200", image: item.image_url, alt: item.title })), _jsxs(CardContent, { children: [_jsx(Typography, { variant: "h6", gutterBottom: true, component: Link, to: `/news/${item.id}`, sx: { textDecoration: 'none', color: 'inherit' }, children: item.title }), _jsxs(Typography, { variant: "body2", color: "text.secondary", children: [item.author, " \u2014 ", new Date(item.date).toLocaleDateString()] })] })] }) }, item.id))) }) })] }));
};
export default NewsList;
