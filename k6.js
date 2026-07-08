import http from 'k6/http';
import { sleep } from 'k6';
import { Rate } from 'k6/metrics';

function formatDate(date = new Date()) {
  const pad = (n) => String(n).padStart(2, '0');

  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1);
  const year = date.getFullYear();
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  return `${day}/${month}/${year}-${hours}:${minutes}:${seconds}`;
}

export const options = {
  vus: 10,
  duration: '60s',
  cloud: {
    // Project: Default project
    projectID: 6683180,
    // Test runs with the same name groups test runs together.
    name: 'k6-basic-dates-route'
  }
};

export default function() {
  http.get('https://fastify-example-1-utpj.onrender.com/dates');

  sleep(1);
}
