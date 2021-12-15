import React, { useEffect, useRef, useState } from 'react'

const AboutContent = ({ visible }) => {
  const [detailVisible, setDetailVisible] = useState(false)
  const [maxHeight, setMaxHeight] = useState(0)
  const summaryRef = useRef()

  useEffect(() => {
    if (!visible) {
      setMaxHeight(0)
      setDetailVisible(false)
    }
    const onResize = () => {
      const summaryHeight = summaryRef.current.getBoundingClientRect().height + 30
      const fullHeight = summaryHeight + 100
      setMaxHeight(detailVisible ? fullHeight : summaryHeight)
    }
    onResize()
    window.addEventListener('resize', onResize, true)
    return () => {
      window.removeEventListener('resize', onResize, true)
    }
  }, [visible, detailVisible, setMaxHeight])

  return (
    <div
      id='nofloat'
      style={{
        overflow:'hidden',
        transitionDuration: '700ms',
        maxHeight: visible ? `${maxHeight}px` : '0'
      }}
    >
      <div ref={summaryRef} >
        <h2>This tool uses Machine Learning models to predict the probability of resistance to 5 different antibiotics.</h2>
        <p>
          It is based on ElasticNet models trained on data from the USA and South Africa from the <a href="https://www.pneumogen.net/gps/">GPS</a> database. </p><p>
          Submit as many <em>S.pneumoniae</em> sequences in FASTA format as you wish. The results are available for download as CSV.
        </p>
        <a href='https://github.com/bacpop/AMR_ReactApp' target="_blank" class="button">Website code</a>
        <a href='https://github.com/bacpop/AMR_prediction' target="_blank" class="button">Backend code</a>
      </div>
    </div>
  )
}

const Header = () => {
  const [aboutVisible, setAboutVisible] = useState(false)
  const toggleVisibility = () => {
    setAboutVisible(!aboutVisible)
    try {
      window.scroll({
        top: 0,
        behavior: 'smooth'
      })
    } catch (error) {
      window.scrollTo(0, 0)
    }
  }
  return (
    <header>
      <span>
        <h1>AMR prediction tool for <em>S.pneumoniae</em></h1>
        <button id='about' onClick={toggleVisibility}>
          About
        </button>
      </span>
      <AboutContent visible={aboutVisible}/>
    </header>
  )
}

export default Header