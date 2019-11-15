'use strict';

const { build } = require('../helper')

describe('server test', () => {
  afterAll(() => {
    fastify.close();
  });

  test('responds with success on request /', async (done) => {
    const fastify = build(done)
    const response = await fastify.inject({
      method: 'GET',
      url: '/example'
    });

    expect(response.statusCode).toBe(200);
    expect(response.payload).toBe('this is an example');
    done();
  });
});
