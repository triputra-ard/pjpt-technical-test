import { UserRepository } from "~/server/repositories/user";

export default defineEventHandler(async (event) => {
  const { req } = event.node;
  // const auth = useAuth();
  const userRepo = new UserRepository();

  // Protect /admin route
  if (req.url?.startsWith("/admin")) {
    const user = auth.user.value;

    if (!user) {
      return sendRedirect(event, "/login");
    }

    const dbUser = await userRepo.findById(user.id);

    if (!dbUser || dbUser.role !== "admin") {
      return sendError(
        event,
        createError({
          statusCode: 403,
          statusMessage: "Forbidden",
        })
      );
    }
  }

  // Protect home route
  if (req.url === "/" && !auth.isAuthenticated.value) {
    return sendRedirect(event, "/login");
  }
});
