var audio, playbtn, title, poster, artists, seekslider, seeking = false,
    seekto, currenttimetext, durationtimetext, playlist_status, dir, playlist, ext, agent, playlists_artists, repeat, random;

dir = "songs/";
playlist = ["haciendo", "lomejor", "amorfada", "ignorantes", "juntos", "byemefui", "tesoñe", "renemigos", "reikfalta", "reikconoci", "reikllevar", "reikquedate", "byg", "someone", "lewisgrace", "lewisforever", "lewisleaving", "lewiswhen", "lewisbruises", "lewisdont", "lewisfaded", "lewisone", "lewisrush", "lewismercy", "toogood", "onlyone", "staywith", "laymedown", "la", "yourhead", "whatislove", "iris", "likeyou", "bleedout", "circles", "stay", "something", "jealous", "yanoestes", "bonitofue", "mevas", "lunallena", "talvez", "sientes", "masque", "ultimavez", "teolvide", "misuerte", "enamorate", "quien", "hubierasquerido", "saturno", "recuerdame", "tanto", "cero", "dibujas", "teatro", "emocional", "charcos", "posdata", "cheque", "promesa", "hoja", "viernes13", "mipersona", "esenoseque", "enllamarte", "mylove", "queen", "memory", "elvis", "illwait", "stole", "raging", "this", "gwiyomi", "happier", "show", "youreyes", "cien", "historia", "cielo"]

title = ["Haciendo que me amas", "Te deseo lo mejor", "Amorfada", "Ignorantes", "Si estuviesemos juntos", "Bye me fui", "Te soñe", "Enemigos", "Con la falta que me haces", "Pero te conoci", "Dejate llevar", "Quedate conmigo", "Befor you go", "Someone you love", "Grace", "Forever", "Leaving my love", "When the party", "Bruises", "Dont get me wrong", "Faded", "One", "Rush", "Mercy", "Too good at goodbyes", "Im not only one", "Stay with me", "Law me down", "Locked away", "Your head", "What is love", "Iris", "Someone like you", "Bleed out", "Circles", "Stay", "say something", "Jealous", "Aunque ya no estes aqui", "Que bonito fue", "Me vas a ver", "Luna llena", "Tal vez", "Di que sientes tu", "Mas que amigos", "La ultima vez", "Nunca te olvide", "Mi suerte", "Enamorate de alguien mas", "Quien", "Si hubieras querido", "Saturno", "Recuerdame", "Tanto", "Cero", "Dibujas", "Mi teatro", "Emocional", "Los charcos", "Posdata", "Cheque al portamor vencido", "La promesa", "Hoja en blanco", "Viernes 13", "Mi persona favorita", "Ese no se que", "He pensado en llamarte", "My love", "Love of my life", "Memory", "Cant help falling in love", "Ill wait", "Stole the show", "Raging", "This Town", "Gwiyomi", "Happier", "Show me love", "In your eyes", "cien años", "historia de amor", "de que me sirve el cielo"]
poster = []
artists = ["Badbunny", "Badbunny", "Badbunny", "Badbunny", "Badbunny", "Badbunny", "Jay Wheeler", "Reik", "Reik", "Reik", "Reik", "Reik", "Lewis", "Lewis", "Lewis", "Lewis", "Lewis", "Lewis", "Lewis", "Lewis", "Lewis", "Lewis", "Lewis", "Lewis", "Sam smith", "Sam smith", "Sam smith", "Sam smith", "Adam levine", "Powfu", "Jaymes young", "Sleeping whit sirens", "Adel", "Isak Danielson", "Post malone", "Post malone", "A great big world", "labrinth", "FMK", "Funzo", "Beret", "Malacates", "Malacates", "Chayanne", "Matisse", "Morat", "Morat", "Morat", "Morat", "Pablo Alboran", "Pablo Alboran", "Pablo Alboran", "Pablo Alboran", "Pablo Alboran", "Dani martin", "Dani martin", "Dani martin", "Dani martin", "Dani martin", "Melendi", "Melendi", "Melendi", "Dread mar i", "Marcos menchaca", "Rio roma", "Caztro", "  ", "Sleeping at last", "Queen", "Epica", "Elvis presley", "Kygo", "Kygo", "Kygo", "Kygo", "Hari", "Ed sheeran", "Robin shculz", "Robin shculz", "Pedro infante", "Pedro infante", "Pedro infante"]

playlist_index = 0;

ext = ".mp3"
agent = navigator.userAgent.toLowerCase();
if (agent.indexOf('firefox') != -1 || agent.indexOf('opera') != -1) {
    ext = ".ogg";
}
playbtn = document.getElementById("playpausebtn");
nextbtn = document.getElementById("nextbtn");
prevbtn = document.getElementById("prevbtn");
seekslider = document.getElementById("seekslider");
currenttimetext = document.getElementById("currenttimetext");
durationtimetext = document.getElementById("durationtimetext");
playlist_status = document.getElementById("playlist_status");
playlists_artists = document.getElementById("playlist_artist");
repeat = document.getElementById("repeat");
randomSong = document.getElementById("random");

audio = new Audio();
audio.src = dir + playlist[0] + ext;
audio.loop = false;

playlist_status.innerHTML = title[playlist_index];
playlists_artists.innerHTML = artists[playlist_index];

playbtn.addEventListener("click", playPause);
nextbtn.addEventListener("click", nextSong);
prevbtn.addEventListener("click", prevSong);
seekslider.addEventListener("mousedown", function(event) {
    seeking = true;
    seek(event);
});
seekslider.addEventListener("mousemove", function(event) { seek(event); });

seekslider.addEventListener("mouseup", function() { seeking = false; });

audio.addEventListener("timeupdate", function() { seektimeupdate(); });
audio.addEventListener("ended", function() {
    switchTrack();
});
repeat.addEventListener("click", loop);
randomSong.addEventListener("click", random);




//functions

function fetchMusicDetail() {
    $("#image").attr("src", poster[playlist_index]);

    playlist_status.innerHTML = title[playlist_index];
    playlist_artist.innerHTML = artists[playlist_index];

    audio.src = dir + playlist[playlist_index] + ext;
    audio.play();
}


function getRandomNumber(min, max) {
    let step1 = max - min + 1;
    let step2 = Math.random() * step1;
    let result = Math.floor(step2) + min;
    return result;
}

function random() {
    let randomIndex = getRandomNumber(0, playlist.length - 1);
    playlist_index = randomIndex;
    fetchMusicDetail();
    document.querySelector(".playpause").classList.add("active");
}

function loop() {
    if (audio.loop) {
        audio.loop = false;
        document.querySelector(".loop").classList.remove("active");
    } else {
        audio.loop = true;
        document.querySelector(".loop").classList.add("active");
    }
}

function nextSong() {
    document.querySelector(".playpause").classList.add("active");
    playlist_index++;
    if (playlist_index > playlist.length - 1) {
        playlist_index = 0;
    }
    fetchMusicDetail();
}

function prevSong() {
    document.querySelector(".playpause").classList.add("active");
    playlist_index--;
    if (playlist_index < 0) {
        playlist_index = playlist.length - 1;
    }
    fetchMusicDetail();
}

function playPause() {
    if (audio.paused) {
        audio.play();
        document.querySelector(".playpause").classList.add("active");
    } else {
        audio.pause();
        document.querySelector(".playpause").classList.remove("active");
    }
}

function switchTrack() {
    if (playlist_index == (playlist.length - 1)) {
        playlist_index = 0;
    } else {
        playlist_index++;
    }
    fetchMusicDetail();
}

function seek(event) {
    if (audio.duration == 0) {
        null
    } else {
        if (seeking) {
            seekslider.value = event.clientX - seekslider.offsetLeft;
            seekto = audio.duration * (seekslider.value / 100);
            audio.currentTime = seekto;
        }
    }
}

function seektimeupdate() {
    if (audio.duration) {
        var nt = audio.currentTime * (100 / audio.duration);
        seekslider.value = nt;
        var curmins = Math.floor(audio.currentTime / 60);
        var cursecs = Math.floor(audio.currentTime - curmins * 60);
        var durmins = Math.floor(audio.duration / 60);
        var dursecs = Math.floor(audio.duration - durmins * 60);
        if (cursecs < 10) { cursecs = "0" + cursecs; }
        if (dursecs < 10) { dursecs = "0" + dursecs; }
        if (curmins < 10) { curmins = "0" + curmins; }
        if (durmins < 10) { durmins = "0" + durmins; }
        currenttimetext.innerHTML = curmins + ":" + cursecs;
        durationtimetext.innerHTML = durmins + ":" + dursecs;
    } else {
        currenttimetext.innerHTML = "00" + ":" + "00";
        durationtimetext.innerHTML = "00" + ":" + "00";
    }
}

let checkbox = document.querySelector('input[name=theme]');
checkbox.addEventListener('change', function() {
    if (this.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
    }
})