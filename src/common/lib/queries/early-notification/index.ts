import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import earlyNotificationRepository, {
  CreateEarlyNotification,
  EditEarlyNotification,
} from "@lib/repositories/early-notification.repository";
import toast from "react-hot-toast";
import queryKey from "./keys";
import { useRouter } from "next/router";

const create = (options = {}) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate } = useMutation(
    async (body: CreateEarlyNotification) => {
      const payload = await earlyNotificationRepository.create(body);
      return payload;
    },
    {
      mutationKey: [queryKey.create],
      ...options,
      onSuccess: async (payload) => {
        await queryClient.invalidateQueries([queryKey.readSingle]);
        toast.success("Form created successfully!!! 🎉");
        setTimeout(() => {
          router.reload();
        }, 2000);
      },
      onError: (err: any) => {
        toast.error(
          err.response.data.message ? err.response.data.message : err.message
        );
      },
    }
  );
  return {
    mutate: (body: CreateEarlyNotification) => mutate(body),
  };
};

const readAll = () => {
  const response = useQuery({
    queryKey: [queryKey.readAll],
    queryFn: async () => await earlyNotificationRepository.readAll(),
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

const readAllByMda = (mda: any) => {
  const response = useQuery({
    queryKey: [queryKey.readAll],
    queryFn: async () => await earlyNotificationRepository.readAllByMda(mda),
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

const readAllByUserId = (id: any) => {
  const response = useQuery({
    queryKey: [queryKey.readAll],
    queryFn: async () => await earlyNotificationRepository.readAllByUserId(id),
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
    queryKey: [queryKey.readSingle],
    queryFn: async () => await earlyNotificationRepository.readSingle(id),
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

const readByReviewer = (id: any) => {
  const response = useQuery({
    queryKey: [queryKey.readByReviewer],
    queryFn: async () => await earlyNotificationRepository.readByReviewer(id),
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
    async (body: EditEarlyNotification) => {
      const payload = await earlyNotificationRepository.update(body);
      return payload;
    },
    {
      mutationKey: [queryKey.create],
      ...options,
      onSuccess: async (payload) => {
        await queryClient.invalidateQueries([queryKey.update]);
        toast.success("Form updated successfully!!! 🎉");
      },
      onError: (err: any) => {
        toast.error(
          err.response.data.message ? err.response.data.message : err.message
        );
      },
    }
  );
  return {
    mutate: (body: EditEarlyNotification) => mutate(body),
  };
};

const earlyQueries = {
  create,
  readAll,
  readAllByMda,
  readSingle,
  readByReviewer,
  update,
  readAllByUserId,
};

export default earlyQueries;
