import {AppConfig} from "./src/config";

const host = AppConfig.host;
import axios from 'axios';

const axiosClient = axios.create({
    baseURL: host,
    timeout: 50000, //50 seconds
});

class ApiService {

    static predict = async (uri) => {
        console.log(uri)
        let uriParts = uri.split('.');
        let fileType = uriParts[uriParts.length - 1];
        let data = new FormData();
        data.append('file', {
            uri: uri,
            name: `photo.${fileType}`,
            type: `image/${fileType}`,
        });

        console.log(data);
        console.log("waiting for response...")
        const response = await axiosClient.post('/analyze', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json'

            }
        });

        console.log(response.data);
        return response.data
    }

    static ping = async () => {
        const response = await axiosClient.get('ping')
        console.log(response.data)
        return response.data
    }
}

export {ApiService};