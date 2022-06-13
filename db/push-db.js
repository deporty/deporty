const admin = require("firebase-admin");
const fs = require("fs");

const PARAMS = process.argv.slice(2);
const DATA_PATH = "./data";
const configuration = require("./configuration.json");
console.log(PARAMS);
if (
  PARAMS.length < 2 ||
  configuration["environments"].indexOf(PARAMS[0]) == -1
) {
  console.log(
    "You must pass ENV and date to recovery. You cand pass a specific collection to recovery"
  );
  process.exit();
}

const ENV = PARAMS[0];

const serviceAccount = require(`./deporty-${ENV}.json`);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // databaseURL: "https://deporty-app-default-rtdb.firebaseio.com"
});
const FILE = PARAMS[1];
const COLLECTION = PARAMS[2];

const pathFolder = `${DATA_PATH}/${ENV}/${FILE}`;

async function uploadData(db, file, collection) {
  console.log(collection);
  const collectionRef = db.collection(collection);
  const registers = JSON.parse(fs.readFileSync(file).toString());
  for (const register of registers) {
    await collectionRef.doc(register["id"]).set(register["data"]);
  }
}

async function main() {
  const db = admin.firestore();

  if (COLLECTION) {
    const path = `${pathFolder}/${COLLECTION}.json`;
    await uploadData(db, path, COLLECTION);
  } else {
    const files = fs.readdirSync(pathFolder);
    for (const file of files) {
      const name = file.split(".")[0];
      const path = `${pathFolder}/${file}`;
      await uploadData(db, path, name);
    }
  }
}

main();
