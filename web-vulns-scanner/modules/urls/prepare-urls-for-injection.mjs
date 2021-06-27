import { extractParametersFromUrl } from "./urls.mjs";

const prepareUrlsForInjection = urls => {
  let listOfUrlVectors = [];
  console.log(`Replacing parameter values to {{ PAYLOAD }} from query strings and returning full urls`);
  urls.forEach(url => {
    if (extractParametersFromUrl(url)) {
      listOfUrlVectors.push(extractParametersFromUrl(url)[2]);
    }
  });
  console.log(`Removing ${urls.length - listOfUrlVectors.length} urls missing parameters in query string`);
  console.log(`${listOfUrlVectors.length} unique urls cointaining parameters extracted from source.
`);
  return listOfUrlVectors;
}

export default prepareUrlsForInjection;
