const admin = require("firebase-admin");
const fs = require("fs");
const moment = require("moment");
const PARAMS = process.argv.slice(2);
const DATA_PATH = "./data";
const configuration = require("./configuration.json");

if (
  PARAMS.length == 0 ||
  configuration["environments"].indexOf(PARAMS[0]) == -1
) {
  console.log("The environment is not valid, or it is not present");
  process.exit();
}

const ENV = PARAMS[0];

const serviceAccount = require(`./deporty-${ENV}.json`);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // databaseURL: "https://deporty-app-default-rtdb.firebaseio.com"
});

const today = moment(new Date()).format("YYYY-MM-DD-HH-mm-ss");

async function getAllCollections(db) {
  const snapshot = await db.listCollections();
  const collections = snapshot.map((snaps) => {
    return snaps["_queryOptions"].collectionId;
  });
  return collections;
}

async function getDataByCollection(db, collection) {
  const snapshot = await db.collection(collection).get();
  const registers = [];
  snapshot.forEach((doc) => {
    registers.push({ id: doc.id, data: doc.data() });
  });
  return registers;
}

function saveRegisters(registers, collection, env) {
  const folderName = `${DATA_PATH}/${env}/${today}`;
  const fileName = `${folderName}/${collection}.json`;

  try {
    const devFolderName = `${DATA_PATH}/${env}`;

    if (!fs.existsSync(devFolderName)) {
      fs.mkdirSync(devFolderName);
    }
    const dateFolderName = `${devFolderName}/${today}`;

    if (!fs.existsSync(dateFolderName)) {
      fs.mkdirSync(dateFolderName);
    }
  } catch (err) {
    console.error(err);
  }

  fs.writeFile(fileName, JSON.stringify(registers, null, 2), (err, data) => {});
}
async function main() {
  const db = admin.firestore();

  const collections = await getAllCollections(db);
  collections.forEach(async (collection) => {
    const registers = await getDataByCollection(db, collection);
    saveRegisters(registers, collection, ENV);
  });
}

main();
