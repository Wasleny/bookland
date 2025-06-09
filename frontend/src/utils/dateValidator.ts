import { months } from "../constants/months";

export const allowedYears = (currentYear: number, minYear = 1900) =>
  Array.from({ length: currentYear - minYear + 1 }, (_, i) => {
    const year = currentYear - i;
    return { value: year, name: year };
  }).filter((y) => y.value >= minYear);

export const getAllowedMonths = (
  year: number,
  currentYear: number,
  currentMonth: number,
  minYear?: number,
  minMonth?: number
) => {
  const isCurrentYear = year === currentYear;
  const isMinYear = minYear !== undefined && year === minYear;

  const min = isMinYear && minMonth !== undefined ? minMonth : 1;
  const max = isCurrentYear ? currentMonth + 1 : 12;

  return Array.from({ length: max - min + 1 }, (_, i) => ({
    value: min + i,
    name: months[min + i - 1],
  }));
};

export const getDaysInMonth = (
  month: number,
  year: number,
  minDate?: { day: number; month: number; year: number }
) => {
  const maxDate = new Date(year, month, 0).getDate();
  const now = new Date();
  let start = 1;

  if (minDate && year === minDate.year && month === minDate.month) {
    start = minDate.day;
  }

  const end =
    year === now.getFullYear() && month === now.getMonth() + 1
      ? now.getDate()
      : maxDate;

  return Array.from({ length: end - start + 1 }, (_, i) => ({
    value: start + i,
    name: start + i,
  }));
};
