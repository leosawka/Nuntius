import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NewsList from './pages/NewsList'
import NewsDetail from './pages/NewsDetail'
import CreateNews from './pages/CreateNews'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NewsList />} />
        <Route path="/news/:id" element={<NewsDetail/>}/>
        <Route path="/create" element={<CreateNews />} />
      </Routes>
    </Router>
  )
}

export default App
