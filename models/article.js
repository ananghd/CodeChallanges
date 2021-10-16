const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    title: { type: String },
    content: { type: String },
    created_at: { type: Date },
    updated_at: { type: Date },
    lyrics: [{
        type: Schema.Types.ObjectId,
        ref: 'comment'
    }]
});

ArticleSchema.statics.addLyric = function(id, content) {
  const Comment = mongoose.model('comment');

  return this.findById(id)
    .then(article => {
      const comment = new Comment({ content, article })
      song.comments.push(comment)
      return Promise.all([comment.save(), article.save()])
        .then(([comment, article]) => song);
    });
}

ArticleSchema.statics.findComments = function(id) {
  return this.findById(id)
    .populate('comments')
    .then(article => article.lyrics);
}

mongoose.model('article', ArticleSchema);