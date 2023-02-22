import { PrismaClient } from "@prisma/client";
import type { Region } from "../../schemas";

const prisma = new PrismaClient();

export const getAllRegions = async (): Promise<Region[]> => {
	const regions = await prisma.region.findMany({
		select: {
			id: true,
			name: true,
		},
	});
	return regions;
};
