[![Azure Static Web Apps CI/CD](https://github.com/bacpop/AMR_ReactApp/actions/workflows/azure-static-web-apps-gentle-coast-0d6523403.yml/badge.svg)](https://github.com/bacpop/AMR_ReactApp/actions/workflows/azure-static-web-apps-gentle-coast-0d6523403.yml)

# AMR prediction tool for *S.pneumoniae*

## Overview

https://amr.poppunk.net/ is a tool to predict antimicrobial resistance in __*S.pneumoniae*__. It applies linear models on genetic sequence data to return a probability of resistance to the five antibiotics
- Penicillin
- Chloramphenicol
- Erythromycin
- Tetracycline
- Trimethoprim/Sulfamethoxazole

## Intended use

Files in FASTA format can be uploaded via a drag and drop area. Submission of multiple files at a time is possible.
Files should cover the whole genome to ensure the models can be applied correctly.

Results are displayed in a table, giving the probability of resistance to the respective antibiotic.

The table can be downloaded in CSV format.

## Methods

The models applied are logistic [ElasticNet](https://en.wikipedia.org/wiki/Elastic_net_regularization) models trained on data from the USA and South Africa from the [GPS](https://www.pneumogen.net/gps/) database.

Input features that are generated from the FASTA files are [unitigs](https://pubmed.ncbi.nlm.nih.gov/30419019/#&gid=article-figures&pid=fig-1-uid-0), which are nucleotide sequences of variable length. 

The models have been tested on independent datasets from Massachusetts and Maela (Thailand). The predicted binary resistance status (at a probability threshold of 0.5) was tested against the true recorded phenotype and [Balanced Accuracies](https://statisticaloddsandends.wordpress.com/2020/01/23/what-is-balanced-accuracy/) were calculated:

|Antibiotic|Massachusetts|Maela|
|----------|-------------|-----|
|Penicillin|0.933|0.836|
|Chlorampehnicol| |0.819|
|Erythromycin|0.959|0.961|
|Tetracycline|0.953|0.940|
|Trimethoprim/Sulfamethoxazole|0.954|0.837|

The website was build using React.js. The backend code can be found [here](https://github.com/bacpop/AMR_prediction).

## Contributors

This tool was developed by [Marie Gronemeyer](https://github.com/muppi1993) and [John Lees](https://github.com/johnlees).
