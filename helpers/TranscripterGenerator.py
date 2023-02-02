DATA = "./helpers/data.csv"
OUTPUT = "./MatAppClient/src/misc/transcripter.ts"
#get data as string
data = open(DATA, "r").readlines()
data.pop(0)
dataText = ""
for line in data:
    dat = line.replace("\n","").split(",")
    dataText += "\""+dat[0] + "\": {english: \""+dat[1]+"\", czech: \""+dat[2]+"\" },"

fullText = """import { LanguageType } from "../types";

//see TranscripterGenerator.py that creates this file
const data: { [key: string]: { [key: string]: string } } = {
""" + dataText + """
};

export const Translate = (txt: string, lang: LanguageType): string => {
	const newtxt = `${txt}`.toLowerCase();
	if (data[newtxt] !== undefined) {
		return data[newtxt][lang];
	}
	return txt;
};
"""
open(OUTPUT, "w").write(fullText)