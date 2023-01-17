function isJson(value) {
  try {
    JSON.parse(value);
  } catch (ex) {
    return false;
  }
  return true;
}

module.exports = {
  isJson,
};
