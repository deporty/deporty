const admin = require("firebase-admin");
const { getStorage } = require("firebase-admin/storage");

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

const mappers = {
  dev: "dev",
  pdn: "app",
};
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // databaseURL: "https://deporty-app-default-rtdb.firebaseio.com",
  // storageBucket: 'deporty-dev.appspot.com'
});

const today = moment(new Date()).format("YYYY-MM-DD-HH-mm-ss");

async function getAllFolders(storage) {
  db.listCollections()
    .then((snapshot) => {
      snapshot.forEach((snaps) => {
        console.log(snaps["_queryOptions"].collectionId); // LIST OF ALL COLLECTIONS
      });
    })
    .catch((error) => console.error(error));

  const snapshot = await storage.listCollections();
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

  const bucket = getStorage().bucket(`deporty-${mappers[ENV]}.appspot.com`);
  const filesPromise = bucket.getFiles();
  const root = `storage`;
  const rootEnv = `${root}/${ENV}/`;
  const rootDate = `${root}/${ENV}/${today}`;

  if (!fs.existsSync(root)) {
    fs.mkdirSync(root);
  }

  if (!fs.existsSync(rootEnv)) {
    fs.mkdirSync(rootEnv);
  }

  if (!fs.existsSync(rootDate)) {
    fs.mkdirSync(rootDate);
  }

  filesPromise.then((files) => {
    for (const file of files[0]) {
      const name = file.name;
      const fragments = name.split(".");
      if (fragments.length == 2) {
        console.log(name);
        // fs.writeFileSync(`${root}/${name}`, file.);

        const remoteFile = bucket.file(name);
        const localFilename = `${rootDate}/${name}`;

        remoteFile
          .createReadStream()
          .on("error", function (err) {})
          .on("response", function (response) {
            // Server connected and responded with the specified status and headers.
          })
          .on("end", function () {
            // The file is fully downloaded.
          })
          .pipe(fs.createWriteStream(localFilename));
      } else {
        fs.mkdirSync(`${rootDate}/${name}`);
      }
    }
    // fs.writeFileSync(x)
  });

  // const folders = await getAllFolders(storage);
  // folders.forEach(async (collection) => {
  //   const registers = await getDataByCollection(db, collection);
  //   saveRegisters(registers, collection, ENV);
  // });
}

main();
