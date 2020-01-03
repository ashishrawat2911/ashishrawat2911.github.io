// To parse this data:
//
//   const Convert = require("./file");
//
//   const ashishPortfolio = Convert.toAshishPortfolio(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
function toAshishPortfolio(json) {
    return cast(JSON.parse(json), r("AshishPortfolio"));
}

function ashishPortfolioToJson(value) {
    return JSON.stringify(uncast(value, r("AshishPortfolio")), null, 2);
}

function invalidValue(typ, val) {
    throw Error(`Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`);
}

function jsonToJSProps(typ) {
    if (typ.jsonToJS === undefined) {
        var map = {};
        typ.props.forEach((p) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ) {
    if (typ.jsToJSON === undefined) {
        var map = {};
        typ.props.forEach((p) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val, typ, getProps) {
    function transformPrimitive(typ, val) {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val);
    }

    function transformUnion(typs, val) {
        // val must validate against one typ in typs
        var l = typs.length;
        for (var i = 0; i < l; i++) {
            var typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) {}
        }
        return invalidValue(typs, val);
    }

    function transformEnum(cases, val) {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases, val);
    }

    function transformArray(typ, val) {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue("array", val);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(typ, val) {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue("Date", val);
        }
        return d;
    }

    function transformObject(props, additional, val) {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue("object", val);
        }
        var result = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps);
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val);
    }
    if (typ === false) return invalidValue(typ, val);
    while (typeof typ === "object" && typ.ref !== undefined) {
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
            : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
            : invalidValue(typ, val);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") return transformDate(typ, val);
    return transformPrimitive(typ, val);
}

function cast(val, typ) {
    return transform(val, typ, jsonToJSProps);
}

function uncast(val, typ) {
    return transform(val, typ, jsToJSONProps);
}

function a(typ) {
    return { arrayItems: typ };
}

function u(...typs) {
    return { unionMembers: typs };
}

function o(props, additional) {
    return { props, additional };
}

function m(additional) {
    return { props: [], additional };
}

function r(name) {
    return { ref: name };
}

const typeMap = {
    "AshishPortfolio": o([
        { json: "info", js: "info", typ: r("Info") },
        { json: "timeline", js: "timeline", typ: a(r("Timeline")) },
        { json: "about", js: "about", typ: "" },
        { json: "articles", js: "articles", typ: a(r("Article")) },
        { json: "skills", js: "skills", typ: a(r("Skill")) },
        { json: "talks", js: "talks", typ: a(r("Talk")) },
    ], false),
    "Article": o([
        { json: "name", js: "name", typ: "" },
        { json: "banner_image", js: "banner_image", typ: "" },
        { json: "link", js: "link", typ: "" },
    ], false),
    "Info": o([
        { json: "profile_picture", js: "profile_picture", typ: "" },
        { json: "name", js: "name", typ: "" },
        { json: "short_bio", js: "short_bio", typ: "" },
        { json: "resume", js: "resume", typ: "" },
        { json: "social_profiles", js: "social_profiles", typ: r("SocialProfiles") },
    ], false),
    "SocialProfiles": o([
        { json: "github", js: "github", typ: "" },
        { json: "facebook", js: "facebook", typ: "" },
        { json: "medium", js: "medium", typ: "" },
        { json: "linkedin", js: "linkedin", typ: "" },
        { json: "twitter", js: "twitter", typ: "" },
        { json: "instagram", js: "instagram", typ: "" },
    ], false),
    "Skill": o([
        { json: "name", js: "name", typ: "" },
        { json: "image", js: "image", typ: "" },
        { json: "link", js: "link", typ: "" },
    ], false),
    "Talk": o([
        { json: "talk_name", js: "talk_name", typ: "" },
        { json: "talk_images", js: "talk_images", typ: a("") },
        { json: "talk_description", js: "talk_description", typ: "" },
    ], false),
    "Timeline": o([
        { json: "title", js: "title", typ: "" },
        { json: "description", js: "description", typ: "" },
        { json: "organisation", js: "organisation", typ: "" },
        { json: "duration", js: "duration", typ: "" },
    ], false),
};

module.exports = {
    "ashishPortfolioToJson": ashishPortfolioToJson,
    "toAshishPortfolio": toAshishPortfolio,
};
