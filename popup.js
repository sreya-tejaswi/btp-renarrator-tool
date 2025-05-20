document.getElementById("run").addEventListener("click", () => {
  console.log("[Popup] Button clicked. Sending message to background...");
  chrome.runtime.sendMessage({ type: "fetchMetadata" });
});
