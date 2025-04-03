import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NewsList from './pages/NewsList';
import NewsDetail from './pages/NewsDetail';
import CreateNews from './pages/CreateNews';
const App = () => {
    return (_jsx(Router, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(NewsList, {}) }), _jsx(Route, { path: "/news/:id", element: _jsx(NewsDetail, {}) }), _jsx(Route, { path: "/create", element: _jsx(CreateNews, {}) })] }) }));
};
export default App;
