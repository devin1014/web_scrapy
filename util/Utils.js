class ArrayUtil {

    constructor() {
    }

    static last(obj) {
        if (obj instanceof Array) {
            return obj[obj.length - 1];
        } else {
            return obj;
        }
    }
}

module.exports.ArrayUtil = ArrayUtil

module.exports.merge = function (defaults, options) {
    defaults = defaults || {};
    if (options && typeof options === 'object') {
        var i = 0,
            keys = Object.keys(options);

        for (i = 0; i < keys.length; i += 1) {
            if (options[keys[i]] !== undefined) {
                defaults[keys[i]] = options[keys[i]];
            }
        }
    }
    return defaults;
};

