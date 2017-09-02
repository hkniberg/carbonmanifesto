Router.configure({
  layoutTemplate: 'layout',
  waitOn: function() {
    return Meteor.subscribe("texts")
  }
});

Router.route('/', {
  name: 'manifesto'
})

Router.route('translate')

Router.route('/:_languageCode/translationSubmitted', {
  template: 'translationSubmitted'
})

Router.route('admin')

Router.route('/:_languageCode/editText', {
  template: 'editText'
})

Router.route('/:_languageCode/reviewText', {
  template: 'reviewText'
})

Router.route('/:_languageCode', {
  template: 'manifesto'
})

