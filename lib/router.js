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
    console.log("Texts", Texts.findOne())
    return Texts.findOne()
  }
})