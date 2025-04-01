import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class News {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  title!: string

  @Column()
  body!: string

  @Column()
  image_url!: string

  @Column()
  author!: string

  @Column({ type: 'date' })
  date!: string
}
