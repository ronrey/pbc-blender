export const pause = (pause: number) => {
  const start = performance.now();
  let now = null;
  do {
    now = performance.now();
  } while (now - start < pause);
};

export const sleep = async (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};
