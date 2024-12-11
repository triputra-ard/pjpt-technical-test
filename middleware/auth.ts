export default defineNuxtRouteMiddleware((to) => {
  const auth = useAuth();

  // Always allow access to login page
  if (to.path === "/login") {
    // If user is already logged in, redirect to home
    if (auth.isAuthenticated.value) {
      return navigateTo("/home");
    }
    return;
  }

  // Redirect to login if not authenticated
  if (!auth.isAuthenticated.value) {
    return navigateTo("/login");
  }

  // Prevent employee from accessing admin page
  if (to.path === "/admin" && auth.userRole.value !== "admin") {
    return navigateTo("/home");
  }
});
