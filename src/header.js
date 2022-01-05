import React, { useEffect, useRef, useState } from 'react'

const AboutContent = ({ visible }) => {
  const [detailVisible, setDetailVisible] = useState(false)
  const [maxHeight, setMaxHeight] = useState(0)
  const summaryRef = useRef()
  const moreInfoRef = useRef()

  const toggleDetail = () => {
    setDetailVisible(!detailVisible)

  }

  useEffect(() => {
    if (!visible) {
      setMaxHeight(0)
      setDetailVisible(false)
    }
    const onResize = () => {
      const summaryHeight = summaryRef.current.getBoundingClientRect().height + 30
      const fullHeight = summaryHeight + moreInfoRef.current.getBoundingClientRect().height + 100
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
        <p>
          This tool predicts the probability of resistance to 5 different antibiotics in <em>S.pneumoniae</em>. 
        </p>
        <p>
          Predictions are based on genetic sequence content, therefore FASTA-files are required as input data. Linear models, trained on data from the USA and South Africa from the <a href="https://www.pneumogen.net/gps/">GPS</a> database, are applied and return probabilities of resistance to the respective antibiotics.
        </p>
        <p>
        All data is processed within the web browser, which means that no data is uploaded to a server. This ensures that data protection is maintained.
        </p>
        <div class="buttons-flex">
          <button id="info" onClick={toggleDetail}>More info</button>
          <button id="info"><a href='https://github.com/bacpop/AMR_ReactApp' target="_blank" rel="noreferrer">Website code</a></button>
          <button id="info"><a href='https://github.com/bacpop/AMR_prediction' target="_blank" rel="noreferrer">Backend code</a></button>
        </div>
        
      </div>

      <div ref={moreInfoRef}>
        <h3>
          Intended use:
        </h3>
        <p>
          This tool can help identifying resistant <em>S.pneumoniae</em> isolates based on their genetic sequence. FASTA files should contain the whole genome to ensure all relevant sequences are covered if present.
        </p>
        <p>
          It is intended for use on <em>S.pneumoniae</em> only, other species are not covered. The performance of the models (see below) on independent test datasets can help you to better interpret the reliability of the predictions. Please keep in mind that data from very different genetic backgrounds to the training and test datasets may perform worse.
        </p>
        <p>
          The colour shading of the results table depends on the strength of the prediction and also on the distribution of test dataset results for the respective antibiotic. Since the models for chloramphenicol and tetracycline provide most results near 0.5, the change in shades is more pronounced in this area. Models for penicillin and trim/sulfa provided more results near 0 and 1, so for these antibiotics the shading changes more towards the extremes. For erythromycin, the shading changes linearly with the probability.
        </p>
        <p>
          You can submit as many <em>S.pneumoniae</em> sequences in FASTA format as you wish. The results are available for download as CSV.
          </p>
        <h3>
          Models:
        </h3>
        <p>
          The models used for prediction are 
          logistic <div className="tooltip" >ElasticNet<span className='tooltiptext' id='glossary'>A machine learning model that performs both feature selection and coefficient shrinkage to prevent overfitting. It can handle more input features than datapoints, and is also able to handle collinear features.</span></div> models, 
          trained with <div className="tooltip" >unitigs<span className='tooltiptext' id='glossary'>Nucleotide sequences of variable length that are based on <a href="https://pubmed.ncbi.nlm.nih.gov/30419019/#&gid=article-figures&pid=fig-1-uid-0" target="_blank" rel="noreferrer" style={{"color":"lightblue"}}>De Bruijn graphs</a>, which represent the genetic variability in a population and can capture both small and larger genetic changes.</span></div> as 
          input features. The predicted output is a binary resistance status (susceptible and resistant, according to the <a href="https://www.nih.org.pk/wp-content/uploads/2021/02/CLSI-2020.pdf" target="_blank" rel="noreferrer">CLSI</a> breakpoints, classifying ‘intermediate’ and ‘resistant’ together as ‘resistant’). Probabilities of resistance are calculated, and samples classified according to their probability at a threshold of 0.5.
        </p>
        <p>
          The performance of the models were tested on two independent datasets, one from Massachusetts and one from Maela in Thailand, 
          and <div className="tooltip" >Balanced Accuracies<span className='tooltiptext' id='glossary_end'>A metric to evaluate the predictive performance, calculated by (Sensitivity+Specificity)/2, that accounts for class-imbalances in the data.</span></div> were 
          calculated to assess the predictive performance of the binary classification. See the below table for the Balanced Accuracies on the test datasets:
        </p>
        <table className="center" id='simpletable'>
          <thead>
            <tr>
              <th></th>
              <th>Penicillin</th>
              <th>Chloramphenicol</th>
              <th>Erythromycine</th>
              <th>Tetracycline</th>
              <th>Trim_sulfa</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Massachusetts</td>
              <td>0.933</td>
              <td></td>
              <td>0.959</td>
              <td>0.953</td>
              <td>0.954</td>
            </tr>
            <tr>
              <td>Maela</td>
              <td>0.836</td>
              <td>0.819</td>
              <td>0.961</td>
              <td>0.940</td>
              <td>0.837</td>
            </tr>
          </tbody>
        </table>
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