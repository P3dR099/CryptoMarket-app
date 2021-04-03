import React from 'react'

const idContext = React.createContext()

export const idProvider = idContext.Provider
export const idConsumer = idContext.Consumer

export default idContext