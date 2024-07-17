import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {
  transform(date: Date): string {
    if (!(date instanceof Date)) return '';

    // Get day, month, and year from the date object
    const day: number = date.getDate();
    const month: number = date.getMonth() + 1; // Months are zero-based
    const year: number = date.getFullYear();

    // Pad day and month with leading zeros if necessary
    const formattedDay: string = day < 10 ? '0' + day : day.toString();
    const formattedMonth: string = month < 10 ? '0' + month : month.toString();

    // Return the formatted date string
    return `${formattedDay}/${formattedMonth}/${year}`;
  }
}
