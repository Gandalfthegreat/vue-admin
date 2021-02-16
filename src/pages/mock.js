const mockObj = {
  name: "peter",
  address: "西二旗",
  date: new Date().getUTCDate(),
  phone: 1388888
};

export const tableData = Array(20)
  .fill(mockObj)
  .map((item, index) => {
    return {
      ...item,
      id: index
    };
  });
