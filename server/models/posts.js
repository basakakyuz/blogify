import mongoose from 'mongoose'

const postShema = mongoose.Schema({
  title: String,
  subtitle: String,
  content: String,
  tag: String,
  image: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
})

const Post = mongoose.model('Post', postShema)

export default Post
