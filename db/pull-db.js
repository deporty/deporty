const admin = require("firebase-admin");
const fs = require("fs");
const moment = require("moment");
const PARAMS = process.argv.slice(2);
const DATA_PATH = "./data";
const CONFIGURATION = require("./configuration.json");

if (
  PARAMS.length == 0 ||
  CONFIGURATION["environments-list"].indexOf(PARAMS[0]) == -1
) {
  console.log("The environment is not valid, or it is not present");
  process.exit();
}

const ENV = PARAMS[0];

const serviceAccount = require(`./deporty-${ENV}.json`);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
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
  let collectionConfig = null;
  if (CONFIGURATION["reference-collections"]) {
    collectionConfig = CONFIGURATION["reference-collections"][collection];
  }
  if (collectionConfig) {
    for (const doc of snapshot.docs) {
      const item = { id: doc.id, data: doc.data() };

      const keys = Object.keys(collectionConfig);
      console.log("Las keys ", keys);
      for (const key of keys) {
        const element = await doc.ref.collection(key).get();
        const elementDoc = element.docs;
        console.log("Los documentos, ", elementDoc);
        for (const d of elementDoc) {
          item['$'+key] = { id: d.id, data: d.data() };
        }
      }
      registers.push(item);
    }
  } else {
    snapshot.forEach((doc) => {
      const item = { id: doc.id, data: doc.data() };
      registers.push(item);
    });
  }

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
