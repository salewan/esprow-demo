import * as database from '../../app/database';

const TIMEOUT = 500;

function fetch(data) {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ data }), TIMEOUT)
  );
}

export function fetchEmployees() {
  return fetch({});
}

export function fetchTotalSummary(active) {
  return fetch({
    totalEmployees: database.getTotalEmployees(active),
    totalClockedInTime: database.getTotalClockedInTime(active),
    totalProductiveTime: database.getTotalProductiveTime(active),
    totalUnproductiveTime: database.getTotalUnproductiveTime(active)
  });
}

export function fetchAvailableDateRange(active) {
  return fetch({
    minDate: database.getMinCalendarDate(active),
    maxDate: database.getMaxCalendarDate(active)
  })
}