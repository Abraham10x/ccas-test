import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import commentRepository, {
  Comment,
} from "@lib/repositories/comment.repository";
import toast from "react-hot-toast";
import queryKey from "./keys";

const createComment = (options = {}) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    async (body: Comment) => {
      const payload = await commentRepository.createComment(body);
      return payload;
    },
    {
      mutationKey: [queryKey.create],
      ...options,
      onSuccess: async (payload) => {
        await queryClient.invalidateQueries([queryKey.read]);
        toast.success("Comment successfully!!! 🎉");
      },
      onError: (err: any) => {
        toast.error(
          err.response.data.message ? err.response.data.message : err.message
        );
      },
    }
  );
  return {
    mutate: (body: Comment) => mutate(body),
  };
};

const getComment = (type: any, id: any, userType?: any) => {
  const response = useQuery({
    queryKey: [queryKey.read],
    queryFn: async () => await commentRepository.getComment(type, id, userType),
    onSuccess: (payload: any) => {
      // toast.success
    },
    onError: () => {
      // toast.error(
      //   err.response.data.message ? err.response.data.message : err.message
      // );
    },
  });
  return response;
};

const getReviewer = (id: any, formType?: any) => {
  const response = useQuery({
    queryKey: [queryKey.review],
    queryFn: async () => await commentRepository.getReviewer(id, formType),
    onSuccess: (payload: any) => {
      // toast.success
    },
    onError: () => {
      // toast.error(
      //   err.response.data.message ? err.response.data.message : err.message
      // );
    },
  });
  return response;
};

const commentQueries = { createComment, getComment, getReviewer };
export default commentQueries;
