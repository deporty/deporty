const xlsx = require("node-xlsx");
const fs = require("fs");
const moment = require("moment");

const BOOK = xlsx.parse(__dirname + "/data.xlsm");

const PLAYERS = [];
const TEAMS = {};
const getSheet = (book, sheetName) => {
  return book
    .filter((sheet) => {
      return sheet["name"] === sheetName;
    })
    .map((sheet) => {
      return sheet["data"];
    })
    .pop();
};

const extractId = (player) => {
  const id = player[0];
  return id.toString();
};

const extractName = (player) => {
  const name = player[1];
  const fragments = name.split(" ").map((f) => {
    let temp = f.toLowerCase();
    const first = temp.charAt(0);
    temp = temp.replace(first, first.toUpperCase());
    return temp;
  });
  if (fragments.length == 4) {
    return {
      name: fragments.slice(0, 2).join(" "),
      "last-name": fragments.slice(2, 4).join(" "),
    };
  } else {
    return {
      name: fragments.slice(0, 1).join(" "),
      "last-name": fragments.slice(1, 3).join(" "),
    };
  }
};

const extractTeam = (player) => {
  const team = player[2];
  return team;
};

const extractDateOdBirth = (player) => {
  const date = player[4];
  if (date) {
    const today = moment("01-01-1900", "DD-MM-YYYY");
    const bornDate = today.add(date - 2, "days");
    return bornDate;
  }
  return "";
};

const extractInitDate = (player) => {
  const date = player[3];
  if (date) {
    const today = moment("01-01-1900", "DD-MM-YYYY");
    const bornDate = today.add(date - 2, "days");
    return bornDate.valueOf() / 1000;
  }
  return "";
};

const PLAYERS_SHEET = getSheet(BOOK, "JUGADORES");
for (let row = 1; row < PLAYERS_SHEET.length; row++) {
  const player = PLAYERS_SHEET[row];
  const id = extractId(player);
  const name = extractName(player);
  const team = extractTeam(player);
  const dateOfBirth = extractDateOdBirth(player);
  const initDate = extractInitDate(player);

  let formattedPlayer = {
    ...name,
    document: id,
    alias: "",
    number: "",
    image: "",
    email: "",
    phone: "",
    "date-of-birth": dateOfBirth,
  };
  formattedPlayer = { player: formattedPlayer, initDate: initDate, role: "" };

  PLAYERS.push(formattedPlayer);
  if (team) {
    const index = Object.keys(TEAMS).indexOf(team);
    if (index == -1) {
      TEAMS[team] = [];
    }
    TEAMS[team].push(formattedPlayer);
  }
}

fs.writeFileSync("players.json", JSON.stringify(PLAYERS, null, 2));
fs.writeFileSync("teams.json", JSON.stringify(TEAMS, null, 2));
