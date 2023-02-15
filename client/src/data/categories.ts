interface Category {
    id: number;
    imgReference: string;
    title: string;
    categoryName: string;
}

const categories: Category[] = [
    {
        id: 1,
        imgReference:
            "https://images.pexels.com/photos/5886041/pexels-photo-5886041.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        title: "SHIRT STYLE!",
        categoryName: "men",
    },
    {
        id: 2,
        imgReference:
            "https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        title: "LOUNGEWEAR LOVE",
        categoryName: "women",
    },
    {
        id: 3,
        imgReference:
            "https://images.pexels.com/photos/5480696/pexels-photo-5480696.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
        title: "LIGHT JACKETS",
        categoryName: "skirt",
    },
];

export default categories;
export type { Category };
