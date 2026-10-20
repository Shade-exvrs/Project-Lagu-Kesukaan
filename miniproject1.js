const boxes = document.querySelectorAll('.box-container > div');
const FADE_DURATION = 800; // ms, silakan sesuaikan
const FADE_STEP = 50; // interval tiap step, ms

boxes.forEach(box => {
    const audio = box.querySelector('.box-audio');
    if (!audio) return;

    let fadeInterval = null;

    function fadeTo(targetVolume, onComplete) {
        clearInterval(fadeInterval);

        const steps = FADE_DURATION / FADE_STEP;
        const volumeStep = (targetVolume - audio.volume) / steps;

        fadeInterval = setInterval(() => {
            let newVolume = audio.volume + volumeStep;

            if ((volumeStep > 0 && newVolume >= targetVolume) ||
                (volumeStep < 0 && newVolume <= targetVolume)) {
                newVolume = targetVolume;
                clearInterval(fadeInterval);
                if (onComplete) onComplete();
            }

            audio.volume = newVolume;
        }, FADE_STEP);
    }

    box.addEventListener('mouseenter', () => {
        audio.currentTime = 0;
        audio.volume = 0;
        audio.play();
        fadeTo(1);
    });

    box.addEventListener('mouseleave', () => {
        fadeTo(0, () => {
            audio.pause();
            audio.currentTime = 0;
        });
    });
});