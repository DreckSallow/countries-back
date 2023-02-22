import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { getAllRegions } from "./controllers/region/controller";
import {
	getAllCountries,
	getCountriesMatchName,
	getCountryById,
} from "./controllers/country/controller";
import typeDefs from "./graphQl/index";
import { getAllLanguages } from "./controllers/language/controller";

const server = new ApolloServer({
	typeDefs,
	resolvers: {
		Query: {
			countries: (_, args) => {
				return getAllCountries(args.regions, args.languages, args.sort);
			},
			getCountryByName: (_, args) => [],
			getCountryById: (_, args) => getCountryById(args.id),
			getCountriesMatchName: (_, args) => getCountriesMatchName(args.name),
			getLanguages: getAllLanguages,
			getRegions: getAllRegions,
		},
	},
});

startStandaloneServer(server, {
	listen: {
		port: 3000,
	},
})
	.then((res) => {
		console.log("Server running at: ", res.url);
	})
	.catch((err) => {
		console.log(err);
	});
