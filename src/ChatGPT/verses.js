const fs = require("fs");

function extractVerses(entry) {
  const summary = entry.SUMMARY;

  const parts = summary.split("\\;");
  if (parts.length !== 2) {
    return null; // Format not as expected
  }

  const oldTestament = parts[0].replace("Read Bible: ", "").trim();
  const newTestament = parts[1].trim();

  return {
    oldTestament,
    newTestament,
  };
}

function findVersesByDate(jsonData, targetMonthDay) {
  const entries = jsonData.GIDEONSCALENDAR;

  for (let entry of entries) {
    // Extract the month and day part of the DTSTART field
    const monthDayPart = entry.DTSTART.substring(4, 8);
    if (monthDayPart === targetMonthDay) {
      return extractVerses(entry);
    }
  }

  return null; // No match found
}

fs.readFile("calendar.json", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading the file:", err);
    return;
  }

  // Parse the JSON data
  const jsonData = JSON.parse(data);

  const dateToSearch = "0726"; // This represents the date July 26
  const verses = findVersesByDate(jsonData, dateToSearch);
  if (verses) {
    console.log(`Old Testament: ${verses.oldTestament}`);
    console.log(`New Testament: ${verses.newTestament}`);
  } else {
    console.log("Date not found in JSON data or format not as expected.");
  }
});
