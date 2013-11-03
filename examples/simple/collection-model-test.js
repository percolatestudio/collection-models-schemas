Post = CollectionModel.extend({});

Posts = new Meteor.Collection('posts', Post.getTransformOptions());

Posts.schema({
  title: String,
  body: Validator.Message(String, "is all wrong, dude")
});

