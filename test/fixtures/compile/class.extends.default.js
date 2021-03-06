var __ks_coverage = (function(_export) {
	return typeof _export.__ks_coverage === 'undefined' ? _export.__ks_coverage = {} : _export.__ks_coverage;
})(typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : this);
if(!__ks_coverage["/fixtures/compile/class.extends.default.ks"]) {
	__ks_coverage["/fixtures/compile/class.extends.default.ks"] = {"path":"/fixtures/compile/class.extends.default.ks","s":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0},"b":{},"f":{"1":0,"2":0,"3":0,"4":0},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":1,"column":14}},"2":{"start":{"line":3,"column":0},"end":{"line":13,"column":1}},"3":{"start":{"line":11,"column":2},"end":{"line":11,"column":11}},"4":{"start":{"line":15,"column":0},"end":{"line":23,"column":1}},"5":{"start":{"line":17,"column":2},"end":{"line":17,"column":14}},"6":{"start":{"line":21,"column":2},"end":{"line":21,"column":45}},"7":{"start":{"line":25,"column":0},"end":{"line":25,"column":30}},"8":{"start":{"line":27,"column":0},"end":{"line":27,"column":21}}},"branchMap":{},"fnMap":{"1":{"name":"constructor","line":8,"loc":{"start":{"line":8,"column":1},"end":{"line":8,"column":20}}},"2":{"name":"draw","line":10,"loc":{"start":{"line":10,"column":1},"end":{"line":12,"column":2}}},"3":{"name":"constructor","line":16,"loc":{"start":{"line":16,"column":1},"end":{"line":18,"column":2}}},"4":{"name":"draw","line":20,"loc":{"start":{"line":20,"column":1},"end":{"line":22,"column":2}}}}};
};
var Type = require("@kaoscript/runtime").Type;
module.exports = function() {
	__ks_coverage["/fixtures/compile/class.extends.default.ks"].s[1]++;
	__ks_coverage["/fixtures/compile/class.extends.default.ks"].s[2]++;
	class Shape {
		constructor() {
			this.__ks_init();
			this.__ks_cons(arguments);
		}
		__ks_init() {
		}
		__ks_cons_0(color) {
			if(arguments.length < 1) {
				throw new SyntaxError("Wrong number of arguments (" + arguments.length + " for 1)");
			}
			if(color === void 0 || color === null) {
				throw new TypeError("'color' is not nullable");
			}
			else if(!Type.isString(color)) {
				throw new TypeError("'color' is not of type 'String'");
			}
			this._color = color;
			__ks_coverage["/fixtures/compile/class.extends.default.ks"].f[1]++;
		}
		__ks_cons(args) {
			if(args.length === 1) {
				Shape.prototype.__ks_cons_0.apply(this, args);
			}
			else {
				throw new SyntaxError("Wrong number of arguments");
			}
		}
		__ks_func_draw_0() {
			__ks_coverage["/fixtures/compile/class.extends.default.ks"].f[2]++;
			__ks_coverage["/fixtures/compile/class.extends.default.ks"].s[3]++;
			return "";
		}
		draw() {
			if(arguments.length === 0) {
				return Shape.prototype.__ks_func_draw_0.apply(this);
			}
			throw new SyntaxError("Wrong number of arguments");
		}
	}
	__ks_coverage["/fixtures/compile/class.extends.default.ks"].s[4]++;
	class Rectangle extends Shape {
		__ks_init() {
			Shape.prototype.__ks_init.call(this);
		}
		__ks_cons_0(color) {
			if(arguments.length < 1) {
				throw new SyntaxError("Wrong number of arguments (" + arguments.length + " for 1)");
			}
			if(color === void 0 || color === null) {
				throw new TypeError("'color' is not nullable");
			}
			else if(!Type.isString(color)) {
				throw new TypeError("'color' is not of type 'String'");
			}
			__ks_coverage["/fixtures/compile/class.extends.default.ks"].f[3]++;
			__ks_coverage["/fixtures/compile/class.extends.default.ks"].s[5]++;
			Shape.prototype.__ks_cons.call(this, [color]);
		}
		__ks_cons(args) {
			if(args.length === 1) {
				Rectangle.prototype.__ks_cons_0.apply(this, args);
			}
			else {
				throw new SyntaxError("Wrong number of arguments");
			}
		}
		__ks_func_draw_0() {
			__ks_coverage["/fixtures/compile/class.extends.default.ks"].f[4]++;
			__ks_coverage["/fixtures/compile/class.extends.default.ks"].s[6]++;
			return "I'm drawing a " + this._color + " rectangle.";
		}
		draw() {
			if(arguments.length === 0) {
				return Rectangle.prototype.__ks_func_draw_0.apply(this);
			}
			return Shape.prototype.draw.apply(this, arguments);
		}
	}
	__ks_coverage["/fixtures/compile/class.extends.default.ks"].s[7]++;
	let r = new Rectangle("black");
	__ks_coverage["/fixtures/compile/class.extends.default.ks"].s[8]++;
	console.log(r.draw());
};