
const util = require('../lib/util.js')
const expect = require('chai').expect


describe('Util', function() {
  describe('removeLinksFromMarkDown', function() {
    it('null', function() {
      expect(util.removeLinksFromMarkDown(null)).to.equal(null)
    })
    it('undefined', function() {
      expect(util.removeLinksFromMarkDown()).to.equal(null)
    })
    it('empty', function() {
      expect(util.removeLinksFromMarkDown("")).to.equal("")
    })
    it('no links', function() {
      expect(util.removeLinksFromMarkDown("hi")).to.equal("hi")
    })
    it('1 link', function() {
      expect(util.removeLinksFromMarkDown("hi [jim](http://jim.com)")).to.equal("hi [jim]")
    })
    it('Ignore non-link parenthesis', function() {
      expect(util.removeLinksFromMarkDown("hi (there)")).to.equal("hi (there)")
    })
    it('Mixed links with non-link paranthesis', function() {
      expect(util.removeLinksFromMarkDown("hi (there) go to [google](http://google.com), OK?")).to.equal(
        "hi (there) go to [google], OK?")
    })
  })
  ''
  describe('countLinks', function() {
    it('2 links', function() {
      expect(util.countLinks('OK [link1](xxx) [link2](yyy)')).to.equal(2)
    })
    it('2 links with no parenthesis', function() {
      expect(util.countLinks('OK [link1] [link2]')).to.equal(2)
    })
    it('2 links and ignored parenthesis', function() {
      expect(util.countLinks('OK [link1](xxx) (yo) [link2](yyy)')).to.equal(2)
    })
    it('0 links', function() {
      expect(util.countLinks('hi there')).to.equal(0)
    })
  })

  describe('copyLinks', function() {
    it('empty doc', function() {
      expect(util.copyLinks("")).to.equal("")
    })
    it('1 link', function() {
      expect(util.copyLinks(
        "OK [a](http://google.com)",
        "OK [b]"
      )).to.equal("OK [b](http://google.com)")
    })
  })
})