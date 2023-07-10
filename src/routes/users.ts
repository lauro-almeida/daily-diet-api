import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '../database'
import { randomUUID } from 'crypto'
import { checkUserIdExistis } from '../middlewares/check-user-id-existis'
import { mappingArrayFromDB } from '../utils/mapping-array-from-db'

export async function usersRoutes(app: FastifyInstance) {
  // Create user
  app.post('/', async (request, reply) => {
    const createUserBodySchema = z.object({
      name: z.string(),
      password: z.string(),
      email: z.string(),
    })

    const { name, password, email } = createUserBodySchema.parse(request.body)

    await knex('users').insert({
      id: randomUUID(),
      name,
      password,
      email,
    })

    return reply.status(201).send()
  })

  // User authentication
  app.post('/login', async (request, reply) => {
    const userLoginBodySchema = z.object({
      email: z.string(),
      password: z.string(),
    })

    const { email, password } = userLoginBodySchema.parse(request.body)

    const user = await knex('users').where('email', email).first().select()

    if (user?.password === password) {
      reply.cookie('userId', user.id, {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      })

      return reply.status(201).send()
    }

    return reply.status(403).send()
  })

  // User metrics
  app.get(
    '/:id',
    {
      preHandler: [checkUserIdExistis],
    },
    async (request, reply) => {
      const getUserMetricsParamsSchema = z.object({
        id: z.string().uuid(),
      })

      const { id } = getUserMetricsParamsSchema.parse(request.params)
      const { userId } = request.cookies

      if (userId !== id) {
        return reply.status(401).send({
          error: 'Unauthorized',
        })
      }

      const totalMeals = await knex('meals')
        .where({ user_id: userId })
        .count({ 'Total Meals': '*' })
        .first()

      const totalMealsOnDiet = await knex('meals')
        .where({ user_id: userId, is_inside_the_diet: true })
        .count({ 'Total Meals On Diet': '*' })
        .first()

      const totalMealsNotOnDiet = await knex('meals')
        .where({ user_id: userId, is_inside_the_diet: false })
        .count({ 'Total Meals Off Diet': '*' })
        .first()

      const _maxDaysOnDiet = await knex('meals')
        .where({ user_id: userId })
        .select('is_inside_the_diet')

      const maxDaysOnDiet = await mappingArrayFromDB(_maxDaysOnDiet)

      return {
        totalMeals,
        totalMealsOnDiet,
        totalMealsNotOnDiet,
        maxDaysOnDiet,
      }
    },
  )

  // List users
  app.get('/', async () => {
    const users = await knex('users').select()

    return { users }
  })
}
