const githubOptions = {
  url: (username, githubClientId, githubSecret) =>
    `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${githubClientId}&client_secret=${githubSecret}`,
  method: type => type,
  headers: () => ({ "user-agent": "node.js" })
};

module.exports = githubOptions;