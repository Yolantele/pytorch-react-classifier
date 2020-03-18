import React, { useRef, useEffect, useState } from 'react'
import Predictions from './Predictions'
import LoadImage from './LoadImage'
import { fetchImage, makeSession, loadModel, runModel } from './utils'
import { Card, Spin } from 'antd'

const session = makeSession()
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

  useEffect(() => {
    if (!loaded && !isLoading) startLoadModel()
  }, [])

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
        <LoadImage setFile={setFile} canvasRef={canvas} fileLoaded={loaded} />
        <div style={{ marginTop: 20, textAlign: 'center' }}>
          {!loaded && isLoading && <Spin tip='Loading Model in just a sec...' />}
          {loaded && data && !outputMap && <Spin tip='Running model..' />}
          {!!file && !data && <Spin tip='Loading image..' />}
        </div>
      </Card>
      <Card>
        <Predictions output={outputData} />
      </Card>
    </div>
  )
}

export default Classifier
