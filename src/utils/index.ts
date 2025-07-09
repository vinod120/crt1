import { format, isValid, parseISO } from 'date-fns';

export const STALE_TIME = 5 * 60 * 1000;
export const DEBOUNCE_DELAY = 500;


export const getDateFormat = (date?: string | Date) => {
  let dateToFormat: Date;

  if (typeof date === 'string') {
    const parsed = parseISO(date);
    dateToFormat = isValid(parsed) ? parsed : new Date();
  } else {
    dateToFormat = date && isValid(date) ? date : new Date();
  }
  return format(dateToFormat, 'dd-MMM-yyyy, hh:mm:ss');
};

export const formatNumber = (num: any) => {
  if(num == 0) return num;
  return num?.toString()?.padStart(2, '0');
}
