import { FastifyRequest, FastifyReply } from 'fastify'
import { knex } from '../database'

export async function checkUserIdExistis(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { userId } = request.cookies

  if (!userId) {
    return reply.status(401).send({
      error: 'Unauthorized',
    })
  }

  const ids = await knex('users').select('id')

  for (let i = 0; i < ids.length; i++) {
    if (ids[i].id === userId) {
      return true
    }
  }

  if (!userId) {
    return reply.status(401).send({
      error: 'Unauthorized',
    })
  }
}
