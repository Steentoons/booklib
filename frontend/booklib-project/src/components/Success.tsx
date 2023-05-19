import React from 'react'

interface SuccessProps {
    success: string | undefined
}

const Success = ({success}: SuccessProps) => {
  return (
    <div className='success-wrapper'>
        {typeof success === 'string' && <div className='success'>{success}</div>}
    </div>
  )
}

export default Success