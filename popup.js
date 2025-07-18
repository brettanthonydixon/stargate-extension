// --- Start of new popup.js code ---

console.log("popup.js script has loaded!");

document.addEventListener('DOMContentLoaded', function() {
  console.log("DOM is ready. Attaching event listener.");

  const searchButton = document.getElementById('search-button');
  const queryInput = document.getElementById('query-input');
  const resultsDiv = document.getElementById('results-div');
  
  // URL of your backend server
  const backendUrl = 'https://stargate-backend.onrender.com';

  searchButton.addEventListener('click', function() {
    console.log("Search button was clicked!"); // <-- BREADCRUMB #1

    const query = queryInput.value;
    if (!query) {
      resultsDiv.innerHTML = "Please enter a search query.";
      return;
    }

    resultsDiv.innerHTML = "Searching...";

    console.log("About to fetch from backend..."); // <-- BREADCRUMB #2

    fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: query }),
    })
    .then(response => {
      console.log("Received a response from backend."); // <-- BREADCRUMB #3
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Clear previous results
      resultsDiv.innerHTML = '';
      
      // Display the search results
      if (data.items && data.items.length > 0) {
        data.items.forEach(item => {
          const resultElement = document.createElement('div');
          resultElement.className = 'result-item';
          resultElement.innerHTML = `
            <h3><a href="${item.link}" target="_blank">${item.title}</a></h3>
            <p>${item.snippet}</p>
          `;
          resultsDiv.appendChild(resultElement);
        });
      } else {
        resultsDiv.innerHTML = "No results found.";
      }
    })
    .catch(error => {
      console.error('Error:', error);
      resultsDiv.innerHTML = 'Failed to fetch search results. Make sure your backend server is running.';
    });
  });
});

// --- End of new popup.js code ---
