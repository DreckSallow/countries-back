export interface Country {
	id: number;
	name: string;
	independent: boolean;
	capital: string | null;
	area: number;
	icon_flag: string | null;
	population: number;
	image: string;
	fifa_name: string | null;
	languages: Language[];
	borders: Border[];
	region: Region;
	regionId: number | null;
}

export interface Language {
	id: number;
	name: string;
}

export interface Border {
	id: number;
	initials: string;
}

export interface Region {
	id: number;
	name: string;
	country?: Country[];
}

export type WithTimeStamps<T> = T & {
	createdAt: number;
	updatedAt: number;
};
