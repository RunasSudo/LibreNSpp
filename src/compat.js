m4_define(`replaceFunction', `if (typeof $2=="function") { if ($2.toString && $2.toString().indexOf("not supported") > -1) { $1 = $3; } else { $1 = $2; } } else { $1 = $3; }')

var NS_getValue, NS_setValue, NS_deleteValue, NS_listValues;

function LS_getValue(key, def) {
    return localStorage.getItem(key) || def;
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

replaceFunction(NS_getValue, GM_getValue, LS_getValue);
replaceFunction(NS_setValue, GM_setValue, LS_setValue);
replaceFunction(NS_deleteValue, GM_deleteValue, LS_deleteValue);
replaceFunction(NS_listValues, GM_listValues, LS_listValues);
