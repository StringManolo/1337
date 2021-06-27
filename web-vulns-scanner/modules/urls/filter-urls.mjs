const filterUrls = (urls, pattern) => {
  console.log(`Filtering urls that are not including "${pattern}"...`);
  console.log(`Total urls (${urls.length})`);
  let aux = [];
  const regularExpr = new RegExp(pattern, "g");
  for (let i in urls) {
    if (regularExpr.test(urls[i])) {
console.log(`${urls[i]} passed the test ${regularExpr}`);
      aux.push(urls[i]);
    }
  }
  console.log(`${aux.length} urls matching the pattern`);
  return aux;
}

export default filterUrls;
