import * as database from '../../app/database';

const TIMEOUT = 500;

function fetch(data) {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ data }), TIMEOUT)
  );
}

export function fetchEmployees({ searchTerm, filter, onlyActive }) {
  return fetch(database.getEmployees(onlyActive, searchTerm, filter?.startDate, filter?.endDate).map(employee => employee.toObj() ));
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

export function updateEmployee(employee) {
  database.updateEmployee(employee);
  return fetch({ status: 'ok' })
}