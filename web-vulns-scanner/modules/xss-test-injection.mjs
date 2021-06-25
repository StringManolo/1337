import fetch from "node-fetch";

const xssTestInjection = async (url, expected) => {

  const requestOptions = {};
  requestOptions.headers = {};
  requestOptions.headers["User-Agent"] = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36";

  const res = await fetch(url, requestOptions.headers);
  const body = await res.text();
  const lines = body.split("\n");
  
  let ocurrences = [];
  for (let i = 0; i < lines.length; ++i) {
    if (new RegExp(expected, "g").test(lines[i])) {
      ocurrences.push(`${+i + 1} - ${lines[i]}`);
    }
  }

  return ocurrences.length > 0 ? ocurrences : null;
}

export default xssTestInjection;
