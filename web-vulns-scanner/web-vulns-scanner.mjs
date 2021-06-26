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

const verbose = msg => {
  if (cli.verbose) {
    console.log(`+ ${msg}`);
  }
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

    case "-x":
    case "-xss":
    case "--xss":
      cli.xss = true;
    break;

    case "--xss-payload":
      cli.xssPayload = next;
    break;

    case "-r":
    case "--redir":
    case "--redirect":
    case "--open":
    case "--open-redir":
    case "--open-redirect":
      cli.openRedirect = true;
    break;

    case "-v":
    case "--verbose":
      cli.verbose = true;
    break;

    case "--version":
      quit("web-vulns-scanner 1.0.0");
		  
    case "-h":
    case "--help":
      quit(`usage: node web-vulns-scanner.mjs [OPTIONS]
-t,--target         Full url of target
-x,--xss            Scan XSS
-r,--open-redir     Scan Open Redirect
-v,--verbose        Print information about the scanner
  ,--version        Print current version
`);

  }
}

const extractUrls = async () => {
  verbose(`Extracting urls from ${cli.target}...`);
  const requestOptions = { headers: {} };
  requestOptions.headers["User-Agent"] = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36";
  verbose(`Setting user agent (${requestOptions.headers["User-Agent"]}) to use in subsequent node-fetch requests`);
  verbose(`Sending request...`);
  const response = await fetch(cli.target, requestOptions);
  verbose(`Response recived, parsing response from server...`);
  const body = await response.text();
  verbose(`Request body extracted as ${body.substr(0,20)}...`);

  verbose(`Extracting urls from source...`);
  let urls = extractUrlsFromSource(body);
  const numberOfUrls = urls.length;
  verbose(`${numberOfUrls} extracted from source, removing duplicates`);
  urls = [...new Set(urls)];
  verbose(`${numberOfUrls - urls.length} duplicates removed`);
  //let params = [];
  let listOfUrlVectors = [];

  verbose(`Replacing parameter values to {{ PAYLOAD }} from query strings and returning full urls`);
  urls.forEach(url => {
    if (extractParametersFromUrl(url)) {
      //params.push(extractParametersFromUrl(url));
      listOfUrlVectors.push(extractParametersFromUrl(url)[2]);
    }
  });
  verbose(`Removing ${numberOfUrls - listOfUrlVectors.length} urls missing parameters in query string`);
  verbose(`${listOfUrlVectors.length} unique urls cointaining parameters extracted from source.`);
  return listOfUrlVectors;
}

const XSS = async listOfUrlVectors => {
  verbose("Starting XSS scanner...");
  for (let i in listOfUrlVectors) {
    const url = listOfUrlVectors[i];
    verbose("Scanning " + url);
    const pattern = "{{ PAYLOAD }}";
    const injection = xssParameterInjection(url, pattern, "\"><img onerror=confirm('web-vulns-scanner') src=>");
    verbose(`Injection -> ${injection}`);
    const injected = await xssTestInjection(injection, "web-vulns-scanner");
    verbose(`Injection test -> ${injected}`);
    if (injected) {
      console.log(`
XSS Result:
Injected: ${injected}

Injection: ${injection}


`);
    }
  }
}

const OPENREDIR = async listOfUrlVectors => {
  verbose("Starting Open Rediect scanner...");
  for (let i in listOfUrlVectors) {
    const url = listOfUrlVectors[i];
    verbose("Scanning " + url);
    const pattern = "{{ PAYLOAD }}";
    const openRedirUrl = openRedir(url, pattern, "//example.com");
    verbose(`Injection -> ${openRedirUrl}`);
    const redirect = await openRedirTest(openRedirUrl);
    verbose(`Injection test -> ${redirect}`);
    if (redirect) {
      console.log(`
Open Redirect Result:
FOUND -> ${openRedirUrl}


`);
    }
  }
}

const urls = await extractUrls();

if (cli.xss) {
  await XSS(urls);
}

if (cli.openRedirect) {
  await OPENREDIR(urls);
}
