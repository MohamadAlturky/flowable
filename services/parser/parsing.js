export function extractInputs(str) {
    const regex = /\{([^{}]*)\}/g;
  
    let match;
    const names = [];
  
    while ((match = regex.exec(str)) !== null) {
      names.push(match[1]);
    }
  
    return names;
}

export function hasSpace(strs) {
  return strs.some(str => str.includes(" "));
}

export function oneHasSpace(strs) {
  for (const str of strs) {
    if (str.includes(" ")) {
      return str;
    }
  }
  return "";
}