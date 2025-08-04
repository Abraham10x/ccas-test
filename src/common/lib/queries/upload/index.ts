import { useMutation, useQueryClient } from "@tanstack/react-query";
import uploadRepository, {
  UploadFile,
} from "@lib/repositories/upload.repository";
import { toast } from "react-hot-toast";

const upload = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    async (body: UploadFile) => {
      const payload = await uploadRepository.upload(body);
      return payload;
    },
    {
      mutationKey: ["upload"],
      onSuccess: async (payload) => {
        await queryClient.invalidateQueries(["uploadFile"]);
        toast.success("File uploaded successfully! 🎉");
      },
      onError: (err: any) => {
        toast.error(
          err.response.data.message ? err.response.data.message : err.message
        );
      },
    }
  );
  return {
    mutate: (body: UploadFile) => mutate(body),
  };
};

const uploadQuery = { upload };

export default uploadQuery;
