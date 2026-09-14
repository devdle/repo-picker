GitHub Repository Finder
A responsive web application that discovers and displays random open-source GitHub repositories filtered by programming language. Built with vanilla JavaScript, modern CSS, and the GitHub REST API.

Features
Language Filtering: Query repositories across popular programming languages (JavaScript, TypeScript, Python, Rust, Go, Java, HTML, CSS).

Random Discovery: Dynamically selects and renders a repository from top-starred projects.

Robust State Machine UI: Clean visual transitions across four distinct UI states:

Empty State: Guided prompt when no language is selected.

Loading State: Animated CSS spinner during asynchronous network requests.

Error State: Context-aware error reporting (rate limits, offline detection, server errors) with a dedicated retry trigger.

Success State: Detailed repository card view.

Client-Side In-Memory Caching: Caches the fetched repository pool per language to allow instantaneous shuffling via the "Refresh" action without exceeding GitHub's unauthenticated API rate limits.

Defensive Error Handling: Granular HTTP status checks differentiating between rate limiting (403/429), client issues (400–499), server downtimes (500–599), and complete network disconnections (navigator.onLine).

Formatted Metrics: Displays live repository metrics (stars, forks, open issues) formatted with localized thousands separators (toLocaleString()).

UI States & Architecture
The application implements a decoupled architecture where JavaScript controls application state and class bindings, while CSS controls presentation:

[ User Selects Language ]
           │
           ▼
    [ Loading State ] ──► (Fetch from GitHub API)
           │
     ┌─────┴────────────────┐
     ▼                      ▼
[ Success ]            [ Error State ]
     │                      │
     ├─► [ Refresh ]        └─► [ Retry ]
     │   (In-Memory Shuffle)    (Re-fetch from API)
     │
     └─► [ Change Language ]
         (Re-fetch from API)
Tech Stack
Markup: Semantic HTML5 (<main>, <header>, <section>, <select>)

Styling: Modern CSS3 (Custom Properties/Variables, CSS Grid, Flexbox, Glassmorphism backdrop filters, Media Queries)

Scripting: Vanilla JavaScript (ES6+)

Asynchronous Fetch API with async / await

Synthetic Event Dispatching (dispatchEvent)

DOM token manipulation (classList)

Array mutation and random index selection (Math.random)

Project Structure
Plaintext
├── index.html       # Semantic HTML layout and state containers
├── style.css        # Theme variables, layouts, state styling, and animations
├── script.js       # Application state machine, API client, and DOM binding
└── README.md        # Documentation
Getting Started
Prerequisites
A modern web browser (Chrome, Firefox, Safari, Edge).

Installation & Setup
Clone the repository:

Bash
git clone https://github.com/your-username/github-random-repo-finder.git
Navigate into the project directory:

Bash
cd github-random-repo-finder
Launch the application:

Open index.html directly in your browser, or

Serve using VS Code Live Server ([http://127.0.0.1:5500](http://127.0.0.1:5500)) to test proper relative script deferring and browser caching.

API Reference
This project queries the public GitHub Search API:

Endpoint: GET [https://api.github.com/search/repositories](https://api.github.com/search/repositories)

Parameters:

q=language:{language}

sort=stars

order=desc

Note on Rate Limits: The GitHub API permits up to 10 requests per minute for unauthenticated search queries. This application minimizes API consumption by storing the 30 retrieved results locally in memory; clicking Refresh selects a different repository from the existing dataset without making additional network calls.

Core Learnings
Managing asynchronous lifecycles cleanly using try...catch and async/await.

Decoupling DOM logic from CSS rules by using .hidden toggle helpers instead of inline style.display modifications.

Implementing graceful degradation and recovery strategies for API rate limits and client network failures.

Simulating native user actions via synthetic event dispatchers (new Event("change")).

License
This project is open-source and available under the MIT License.
