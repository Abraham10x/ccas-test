import { useMutation, useQueryClient } from "@tanstack/react-query";
import requestRepository, {
  ContractRequest,
  EarlyRequest,
  KickoffRequest,
  UploadCopyDocument,
} from "@lib/repositories/requests.repository";
import toast from "react-hot-toast";
import queryKey from "./keys";
import { useRouter } from "next/router";

const handleEarlyRequest = (action: any) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    async (body: EarlyRequest) => {
      const payload = await requestRepository.handleEarlyReq(body);
      return payload;
    },
    {
      mutationKey: [queryKey.create],
      onSuccess: async (payload) => {
        await queryClient.invalidateQueries([queryKey.read]);
        switch (action) {
          case "Approved":
            toast.success("Form accepted successfully!!! 🎉");
            break;
          case "Rejected":
            toast.success("Form returned successfully!!! 🎉");
            break;

          default:
            break;
        }
      },
      onError: (err: any) => {
        toast.error(
          err.response.data.message ? err.response.data.message : err.message
        );
      },
    }
  );
  return {
    mutate: (body: EarlyRequest) => mutate(body),
  };
};

const handleKickoffRequest = (action: any) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    async (body: KickoffRequest) => {
      const payload = await requestRepository.handleKickoffReq(body);
      return payload;
    },
    {
      mutationKey: [queryKey.create],
      onSuccess: async (payload) => {
        await queryClient.invalidateQueries([queryKey.read]);
        switch (action) {
          case "Approve":
            toast.success("Kick Off approved successfully!!! 🎉");
            break;
          case "Reject":
            toast.success("Kick Off rejected successfully!!! 🎉");
            break;
          default:
            break;
        }
      },
      onError: (err: any) => {
        toast.error(
          err.response.data.message ? err.response.data.message : err.message
        );
      },
    }
  );
  return {
    mutate: (body: KickoffRequest) => mutate(body),
  };
};

const handleContractRequest = (action: any) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    async (body: ContractRequest) => {
      const payload = await requestRepository.handleContractReq(body);
      return payload;
    },
    {
      mutationKey: [queryKey.create],
      onSuccess: async (payload) => {
        await queryClient.invalidateQueries([queryKey.read]);
        switch (action) {
          case "Approved":
            toast.success("Contract approved successfully!!! 🎉");
            break;
          case "Rejected":
            toast.success("Contract rejected successfully!!! 🎉");
            break;
          default:
            break;
        }
      },
      onError: (err: any) => {
        toast.error(
          err.response.data.message ? err.response.data.message : err.message
        );
      },
    }
  );
  return {
    mutate: (body: ContractRequest) => mutate(body),
  };
};

const handleCopyUpload = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate } = useMutation(
    async (body: UploadCopyDocument) => {
      const payload = await requestRepository.handleUploadReq(body);
      return payload;
    },
    {
      mutationKey: [queryKey.create],
      onSuccess: async (payload) => {
        await queryClient.invalidateQueries([queryKey.read]);
        toast.success("Submitted successfully!!! 🎉");
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
    mutate: (body: UploadCopyDocument) => mutate(body),
  };
};

const requestQueries = {
  handleEarlyRequest,
  handleContractRequest,
  handleKickoffRequest,
  handleCopyUpload,
};

export default requestQueries;
