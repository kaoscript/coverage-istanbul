/**
 * coverage.ks
 * Version 0.1.0
 * January 11th, 2017
 *
 * Copyright (c) 2017 Baptiste Augrain
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 **/
#![cfg(error='off')]

import {
	*	from @kaoscript/ast
	*	from kaoscript
}

extern console, Error: class, JSON

func $block(init, data, coverage, coverageName, file, node) { // {{{
	if data.kind == NodeKind::Block {
		data.statements = [].concat(init, $compile.statements(data.statements, coverage, coverageName, file, node))
		
		return data
	}
	else {
		return {
			kind: NodeKind::Block
			statements: [].concat(init, $compile.statements([data], coverage, coverageName, file, node))
		}
	}
} // }}}

func $body(data) { // {{{
	if data.kind == NodeKind::Block {
		return data 
	}
	else {
		return {
			kind: NodeKind::Block
			statements: [
				{
					kind: NodeKind::ReturnStatement
					value: data
					start: data.start
					end: data.end
				}
			]
		}
	}
} // }}}

const $compile = {
	expression(data, coverage, coverageName, file, node) { // {{{
		//console.log('expression', data.kind)
		return $expressions[data.kind](data, coverage, coverageName, file, node)
	} // }}}
	statements(statements, coverage, coverageName, file, node) { // {{{
		const result = []
		
		for statement in statements {
			let sid = coverage.statementMap.length + 1
			
			coverage.statementMap.push({
				start: {
					line: statement.start.line
					column: statement.start.column - 1
				}
				end: {
					line: statement.end.line
					column: statement.end.column - 1
				}
			})
			
			result.push({
				kind: NodeKind::UnaryExpression
				operator: {
					kind: UnaryOperatorKind::IncrementPostfix
				}
				argument: {
					kind: NodeKind::MemberExpression
					object: {
						kind: NodeKind::MemberExpression
						object: {
							kind: NodeKind::MemberExpression
							object: {
								kind: NodeKind::Identifier
								name: coverageName
							}
							property: {
								kind: NodeKind::Literal
								value: file
							}
							computed: true
							nullable: false
						}
						property: {
							kind: NodeKind::Identifier
							name: 's'
						}
						computed: false
						nullable: false
					}
					property: {
						kind: NodeKind::NumericExpression
						value: sid
					}
					computed: true
					nullable: false
				}
				attributes: []
			})
			
			//console.log('statement', statement.kind)
			if $statements[statement.kind]? {
				result.push($statements[statement.kind](statement, coverage, coverageName, file, node))
			}
			else {
				result.push($expressions[statement.kind](statement, coverage, coverageName, file, node))
			}
		}
		
		return result
	} // }}}
}

const $expressions = {
	`\(NodeKind::ArrayComprehension)`(data, coverage, coverageName, file, node) => data
	`\(NodeKind::ArrayExpression)`(data, coverage, coverageName, file, node) { // {{{
		data.values = [$compile.expression(value, coverage, coverageName, file, node) for value in data.values]
		
		return data
	} // }}}
	`\(NodeKind::ArrayRange)`(data, coverage, coverageName, file, node) => data
	`\(NodeKind::BinaryExpression)`(data, coverage, coverageName, file, node) { // {{{
		if data.operator.kind == BinaryOperatorKind::And || data.operator.kind == BinaryOperatorKind::Or {
			let bid = coverage.branchMap.length + 1
			
			coverage.branchMap.push({
				type: 'binary-expr'
				line: data.start.line
				locations: [
					{
						start: {
							line: data.left.start.line
							column: data.left.start.column - 1
						}
						end: {
							line: data.left.end.line
							column: data.left.end.column - 1
						}
					}
					{
						start: {
							line: data.right.start.line
							column: data.right.start.column - 1
						}
						end: {
							line: data.right.end.line
							column: data.right.end.column - 1
						}
					}
				]
			})
			
			data.left = $sequence($increment.branch(bid, 0, coverageName, file), data.left, coverage, coverageName, file, node)
			data.right = $sequence($increment.branch(bid, 1, coverageName, file), data.right, coverage, coverageName, file, node)
		}
		else {
			data.left = $compile.expression(data.left, coverage, coverageName, file, node)
			data.right = $compile.expression(data.right, coverage, coverageName, file, node)
		}
		
		return data
	} // }}}
	`\(NodeKind::CallExpression)`(data, coverage, coverageName, file, node) { // {{{
		data.callee = $compile.expression(data.callee, coverage, coverageName, file, node)
		data.arguments = [$compile.expression(argument, coverage, coverageName, file, node) for argument in data.arguments]
		
		return data
	} // }}}
	`\(NodeKind::ConditionalExpression)`(data, coverage, coverageName, file, node) { // {{{
		let bid = coverage.branchMap.length + 1
		
		coverage.branchMap.push({
			type: 'cond-expr'
			line: data.start.line
			locations: [
				{
					start: {
						line: data.whenTrue.start.line
						column: data.whenTrue.start.column - 1
					}
					end: {
						line: data.whenTrue.end.line
						column: data.whenTrue.end.column - 1
					}
				}
				{
					start: {
						line: data.whenFalse.start.line
						column: data.whenFalse.start.column - 1
					}
					end: {
						line: data.whenFalse.end.line
						column: data.whenFalse.end.column - 1
					}
				}
			]
		})
		
		data.condition = $compile.expression(data.condition, coverage, coverageName, file, node)
		
		data.whenTrue = $sequence($increment.branch(bid, 0, coverageName, file), data.whenTrue, coverage, coverageName, file, node)
		data.whenFalse = $sequence($increment.branch(bid, 1, coverageName, file), data.whenFalse, coverage, coverageName, file, node)
		
		return data
	} // }}}
	`\(NodeKind::CreateExpression)`(data, coverage, coverageName, file, node) { // {{{
		data.class = $compile.expression(data.class, coverage, coverageName, file, node)
		data.arguments = [$compile.expression(argument, coverage, coverageName, file, node) for argument in data.arguments]
		
		return data
	} // }}}
	`\(NodeKind::CurryExpression)`(data, coverage, coverageName, file, node) { // {{{
		data.callee = $compile.expression(data.callee, coverage, coverageName, file, node)
		
		if data.scope.kind == ScopeKind::Argument {
			data.scope.value = $compile.expression(data.scope.value, coverage, coverageName, file, node)
		}
		
		data.arguments = [$compile.expression(argument, coverage, coverageName, file, node) for argument in data.arguments]
		
		return data
	} // }}}
	`\(NodeKind::EnumExpression)`(data, coverage, coverageName, file, node) => data
	`\(NodeKind::FunctionExpression)`(data, coverage, coverageName, file, node) => $function(data, coverage, coverageName, file, node)
	`\(NodeKind::IfExpression)`(data, coverage, coverageName, file, node) { // {{{
		let bid = coverage.branchMap.length + 1
		
		coverage.branchMap.push({
			type: 'cond-expr'
			line: data.condition.start.line
			locations: [
				{
					start: {
						line: data.whenTrue.start.line
						column: data.whenTrue.start.column - 1
					}
					end: {
						line: data.whenTrue.end.line
						column: data.whenTrue.end.column - 1
					}
				}
				{
					start: {
						line: data.whenFalse.start.line
						column: data.whenFalse.start.column - 1
					}
					end: {
						line: data.whenFalse.end.line
						column: data.whenFalse.end.column - 1
					}
				}
			]
		})
		
		data.condition = $compile.expression(data.condition, coverage, coverageName, file, node)
		
		data.whenTrue = $sequence($increment.branch(bid, 0, coverageName, file), data.whenTrue, coverage, coverageName, file, node)
		data.whenFalse = $sequence($increment.branch(bid, 1, coverageName, file), data.whenFalse, coverage, coverageName, file, node)
		
		return data
	} // }}}
	`\(NodeKind::MemberExpression)`(data, coverage, coverageName, file, node) { // {{{
		data.object = $compile.expression(data.object, coverage, coverageName, file, node)
		
		return data
	} // }}}
	`\(NodeKind::NumericExpression)`(data, coverage, coverageName, file, node) => data
	`\(NodeKind::Identifier)`(data, coverage, coverageName, file, node) => data
	`\(NodeKind::Literal)`(data, coverage, coverageName, file, node) => data
	`\(NodeKind::ObjectExpression)`(data, coverage, coverageName, file, node) { // {{{
		let properties = data.properties
		
		data.properties = []
		
		for property in properties {
			data.properties.push($compile.expression(property, coverage, coverageName, file, node))
		}
		
		return data
	} // }}}
	`\(NodeKind::ObjectMember)`(data, coverage, coverageName, file, node) { // {{{
		data.value = $compile.expression(data.value, coverage, coverageName, file, node)
		
		return data
	} // }}}
	`\(NodeKind::PolyadicExpression)`(data, coverage, coverageName, file, node) { // {{{
		if data.operator.kind == BinaryOperatorKind::And || data.operator.kind == BinaryOperatorKind::Or {
			let bid = coverage.branchMap.length + 1
			
			coverage.branchMap.push(branch = {
				type: 'binary-expr'
				line: data.start.line
				locations: []
			})
			
			let operands = data.operands
			
			data.operands = []
			
			for operand, index in operands {
				branch.locations.push({
					start: {
						line: operand.start.line
						column: operand.start.column - 1
					}
					end: {
						line: operand.end.line
						column: operand.end.column - 1
					}
				})
				
				data.operands.push($sequence($increment.branch(bid, index, coverageName, file), operand, coverage, coverageName, file, node))
			}
		}
		else {
			data.operands = [$compile.expression(operand, coverage, coverageName, file, node) for operand in data.operands]
		}
		
		return data
	} // }}}
	`\(NodeKind::RegularExpression)`(data, coverage, coverageName, file, node) => data
	`\(NodeKind::TemplateExpression)`(data, coverage, coverageName, file, node) { // {{{
		data.elements = [$compile.expression(element, coverage, coverageName, file, node) for element in data.elements]
		
		return data
	} // }}}
	`\(NodeKind::TypeReference)`(data, coverage, coverageName, file, node) => data
	`\(NodeKind::UnaryExpression)`(data, coverage, coverageName, file, node) { // {{{
		data.argument = $compile.expression(data.argument, coverage, coverageName, file, node)
		
		return data
	} // }}}
}

func $function(data, coverage, coverageName, file, node) { // {{{
	let fid = coverage.fnMap.length + 1
	
	coverage.fnMap.push({
		name: data.name?.name ?? `(anonymous_\(fid))`
		line: data.start.line
		loc: {
			start: {
				line: data.start.line
				column: data.start.column - 1
			}
			end: {
				line: data.end.line
				column: data.end.column - 1
			}
		}
	})
	
	data.body = $block({
		kind: NodeKind::UnaryExpression
		operator: {
			kind: UnaryOperatorKind::IncrementPostfix
		}
		argument: {
			kind: NodeKind::MemberExpression
			object: {
				kind: NodeKind::MemberExpression
				object: {
					kind: NodeKind::MemberExpression
					object: {
						kind: NodeKind::Identifier
						name: coverageName
					}
					property: {
						kind: NodeKind::Literal
						value: file
					}
					computed: true
					nullable: false
				}
				property: {
					kind: NodeKind::Identifier
					name: 'f'
				}
				computed: false
				nullable: false
			}
			property: {
				kind: NodeKind::NumericExpression
				value: fid
			}
			computed: true
			nullable: false
		}
		attributes: []
	}, $body(data.body), coverage, coverageName, file, node)
	
	return data
} // }}}

func $if(condition, whenTrue, coverage, coverageName, file, node) { // {{{
	let data = {
		kind: NodeKind::IfStatement
		condition: condition
		start: condition.start
		end: whenTrue.end
	}
	
	if whenTrue.kind == NodeKind::Block {
		data.whenTrue = whenTrue
	}
	else {
		data.whenTrue = {
			kind: NodeKind::Block
			statements: [whenTrue]
		}
	}
	
	return $statements[NodeKind::IfStatement](data, coverage, coverageName, file, node)
} // }}}

const $increment = {
	branch(bid, eid, coverageName, file) { // {{{
		return {
			kind: NodeKind::UnaryExpression
			operator: {
				kind: UnaryOperatorKind::IncrementPostfix
			}
			argument: {
				kind: NodeKind::MemberExpression
				object: {
					kind: NodeKind::MemberExpression
					object: {
						kind: NodeKind::MemberExpression
						object: {
							kind: NodeKind::MemberExpression
							object: {
								kind: NodeKind::Identifier
								name: coverageName
							}
							property: {
								kind: NodeKind::Literal
								value: file
							}
							computed: true
							nullable: false
						}
						property: {
							kind: NodeKind::Identifier
							name: 'b'
						}
						computed: false
						nullable: false
					}
					property: {
						kind: NodeKind::NumericExpression
						value: bid
					}
					computed: true
					nullable: false
				}
				property: {
					kind: NodeKind::NumericExpression
					value: eid
				}
				computed: true
				nullable: false
			}
			attributes: []
		}
	} // }}}
}

func $sequence(init, data, coverage, coverageName, file, node) { // {{{
	if data.kind == NodeKind::SequenceExpression {
		let expressions = data.expressions
		
		data.expressions = [init]
		
		for expression in expressions {
			data.expressions.push($compile.expression(expression, coverage, coverageName, file, node))
		}
		
		return data
	}
	else {
		return {
			kind: NodeKind::SequenceExpression
			expressions: [init, $compile.expression(data, coverage, coverageName, file, node)]
		}
	}
} // }}}

const $statements = {
	`\(NodeKind::ClassDeclaration)`(data, coverage, coverageName, file, node) { // {{{
		let members = data.members
		
		data.members = []
		
		for member in members {
			switch member.kind {
				NodeKind::FieldDeclaration => {
					if member.defaultValue? {
						member.defaultValue = $compile.expression(member.defaultValue, coverage, coverageName, file, node)
					}
					
					data.members.push(member)
				}
				NodeKind::MethodDeclaration => {
					data.members.push($statements[NodeKind::FunctionDeclaration](member, coverage, coverageName, file, node))
				}
				=> {
					console.error(member)
					$throw('Not Implemented', node)
				}
			}
		}
		
		return data
	} // }}}
	`\(NodeKind::EnumDeclaration)`(data, coverage, coverageName, file, node) => data
	`\(NodeKind::ExportDeclaration)`(data, coverage, coverageName, file, node) { // {{{
		/* data.declarations = [($statements[declaration.kind] ?? $expressions[declaration.kind])(declaration, coverage, coverageName, file, node) for declaration in data.declarations] */
		data.declarations = [$statements[declaration.kind]? ? $statements[declaration.kind](declaration, coverage, coverageName, file, node) : $expressions[declaration.kind](declaration, coverage, coverageName, file, node) for declaration in data.declarations]
		
		return data
	} // }}}
	`\(NodeKind::ExternDeclaration)`(data, coverage, coverageName, file, node) => data
	`\(NodeKind::ForFromStatement)`(data, coverage, coverageName, file, node) { // {{{
		data.from = $compile.expression(data.from, coverage, coverageName, file, node)
		
		if data.til? {
			data.til = $compile.expression(data.til, coverage, coverageName, file, node)
		}
		else {
			data.to = $compile.expression(data.to, coverage, coverageName, file, node)
		}
		
		if data.by? {
			data.by = $compile.expression(data.by, coverage, coverageName, file, node)
		}
		
		if data.when? {
			data.body = $if(data.when, data.body, coverage, coverageName, file, node)
			
			delete data.when
		}
		else {
			data.body.statements = $compile.statements(data.body.statements, coverage, coverageName, file, node)
		}
		
		return data
	} // }}}
	`\(NodeKind::ForInStatement)`(data, coverage, coverageName, file, node) { // {{{
		if data.when? {
			data.body = $if(data.when, data.body, coverage, coverageName, file, node)
			
			delete data.when
		}
		else {
			data.body.statements = $compile.statements(data.body.statements, coverage, coverageName, file, node)
		}
		
		return data
	} // }}}
	`\(NodeKind::ForOfStatement)`(data, coverage, coverageName, file, node) { // {{{
		if data.when? {
			data.body = $if(data.when, data.body, coverage, coverageName, file, node)
			
			delete data.when
		}
		else {
			data.body.statements = $compile.statements(data.body.statements, coverage, coverageName, file, node)
		}
		
		return data
	} // }}}
	`\(NodeKind::FunctionDeclaration)`(data, coverage, coverageName, file, node) => $function(data, coverage, coverageName, file, node)
	`\(NodeKind::IfStatement)`(data, coverage, coverageName, file, node) { // {{{
		let bid = coverage.branchMap.length + 1
		
		let loc = {
			start: {
				line: data.start.line
				column: data.start.column - 1
			}
			end: {
				line: data.start.line
				column: data.start.column - 1
			}
		}
		
		coverage.branchMap.push({
			type: 'if'
			line: data.start.line
			locations: [loc, loc]
		})
		
		data.condition = $compile.expression(data.condition, coverage, coverageName, file, node)
		
		data.whenTrue = $block($increment.branch(bid, 0, coverageName, file), data.whenTrue, coverage, coverageName, file, node)
		
		if data.whenFalse? {
			data.whenFalse = $block($increment.branch(bid, 1, coverageName, file), data.whenFalse, coverage, coverageName, file, node)
		}
		
		return data
	} // }}}
	`\(NodeKind::ImplementDeclaration)`(data, coverage, coverageName, file, node) { // {{{
		let properties = data.properties
		
		data.properties = []
		
		for property in properties {
			switch property.kind {
				NodeKind::MethodDeclaration => {
					data.properties.push($statements[NodeKind::FunctionDeclaration](property, coverage, coverageName, file, node))
				}
				NodeKind::MethodAliasDeclaration => data.properties.push(property)
				NodeKind::MethodLinkDeclaration => data.properties.push(property)
				=> {
					console.error(property)
					$throw('Not Implemented', node)
				}
			}
		}
		
		return data
	} // }}}
	`\(NodeKind::ImportDeclaration)`(data, coverage, coverageName, file, node) => data
	`\(NodeKind::IncludeDeclaration)`(data, coverage, coverageName, file, node) { // {{{
		return data
	} // }}}
	`\(NodeKind::IncludeOnceDeclaration)`(data, coverage, coverageName, file, node) { // {{{
		return data
	} // }}}
	`\(NodeKind::RequireDeclaration)`(data, coverage, coverageName, file, node) => data
	`\(NodeKind::ReturnStatement)`(data, coverage, coverageName, file, node) { // {{{
		if data.value? {
			data.value = $compile.expression(data.value, coverage, coverageName, file, node)
		}
		
		return data
	} // }}}
	`\(NodeKind::ThrowStatement)`(data, coverage, coverageName, file, node) { // {{{
		data.value = $compile.expression(data.value, coverage, coverageName, file, node)
		
		return data
	} // }}}
	`\(NodeKind::TryStatement)`(data, coverage, coverageName, file, node) { // {{{
		data.body.statements = $compile.statements(data.body.statements, coverage, coverageName, file, node)
		
		return data
	} // }}}
	`\(NodeKind::TypeAliasDeclaration)`(data, coverage, coverageName, file, node) => data
	`\(NodeKind::VariableDeclaration)`(data, coverage, coverageName, file, node) { // {{{
		for declaration in data.declarations when declaration.init? {
			declaration.init = $compile.expression(declaration.init, coverage, coverageName, file, node)
		}
		
		return data
	} // }}}
	`\(NodeKind::WhileStatement)`(data, coverage, coverageName, file, node) { // {{{
		data.condition = $compile.expression(data.condition, coverage, coverageName, file, node)
		
		data.body.statements = $compile.statements(data.body.statements, coverage, coverageName, file, node)
		
		return data
	} // }}}
}

func $throw(message, node?) ~ Error { // {{{
	let error = new Error(message)
	
	if node? {
		error.filename = node.file()
	}
	
	throw error
} // }}}

class CoverageCompiler extends Compiler {
	private {
		_coverageName
		_instrument		= false
	}
	instrument(@coverageName = '__ks_coverage') { // {{{
		@instrument = true
		
		return this
	} // }}}
	compile(data?) { // {{{
		@module = new Module(data ?? @readFile(), this, @file)
		
		if @instrument {
			let coverage = @module.instrument(@coverageName, @file)
			
			@module.analyse()
			
			@module.fuse()
			
			const header = new FragmentBuilder(0)
			
			header.line(`var __ks_coverage = (function(_export) {\n\treturn typeof _export.__ks_coverage === 'undefined' ? _export.__ks_coverage = {} : _export.__ks_coverage;\n})(typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : this)`)
			
			const line = header.newLine()
			
			line.code(`if(!\(@coverageName)["\(@file)"]) {\n`)
			line.code(`\t\(@coverageName)["\(@file)"] = {`)
			
			line.code(`"path":"\(@file)",`)
			
			line.code(`"s":{`)
			for i from 1 to coverage.statementMap.length {
				line.code(`,`) if i > 1
				
				line.code(`"\(i)":0`)
			}
			line.code(`},`)
			
			line.code(`"b":{`)
			for i from 1 to coverage.branchMap.length {
				line.code(`,`) if i > 1
				
				line.code(`"\(i)":[`)
				
				for j from 0 til coverage.branchMap[i - 1].locations.length {
					line.code(`,`) if j != 0
					
					line.code(`0`)
				}
				
				line.code(`]`)
			}
			line.code(`},`)
			
			line.code(`"f":{`)
			for i from 1 to coverage.fnMap.length {
				line.code(`,`) if i > 1
				
				line.code(`"\(i)":0`)
			}
			line.code(`},`)
			
			line.code(`"statementMap":{`)
			for i from 0 til coverage.statementMap.length {
				line.code(`,`) if i > 0
				
				line.code(`"\(i + 1)":\(JSON.stringify(coverage.statementMap[i]))`)
			}
			line.code(`},`)
			
			line.code(`"branchMap":{`)
			for i from 0 til coverage.branchMap.length {
				line.code(`,`) if i > 0
				
				line.code(`"\(i + 1)":\(JSON.stringify(coverage.branchMap[i]))`)
			}
			line.code(`},`)
			
			line.code(`"fnMap":{`)
			for i from 0 til coverage.fnMap.length {
				line.code(`,`) if i > 0
				
				line.code(`"\(i + 1)":\(JSON.stringify(coverage.fnMap[i]))`)
			}
			line.code(`}`)
			
			line.code(`};\n`)
			line.code(`}`)
			line.done()
			
			@fragments = header.toArray().concat(@module.toFragments())
		}
		else {
			@module.analyse()
			
			@module.fuse()
			
			@fragments = @module.toFragments()
		}
		
		return this
	} // }}}
}

impl Module {
	instrument(coverageName, file) { // {{{
		let coverage = {
			path: @file
			statementMap: []
			branchMap: []
			fnMap: []
		}
		
		@data.body = $compile.statements(@data.body, coverage, coverageName, file, this)
		
		@data.body.unshift({
			kind: NodeKind::ExternDeclaration
			declarations: [
				{
					kind: NodeKind::VariableDeclarator
					name: {
						kind: NodeKind::Identifier
						name: coverageName
					}
				}
			]
			attributes: []
		})
		
		return coverage
	} // }}}
}

export CoverageCompiler as Compiler, extensions, getBinaryPath, getHashPath, isUpToDate