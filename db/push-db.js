const admin = require("firebase-admin");
const fs = require("fs");

const PARAMS = process.argv.slice(2);
const DATA_PATH = "./data";
const CONFIGURATION = require("./configuration.json");
if (
  PARAMS.length < 2 ||
  CONFIGURATION["environments-list"].indexOf(PARAMS[0]) == -1
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
});
const FILE = PARAMS[1];
const COLLECTION = PARAMS[2];

const pathFolder = `${DATA_PATH}/${ENV}/${FILE}`;

function extractCollections(data) {
  const keys = Object.keys(data);
  let collectionKeys = keys.filter((x) => {
    return x.startsWith("$");
  });
  return collectionKeys;
}

function removeCollections(data, collectionKeys) {
  const temp = { ...data };
  for (const key of collectionKeys) {
    delete temp[key];
  }
  return temp;
}

async function uploadData(db, file, collection) {
  const collectionRef = db.collection(collection);
  console.log(collection);
  const registers = JSON.parse(fs.readFileSync(file).toString());

  for (const register of registers) {
    const collectionKeys = extractCollections(register);
    const data = removeCollections(register, collectionKeys);
    await collectionRef.doc(register["id"]).set(data['data']);
    for (const key of collectionKeys) {
      const newKey = key.replace("$", "");
      console.log(newKey, "NUEVA");
      await collectionRef
        .doc(register["id"])
        .collection(newKey)
        .doc(register[key]["id"])
        .set(register[key]["data"]);
    }
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
