const appendToFile = (filename, content) => {
  const open = (filename, mode) => {
    const fd = {};
    fd.internalFd = fs.openSync(filename, mode);
    fd.read = (buffer, position, len) => fs.readSync(fd.internalFd, buffer, position, len);
    fd.puts = (str) => fs.writeSync(fd.internalFd, str);
    fd.close = () => fs.closeSync(fd.internalFd);
    return fd;
  }

  const fd = open(filename, "a");
  fd.puts(content);
  fd.close();
}

export default appendToFile;
