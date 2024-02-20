const {RuleTester} = require("eslint");
const underscoreRule = require("../lib/rules/require-param-underscore");

const ruleTester = new RuleTester({
  parserOptions: { ecmaVersion: 2015 }
});

// Throws error if the tests in ruleTester.run() do not pass
ruleTester.run(
  "require-param-underscore", // rule name
  underscoreRule, // rule code
  {
    valid: [{
      code: "function bar(_foo) {}",
    },
    {
      code: "const bar = function(_foo) {}",
    },
    {
      code: "_foo => {}",
    },
    {
      code: "function bar(_foo = 7, _bat = 8) {}",
    },
    {
      code: "function bar(foo_) {}",
      options: ["post"],
    },
    {
      code: "const bar = function(foo_) {}",
      options: ["post"],
    },
    {
      code: "foo_ => {}",
      options: ["post"],
    },
    {
      code: "function bar(foo_ = 7, bat_ = 8) {}",
      options: ["post"],
    }],
    invalid: [{
      code: "function bar(foo) {}",
      output: "function bar(_foo) {}",
      errors: 1,
    },
    {
      code: "const bar = function(foo) {}",
      output: "const bar = function(_foo) {}",
      errors: 1,
    },
    {
      code: "foo => {}",
      output: "_foo => {}",
      errors: 1,
    },
    {
      code: "function bar(_foo = 7, bat = 8) {}",
      output: "function bar(_foo = 7, _bat = 8) {}",
      errors: 1,
    },
    {
      code: "function bar(foo) {}",
      options: ["post"],
      output: "function bar(foo_) {}",
      errors: 1,
    },
    {
      code: "const bar = function(foo) {}",
      options: ["post"],
      output: "const bar = function(foo_) {}",
      errors: 1,
    },
    {
      code: "foo => {}",
      options: ["post"],
      output: "foo_ => {}",
      errors: 1,
    },
    {
      code: "function bar(foo_ = 7, bat = 8) {}",
      options: ["post"],
      output: "function bar(foo_ = 7, bat_ = 8) {}",
      errors: 1,
    }],
  }
);

console.log("All tests passed!");