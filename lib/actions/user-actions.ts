    "use server"

    import prisma from "@/lib/prisma";
    import bcrypt from "bcrypt";
    import { z } from "zod";
    import { revalidatePath } from "next/cache";

    // Validation schemas
    const createUserSchema = z.object({
    email: z.email("Alamat email tidak valid"),
    password: z.string().min(8, "Password harus terdiri dari minimal 8 karakter"),
    name: z.string().min(1, "Nama diperlukan"),
    });

    const updateUserSchema = z.object({
    id: z.uuid("User ID tidak valid"),
    name: z.string().min(1, "Nama diperlukan").optional(),
    email: z.email("Alamat email tidak valid").optional(),
    password: z.string().min(8, "Password harus terdiri dari minimal 8 karakter").optional(),
    });

    const deleteUserSchema = z.object({
    userId: z.uuid("User ID tidak valid"),
    });

    const getUserByIdSchema = z.object({
    id: z.uuid("User ID tidak valid"),
    });

    type CreateUserInput = z.infer<typeof createUserSchema>;
    type UpdateUserInput = z.infer<typeof updateUserSchema>;
    type DeleteUserInput = z.infer<typeof deleteUserSchema>;
    type GetUserByIdInput = z.infer<typeof getUserByIdSchema>;

    // Get user by ID action
    export async function getUserById(input: GetUserByIdInput) {
    try {
        const validatedData = getUserByIdSchema.parse(input);

        const user = await prisma.user.findUnique({
        where: { id: validatedData.id },
        select: {
            id: true,
            email: true,
            name: true,
        },
        });

        if (!user) {
        return {
            success: false,
            error: "User tidak ditemukan",
        };
        }

        return {
        success: true,
        data: user,
        };
    } catch (error) {
        if (error instanceof z.ZodError) {
        return {
            success: false,
            error: error.issues[0].message,
        };
        }
        return {
        success: false,
        error: error instanceof Error ? error.message : "Terjadi kesalahan saat mengambil data user",
        };
    }
    }

    // Create user action
    export async function createUser(userData: CreateUserInput) {
    try {
        // Validate input
        const validatedData = createUserSchema.parse(userData);

        // Check if user with this email already exists
        const existingUser = await prisma.user.findUnique({
        where: { email: validatedData.email },
        });

        if (existingUser) {
        return {
            success: false,
            error: "User dengan email ini sudah ada",
        };
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(validatedData.password, 10);

        // Create the user
        const user = await prisma.user.create({
        data: {
            email: validatedData.email,
            password: hashedPassword,
            name: validatedData.name,
        },
        });

        revalidatePath("/admin/users");

        return {
        success: true,
        data: {
            id: user.id,
            email: user.email,
            name: user.name,
        },
        message: "User berhasil dibuat",
        };
    } catch (error) {
        if (error instanceof z.ZodError) {
        return {
            success: false,
            error: error.issues[0].message,
        };
        }
        return {
        success: false,
        error: error instanceof Error ? error.message : "Terjadi kesalahan saat membuat user",
        };
    }
    }

    // Update user action
    export async function updateUser(data: UpdateUserInput) {
    try {
        // Validate input
        const validatedData = updateUserSchema.parse(data);

        // Verify user exists
        const userExists = await prisma.user.findUnique({
        where: { id: validatedData.id },
        });

        if (!userExists) {
        return {
            success: false,
            error: "User tidak ditemukan",
        };
        }

        const updateData: Partial<{
        name: string;
        email: string;
        password: string;
        }> = {};

        if (validatedData.name !== undefined) {
        updateData.name = validatedData.name;
        }

        if (validatedData.email !== undefined) {
        // Check if new email is already taken by another user
        const existingUser = await prisma.user.findUnique({
            where: { email: validatedData.email },
        });
        if (existingUser && existingUser.id !== validatedData.id) {
            return {
            success: false,
            error: "Email ini sudah digunakan oleh user lain",
            };
        }
        updateData.email = validatedData.email;
        }

      

        // If password is provided, hash it
        if (validatedData.password) {
        updateData.password = await bcrypt.hash(validatedData.password, 10);
        }

        if (Object.keys(updateData).length === 0) {
        return {
            success: false,
            error: "Tidak ada data yang perlu diperbarui",
        };
        }

        const updatedUser = await prisma.user.update({
        where: { id: validatedData.id },
        data: updateData,
        });

        revalidatePath("/admin/users");

        return {
        success: true,
        data: {
            id: updatedUser.id,
            email: updatedUser.email,
            name: updatedUser.name,
        },
        message: "User berhasil diperbarui",
        };
    } catch (error) {
        if (error instanceof z.ZodError) {
        return {
            success: false,
            error: error.issues[0].message,
        };
        }
        return {
        success: false,
        error: error instanceof Error ? error.message : "Terjadi kesalahan saat memperbarui user",
        };
    }
    }

    // Delete user action
    export async function deleteUser(input: DeleteUserInput) {
    try {
        // Validate input
        const validatedData = deleteUserSchema.parse(input);

        // Verify user exists
        const userExists = await prisma.user.findUnique({
        where: { id: validatedData.userId },
        });

        if (!userExists) {
        return {
            success: false,
            error: "User tidak ditemukan",
        };
        }

        await prisma.user.delete({
        where: { id: validatedData.userId },
        });

        revalidatePath("/admin/users");

        return {
        success: true,
        message: "User berhasil dihapus",
        };
    } catch (error) {
        if (error instanceof z.ZodError) {
        return {
            success: false,
            error: error.issues[0].message,
        };
        }
        return {
        success: false,
        error: error instanceof Error ? error.message : "Terjadi kesalahan saat menghapus user",
        };
    }
    }