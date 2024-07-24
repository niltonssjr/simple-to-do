const getNewId = (list: any[]) => {
    if (list.length === 0) return 1
    const lastId = list.reduce(
        (biggerIdFound: number, item: any) =>
            item.id > biggerIdFound ? item.id : biggerIdFound,
        0,
    )
    return lastId + 1
}
const getNewOrder = (list: any[]) => {
    if (list.length === 0) return 1
    const lastOrder = list.reduce(
        (biggerIdFound: number, item: any) =>
            item.order > biggerIdFound ? item.order : biggerIdFound,
        0,
    )
    return lastOrder + 1
}

const findIndexById = (list: any[], id: number) =>
    list.findIndex((item: any) => item.id === id)

export const Utils = {
    getNewId,
    getNewOrder,
    findIndexById,
}
