import { openRedirTest, openRedir, openRedirectScanner } from "./open-redirect/open-redirect.mjs";
import { xssParameterInjection, xssScanner, xssTestInjection } from "./xss/xss.mjs";
import { loadFile, processArguments, quit } from "./utils/utils.mjs";
import { extractParametersFromUrl, filterUrls, extractUrlsFromSource, prepareUrlsForInjection, extractUrlsFromTarget } from "./urls/urls.mjs";

export { 

  //open redirect modules
  openRedirTest,
  openRedir,
  openRedirectScanner,

  //xss modules
  xssParameterInjection,
  xssScanner,
  xssTestInjection,

  //utils modules
  loadFile,
  processArguments,
  quit,

  //urls modules
  extractParametersFromUrl,
  filterUrls,
  extractUrlsFromSource,
  prepareUrlsForInjection,
  extractUrlsFromTarget
}
