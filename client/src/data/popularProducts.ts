interface IProductTypes {
    _id: number;
    title?: string;
    description?: string;
    imgReference: string;
    categories?: any;
    sizes?: any;
    colors?: any;
    price?: number;
    isInStock?: boolean;
    createdAt?: any;
}

const popularProducts: IProductTypes[] = [
    {
        _id: 1,
        imgReference:
            "https://d3o2e4jr3mxnm3.cloudfront.net/Mens-Jake-Guitar-Vintage-Crusher-Tee_68382_1_lg.png",
    },
    {
        _id: 2,
        imgReference:
            "https://cdn.shopify.com/s/files/1/0101/4832/products/Angela_Natural_Tee.png?v=1606780388",
    },
    {
        _id: 3,
        imgReference:
            "https://www.prada.com/content/dam/pradanux_products/U/UCS/UCS319/1YOTF010O/UCS319_1YOT_F010O_S_182_SLF.png",
    },
    {
        _id: 4,
        imgReference:
            "https://www.burdastyle.com/pub/media/catalog/product/cache/7bd3727382ce0a860b68816435d76e26/107/BUS-PAT-BURTE-1320516/1170x1470_BS_2016_05_132_front.png",
    },
    {
        _id: 5,
        imgReference:
            "https://images.ctfassets.net/5gvckmvm9289/3BlDoZxSSjqAvv1jBJP7TH/65f9a95484117730ace42abf64e89572/Noissue-x-Creatsy-Tote-Bag-Mockup-Bundle-_4_-2.png",
    },
    {
        _id: 6,
        imgReference:
            "https://d3o2e4jr3mxnm3.cloudfront.net/Rocket-Vintage-Chill-Cap_66374_1_lg.png",
    },
    {
        _id: 7,
        imgReference:
            "https://www.vintageindustries.nl/download_front/qympzk1762/2217_Arrow_Jacket_Forest.png",
    },
    {
        _id: 8,
        imgReference:
            "https://www.pngarts.com/files/3/Women-Jacket-PNG-High-Quality-Image.png",
    },
];

export default popularProducts;
export type { IProductTypes };
