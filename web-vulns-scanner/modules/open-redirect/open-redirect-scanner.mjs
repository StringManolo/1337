import { openRedir } from "./open-redirect.mjs";
import { openRedirTest } from "./open-redirect.mjs";
import { appendToFile } from "../utils/utils.mjs";

const openRedirectScanner = async (listOfUrlVectors, options) => {
  console.log("Starting Open Rediect scanner...");
  let generatedUrls = []; 
  for (let i in listOfUrlVectors) {
    const url = listOfUrlVectors[i];
    console.log("Scanning " + url);
    const pattern = "{{ PAYLOAD }}";
    const openRedirUrl = openRedir(url, pattern, "//example.com");
    console.log(`Injection -> ${openRedirUrl}`);
    if (options.onlyGenerateUrls) {
      generatedUrls.push(openRedirUrl);
      break;
    }
    const redirect = await openRedirTest(openRedirUrl);
    console.log(`Injection test -> ${redirect}`);
    if (redirect) {
      appendToFile("output/results/open-redirect-scanner-results.txt", `${openRedirUrl}


`);
      console.log(`
Open Redirect Result:
FOUND -> ${openRedirUrl}


`);
    }
  }
  if (options.onlyGenerateUrls) {
    if (generatedUrls) {
      try {
        generatedUrls = generatedUrls.join("\n");
      } catch(err) {}
    }
    appendToFile("./output/prepared/open-redirect-scanner-urls.txt", generatedUrls);
  }
}

export default openRedirectScanner;
