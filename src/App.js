import React from 'react'
import './App.css'
import { Typography, Button } from 'antd'
import Classifier from './Components/Classifier'

const CONTENT_STYLE = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  flexDirection: 'column',
  backgroundColor: 'lightgrey'
}

const { Title } = Typography

const App = () => {
  return (
    <div style={CONTENT_STYLE}>
      <Classifier />
      <Button
        type={'link'}
        onClick={() => window.open('https://medium.com/@klpdjolanta', '_blank')}>
        by Jolanta J.
      </Button>
    </div>
  )
}

export default App
