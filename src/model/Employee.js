import TimeFrame from './TimeFrame';

export default class Employee {

  id;
  name;
  times;
  active;

  static of(obj) {
    const { times, ...rest } = obj;
    const employee = Object.setPrototypeOf(rest, Employee.prototype);
    employee.times = times.map(t => TimeFrame.of(t));
    return employee;
  }

  getClockedInTime() {
    return this.times.reduce((acc, timeFrame) => acc + timeFrame.getLength(), 0);
  }

  getProductiveTime() {
    return this.times.reduce((acc, timeFrame) => acc + timeFrame.getLength() - timeFrame.unproductiveTime, 0);
  }

  getUnproductiveTime() {
    return this.times.reduce((acc, timeFrame) => acc + timeFrame.unproductiveTime, 0);
  }

  getMinDate() {
    return Math.min( ...(this.times.map(time => time.clockedIn)) );
  }

  getMaxDate() {
    return Math.max( ...(this.times.map(time => time.clockedOut)) );
  }
}