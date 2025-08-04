import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import authRepository, {
  UserRegister,
  UserLogin,
  EditUser,
  Logout,
  CreateUser,
  EditPermissions,
  ChangePassword,
  ForgotPassword,
  ResetPassword,
  CreateMda,
} from "@lib/repositories/auth.repository";
import { storeToken } from "@lib/helper";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import queryKey from "./keys";
import Cookies from "js-cookie";

const register = (options = {}) => {
  const queryClient = useQueryClient();
  // const router = useRouter();

  const { mutate, isLoading, data, isSuccess, isError } = useMutation(
    async (body: UserRegister) => {
      const payload = await authRepository.register(body);
      return payload;
    },
    {
      mutationKey: [queryKey.create],
      ...options,
      onSuccess: async (payload) => {
        await queryClient.invalidateQueries([queryKey.read]);
        // if (isLoading) {
        //   toast.loading("Creating account...");
        // }
        toast.success("Account created successfully! 🎉");
        // setTimeout(() => router.reload(), 5000);
      },
      onError: (err: any) => {
        toast.error(
          err.response.data.message ? err.response.data.message : err.message
        );
      },
    }
  );
  return {
    mutate: (body: UserRegister) => mutate(body),
    isLoading,
    data,
    isSuccess,
    isError,
  };
};

const createUser = (options = {}) => {
  const queryClient = useQueryClient();
  // const router = useRouter();

  const { mutate } = useMutation(
    async (body: CreateUser) => {
      const payload = await authRepository.createUser(body);
      return payload;
    },
    {
      mutationKey: [queryKey.create],
      ...options,
      onSuccess: async (payload) => {
        await queryClient.invalidateQueries([queryKey.read]);
        // if (isLoading) {
        //   toast.loading("Creating account...");
        // }
        toast.success("User created successfully! 🎉");
        // setTimeout(() => router.reload(), 5000);
      },
      onError: (err: any) => {
        toast.error(
          err.response.data.message ? err.response.data.message : err.message
        );
      },
    }
  );
  return {
    mutate: (body: CreateUser) => mutate(body),
  };
};

const createMda = (options = {}) => {
  const queryClient = useQueryClient();
  // const router = useRouter();

  const { mutate } = useMutation(
    async (body: CreateMda) => {
      const payload = await authRepository.createNewMda(body);
      return payload;
    },
    {
      mutationKey: [queryKey.create],
      ...options,
      onSuccess: async (payload) => {
        await queryClient.invalidateQueries([queryKey.read]);
        // if (isLoading) {
        //   toast.loading("Creating account...");
        // }
        toast.success("MDA created successfully! 🎉");
        // setTimeout(() => router.reload(), 5000);
      },
      onError: (err: any) => {
        toast.error(
          err.response.data.message ? err.response.data.message : err.message
        );
      },
    }
  );
  return {
    mutate: (body: CreateMda) => mutate(body),
  };
};

const changePassword = (options = {}) => {
  const queryClient = useQueryClient();
  // const router = useRouter();

  const { mutate } = useMutation(
    async (body: ChangePassword) => {
      const payload = await authRepository.changePassword(body);
      return payload;
    },
    {
      mutationKey: [queryKey.change],
      ...options,
      onSuccess: async (payload) => {
        await queryClient.invalidateQueries([queryKey.read]);
        toast.success("Password changed successfully! 🎉");
      },
      onError: (err: any) => {
        toast.error(
          err.response.data.message ? err.response.data.message : err.message
        );
      },
    }
  );
  return {
    mutate: (body: ChangePassword) => mutate(body),
  };
};

const login = (options = {}) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate, isLoading, data, isSuccess } = useMutation(
    async (body: UserLogin) => {
      const payload = await authRepository.login(body);
      storeToken("userId", payload.data.userid);
      storeToken("sessionID", payload.data.session_id);
      storeToken("mda", payload.data.mda);
      storeToken("userType", payload.data.user_type);
      Cookies.set("userType", payload.data.user_type);
      return payload;
    },
    {
      mutationKey: [queryKey.create],
      ...options,
      onSuccess: async (payload) => {
        await queryClient.invalidateQueries([queryKey.read]);
        toast.success("Login successful! 🎉");
        switch (payload.data.user_type) {
          case "Super Admin":
            await router.push(
              "/dashboard/superadmin",
              "/dashboard/superadmin",
              { shallow: true }
            );
            break;
          case "Legal Adviser":
            await router.push(
              "/dashboard/legal-adviser",
              "/dashboard/legal-adviser",
              { shallow: true }
            );
            break;
          case "FMOJ system authorizer":
            await router.push(
              "/dashboard/system-authorizer",
              "/dashboard/system-authorizer",
              { shallow: true }
            );
            break;
          case "Legal Director":
            await router.push(
              "/dashboard/legal-director",
              "/dashboard/legal-director",
              { shallow: true }
            );
            break;
          case "FMOJ Reviewer":
            await router.push("/dashboard/reviewer", "/dashboard/reviewer", {
              shallow: true,
            });
            break;
          case "external reviewer":
            await router.push("/dashboard/reviewer", "/dashboard/reviewer", {
              shallow: true,
            });
            break;
          case "Procurement":
            await router.push(
              "/dashboard/procurement",
              "/dashboard/procurement",
              { shallow: true }
            );
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
    mutate: (body: UserLogin) => mutate(body),
    isLoading,
    data,
    isSuccess,
  };
};

const getUser = (userId: any) => {
  const response = useQuery({
    queryKey: [queryKey.read],
    queryFn: async () => await authRepository.getUser(userId),
    onSuccess: (payload: any) => {
      // setAuthUser(payload)
    },
    onError: (err: any) => {
      toast.error(
        err.response.data?.message ? err.response.data.message : err.message
      );
    },
  });
  return response;
};

const getAllUsers = () => {
  const response = useQuery({
    queryKey: [queryKey.readAll],
    queryFn: async () => await authRepository.getAllUsers(),
    onSuccess: (payload: any) => {},
    onError: (err: any) => {
      toast.error(
        err.response.data.message ? err.response.data.message : err.message
      );
    },
  });
  return response;
};

const logout = () => {
  // const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate } = useMutation(
    async (body: Logout) => {
      const payload = await authRepository.logout(body);
      return payload;
    },
    {
      mutationKey: [queryKey.create],
      onSuccess: async () => {
        // await queryClient.invalidateQueries([queryKey.read]);
        localStorage.clear();
        await router.push("/login", "/login", { shallow: true });
        Cookies.remove("userType");
        toast.success("Logged out successfully! 🎉");
      },
      onError: (err: any) => {
        toast.error(
          err.response.data.message ? err.response.data.message : err.message
        );
      },
    }
  );
  return {
    mutate: (body: Logout) => mutate(body),
  };
};

const statistics = () => {
  const response = useQuery({
    queryKey: [queryKey.readAll],
    queryFn: async () => await authRepository.statistics(),
    onSuccess: (payload: any) => {},
    onError: (err: any) => {
      toast.error(
        err.response.data.message ? err.response.data.message : err.message
      );
    },
  });
  return response;
};

const editUser = (options = {}) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    async (body: EditUser) => {
      const payload = await authRepository.editUser(body);
      return payload;
    },
    {
      mutationKey: [queryKey.create],
      ...options,
      onSuccess: async (payload) => {
        await queryClient.invalidateQueries([queryKey.read]);
        toast.success("Profile updated successfully! 🎉");
      },
      onError: (err: any) => {
        toast.error(
          err.response.data.message ? err.response.data.message : err.message
        );
      },
    }
  );
  return {
    mutate: (body: EditUser) => mutate(body),
  };
};

const editPermissions = (options = {}) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    async (body: EditPermissions) => {
      const payload = await authRepository.editPermissions(body);
      return payload;
    },
    {
      mutationKey: [queryKey.create],
      ...options,
      onSuccess: async (payload) => {
        await queryClient.invalidateQueries([queryKey.read]);
        toast.success("Permissions updated successfully! 🎉");
      },
      onError: (err: any) => {
        toast.error(
          err.response.data.message ? err.response.data.message : err.message
        );
      },
    }
  );
  return {
    mutate: (body: EditPermissions) => mutate(body),
  };
};

const forgotPassword = (options = {}) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    async (body: ForgotPassword) => {
      const payload = await authRepository.forgotPassword(body);
      return payload;
    },
    {
      mutationKey: [queryKey.forgot],
      ...options,
      onSuccess: async (payload) => {
        await queryClient.invalidateQueries([queryKey.read]);
        toast.success(`"Reset Token sent succesfully! 🎉`);
      },
      onError: (err: any) => {
        toast.error(
          err.response.data.message ? err.response.data.message : err.message
        );
      },
    }
  );
  return {
    mutate: (body: ForgotPassword) => mutate(body),
  };
};

const resetPassword = (options = {}) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    async (body: ResetPassword) => {
      const payload = await authRepository.resetPassword(body);
      return payload;
    },
    {
      mutationKey: [queryKey.reset],
      ...options,
      onSuccess: async (payload) => {
        await queryClient.invalidateQueries([queryKey.read]);
        toast.success("New Password updated successfully! 🎉");
      },
      onError: (err: any) => {
        toast.error(
          err.response.data.message ? err.response.data.message : err.message
        );
      },
    }
  );
  return {
    mutate: (body: ResetPassword) => mutate(body),
  };
};

const authQueries = {
  register,
  login,
  getUser,
  getAllUsers,
  logout,
  statistics,
  editUser,
  createUser,
  createMda,
  changePassword,
  forgotPassword,
  resetPassword,
  editPermissions,
};

export default authQueries;
