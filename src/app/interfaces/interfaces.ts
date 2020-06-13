interface Book {
    id: string;
    title: string;
    author: string[];
}
interface Links{
    title: string;
    url: string;
}
interface Details{
    covers: number[];
    description: string;
}
export {Book, Links, Details};
