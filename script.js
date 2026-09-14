const languageSelect = document.getElementById("languageSelect");
const emptyState = document.getElementById("emptyState");
const loadingState = document.getElementById("loadingState");
const errorState = document.getElementById("errorState");
const repoState = document.getElementById("repoState");
const errorText = document.getElementById("errorText");
const repoLink = document.getElementById("repoLink");
const repoName = document.getElementById("repoName");
const repoDescription = document.getElementById("repoDescription");
const repoLanguage = document.getElementById("repoLanguage");
const repoStars = document.getElementById("repoStars");
const repoForks = document.getElementById("repoForks");
const repoIssues = document.getElementById("repoIssues");
const refreshButton = document.getElementById("refreshBtn");
const retryButton = document.getElementById("retryBtn");
const languageColor = document.querySelector(".lang-dot");
let currentRepositories = [];

const languagesColors = {
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Java: "#b07219",
  TypeScript: "#2b7489",
  Go: "#00ADD8",
  Rust: "#dea584",
  HTML: "#e34c26",
  CSS: "#563d7c",
};
function getLanguageColor(Language) {
  return languagesColors[Language];
}
function setUIState(state) {
  emptyState.classList.add("hidden");
  loadingState.classList.add("hidden");
  errorState.classList.add("hidden");
  repoState.classList.add("hidden");

  if (state === "empty") emptyState.classList.remove("hidden");
  if (state === "loading") loadingState.classList.remove("hidden");
  if (state === "error") errorState.classList.remove("hidden");
  if (state === "repo") repoState.classList.remove("hidden");
}

languageSelect.addEventListener("change", async function () {
  console.log("Selected language:", languageSelect.value);
  setUIState("loading");
  const selectedLanguage = languageSelect.value;
  const url = `https://api.github.com/search/repositories?q=language:${selectedLanguage}&sort=stars&order=desc`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      if (response.status === 403 || response.status === 429) {
        throw new Error(
          `Rate limit exceeded! please wait a minute before making more requests: ${response.status}`,
        );
      }
      if (response.status >= 400 && response.status < 500) {
        throw new Error(
          `Client Error (${response.status}): Invalid request or resource not found.`,
        );
      }
      if (response.status >= 500) {
        throw new Error(
          `Server Error (${response.status}): The server is currently unable to handle the request.`,
        );
      }
      throw new Error(`Unexpected error occurred: Status ${response.status}`);
    }

    const data = await response.json();
    currentRepositories = data.items;
    displayRandomRepository();
    console.log("Fetched data:", data);
  } catch (error) {
    setUIState("error");
    if (!navigator.onLine) {
      errorText.textContent =
        "You are offline. Please check your internet connection and try again.";
    } else {
      errorText.textContent = `Error fetching repositories: ${error.message}`;
    }
  }
});

function displayRandomRepository() {
  setUIState("repo");
  const randomRepo = Math.floor(Math.random() * currentRepositories.length);
  const repoPicked = currentRepositories[randomRepo];
  repoLink.href = repoPicked.html_url;
  repoName.textContent = repoPicked.full_name;
  repoDescription.textContent =
    repoPicked.description || "No description available.";
  repoLanguage.textContent = repoPicked.language || "Not specified.";
  repoStars.textContent = repoPicked.stargazers_count.toLocaleString();
  repoForks.textContent = repoPicked.forks_count.toLocaleString();
  repoIssues.textContent = repoPicked.open_issues_count.toLocaleString();
  languageColor.style.backgroundColor = getLanguageColor(repoPicked.language);
}

retryButton.addEventListener("click", function () {
  languageSelect.dispatchEvent(new Event("change"));
});

refreshButton.addEventListener("click", function () {
  displayRandomRepository();
});
setUIState("empty");
