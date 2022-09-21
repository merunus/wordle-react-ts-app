interface TDataProps {
  value: boolean;
  type: string;
}
export const addDataToLC = (data: TDataProps) => {
  const { value, type } = data;
  localStorage.setItem(type, JSON.stringify(value));
};
