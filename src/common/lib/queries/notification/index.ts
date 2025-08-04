import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import notificationRepository, {
  GetNotification,
  Update,
} from "@lib/repositories/notification";
import toast from "react-hot-toast";
import queryKey from "./keys";

const getAllNotification = (parms: GetNotification) => {
  const response = useQuery({
    queryKey: [queryKey.read],
    queryFn: async () => await notificationRepository.getNotify(parms),
    onSuccess: (payload: any) => {
      // toast.success
    },
    onError: (err: any) => {
      toast.error(
        err.response.data?.message ? err.response.data.message : err.message
      );
    },
  });
  return response;
};

const updateNotification = (options = {}) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    async (body: Update) => {
      const payload = await notificationRepository.updateNotify(body);
      return payload;
    },
    {
      mutationKey: [queryKey.update],
      ...options,
      onSuccess: async (payload) => {
        await queryClient.invalidateQueries([queryKey.read]);
        // toast.success("Comment successfully!!! 🎉");
      },
      onError: () => {
        // toast.error(
        //   err.response.data.message ? err.response.data.message : err.message
        // );
      },
    }
  );
  return {
    mutate: (body: Update) => mutate(body),
  };
};
const notificationQueries = {
  getAllNotification,
  updateNotification,
};
export default notificationQueries;
