import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ActivityRepository, { Activity } from "@lib/repositories/activity-log";
import queryKey from "./keys";
import toast from "react-hot-toast";

const getAllActivity = () => {
  const response = useQuery({
    queryKey: [queryKey.readAll],
    queryFn: async () => await ActivityRepository.getAllActivityLog(),
    onSuccess: (payload: any) => {},
    onError: () => {},
  });
  return response;
};

const getActivity = (options = {}) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    async (body: Activity) => {
      const payload = await ActivityRepository.getActivity(body);
      return payload;
    },
    {
      mutationKey: [queryKey.create],
      ...options,
      onSuccess: async (payload) => {
        await queryClient.invalidateQueries([queryKey.read]);
      },
      onError: (err: any) => {
        toast.error(
          err.response.data.message ? err.response.data.message : err.message
        );
      },
    }
  );
  return {
    mutate: (body: Activity) => mutate(body),
  };
};

const ActivityLogQueries = { getAllActivity, getActivity };
export default ActivityLogQueries;
