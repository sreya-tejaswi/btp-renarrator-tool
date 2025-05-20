window.fetchRepoData = async function(user, repo) {
  const base = `https://api.github.com/repos/${user}/${repo}`;
  console.log(`[API] Fetching data from ${base}`);
  
  try {
    // Fetch the main repo data
    const repoRes = await fetch(base);
    if (!repoRes.ok) {
      console.error(`[API] Failed to fetch repo data: ${repoRes.status}`);
      return null;
    }
    const repoData = await repoRes.json();
    console.log("[API] Repo details fetched");

    // Fetch the contributors
    const contributorsRes = await fetch(`${base}/contributors`);
    if (!contributorsRes.ok) {
      console.error(`[API] Failed to fetch contributors data: ${contributorsRes.status}`);
      return null;
    }
    const contributors = await contributorsRes.json();
    console.log("[API] Contributors fetched");

    // Fetch the commits
    const commitsRes = await fetch(`${base}/commits`);
    if (!commitsRes.ok) {
      console.error(`[API] Failed to fetch commits data: ${commitsRes.status}`);
      return null;
    }
    const commits = await commitsRes.json();
    console.log("[API] Commits fetched");

    // Fetch the README
    const readmeRes = await fetch(`${base}/readme`);
    let readme = null;
    if (readmeRes.ok) {
      const readmeJson = await readmeRes.json();
      readme = atob(readmeJson.content);
      console.log("[API] README fetched");
      console.log("[API] README content:", readme);
    } else {
      console.warn("[API] README not found");
    }


    return {
      name: repoData.name,
      description: repoData.description,
      stars: repoData.stargazers_count,
      forks: repoData.forks_count,
      issues: repoData.open_issues_count,
      language: repoData.language,
      updated_at: repoData.updated_at,
      contributors: contributors.slice(0, 5).map(c => c.login),
      last_commit: commits[0]?.commit?.message,
      owner: user,
      default_branch: repoData.default_branch,  // Default branch for README
      readme: readme,  // Include README content here
    };
  } catch (error) {
    console.error("[API] Error fetching repo data:", error);
    return null;
  }
};
