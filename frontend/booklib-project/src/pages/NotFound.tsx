import React from 'react'
import illustration from '../assets/images/not-found.png'
import Header from '../components/Header'

const NotFound = () => {
    return (
        <>
            {/*<Header/>*/}
            <div className='not-found'>
                <img src={illustration} alt="page not found" />
            </div>
        </>
    )
}

export default NotFound