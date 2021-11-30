import moment from "moment";
import { DEFAULT_DATE_FORMAT } from "./constants";

export const formatDate = (date, dateFormat = DEFAULT_DATE_FORMAT) => {
  if (moment.isDate(date) || !date) return "-";
  return moment(date).format(dateFormat);
};
export const isPast = (date) => {
  return moment(date).isBefore(moment());
};

export const enumerateDaysBetweenDates = function (startDate, endDate) {
  let dates = [];

  const currDate = moment(startDate).startOf("day");
  const lastDate = moment(endDate).startOf("day");

  while (currDate.add(1, "days").diff(lastDate) < 0) {
    dates.push(currDate.clone().format(DEFAULT_DATE_FORMAT));
  }

  return dates;
};

export const getAllMonths = () => {
  return moment.months();
};

export const getAllMonthsShort = () => {
  return moment.monthsShort();
};

export const getMonthFromNumber = (num: number) =>
  moment().month(num).format("MMM");

export const daysFromNow = (date) => {
  if (!date) return 0;
  const timeDiff = new Date(date).getTime() - new Date().getTime();
  // To calculate the no. of days between two dates
  return timeDiff < 0 ? 0 : Math.ceil(timeDiff / (1000 * 3600 * 24));
};

export const generateArrayOfYears = (maxYears = 20) => {
  const max = new Date().getFullYear();
  const min = max - maxYears;
  const years = [];
  for (var i = max; i >= min; i--) {
    years.push(i);
  }
  return years;
};

export const secondsToReadableDate = (seconds: number) => {
  const duration = moment.duration(seconds);
  return duration.humanize();
};
