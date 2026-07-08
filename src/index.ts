import fastify from 'fastify'
import Pyroscope from '@pyroscope/nodejs'
import computeHeavyHash from './computeHash.js';
import { generateMockData } from './dateFormatter.js';
import metricsPlugin from 'fastify-metrics';
import client from 'prom-client';

const server = fastify()

const pyroscopeHost = process.env.PYROSCOPE_HOST || 'pyroscope';
const pyroscopePort = process.env.PYROSCOPE_PORT || 4040;

const serverAddress = process.env.PYROSCOPE_SERVER ?? `http://${pyroscopeHost}:${pyroscopePort}`

Pyroscope.init({
    serverAddress,
    appName: 'fastify',
    wall: {
      collectCpuTime: true
    },
    basicAuthUser: process.env.PYROSCOPE_BASIC_AUTH_USER,
    basicAuthPassword: process.env.PYROSCOPE_BASIC_AUTH_PASSWORD,
});

Pyroscope.start()

server.get('/', async (_, __) => {
  return 'Hello world\n'
})

server.get('/dates', async (_, __) => {
  return generateMockData(1000);
})

server.get('/heavy-computation', async (_, __) => {
  const iterations = 10_000_000;
  return computeHeavyHash(iterations)
})

server.register(metricsPlugin, {
  endpoint: '/metrics',
  promClient: client,
});

server.listen({ port: 3001, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})