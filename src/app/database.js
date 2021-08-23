import faker from 'faker';
import Employee from '../model/Employee';

let DB = undefined;
const DB_NAME = 'EsprowDemoDb';
const FAKE_RECORDS = 10;

const MUNUTE_MILLIS = 60000;
const HOUR_MILLIS = 60 * MUNUTE_MILLIS;

const MIN_TIME_FRAMES = 0;
const MAX_TIME_FRAMES = 30;
const MIN_FRAME_LEN = 10 * MUNUTE_MILLIS;
const MAX_FRAME_LEN = 6 * HOUR_MILLIS;
const UNPRODUCTIVE_TIME_FRACTION = 0.5;

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateFakeRecords(count) {
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
            clockedIn: clockedIn.getTime(),
            clockedOut: clockedOut.getTime(),
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

function initCheck() {
  const rawDb = localStorage.getItem(DB_NAME);
  if (!rawDb) {
    DB = generateFakeRecords(FAKE_RECORDS).map(jsObj => Employee.of(jsObj));
  } else {
    DB = JSON.parse(rawDb).map(jsObj => Employee.of(jsObj));
  }
}

function close() {
  if (DB) {
    localStorage.setItem(DB_NAME, JSON.stringify(DB));
  } else {
    localStorage.removeItem(DB_NAME);
  }
}

function employees(active) {
  return DB.filter(employee => employee.active === active);
}

function getTotalEmployees(active) {
  return employees(active).length;
}

function getTotalClockedInTime(active) {
  return employees(active).reduce((acc, employee) => acc + employee.getClockedInTime(), 0);
}

function getTotalProductiveTime(active) {
  return employees(active).reduce((acc, employee) => acc + employee.getProductiveTime(), 0);
}

function getTotalUnproductiveTime(active) {
  return employees(active).reduce((acc, employee) => acc + employee.getUnproductiveTime(), 0);
}

function getMinCalendarDate(active) {
  return Math.min(...(employees(active).map(employee => employee.getMinDate())))
}

function getMaxCalendarDate(active) {
  return Math.max(...(employees(active).map(employee => employee.getMaxDate())))
}

export {

  initCheck,
  close,
  getTotalEmployees,
  getTotalClockedInTime,
  getTotalProductiveTime,
  getTotalUnproductiveTime,
  getMinCalendarDate,
  getMaxCalendarDate
}