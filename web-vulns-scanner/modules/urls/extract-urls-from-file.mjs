import { loadFile } from "../utils/utils.mjs";

const extractUrlsFromFile = filename => {
console.log(`FILENAME: ${filename}`);
  const contents = loadFile(filename);
  if (contents) {
    let lines = contents.split("\n");
    lines.pop();
    return lines;
  } else {
    return contents;
  }
}

export default extractUrlsFromFile;
