import fetch from "node-fetch";
import { extractUrlsFromSource } from "./urls.mjs";

const extractUrlsFromTarget = async target => {
  console.log(`Extracting urls from ${target}...`);
  const requestOptions = { headers: {} };
  requestOptions.headers["User-Agent"] = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36";
  console.log(`Setting user agent (${requestOptions.headers["User-Agent"]}) to use in subsequent node-fetch requests`);
  console.log(`Sending request...`);
  let response = await fetch(target, requestOptions);
  console.log(`Response recived, parsing response from server...`);
  const body = await response.text();
  console.log(`Request body extracted as ${body.substr(0,20)}...`);

  console.log(`Extracting urls from source...`);
  let urls = extractUrlsFromSource(body);

  const numberOfUrls = urls.length;
  console.log(`${numberOfUrls} extracted from ${target} source, removing duplicates`);
  urls = [...new Set(urls)];
  console.log(`${numberOfUrls - urls.length} duplicates removed`);
  return urls;
}

export default extractUrlsFromTarget;
