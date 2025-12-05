export type paginationDataType = {
    model?: any,
    page: number,
    count: number,
    filters?: any,
    order?: [string, string],
    include?: any[],
    url: string,
}

export type paginationDataResultType = {
    total_pages: number,
    total_count: number,
    result: any[],
    url: string,
    links: {
        prev: null | string,
        next: null | string,
    }
}

async function getPaginatedData({
    model,
    page = 1,
    count = 10,
    filters = {},
    order = ["id", "DESC"],
    include = [],
    url = "",
}: paginationDataType) {
    const offset = (page - 1) * count;

    const total_pages = Math.ceil(await model.count() / count);
    const res = await model.findAll({
        offset,
        where: { ...filters },
        order: [order],
        include: include
    })

    return {
        page,
        total_pages,
        total_count: res.length,
        result: res.map((p: any) => p.toJSON()),
        url,
        links: {
            prev: page - 1 > 0 ? `${url} ${page - 1}` : null,
            next: page - 1 > 0 ? `${url} ${page - 1}` : null,
        },
    }
}

export default getPaginatedData;