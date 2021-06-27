import { xssParameterInjection } from "./xss.mjs";
import { xssTestInjection } from "./xss.mjs";

const xssScanner = async listOfUrlVectors => {
  console.log("Starting XSS scanner...");
  for (let i in listOfUrlVectors) {
    const url = listOfUrlVectors[i];
    console.log("Scanning " + url);
    const pattern = "{{ PAYLOAD }}";
    const injection = xssParameterInjection(url, pattern, "\"><img onerror=confirm('web-vulns-scanner') src=>");
    console.log(`Injection -> ${injection}`);
    const injected = await xssTestInjection(injection, "\\\<img onerror\\\=confirm\\\(\\\'web");
    console.log(`Injection test -> ${injected}`);
    if (injected) {
      console.log(`
XSS Result:
Injected: ${injected}

Injection: ${injection}


`);
    }
  }
}

export default xssScanner;
