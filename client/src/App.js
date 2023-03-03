//Switch yerine Routes etiketi kullaniliyor
//Route in kullanim sekli degismis component={PostsList} yerine element={<PostsList />} yaziliyor
//Redirect yerine Navigate kullaniliyor

import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch } from 'react-redux'
import {
  CssBaseline,
  Container,
  Grid,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from '@material-ui/core'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import PenIcon from '@material-ui/icons/Create'
import PostsList from './components/PostsList'
import AddPostForm from './components/AddPostForm'
import { fetchPosts } from './actions/post'
import PostDetails from './components/PostDetails'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  container: {
    marginTop: theme.spacing(3),
  },
}))

const App = () => {
  const dispatch = useDispatch()

  const [open, setOpen] = useState(false)

  useEffect(() => {
    dispatch(fetchPosts())
  }, [dispatch])

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const classes = useStyles()
  return (
    <>
      <CssBaseline />
      <Container maxWidth='lg'>
        <AppBar position='static' color='inherit' elevation={0}>
          <Toolbar>
            <IconButton
              edge='start'
              className={classes.container}
              color='inherit'
            ></IconButton>
            {
              //icon button niye ekledik anlamadım
            }
            <Typography
              variant='h6'
              color='secondary'
              className={classes.title}
            >
              <a href='http://localhost:3000/posts'>Blogify</a>
            </Typography>
            <Button
              color='primary'
              variant='outlined'
              startIcon={<PenIcon />}
              onClick={handleOpen}
            >
              Yeni Yazı
            </Button>
          </Toolbar>
        </AppBar>
        <Grid container className={classes.container}>
          <Grid item xs={12}>
            <Router>
              <Routes>
                <Route exact path='/posts' element={<PostsList />} />
                <Route path='/posts'>
                  <Route path=':id' element={<PostDetails />} />
                </Route>
              </Routes>
            </Router>
          </Grid>
        </Grid>
      </Container>
      <AddPostForm open={open} handleClose={handleClose} />
    </>
  )
}

export default App

// Routes tan sonra <Navigate from='/' to='/posts' /> vardi
// başka bi sayfaya gecince beklemeden posts a donuyordu onu
// engellemek icin bu satiri kaldirdim

// <Route exact path='/posts:id' element={<PostDetails />} />
// seklinde yazildiginda id ye gore sayfa acilmiyordu onun yerine
// <Route path='/posts'>
//   <Route path=':id' element={<PostDetails />} />
// </Route>
// seklinde yazdik kaynak:https://reactrouter.com/docs/en/v6/components/route
