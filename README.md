# Modern Todo List Application

A sleek Todo List application built with Node.js, Express, MySQL, and vanilla JavaScript. 


## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Icons**: Font Awesome

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- MySQL Server
- npm (Node Package Manager)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/todo_app.git
   cd todo_app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the database:
   - Create a MySQL database named `todo_db`
   - Update the database configuration in `server.js` with your credentials

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Project Structure

```
todo_app/
├── public/
│   ├── index.html
│   ├── styles.css
│   └── script.js
├── server.js
├── package.json
├── .gitignore
└── README.md
```

## API Endpoints

- `GET /tasks` - Get all tasks
- `POST /tasks` - Create a new task
- `PUT /tasks/:id` - Update a task
- `DELETE /tasks/:id` - Delete a task

## Development

To start the development server with hot-reload:
```bash
npm run dev
```

## Production

To start the production server:
```bash
npm start
```

### Database Setup

1. Create a MySQL database
2. Update the database configuration in `server.js`
3. The application will automatically create the required table

