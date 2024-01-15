export const getQueryValue = (location) => {
  const queryParams = new URLSearchParams(location.search);
  const queryParamsObject = {};
  queryParams.forEach((value, key) => {
    queryParamsObject[key] = value;
  });
  return queryParamsObject;
};

export const setQueryValue = (queryValue, navigate) => {
  const queryString = new URLSearchParams(queryValue).toString();
  navigate(`/?${queryString}`);
};
