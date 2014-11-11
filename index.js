/*!
 * question-helper <https://github.com/doowb/question-helper>
 *
 * Copyright (c) 2014 Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';
var inquirer = require('inquirer');

/**
 * Prompt a user for a question and get an answer back.
 *
 * > Native node.js
 * 
 * ```js
 * var question = require('question-helper');
 * var context = {questions: {name: "What's your name?"}};
 * question.call({ctx: context}, "name", function (err, answer) {
 *   if (err) return console.log('error', err);
 *   console.log('Answer', answer);
 * });
 * ```
 *
 * > Handlebars (using Template)
 * 
 * ```js
 * var template = require('template');
 * var template.engine('hbs', require('engine-handlebars'));
 * 
 * var question = require('question-helper');
 * var context = {questions: {name: "What's your name?"}};
 * template.page('author.hbs', "Author: {{question 'name'}}");
 * template.render('author.hbs', context, function (err, content) {
 *   if (err) return console.log('error', err);
 *   console.log(content);
 * });
 * ```
 *
 * > Lodash (using Template)
 * 
 * ```js
 * var template = require('template');
 * var question = require('question-helper');
 * var context = {questions: {name: "What's your name?"}};
 * template.page('author.html', "Author: <%= question('name') %>");
 * template.render('author.html', context, function (err, content) {
 *   if (err) return console.log('error', err);
 *   console.log(content);
 * });
 * ```
 * 
 * @param  {String} `key` Either a key on a `questions` object on the context or a question to ask.
 * @param  {String} `options` Additional options to pass.
 * @param  {Function} `next` Callback function that will be passed an error and/or the results of asking the question.
 * @api public
 */

module.exports = function question (key, options, next) {
  var ctx = this && (this.ctx || this.context);

  if (typeof options === 'function') {
    next = options;
    options = {};
  }

  if (typeof key !== 'string') {
    return next(new Error('Question expected the first parameter to be a string, but got [' + (typeof key) + ']'));
  }

  var q = ctx && ctx.questions && ctx.questions[key];
  if (!q) q = key;
  var obj = {
    name: key,
    message: q
  };

  inquirer.prompt([obj], function (answers) {
    return next(null, answers[key]);
  });
};