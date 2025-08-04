import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import RoleRepository, { CreateRole } from "@lib/repositories/role.repository";
import toast from "react-hot-toast";
import queryKey from "./keys";

const createRole = (options = {}) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    async (body: CreateRole) => {
      const payload = await RoleRepository.createRole(body);
      return payload;
    },
    {
      mutationKey: [queryKey.create],
      ...options,
      onSuccess: async (payload) => {
        await queryClient.invalidateQueries([queryKey.read]);
        toast.success("Role created successfully!!! 🎉");
      },
      onError: (err: any) => {
        toast.error(
          err.response.data.message ? err.response.data.message : err.message
        );
      },
    }
  );
  return {
    mutate: (body: CreateRole) => mutate(body),
  };
};

const getRoles = () => {
  const response = useQuery({
    queryKey: [queryKey.read],
    queryFn: async () => await RoleRepository.getRole(),
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
const getMda = () => {
  const response = useQuery({
    queryKey: [queryKey.readMda],
    queryFn: async () => await RoleRepository.getMda(),
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

const getReviewers = () => {
  const response = useQuery({
    queryKey: [queryKey.readReviewer],
    queryFn: async () => await RoleRepository.getReviewer(),
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

const getSingleRole = (id: any) => {
  const response = useQuery({
    queryKey: [queryKey.read],
    queryFn: async () => await RoleRepository.getSingleRole(id),
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

const editRole = (options = {}) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    async (body: CreateRole) => {
      const payload = await RoleRepository.editRole(body);
      return payload;
    },
    {
      mutationKey: [queryKey.create],
      ...options,
      onSuccess: async (payload) => {
        await queryClient.invalidateQueries([queryKey.read]);
        toast.success("Role updated successfully!!! 🎉");
      },
      onError: (err: any) => {
        toast.error(
          err.response.data.message ? err.response.data.message : err.message
        );
      },
    }
  );
  return {
    mutate: (body: CreateRole) => mutate(body),
  };
};

const roleQueries = {
  createRole,
  getRoles,
  getMda,
  getSingleRole,
  getReviewers,
  editRole,
};

export default roleQueries;
