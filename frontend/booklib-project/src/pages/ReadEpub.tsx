import React from 'react'
import { useState } from 'react'
import { ReactReader, IReactReaderProps } from 'react-reader'

const ReadEpub = () => {
    // // And your own state logic to persist state
    // const [location, setLocation] = useState(null)
    // const locationChanged = (epubcifi) => {
    //     // epubcifi is a internal string used by epubjs to point to a location in an epub. It looks like this: epubcfi(/6/6[titlepage]!/4/2/12[pgepubid00003]/3:0)
    //     setLocation(epubcifi)
    // }

    const [location, setLocation] = useState(null);

    //@ts-ignore
    const handleLocationChanged = (epubcifi) => {
        setLocation(epubcifi);
    };

    const epubViewStyles = {
        overflowY: 'scroll',
        height: '500px',
    }

    const epubUrl = '/src/assets/images/174f04ad58ea419ff364792dbe5a992e_unknown.epub'
    return (
        <div style={{ height: '100vh', paddingTop: '90px' }}>
            {/* @ts-ignore */}
            <ReactReader url={epubUrl} epubOptions={{ spread: 'none', flow: 'scrolled' }} locationChanged={handleLocationChanged} />
        </div>
    )
}

export default ReadEpub