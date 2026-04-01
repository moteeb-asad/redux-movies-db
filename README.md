# Redux Movie DB

## Overview

Redux Movie DB is a responsive movie discovery platform built with React, Redux Toolkit,
and Chakra UI.

It is designed as a portfolio-grade frontend app that combines curated movie feeds,
advanced filtering, and detail exploration in a single user experience.

Core outcomes:

- Better movie discovery across trending, popular, in-theatres, and upcoming categories.
- Faster exploration using sidebar filters and instant search suggestions.
- Cleaner browsing with skeleton loading and responsive card-based layouts.
- Better maintainability through centralized Redux slices and reusable UI components.

## Problem It Solves

Movie browsing interfaces are often fragmented between separate pages for discovery,
search, and details, making the experience slower and harder to navigate.

Redux Movie DB solves this by providing:

- A single frontend experience for listing, filtering, searching, and viewing details.
- Unified state management for catalog, query, pagination, and selected item context.
- Quick transitions between result lists and details through route-based navigation.
- A mobile-friendly layout for both grid browsing and detail consumption.

## Features

- Header discovery filters: Trending, What's Popular, In Theatres, Upcoming.
- Explore view with sidebar filters: sort, genres, year, language, minimum user score.
- Pagination-style "Load More" behavior on explore flows.
- Live search with result snippets and poster previews.
- Movie details view with cast and similar movie sections.
- Skeleton placeholders and animated transitions for loading states.

## Tech Stack

- Framework: React 18 (Create React App)
- Language: JavaScript (ES6+)
- State management: Redux Toolkit + React Redux
- Routing: React Router DOM v6
- UI: Chakra UI + custom CSS
- API client: Axios
- Data source: TMDB API (The Movie Database)

## Architecture

- Router-driven pages with persistent header and footer shell.
- Feature pages under `src/pages`:
  - `Home` for curated feed browsing.
  - `ExploreMovies` for discover filters and larger listing workflow.
  - `SearchResult` for query matches.
  - `Details` for selected title metadata, cast, and similar content.
- Global state under `src/store`:
  - `moviesSlice` handles listing, filters, sorting, and pagination state.
  - `searchSlice` handles query and search result state.
- Reusable UI components under `src/components`.
- Shared constants and config under `src/constants`.

## Environment Variables

Create a `.env` file in the project root (or copy from `.env.example`):

```bash
REACT_APP_TMDB_API_KEY=your_tmdb_api_key_here
```

| Variable                 | Description                                                 | Required |
| ------------------------ | ----------------------------------------------------------- | -------- |
| `REACT_APP_TMDB_API_KEY` | TMDB API key used for all movie, genre, and search requests | Yes      |

Notes:

- Do not commit real secrets in `.env`.
- Restart the development server after changing environment variables.

## Routes

- `/`: Home discovery feed.
- `/explore-movies`: Advanced discover view with sidebar filters.
- `/details`: Details page for the currently selected movie item.
- `/search`: Search results page.
- `/about`: Project information page.

## Getting Started

### Prerequisites

- Node.js 16+
- npm
- TMDB API key

### Installation

1. Clone the repository.

```bash
git clone https://github.com/moteeb-asad/redux-movies-db.git
cd redux-movies-db
```

2. Install dependencies.

```bash
npm install
```

3. Configure environment variables.

```bash
REACT_APP_TMDB_API_KEY=your_tmdb_api_key_here
```

4. Run the development server.

```bash
npm start
```

App runs at `http://localhost:3000`.

### Build for Production

```bash
npm run build
```

The output is generated in the `build/` directory.

## Testing and Quality

- Unit tests: `npm test`
- Build validation: `npm run build`
- Security audit: `npm audit`
