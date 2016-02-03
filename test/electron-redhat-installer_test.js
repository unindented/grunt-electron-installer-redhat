'use strict'

var fs = require('fs')
var async = require('async')

var testExistence = function (test, expectations) {
  test.expect(expectations.length)

  async.parallel(expectations.map(function (expectation) {
    return function (callback) {
      fs.access(expectation, function (err) {
        test.ok(!err, expectation + ' should exist')
        callback()
      })
    }
  }), function () {
    test.done()
  })
}

exports.command = {
  'app with asar': function (test) {
    testExistence(test, [
      'test/fixtures/out/footest.x86.rpm'
    ])
  },
  'app without asar': function (test) {
    testExistence(test, [
      'test/fixtures/out/bartest.x86_64.rpm'
    ])
  }
}
