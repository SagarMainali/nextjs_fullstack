export const getDateAndTime = (createdAt:Date) => {
    const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kathmandu',
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    }
    return createdAt.toLocaleString('en-US', options);
}