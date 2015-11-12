'use strict';

var analysis = require('../build/afinn.json');
var fs = require('fs');

veryNegTerms =
negTerms =
posTerms =
vPosTerms =


results  = combine(posResult, negResult)
//run naive bayes algorithm using all 4 categories

Classifier = naiveBayes
