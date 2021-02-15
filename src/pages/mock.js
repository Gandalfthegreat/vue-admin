const mockObj = {
    name: 'peter',
    address: '西二旗',
    date: new Date(),
    phone: Math,
}

export const tableData = Array(20).fill(mockObj).map((item, index) => {
    return {
        ...item,
        id: index,
    }
})

