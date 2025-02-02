import React from 'react'

interface DocumentIdProps {
    params: {documentId: string}
}

const DocumentIdPage = ({ params } : DocumentIdProps) => {
    const { documentId } = params
  return (
    <div>DocumentId: {documentId}</div>
  )
}

export default DocumentIdPage