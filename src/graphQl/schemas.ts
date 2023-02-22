export const RegionType = `
	type Region {
		id: ID!
    name: String
	}
`;

export const BorderType = `
	type Border {
		id: ID!
		initials: String
	}
`;

export const LanguageType = `
	type Language {
		id: ID!
		name: String
	}
`;

export const CountryType = `

	type Country {
		id: ID!
		name: String!
		independent: Boolean!
		capital: String
		area: Float
		icon_flag: String
		population: Int
		image: String
		fifa: String
		borders: [Border]
		languages: [Language]
		region: Region
		regionId: Int
	}
`;

export const Inputs = `
  input SortCountry{
		alpha: Boolean
		population: Boolean
		area: Boolean
	}
`;
