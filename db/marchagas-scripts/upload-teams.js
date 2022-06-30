const fs = require("fs");
const http = require("https");
const querystring = require("querystring");

const teamsData = "teams.json";
const apiUrl = "us-central1-deporty-dev.cloudfunctions.net";

const teams = JSON.parse(fs.readFileSync(teamsData));

const results = [];
const promises = [];

const options = {
  hostname: apiUrl,
  path: "/teams",
  method: "POST",
  timeout: 50000,
  headers: {
    "Content-Type": "application/json",
  },
};

for (const key in teams) {
  const team = {
    name: key,
  };

  upload(team);
}

Promise.all(promises).then(() => {
  fs.writeFileSync("teams-status.json", JSON.stringify(results, null, 2));
});

function upload(team) {
  promises.push(
    new Promise((resolve, reject) => {
      const req = http.request(options, (res) => {
        let chunks_of_data = [];

        res.on("data", (fragments) => {
          chunks_of_data.push(fragments);
        });

        res.on("error", (chunk) => {
          console.log(`Error: ${chunk}`);
          reject();
        });
        res.on("end", () => {
          let response_body = JSON.parse(
            Buffer.concat(chunks_of_data).toString()
          );
          results.push({
            team: team,
            res: response_body,
          });
          resolve();
        });
      });

      req.write(JSON.stringify(team));
      req.end();
    })
  );
}
