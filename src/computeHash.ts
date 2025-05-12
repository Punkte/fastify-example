import crypto from 'node:crypto'

export default function computeHeavyHash(iterations: number) {
  const startTime = Date.now();
  for (let i = 0; i < iterations; i++) {
    const hash = crypto.createHash('sha256');
    hash.update('Cette chaîne sera hachée de nombreuses fois pour simuler une charge CPU ' + i);
    hash.digest('hex'); 
  }

  const duration = Date.now() - startTime;
  const message = `Heavy computation finished in ${duration}ms for ${iterations} iterations.\n`;
  console.log(message);
  return message;
}