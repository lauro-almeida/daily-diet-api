import { FastifyInstance } from 'fastify'
import { string, z } from 'zod'
import { knex } from '../database'
import { randomUUID } from 'crypto'
import { checkUserIdExistis } from '../middlewares/check-user-id-existis'

export async function mealsRoutes(app: FastifyInstance) {
  //  Create a meal
  app.post(
    '/',
    {
      preHandler: [checkUserIdExistis],
    },
    async (request, reply) => {
      const createMealBodySchema = z.object({
        name: z.string(),
        description: z.string(),
        isInsideTheDiet: z.boolean(),
      })

      const { name, description, isInsideTheDiet } = createMealBodySchema.parse(
        request.body,
      )

      const { userId } = request.cookies

      await knex('meals').insert({
        id: randomUUID(),
        name,
        description,
        is_inside_the_diet: isInsideTheDiet,
        user_id: userId,
      })

      return reply.status(201).send()
    },
  )

  //    Delete a meal
  app.delete(
    '/:id',
    {
      preHandler: [checkUserIdExistis],
    },
    async (request) => {
      const deleteMealParamsSchema = z.object({
        id: z.string().uuid(),
      })

      const { id } = deleteMealParamsSchema.parse(request.params)
      const { userId } = request.cookies

      await knex('meals')
        .where({
          id,
          user_id: userId,
        })
        .del()
    },
  )

  //   Edit a meal
  app.put('/:id', { preHandler: [checkUserIdExistis] }, async (request) => {
    const editMealParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = editMealParamsSchema.parse(request.params)

    const editMealBodySchema = z.object({
      name: z.string().optional(),
      description: z.string().optional(),
      isInsideTheDiet: z.boolean().optional(),
    })

    const { name, description, isInsideTheDiet } = editMealBodySchema.parse(
      request.body,
    )

    const { userId } = request.cookies

    if (name) {
      await knex('meals').where({ user_id: userId, id }).update({ name })
    }

    if (description) {
      await knex('meals').where({ user_id: userId, id }).update({ description })
    }

    if (isInsideTheDiet) {
      await knex('meals')
        .where({ user_id: userId, id })
        .update('is_inside_the_diet', isInsideTheDiet)
    }
  })

  //    List a meal
  app.get(
    '/:id',
    {
      preHandler: [checkUserIdExistis],
    },
    async (request) => {
      const getMealParamsSchema = z.object({
        id: z.string().uuid(),
      })

      const { id } = getMealParamsSchema.parse(request.params)
      const { userId } = request.cookies

      const meal = await knex('meals')
        .where({
          user_id: userId,
          id,
        })
        .first()

      return { meal }
    },
  )

  //    List meals
  app.get(
    '/',
    {
      preHandler: [checkUserIdExistis],
    },
    async (request) => {
      const { userId } = request.cookies

      const meals = await knex('meals').where('user_id', userId).select()

      return { meals }
    },
  )
}
