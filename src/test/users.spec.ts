import { it, beforeAll, afterAll, describe } from 'vitest'
import request from 'supertest'
import { app } from '../app'
import { randomUUID } from 'crypto'

describe('Users routes', async () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be possible to create a user', async () => {
    await request(app.server)
      .post('/users')
      .send({
        name: 'Novo usuário',
        password: '123',
        email: 'novo@usuario.com',
      })
      .expect(201)
  })

  it.todo('should be possibel to authenticate a user', async () => {
    await request(app.server).post('/users/login')
  })

  it('should be able to get user metrics', async () => {
    const userId = randomUUID()
    await request(app.server)
      .get('/users')
      .query({ id: userId })
      .set('Cookie', [`userId=${userId}; Max-Age=604800000; Path=/`])
      .expect(200)
  })

  it('should be possible to list the users', async () => {
    await request(app.server).get('/users').expect(200)
  })
})
