chrome.runtime.onMessage.addListener(async (message) => {
  if (message.type === "runRenarrator") {
    const url = window.location.href;
    const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
    if (!match) return;

    const [_, user, repo] = match;
    const data = await fetchRepoData(user, repo);
    if (!data) return;

    window.__REPO_DATA__ = data;

    const html = formatMetadata(data);

    // Replace just the body with safe content
    const parser = new DOMParser();
    const newDoc = parser.parseFromString(html, "text/html");
    document.body.innerHTML = newDoc.body.innerHTML;

    // Append theme and logic script after DOM update
    const markedScript = document.createElement("script");
    markedScript.src = chrome.runtime.getURL("scripts/marked.min.js");
    
    document.body.appendChild(markedScript);
  }
});