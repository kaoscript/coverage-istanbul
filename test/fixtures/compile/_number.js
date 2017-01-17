var __ks_coverage = (function(_export) {
	return typeof _export.__ks_coverage === 'undefined' ? _export.__ks_coverage = {} : _export.__ks_coverage;
})(typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : this);
if(!__ks_coverage["/Users/baptiste/Development/Projects/Kaoscript/coverage-istanbul/test/fixtures/compile/_number.ks"]) {
	__ks_coverage["/Users/baptiste/Development/Projects/Kaoscript/coverage-istanbul/test/fixtures/compile/_number.ks"] = {"path":"/Users/baptiste/Development/Projects/Kaoscript/coverage-istanbul/test/fixtures/compile/_number.ks","s":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0,"13":0,"14":0,"15":0},"b":{"1":[0,0],"2":[0,0],"3":[0,0]},"f":{"1":0,"2":0,"3":0,"4":0,"5":0},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":1,"column":40}},"2":{"start":{"line":3,"column":0},"end":{"line":4,"column":1}},"3":{"start":{"line":6,"column":0},"end":{"line":30,"column":1}},"4":{"start":{"line":8,"column":2},"end":{"line":8,"column":63}},"5":{"start":{"line":11,"column":2},"end":{"line":22,"column":3}},"6":{"start":{"line":12,"column":3},"end":{"line":12,"column":11}},"7":{"start":{"line":15,"column":3},"end":{"line":15,"column":21}},"8":{"start":{"line":16,"column":3},"end":{"line":21,"column":4}},"9":{"start":{"line":17,"column":4},"end":{"line":17,"column":18}},"10":{"start":{"line":20,"column":4},"end":{"line":20,"column":12}},"11":{"start":{"line":25,"column":2},"end":{"line":25,"column":48}},"12":{"start":{"line":26,"column":2},"end":{"line":26,"column":49}},"13":{"start":{"line":28,"column":22},"end":{"line":28,"column":38}},"14":{"start":{"line":29,"column":29},"end":{"line":29,"column":49}},"15":{"start":{"line":32,"column":0},"end":{"line":32,"column":13}}},"branchMap":{"1":{"type":"cond-expr","line":8,"locations":[{"start":{"line":8,"column":23},"end":{"line":8,"column":26}},{"start":{"line":8,"column":29},"end":{"line":8,"column":63}}]},"2":{"type":"if","line":11,"locations":[{"start":{"line":11,"column":2},"end":{"line":11,"column":2}},{"start":{"line":11,"column":2},"end":{"line":11,"column":2}}]},"3":{"type":"if","line":16,"locations":[{"start":{"line":16,"column":3},"end":{"line":16,"column":3}},{"start":{"line":16,"column":3},"end":{"line":16,"column":3}}]}},"fnMap":{"1":{"name":"limit","line":7,"loc":{"start":{"line":7,"column":1},"end":{"line":9,"column":2}}},"2":{"name":"mod","line":10,"loc":{"start":{"line":10,"column":1},"end":{"line":23,"column":2}}},"3":{"name":"round","line":24,"loc":{"start":{"line":24,"column":1},"end":{"line":27,"column":2}}},"4":{"name":"toFloat","line":28,"loc":{"start":{"line":28,"column":1},"end":{"line":28,"column":38}}},"5":{"name":"toInt","line":29,"loc":{"start":{"line":29,"column":1},"end":{"line":29,"column":49}}}}};
};
var Helper = require("@kaoscript/runtime").Helper;
module.exports = function() {
	__ks_coverage["/Users/baptiste/Development/Projects/Kaoscript/coverage-istanbul/test/fixtures/compile/_number.ks"].s[1]++;
	__ks_coverage["/Users/baptiste/Development/Projects/Kaoscript/coverage-istanbul/test/fixtures/compile/_number.ks"].s[2]++;
	var __ks_Number = {};
	__ks_coverage["/Users/baptiste/Development/Projects/Kaoscript/coverage-istanbul/test/fixtures/compile/_number.ks"].s[3]++;
	Helper.newInstanceMethod({
		class: Number,
		name: "limit",
		sealed: __ks_Number,
		function: function(min, max) {
			if(min === undefined || min === null) {
				throw new Error("Missing parameter 'min'");
			}
			if(max === undefined || max === null) {
				throw new Error("Missing parameter 'max'");
			}
			__ks_coverage["/Users/baptiste/Development/Projects/Kaoscript/coverage-istanbul/test/fixtures/compile/_number.ks"].f[1]++;
			__ks_coverage["/Users/baptiste/Development/Projects/Kaoscript/coverage-istanbul/test/fixtures/compile/_number.ks"].s[4]++;
			return isNaN(this) ? (__ks_coverage["/Users/baptiste/Development/Projects/Kaoscript/coverage-istanbul/test/fixtures/compile/_number.ks"].b[1][0]++, min) : (__ks_coverage["/Users/baptiste/Development/Projects/Kaoscript/coverage-istanbul/test/fixtures/compile/_number.ks"].b[1][1]++, Math.min(max, Math.max(min, this)));
		},
		signature: {
			access: 3,
			min: 2,
			max: 2,
			parameters: [
				{
					type: "Any",
					min: 2,
					max: 2
				}
			]
		}
	});
	Helper.newInstanceMethod({
		class: Number,
		name: "mod",
		sealed: __ks_Number,
		function: function(max) {
			if(max === undefined || max === null) {
				throw new Error("Missing parameter 'max'");
			}
			__ks_coverage["/Users/baptiste/Development/Projects/Kaoscript/coverage-istanbul/test/fixtures/compile/_number.ks"].f[2]++;
			__ks_coverage["/Users/baptiste/Development/Projects/Kaoscript/coverage-istanbul/test/fixtures/compile/_number.ks"].s[5]++;
			if(isNaN(this)) {
				__ks_coverage["/Users/baptiste/Development/Projects/Kaoscript/coverage-istanbul/test/fixtures/compile/_number.ks"].b[2][0]++;
				__ks_coverage["/Users/baptiste/Development/Projects/Kaoscript/coverage-istanbul/test/fixtures/compile/_number.ks"].s[6]++;
				return 0;
			}
			else {
				__ks_coverage["/Users/baptiste/Development/Projects/Kaoscript/coverage-istanbul/test/fixtures/compile/_number.ks"].b[2][1]++;
				__ks_coverage["/Users/baptiste/Development/Projects/Kaoscript/coverage-istanbul/test/fixtures/compile/_number.ks"].s[7]++;
				let n = this % max;
				__ks_coverage["/Users/baptiste/Development/Projects/Kaoscript/coverage-istanbul/test/fixtures/compile/_number.ks"].s[8]++;
				if(n < 0) {
					__ks_coverage["/Users/baptiste/Development/Projects/Kaoscript/coverage-istanbul/test/fixtures/compile/_number.ks"].b[3][0]++;
					__ks_coverage["/Users/baptiste/Development/Projects/Kaoscript/coverage-istanbul/test/fixtures/compile/_number.ks"].s[9]++;
					return n + max;
				}
				else {
					__ks_coverage["/Users/baptiste/Development/Projects/Kaoscript/coverage-istanbul/test/fixtures/compile/_number.ks"].b[3][1]++;
					__ks_coverage["/Users/baptiste/Development/Projects/Kaoscript/coverage-istanbul/test/fixtures/compile/_number.ks"].s[10]++;
					return n;
				}
			}
		},
		signature: {
			access: 3,
			min: 1,
			max: 1,
			parameters: [
				{
					type: "Any",
					min: 1,
					max: 1
				}
			]
		}
	});
	Helper.newInstanceMethod({
		class: Number,
		name: "round",
		sealed: __ks_Number,
		function: function(precision) {
			if(precision === undefined || precision === null) {
				precision = 0;
			}
			__ks_coverage["/Users/baptiste/Development/Projects/Kaoscript/coverage-istanbul/test/fixtures/compile/_number.ks"].f[3]++;
			__ks_coverage["/Users/baptiste/Development/Projects/Kaoscript/coverage-istanbul/test/fixtures/compile/_number.ks"].s[11]++;
			precision = Math.pow(10, precision).toFixed(0);
			__ks_coverage["/Users/baptiste/Development/Projects/Kaoscript/coverage-istanbul/test/fixtures/compile/_number.ks"].s[12]++;
			return Math.round(this * precision) / precision;
		},
		signature: {
			access: 3,
			min: 0,
			max: 1,
			parameters: [
				{
					type: "Any",
					min: 0,
					max: 1
				}
			]
		}
	});
	Helper.newInstanceMethod({
		class: Number,
		name: "toFloat",
		sealed: __ks_Number,
		function: function() {
			__ks_coverage["/Users/baptiste/Development/Projects/Kaoscript/coverage-istanbul/test/fixtures/compile/_number.ks"].f[4]++;
			__ks_coverage["/Users/baptiste/Development/Projects/Kaoscript/coverage-istanbul/test/fixtures/compile/_number.ks"].s[13]++;
			return parseFloat(this);
		},
		signature: {
			access: 3,
			min: 0,
			max: 0,
			parameters: []
		}
	});
	Helper.newInstanceMethod({
		class: Number,
		name: "toInt",
		sealed: __ks_Number,
		function: function(base) {
			if(base === undefined || base === null) {
				base = 10;
			}
			__ks_coverage["/Users/baptiste/Development/Projects/Kaoscript/coverage-istanbul/test/fixtures/compile/_number.ks"].f[5]++;
			__ks_coverage["/Users/baptiste/Development/Projects/Kaoscript/coverage-istanbul/test/fixtures/compile/_number.ks"].s[14]++;
			return parseInt(this, base);
		},
		signature: {
			access: 3,
			min: 0,
			max: 1,
			parameters: [
				{
					type: "Any",
					min: 0,
					max: 1
				}
			]
		}
	});
	__ks_coverage["/Users/baptiste/Development/Projects/Kaoscript/coverage-istanbul/test/fixtures/compile/_number.ks"].s[15]++;
	return {
		Number: Number,
		__ks_Number: __ks_Number
	};
}