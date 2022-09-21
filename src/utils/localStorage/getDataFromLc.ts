export const getDataFromLC = (data: string) => {
  const result = localStorage.getItem(data);
  return result ? JSON.parse(result) : null;
};
