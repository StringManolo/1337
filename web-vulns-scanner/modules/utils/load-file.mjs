import fs from "fs";

const loadFile = filename => {
  try {
    filename = fs.readFileSync(filename, { encoding: "utf-8" })
  } catch(e) {
    filename = null;
  }
  return filename;
};

export default loadFile;
