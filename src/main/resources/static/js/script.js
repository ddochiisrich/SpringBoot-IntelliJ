$(document).ready(function() {
    var video = $('#video')[0];
    var playPauseBtn = $('#playPauseBtn');
    var rewindBtn = $('#rewindBtn');
    var forwardBtn = $('#forwardBtn');
    var seekBar = $('#seekBar');
    var muteBtn = $('#muteBtn');
    var volumeBar = $('#volumeBar');
    var fullScreenBtn = $('#fullScreenBtn');
    var speedBtn = $('#speedBtn');
    var timeDisplay = $('#timeDisplay');
    var playbackRate = 1;
    var previousVolume = 1; // 이전 볼륨 값을 저장하는 변수

    function updateDisplayTime() {
        var currentMinutes = Math.floor(video.currentTime / 60);
        var currentSeconds = Math.floor(video.currentTime % 60);
        var durationMinutes = Math.floor(video.duration / 60);
        var durationSeconds = Math.floor(video.duration % 60);
        currentSeconds = currentSeconds < 10 ? '0' + currentSeconds : currentSeconds;
        durationSeconds = durationSeconds < 10 ? '0' + durationSeconds : durationSeconds;
        timeDisplay.text(`${currentMinutes}:${currentSeconds} / ${durationMinutes}:${durationSeconds}`);
    }

    // 볼륨 아이콘 업데이트 함수
    function updateVolumeIcon(volume) {
        if (volume === 0) {
            muteBtn.html('<i class="fa-solid fa-volume-xmark"></i>');
        } else if (volume <= 0.33) {
            muteBtn.html('<i class="fa-solid fa-volume-off"></i>');
        } else if (volume <= 0.66) {
            muteBtn.html('<i class="fa-solid fa-volume-low"></i>');
        } else {
            muteBtn.html('<i class="fa-solid fa-volume-high"></i>');
        }
    }

    $(video).on('loadedmetadata timeupdate', function() {
        var value = (100 / video.duration) * video.currentTime;
        seekBar.val(value);
        updateDisplayTime();
    });

    playPauseBtn.click(function() {
        if (video.paused) {
            video.play();
            playPauseBtn.html('<i class="fa-solid fa-pause"></i>');
        } else {
            video.pause();
            playPauseBtn.html('<i class="fa-solid fa-play"></i>');
        }
    });

    rewindBtn.click(() => video.currentTime = Math.max(0, video.currentTime - 5));
    forwardBtn.click(() => video.currentTime = Math.min(video.duration, video.currentTime + 5));

    seekBar.on('input', function() {
        video.currentTime = video.duration * (seekBar.val() / 100);
    });

    muteBtn.click(function() {
        if (video.muted) {
            video.muted = false;
            video.volume = previousVolume;
            volumeBar.val(previousVolume);
            updateVolumeIcon(previousVolume);
        } else {
            previousVolume = video.volume;
            video.muted = true;
            video.volume = 0;
            volumeBar.val(0);
            muteBtn.html('<i class="fa-solid fa-volume-xmark"></i>');
        }
    });

    volumeBar.on('input', function() {
        var volume = parseFloat(volumeBar.val());
        video.volume = volume;
        video.muted = (volume === 0);
        updateVolumeIcon(volume);
    });

    fullScreenBtn.click(function() {
        if (video.requestFullscreen) {
            video.requestFullscreen();
        } else if (video.mozRequestFullScreen) {
            video.mozRequestFullScreen();
        } else if (video.webkitRequestFullscreen) {
            video.webkitRequestFullscreen();
        } else if (video.msRequestFullscreen) {
            video.msRequestFullscreen();
        }
    });

    speedBtn.click(function() {
        playbackRate = playbackRate === 1 ? 1.5 : playbackRate === 1.5 ? 2 : 1;
        video.playbackRate = playbackRate;
        speedBtn.text('x' + playbackRate);
    });
});
