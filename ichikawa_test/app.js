// https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png

const container = document.querySelector('#container');
const baseURL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
const baseURL_voice = 'https://raw.githubusercontent.com/PokeAPI/cries/master/cries/pokemon/legacy/';

for (let i = 1; i <= 151; i++) {
    const pokemon = document.createElement('div');
    pokemon.classList.add('pokemon');

    const label = document.createElement('span');
    label.innerText = `#${i}`;

    const newImg = document.createElement('img');
    newImg.src = `${baseURL}${i}.png`;

    const button = document.createElement('button');
    button.innerText = '鳴き声を聞く';
    button.addEventListener('click', () => {
        const audio = new Audio(`${baseURL_voice}${i}.ogg`);
        audio.volume = 0.2; // 音量を50%に設定
        audio.play();
    });

    pokemon.appendChild(newImg);
    pokemon.appendChild(label);
    pokemon.appendChild(button);
    container.appendChild(pokemon);
}

/* <div>
    <img></img>
    <span>#2</span>
    <button>鳴き声を聞く</button>
</div> */