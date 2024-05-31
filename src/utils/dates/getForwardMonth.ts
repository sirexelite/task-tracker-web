export default (date: number | Date) => {
    if (typeof date === 'number') {
        date = new Date(date);
    }

    return new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        1
    );
}