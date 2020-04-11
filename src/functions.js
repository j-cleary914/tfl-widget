export const formatDate = date => {
  const lastUpdatedString = `${date.getDate()}/${date.getMonth() +
    1}/${date.getFullYear()} - ${date
    .getHours()
    .toString()
    .padStart(2, "0")}:${date
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;
  return lastUpdatedString;
};
