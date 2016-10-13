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

Template.Posts.helpers({
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
      let paramId = FlowRouter.getParam('id');
      let post = Posts.findOne({ _id: paramId });
      let pictureId = post.picture
      let picture = Images.findOne({_id: pictureId});
      return picture;
    }
});

Template.PostSingle.events({
    'click .button': function(){
      let paramId = FlowRouter.getParam('id');
      let post = Posts.findOne({ _id: paramId });
      let pictureId = post.picture
      let picture = Images.findOne({_id: pictureId});
      console.log(picture.link())
    }
});

Template.File.helpers({
  files: function () {
    return Images.find({});
  }
});
