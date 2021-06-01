
export function isItem(curIdx, thisIdx) {
  if (thisIdx.listI === curIdx.listI && thisIdx.itemI === curIdx.itemI) return true;
  return false;
}

export function isList(curIdx, thisIdx) {
  if (thisIdx.listI === curIdx.listI) return true;
  return false;
}