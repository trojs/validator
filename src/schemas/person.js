import addressSchema from "./address.js";
import companySchema from "./company.js";

export default {
    name: "string",
    age: "number",
    siblings: "array",
    metaData: "?object",
    active: "boolean",
    address: addressSchema,
    companies: companySchema
};
