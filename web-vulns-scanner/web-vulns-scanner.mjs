import {
  extractUrlsFromTarget,
  prepareUrlsForInjection,
  filterUrls,
  processArguments,
  multidimensionalArrayToUnidimensional,
  removeArrayDuplicates,
  xssScanner,
  openRedirectScanner
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

const urlVectors = prepareUrlsForInjection(urlsExtractedFromTargets);

if (userSelected.xss) {
  await xssScanner(urlVectors);
}

if (userSelected.openRedirect) {
  await openRedirectScanner(urlVectors);
}
