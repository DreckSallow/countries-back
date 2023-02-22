import { PrismaClient } from "@prisma/client";
import type { Language } from "../../schemas";

const prisma = new PrismaClient();

export const getAllLanguages = async (): Promise<Language[]> => {
	const languages = await prisma.language.findMany({
		select: {
			id: true,
			name: true,
		},
	});
	return languages;
};
