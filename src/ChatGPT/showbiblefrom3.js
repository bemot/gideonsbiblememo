import React, { useState, useEffect } from "react";

// Assuming you've imported your JSON files
import russianSynodal from "./russianSynodal.json";
import ukrainianOgienko from "./ukrainianOgienko.json";
import kingJames from "./kingJames.json";

const BIBLE_VERSIONS = {
  "Russian Synodal": russianSynodal,
  "Ukrainian Ogienko": ukrainianOgienko,
  "King James": kingJames,
};

const BibleReader = () => {
  const [selectedVersion, setSelectedVersion] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);

  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (selectedVersion) {
      setBooks(BIBLE_VERSIONS[selectedVersion].books);
      setSelectedBook(null);
      setSelectedChapter(null);
    }
  }, [selectedVersion]);

  const handleVersionChange = (e) => {
    setSelectedVersion(e.target.value);
  };

  const handleBookChange = (e) => {
    setSelectedBook(e.target.value);
    setSelectedChapter(null);
  };

  const handleChapterChange = (e) => {
    setSelectedChapter(e.target.value);
  };

  return (
    <div>
      <select onChange={handleVersionChange} value={selectedVersion || ""}>
        <option value="">Select Version</option>
        {Object.keys(BIBLE_VERSIONS).map((version) => (
          <option key={version} value={version}>
            {version}
          </option>
        ))}
      </select>

      {selectedVersion && (
        <select onChange={handleBookChange} value={selectedBook || ""}>
          <option value="">Select Book</option>
          {books.map((book, index) => (
            <option key={index} value={book.name}>
              {book.name}
            </option>
          ))}
        </select>
      )}

      {selectedBook && (
        <select onChange={handleChapterChange} value={selectedChapter || ""}>
          <option value="">Select Chapter</option>
          {books
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
          {books
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
