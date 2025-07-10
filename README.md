📚 Book Finder App
This is a full-stack Book Finder application built with:
⚛️ React (Frontend – inside client/ folder)
🚀 Node.js + Express (Backend – inside server/ folder)
🛢️ MongoDB (to save and fetch books)
🔍 Google Books API (for live search)

book-finder/
│
├── client/        # React frontend
│   └── App.js
│   └── App.css
│   └── ...
│
├── server/        # Node.js backend
│   └── index.js
│   └── package.json
│
└── README.md      # This file

✨ Features
🔍 Search books by title or author using the Google Books API.
💾 Save selected books to your MongoDB database.
🗑️ Delete saved books.
🎨 Clean and responsive UI with search, results, and saved book sections.

🛠️ How to Run Locally
⚙️ 1. Backend (server)
cd server
npm install
node index.js

🌐 2. Frontend (client)
cd client
npm install
npm start

🔗 API Endpoints (Backend)
| Method | Endpoint     | Description           |
| ------ | ------------ | --------------------- |
| GET    | `/books`     | Fetch all saved books |
| POST   | `/books`     | Save a new book       |
| DELETE | `/books/:id` | Delete a book         |

🧪 Example Flow
Search for a book like Harry Potter.
Click 💾 Save on any result.
Saved books will appear in the "Saved Books" section.
You can click 🗑️ Delete to remove saved books.

💡 Notes
You don’t need an API key for the Google Books API.
Backend and frontend communicate using http://localhost:5000/books API.
Deployment for the frontend can be done on Vercel (only the client).
The backend can be hosted separately on platforms like Render or Railway if needed.
