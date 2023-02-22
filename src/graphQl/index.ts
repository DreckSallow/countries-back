import {
	BorderType,
	CountryType,
	Inputs,
	LanguageType,
	RegionType,
} from "./schemas";

import { Query } from "./queries";

const TypeDefs = `
  ${BorderType}
  ${CountryType}
  ${Inputs}
  ${LanguageType}
  ${RegionType}
  ${Query}
`;

export default TypeDefs;
