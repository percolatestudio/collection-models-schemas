Post = CollectionModel.extend({
});

Post.schema({
  title: String,
  body: Validator.Message(String, "is all wrong, dude")
});

Posts = new Meteor.Collection('posts', Post.getTransformOptions());

