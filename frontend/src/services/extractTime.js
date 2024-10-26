export const extractTime = (dateString) => {
  let date = new Date(dateString);
  let hours = padZero(date.getHours());
  let minutes = padZero(date.getMinutes());
  let ampm = hours >= 12 ? "PM" : "AM";

  // Convert 24-hour format to 12-hour format
  hours = hours % 12 || 12; // Convert "0" or "12" to "12" for AM/PM // 12-Hour Conversion: hours = hours % 12 || 12; hours % 12 converts hours greater than 12 to a 12-hour format (e.g., 13 becomes 1). The || 12 part ensures that 0 (midnight) is displayed as 12.
  return `${hours}:${minutes} ${ampm}`;
};

const padZero = (num) => {
  // This function is used to add 0 before the number if the number is less than 10
  return num.toString().padStart(2, "0");
};
