import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { utcToZonedTime } from 'date-fns-tz';

dayjs.extend(isBetween);

export const getOpenStatus = (openingHours, currentTime) => {
    const currentTimeDayjs = dayjs(currentTime);
    const currentDayOfWeek = currentTimeDayjs.day();
    const openingHoursToday = openingHours[currentDayOfWeek];

    if (!openingHoursToday) {
        return { isOpen: false };
    }

    const timeRanges = openingHoursToday.split(','); // Separar los intervalos de tiempo

    // Revisa si la hora actual está dentro de alguno de los intervalos de tiempo
    const isOpen = timeRanges.some((range) => {
        const [start, end] = range.split('-').map((time) => {
            const parsedTime = currentTimeDayjs.format('YYYY-MM-DD') + 'T' + time.trim() + ':00';
            return dayjs(parsedTime);
        });

        return currentTimeDayjs.isBetween(start, end, null, '[]');
    });

    return { isOpen };
};

export const getCurrentTimeInArgentina = () => {
    const timeZone = 'America/Argentina/Buenos_Aires';
    return utcToZonedTime(new Date(), timeZone);
};