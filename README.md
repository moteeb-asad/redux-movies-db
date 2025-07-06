# Redux Movie DB

A modern React + Redux movie database app using TMDB API, Chakra UI, and advanced filtering.

## Features

- Browse trending, popular, in-theatre, and upcoming movies
- Powerful sidebar filters: genre, year, language, min user score, sort
- Movie search with instant results
- Movie details with cast, similar movies, and more
- Responsive, clean UI with Chakra UI
- State management with Redux Toolkit

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- TMDB API key ([get one here](https://www.themoviedb.org/settings/api))

### Installation

```sh
git clone https://github.com/yourusername/redux-movie-db.git
cd redux-movie-db
npm install
```

### Setup

1. Create a `.env` file in the root:
   ```env
   REACT_APP_TMDB_API_KEY=your_tmdb_api_key_here
   ```
2. Start the development server:
   ```sh
   npm start
   ```

## Usage

- Use the sidebar to filter movies by genre, year, language, user score, and sort order.
- Click a movie card for full details, cast, and similar movies.
- Use the search bar to find movies or TV series by title.

## Filter Options

- **Sort By:** Title (A-Z/Z-A), Rating (Asc/Desc)
- **Genres:** Multi-select from TMDB genres
- **Year:** Last 20 years
- **Language:** Common languages
- **Min User Score:** 0–10 (step 0.1)

## Contributing

- Create a new branch for your feature/fix: `git checkout -b feature/your-feature`
- Commit and push your changes
- Open a pull request on GitHub

## License

MIT
