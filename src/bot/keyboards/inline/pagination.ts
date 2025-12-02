

// type paginationDataType = {
//     model: any,
//     page: number,
//     count: number,
//     filters: any,
//     order: [string, string],
//     include: any[],
//     url: string,
// }
// async function getPaginatedData({
//     model,
//     page = 1,
//     count = 10,
//     filters = {},
//     order = ["id", "DESC"],
//     include = [],
//     url = "",
// }: paginationDataType) {
//     const offset = (page - 1) * count;

//     const total_pages = Math.ceil(await model.count() / count);
//     const res = await model.findAll({
//         offset,
//         where: { ...filters },
//         order: [order],
//     })

//     return {
//         page,
//         total_pages,
//         total_count: res.length,
//         result: res.map(p => p.toJSON()),
//         links: {
//             prev: page - 1 > 0 ? `${url} ${page - 1}` : null,
//             next: page - 1 > 0 ? `${url} ${page - 1}` : null,
//         },
//     }
// }

// module.exports = getPaginatedData;