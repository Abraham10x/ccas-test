import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const useUpload = () => {
  // const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>();
  const [uploaded, setUploaded] = useState<number>(0);
  const [upload, setUpload] = useState<number>(0);
  const [progress, setProgress] = useState(0);

  const uploadFile = async (event: any, index: number) => {
    setLoading(true);

    try {
      if (loading) {
        toast.loading("Uploading, please wait...", { duration: 5000 });
      }
      const file = event.currentTarget.files[0];
      const formData = new FormData();
      formData.append("file", file as File);

      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/upload/upload_file.php`;
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent: any) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percentCompleted);
          setUpload(index);
        },
      };

      const response = await axios.post(url, formData, config);
      const dataObj = await response?.data;
      if (dataObj.file_url === null && dataObj.message === "success") {
        toast.error("An error was encountered, please try again!");
      } else {
        setLoading(false);
        setUploaded(index);
        toast.success("File uploaded! 🎉");
      }

      setData(dataObj);
      return dataObj;
    } catch (error) {
      toast.error("An error occured, please select file again");
    }
  };

  return { uploadFile, data, uploaded, upload, progress };
};

export default useUpload;
