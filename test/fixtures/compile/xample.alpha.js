var __ks_coverage = (function(_export) {
	return typeof _export.__ks_coverage === 'undefined' ? _export.__ks_coverage = {} : _export.__ks_coverage;
})(typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : this);
if(!__ks_coverage["/fixtures/compile/xample.alpha.ks"]) {
	__ks_coverage["/fixtures/compile/xample.alpha.ks"] = {"path":"/fixtures/compile/xample.alpha.ks","s":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0},"b":{"1":[0,0],"2":[0,0]},"f":{"1":0},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":1,"column":20}},"2":{"start":{"line":2,"column":0},"end":{"line":2,"column":21}},"3":{"start":{"line":4,"column":0},"end":{"line":8,"column":1}},"4":{"start":{"line":10,"column":0},"end":{"line":14,"column":1}},"5":{"start":{"line":11,"column":1},"end":{"line":11,"column":31}},"6":{"start":{"line":13,"column":1},"end":{"line":13,"column":74}}},"branchMap":{"1":{"type":"cond-expr","line":13,"locations":[{"start":{"line":13,"column":8},"end":{"line":13,"column":9}},{"start":{"line":13,"column":27},"end":{"line":13,"column":74}}]},"2":{"type":"cond-expr","line":13,"locations":[{"start":{"line":13,"column":41},"end":{"line":13,"column":48}},{"start":{"line":13,"column":51},"end":{"line":13,"column":52}}]}},"fnMap":{"1":{"name":"alpha","line":10,"loc":{"start":{"line":10,"column":0},"end":{"line":14,"column":1}}}}};
};
require("kaoscript/register");
module.exports = function() {
	__ks_coverage["/fixtures/compile/xample.alpha.ks"].s[1]++;
	var Float = require("./_float.ks")().Float;
	__ks_coverage["/fixtures/compile/xample.alpha.ks"].s[2]++;
	var {Number, __ks_Number} = require("./_number.ks")();
	__ks_coverage["/fixtures/compile/xample.alpha.ks"].s[3]++;
	__ks_coverage["/fixtures/compile/xample.alpha.ks"].s[4]++;
	function alpha(n, percentage) {
		if(arguments.length < 1) {
			throw new SyntaxError("Wrong number of arguments (" + arguments.length + " for 1)");
		}
		if(n === void 0) {
			n = null;
		}
		if(percentage === void 0 || percentage === null) {
			percentage = false;
		}
		__ks_coverage["/fixtures/compile/xample.alpha.ks"].f[1]++;
		__ks_coverage["/fixtures/compile/xample.alpha.ks"].s[5]++;
		let i = Float.parse(n);
		__ks_coverage["/fixtures/compile/xample.alpha.ks"].s[6]++;
		return Number.isNaN(i) ? (__ks_coverage["/fixtures/compile/xample.alpha.ks"].b[1][0]++, 1) : (__ks_coverage["/fixtures/compile/xample.alpha.ks"].b[1][1]++, __ks_Number._im_round(__ks_Number._im_limit((percentage === true) ? (__ks_coverage["/fixtures/compile/xample.alpha.ks"].b[2][0]++, i / 100) : (__ks_coverage["/fixtures/compile/xample.alpha.ks"].b[2][1]++, i), 0, 1), 3));
	}
};