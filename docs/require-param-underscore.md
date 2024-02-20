# Enforce underscore prefix or suffix in function parameter names. (`require-param-underscore`)

My stylistic preference is to begin every function parameter name with an 
underscore, which makes it easy to tell at a glance what variables in a function
block originated as input values. This potentially conflicts with the more 
broadly used convention of prefixing the names of private variables with 
underscores, so it may not be appropriate to all coding contexts.

## Rule Details

This rule requires that every function parameter name begin or end with an 
underscore (depending on how the option is set). Automatic fixing is not 
implemented.

Examples of **incorrect** code for this rule:

```js

function bar(foo) {}

const bar = function(foo) {}

foo => {}

```

Examples of **correct** code for this rule:

```js

// Option "pre":

function bar(_foo) {}

const bar = function(_foo) {}

_foo => {}

// Option "post":

function bar(foo_) {}

const bar = function(foo_) {}

foo_ => {}

```

### Options

This rule has one option: it can be set to "pre" or "post" to determine whether
the underscore must be placed at the beginning or at the end of the parameter
name. Defaults to "pre" if not explicitly set.

## When Not To Use It

Don't use this rule if you have no preferences or conflicting preferences for
function parameter names or if your naming convention reserves underscores 
exclusively for other purposes such as private variable names.
