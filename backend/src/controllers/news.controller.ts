import { Request, Response } from 'express'
import { AppDataSource } from '../config/data-source'
import { News } from '../models/News'
import { ILike } from 'typeorm'

const newsRepository = AppDataSource.getRepository(News)

export const getAllNews = async (req: Request, res: Response) => {
  const news = await newsRepository.find()
  return res.json(news)
}

export const getNewsById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
  const news = await newsRepository.findOneBy({ id })
  if (!news) return res.status(404).json({ message: 'News not found' })
  return res.json(news)
}

export const createNews = async (req: Request, res: Response) => {
  const { title, body, image_url, author, date } = req.body
  const newNews = newsRepository.create({ title, body, image_url, author, date })
  await newsRepository.save(newNews)
  return res.status(201).json(newNews)
}

export const updateNews = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
  const existing = await newsRepository.findOneBy({ id })
  if (!existing) return res.status(404).json({ message: 'News not found' })

  newsRepository.merge(existing, req.body)
  const result = await newsRepository.save(existing)
  return res.json(result)
}

export const deleteNews = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
  const result = await newsRepository.delete(id)
  if (result.affected === 0) return res.status(404).json({ message: 'News not found' })
  return res.json({ message: 'News deleted' })
}

export const searchNews = async (req: Request, res: Response) => {
  const term = req.query.term?.toString() || ''
  const results = await newsRepository.find({
    where: [
      { title: ILike(`%${term}%`) },
      { author: ILike(`%${term}%`) }
    ]
  })
  return res.json(results)
}
