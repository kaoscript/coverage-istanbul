var __ks_coverage = (function(_export) {
	return typeof _export.__ks_coverage === 'undefined' ? _export.__ks_coverage = {} : _export.__ks_coverage;
})(typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : this);
if(!__ks_coverage["/Users/baptiste/Development/Projects/Kaoscript/coverage-istanbul/test/fixtures/compile/xample.degree.ks"]) {
	__ks_coverage["/Users/baptiste/Development/Projects/Kaoscript/coverage-istanbul/test/fixtures/compile/xample.degree.ks"] = {"path":"/Users/baptiste/Development/Projects/Kaoscript/coverage-istanbul/test/fixtures/compile/xample.degree.ks","s":{"1":0,"2":0,"3":0,"4":0,"5":0},"b":{},"f":{"1":0},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":1,"column":26}},"2":{"start":{"line":2,"column":0},"end":{"line":2,"column":26}},"3":{"start":{"line":4,"column":0},"end":{"line":8,"column":1}},"4":{"start":{"line":10,"column":0},"end":{"line":12,"column":1}},"5":{"start":{"line":11,"column":1},"end":{"line":11,"column":30}}},"branchMap":{},"fnMap":{"1":{"name":"degree","line":10,"loc":{"start":{"line":10,"column":0},"end":{"line":12,"column":1}}}}};
};
require("kaoscript/register");
var Type = require("@kaoscript/runtime").Type;
module.exports = function() {
	__ks_coverage["/Users/baptiste/Development/Projects/Kaoscript/coverage-istanbul/test/fixtures/compile/xample.degree.ks"].s[1]++;
	var {Number, __ks_Number} = require("./_number.ks")();
	__ks_coverage["/Users/baptiste/Development/Projects/Kaoscript/coverage-istanbul/test/fixtures/compile/xample.degree.ks"].s[2]++;
	var {String, __ks_String} = require("./_string.ks")();
	__ks_coverage["/Users/baptiste/Development/Projects/Kaoscript/coverage-istanbul/test/fixtures/compile/xample.degree.ks"].s[3]++;
	__ks_coverage["/Users/baptiste/Development/Projects/Kaoscript/coverage-istanbul/test/fixtures/compile/xample.degree.ks"].s[4]++;
	function degree(value) {
		if(value === undefined || value === null) {
			throw new Error("Missing parameter 'value'");
		}
		if(!(Type.isNumber(value) || Type.isString(value))) {
			throw new Error("Invalid type for parameter 'value'");
		}
		__ks_coverage["/Users/baptiste/Development/Projects/Kaoscript/coverage-istanbul/test/fixtures/compile/xample.degree.ks"].f[1]++;
		__ks_coverage["/Users/baptiste/Development/Projects/Kaoscript/coverage-istanbul/test/fixtures/compile/xample.degree.ks"].s[5]++;
		return __ks_Number._im_mod(Type.isNumber(value) ? __ks_Number._im_toInt(value) : __ks_String._im_toInt(value), 360);
	}
}