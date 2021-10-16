const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;
const ArticleType = require('./article_type');
const CommentType = require('./comment_type');
const Article = mongoose.model('article');
const Comment = mongoose.model('comment');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    articles: {
      type: new GraphQLList(ArticleType),
      resolve() {
        return Article.find({});
      }
    },
    article: {
      type: ArticleType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Article.findById(id);
      }
    },
    Comment: {
      type: CommentType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Comment.findById(id);
      }
    }
  })
});

module.exports = RootQuery;