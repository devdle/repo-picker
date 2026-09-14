# GitHub Repository Finder

A lightweight, responsive web app to discover random open-source GitHub repositories filtered by programming language.

---

## Features

- **Language Filter:** Browse repositories across languages like JavaScript, TypeScript, Python, Go, and Rust.
- **Random Discovery:** Shuffles and displays a repository along with its live stars, forks, and open issues.
- **In-Memory Caching:** Caches the fetched list so clicking **Refresh** instantly picks a new repository without hitting GitHub's API rate limits.
- **Clean UI States:** Graceful handling of **Empty**, **Loading**, **Error**, and **Success** states.
- **Smart Error Handling:** Identifies offline status, API rate limits, and server errors with a one-click retry.

---

## Tech Stack

- **HTML5** — Semantic layout
- **CSS3** — Custom properties, CSS Grid, Flexbox, responsive design
- **JavaScript (ES6+)** — Fetch API, `async/await`, DOM manipulation
- **GitHub REST API** — Real-time repository metrics

---

## Getting Started

1. Clone the repository:
   ```bash
   git clone  https://github.com/devdle/repo-picker.git
