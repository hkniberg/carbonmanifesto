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
Router.route('preview')
Router.route('translationSubmitted')

Router.route('/editText/:_languageCode', {
  template: 'editText',
  data() {
    return this.params._languageCode
  }
})

Router.route('admin')
Router.route('/reviewText/:_languageCode', {
  template: 'reviewText',
  data() {
    return this.params._languageCode
  }
})
