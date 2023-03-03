import express from 'express'
import {
  getPosts,
  createPost,
  updatePost,
  getSinglePost,
  deletePost,
} from '../controllers/posts.js'

const router = express.Router()

//http://localhost:5000/posts/ kismindan gelen tum istekler burada yapiliyor.
//GET POST DELETE UPDATE PATCH

router.get('/', getPosts)
router.get('/:id', getSinglePost)
router.post('/', createPost)
router.patch('/:id', updatePost)
router.delete('/:id', deletePost)

export default router

/*
  router.delete(':id', deletePost)
  yazinca bad request hatasi almistim
  router.delete('/:id', deletePost)
  bununla degistirince hata duzeldi
*/
