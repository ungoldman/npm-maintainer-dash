#!/usr/bin/env node

const NpmApi = require("npm-api");
const stats = require("download-stats");
const asTable = require("as-table");

const username = process.argv[2];
const limit = parseInt(process.argv[3]) || Infinity;

if (typeof username !== "string") {
  console.log("must provide valid username");
  console.log("usage: node index.js <username> [limit]");
  process.exit(1);
}

const npm = new NpmApi();

function getDownloadsByUser(username) {
  const maintainer = npm.maintainer(username);
  maintainer
    .repos()
    .then(getRepoDownloads)
    .then((results) => {
      const list = results
        // sort in place by download (descending)
        .sort((a, b) => b.downloads - a.downloads)
        .slice(0, limit)
        // filter table content
        .map(({ package, downloads }) => ({ package, downloads }));

      // write list to console
      console.log(asTable(list));
    })
    .catch((err) => {
      console.error(err);
    });
}

async function getRepoDownloads(repos) {
  const results = [];

  // batch requests
  while (repos.length) {
    const batch = repos.splice(0, 16).map((repo) => {
      return new Promise((resolve, reject) => {
        stats.get.lastMonth(repo, function (err, results) {
          if (err) return reject(err);
          resolve(results);
        });
      });
    });
    results.push(await Promise.all(batch));
  }

  return results.flat();
}

getDownloadsByUser(username);
