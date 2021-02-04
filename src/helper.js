/**
 * Checks IsEmpty
 */
const isEmptyValue = (value) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  );
};

/**
 * Returns Modified Output Object
 */
const modifyFinalData = (items) => {
  if (items.length === 0) return items;
  return items.map((ids) => {
    return { id: ids };
  });
};

module.exports = { isEmptyValue, modifyFinalData };
