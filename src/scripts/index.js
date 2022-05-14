import i18Obj from './languages.js';

document.body.innerHTML = '<div class="wrapper"><main class="main"><h1>Virtual Keyboard</h1><textarea name="textarea" cols="150" rows="20"></textarea><div class="info"><p>Change language: Shift + Alt</p><p>Made for Windows</p></div><div class="keyboard"><div class="keys-row keys-first-row"><div class="key" data-key="tilda"></div><div class="key number" data-key="1"></div><div class="key number" data-key="2"></div><div class="key number" data-key="3"></div><div class="key number" data-key="4"></div><div class="key number" data-key="5"></div><div class="key number" data-key="6"></div><div class="key number" data-key="7"></div><div class="key number" data-key="8"></div><div class="key number" data-key="9"></div><div class="key number" data-key="0"></div><div class="key number" data-key="-"></div><div class="key number" data-key="="></div><div class="key sk" data-key="Backspace"></div></div><div class="keys-row keys-second-row"><div class="key sk" data-key="Tab"></div><div class="key" data-key="q"></div><div class="key" data-key="w"></div><div class="key" data-key="e"></div><div class="key" data-key="r"></div><div class="key" data-key="t"></div><div class="key" data-key="y"></div><div class="key" data-key="u"></div><div class="key" data-key="i"></div><div class="key" data-key="o"></div><div class="key" data-key="p"></div><div class="key" data-key="squareQuoteLeft"></div><div class="key" data-key="squareQuoteRight"></div><div class="key" data-key="SlashBack"></div><div class="key sk" data-key="Delete"></div></div><div class="keys-row keys-third-row"><div class="key sk" data-key="CapsLock"></div><div class="key" data-key="a"></div><div class="key" data-key="s"></div><div class="key" data-key="d"></div><div class="key" data-key="f"></div><div class="key" data-key="g"></div><div class="key" data-key="h"></div><div class="key" data-key="j"></div><div class="key" data-key="k"></div><div class="key" data-key="l"></div><div class="key" data-key="semicolon"></div><div class="key" data-key="singleQuote"></div><div class="key sk" data-key="Enter"></div></div><div class="keys-row keys-fourth-row"><div class="key sk" data-key="Shift"></div><div class="key" data-key="SlashBack">\</div><div class="key" data-key="z"></div><div class="key" data-key="x"></div><div class="key" data-key="c"></div><div class="key" data-key="v"></div><div class="key" data-key="b"></div><div class="key" data-key="n"></div><div class="key" data-key="m"></div><div class="key" data-key="comma"></div><div class="key" data-key="point"></div><div class="key" data-key="Slash">/</div><div class="key sk" data-key="ArrowUp"></div><div class="key sk" data-key="Shift"></div></div><div class="keys-row keys-fiveth-row"><div class="key sk" data-key="Control"></div><div class="key sk" data-key="Meta"></div><div class="key sk" data-key="Alt"></div><div class="key space" data-key=" "></div><div class="key sk" data-key="Alt"></div><div class="key sk" data-key="Control"></div><div class="key sk" data-key="ArrowLeft"></div><div class="key sk" data-key="ArrowDown"></div><div class="key sk" data-key="ArrowRight"></div></div></div></main></div>' + document.body.innerHTML;



let myStorage = window.sessionStorage;
let language = myStorage.getItem('language') || 'en'; // false - English , true - Russian
let isCapsed = true;
let pos = 1;

if (myStorage.getItem('language') == null) {
  myStorage.setItem('language', language);
}

const keys = document.querySelectorAll('[data-key]');
const keyboard = document.querySelector('.keyboard');
const textarea = document.querySelector('textarea');

createKeyboard();
function createKeyboard() {
  keys.forEach((key) =>{
    const atr = key.getAttribute('data-key');
    key.innerHTML = i18Obj[myStorage.getItem('language')][atr];
  });
}

function changeKeys(event) {
  if (language == 'en') {
    language = 'ru';
  } else {
    language = 'en';
  }
  let lang = language;
  keys.forEach((key) =>{
    const atr = key.getAttribute('data-key');
    key.innerHTML = i18Obj[lang][atr];

    if (!isCapsed && (!(key.classList.contains('sk') || key.classList.contains('number') || key.getAttribute('data-key') == ' '))) {
      key.innerHTML = i18Obj[lang][atr].toUpperCase();
    }
  });
  myStorage.setItem('language', language);
}
// keyboard.addEventListener('click', changeKeys);

document.addEventListener('keydown', pressed);
document.addEventListener('keyup', unpressed);

keyboard.addEventListener('mousedown', (event) => {
  if (event.target.classList.contains('key')) {
    if (!event.target.classList.contains('sk')) {
      textarea.value += event.target.textContent;
      textarea.focus();
    }
    event.target.classList.add('clicked');
  }
  if (event.target.getAttribute('data-key') == 'Shift') {
    keys.forEach((key) => {
      if (!(key.classList.contains('sk') || key.classList.contains('number') || key.getAttribute('data-key') == ' ')) {
        if (isCapsed) {
          key.innerHTML = key.innerHTML.toUpperCase();
        } else {
          key.innerHTML = key.innerHTML.toLowerCase();
        }
      }
    });
  }
});
keyboard.addEventListener('mouseup', (event) => {
  if (event.target.classList.contains('key')) {
    event.target.classList.remove('clicked');
    textarea.focus();
  }
  if (event.target.getAttribute('data-key') == 'Shift') {
    keys.forEach((key) => {
      if (!(key.classList.contains('sk') || key.classList.contains('number') || key.getAttribute('data-key') == ' ')) {
        if (isCapsed) {
          key.innerHTML = key.innerHTML.toLowerCase();
        } else {
          key.innerHTML = key.innerHTML.toUpperCase();
        }
      }
    });
  }
});

keyboard.addEventListener('click', (event) => {
  if (event.target.getAttribute('data-key') == 'Backspace') {
    let tempValue = [...textarea.value];
    tempValue.splice([...textarea.value].length - pos, 1);
    textarea.value = tempValue.join('');
    textarea.setSelectionRange([...textarea.value].length - pos, [...textarea.value].length - pos);
  }
  if (event.target.getAttribute('data-key') == 'CapsLock') {
    keys.forEach((key) => {
      if (!(key.classList.contains('sk') || key.classList.contains('number') || key.getAttribute('data-key') == ' ')) {
        if (isCapsed) {
          key.innerHTML = key.innerHTML.toUpperCase();
        } else {
          key.innerHTML = key.innerHTML.toLowerCase();
        }
      }
    });
    isCapsed = !isCapsed;
  }
  if (event.target.getAttribute('data-key') == 'Delete') {
    textarea.focus();
    textarea.setSelectionRange([...textarea.value].length - pos, [...textarea.value].length - pos);
    pos += 1;
  }
});

function pressed(event) {
  if (event.altKey && event.shiftKey) {
    changeKeys();
  }
  if (event.key == 'CapsLock') {
    keys.forEach((key) => {
      if (!(key.classList.contains('sk') || key.classList.contains('number') || key.getAttribute('data-key') == ' ')) {
        if (isCapsed) {
          key.innerHTML = key.innerHTML.toUpperCase();
        } else {
          key.innerHTML = key.innerHTML.toLowerCase();
        }
      }
    });
    isCapsed = !isCapsed;
  }
  if (event.key == 'Shift') {
    keys.forEach((key) => {
      if (!(key.classList.contains('sk') || key.classList.contains('number') || key.getAttribute('data-key') == ' ')) {
        if (isCapsed) {
          key.innerHTML = key.innerHTML.toUpperCase();
        } else {
          key.innerHTML = key.innerHTML.toLowerCase();
        }
      }
    });
  }
  keys.forEach((key) => {
    if (key.getAttribute('data-key').toLowerCase() == event.key.toLowerCase() || i18Obj[language == 'en' ? 'en' : 'ru'][key.getAttribute('data-key')].toLowerCase() == event.key.toLowerCase() || i18Obj[language == 'en' ? 'ru' : 'en'][key.getAttribute('data-key')].toLowerCase() == event.key.toLowerCase()) {
      key.classList.add('clicked');
    }
  });
}

function unpressed(event) {
  keys.forEach((key) => {
    if (key.getAttribute('data-key').toLowerCase() == event.key.toLowerCase() || i18Obj[language == 'en' ? 'en' : 'ru'][key.getAttribute('data-key')].toLowerCase() == event.key.toLowerCase() || i18Obj[language == 'en' ? 'ru' : 'en'][key.getAttribute('data-key')].toLowerCase() == event.key.toLowerCase()) {
      key.classList.remove('clicked');
    }
  });
  if (event.key == 'Shift') {
    keys.forEach((key) => {
      if (!(key.classList.contains('sk') || key.classList.contains('number') || key.getAttribute('data-key') == ' ')) {
        if (isCapsed) {
          key.innerHTML = key.innerHTML.toLowerCase();
        } else {
          key.innerHTML = key.innerHTML.toUpperCase();
        }
      }
    });
  }
}
