'use strict';

var engineHandlebars = require('engine-handlebars');
var Template = require('template');
var should = require('should');

var question = require('./');
var timeout = 5000;

var context = {
  questions: {
    name: "What's your name?",
    dob: "When's your birtday?"
  }
};

describe('question', function () {
  describe('as a function', function () {
    it('should return an answer given a question', function (done) {
      this.timeout(timeout);
      question("What's your name?", function (err, answer) {
        answer.should.exist;
        done();
      });
    });
    it('should return an answer given a question key', function (done) {
      this.timeout(timeout);
      
      question.call({ctx: context}, 'name', function (err, answer) {
        answer.should.exist;
        done();
      });
    });
    it('should throw an error when a key is not passed in', function (done) {
      this.timeout(timeout);
      try {
        question(function (err, answer) {
          if (err) return done();
          done(new Error('Expected an error to be thrown'));
        });
      } catch (err) {
        done();
      }
    });
    it('should throw an error when a key is not a string', function (done) {
      question({}, function (err, answer) {
        if (err) {
          err.message.indexOf('Question expected the first parameter to be a string').should.equal(0);
          return done();
        }
        done(new Error('Expected an error to be thrown'));
      });
    });
  });

  describe('as a handlebars helper', function () {
    var template = null;
    beforeEach(function () {
      template = new Template();
      template.engine('hbs', engineHandlebars);
      template.page('test-question.hbs', 'Your name is {{question "What\'s your name?"}}');
      template.page('test-key.hbs', 'Your name is {{question "name"}}');
      template.page('test-no-key.hbs', 'Your name is {{question}}');
      template.page('test-bad-key.hbs', 'Your name is {{question questions}}');
      template.asyncHelper('question', question);
    });
    it('should return an answer given a question', function (done) {
      this.timeout(timeout);
      template.render('test-question.hbs', function (err, content) {
        if (err) console.log('err', err);
        content.should.exist;
        (content.indexOf('{{') === -1).should.be.true;
        done();
      });
    });
    it('should return an answer given a question key', function (done) {
      this.timeout(timeout);      
      template.render('test-key.hbs', context, function (err, content) {
        if (err) console.log('err', err);
        (content.indexOf('{{') === -1).should.be.true;
        done();
      });
    });
    xit('should throw an error when a key is not passed in', function (done) {
      this.timeout(timeout);
      try {
        template.render('test-no-key.hbs', context, function (err, content) {
          console.log(arguments);
          if (err) return done();
          done(new Error('Expected an error to be thrown'));
        });
      } catch (err) {
        done();
      }
    });
    xit('should throw an error when a key is not a string', function (done) {
      template.render('test-bad-key.hbs', context, function (err, content) {
        if (err) {
          err.message.indexOf('Question expected the first parameter to be a string').should.equal(0);
          return done();
        }
        done(new Error('Expected an error to be thrown'));
      });
    });
  });

  describe('as a lodash helper', function () {
    var template = null;
    beforeEach(function () {
      template = new Template();
      template.page('test-question.html', 'Your name is <%= question("What\'s your name?") %>');
      template.page('test-key.html', 'Your name is <%= question("name") %>');
      template.page('test-no-key.html', 'Your name is <%= question %>');
      template.page('test-bad-key.html', 'Your name is <%= question(questions) %>');
      template.asyncHelper('question', question);
    });
    it('should return an answer given a question', function (done) {
      this.timeout(timeout);
      template.render('test-question.html', function (err, content) {
        if (err) console.log('err', err);
        content.should.exist;
        (content.indexOf('<%=') === -1).should.be.true;
        done();
      });
    });
    it('should return an answer given a question key', function (done) {
      this.timeout(timeout);      
      template.render('test-key.html', context, function (err, content) {
        if (err) console.log('err', err);
        (content.indexOf('<%=') === -1).should.be.true;
        done();
      });
    });
    xit('should throw an error when a key is not passed in', function (done) {
      this.timeout(timeout);
      try {
        template.render('test-no-key', context, function (err, content) {
          if (err) return done();
          done(new Error('Expected an error to be thrown'));
        });
      } catch (err) {
        done();
      }
    });
    xit('should throw an error when a key is not a string', function (done) {
      template.render('test-bad-key', context, function (err, content) {
        if (err) {
          err.message.indexOf('Question expected the first parameter to be a string').should.equal(0);
          return done();
        }
        done(new Error('Expected an error to be thrown'));
      });
    });
  });
});