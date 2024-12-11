export const useAuth = () => {
  const userData = useUserStore();

  const login = async (username: string, password: string) => {
    try {
      const response = await $fetch("/api/auth/login", {
        method: "POST",
        body: { username, password },
      });
      userData.isAuthenticated = true;
      userData.user = response.data as InfAuthUser;
      return true;
    } catch (error) {
      if (error.statusCode === 401) {
        return false;
      }
      throw error;
    }
  };

  const logout = () => {
    userData.isAuthenticated = false;
    userData.user = {};
    navigateTo("/login");
  };

  return {
    login,
    logout,
  };
};
