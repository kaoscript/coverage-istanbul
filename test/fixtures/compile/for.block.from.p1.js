var __ks_coverage = (function(_export) {
	return typeof _export.__ks_coverage === 'undefined' ? _export.__ks_coverage = {} : _export.__ks_coverage;
})(typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : this);
if(!__ks_coverage["/fixtures/compile/for.block.from.p1.ks"]) {
	__ks_coverage["/fixtures/compile/for.block.from.p1.ks"] = {"path":"/fixtures/compile/for.block.from.p1.ks","s":{"1":0,"2":0,"3":0},"b":{},"f":{},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":3,"column":1}},"2":{"start":{"line":5,"column":0},"end":{"line":7,"column":1}},"3":{"start":{"line":6,"column":1},"end":{"line":6,"column":15}}},"branchMap":{},"fnMap":{}};
};
module.exports = function() {
	__ks_coverage["/fixtures/compile/for.block.from.p1.ks"].s[1]++;
	__ks_coverage["/fixtures/compile/for.block.from.p1.ks"].s[2]++;
	for(let x = 0; x <= 10; ++x) {
		__ks_coverage["/fixtures/compile/for.block.from.p1.ks"].s[3]++;
		console.log(x);
	}
};