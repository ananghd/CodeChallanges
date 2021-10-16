const mongoose = require('mongoose');
const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLInt,
  GraphQLString
} = graphql;
const Comment = mongoose.model('comment');

const CommentType = new GraphQLObjectType({
  name:  'CommentType',
  fields: () => ({
    id: { type: GraphQLID },
    likes: { type: GraphQLInt },
    content: { type: GraphQLString },
    article: {
      type: require('./article_type'),
      resolve(parentValue) {
        return Comment.findById(parentValue).populate('article')
          .then(c => {
            console.log(lyric)
            return comment.article
          });
      }
    }
  })
});

module.exports = CommentType;