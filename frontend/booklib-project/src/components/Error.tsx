import React from 'react'

interface ErrorProps {
    error: string | undefined
}

const Error = ({error}: ErrorProps) => {
  return (
    <div className='error-wrapper'>
        {typeof error === 'string' && <div className='error'>{error}</div>}
    </div>
  )
}

export default Error