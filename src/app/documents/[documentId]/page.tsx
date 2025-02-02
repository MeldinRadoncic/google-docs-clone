import React from 'react'

import { Editor } from './editor'

// Define the shape of the URL query parameters
interface DocumentIdProps {
    params: {documentId: string}
}

const DocumentIdPage = ({ params } : DocumentIdProps) => {
    const { documentId } = params
    
  return (
    <div className='min-h-screen bg-[#fafbfd]'>
    <Editor />
    </div>
  )
}

export default DocumentIdPage