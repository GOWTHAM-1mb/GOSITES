import { readFile, readdir } from "node:fs/promises";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";

const ajv = new Ajv2020({ allErrors: true, strict: false });
addFormats(ajv);
const schema = JSON.parse(await readFile("plinth/schema/brand-profile.schema.json", "utf8"));
const validate = ajv.compile(schema);
let failures = 0;
for (const name of await readdir("plinth/profiles")) {
  if (!name.endsWith(".profile.json")) continue;
  const profile = JSON.parse(await readFile(`plinth/profiles/${name}`, "utf8"));
  if (!validate(profile)) {
    failures++;
    console.error(name, validate.errors);
  } else console.log(`${name}: valid`);
}
process.exitCode = failures ? 1 : 0;
