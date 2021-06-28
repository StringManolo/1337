import {
  extractUrlsFromTarget,
  extractUrlsRecursively,
  prepareUrlsForInjection,
  filterUrls,
  processArguments,
  multidimensionalArrayToUnidimensional,
  removeArrayDuplicates,
  xssScanner,
  openRedirectScanner,
  appendToFile
} from "./modules/modules.mjs";


const userSelected = processArguments();

console.log(userSelected.target);

let urlsExtractedFromTargets = []
for (let i in userSelected.target) {
  const urlsExtractedFromTarget = await extractUrlsFromTarget(userSelected.target[i]);
  urlsExtractedFromTargets.push(urlsExtractedFromTarget);
}

urlsExtractedFromTargets = multidimensionalArrayToUnidimensional(urlsExtractedFromTargets);
urlsExtractedFromTargets = removeArrayDuplicates(urlsExtractedFromTargets);

if (userSelected.recursiveUrlExtraction) {
  urlsExtractedFromTargets = await extractUrlsRecursively(urlsExtractedFromTargets, userSelected.recursiveUrlExtraction);
  console.log("\n\nDEBUG2\n\n");
}

let urlVectors = urlsExtractedFromTargets;
if (userSelected.filter) {
  urlVectors = filterUrls(urlsExtractedFromTargets, userSelected.filter);
}

if (userSelected.saveUrls) {
  appendToFile("./output/urls.txt", urlVectors);
}

urlVectors = prepareUrlsForInjection(urlsExtractedFromTargets);

const xssOptions = {};
const openRedirOptions = {};
if (userSelected.savePreparedUrls) {
  xssOptions.onlyGenerateUrls = true;
  openRedirOptions.onlyGenerateUrls = true;
}

if (userSelected.xss) {
  await xssScanner(urlVectors, xssOptions);
}

if (userSelected.openRedirect) {
  await openRedirectScanner(urlVectors, openRedirOptions);
}
