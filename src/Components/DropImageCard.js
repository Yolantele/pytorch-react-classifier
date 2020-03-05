import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Card, Typography, Button } from 'antd'

const { Title } = Typography
const buttonStyle = { backgroundColor: 'hotpink', border: '2px solid hotpink' }

const DropImageCard = ({ setFile, canvasRef, fileLoaded }) => {
  const onDrop = useCallback(
    acceptedFiles => {
      if (acceptedFiles.length > 1) {
        return console.log('can only handle one file at a time')
      }
      if (acceptedFiles.length === 0) return
      const file = acceptedFiles[0]
      if (!file.type.startsWith('image')) {
        return console.log('file must be an image')
      }
      setFile(file)
    },
    [setFile]
  )
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <Card
      {...getRootProps()}
      ref={canvasRef}
      style={{ width: 310, height: 300 }}
      title={
        <Title style={{ color: 'grey' }} level={3} strong>
          Upload an image of a 🐶
        </Title>
      }>
      <input alt='Image Dropzone' type='image' {...getInputProps()} />
      {fileLoaded && (
        <Button style={buttonStyle} type={'primary'}>
          Add image
        </Button>
      )}
    </Card>
  )
}

export default DropImageCard
