var Images = new FilesCollection({
  collectionName: 'Images',
  allowClientCode: false, // Disallow remove files from Client,
  onBeforeUpload: function (file) {
    // Allow upload files under 10MB, and only in png/jpg/jpeg formats
    if (file.size <= 10485760 && /png|jpg|jpeg/i.test(file.ext)) {
      return true;
    } else {
      return 'Please upload image, with size equal or less than 10MB';
    }
  }
})

if (Meteor.isClient) {
  Meteor.subscribe('files.images.all');
}

if (Meteor.isServer) {
  Meteor.publish('files.images.all', function () {
    return Images.collection.find({});
  });

}

this.Images = Images;




Posts = new Meteor.Collection('posts');
PostsSchema = new SimpleSchema({
  title: {
    type: String,
    max: 60
  },
  picture: {
    type: String,
    // optional: true,
    autoform: {
      afFieldInput: {
        type: 'fileUpload',
        collection: 'Images'
        // uploadTemplate: 'uploadField' // <- Optional
        // previewTemplate: 'uploadPreview' // <- Optional
      }
    }
  }
});

Posts.allow({
  insert: function() {
      return true
  },
  update: function() {
      return true
  },
  remove: function() {
      return true
  }
});

Posts.attachSchema(PostsSchema);
