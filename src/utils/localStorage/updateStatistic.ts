export const updateStatistic = (data: any) => {
  for (const property in data) {
    localStorage.setItem(property, data[property]);
  }
};
