interface Banner {
    id: number;
    imgReference: string;
    title: string;
    description: string;
    bgColor: string;
}

const banners: Banner[] = [
    {
        id: 1,
        imgReference: "https://i.ibb.co/XsdmR2c/1.png",
        title: "SUMMER SALE",
        description:
            "DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.",
        bgColor: "f5fafd",
    },
    {
        id: 2,
        imgReference: "https://i.ibb.co/DG69bQ4/2.png",
        title: "AUTUMN COLLECTION",
        description:
            "DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.",
        bgColor: "fcf1ed",
    },
    {
        id: 3,
        imgReference: "https://i.ibb.co/cXFnLLV/3.png",
        title: "LOUNGEWEAR LOVE",
        description:
            "DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.",
        bgColor: "fbf0f4",
    },
];

export default banners;
export type { Banner };
