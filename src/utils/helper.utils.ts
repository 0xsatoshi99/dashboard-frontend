export const getErrors = (error: any) => {
  return error?.response?.data || error?.message || "Something went wrong.";
};
