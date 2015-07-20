'use strict';

var fs = require('fs');

var testExistence = function (test, expectations) {
  test.expect(expectations.length);

  expectations.forEach(function (expectation) {
    test.equal(fs.existsSync(expectation), true, expectation + ' should exist');
  });

  test.done();
};

exports.command = {
  'app with asar': function (test) {
    testExistence(test, [
      'test/fixtures/out/foo.x86.rpm'
    ]);
  },
  'app without asar': function (test) {
    testExistence(test, [
      'test/fixtures/out/bar.x86_64.rpm'
    ]);
  }
};
