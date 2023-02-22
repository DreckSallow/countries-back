import dotenv from "dotenv";

dotenv.config();

export const Config = {
	server: {
		PORT: process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 3002,
	},
};
