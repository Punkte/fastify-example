import fastify from 'fastify'
import Pyroscope from '@pyroscope/nodejs'
import computeHeavyHash from './computeHash.js';

const server = fastify()

Pyroscope.init({
    serverAddress: 'http://pyroscope:4040',
    appName: 'fastify',
    // Enable CPU time collection for wall profiles
    // This is required for CPU profiling functionality
    wall: {
      collectCpuTime: true
    }
});

Pyroscope.start()

server.get('/', async (request, reply) => {
  return 'Hello world\n'
})

server.get('/heavy-computation', async (request, reply) => {
  const iterations = 10_000_000;
  return computeHeavyHash(iterations)
})

server.listen({ port: 3001, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})