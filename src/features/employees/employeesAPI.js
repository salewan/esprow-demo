import faker from 'faker';

const TIMEOUT = 500;
const FAKE_RECORDS = 10;

const MUNUTE_MILLIS = 60000;
const HOUR_MILLIS = 60 * MUNUTE_MILLIS;

const MIN_TIME_FRAMES = 0;
const MAX_TIME_FRAMES = 30;
const MIN_FRAME_LEN = 10 * MUNUTE_MILLIS;
const MAX_FRAME_LEN = 6 * HOUR_MILLIS;
const UNPRODUCTIVE_TIME_FRACTION = 0.5;

function fetch(data) {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ data }), TIMEOUT)
  );
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateFakeRecords(count) {
  const records = [];
  for (let i = 1; i <= count; i ++) {
    records.push({
      id: i,
      name: faker.fake("{{name.lastName}}, {{name.firstName}}"),
      times: (function() {
        const times = [];

        for (let j = 0; j <= getRandomInt(MIN_TIME_FRAMES, MAX_TIME_FRAMES); j ++) {
          const date = faker.date;
          const clockedIn = date.between(date.past(), date.recent());
          const clockedOut = new Date(clockedIn.getTime() + getRandomInt(MIN_FRAME_LEN, MAX_FRAME_LEN));

          times.push({
            timeId: faker.datatype.uuid(),
            clockedIn: clockedIn.toISOString(),
            clockedOut: clockedOut.toISOString(),
            unproductiveTime: getRandomInt(0, Math.floor((clockedOut.getTime() - clockedIn.getTime()) * UNPRODUCTIVE_TIME_FRACTION))
          });
        }
        return times;
      })(),
      active: faker.datatype.boolean()
    })
  }
  return records;
}

export function fetchEmployees() {
  return fetch(generateFakeRecords(FAKE_RECORDS));
}