import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import Header from './components/Header';
import NewsList from './pages/NewsList';
import NewsDetail from './pages/NewsDetail';
import CreateNews from './pages/CreateNews';
import EditNews from './pages/EditNews';
const App = () => {
    return (_jsxs(Router, { children: [_jsx(Header, {}), _jsx(Box, { sx: { pt: 8, px: 2 }, children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(NewsList, {}) }), _jsx(Route, { path: "/news/:id", element: _jsx(NewsDetail, {}) }), _jsx(Route, { path: "/create", element: _jsx(CreateNews, {}) }), _jsx(Route, { path: "/edit/:id", element: _jsx(EditNews, {}) })] }) })] }));
};
export default App;
