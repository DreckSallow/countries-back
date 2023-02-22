import { Border, Language } from "./../../schemas/index";
import { PrismaClient } from "@prisma/client";
import { Country } from "../../schemas";

const prisma = new PrismaClient();

export const getCountryById = async (id: number): Promise<Country> => {
	const country = await prisma.country.findUnique({
		where: {
			id,
		},
		include: {
			borders: {
				include: {
					border: true,
				},
			},
			languages: {
				include: {
					language: true,
				},
			},
			region: true,
		},
	});

	if (!country) {
		throw new Error("The country not exist!");
	}

	return {
		...country,
		borders: country.borders.map((border) => border.border as Border),
		languages: country.languages.map((lan) => lan.language as Language),
	};
};

export const getCountriesMatchName = async (
	name: string,
): Promise<Country[]> => {
	const countries = await prisma.country.findMany({
		where: {
			name: {
				contains: name,
				mode: "insensitive",
			},
		},
		include: {
			borders: {
				include: {
					border: true,
				},
			},
			languages: {
				include: {
					language: true,
				},
			},
			region: true,
		},
	});

	return countries.map((country) => ({
		...country,
		borders: country.borders.map((border) => border.border as Border),
		languages: country.languages.map((lan) => lan.language as Language),
	}));
};

type SortCountries = { alpha?: true; population?: false; area?: false };

export const getAllCountries = async (
	regions: string[],
	languages: string[],
	sort: SortCountries,
): Promise<Country[]> => {
	const orderBy = Object.keys(sort)
		.filter((k) => sort[k as keyof SortCountries])
		.reduce((acc, k) => {
			const key = k as unknown as keyof SortCountries;
			if (key === "alpha") {
				return { ...acc, name: "asc" };
			}
			return { ...acc, [k]: "asc" };
		}, {});

	const countries = await prisma.country.findMany({
		where: {
			region: {
				name: {
					in: regions,
				},
			},
			languages: {
				some: {
					language: {
						name: {
							in: languages,
						},
					},
				},
			},
		},
		include: {
			borders: {
				include: {
					border: true,
				},
			},
			languages: {
				include: {
					language: true,
				},
			},
			region: true,
		},
		orderBy: orderBy,
	});

	return countries.map((country) => ({
		...country,
		borders: country.borders.map((border) => border.border as Border),
		languages: country.languages.map((lan) => lan.language as Language),
	}));
};
