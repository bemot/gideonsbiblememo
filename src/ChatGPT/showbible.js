import React, { useState } from "react";

// Sample JSON data (your data may be larger)
const bibleData = {
  books: [
    {
      name: "Genesis",
      chapters: [
        {
          chapter: 1,
          verses: [
            // ... your verses here ...
          ],
        },
        // ... other chapters ...
      ],
    },
    // ... other books ...
  ],
};

const BibleReader = () => {
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);

  const handleBookChange = (e) => {
    setSelectedBook(e.target.value);
    setSelectedChapter(null);
  };

  const handleChapterChange = (e) => {
    setSelectedChapter(e.target.value);
  };

  return (
    <div>
      <select onChange={handleBookChange} value={selectedBook || ""}>
        <option value="">Select Book</option>
        {bibleData.books.map((book, index) => (
          <option key={index} value={book.name}>
            {book.name}
          </option>
        ))}
      </select>

      {selectedBook && (
        <select onChange={handleChapterChange} value={selectedChapter || ""}>
          <option value="">Select Chapter</option>
          {bibleData.books
            .find((b) => b.name === selectedBook)
            .chapters.map((chapter) => (
              <option key={chapter.chapter} value={chapter.chapter}>
                Chapter {chapter.chapter}
              </option>
            ))}
        </select>
      )}

      {selectedChapter && (
        <div>
          {bibleData.books
            .find((b) => b.name === selectedBook)
            .chapters.find((c) => c.chapter === parseInt(selectedChapter))
            .verses.map((verse) => (
              <p key={verse.verse}>
                <strong>{verse.name}</strong>: {verse.text}
              </p>
            ))}
        </div>
      )}
    </div>
  );
};

export default BibleReader;
