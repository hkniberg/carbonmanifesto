import {Texts} from "./collection"

Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', {
  name: 'manifesto',
  waitOn: function() {
    return Meteor.subscribe("texts")
  },
  data: function() {
    return Texts.findOne()
  }
})