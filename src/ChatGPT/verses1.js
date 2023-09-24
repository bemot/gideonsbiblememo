const fs = require("fs");

function parseVerse(verse) {
  // Split by space to separate the book name and chapter-verse numbers
  const regex = /([a-zA-Z\s]+)(\d+.*)/;
  const match = verse.match(regex);
  if (match) {
    return {
      book: match[1].trim(),
      chapterVerse: match[2].trim(),
    };
  }
  return null;
}

function extractVerses(entry) {
  const summary = entry.SUMMARY;
  const parts = summary.split("\\;");
  if (parts.length !== 2) {
    return null; // Format not as expected
  }

  const oldTestament = parts[0]
    .replace("Read Bible: ", "")
    .split(";")
    .map(parseVerse);
  const newTestament = parts[1].split(";").map(parseVerse);

  return {
    oldTestament,
    newTestament,
  };
}

function findVersesByDate(jsonData, targetMonthDay) {
  const entries = jsonData.GIDEONSCALENDAR;
  for (let entry of entries) {
    const monthDayPart = entry.DTSTART.substring(4, 8);
    if (monthDayPart === targetMonthDay) {
      return extractVerses(entry);
    }
  }
  return null;
}

fs.readFile("calendar.json", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading the file:", err);
    return;
  }

  const jsonData = JSON.parse(data);
  const dateToSearch = "0902"; // Represents September 2
  const verses = findVersesByDate(jsonData, dateToSearch);

  if (verses) {
    console.log("Old Testament:");
    verses.oldTestament.forEach((v) => {
      if (v) {
        console.log(`Book: ${v.book}, Books: ${v.chapterVerse}`);
      }
    });

    console.log("\nNew Testament:");
    verses.newTestament.forEach((v) => {
      if (v) {
        console.log(`Book: ${v.book}, Verses: ${v.chapterVerse}`);
      }
    });
  } else {
    console.log("Date not found in JSON data or format not as expected.");
  }
});
