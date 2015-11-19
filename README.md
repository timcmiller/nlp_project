[![Build Status](https://travis-ci.org/timcmiller/nlp_project.svg)](https://travis-ci.org/timcmiller/nlp_project)

# nlp_project

Lingo Lemur

lingolemur.com

Sentiment analysis tool

Lingo Lemur is a free and open source project that uses natural language processing algorithms to determine the overall positivity, neutrality or negativity of a text input. The application allows users to receive sentiment analyses of books, articles, songs, tweets or reviews.

The application filters binding, or ‘stop’ words such as ‘about’, ‘the’, and ‘so’ and awards positive, neutral or negative scores to words determined to have sentiment. The values are on a scale of 5 to -5:

4 to 5 = very positive
1 to 3  = positive
0  = neutral
- 1 to - 3 = negative
-4 to -5 = very negative

We are grateful to Finn Årup Nielsen, whose AFINN list we employ for sentiment scoring in English; to the Stop Words project at https://code.google.com/p/stop-words/ for lists of stop words in Swedish, French and Portuguese, and to SentiStrength at http://sentistrength.wlv.ac.uk/ for sentiment scores and negation words in Swedish, French and Portuguese.

Code

Lingo Lemur is written in JavaScript and Node.js, with the following dependencies: 
* body-parser
* express
* lodash
* mongoose
* chai
* gulp
* jshint
* mocha

Examples

```
var text = “The restaurant had a splendid vibe, and the food was incredible. Just brilliant.”
```

The program filters ‘stop’ words and checks the scores of those remaining: 

```
if(afinn[sentimentWords[i]] === 4 || afinn[sentimentWords[i]] === 5) {
        if(returnValue.vPosTerms[sentimentWords[i]]) {
          returnValue.vPosTerms[sentimentWords[i]]++;
        }
```

Averages are calculated based on sentiment scores and word counts: 

```
returnValue.sentimentValue = returnValue.sentimentValue/counter;
```

returning the general sentiment: 

```
  if(returnValue.sentimentValue >= 4) {
    returnValue.sentiment = 'Very Positive';
  }
  return returnValue;
};

var returnValue = sentimentChecker(text);
```

Negation within a sentence or clause reverses the value of the sentiment word scores by tagging words after a negating term

```
var text = "My wife didn't enjoy the salad and the ambience wasn't pleasant."
```
is processed as:

```
``My wife didn't [NOT] enjoy the salad and the ambience wasn't [NOT] pleasant.''
```

Testing

The application runs chai and mocha tests on the sentiment features, routes and the server.

License

The application is released under the MIT license, printed below.
Copyright (c)<2015> <A. Chang, K. Crosland, T. Miller, R. Stringer>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:



The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.



THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.


