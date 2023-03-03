import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, Paper, Divider, Button, Chip } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import MicIcon from '@material-ui/icons/Mic'
import MicOffIcon from '@material-ui/icons/MicOff'
import EditPostForm from './EditPostForm'
import noImage from '../images/noimage.svg'
import { fetchSinglePost, deletePost } from '../actions/post'
import { useParams, useNavigate } from 'react-router-dom'
import { useSpeechSynthesis } from 'react-speech-kit'

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
    marginBottom: theme.spacing(8),
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  content: {
    marginTop: theme.spacing(3),
  },
  image: {
    width: '100%',
    borderRadius: 5,
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(4),
  },
  chip: {
    marginTop: theme.spacing(1),
  },
}))

const PostDetails = ({ match, location }) => {
  const dispatch = useDispatch()

  // alt satirda match.params kullanmis ama yeni react dom surumunde
  // o sekilde kullanilmiyormus o yuzden degistirdim
  // kaynak: https://stackoverflow.com/questions/70290770/react-typeerror-cannot-read-properties-of-undefined-reading-params
  const { id } = useParams()
  const navigate = useNavigate()

  const currentPost = useSelector((state) => state.posts.currentPost)

  const [editMode, setEditMode] = useState(false)

  const openEditMode = () => {
    setEditMode(true)
  }

  const closeEditMode = () => {
    setEditMode(false)
  }

  useEffect(() => {
    dispatch(fetchSinglePost(id))
  }, [dispatch])

  const convertRelativeTime = (date) => {
    return moment(date).fromNow()
  }

  const removePost = () => {
    dispatch(deletePost(currentPost._id))
    navigate('/posts')
  }

  const { speak, cancel, voices } = useSpeechSynthesis()

  const [screenReader, setScreenReader] = useState(false)

  const handleScreenReader = () => {
    setScreenReader(screenReader ? false : true)

    if (screenReader) {
      cancel()
    } else {
      speak({
        text: currentPost.title + currentPost.subtitle + currentPost.content,
        voice: voices[0],
      })
    }
  }

  const classes = useStyles()

  return (
    <Paper className={classes.paper} elevation={0}>
      {editMode ? (
        <EditPostForm post={currentPost} closeEditMode={closeEditMode} />
      ) : (
        <div>
          <div>
            <div className={classes.header}>
              <Typography variant='h5' gutterBottom>
                {currentPost?.title}
              </Typography>
              <div>
                <Button
                  color='primary'
                  variant='outlined'
                  onClick={handleScreenReader}
                  startIcon={screenReader ? <MicOffIcon /> : <MicIcon />}
                >
                  {screenReader ? 'Durdur' : 'Dinle'}
                </Button>{' '}
                <Button
                  color='primary'
                  variant='outlined'
                  startIcon={<EditIcon />}
                  onClick={openEditMode}
                >
                  Düzenle
                </Button>{' '}
                <Button
                  color='secondary'
                  variant='outlined'
                  startIcon={<DeleteIcon />}
                  onClick={removePost}
                >
                  Sil
                </Button>
              </div>
            </div>
          </div>
          <Divider />
          <Typography variant='overline' gutterBottom>
            {currentPost?.subtitle}
          </Typography>
          <Typography variant='caption' component='p'>
            {convertRelativeTime(currentPost?.createdAt)} by Başak
          </Typography>
          <Chip
            label={`# ${currentPost?.tag}`}
            variant='outlined'
            className={classes.chip}
          />

          <div className={classes.content}>
            <img
              src={currentPost?.image || noImage}
              alt='Post'
              className={classes.image}
            />
            <Typography variant='body1'>{currentPost?.content}</Typography>
          </div>
        </div>
      )}
    </Paper>
  )
}

export default PostDetails

/*
Dinle butonu onclick 
 speak({
                  text:
                    currentPost.title +
                    currentPost.subtitle +
                    currentPost.content,
                 
                })

                 voice: {
                    default: true,
                    lang: 'en-AU',
                    localService: true,
                    name: 'Karen',
                    voiceURI: 'Karen',
                  }, calismiyorrrr
                  update: calisti,
                  kaynak: https://stackoverflow.com/questions/71655986/change-voice-in-react-speech-kit 
*/

/*
  removePost history.push calismadi navigate yaptim 
  kaynak: https://stackoverflow.com/questions/62861269/attempted-import-error-usehistory-is-not-exported-from-react-router-dom
*/
