import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import certificateRepository, {
  ReuploadCertificate,
  Certificate,
  EarlyCertificate,
  KickoffCertificate,
} from "@lib/repositories/certificate-print";
import toast from "react-hot-toast";
import queryKey from "./keys";
import { useRouter } from "next/router";

const createCertificate = (options = {}) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate } = useMutation(
    async (body: Certificate) => {
      const payload = await certificateRepository.createCertificate(body);
      return payload;
    },
    {
      mutationKey: [queryKey.create],
      ...options,
      onSuccess: async (payload) => {
        await queryClient.invalidateQueries([queryKey.read]);
        toast.success("Form created successfully!!! 🎉");
        setTimeout(() => {
          router.reload();
        }, 300);
      },
      onError: (err: any) => {
        toast.error(
          err.response.data.message ? err.response.data.message : err.message
        );
      },
    }
  );
  return {
    mutate: (body: Certificate) => mutate(body),
  };
};

const reuploadCertificate = (options = {}) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate } = useMutation(
    async (body: ReuploadCertificate) => {
      const payload = await certificateRepository.reuploadCertificate(body);
      return payload;
    },
    {
      mutationKey: [queryKey.create],
      ...options,
      onSuccess: async (payload) => {
        await queryClient.invalidateQueries([queryKey.read]);
        toast.success("Form created successfully!!! 🎉");
        setTimeout(() => {
          router.reload();
        }, 300);
      },
      onError: (err: any) => {
        toast.error(
          err.response.data.message ? err.response.data.message : err.message
        );
      },
    }
  );
  return {
    mutate: (body: ReuploadCertificate) => mutate(body),
  };
};

const getCertificate = (id: number, by: string) => {
  const response = useQuery({
    queryKey: [queryKey.read],
    queryFn: async () => await certificateRepository.getCertificate(id, by),
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

const createEarlyCertificate = (options = {}) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate } = useMutation(
    async (body: EarlyCertificate) => {
      const payload = await certificateRepository.createEarlyCertificate(body);
      return payload;
    },
    {
      mutationKey: [queryKey.createEarly],
      ...options,
      onSuccess: async (payload) => {
        await queryClient.invalidateQueries([queryKey.readEarly]);
        toast.success("Form created successfully!!! 🎉");
        setTimeout(() => {
          router.reload();
        }, 300);
      },
      onError: (err: any) => {
        toast.error(
          err.response.data.message ? err.response.data.message : err.message
        );
      },
    }
  );
  return {
    mutate: (body: EarlyCertificate) => mutate(body),
  };
};

const getEarlyCertificate = (id: number) => {
  const response = useQuery({
    queryKey: [queryKey.readEarly],
    queryFn: async () => await certificateRepository.getEarlyCertificate(id),
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

const createKickoffCertificate = (options = {}) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate } = useMutation(
    async (body: KickoffCertificate) => {
      const payload = await certificateRepository.createKicoffCertificate(body);
      return payload;
    },
    {
      mutationKey: [queryKey.createKickoff],
      ...options,
      onSuccess: async (payload) => {
        await queryClient.invalidateQueries([queryKey.readKickoff]);
        toast.success("Form created successfully!!! 🎉");
        setTimeout(() => {
          router.reload();
        }, 300);
      },
      onError: (err: any) => {
        toast.error(
          err.response.data.message ? err.response.data.message : err.message
        );
      },
    }
  );
  return {
    mutate: (body: KickoffCertificate) => mutate(body),
  };
};

const getKickoffCertificate = (id: number) => {
  const response = useQuery({
    queryKey: [queryKey.readKickoff],
    queryFn: async () => await certificateRepository.getKickoffCertificate(id),
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

const commentQueries = {
  createCertificate,
  reuploadCertificate,
  getCertificate,
  createEarlyCertificate,
  getEarlyCertificate,
  createKickoffCertificate,
  getKickoffCertificate,
};
export default commentQueries;
