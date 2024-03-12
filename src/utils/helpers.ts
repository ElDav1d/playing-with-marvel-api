export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString();
};

export const getParentSelectors = (classNameProp: string | undefined) => {
  return classNameProp || '';
};
