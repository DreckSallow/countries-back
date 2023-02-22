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
import { Config } from "./config";

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
		port: Config.server.PORT,
	},
})
	.then((res) => {
		console.log("Server running on the port: ", Config.server.PORT);
	})
	.catch((err) => {
		console.log(err);
	});
