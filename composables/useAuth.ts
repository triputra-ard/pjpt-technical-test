export const useAuth = () => {
  const user = ref<User | null>(null);
  const isAuthenticated = computed(() => !!user.value);
  const userRole = computed(() => user.value?.role || null);

  const login = async (username: string, password: string) => {
    try {
      const response = await $fetch("/api/auth/login", {
        method: "POST",
        body: { username, password },
      });

      user.value = response as User;
      return true;
    } catch (error) {
      if (error.statusCode === 401) {
        return false;
      }
      throw error;
    }
  };

  const logout = () => {
    user.value = null;
  };

  return {
    user,
    isAuthenticated,
    userRole,
    login,
    logout,
  };
};
