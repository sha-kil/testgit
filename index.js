const { Octokit, App } = require("octokit");
const express = require('express');
const app = express();
const port = 8000;
const owner = ""; // username or organization name
const pat = ""; // personal access token
const repo = ""; // repository name
const current_branch = ""; // branch from where we are creating new branch
const new_branch = ""; // new branch name

app.get('/', async (req, res) => {
  const octokit = new Octokit({ auth: pat });
  let getUrl = `GET /repos/${owner}/${repo}/git/ref/heads/${current_branch}`
  const data = await octokit.request(getUrl, {
    owner: `${owner}`,
    repo: `${repo}`,
    ref: `refs/heads/${current_branch}`
  });

  let sha = data.data.object.sha;
  console.log("sha: ", sha);

  let postUrl = `POST /repos/${owner}/${repo}/git/refs`
  let response = await octokit.request(postUrl, {
    owner: `${owner}`,
    repo: `${repo}`,
    ref: `refs/heads/${new_branch}`,
    sha: sha
  });
  console.log("response: ", response);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});