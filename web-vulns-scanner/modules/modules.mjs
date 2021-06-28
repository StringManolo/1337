import { openRedirTest, openRedir, openRedirectScanner } from "./open-redirect/open-redirect.mjs";
import { xssParameterInjection, xssScanner, xssTestInjection } from "./xss/xss.mjs";
import { loadFile, processArguments, quit, multidimensionalArrayToUnidimensional, removeArrayDuplicates, writeToFile, appendToFile } from "./utils/utils.mjs";
import { extractParametersFromUrl, filterUrls, extractUrlsFromSource, prepareUrlsForInjection, extractUrlsFromTarget, extractUrlsFromFile, extractUrlsRecursively } from "./urls/urls.mjs";

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
  multidimensionalArrayToUnidimensional,
  removeArrayDuplicates,
  writeToFile,
  appendToFile,

  //urls modules
  extractParametersFromUrl,
  filterUrls,
  extractUrlsFromSource,
  prepareUrlsForInjection,
  extractUrlsFromTarget,
  extractUrlsFromFile,
  extractUrlsRecursively
}
