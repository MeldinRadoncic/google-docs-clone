import React from 'react'

import { Editor } from './editor'
import { Toolbar } from './toolbar'

// Define the shape of the URL query parameters
interface DocumentIdProps {
    params: {documentId: string}
}

const DocumentIdPage = ({ params } : DocumentIdProps) => {
    const { documentId } = params
    
  return (
    <div className='min-h-screen bg-[#fafbfd]'>
      <Toolbar />
    <Editor />
    </div>
  )
}

export default DocumentIdPage