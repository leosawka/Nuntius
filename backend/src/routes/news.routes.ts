import { Router } from 'express'
import {
  getAllNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNews,
  searchNews
} from '../controllers/news.controller'

const router = Router()

router.get('/', getAllNews)
router.get('/search', searchNews)
router.get('/:id', getNewsById)
router.post('/', createNews)
router.put('/:id', updateNews)
router.delete('/:id', deleteNews)

export default router
