import { LanguageType } from "../types";

//see TranscripterGenerator.py that creates this file
const data: { [key: string]: { [key: string]: string } } = {
	user: { english: "User", czech: "Uživatel" },
	users: { english: "Users", czech: "Uživatelé" },
	uname: { english: "Username", czech: "Uživatelské jméno" },
	name: { english: "Name", czech: "Název" },
	branchname: { english: "Branch name", czech: "Název pobočky" },
};

export const Translate = (txt: string, lang: LanguageType): string => {
	txt = `${txt}`.toLowerCase();
	if (data[txt] !== undefined) {
		return data[txt][lang];
	}
	return txt;
};
