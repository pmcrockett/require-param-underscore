/**
 * @fileoverview Enforce underscore prefix or suffix in function parameter names.
 * @author pmcrockett
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: "Enforce underscore prefix or suffix in function parameter names.",
      recommended: false,
      url: "https://github.com/pmcrockett/require-param-underscore",
    },
    fixable: 'code',
    schema: [
      {
          enum: ["pre", "post"]
      }
    ]
  },
  create(_context) {
    const optPre = "pre";
    const option = _context.options[0];
    const underscorePosition = typeof option !== "undefined" ? option : optPre;
    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    function hasUnderscorePrefix(_identifier) {
      return _identifier !== "_" && _identifier[0] === "_";
    }

    function hasUnderscoreSuffix(_identifier) {
      return _identifier !== "_" && _identifier[_identifier.length - 1] === "_";
    }

    function checkForUnderscoreInFunctionParameters(_node) {
      _node.params.forEach(param => {
        const { type } = param;
        let underscoreNode;

        if (type === "RestElement") {
            underscoreNode = param.argument;
        } else if (type === "AssignmentPattern") {
            underscoreNode = param.left;
        } else {
            underscoreNode = param;
        }

        if (underscoreNode.type === "Identifier") {
          const id = underscoreNode.name;

          if (underscorePosition === optPre) {
            if (!hasUnderscorePrefix(id)) {
              _context.report({
                  node: underscoreNode,
                  message: "Function parameter name '{{identifier}}' doesn't beign with '_'.",
                  data: {
                    identifier: id
                  },
                  fix(fixer) {
                    return fixer.insertTextBefore(underscoreNode, "_");
                  }
              });
            }
          } else if (!hasUnderscoreSuffix(id)) {
            _context.report({
              node: underscoreNode,
              message: "Function parameter name '{{identifier}}' doesn't end with '_'.",
              data: {
                identifier: id
              },
              fix(fixer) {
                return fixer.insertTextAfter(underscoreNode, "_");
              }
            });
          }
        }
      });
    }
    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {
      FunctionDeclaration: checkForUnderscoreInFunctionParameters,
      FunctionExpression: checkForUnderscoreInFunctionParameters,
      ArrowFunctionExpression: checkForUnderscoreInFunctionParameters
    };
  }
};
