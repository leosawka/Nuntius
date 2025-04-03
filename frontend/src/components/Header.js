import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AppBar, Box, Toolbar, Typography, Button, CardMedia } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../../public/NuntiusLogoWhite.png';
const Header = () => {
    const location = useLocation();
    if (location.pathname === '/create')
        return null;
    return (_jsx(AppBar, { position: "fixed", sx: { backgroundColor: '#333' }, children: _jsxs(Toolbar, { sx: { display: 'flex', justifyContent: 'space-between' }, children: [_jsxs(Box, { sx: { display: 'flex', flexDirection: 'row' }, children: [_jsx(CardMedia, { component: "img", height: "50", image: Logo, alt: "logo" }), _jsx(Typography, { variant: "h6", component: Link, to: "/", sx: { color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 1 }, children: "Nuntius" })] }), _jsx(Button, { component: Link, to: "/create", variant: "contained", color: "primary", children: "Create New" })] }) }));
};
export default Header;
