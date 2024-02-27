import dayjs from "dayjs";

export default class DateUtil {
    static getFullDate(date: Date): string {
        return dayjs(date).format('DD-MM-YYYY HH:mm:ss');
    }
}