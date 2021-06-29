import url from "url";
import { openRedir, openRedirTest } from "./open-redirect.mjs";
import { appendToFile, echo } from "../utils/utils.mjs";

const openRedirectScanner = async (listOfUrlVectors, options) => {
  echo("Starting Open Rediect scanner...");
  let generatedUrls = []; 
  for (let i in listOfUrlVectors) {
    const url = listOfUrlVectors[i];
    echo("Scanning " + url);
    const pattern = "{{ PAYLOAD }}";
    const openRedirUrl = openRedir(url, pattern, "//example.com");
    echo(`Injection -> ${openRedirUrl}`, "debug");
    if (options.onlyGenerateUrls) {
      generatedUrls.push(openRedirUrl);
      break;
    }

    /* Try special arguments */
    const sinks = [
      "?page",
      "?url",
      "?ret",
      "?r2",
      "?img",
      "?u",
      "?return",
      "?r",
      "?URL",
      "?next",
      "?redirect",
      "?redirectBack",
      "?AuthState",
      "?referer",
      "?referrer",
      "?redir",
      "?l",
      "?aspxerrorpath",
      "?image_path",
      "?ActionCodeURL",
      "?return_url",
      "?link",
      "?q",
      "?location",
      "?ReturnUrl",
      "?uri",
      "?referrer",
      "?returnURL",
      "?forward",
      "?file",
      "?rb",
      "?end_display",
      "?urlact",
      "?from",
      "?goto",
      "?path",
      "?redirect_url",
      "?old",
      "?pathlocation",
      "?successTarget",
      "?returnURL",
      "?urlsito",
      "?newurl",
      "?Url",
      "?back",
      "?ref",
      "?topic",
      "?resource",
      "?href",
      "?returnto",
      "?continue",
      "/?page",
      "/?url",
      "/?ret",
      "/?r2",
      "/?img",
      "/?u",
      "/?return",
      "/?r",
      "/?URL",
      "/?next",
      "/?redirect",
      "/?redirectBack",
      "/?AuthState",
      "/?referer",
      "/?referrer",
      "/?redir",
      "/?l",
      "/?aspxerrorpath",
      "/?image_path",
      "/?ActionCodeURL",
      "/?return_url",
      "/?link",
      "/?q",
      "/?location",
      "/?ReturnUrl",
      "/?uri",
      "/?referrer",
      "/?returnURL",
      "/?forward",
      "/?file",
      "/?rb",
      "/?end_display",
      "/?urlact",
      "/?from",
      "/?goto",
      "/?path",
      "/?redirect_url",
      "/?old",
      "/?pathlocation",
      "/?successTarget",
      "/?returnURL",
      "/?urlsito",
      "/?newurl",
      "/?Url",
      "/?back",
      "/?ref",
      "/?topic",
      "/?resource",
      "/?href",
      "/?returnto",
      "/?continue"
    ];

    if (url.indexOf("?")>-1) {
      for(let j in sinks) {
        let preparedUrl = url.substr(0,url.indexOf("?")) + sinks[j] + "=//example.com";
        let aux;
        try {
	  echo(`Injection -> ${preparedUrl}`, "debug");
          aux = await openRedirTest(preparedUrl);
        } catch(err) {
          echo(`${err.message} fetching ${preparedUrl}`, "warning");
        }
	
	if (aux) {
          appendToFile("output/results/open-redirect-scanner-results.txt", `${openRedirUrl}


`);
	  echo(`
Open Redirect Result:
FOUND -> ${openRedirUrl}


`, "critical");
        }
      }
    }



    let redirect = {};
    try {
      redirect = await openRedirTest(openRedirUrl);
    } catch(err) {
      echo(`${err.message} fetching ${url}`, "warning");
      return null;
    }
    echo(`Injection test -> ${redirect}`, "debug");
    if (redirect) {
      appendToFile("output/results/open-redirect-scanner-results.txt", `${openRedirUrl}


`);
      echo(`
Open Redirect Result:
FOUND -> ${openRedirUrl}


`, "critical");
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
