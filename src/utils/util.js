
export function isItem(curIdx, thisIdx) {
  if (!curIdx || !thisIdx) return false;
  if (thisIdx.listI === curIdx.listI && thisIdx.itemI === curIdx.itemI) return true;
  return false;
}

export function isList(curIdx, thisIdx) {
  if (!curIdx || !thisIdx) return false;
  if (thisIdx.listI === curIdx.listI) return true;
  return false;
}