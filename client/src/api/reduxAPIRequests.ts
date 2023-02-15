import {
    signIn,
    signInSucceeded,
    signInFailed,
    IReduxUserActionPayloadTypes,
} from "../redux/user";
import { axiosPublicRequest } from "./requestMethods";

const reduxSignInAsyncAPICallHelper = async (
    dispatch: (arg0: {
        payload: IReduxUserActionPayloadTypes | undefined;
        type: "user/signIn" | "user/signInSucceeded" | "user/signInFailed";
    }) => void,
    user: any
) => {
    dispatch(signIn());
    try {
        const relativePath = "/auth/signin";
        const method = "POST";
        const bodyContent = user;

        const fetchedUserDataFromDB: any = await axiosPublicRequest(
            relativePath,
            method,
            bodyContent
        );
        const userDataForAxios: IReduxUserActionPayloadTypes = {
            email: fetchedUserDataFromDB.email,
            username: fetchedUserDataFromDB.username,
            password: fetchedUserDataFromDB.password,
            error:"",
        };
        dispatch(signInSucceeded(userDataForAxios));
    } catch (error: any) {
        const errorState: IReduxUserActionPayloadTypes = {
            email: "",
            username: "",
            password: "",
            error: `${error.message}. ${error.response.data}. ${error.response.statusText}`,
        }
        console.log(error)
        dispatch(signInFailed(errorState));
    }
};

export default reduxSignInAsyncAPICallHelper;
