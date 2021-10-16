const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;
const CommentType = require('./comment_type');
const Article = mongoose.model('article');

const ArticleType = new GraphQLObjectType({
  name:  'ArticleType',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    comments: {
      type: new GraphQLList(CommentType),
      resolve(parentValue) {
        return Article.findComments(parentValue.id);
      }
    }
  })
});

module.exports = ArticleType;