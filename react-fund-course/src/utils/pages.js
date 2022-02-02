// создали функцию, которая принимает общее количество объектов и делит их на кол-во которое должно быть на одной странице, также округляем при помощи ceil

export const getPageCount = (totalCount, limit) => {
    return Math.ceil(totalCount / limit)
}

export const getPagesArray = (totalPages) => {
    let result = [];
    for(let i = 0; i < totalPages; i++) {
        result.push(i + 1)
    }
    return result;
}