export default class TimeFrame {

  timeId;
  clockedIn;
  clockedOut;
  unproductiveTime;

  static of(obj) {
    const { clockedIn, clockedOut, ...rest } = obj;
    const timeFrame = Object.setPrototypeOf(rest, TimeFrame.prototype)
    timeFrame.clockedIn = clockedIn
    timeFrame.clockedOut = clockedOut
    return timeFrame;
  }

  getLength() {
    return this.clockedOut - this.clockedIn;
  }
}