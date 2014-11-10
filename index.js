/*!
 * question-helper <https://github.com/doowb/question-helper>
 *
 * Copyright (c) 2014 Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';
var inquirer = require('inquirer');

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