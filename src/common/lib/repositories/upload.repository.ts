import { AxiosInstance } from "axios";
import axiosInstance from "@lib/axios.client";

export interface UploadFile {
    file: any;
}

interface IUploadRepository {
    upload: (file: UploadFile) => Promise<void>;
}

export function UploadRepository(axios: AxiosInstance): IUploadRepository {
    return {
      upload: async (file: UploadFile) =>
        await axios.post("/upload/upload_file.php", file),
    };
}

export default UploadRepository(axiosInstance);