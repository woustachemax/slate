import zod from 'zod'

const z = zod

export const creatUserSchema = z.object({
    username: z.string().min(3).max(20),
    email: z.string().email(),
    password: z.string().min(6).max(20)
})

export const loginUserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(20)
})

export const createRoomSchema = z.object({
    name: z.string().min(3).max(20),
})

