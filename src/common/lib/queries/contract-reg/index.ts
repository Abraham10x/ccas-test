import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import contractRegRepository, {
  ContractReg, EditContractReg,
} from "@lib/repositories/contract-reg.repository";
import toast from "react-hot-toast";
import queryKey from "./keys";
import { useRouter } from "next/router";

const create = (options = {}) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate } = useMutation(
    async (body: ContractReg) => {
      const payload = await contractRegRepository.create(body);
      return payload;
    },
    {
      mutationKey: [queryKey.create],
      ...options,
      onSuccess: async (payload) => {
        await queryClient.invalidateQueries([queryKey.readSingle]);
        toast.success("Contract created successfully!!! 🎉");
        setTimeout(() => {
          router.back();
        }, 1000);
      },
      onError: (err: any) => {
        toast.error(
          err.response.data.message ? err.response.data.message : err.message
        );
      },
    }
  );
  return {
    mutate: (body: ContractReg) => mutate(body),
  };
};

const readAll = () => {
  const response = useQuery({
    queryKey: [queryKey.readAll],
    queryFn: async () => await contractRegRepository.readAll(),
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
    queryFn: async () => await contractRegRepository.readSingle(id),
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

const update = (options = {}) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    async (body: EditContractReg) => {
      const payload = await contractRegRepository.update(body);
      return payload;
    },
    {
      mutationKey: [queryKey.create],
      ...options,
      onSuccess: async (payload) => {
        await queryClient.invalidateQueries([queryKey.update]);
        toast.success("Contract updated successfully!!! 🎉");
      },
      onError: (err: any) => {
        toast.error(
          err.response.data?.message ? err.response.data.message : err.message
        );
      },
    }
  );
  return {
    mutate: (body: EditContractReg) => mutate(body),
  };
};

const readByUserId = (id: any) => {
  const response = useQuery({
    queryKey: [queryKey.readSingle],
    queryFn: async () => await contractRegRepository.readByUserId(id),
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

const readByOnlyMda = (mda: any) => {
  const response = useQuery({
    queryKey: [queryKey.readAll],
    queryFn: async () => await contractRegRepository.readByMda(mda),
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

const readBpp = () => {
  const response = useQuery({
    queryKey: [queryKey.readAll],
    queryFn: async () => await contractRegRepository.readBpp(),
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
    queryKey: [queryKey.readByReviwer],
    queryFn: async () => await contractRegRepository.readByReviewer(id),
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

const contractRegQueries = {
  create,
  readAll,
  readSingle,
  update,
  readBpp,
  readByUserId,
  readByOnlyMda,
  readByReviewer,
};

export default contractRegQueries;
