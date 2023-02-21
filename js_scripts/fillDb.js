const fs = require("fs/promises");
const { PrismaClient } = require("@prisma/client");

const path_to_seed = `${__dirname}/../json/countries.json`;

const read_data = async () => {
  const content = await fs.readFile(path_to_seed, "utf8");
  return JSON.parse(content);
};

const prisma = new PrismaClient();

const getLanguages = (obj) => {
  return Object.values(obj).map((language) => ({
    where: {
      name: language,
    },
    create: {
      name: language,
    },
  }));
};

const getBorders = (borders) => {
  return borders.map((border) => ({
    where: {
      initials: border,
    },
    create: {
      initials: border,
    },
  }));
};

const createCountry = async (country) => {
  return await prisma.country.create({
    data: {
      name: country["name"],
      area: country["area"] ?? 0,
      image: country["flag"],
      population: country["population"] ?? 0,
      capital: country["capital"],
      fifa_name: country["fifa"],
      independent: country["independent"],
      icon_flag: country["iconFlag"],
      region: {
        connectOrCreate: {
          where: {
            name: country["region"],
          },
          create: {
            name: country["region"],
          },
        },
      },
      languages: {
        connectOrCreate: getLanguages(country["languages"] ?? {}),
      },
      borders: {
        connectOrCreate: getBorders(country["borders"] ?? []),
      },
    },
  });
};

const fillDb = async () => {
  const countries = await read_data();

  for (let i = 0; i < countries.length; i++) {
    await createCountry(countries[i]);
  }
};

fillDb()
  .then(() => {
    console.log("✨ The database was filled");
  })
  .catch((e) => {
    console.log(e);
  });
