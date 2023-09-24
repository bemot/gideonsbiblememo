function extractMonthAndDay(dateString) {
  // Manually extract year, month, and day from the dateString
  const year = parseInt(dateString.substring(0, 4), 10);
  const month = parseInt(dateString.substring(4, 6), 10);
  const day = parseInt(dateString.substring(6, 8), 10);

  return {
    month,
    day,
  };
}

// Example usage:
const dateString = "20190726T160000Z";
const result = extractMonthAndDay(dateString);
console.log(`Month: ${result.month}, Day: ${result.day}`); // Expected output: Month: 7, Day: 26
