import { addDays, subDays, addMonths, subMonths, addYears, subYears } from "date-fns";
import { format, zonedTimeToUtc, utcToZonedTime } from 'date-fns-tz';


export const _YYYYMMDD = 'yyyy-MM-dd';
export const _DDMMYYYY = 'dd-MM-yyyy';
export const _MMDDYYYY = 'MM-dd-yyyy';

export const YYYYMMDD = 'yyyy/MM/dd';
export const DDMMYYYY = 'dd/MM/yyyy';
export const MMDDYYYY = 'MM/dd/yyyy';

export const DATE_WITH_TIME = 'yyyy-MM-dd HH:mm:ss';
export const TIME_FORMAT = 'HH:mm:ss';
export const FULL_DATE_FORMAT = 'MMMM dd, yyyy';
export const SHORT_DATE_FORMAT = 'MMM dd, yyyy';


export const TIMEZONE_UTC = 'UTC'; // Default UTC timezone

export function format_date(dateFormat: string = YYYYMMDD, date: Date | number = new Date(), timezone: string = TIMEZONE_UTC) {
    const options = { timeZone: timezone };
    return format(date, dateFormat, options);
}

export function dateObj(date: Date | string | number = new Date(), timezone: string = TIMEZONE_UTC): Date {
    const dateInTimezone = zonedTimeToUtc(date, timezone);
    return new Date(dateInTimezone);
}

export function add_days(date: Date, days: number, timezone: string = TIMEZONE_UTC): Date {
    return addDays(utcToZonedTime(date, timezone), days);
}

export function sub_days(date: Date, days: number, timezone: string = TIMEZONE_UTC): Date {
    return subDays(utcToZonedTime(date, timezone), days);
}

export function add_months(date: Date, months: number, timezone: string = TIMEZONE_UTC): Date {
    return addMonths(utcToZonedTime(date, timezone), months);
}

export function sub_months(date: Date, months: number, timezone: string = TIMEZONE_UTC): Date {
    return subMonths(utcToZonedTime(date, timezone), months);
}

export function add_years(date: Date, years: number, timezone: string = TIMEZONE_UTC): Date {
    return addYears(utcToZonedTime(date, timezone), years);
}

export function sub_years(date: Date, years: number, timezone: string = TIMEZONE_UTC): Date {
    return subYears(utcToZonedTime(date, timezone), years);
}


/*
    Pending points into date
    ------------------------------
    Change Timezone

    Add number of days into date
    Sub number of days from date
    
    Add number of months into date
    Sub number of months from date
    
    Add number of years into date
    Sub number of years from date

*/

/*
    DO YOU WANT TO ANY TYPE OF FORMATE YOU CAN CREATE WITH USE OF BELOW TOKENS
    
    yyyy    : Year with four digits (e.g., 2022).
    MM      : Month with zero-padding (01 to 12).
    dd      : Day of the month with zero-padding (01 to 31).
    HH      : Hours in 24-hour format with zero-padding (00 to 23).
    mm      : Minutes with zero-padding (00 to 59).
    ss      : Seconds with zero-padding (00 to 59).
    S       : Milliseconds (0 to 999).
    E       : Day of the week, short version (e.g., Mon).
    EEEE    : Day of the week, full version (e.g., Monday).
    MMM     : Month, short version (e.g., Jan).
    MMMM    : Month, full version (e.g., January).
*/