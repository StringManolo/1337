import fetch from "node-fetch";
import extractUrlsFromSource from "./modules/extract-urls-from-source.mjs";
import extractParametersFromUrl from "./modules/extract-parameters-from-url.mjs";
import xssParameterInjection from "./modules/xss-parameter-injection.mjs";

const quit = (msg, errorCode=0) => {
  console.log(msg);
  process.exit(errorCode);
}

const cli = {};
const scriptArgs = process.argv;
for(let i in scriptArgs) {
  const next = scriptArgs[+i + 1];
  switch(scriptArgs[i]) {
    case "-t":
    case "--target":
      cli.target = next;
    break;

    case "-h":
    case "--help":
      quit(`usage node web-vulns-scanner.mjs`);

  }
}

const response = await fetch(cli.target);
const body = await response.text();

const urls = extractUrlsFromSource(body);

let params = [];
let listOfUrlVectors = [];
for (let i in urls) {
  if (extractParametersFromUrl(urls[i])) {
    params.push(extractParametersFromUrl(urls[i]));
    listOfUrlVectors.push(extractParametersFromUrl(urls[i])[2]);
  }
}

//console.log(params);
for (let i in listOfUrlVectors) {
  console.log("\n\n" + listOfUrlVectors[i]);
  const injection = xssParameterInjection(listOfUrlVectors[i], "{{ PAYLOAD }}", "<svg/onload=alert()>");
  console.log(injection);
}
