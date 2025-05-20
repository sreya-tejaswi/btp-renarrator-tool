if (typeof marked === "undefined") {
  console.error("marked is not loaded.");
} else {
  window.formatMetadata = function (data) {
    const styles = `
      body {
        font-family: 'Segoe UI', sans-serif;
        margin: 0;
        padding: 0;
        background-color: #1e1e1e; /* Dark background */
        color: #f1f1f1; /* Light text color */
        transition: all 0.3s ease;
      }
      .container {
        max-width: 800px;
        margin: auto;
        padding: 20px;
      }
      h1, h2, h3, h4 {
        color: #f1f1f1;
      }
      button {
        margin: 10px 5px;
        padding: 10px 15px;
        font-size: 14px;
        cursor: pointer;
        background: #f1f1f1;
        color: #1e1e1e;
        border: none;
        border-radius: 4px;
      }
      .readme-content {
        margin-top: 40px;
        padding-top: 10px;
        border-top: 1px solid #f1f1f1;
      }
      .readme-content img {
        max-width: 100%;
      }
      .readme-content table {
        border-collapse: collapse;
        width: 100%;
      }
      .readme-content table, .readme-content th, .readme-content td {
        border: 1px solid #f1f1f1;
        padding: 8px;
      }
      .readme-content pre {
        background: #2d2d2d;
        color: #f8f8f2;
        padding: 10px;
        overflow-x: auto;
        border-radius: 5px;
      }
      .readme-content code {
        background: #f4f4f4;
        color: #c7254e;
        padding: 2px 4px;
        border-radius: 4px;
      }
    `;

    // Parse the readme using marked
    const readmeHTML = marked(data.readme || "*No README available*");

    const html = `
      <style>${styles}</style>
      <div class="container">
        <h1>${data.name}</h1>
        <p><strong>Description:</strong> ${data.description || 'No description provided.'}</p>
        <p><strong>Main Language:</strong> ${data.language}</p>
        <p><strong>Stars:</strong> ${data.stars}</p>
        <p><strong>Forks:</strong> ${data.forks}</p>
        <p><strong>Open Issues:</strong> ${data.issues}</p>
        <p><strong>Last Updated:</strong> ${new Date(data.updated_at).toLocaleDateString()}</p>
        <p><strong>Top Contributors:</strong> ${data.contributors.join(", ")}</p>
        <p><strong>Last Commit Message:</strong> ${data.last_commit}</p>

        <div id="readme-container" class="readme-content">
          <h2>README</h2>
          ${readmeHTML}
        </div>
      </div>
    `;

    // Return the HTML string
    return html;
  };

  // You might want to attach the event listener outside the formatMetadata function
  // This way it’s applied once the DOM is fully loaded and the button is available
  document.addEventListener("DOMContentLoaded", function () {
    const downloadButton = document.getElementById("download-repo");
    if (downloadButton) {
      downloadButton.addEventListener("click", function () {
        const data = window.__REPO_DATA__; // Assuming this data is set when formatMetadata is called
        const repoUrl = `https://github.com/${data.owner}/${data.name}/archive/refs/heads/${data.default_branch}.zip`;
        const a = document.createElement("a");
        a.href = repoUrl;
        a.download = `${data.name}.zip`; // Name of the file to be downloaded
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      });
    }
  });
}

