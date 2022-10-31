import { LanguageType } from "../types";

//see TranscripterGenerator.py that creates this file
const data: { [key: string]: { [key: string]: string } } = {
	user: { english: "User", czech: "Uživatel" },
	users: { english: "Users", czech: "Uživatelé" },
	uname: { english: "Username", czech: "Uživatelské jméno" },
	name: { english: "Name", czech: "Název" },
	branchname: { english: "Branch name", czech: "Název pobočky" },
	password: { english: "Password", czech: "Heslo" },
	access: { english: "Access", czech: "Práva" },
	branches: { english: "Branches", czech: "Pobočky" },
	tables: { english: "Tables", czech: "Tabulky" },
	ingreidents: { english: "Ingreidents", czech: "Ingredience" },
	dishes: { english: "Dishes", czech: "Pokrmy" },
	information: { english: "Information", czech: "Informace" },
	reports: { english: "Reports", czech: "Účtenky" },
	storage: { english: "Storage", czech: "Sklad" },
	"branches storage": { english: "Branches Storage", czech: "Sklad poboček" },
	location: { english: "Location", czech: "Lokace" },
	all: { english: "All", czech: "Všechny" },
	category: { english: "Category", czech: "Katergorie" },
	add: { english: "Add", czech: "Přidat" },
	edit: { english: "Edit", czech: "Upravit" },
	delete: { english: "Delete", czech: "Odstranit" },
	"filter category": { english: "Filter Category", czech: " Filtrace Katergorií" },
};

export const Translate = (txt: string, lang: LanguageType): string => {
	const newtxt = `${txt}`.toLowerCase();
	if (data[newtxt] !== undefined) {
		return data[newtxt][lang];
	}
	return txt;
};
