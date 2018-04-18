// // 2. This code loads the IFrame Player API code asynchronously.
// var tag = document.createElement('script');

// tag.src = "https://www.youtube.com/iframe_api";
// var firstScriptTag = document.getElementsByTagName('script')[0];
// firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// var player;
// function onYouTubeIframeAPIReady() {
//     player = new YT.Player('player', {
//         height: '70%',
//         videoId: 'mZ2bsPHz0QI',
//         playerVars: {
//             autoplay: false
//         }
//     });
// }

// function playVideo() {
//     player.playVideo();
// }
// function stopVideo() {
//     player.stopVideo();
// }

let deviceInnerVideoWrap = document.querySelector(".js-device-inner-video");

deviceInnerVideoWrap.addEventListener("click", function() {
  deviceInnerVideoWrap.innerHTML =
    '<iframe width="480" height="360" src="https://www.youtube.com/embed/mZ2bsPHz0QI?autoplay=1" frameborder="0"></iframe>';
});
