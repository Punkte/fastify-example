import fastify from 'fastify'
import Pyroscope from '@pyroscope/nodejs'
import computeHeavyHash from './computeHash.js';

const server = fastify()

const pyroscopeHost = process.env.PYROSCOPE_HOST || 'pyroscope';
const pyroscopePort = process.env.PYROSCOPE_PORT || 4040;

Pyroscope.init({
    serverAddress: `http://${pyroscopeHost}:${pyroscopePort}`,
    appName: 'fastify',
    // Enable CPU time collection for wall profiles
    // This is required for CPU profiling functionality
    wall: {
      collectCpuTime: true
    }
});

Pyroscope.start()

server.get('/', async (_, __) => {
  return 'Hello world\n'
})

server.get('/heavy-computation', async (_, __) => {
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