import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Card, Typography, Button } from 'antd'

const { Title } = Typography
const buttonStyle = { backgroundColor: 'hotpink', border: '2px solid hotpink' }

const LoadImage = ({ setFile, canvasRef, fileLoaded }) => {
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
  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  return (
    <Card
      {...getRootProps()}
      extra={
        fileLoaded && (
          <Button type={'primary'} size={'small'} style={buttonStyle}>
            add image
          </Button>
        )
      }
      title={
        <Title style={{ color: 'grey' }} level={3} strong>
          Pupper Identifier 🐶
        </Title>
      }>
      <canvas ref={canvasRef} width={299} height={299} />
      <input alt='Image Dropzone' type='image' {...getInputProps()} />
    </Card>
  )
}

export default LoadImage
