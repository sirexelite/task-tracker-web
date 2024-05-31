export default (date: number | Date) => {
    if (typeof date === 'number') {
        date = new Date(date);
    }

    date.setDate(1);
    date.setMonth(date.getMonth() - 1);

    return date;
}