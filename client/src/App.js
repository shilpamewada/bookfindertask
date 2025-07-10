import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [savedBooks, setSavedBooks] = useState([]);
  const [searchAttempted, setSearchAttempted] = useState(false);

  const searchBooks = async () => {
    if (!query) return alert("Please enter a search term.");
    try {
      setSearchAttempted(true);
      const res = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}`
      );

      const filtered = (res.data.items || []).filter((book) => {
        const title = book.volumeInfo.title?.toLowerCase() || "";
        const authors = book.volumeInfo.authors || [];
        const hasAuthor = authors.length > 0;
        const matchesQuery =
          title.includes(query.toLowerCase()) ||
          authors.some((author) =>
            author.toLowerCase().includes(query.toLowerCase())
          );
        return hasAuthor && matchesQuery;
      });

      setResults(filtered);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  const saveBook = async (book) => {
    try {
      await axios.post("http://localhost:5000/books", {
        title: book.volumeInfo.title,
        author: book.volumeInfo.authors?.[0] || "Unknown",
        publishedDate:
          book.volumeInfo.publishedDate?.substring(0, 4) || "N/A", // Only year
        thumbnail: book.volumeInfo.imageLinks?.thumbnail || "",
      });
      alert("✅ Book saved!");
      fetchSavedBooks();
    } catch (error) {
      console.error("Save error:", error);
    }
  };

  const fetchSavedBooks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/books");
      setSavedBooks(res.data);
    } catch (error) {
      console.error("Fetch saved error:", error);
    }
  };

  const deleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/books/${id}`);
      alert("🗑️ Book deleted!");
      fetchSavedBooks();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  useEffect(() => {
    fetchSavedBooks();
  }, []);

  return (
    <div className="container">
      <h1>📚 Book Finder</h1>
     <form className="search-bar" onSubmit={(e) => {
  e.preventDefault();
  searchBooks();
}}>
  <input
    type="text"
    placeholder="Search book title..."
    value={query}
    onChange={(e) => setQuery(e.target.value)}
  />
  <button type="submit">🔍 Search</button>
</form>


      <h2>🔎 Search Results</h2>
      {searchAttempted && results.length === 0 && (
        <p className="not-found">❌ Book not found. Try another search.</p>
      )}
      <div className="book-list">
        {results.map((book, i) => (
          <div className="book-card" key={i}>
            <h3>{book.volumeInfo.title}</h3>
            <p>Author: {book.volumeInfo.authors?.[0]}</p>
            <p>Published: {book.volumeInfo.publishedDate?.substring(0, 4) || "N/A"}</p>
            {book.volumeInfo.imageLinks?.thumbnail && (
              <img
                src={book.volumeInfo.imageLinks.thumbnail}
                alt="Book cover"
              />
            )}
            <button onClick={() => saveBook(book)}>💾 Save</button>
          </div>
        ))}
      </div>

      <h2>💾 Saved Books</h2>
      <div className="book-list">
        {savedBooks.map((book, i) => (
          <div className="book-card" key={i}>
            <h4>{book.title}</h4>
            <p>Author: {book.author}</p>
            <p>Published: {book.publishedDate || "N/A"}</p>
            {book.thumbnail && <img src={book.thumbnail} alt="cover" />}
            <button className="delete-btn" onClick={() => deleteBook(book._id)}>
              🗑️ Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
