const removeArrayDuplicates = arr => {
  const len = arr.length;
  arr = [...new Set(arr)];
  console.log(`Removed ${len - arr.length} duplicated entries from the array`);
  return arr;
}

export default removeArrayDuplicates;
