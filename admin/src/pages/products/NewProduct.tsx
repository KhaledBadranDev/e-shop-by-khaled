import { FC, useCallback, useState } from "react";
import styled from "styled-components";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { Publish } from "@material-ui/icons";
import {
    IPostProductSchemaType,
    IStyleColorPropsType,
} from "../../types/types";
import { useDispatch } from "react-redux";
import storage, {
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "../../firebase/config"; //docs: https://firebase.google.com/docs/storage/web/upload-files
import { formatProductImageName } from "../../utils/helpers";
import { axiosAuthAdminRequest } from "../../api/requestMethods";

const RANDOM_COLORS = [
    "coral",
    "yellow",
    "gray",
    "green",
    "pink",
    "indigo",
    "lime",
    "olive",
];
// title: string;
// description: string;
// imgReference: string;
// categories: any;
// sizes: any;
// colors: any;
// price: number;
// isInStock: boolean;

const NewProduct: FC = () => {
    const productsReduxStateDispatch = useDispatch(); // "useDispatch"  to change the value of the global states
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [price, setPrice] = useState<number>(99);
    const [categories, setCategories] = useState<string[]>([]);
    const [sizes, setSizes] = useState<string[]>([]);
    const [colors, setColors] = useState<string[]>(["teal"]);
    const [isInStock, setIsInStock] = useState<boolean>(true);
    const [productImage, setProductImage] = useState<File | null>(null);
    const [imageRef, setImageRef] = useState<string>("");
    // the following will be the product that would use all the inputs to create a new product and post it to the db
    const [product, setProduct] = useState<IPostProductSchemaType>();
    // the following doesn't belong to the inputs
    const [numberOfColors, setNumberOfColors] = useState<string>("1");

    const handleSetTitle = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setTitle(event.target.value);
        },
        [title]
    );
    const handleSetDescription = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setDescription(event.target.value);
        },
        [description]
    );
    const handleSetPrice = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setPrice(parseInt(event.target.value));
        },
        [price]
    );
    const handleSetCategories = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const tmpCloned: string[] = [...categories];
            if (tmpCloned.includes(event.target.value))
                tmpCloned.splice(tmpCloned.indexOf(event.target.value), 1);
            else tmpCloned.push(event.target.value);
            console.log("tmpCloned:", tmpCloned);
            setCategories(tmpCloned);
        },
        [categories]
    );
    const handleSetSizes = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const tmpCloned: string[] = [...sizes];
            if (tmpCloned.includes(event.target.value))
                tmpCloned.splice(tmpCloned.indexOf(event.target.value), 1);
            else tmpCloned.push(event.target.value);
            console.log("tmpCloned:", tmpCloned);
            setSizes(tmpCloned);
        },
        [sizes]
    );

    const handleSetIsInStock = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setIsInStock(event.target.value === "true");
        },
        [isInStock]
    );
    const handleSetProductImage = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            // get only the first uploaded file, if admin tries to upload many images
            if (event.target.files) setProductImage(event.target.files[0]);
        },
        [productImage]
    );

    const handleSubmittingProject = useCallback(
        async (event: React.ChangeEvent<HTMLInputElement>) => {
            event.preventDefault();
            // upload the image to productsImages directory in firebase cloud storage
            const storageRef = ref(
                storage,
                `productsImages/${formatProductImageName(productImage.name)}`
            );
            // docs: https://firebase.google.com/docs/storage/web/upload-files#monitor_upload_progress
            const uploadTask = uploadBytesResumable(storageRef, productImage);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    // Observe state change events such as progress, pause, and resume
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log("Upload is " + progress + "% done");
                    switch (snapshot.state) {
                        case "paused":
                            console.log("Upload is paused");
                            break;
                        case "running":
                            console.log("Upload is running");
                            break;
                    }
                },
                (error) => {
                    // Handle unsuccessful uploads
                    console.log("file could not be uploaded ", error);
                },
                () => {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    getDownloadURL(uploadTask.snapshot.ref).then(
                        (downloadURL) => {
                            setImageRef(downloadURL);
                            console.log("File available at", downloadURL);
                        }
                    );
                }
            );

            const relativePath = "/products";
            const method = "POST";
            const productToBePushedToDb: IPostProductSchemaType = {
                title: title,
                description: description,
                imgReference: imageRef,
                categories: categories,
                sizes: sizes,
                colors: colors,
                price: price,
                isInStock: isInStock,
            };
            await axiosAuthAdminRequest(
                relativePath,
                method,
                productToBePushedToDb
            );
        },
        []
    );

    // console.log(title);
    // console.log(description);
    // console.log(price);
    // console.log(categories);
    // console.log(sizes);
    // console.log(colors);
    // console.log(isInStock);
    // console.log(productImage);

    const handleAdjustedColor = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
            const updatedSelectedColors = [...colors];
            updatedSelectedColors[index] = event.target.value;
            setColors(updatedSelectedColors);
        },
        [colors]
    );

    const handleSelectColorsNumber = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setNumberOfColors(event.target.value);

            if (parseInt(event.target.value) > colors.length) {
                // if the admin wants to add more color
                let repeat: boolean = true;
                while (repeat) {
                    const randomColor =
                        RANDOM_COLORS[
                            Math.floor(Math.random() * RANDOM_COLORS.length)
                        ];
                    if (!colors.includes(randomColor)) {
                        const updatedSelectedColors = [...colors];
                        updatedSelectedColors.push(randomColor);
                        setColors(updatedSelectedColors);
                        repeat = false;
                    }
                }
            } else if (parseInt(event.target.value) > 0) {
                // if the admin wants to remove a color
                // then remove last color
                colors.pop();
            }
        },
        [numberOfColors, colors]
    );

    return (
        <Container>
            <h1 className="newProductTitle">New Product</h1>
            <NewProductForm onSubmit={handleSubmittingProject}>
                <NewProductItem>
                    <NewProductLabel>Product Title</NewProductLabel>
                    <NewProductInput
                        type="text"
                        placeholder="Apple Keyboard"
                        required
                        value={title}
                        onChange={handleSetTitle}
                    />
                </NewProductItem>
                <NewProductItem>
                    <NewProductLabel>Product Description</NewProductLabel>
                    <NewProductInput
                        type="text"
                        placeholder="keyboard version 2, full size keyboard"
                        required
                        value={description}
                        onChange={handleSetDescription}
                    />
                </NewProductItem>
                <NewProductItem>
                    <NewProductLabel>Price</NewProductLabel>
                    <NewProductInput
                        required
                        type="number"
                        placeholder="99"
                        min="1"
                        value={price}
                        onChange={handleSetPrice}
                    />
                </NewProductItem>
                <NewProductItem>
                    <NewProductLabel>Categories</NewProductLabel>
                    <NewProductCheckboxWrapper>
                        {/* the following input is hidden it is just to assure that the
                        user chooses one category at least
                        */}
                        <input
                            required={categories.length > 0 ? false : true}
                            style={{
                                width: "0px",
                                height: "0px",
                                backgroundColor: "transparent",
                                color: "transparent",
                            }}
                        ></input>
                        <NewProductCheckboxInput
                            type="checkbox"
                            id="men"
                            name="category"
                            value="men"
                            onChange={handleSetCategories}
                        />
                        <NewProductCheckboxLabel htmlFor="men">
                            Men
                        </NewProductCheckboxLabel>
                        <NewProductCheckboxInput
                            type="checkbox"
                            id="women"
                            name="category"
                            value="women"
                            onChange={handleSetCategories}
                        />
                        <NewProductCheckboxLabel htmlFor="women">
                            Women
                        </NewProductCheckboxLabel>
                        <NewProductCheckboxInput
                            type="checkbox"
                            id="all"
                            name="category"
                            value="all"
                            onChange={handleSetCategories}
                        />
                        <NewProductCheckboxLabel htmlFor="all">
                            All
                        </NewProductCheckboxLabel>
                    </NewProductCheckboxWrapper>
                </NewProductItem>
                <NewProductItem>
                    <NewProductLabel>Sizes</NewProductLabel>
                    <NewProductCheckboxWrapper>
                        {/* the following input is hidden it is just to assure that the
                        user chooses one category at least
                        */}
                        <input
                            required={sizes.length > 0 ? false : true}
                            style={{
                                width: "0px",
                                height: "0px",
                                backgroundColor: "transparent",
                                color: "transparent",
                            }}
                        ></input>
                        <NewProductCheckboxInput
                            type="checkbox"
                            id="xs"
                            value="xs"
                            name="size"
                            onChange={handleSetSizes}
                        />
                        <NewProductCheckboxLabel htmlFor="xs">
                            XS
                        </NewProductCheckboxLabel>
                        <NewProductCheckboxInput
                            type="checkbox"
                            id="s"
                            value="s"
                            name="size"
                            onChange={handleSetSizes}
                        />
                        <NewProductCheckboxLabel htmlFor="s">
                            S
                        </NewProductCheckboxLabel>
                        <NewProductCheckboxInput
                            type="checkbox"
                            id="m"
                            value="m"
                            name="size"
                            onChange={handleSetSizes}
                        />
                        <NewProductCheckboxLabel htmlFor="m">
                            M
                        </NewProductCheckboxLabel>
                        <NewProductCheckboxInput
                            type="checkbox"
                            id="l"
                            value="l"
                            name="size"
                            onChange={handleSetSizes}
                        />
                        <NewProductCheckboxLabel htmlFor="l">
                            L
                        </NewProductCheckboxLabel>
                        <NewProductCheckboxInput
                            type="checkbox"
                            id="xl"
                            value="xl"
                            name="size"
                            onChange={handleSetSizes}
                        />
                        <NewProductCheckboxLabel htmlFor="xl">
                            XL
                        </NewProductCheckboxLabel>
                        <NewProductCheckboxInput
                            type="checkbox"
                            id="2xl"
                            value="2xl"
                            name="size"
                            onChange={handleSetSizes}
                        />
                        <NewProductCheckboxLabel htmlFor="2xl">
                            2XL
                        </NewProductCheckboxLabel>
                    </NewProductCheckboxWrapper>
                </NewProductItem>
                <NewProductItem>
                    <NewProductLabel>Colors</NewProductLabel>
                    <NewProductCheckboxWrapper>
                        <NewProductSubLabel>
                            Select number of colors:
                        </NewProductSubLabel>
                        <NewProductSubInput
                            type="number"
                            value={numberOfColors}
                            onChange={handleSelectColorsNumber}
                            required
                            min="1"
                            max="4"
                            color=""
                        />
                    </NewProductCheckboxWrapper>
                    <NewProductCheckboxWrapper>
                        <>
                            <NewProductSubLabel>
                                Adjust colors:
                            </NewProductSubLabel>
                            {colors.map((color: string, index: number) => (
                                <NewProductSubInput
                                    style={{ cursor: "pointer" }}
                                    type="color"
                                    key={color}
                                    color={color}
                                    onChange={(
                                        event: React.ChangeEvent<HTMLInputElement>
                                    ) => handleAdjustedColor(event, index)}
                                />
                            ))}
                        </>
                    </NewProductCheckboxWrapper>
                </NewProductItem>
                <NewProductItem>
                    <NewProductLabel>Is In Stock</NewProductLabel>
                    <NewProductCheckboxWrapper>
                        <NewProductCheckboxInput
                            type="radio"
                            id="true"
                            value="true"
                            onChange={handleSetIsInStock}
                            name="is-in-stock"
                            required
                        />
                        <NewProductCheckboxLabel htmlFor="true">
                            True
                        </NewProductCheckboxLabel>
                        <NewProductCheckboxInput
                            type="radio"
                            id="false"
                            value="false"
                            onChange={handleSetIsInStock}
                            name="is-in-stock"
                        />
                        <NewProductCheckboxLabel htmlFor="false">
                            False
                        </NewProductCheckboxLabel>
                    </NewProductCheckboxWrapper>
                </NewProductItem>
                <NewProductItem>
                    <NewProductLabel>Product Image</NewProductLabel>
                    <NewProductInput
                        type="file"
                        required
                        onChange={handleSetProductImage}
                    />
                </NewProductItem>

                <NewProductButton>
                    <AddBoxIcon
                        style={{ color: "#198754", marginRight: "5px" }}
                    />
                    SUBMIT ADDING PRODUCT
                </NewProductButton>
            </NewProductForm>
        </Container>
    );
};

export default NewProduct;

const Container = styled.div`
    flex: 5;
    padding: 20px;
`;

const NewProductForm = styled.form`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
`;

const NewProductItem = styled.div`
    width: 400px;
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    margin-right: 20px;
`;

const NewProductCheckboxWrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    width: 400px;
`;

const NewProductLabel = styled.label`
    margin: 10px 10px 10px 0px;
    font-size: 16px;
    font-weight: 600;
    color: rgb(255, 251, 251);
`;
const NewProductCheckboxLabel = styled(NewProductLabel)`
    padding-left: 5px;
    margin-right: 20px;
    font-size: 14px;
    color: rgb(151, 150, 150);
    cursor: pointer;
`;

const NewProductInput = styled.input`
    height: 20px;
    padding: 10px;
    border: 1px solid gray;
    border-radius: 5px;
`;

const NewProductCheckboxInput = styled(NewProductInput)`
    cursor: pointer;
`;

const NewProductSubLabel = styled(NewProductLabel)`
    margin: 5px 0px;
    font-size: 14px;
    color: rgb(151, 150, 150);
`;
const NewProductSubInput = styled(NewProductInput)<IStyleColorPropsType>`
    margin: 5px 0px 5px 10px;
    width: 50px;
    height: 8px;
    background-color: ${(props) => props.color};
`;

const NewProductButton = styled.button`
    border: 2px solid black;
    background-color: transparent;
    padding: 5px 10px;
    font-weight: 600;
    width: 400px;
    margin-top: 30px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;
`;
