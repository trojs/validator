import addressSchema from "./address.js";

export default {
    name: "string",
    age: "number",
    siblings: "array",
    metaData: "?object",
    active: "boolean",
    address: addressSchema
};
