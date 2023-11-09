const alphabet = 'abcdefghijklmnñopqrstuvwxyz';
const letters = {
    'a': 0, 'b': 1, 'c': 2, 'd': 3, 'e': 4, 'f': 5, 'g': 6, 'h': 7, 'i': 8, 'j': 9,
    'k': 10, 'l': 11, 'm': 12, 'n': 13, 'ñ': 14, 'o': 15, 'p': 16, 'q': 17, 'r': 18,
    's': 19, 't': 20, 'u': 21, 'v': 22, 'w': 23, 'x': 24, 'y': 25, 'z': 27
  };
  
var chart;
var mostCommonLetter;
var secondCommonLetter;

function deleteChart(){
  chart.destroy();
}


function updateStatistics() {
  const inputText = document.getElementById('inputText');
  const letterChart = document.getElementById('letterChart').getContext('2d');
  const text = inputText.value.toLowerCase().replace(/[^a-zñ]/g, ''); // Remove non-letter characters and convert to lowercase
  const letterCount = {};
  
  for (const letter of text) {
    letterCount[letter] = (letterCount[letter] || 0) + 1;
  }
  
  const sortedLetters = Object.keys(letterCount).sort((a, b) => letterCount[b] - letterCount[a]);
  const letterData = sortedLetters.map(letter => letterCount[letter]);

  mostCommonLetter = sortedLetters[0];
  secondCommonLetter = sortedLetters[1];  


  chart = new Chart(letterChart, {
    class:"bg-light",
    type: 'bar',
    data: {
      labels: sortedLetters,
      datasets: [{
        label: 'Letter Frequency',
        data: letterData,
        backgroundColor: 'rgba(52, 152, 219, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}


function modInverse(a, m) {
    a = ((a % m) + m) % m;
    for (let x = 1; x < m; x++) {
        if ((a * x) % m === 1) {
            return x;
        }
    }
    return 1;
}

function encode() {
  if(document.getElementById('a').value!="" && document.getElementById('b').value!=""){
    const message = clearTildes(document.getElementById('inputText').value.toLowerCase());
    const a = parseInt(document.getElementById('a').value);
    const b = parseInt(document.getElementById('b').value);
    const comprime = isCoprimeWith27(a);
    let result = '';
    if(comprime){
      for (let i = 0; i < message.length; i++) {
        const char = message[i];
        if (char === ' ') {
            result += ' ';
        } else {
            const charIndex = alphabet.indexOf(char);
            const encodedIndex = (a * charIndex + b) % 27;
            result += alphabet[encodedIndex];
        }
    }
    document.getElementById('result').value = result.toUpperCase();
    }else{
      alert(a + ' is not coprime with 27');
    } 
  }else{
    alert('Enter values a and b');
  }
    
}

function clearTildes(cadena) {
  // Reemplazar caracteres especiales con una expresión regular
  const caracteresEspeciales = /[0-9.,\/#!$%\^&\*;:{}=\-_`~()?áÁéÉíÍóÓúÚüÜ]/g;


  // Objeto de mapeo de caracteres con tilde a sus equivalentes sin tilde
  const caracteresConTilde = {
    'á': 'a', 'Á': 'A', 'é': 'e', 'É': 'E', 'í': 'i', 'Í': 'I',
    'ó': 'o', 'Ó': 'O', 'ú': 'u', 'Ú': 'U', 'ü': 'u', 'Ü': 'U'
  };

  // Reemplazar tildes y diacríticos utilizando el objeto de mapeo
  const cadenaSinTilde = cadena.replace(/[áÁéÉíÍóÓúÚüÜ]/g, (match) =>
    caracteresConTilde[match]
  );
  const cadenaLimpia = cadenaSinTilde.replace(caracteresEspeciales, '');

  return cadenaSinTilde;
}

function decode() {
  if(document.getElementById('a').value!="" && document.getElementById('b').value!=""){
    const message = document.getElementById('inputText').value.toLowerCase();
    const a = parseInt(document.getElementById('a').value);
    const b = parseInt(document.getElementById('b').value);
    const aInverse = modInverse(a, 27);
    let result = '';

    for (let i = 0; i < message.length; i++) {
        const char = message[i];
        if (char === ' ') {
            result += ' ';
        } else {
            const charIndex = alphabet.indexOf(char);
            const decodedIndex = (aInverse * (charIndex - b + 27)) % 27;
            result += alphabet[decodedIndex];
        }
    }

    document.getElementById('result').value = result;
  }else{
    alert('Enter a and b values');
  }
}
function gcd(a, b) {
  if (b === 0) {
      return a;
  }
  return gcd(b, a % b);
}

function isCoprimeWith27(number) {
  return gcd(number, 27) === 1;
}


