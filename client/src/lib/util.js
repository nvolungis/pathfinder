export const getId = list => {
  let max = -1;

  list.forEach(item => { if (item.id > max) max = item.id });

  return max + 1;
};
