import { loginSchema } from "~/server/validation/auth.schema";
import { UserRepository } from "~/server/repositories/user";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    // Server-side validation using Zod
    const validatedData = loginSchema.parse(body);

    const userRepo = new UserRepository();
    const user = await userRepo.findByCredentials(
      validatedData.username,
      validatedData.password
    );

    if (!user) {
      throw createError({
        statusCode: 401,
        message: "Invalid credentials",
        stack: undefined,
      });
    }

    console.log();

    return {
      data: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
      success: true,
      message: "Login successful",
    } as InfResponseStandard;
  } catch (error: any) {
    if (error.name === "ZodError") {
      throw createError({
        statusCode: 400,
        message: "Validation failed",
        data: error.errors,
        stack: undefined,
      });
    }
    throw error;
  }
});
