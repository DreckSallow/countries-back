const countryQueries = `
  countries(languages:[String],regions:[String],sort:SortCountry): [Country]!
  getCountryByName(name:String!): Country
  getCountryById(id:Int!): Country
  getCountriesMatchName(name:String): [Country]
`;

const languajeQueries = `
  getLanguages : [Language]!
`;

const regionQueries = `
  getRegions : [Region]!
`;

export const Query = `
  type Query{
		${countryQueries}
		${languajeQueries}
		${regionQueries}
	}
`;
