import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import FileBase64 from 'react-file-base64'
import { Button, TextField, Select, Input, MenuItem } from '@material-ui/core'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { updatePost } from '../actions/post'

const useStyles = makeStyles((theme) => ({
  textField: {
    marginBottom: theme.spacing(2),
  },
  buttons: {
    marginTop: theme.spacing(2),
  },
}))

const tags = ['fun', 'programming', 'health', 'science']

const postSchema = yup.object().shape({
  title: yup.string().required(),
  subtitle: yup.string().required(),
  content: yup.string().min(20).required(),
  tag: yup.mixed().oneOf(tags),
})

const EditPostForm = ({ history, post, closeEditMode }) => {
  const dispatch = useDispatch()
  const [file, setFile] = useState(post?.image)

  const { register, handleSubmit, control, errors, reset } = useForm({
    resolver: yupResolver(postSchema),
  })

  const onSubmit = (data) => {
    const updatedPost = {
      _id: post._id,
      ...data,
      image: file,
    }

    dispatch(updatePost(post._id, updatedPost))

    reset()
    setFile(null)
    closeEditMode()
  }

  const classes = useStyles()
  return (
    <div>
      <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
        <TextField
          id='title'
          label='Başlık'
          name='title'
          variant='outlined'
          className={classes.textField}
          size='small'
          {...register('title')}
          fullWidth
          defaultValue={post?.title}
        />
        <TextField
          id='subtitle'
          label='Alt Başlık'
          name='subtitle'
          variant='outlined'
          className={classes.textField}
          size='small'
          {...register('subtitle')}
          fullWidth
          defaultValue={post?.subtitle}
        />
        <Controller
          render={({}) => (
            <Select
              input={<Input />}
              className={classes.textField}
              fullWidth
              defaultValue={post?.tag}
            >
              {tags.map((tag, index) => (
                <MenuItem key={index} value={tag}>
                  {tag}
                </MenuItem>
              ))}
            </Select>
          )}
          name='tag'
          control={control}
        />
        <TextField
          id='content'
          label='İçerik'
          name='content'
          multiline
          maxRows={7}
          variant='outlined'
          className={classes.textField}
          size='small'
          {...register('content')}
          fullWidth
          defaultValue={post?.content}
        />
        <FileBase64 multiple={false} onDone={({ base64 }) => setFile(base64)} />
        <div className={classes.buttons}>
          <Button color='secondary' variant='outlined' onClick={closeEditMode}>
            Vazgeç
          </Button>{' '}
          <Button color='primary' variant='outlined' type='submit'>
            Kaydet
          </Button>
        </div>
      </form>
    </div>
  )
}

export default EditPostForm

/*
RESOLVER OLAN BUTUN KISIMLARI CIKARDIM

<TextField
              id='title'
              label='Başlık'
              name='title'
              variant='outlined'
              className={classes.textField}
              size='small'
              inputRef={register}
              error={errors.title ? true : false}
              fullWidth
            />
            <TextField
              id='subtitle'
              label='Alt Başlık'
              name='subtitle'
              variant='outlined'
              className={classes.textField}
              size='small'
              inputRef={register} BUNUN YERİNE {...register('content')} KULLANDIM
              error={errors.subtitle ? true : false}  HALA ÇÖZEMEDİM O YÜZDEN KALDIRDIM
              fullWidth
            />

            <Controller
              
            BUNUN YERİNE render KULLANDIM
            as={
                <Select
                  input={<Input />}
                  className={classes.textField}
                  fullWidth
                >
                  {tags.map((tag, index) => (
                    <MenuItem key={index} value={tag}>
                      {tag}
                    </MenuItem>
                  ))}
                </Select>
              }
              name='tag'
              control={control}
              error={errors.tag ? true : false}
              defaultValue={tags[0]}
            />
            <TextField
              id='content'
              label='İçerik'
              name='content'
              multiline
              rows={4}
              variant='outlined'
              className={classes.textField}
              size='small'
              inputRef={register}
              error={errors.content ? true : false}
              fullWidth
            />
*/
