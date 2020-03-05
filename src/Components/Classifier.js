import React, { useRef, useEffect, useState } from 'react'
import Predictions from './Predictions'
import DropImageCard from './DropImageCard'
import { fetchImage, makeSession, loadModel, runModel } from './utils'
import { Button, Typography, Card, Spin } from 'antd'

const { Text } = Typography
const session = makeSession()
const buttonStyle = { backgroundColor: 'hotpink', border: '2px solid hotpink' }
const Classifier = () => {
  const [loaded, setLoaded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const startLoadModel = async () => {
    if (isLoading || loaded) {
      return
    }
    setIsLoading(true)
    await loadModel(session)
    setLoaded(true)
    setIsLoading(false)
  }

  const [file, setFile] = useState(null)
  const canvas = useRef(null)
  const [data, setData] = useState(null)

  useEffect(() => {
    if (file) fetchImage(file, canvas, setData)
  }, [file])

  const [outputMap, setOutputMap] = useState(null)

  useEffect(() => {
    if (!loaded || !data) return
    runModel(session, data, setOutputMap)
  }, [loaded, data]) // runs when loaded or data changes
  const outputData = outputMap && outputMap.values().next().value.data

  return (
    <div>
      <Card>
        <DropImageCard setFile={setFile} canvasRef={canvas} fileLoaded={loaded && !data} />
        <div style={{ marginTop: 20 }}>
          {!loaded && !isLoading && (
            <Button type={'primary'} style={buttonStyle} onClick={startLoadModel}>
              Load model
            </Button>
          )}
          {!loaded && isLoading && <Spin />}
          {loaded && data && !outputMap && <Text>Running model...</Text>}
          {!!file && !data && <Text>Loading image...</Text>}
        </div>
      </Card>
      <Card>
        <Predictions output={outputData} />
      </Card>
    </div>
  )
}

export default Classifier
