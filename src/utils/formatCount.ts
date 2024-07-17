export const formatCount = (viewCount: string) => {
  const countNumber = Number(viewCount);
  if (countNumber >= 100000000) {
    return (countNumber / 100000000).toFixed(1).replace(/\.0$/, "") + "억";
  } else if (countNumber >= 10000) {
    return (countNumber / 10000).toFixed(1).replace(/\.0$/, "") + "만";
  } else if (countNumber >= 1000) {
    return (countNumber / 1000).toFixed(1).replace(/\.0$/, "") + "천";
  } else {
    return countNumber.toString();
  }
};
