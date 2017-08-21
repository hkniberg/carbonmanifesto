
Template.registerHelper("admin", function() {
  return Roles.userIsInRole(Meteor.user(), 'admin')
})