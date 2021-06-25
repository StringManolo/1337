import fetch from "node-fetch";

/* TODO: Include imports in a single module exporting all the functions */
import extractUrlsFromSource from "./modules/extract-urls-from-source.mjs";
import extractParametersFromUrl from "./modules/extract-parameters-from-url.mjs";
import xssParameterInjection from "./modules/xss-parameter-injection.mjs";
import xssTestInjection from "./modules/xss-test-injection.mjs";
import openRedir from "./modules/open-redir.mjs";
import openRedirTest from "./modules/open-redir-test.mjs";

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

const requestOptions = { headers: {} };
requestOptions.headers["User-Agent"] = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36";
const response = await fetch(cli.target, requestOptions);
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

  const payload = "{{ PAYLOAD }}";
  const injection1 = xssParameterInjection(listOfUrlVectors[i], payload, "\"><img onerror=confirm('web-vulns-scanner') src=>");
  console.log(injection1);

  const injected = await xssTestInjection(injection1, "web-vulns-scanner");
  console.log(injected);

  const openRedirUrl = openRedir(listOfUrlVectors[i], payload, "//example.com");
  console.log(openRedirUrl);
  const redirect = await openRedirTest(openRedirUrl);
  console.log(`Open Redir: ${redirect}`);
}
