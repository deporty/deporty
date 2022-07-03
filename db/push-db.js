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

function transform(obj, copy) {
  function isDate(_obj) {
    if (_obj != null && typeof _obj == "object" && !Array.isArray(_obj)) {
      let count = 0;
      const expectedEntries = ["_seconds", "_nanoseconds"];
      const _keys = Object.keys(_obj);
      for (const x of expectedEntries) {
        const inc = _keys.indexOf(x);
        if (inc >= 0) count++;
      }

      return count == _keys.length && count != 0;
    }
    return false;
  }

  function transformToDate(_obj) {
    var newDate = new Date(1970, 0, 1); // Epoch

    newDate.setSeconds(_obj["_seconds"]);
    return newDate;
  }

  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      const item = obj[i];
      const isADate = isDate(item);
      if (isADate) {
        const newDate = transformToDate(value);
        copy[i] = newDate;
      } else {
        transform(obj[i], copy[i]);
      }
    }
  } else if (typeof obj == "object" && obj != null) {
    const keys = Object.keys(obj);

    for (const key of keys) {
      const value = obj[key];

      const isADate = isDate(value);

      if (isADate) {
        const newDate = transformToDate(value);
        copy[key] = newDate;
      } else {
        transform(obj[key], copy[key]);
      }
    }
  }
}

async function uploadData(db, file, collection) {
  const collectionRef = db.collection(collection);
  const registers = JSON.parse(fs.readFileSync(file).toString());

  for (const register of registers) {
    const collectionKeys = extractCollections(register);
    const data = removeCollections(register, collectionKeys);
    const body = data["data"];
    const copyBody = { ...body };
    transform(body, copyBody);

    await collectionRef.doc(register["id"]).set(copyBody);
    for (const key of collectionKeys) {
      const newKey = key.replace("$", "");
      const newItem = { ...register[key]["data"] };
      transform(register[key]["data"], newItem);

      await collectionRef
        .doc(register["id"])
        .collection(newKey)
        .doc(register[key]["id"])
        .set(newItem);
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
