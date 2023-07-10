import { it, beforeAll, afterAll, describe } from 'vitest'
import request from 'supertest'
import { app } from '../app'
import { randomUUID } from 'crypto'

describe('Meals routes', async () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be possible to create a meal', async () => {
    const userId = randomUUID()
    await request(app.server)
      .post('/meals')
      .send({
        name: 'Teste de refeição',
        description: 'Essa é a descrição da refeição de teste.',
        isInsideTheDiet: true,
      })
      .set('Cookie', [`userId=${userId}; Max-Age=604800000; Path=/`])
      .expect(201)
  })

  it('should be able to delete a meal.', async () => {
    const id = randomUUID()
    const userId = randomUUID()
    await request(app.server)
      .delete('/meals')
      .query({ id })
      .set('Cookie', [`userId=${userId}; Max-Age=604800000; Path=/`])
      .expect(200)
  })

  it.todo('should be possible to edit a meal.', async () => {
    const mealId = randomUUID()
    const userId = randomUUID()
    await request(app.server)
      .put('/meals/')
      .query({ id: mealId })
      .send({ name: 'Exemplo' })
      .set('Cookie', [`userId=${userId}; Max-Age=604800000; Path=/`])
      .expect(200)
  })

  it('should be possible to list all meals', async () => {
    const id = randomUUID()
    const userId = randomUUID()

    await request(app.server)
      .get('/meals')
      .query({ id })
      .set('Cookie', [`userId=${userId}; Max-Age=604800000; Path=/`])
      .expect(200)
  })

  it('should be possible to list a meal', async () => {
    const id = randomUUID()
    const userId = randomUUID()

    await request(app.server)
      .get('/meals')
      .query({ id })
      .set('Cookie', [`userId=${userId}; Max-Age=604800000; Path=/`])
      .expect(200)
  })
})
