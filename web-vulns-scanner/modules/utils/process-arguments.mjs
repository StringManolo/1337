import { loadFile } from "./utils.mjs";
import { quit } from "./utils.mjs";
import { extractUrlsFromFile } from "../urls/urls.mjs";

const processArguments = () => {
  const cli = {};
  const scriptArgs = process.argv;
  for(let i in scriptArgs) {
    const next = scriptArgs[+i + 1];
    switch(scriptArgs[i]) {
      case "-t":
      case "--target":
        cli.target = extractUrlsFromFile(next);
        cli.targetIsFile = true;
        if (!cli.target) {
          cli.target = [];
	  cli.target.push(next);
          cli.targetIsFile = false;
        }

	if (!next) {
          quit(`Error: You forgot to provide a target after the --target/-t argument.

Examples of usage: --target https://example.com
--target './listOfDomains/google.txt'

Full example: node web-vulns-scanner.mjs -t https://google.com --xss --open-redirect
`);
        }
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

      case "--recursive-url-extraction":
        cli.recursiveUrlExtraction = next;
      break;

      case "--show-extracted-urls":
        cli.showExtractedUrls = true;
      break;

      case "--filter-urls":
        cli.filter = next;
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
-t,--target                       Full url of target
-x,--xss                          Scan XSS
-r,--open-redir                   Scan Open Redirect
-v,--verbose                      Print information about the scanner
  ,--version                      Print current version

  ,--recursive-url-extraction     Deep level
  ,--show-extracted-urls          Show all urls found
  ,--filter-urls                  Only use urls that match a pattern

example:
node web-vulns-scanner.mjs --show-extracted-urls -t https://google.es --recursive-url-extraction 1 --filter-urls google --xss --open-redirect
`);

    }
  }

  if (!cli.target) {
    quit(`Error: You forgot to provide a target.

Examples of usage: --target https://example.com
--target './listOfDomains/google.txt'

Full example: node web-vulns-scanner.mjs -t https://google.com --xss --open-redirect
`);
  }

  return cli;
}

export default processArguments;
