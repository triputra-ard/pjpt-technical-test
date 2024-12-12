import { useToast } from "vue-toast-notification";
export default defineNuxtRouteMiddleware((to) => {
  const auth = useUserStore();
  const $toast = useToast();

  // Always allow access to login page
  if (to.path === "/login") {
    // If user is already logged in, redirect to home
    if (auth.isAuthenticated) {
      $toast.info("You already sign in");
      return navigateTo("/");
    }
    return;
  }

  // Redirect to login if not authenticated
  if (!auth.isAuthenticated) {
    $toast.error("You need permission to view this page", {
      onDismiss: () => navigateTo("/login"),
    });
    return navigateTo("/login");
  }

  // Prevent employee from accessing admin page
  if (to.path === "/admin" && auth.getUserRole !== "admin") {
    $toast.error("You dont have permission to view this page");
    return navigateTo("/");
  }
});
