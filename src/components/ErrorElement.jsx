import React from 'react'
import { useRouteError } from 'react-router-dom'

const ErrorElement = () => {

    const error = useRouteError();
    console.log(error);
  return (
    <div>
      <h4 className='font-bold text-4xl'>error 0404</h4>
    </div>
  )
}

export default ErrorElement
