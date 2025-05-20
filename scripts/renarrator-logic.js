function safelyRunWhenReady(callback) {
  const observer = new MutationObserver(() => {
    const data = window.__REPO_DATA__;
    const downloadBtn = document.getElementById("download-repo");

    if (data && downloadBtn ) {
      observer.disconnect();
      callback(data, downloadBtn);
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

setTimeout(() => {
  console.log("[Injected Script] Waiting for DOM injection...");
  safelyRunWhenReady((data,  downloadBtn) => {

    downloadBtn.addEventListener("click", () => {
      const zipUrl = `https://github.com/${data.owner}/${data.name}/archive/refs/heads/${data.default_branch}.zip`;
      window.open(zipUrl, "_blank");
    });
  });
}, 500);