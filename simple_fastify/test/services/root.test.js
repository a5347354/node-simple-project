'use strict'

const { build } = require('../helper')

describe('server test', () => {
  afterAll(() => {
    fastify.close();
  });

  test('responds with fail on request /', async (done) => {
    const fastify = build(done)
    const response = await fastify.inject({
      method: 'GET',
      url: '/'
    });
    console.log(response.payload.root)
    expect(response.statusCode).toBe(200);
    expect(response.payload).toBe('{"root":true}');
    expect(response.payload.root).toBe(true);
    done();
  });
});

// If you prefer async/await, use the following
//
// test('default root route', async (t) => {
//   const app = build(t)
//
//   const res = await app.inject({
//     url: '/'
//   })
//   t.deepEqual(JSON.parse(res.payload), { root: true })
// })
