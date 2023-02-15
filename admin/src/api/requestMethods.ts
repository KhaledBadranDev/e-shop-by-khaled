import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

const AUTH_USER_TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZDgxZTBjMzAzNTUwYWE4ZTVhN2RiMyIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NzUxMDc4NjYsImV4cCI6MTY3NTcxMjY2Nn0.lwGtcUdg7YfFh74HYZECbKz9HApmNwE2iKJVqYCPgew";
const AUTH_ADMIN_TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZDJiMzg2NWIyNWZmNzhkNGZiMTgyMCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3NTk1NjU5NSwiZXhwIjoxNjc2NTYxMzk1fQ.hqAnKEfvw7duyAg981WMNdIXP5MiFzMJlJpKQqAKdLo";

const axiosPublicRequest = (relativePath: string, methodType: string, reqBody: any = null) => {
    return new Promise(
        async (
            resolve: (value?: string) => void,
            reject: (reason?: Error | unknown) => void
        ) => {
            try {
                const headersList = {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                };

                const reqOptions = {
                    url: `${BASE_URL}${relativePath}`,
                    method: methodType,
                    headers: headersList,
                    data: reqBody
                };

                const apiResponse: any = await axios.request(reqOptions);
                resolve(apiResponse.data);
            } catch (error) {
                reject(error);
            }
        }
    );
};

const axiosAuthUserRequest = (relativePath: string, methodType: string) => {
    return new Promise(
        async (
            resolve: (value?: string) => void,
            reject: (reason?: Error | unknown) => void
        ) => {
            try {
                const headersList = {
                    Accept: "application/json",
                    token: `Bearer ${AUTH_USER_TOKEN}`,
                    "Content-Type": "application/json",
                };

                const reqOptions = {
                    url: `${BASE_URL}${relativePath}`,
                    method: methodType,
                    headers: headersList,
                };

                const apiResponse: any = await axios.request(reqOptions);
                resolve(apiResponse.data);
            } catch (error) {
                reject(error);
            }
        }
    );
};

const axiosAuthAdminRequest = (relativePath: string, methodType: string, reqBody: any = null) => {
    return new Promise(
        async (
            resolve: (value?: string) => void,
            reject: (reason?: Error | unknown) => void
        ) => {
            try {
                const headersList = {
                    Accept: "application/json",
                    token: `Bearer ${AUTH_ADMIN_TOKEN}`,
                    "Content-Type": reqBody? "application/json": "*/*",
                };

                const reqOptions = {
                    url: `${BASE_URL}${relativePath}`,
                    method: methodType,
                    headers: headersList,
                    data: reqBody
                };
                const apiResponse: any = await axios.request(reqOptions);
                resolve(apiResponse.data);
            } catch (error) {
                reject(error);
            }
        }
    );
};

export { axiosPublicRequest, axiosAuthUserRequest, axiosAuthAdminRequest };
