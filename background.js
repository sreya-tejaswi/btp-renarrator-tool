chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("[Background] Received message:", message);

  if (message.type === "fetchMetadata") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        const tabId = tabs[0].id;
        console.log("[Background] Sending 'runRenarrator' to tab:", tabId);
        chrome.tabs.sendMessage(tabId, { type: "runRenarrator" });
      } else {
        console.warn("[Background] No active tab found.");
      }
    });
  }
});
