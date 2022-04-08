export default interface Products {
    id: number,
    article_number: string,
    name: string,
    description: string,
    // specifiers: { string: string },
    stock: number,
    location: string,
    price: number,
    api_key: string,
}