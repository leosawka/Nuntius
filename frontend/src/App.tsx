import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Box } from '@mui/material'
import Header from './components/Header'
import NewsList from './pages/NewsList'
import NewsDetail from './pages/NewsDetail'
import CreateNews from './pages/CreateNews'
import EditNews from './pages/EditNews'

const App = () => {
  return (
    <Router>
      <Header/>
        <Box sx={{ pt: 8, px: 2 }}>
          <Routes>
            <Route path="/" element={<NewsList />} />
            <Route path="/news/:id" element={<NewsDetail/>}/>
            <Route path="/create" element={<CreateNews />} />
            <Route path="/edit/:id" element={<EditNews />} />
          </Routes>
        </Box>
    </Router>
  )
}

export default App
