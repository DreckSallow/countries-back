import { PrismaClient } from "@prisma/client";
import { Border } from "../../schemas";

const prisma = new PrismaClient();

export const getAllBorders = async (): Promise<Border[]> => {
	const borders = await prisma.border.findMany();
	return borders;
};
