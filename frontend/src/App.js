import { jsx as _jsx } from "react/jsx-runtime";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NewsList from './pages/NewsList';
const App = () => {
    return (_jsx(Router, { children: _jsx(Routes, { children: _jsx(Route, { path: "/", element: _jsx(NewsList, {}) }) }) }));
};
export default App;
