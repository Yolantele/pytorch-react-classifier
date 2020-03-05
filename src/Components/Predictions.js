import React from 'react'
import classes from './classes'
import { getBreedImg, getBreed } from './utils'
import { Typography } from 'antd'

const { Text, Title } = Typography
const getTopK = (acts, k) => {
  const topK = Array.from(acts)
    .map((act, i) => [act, i])
    .sort((a, b) => {
      if (a[0] < b[0]) return -1
      if (a[0] > b[0]) return 1
      return 0
    })
    .reverse()
    .slice(0, k)

  const denominator = acts.map(y => Math.exp(y)).reduce((a, b) => a + b)
  return topK.map(([act, i], _, acts) => ({
    breed: classes[i],
    act,
    prob: Math.exp(act) / denominator
  }))
}

export default function Predictions({ output }) {
  if (!output) return null
  const items = getTopK(output, 3).map(({ breed, prob }) => ({
    name: getBreed(breed),
    percentage: (prob * 100).toFixed(2),
    avatar: getBreedImg(breed)
  }))
  return (
    <>
      <Title level={4}>This pup is most likely:</Title>
      {items.map((each, i) => (
        <div key={i}>
          <Text>
            <strong>{each.name}</strong> - {each.percentage} %
          </Text>
          <br />
        </div>
      ))}
    </>
  )
}
