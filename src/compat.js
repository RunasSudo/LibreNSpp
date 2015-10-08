m4_define(`replaceFunction', `if (typeof $2=="function") { $1 = $2; console.log("Using $2"); } else { $1 = $3; console.log("Using $3"); }')

var NS_getValue, NS_setValue, NS_deleteValue, NS_listValues;

function LS_getValue(key, def) {
    return localStorage.getItem(key) || def;
}

function LS_getValueBool(key, def) { // Comparing strings and booleans is hard :(
    if (localStorage.getItem(key) == null) {
        return def;
    } else {
        return localStorage.getItem(key) == "true"
            || localStorage.getItem(key) === true;
    }
}

function LS_setValue(key, val) {
    return localStorage.setItem(key, val);
}

function LS_deleteValue(key) {
    return localStorage.removeItem(key);
}

function LS_listValues() {
    var list = [];
    for (var i = 0, len = localStorage.length; i < len; i++) {
        list.push(localStorage.key(i));
    }
    return list;
}

function GM_getValueBool(key, def) {
    console.log(key + " " + GM_getValue(key))
    if (GM_getValue(key) == undefined) {
        return def;
    } else {
        return GM_getValue(key) == "true"
            || GM_getValue(key) === true;
    }
}

replaceFunction(NS_getValue, GM_getValue, LS_getValue);
if (typeof GM_getValue == "function") { NS_getValueBool = GM_getValueBool; } else { NS_getValueBool = LS_getValueBool; }
replaceFunction(NS_setValue, GM_setValue, LS_setValue);
replaceFunction(NS_deleteValue, GM_deleteValue, LS_deleteValue);
replaceFunction(NS_listValues, GM_listValues, LS_listValues);
