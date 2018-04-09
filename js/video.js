// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '70%',
        videoId: 'mZ2bsPHz0QI',
        playerVars: {
            autoplay: false
        }
    });
}

function playVideo() {
    player.playVideo();
}
function stopVideo() {
    player.stopVideo();
}