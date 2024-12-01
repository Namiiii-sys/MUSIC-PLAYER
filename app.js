let listOfMusic;

const audio = document.getElementById('audio');
const play = document.getElementById('playPause');
const back = document.getElementById('startOver');
const next = document.getElementById('nextOver');
const range = document.getElementById('range');
const time = document.getElementById('endTime');

async function getMusic(){
    const res = await fetch('https://music-next-backend.vercel.app/api');
    const data = await res.json();
    console.log(data);


    const list = document.getElementById('list');
    listOfMusic = data;
    data.forEach(music => {
        const li = document.createElement('p');
        li.id = music.id;
        li.innerHTML = `
            <h2>${music.title}</h2>
        `;
        li.addEventListener('click', () => {
            const audio = document.getElementById('audio');
            const title = document.getElementById('title');
            audio.src = music.url;
            title.innerText = music.title;
            audio.play();
        });
        list.appendChild(li);
    });
}



play.addEventListener('click', () => {
    const audio = document.getElementById('audio');
    if(audio.paused){
        audio.play();
    }
    else{
        audio.pause();
    }
});

back.addEventListener('click', () => {
    const audio = document.getElementById('audio');
    audio.currentTime = 0;
});

next.addEventListener('click', () => {
    const title = document.getElementById('title');
    const len = listOfMusic.length;
    const current = title.innerText;
    // console.log(current)
    const currentId = listOfMusic.findIndex(music => music.title === current);
    console.log(currentId)
    const nextId = (currentId + 1) % len;
    const nextMusic = listOfMusic[nextId];
    audio.src = nextMusic.url;
    audio.play();
    title.innerText = nextMusic.title;
});


range.addEventListener('input', () => {
    const audio = document.getElementById('audio');
    audio.currentTime = range.value;
});

audio.addEventListener('timeupdate', () => {
    range.value = audio.currentTime;
    const min = Math.floor(audio.currentTime / 60);
    const sec = Math.floor(audio.currentTime % 60)
    
    time.innerText = `${min}:${sec}`;
    console.log(audio.currentTime);

});

getMusic();