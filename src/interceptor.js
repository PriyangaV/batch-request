import httpAdapter from "axios/lib/adapters/http";
import { isEmptyValue } from "./helper";

// Batch Interval
const BATCH_INTERVAL = 500;

let batchedRequests = [];
let batchedRequestPromise;

/**
 * Avoiding Duplicates
 */
const getBatchRequestsParams = () => {
  return batchedRequests.reduce((acc, current) => {
    // const ids = current?.params?.ids?.map?.((ids) => ids.id);
    const ids = current?.params?.ids;

    return [...new Set([...acc, ...ids])];
  }, []);
};

/**
 * A config object, with all needed params
 */
const configAdater = (config) => {
  const batchedIds = getBatchRequestsParams();
  if (isEmptyValue(batchedIds)) {
    return config;
  }

  return { ...config, params: { ...config.params, ids: batchedIds } };
};

/**
 * Initial Resolver
 */
const getRequestResolver = (config) => {
  return (res) => {
    // const ids = config?.params?.ids?.map?.((ids) => ids.id);
    const ids = config?.params?.ids;
    const data = JSON.parse(res.data);
    const items = data?.items.filter(({ id }) => ids.includes(id));
    const rejectedItem = ids.filter((id) => id !== items);
    if (isEmptyValue(items))
      // Promise.reject("404: Not found!");
      // Promise.reject(config);
      Promise.reject(`${rejectedItem} is missing from the response`);

    return Promise.resolve({ ...res, data: { items } });
  };
};

/**
 * Axios custom adapter
 */
const customBatchAdapter = (config) => {
  if (!isEmptyValue(batchedRequests)) {
    batchedRequests.push(config);
    return batchedRequestPromise;
  } else {
    batchedRequests.push(config);
    batchedRequestPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        httpAdapter(configAdater(config))
          .then(resolve)
          .catch(reject)
          .finally(() => (batchedRequests = []));
      }, BATCH_INTERVAL);
    });

    return batchedRequestPromise;
  }
};
/**
 * Add Interceptor
 */
export const batchInterceptor = (instance) => {
  instance.interceptors.request.use(
    (request) => {
      request.adapter = (config) =>
        customBatchAdapter(config).then(getRequestResolver(config));
      return request;
    },
    (error) => Promise.reject(error)
  );
};
