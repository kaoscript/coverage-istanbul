var __ks_coverage = (function(_export) {
	return typeof _export.__ks_coverage === 'undefined' ? _export.__ks_coverage = {} : _export.__ks_coverage;
})(typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : this);
if(!__ks_coverage["/fixtures/compile/xample.evaluate.const.ks"]) {
	__ks_coverage["/fixtures/compile/xample.evaluate.const.ks"] = {"path":"/fixtures/compile/xample.evaluate.const.ks","s":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0},"b":{"1":[0,0],"2":[0,0],"3":[0,0]},"f":{"1":0,"2":0},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":5,"column":1}},"2":{"start":{"line":7,"column":0},"end":{"line":7,"column":11}},"3":{"start":{"line":9,"column":0},"end":{"line":21,"column":1}},"4":{"start":{"line":11,"column":2},"end":{"line":11,"column":27}},"5":{"start":{"line":13,"column":2},"end":{"line":18,"column":3}},"6":{"start":{"line":14,"column":3},"end":{"line":14,"column":55}},"7":{"start":{"line":17,"column":3},"end":{"line":17,"column":21}},"8":{"start":{"line":20,"column":39},"end":{"line":20,"column":106}}},"branchMap":{"1":{"type":"if","line":13,"locations":[{"start":{"line":13,"column":2},"end":{"line":13,"column":2}},{"start":{"line":13,"column":2},"end":{"line":13,"column":2}}]},"2":{"type":"binary-expr","line":13,"locations":[{"start":{"line":13,"column":5},"end":{"line":13,"column":33}},{"start":{"line":13,"column":37},"end":{"line":13,"column":58}}]},"3":{"type":"binary-expr","line":20,"locations":[{"start":{"line":20,"column":39},"end":{"line":20,"column":66}},{"start":{"line":20,"column":70},"end":{"line":20,"column":106}}]}},"fnMap":{"1":{"name":"evaluate","line":10,"loc":{"start":{"line":10,"column":1},"end":{"line":19,"column":2}}},"2":{"name":"startsWith","line":20,"loc":{"start":{"line":20,"column":1},"end":{"line":20,"column":106}}}}};
};
var Type = require("@kaoscript/runtime").Type;
module.exports = function() {
	__ks_coverage["/fixtures/compile/xample.evaluate.const.ks"].s[1]++;
	var __ks_String = {};
	__ks_coverage["/fixtures/compile/xample.evaluate.const.ks"].s[2]++;
	__ks_coverage["/fixtures/compile/xample.evaluate.const.ks"].s[3]++;
	__ks_String.__ks_func_evaluate_0 = function() {
		__ks_coverage["/fixtures/compile/xample.evaluate.const.ks"].f[1]++;
		__ks_coverage["/fixtures/compile/xample.evaluate.const.ks"].s[4]++;
		const value = this.trim();
		__ks_coverage["/fixtures/compile/xample.evaluate.const.ks"].s[5]++;
		if((__ks_coverage["/fixtures/compile/xample.evaluate.const.ks"].b[2][0]++, __ks_String._im_startsWith(value, "function")) || (__ks_coverage["/fixtures/compile/xample.evaluate.const.ks"].b[2][1]++, __ks_String._im_startsWith(value, "{"))) {
			__ks_coverage["/fixtures/compile/xample.evaluate.const.ks"].b[1][0]++;
			__ks_coverage["/fixtures/compile/xample.evaluate.const.ks"].s[6]++;
			return eval("(function(){return " + value + ";})()");
		}
		else {
			__ks_coverage["/fixtures/compile/xample.evaluate.const.ks"].b[1][1]++;
			__ks_coverage["/fixtures/compile/xample.evaluate.const.ks"].s[7]++;
			return eval(value);
		}
	};
	__ks_String.__ks_func_startsWith_0 = function(value) {
		if(arguments.length < 1) {
			throw new SyntaxError("Wrong number of arguments (" + arguments.length + " for 1)");
		}
		if(value === void 0 || value === null) {
			throw new TypeError("'value' is not nullable");
		}
		else if(!Type.isString(value)) {
			throw new TypeError("'value' is not of type 'String'");
		}
		__ks_coverage["/fixtures/compile/xample.evaluate.const.ks"].f[2]++;
		__ks_coverage["/fixtures/compile/xample.evaluate.const.ks"].s[8]++;
		return (__ks_coverage["/fixtures/compile/xample.evaluate.const.ks"].b[3][0]++, this.length >= value.length) && (__ks_coverage["/fixtures/compile/xample.evaluate.const.ks"].b[3][1]++, this.slice(0, value.length) === value);
	};
	__ks_String._im_evaluate = function(that) {
		var args = Array.prototype.slice.call(arguments, 1, arguments.length);
		if(args.length === 0) {
			return __ks_String.__ks_func_evaluate_0.apply(that);
		}
		throw new SyntaxError("Wrong number of arguments");
	};
	__ks_String._im_startsWith = function(that) {
		var args = Array.prototype.slice.call(arguments, 1, arguments.length);
		if(args.length === 1) {
			return __ks_String.__ks_func_startsWith_0.apply(that, args);
		}
		throw new SyntaxError("Wrong number of arguments");
	};
};