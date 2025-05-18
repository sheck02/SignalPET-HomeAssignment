const cache = {};
let requestCount = 0;
const costPerRequest = 0.05;

export function getCache(text, lang) {
  return cache[`${lang}:${text}`];
}

export function saveCache(text, lang, result) {
  cache[`${lang}:${text}`] = result;
}

export function trackCost() {
  requestCount++;
}

export function getCost() {
  return {
    totalRequests: requestCount,
    totalCost: +(requestCount * costPerRequest).toFixed(2)
  };
}

