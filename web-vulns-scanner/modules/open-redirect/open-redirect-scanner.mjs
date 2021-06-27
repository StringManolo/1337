import { openRedir } from "./open-redirect.mjs";
import { openRedirTest } from "./open-redirect.mjs";
import { appendToFile } from "../utils/utils.mjs";

const openRedirectScanner = async listOfUrlVectors => {
  console.log("Starting Open Rediect scanner...");
  for (let i in listOfUrlVectors) {
    const url = listOfUrlVectors[i];
    console.log("Scanning " + url);
    const pattern = "{{ PAYLOAD }}";
    const openRedirUrl = openRedir(url, pattern, "//example.com");
    console.log(`Injection -> ${openRedirUrl}`);
    const redirect = await openRedirTest(openRedirUrl);
    console.log(`Injection test -> ${redirect}`);
    if (redirect) {
      appendToFile("open-redirect-scanner-results.txt", `${openRedirUrl}


`);
      console.log(`
Open Redirect Result:
FOUND -> ${openRedirUrl}


`);
    }
  }
}

export default openRedirectScanner;
