module.exports = exports = function(value, language) {
  var sentiment = '';
  if(value <= -4) {
    if(language === 'fr') {
      sentiment = 'Très Négatif';
    } else if(language === 'pt') {
      sentiment = 'Muito Negativo';
    } else if(language === 'sw') {
      sentiment = 'Mycket Negativt';
    } else {
      sentiment = 'Very Negative';
    }
  }
  if(value > -4 && value < -1) {
    if(language === 'fr') {
      sentiment = 'Négatif';
    } else if(language === 'pt') {
      sentiment = 'Negativo';
    } else if(language === 'sw') {
      sentiment = 'Negativt';
    } else {
      sentiment = 'Negative';
    }
  }
  if(value >= -1 && value < 0) {
    if(language === 'fr') {
      sentiment = 'Plutôt Négatif';
    } else if(language === 'pt') {
      sentiment = 'Bastante Negativo';
    } else if(language === 'sw') {
      sentiment = 'Ganska Negativt';
    } else {
      sentiment = 'Midly Negative';
    }
  }
  if((value >= -0.4 && value <= 0.4) || isNaN(value)) {
    if(language === 'fr') {
      sentiment = 'Neutre';
    } else if(language === 'pt') {
      sentiment = 'Neutro';
    } else {
      sentiment = 'Neutral';
    }
  }
  if(value > 0 && value <= 1) {
    if(language === 'fr') {
      sentiment = 'Plutôt Positif';
    } else if(language === 'pt') {
      sentiment = 'Bastante Positivo';
    } else if(language === 'sw') {
      sentiment = 'Ganska Positivt';
    } else {
      sentiment = 'Midly Positive';
    }
  }
  if(value > 1 && value < 4) {
    if(language === 'fr') {
      sentiment = 'Positif';
    } else if(language === 'pt') {
      sentiment = 'Positivo';
    } else if(language === 'sw') {
      sentiment = 'Positivt';
    } else {
      sentiment = 'Positive';
    }
  }
  if(value >= 4) {
    if(language === 'fr') {
      sentiment = 'Très positif';
    } else if(language === 'pt') {
      sentiment = 'Muito Positivo';
    } else if(language === 'sw') {
      sentiment = 'Mycket Positivt';
    } else {
      sentiment = 'Very Positive';
    }
  }

  return sentiment;
};
