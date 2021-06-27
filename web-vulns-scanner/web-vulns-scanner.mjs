import {
  extractUrlsFromTarget,
  prepareUrlsForInjection,
  filterUrls,
  processArguments,
  xssScanner,
  openRedirectScanner
} from "./modules/modules.mjs";


const userSelected = processArguments();

const urlsFoundInTargetSource = await extractUrlsFromTarget(userSelected.target);
const urlVectors = prepareUrlsForInjection(urlsFoundInTargetSource);

if (userSelected.xss) {
  await xssScanner(urlVectors);
}

if (userSelected.openRedirect) {
  await openRedirectScanner(urlVectors);
}
