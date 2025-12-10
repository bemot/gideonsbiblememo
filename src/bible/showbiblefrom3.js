import React, { useState, useEffect } from "react";

// Assuming you've imported your JSON files
import russianSynodal from "../BIBLES/RussianSynodal.json";
import ukrainianOgienko from "../BIBLES/UkrainianOgienko.json";
import kingJames from "../BIBLES/KingJames.json";
import "../css/BibleReader.css";

const BIBLE_VERSIONS = {
  "Ukrainian Ogienko": ukrainianOgienko,
  "King James": kingJames,
  "Russian Synodal": russianSynodal,
};

const BibleReader = () => {
  const [selectedVersion, setSelectedVersion] = useState("King James");
  const [selectedBook, setSelectedBook] = useState("Genesis");
  const [selectedChapter, setSelectedChapter] = useState("1");

  const [books, setBooks] = useState(BIBLE_VERSIONS[selectedVersion].books);

  useEffect(() => {
    if (selectedVersion) {
      setBooks(BIBLE_VERSIONS[selectedVersion].books);
    }
  }, [selectedVersion]);

  const handleVersionChange = (e) => {
    const newVersion = e.target.value;
    setSelectedVersion(newVersion);

    const newBooks = BIBLE_VERSIONS[newVersion].books;
    const bookExists = newBooks.some((book) => book.name === selectedBook);

    if (bookExists) {
      const bookData = newBooks.find((book) => book.name === selectedBook);
      const chapterExists = bookData.chapters.some(
        (c) => c.chapter === parseInt(selectedChapter)
      );
      if (!chapterExists) {
        setSelectedChapter("1");
      }
    } else {
      setSelectedBook("Genesis");
      setSelectedChapter("1");
    }
  };

  const handleBookChange = (e) => {
    const book = e.target.value;
    setSelectedBook(book);
    setSelectedChapter("1");
  };

  const handleChapterChange = (e) => {
    const chapter = e.target.value;
    setSelectedChapter(chapter);
  };

  const currentBook = books.find((b) => b.name === selectedBook);
  const chapterContent = currentBook?.chapters.find(
    (c) => c.chapter === parseInt(selectedChapter)
  );

  return (
    <div className="container">
      <div className="selector-container">
        <select
          className="select"
          onChange={handleVersionChange}
          value={selectedVersion || ""}
        >
          <option value="">Select Version</option>
          {Object.keys(BIBLE_VERSIONS).map((version) => (
            <option key={version} value={version}>
              {version}
            </option>
          ))}
        </select>

        {selectedVersion && (
          <select
            className="select"
            onChange={handleBookChange}
            value={selectedBook || ""}
          >
            <option value="">Select Book</option>
            {books.map((book, index) => (
              <option key={index} value={book.name}>
                {book.name}
              </option>
            ))}
          </select>
        )}

        {currentBook && (
          <select
            className="select"
            onChange={handleChapterChange}
            value={selectedChapter || ""}
          >
            <option value="">Select Chapter</option>
            {currentBook.chapters.map((chapter) => (
                <option key={chapter.chapter} value={chapter.chapter}>
                  Chapter {chapter.chapter}
                </option>
              ))}
          </select>
        )}
      </div>
      {chapterContent && (
        <div className="chapter-text">
          {chapterContent.verses.map((verse) => (
              <div key={verse.verse} className="verse-block">
                <span className="verse-number">{verse.verse}</span>
                {verse.text}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default BibleReader;
