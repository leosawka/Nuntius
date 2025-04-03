import { AppBar, Box, Toolbar, Typography, Button, CardMedia } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'
import Logo from '../../public/NuntiusLogoWhite.png'


const Header = () => {
  const location = useLocation()

  if (location.pathname === '/create') return null

  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#333' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{display: 'flex', flexDirection: 'row'}}>
            <CardMedia
                component="img"
                height="50"
                image={Logo}
                alt="logo"
                />
            <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{ color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 1 }}
            >
            Nuntius
            </Typography>
        </Box>
        <Button
          component={Link}
          to="/create"
          variant="contained"
          color="primary"
        >
          Create New
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default Header
