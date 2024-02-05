export const formatMonthYear = (dateString: string): string => {
    const dateObject = new Date(dateString);

    const month = (dateObject.getUTCMonth() + 1).toString().padStart(2, '0');
    const year = dateObject.getUTCFullYear();

    return `${month}/${year}`;
};