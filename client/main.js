Meteor.subscribe('Files');
Meteor.subscribe('Posts');



Template.uploadedFiles.helpers({
  uploadedFiles: function () {
    return Images.find();
  }
});

Template.uploadForm.onCreated(function () {
  this.currentUpload = new ReactiveVar(false);
});

Template.uploadForm.helpers({
  currentUpload: function () {
    return Template.instance().currentUpload.get();
  }
});

Template.uploadForm.events({
  'change #fileInput': function (e, template) {
    if (e.currentTarget.files && e.currentTarget.files[0]) {
      // We upload only one file, in case
      // there was multiple files selected
      var file = e.currentTarget.files[0];
      if (file) {
        var uploadInstance = Images.insert({
          file: file,
          streams: 'dynamic',
          chunkSize: 'dynamic'
        }, false);

        uploadInstance.on('start', function() {
          template.currentUpload.set(this);
        });

        uploadInstance.on('end', function(error, fileObj) {
          if (error) {
            alert('Error during upload: ' + error.reason);
          } else {
            alert('File "' + fileObj.name + '" successfully uploaded');
          }
          template.currentUpload.set(false);
        });

        uploadInstance.start();
      }
    }
  }
});

Template.posts.helpers({
  posts: function () {
    return Posts.find({});
  }
});

Template.PostSingle.onCreated(function(){
  var self = this;
  self.autorun(function(){
    var id = FlowRouter.getParam('id');
    self.subscribe('singlePost', id);
  });
});

Template.PostSingle.helpers({
    post: () => {
        var id = FlowRouter.getParam('id');
        return Posts.findOne({ _id: id });
    },
    picture: () => {
      var paramId = FlowRouter.getParam('id');
      var post = Posts.findOne({ _id: paramId });
      var pictureId = post.picture
      var picture = Images.findOne({_id: pictureId});
      return picture;
    }
});

Template.PostSingle.events({
    'click .button': function(){
      var paramId = FlowRouter.getParam('id');
      var post = Posts.findOne({ _id: paramId },{fields: {picture:1}});
      var pictureId = post.picture
      var picture = Images.findOne({_id: pictureId});
      console.log(post)
    }
});

Template.file.helpers({
  files: function () {
    return Images.find({});
  }
});
