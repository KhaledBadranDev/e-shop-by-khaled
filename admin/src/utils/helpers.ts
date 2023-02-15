const formatDate = (date: string): string => {
    const timestamp = Date.parse(date);
    const dateObject = new Date(timestamp);
    const year = dateObject.getFullYear();
    const month = ("0" + (dateObject.getMonth() + 1)).slice(-2);
    const day = ("0" + dateObject.getDate()).slice(-2);
    const formattedDate = `${month}-${day}-${year}`;
    return formattedDate; // 2022-11-27
};

const formatProductImageName: (productImageName: string) => string = (
    productImageName: string
): string => {
    const date = new Date();
    const timestamp = date.getTime();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    
    
    // "YYYYMMDD_HH_MM_SS"
    const formattedDate = year + month + day + "_" + hours + "_" + minutes + "_" + seconds;


    // split the name of the image from its extension
    const productImageNameArr = productImageName.split(".") 
    const productImageNameExt = productImageName.split(".")[productImageNameArr.length-1];
    // e.g. someImageName.png_20230214_17_18_50.png
    return `${productImageName}_${formattedDate}.${productImageNameExt}`;
};

export { formatDate, formatProductImageName };
