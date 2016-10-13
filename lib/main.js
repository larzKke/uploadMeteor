// this.Images = new FilesCollection({
//   collectionName: 'Images',
//   storagePath: process.env.PWD + '/public/images',
//   downloadRoute: 'public/images',
//   public: true,
//   debug: true,
//   allowClientCode: false, // Disallow remove files from Client
//   // namingFunction: function(){
//   // return 'hello';
//   // },
//   onBeforeUpload: function (file) {
//     // Allow upload files under 10MB, and only in png/jpg/jpeg formats
//     if (file.size <= 1024*1024*10 && /png|jpg|jpeg/i.test(file.extension)) {
//       return true;
//     } else {
//       return 'Please upload image, with size equal or less than 10MB';
//     }
//   }
// });

// this.Images = new FilesCollection({
//   // debug: true,
//   collectionName: 'Images',
//   public: true,
//   downloadRoute: '/public/images',
//   storagePath: process.env.PWD + '/public/images',
//   onBeforeUpload() {
//     // Disallow uploads from client
//     return true;
//   }
// });

this.Images = new FilesCollection({
  collectionName: 'Images',
  // debug: true,
  // public: true,
  downloadRoute: '/public/images',
  // storagePath: process.env.PWD + '/public/images'
  onBeforeUpload: function (file) {
    // Allow upload files under 10MB, and only in png/jpg/jpeg formats
    if (file.size <= 1024*1024*10 && /png|jpg|jpeg/i.test(file.extension)) {
      return true;
    } else {
      return 'Please upload image, with size equal or less than 10MB';
    }
  }
});



Schemas = {};
Posts   = new Meteor.Collection('posts');
Schemas.Posts = new SimpleSchema({
  title: {
    type: String,
    max: 60
  },
  picture: {
    type: String,
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

Posts.attachSchema(Schemas.Posts);

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
