import { isStyledComponent } from "styled-components";

interface IPostProductSchemaType {
    title: string;
    description: string;
    imgReference: string;
    categories: any;
    sizes: any;
    colors: any;
    price: number;
    isInStock: boolean;
}

interface IGetProductSchemaType extends IPostProductSchemaType {
    _id: string;
}

interface IStyleColorPropsType {
    color: string;
}

export type {
    IPostProductSchemaType,
    IGetProductSchemaType,
    IStyleColorPropsType,
};
