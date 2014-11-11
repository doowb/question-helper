# question-helper 

> Helper used to ask questions and output the answer. Useful with Template, Handlebars, and Loadash.

## Install
#### Install with [npm](npmjs.org):

```bash
npm i question-helper --save-dev
```

## Run tests

```bash
npm test
```

## API
### [.exports](index.js#L59)

Prompt a user for a question and get an answer back.

* `key` **{String}**: Either a key on a `questions` object on the context or a question to ask.    
* `options` **{String}**: Additional options to pass.    
* `next` **{Function}**: Callback function that will be passed an error and/or the results of asking the question.    

> Native node.js

```js
var question = require('question-helper');
var context = {questions: {name: "What's your name?"}};
question.call({ctx: context}, "name", function (err, answer) {
  if (err) return console.log('error', err);
  console.log('Answer', answer);
});
```

> Handlebars (using Template)

```js
var template = require('template');
var template.engine('hbs', require('engine-handlebars'));

var question = require('question-helper');
var context = {questions: {name: "What's your name?"}};
template.page('author.hbs', "Author: {{question 'name'}}");
template.render('author.hbs', context, function (err, content) {
  if (err) return console.log('error', err);
  console.log(content);
});
```

> Lodash (using Template)

```js
var template = require('template');
var question = require('question-helper');
var context = {questions: {name: "What's your name?"}};
template.page('author.html', "Author: <%= question('name') %>");
template.render('author.html', context, function (err, content) {
  if (err) return console.log('error', err);
  console.log(content);
});
```

## Contributing
Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue][issues].

## Author

**Brian Woodward**
 
+ [github/doowb](https://github.com/doowb)
+ [twitter/doowb](http://twitter.com/doowb) 

## License
Copyright (c) 2014 Brian Woodward, contributors.  
Released under the MIT license

***

_This file was generated by [verb-cli](https://github.com/assemble/verb-cli) on November 10, 2014._

[issues]: https://github.com/doowb/question-helper/issues