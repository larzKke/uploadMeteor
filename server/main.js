Meteor.publish('Files', function () {
  return Images.find().cursor;
});
Meteor.publish('Posts', function () {
  return Posts.find();
});
Meteor.publish('singlePost', function(id) {
  return Posts.find({_id: id});
});
