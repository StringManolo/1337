import { xssParameterInjection } from "./xss.mjs";
import { xssTestInjection } from "./xss.mjs";
import { appendToFile } from "../utils/utils.mjs";

const xssScanner = async (listOfUrlVectors, options) => {
  console.log("Starting XSS scanner...");
  let generatedUrls = [];
  for (let i in listOfUrlVectors) {
    const url = listOfUrlVectors[i];
    console.log("Scanning " + url);
    const pattern = "{{ PAYLOAD }}";
    const injection = xssParameterInjection(url, pattern, "\"><img onerror=confirm('web-vulns-scanner') src=>");
    console.log(`Injection -> ${injection}`);
    if (options.onlyGenerateUrls) {
      generatedUrls.push(injection);
      break;
    }
    const injected = await xssTestInjection(injection, "\\\<img onerror\\\=confirm\\\(\\\'web");
    console.log(`Injection test -> ${injected}`);
    if (injected) {
      appendToFile("./output/results/xss-scanner-results.txt", `Injected: ${injected}

${injection}


`);
      console.log(`
XSS Result:
Injected: ${injected}

Injection: ${injection}


`);
    }
  } 
  if (options.onlyGenerateUrls) {
    try {
      generatedUrls = generatedUrls.join("\n");
    } catch(err) {}
    appendToFile("./output/prepared/xss-scanner-urls.txt", generatedUrls);
  }
}

export default xssScanner;
