import { toZonedTime, fromZonedTime, formatInTimeZone } from 'date-fns-tz';
import { format, parseISO, startOfDay, endOfDay } from 'date-fns';
import { fr } from 'date-fns/locale';

/**
 * TAHITI TIMEZONE DATE UTILITIES
 *
 * This module provides a comprehensive set of utilities for handling dates in the Tahiti timezone (Pacific/Tahiti, UTC-10).
 * All functions ensure consistent date handling across the application, whether on server or client.
 *
 * KEY PRINCIPLES:
 * 1. The database stores dates in UTC
 * 2. All business logic operates in Tahiti timezone
 * 3. Users see dates formatted for Tahiti timezone
 * 4. Date comparisons must account for timezone differences
 *
 * USAGE GUIDELINES:
 * - ALWAYS use these utilities instead of native Date constructors or methods
 * - For current time: use getTahitiNow() instead of new Date()
 * - For date strings: use formatDateForTahiti() for display
 * - For database storage: dates are stored as Date objects in UTC
 * - For date inputs: use parseDateFromTahiti() to convert user input
 */

export const TAHITI_TIMEZONE = 'Pacific/Tahiti';

// ============================================================================
// CURRENT TIME FUNCTIONS
// ============================================================================

/**
 * Gets the current date and time in Tahiti timezone
 * Use this instead of `new Date()` for timezone-aware current time
 *
 * @returns Date object representing current time in Tahiti
 *
 * @example
 * const now = getTahitiNow();
 * console.log(formatTahitiDateTime(now)); // "15/03/2024 14:30:00"
 */
export function getTahitiNow(): Date {
  return toZonedTime(new Date(), TAHITI_TIMEZONE);
}

/**
 * Gets today's date in Tahiti timezone, normalized to start of day (midnight)
 * Use this for date-only comparisons and queries
 *
 * @returns Date object representing start of today in Tahiti timezone
 *
 * @example
 * const today = getTahitiToday();
 * // Use for queries: where createdAt >= today
 */
export function getTahitiToday(): Date {
  return getTahitiDayStart(new Date());
}

// ============================================================================
// DATE NORMALIZATION FUNCTIONS
// ============================================================================

/**
 * Normalizes any date to Tahiti timezone at start of day (midnight)
 * This removes time components and ensures we're working with consistent day boundaries
 *
 * @param date - The date to normalize
 * @returns Date object at midnight in Tahiti timezone
 *
 * @example
 * const userInput = new Date('2024-03-15T18:30:00Z');
 * const normalized = normalizeToTahitiDay(userInput);
 * // Result: 2024-03-15 00:00:00 Tahiti time (stored as UTC in DB)
 */
export function normalizeToTahitiDay(date: Date): Date {
  const tahitiDate = toZonedTime(date, TAHITI_TIMEZONE);
  tahitiDate.setHours(0, 0, 0, 0);
  return fromZonedTime(tahitiDate, TAHITI_TIMEZONE);
}

/**
 * Gets the start of day (midnight) for a given date in Tahiti timezone
 *
 * @param date - The date to get start of day for
 * @returns Date object at 00:00:00.000 Tahiti time
 */
export function getTahitiDayStart(date: Date): Date {
  const tahitiDate = toZonedTime(date, TAHITI_TIMEZONE);
  tahitiDate.setHours(0, 0, 0, 0);
  return fromZonedTime(tahitiDate, TAHITI_TIMEZONE);
}

/**
 * Gets the end of day for a given date in Tahiti timezone
 *
 * @param date - The date to get end of day for
 * @returns Date object at 23:59:59.999 Tahiti time
 */
export function getTahitiDayEnd(date: Date): Date {
  const tahitiDate = toZonedTime(date, TAHITI_TIMEZONE);
  tahitiDate.setHours(23, 59, 59, 999);
  return fromZonedTime(tahitiDate, TAHITI_TIMEZONE);
}

// ============================================================================
// TIMEZONE CONVERSION FUNCTIONS
// ============================================================================

/**
 * Converts any date to Tahiti timezone (for display purposes)
 *
 * @param date - The date to convert
 * @returns Date object representing the same moment in Tahiti timezone
 *
 * @example
 * const utcDate = new Date('2024-03-15T10:00:00Z');
 * const tahitiDate = toTahitiTime(utcDate);
 * // If Tahiti is UTC-10, this would be 2024-03-15 00:00:00 Tahiti time
 */
export function toTahitiTime(date: Date): Date {
  return toZonedTime(date, TAHITI_TIMEZONE);
}

/**
 * Converts a date from Tahiti timezone to UTC
 * Use when storing user-selected dates in the database
 *
 * @param tahitiDate - Date in Tahiti timezone
 * @returns Date object in UTC
 */
export function fromTahitiTime(tahitiDate: Date): Date {
  return fromZonedTime(tahitiDate, TAHITI_TIMEZONE);
}

// ============================================================================
// STRING FORMATTING FUNCTIONS (for display)
// ============================================================================

/**
 * Formats a date for display in Tahiti timezone (dd/MM/yyyy format)
 * Handles Date objects, ISO strings, or YYYY-MM-DD strings
 *
 * @param date - Date to format (Date object or string)
 * @returns Formatted date string (e.g., "15/03/2024") or undefined
 *
 * @example
 * formatDateForTahiti(new Date()) // "15/03/2024"
 * formatDateForTahiti("2024-03-15") // "15/03/2024"
 * formatDateForTahiti("2024-03-15T10:00:00Z") // "15/03/2024"
 */
export function formatDateForTahiti(date: Date | string | undefined | null): string | undefined {
  if (!date) return undefined;
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return formatInTimeZone(dateObj, TAHITI_TIMEZONE, 'dd/MM/yyyy', { locale: fr });
  } catch {
    return undefined;
  }
}

/**
 * Formats a date and time for display in Tahiti timezone
 *
 * @param date - Date to format
 * @param formatStr - Optional format string (defaults to 'dd/MM/yyyy HH:mm:ss')
 * @returns Formatted date-time string or undefined
 *
 * @example
 * formatTahitiDateTime(new Date()) // "15/03/2024 14:30:00"
 * formatTahitiDateTime(new Date(), 'dd/MM/yyyy à HH:mm') // "15/03/2024 à 14:30"
 */
export function formatTahitiDateTime(
  date: Date | string | undefined | null,
  formatStr: string = 'dd/MM/yyyy HH:mm:ss',
): string | undefined {
  if (!date) return undefined;
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return formatInTimeZone(dateObj, TAHITI_TIMEZONE, formatStr, { locale: fr });
  } catch {
    return undefined;
  }
}

/**
 * Formats a date for display in French locale with custom format
 * This is a shorthand for common Tahiti date formatting
 *
 * @param date - Date to format
 * @returns Formatted string like "vendredi 15 mars 2024"
 */
export function formatTahitiLongDate(date: Date | string | undefined | null): string | undefined {
  if (!date) return undefined;
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return formatInTimeZone(dateObj, TAHITI_TIMEZONE, 'EEEE dd MMMM yyyy', { locale: fr });
  } catch {
    return undefined;
  }
}

/**
 * Formats date for API responses (ISO 8601 format in Tahiti timezone)
 *
 * @param date - Date to format
 * @returns ISO string in Tahiti timezone (e.g., "2024-03-15T14:30:00-10:00")
 */
export function formatTahitiISO(date: Date | undefined | null): string | undefined {
  if (!date) return undefined;
  try {
    return formatInTimeZone(date, TAHITI_TIMEZONE, "yyyy-MM-dd'T'HH:mm:ssXXX");
  } catch {
    return undefined;
  }
}

// ============================================================================
// STRING PARSING FUNCTIONS (from user input or database)
// ============================================================================

/**
 * Parses a date string (YYYY-MM-DD format) as Tahiti timezone date
 * Use this when converting user input or form data to Date objects
 *
 * @param dateString - Date string in YYYY-MM-DD format
 * @returns Date object or undefined if parsing fails
 *
 * @example
 * const date = parseDateFromTahiti("2024-03-15");
 * // Returns Date representing 2024-03-15 00:00:00 Tahiti time
 */
export function parseDateFromTahiti(dateString: string | undefined | null): Date | undefined {
  if (!dateString) return undefined;
  try {
    // Parse as if it's a local date in Tahiti timezone
    const [year, month, day] = dateString.split('-').map(Number);
    const tahitiDate = new Date(year, month - 1, day, 0, 0, 0, 0);
    return fromZonedTime(tahitiDate, TAHITI_TIMEZONE);
  } catch {
    return undefined;
  }
}

/**
 * Parses a date for calendar components (handles both Date objects and strings)
 * Converts to Tahiti timezone for display in date picker
 *
 * @param date - Date string or Date object
 * @returns Date object in Tahiti timezone for calendar display
 */
export function parseDateForCalendar(date: Date | string | undefined | null): Date | undefined {
  if (!date) return undefined;
  try {
    if (typeof date === 'string') {
      const parsed = parseISO(date);
      return toZonedTime(parsed, TAHITI_TIMEZONE);
    }
    return toZonedTime(date, TAHITI_TIMEZONE);
  } catch {
    return undefined;
  }
}

// ============================================================================
// DATABASE CONVERSION FUNCTIONS
// ============================================================================

/**
 * Converts a database Date object to YYYY-MM-DD string in Tahiti timezone
 * Use when displaying database dates in forms
 *
 * @param date - Date from database (in UTC)
 * @returns Date string in YYYY-MM-DD format (Tahiti timezone) or undefined
 *
 * @example
 * const dbDate = commande.plannedDeliveryDate; // Date object from Prisma
 * const displayDate = dateToTahitiDateString(dbDate); // "2024-03-15"
 */
export function dateToTahitiDateString(date: Date | undefined | null): string | undefined {
  if (!date) return undefined;
  try {
    const tahitiDate = toZonedTime(date, TAHITI_TIMEZONE);
    return format(tahitiDate, 'yyyy-MM-dd');
  } catch {
    return undefined;
  }
}

/**
 * Converts a date string (YYYY-MM-DD) to Date object for database storage
 * The resulting Date will be at midnight Tahiti time, stored as UTC in database
 *
 * @param dateString - Date string in YYYY-MM-DD format
 * @returns Date object ready for database storage or undefined
 *
 * @example
 * const formValue = "2024-03-15";
 * const dbDate = dateStringToTahitiDate(formValue);
 * await prisma.commande.update({ data: { plannedDeliveryDate: dbDate } });
 */
export function dateStringToTahitiDate(dateString: string | undefined | null): Date | undefined {
  if (!dateString) return undefined;
  try {
    const parsed = parseDateFromTahiti(dateString);
    return parsed ? normalizeToTahitiDay(parsed) : undefined;
  } catch {
    return undefined;
  }
}

// ============================================================================
// LEGACY SUPPORT FUNCTIONS (for backward compatibility)
// ============================================================================

/**
 * @deprecated Use formatDateForTahiti() instead
 * Converts a UTC date string (YYYY-MM-DD) to Tahiti timezone date string (YYYY-MM-DD)
 */
export function convertUTCToTahitiDateString(dateString: string | undefined): string | undefined {
  if (!dateString) return undefined;
  try {
    const utcDate = parseISO(dateString);
    const tahitiDate = toZonedTime(utcDate, TAHITI_TIMEZONE);
    return format(tahitiDate, 'yyyy-MM-dd');
  } catch {
    return undefined;
  }
}

/**
 * @deprecated Use dateToTahitiDateString() instead
 * Converts a date selected in Tahiti timezone to UTC date string (YYYY-MM-DD) for storage
 */
export function convertTahitiToUTC(date: Date): string {
  const utcDate = fromZonedTime(date, TAHITI_TIMEZONE);
  return format(utcDate, 'yyyy-MM-dd');
}

// ============================================================================
// DATE RANGE UTILITIES
// ============================================================================

/**
 * Creates a date range for database queries in Tahiti timezone
 * Ensures queries cover the full day in Tahiti time
 *
 * @param startDateStr - Start date string (YYYY-MM-DD) or undefined
 * @param endDateStr - End date string (YYYY-MM-DD) or undefined
 * @returns Object with gte and lt Date objects for Prisma queries
 *
 * @example
 * const range = createTahitiDateRange("2024-03-15", "2024-03-20");
 * const results = await prisma.commande.findMany({
 *   where: { createdAt: range }
 * });
 */
export function createTahitiDateRange(
  startDateStr?: string | null,
  endDateStr?: string | null,
): { gte?: Date; lt?: Date } {
  const range: { gte?: Date; lt?: Date } = {};

  if (startDateStr) {
    const startDate = parseDateFromTahiti(startDateStr);
    if (startDate) {
      range.gte = getTahitiDayStart(startDate);
    }
  }

  if (endDateStr) {
    const endDate = parseDateFromTahiti(endDateStr);
    if (endDate) {
      // Use start of next day for exclusive upper bound
      const nextDay = new Date(endDate);
      nextDay.setDate(nextDay.getDate() + 1);
      range.lt = getTahitiDayStart(nextDay);
    }
  }

  return range;
}
