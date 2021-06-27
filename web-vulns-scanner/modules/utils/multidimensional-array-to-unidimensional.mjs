const multidimensionalArrayToUnidimensional = multiArr => {
  console.log(`Making unidemensional array FROM: ${JSON.stringify(multiArr)}`);
  const containsArray = arr => {
    for (let i in arr) {
      if (Array.isArray(arr[i])) {
        return true;
      }
    }
    return false;
  }

  while ( containsArray(multiArr) ) {
    multiArr = [].concat(...multiArr);
  }

  console.log(`New Unidimensional Array is ${multiArr}`);
  return multiArr;
}

export default multidimensionalArrayToUnidimensional;
