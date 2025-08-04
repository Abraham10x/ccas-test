import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import lessonLearntRepository, {
  LessonLearnt,
} from "@lib/repositories/lesson-learnt.repository";
import { toast } from "react-hot-toast";
import queryKey from "./keys";

const create = (options = {}) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    async (body: LessonLearnt) => {
      const payload = await lessonLearntRepository.create(body);
      return payload;
    },
    {
      mutationKey: [queryKey.create],
      ...options,
      onSuccess: async (payload) => {
        await queryClient.invalidateQueries([queryKey.read]);
        toast.success("Created successfully!!! 🎉");
      },
      onError: (err: any) => {
        toast.error(
          err.response.data.message ? err.response.data.message : err.message
        );
      },
    }
  );
  return {
    mutate: (body: LessonLearnt) => mutate(body),
  };
};

const readAll = () => {
  const response = useQuery({
    queryKey: [queryKey.read],
    queryFn: async () => await lessonLearntRepository.readAll(),
    onSuccess: (payload: any) => {
      // toast.success
    },
    onError: (err: any) => {
      toast.error(
        err.response.data.message ? err.response.data.message : err.message
      );
    },
  });
  return response;
};

const readSingle = (id: any) => {
  const response = useQuery({
    queryKey: [queryKey.read],
    enabled: false,
    queryFn: async () => await lessonLearntRepository.readSingle(id),
    onSuccess: (payload: any) => {
      // toast.success
    },
    onError: (err: any) => {
      toast.error(
        err.response.data.message ? err.response.data.message : err.message
      );
    },
  });
  return response;
};

const update = (options = {}) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    async (body: LessonLearnt) => {
      const payload = await lessonLearntRepository.update(body);
      return payload;
    },
    {
      mutationKey: [queryKey.create],
      ...options,
      onSuccess: async (payload) => {
        await queryClient.invalidateQueries([queryKey.update]);
        toast.success("Lesson updated successfully!!! 🎉");
      },
      onError: (err: any) => {
        toast.error(
          err.response.data.message ? err.response.data.message : err.message
        );
      },
    }
  );
  return {
    mutate: (body: LessonLearnt) => mutate(body),
  };
};

const deleteFn = () => {};

const lessonQueries = { create, readAll, readSingle, update, deleteFn };

export default lessonQueries;
