const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;
const mongoose = require('mongoose');
const Article = mongoose.model('article');
const Comment = mongoose.model('comment');
const ArticleType = require('./article_type');
const CommentType = require('./comment_type');

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addArticle: {
      type: ArticleType,
      args: {
        title: { type: GraphQLString },
        content: { type: GraphQLString }
      },
      resolve(parentValue, { title, content }) {
        return (new Article({ title, content })).save()
      }
    },
    addCommentToArticle: {
      type: ArticleType,
      args: {
        content: { type: GraphQLString },
        articleId: { type: GraphQLID }
      },
      resolve(parentValue, { content, articleId }) {
        return Article.addComment(articleId, content);
      }
    },
    updateArticle: {
        type: ArticleType,
        args: {
            id: { type: GraphQLID },
            title: { type: GraphQLString },
            content: { type: GraphQLString }
        },
        resolve(parentValue, { id, title, content }) {
            return (Article.findOneAndUpdate({_id: id}, {'title': title, 'content': content }))
        }
    },
    updateComment: {
        type: CommentType,
        args: {
            id: { type: GraphQLID },
            content: { type: GraphQLString }
        },
        resolve(parentValue, { id, content }) {
            return (Comment.findOneAndUpdate({_id: id}, {'content': content }))
        }
    },
    deleteArticle: {
      type: ArticleType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Article.remove({ _id: id });
      }
    },
    deleteComment: {
      type: CommentType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Comment.remove({ _id: id });
      }
    },
    likeComment: {
      type: CommentType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Comment.like(id);
      }
    }
  }
});

module.exports = mutation;