/**
 * Kawaki Studios — Accessible Blog Article Audio Player
 * Clean, zero-dependency, progressive hydration audio engine
 */

(function () {
    'use strict';

    function initAudioPlayers() {
        const playerWrappers = document.querySelectorAll('.kawaki-audio-player-wrapper');
        if (!playerWrappers.length) return;

        // Global audio coordinator to prevent multiple simultaneous playbacks
        if (!window.__kawakiActiveAudio) {
            window.__kawakiActiveAudio = null;
        }

        playerWrappers.forEach((wrapper) => {
            const audioSrc = wrapper.getAttribute('data-audio-src');
            const articleTitle = wrapper.getAttribute('data-title') || 'Article Audio Overview';
            if (!audioSrc) return;

            const audio = new Audio();
            audio.src = audioSrc;
            audio.preload = 'metadata';

            const playBtn = wrapper.querySelector('.kawaki-btn-play');
            const skipBackBtn = wrapper.querySelector('.kawaki-btn-skip-back');
            const skipFwdBtn = wrapper.querySelector('.kawaki-btn-skip-fwd');
            const progressBar = wrapper.querySelector('.kawaki-progress-bar-container');
            const progressFilled = wrapper.querySelector('.kawaki-progress-filled');
            const currentTimeDisplay = wrapper.querySelector('.kawaki-current-time');
            const totalDurationDisplay = wrapper.querySelector('.kawaki-total-duration');
            const speedBtn = wrapper.querySelector('.kawaki-speed-btn');
            const volumeBtn = wrapper.querySelector('.kawaki-volume-btn');

            const speeds = [0.75, 1.0, 1.25, 1.5, 1.75, 2.0];
            let currentSpeedIndex = 1; // 1.0x

            function formatTime(seconds) {
                if (isNaN(seconds) || seconds < 0) return '0:00';
                const mins = Math.floor(seconds / 60);
                const secs = Math.floor(seconds % 60);
                return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
            }

            function updatePlayState(isPlaying) {
                if (isPlaying) {
                    wrapper.classList.add('is-playing');
                    if (playBtn) {
                        playBtn.setAttribute('aria-label', 'Pause article narration');
                        playBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"/></svg>';
                    }
                    if (miniPlayer) miniPlayer.classList.add('is-active');
                } else {
                    wrapper.classList.remove('is-playing');
                    if (playBtn) {
                        playBtn.setAttribute('aria-label', 'Play article narration');
                        playBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/></svg>';
                    }
                    if (miniPlayer && audio.paused) miniPlayer.classList.remove('is-active');
                }
            }

            // Mobile sticky mini-player element
            let miniPlayer = document.getElementById('kawakiMiniPlayer');
            if (!miniPlayer) {
                miniPlayer = document.createElement('div');
                miniPlayer.id = 'kawakiMiniPlayer';
                miniPlayer.className = 'kawaki-sticky-mini-player';
                miniPlayer.innerHTML = `
                    <div class="kawaki-mini-title">${articleTitle}</div>
                    <div class="kawaki-mini-controls">
                        <button class="kawaki-mini-play-btn" aria-label="Toggle play" style="background:#C6FF00;border:none;border-radius:50%;width:34px;height:34px;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#111;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16"><path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/></svg>
                        </button>
                    </div>
                `;
                document.body.appendChild(miniPlayer);

                const miniPlayBtn = miniPlayer.querySelector('.kawaki-mini-play-btn');
                miniPlayBtn.addEventListener('click', () => {
                    if (audio.paused) {
                        audio.play();
                    } else {
                        audio.pause();
                    }
                });
            }

            // Play / Pause Toggle
            if (playBtn) {
                playBtn.addEventListener('click', () => {
                    if (audio.paused) {
                        // Pause any other active player on page
                        if (window.__kawakiActiveAudio && window.__kawakiActiveAudio !== audio) {
                            window.__kawakiActiveAudio.pause();
                        }
                        window.__kawakiActiveAudio = audio;
                        audio.play().catch(e => console.warn('[Audio Player] Playback prevented:', e));
                    } else {
                        audio.pause();
                    }
                });
            }

            audio.addEventListener('play', () => {
                updatePlayState(true);
                if ('mediaSession' in navigator) {
                    navigator.mediaSession.metadata = new MediaMetadata({
                        title: articleTitle,
                        artist: 'Kawaki Studios',
                        album: 'Technical Engineering Editorial'
                    });
                }
            });

            audio.addEventListener('pause', () => updatePlayState(false));
            audio.addEventListener('ended', () => {
                updatePlayState(false);
                if (progressFilled) progressFilled.style.width = '100%';
            });

            // Time Updates
            audio.addEventListener('timeupdate', () => {
                if (audio.duration) {
                    const pct = (audio.currentTime / audio.duration) * 100;
                    if (progressFilled) progressFilled.style.width = `${pct}%`;
                    if (currentTimeDisplay) currentTimeDisplay.textContent = formatTime(audio.currentTime);
                    if (progressBar) progressBar.setAttribute('aria-valuenow', Math.round(audio.currentTime));
                }
            });

            audio.addEventListener('loadedmetadata', () => {
                if (totalDurationDisplay && audio.duration) {
                    totalDurationDisplay.textContent = formatTime(audio.duration);
                }
                if (progressBar && audio.duration) {
                    progressBar.setAttribute('aria-valuemax', Math.round(audio.duration));
                }
            });

            // Skip backward / forward 15s
            if (skipBackBtn) {
                skipBackBtn.addEventListener('click', () => {
                    audio.currentTime = Math.max(0, audio.currentTime - 15);
                });
            }

            if (skipFwdBtn) {
                skipFwdBtn.addEventListener('click', () => {
                    audio.currentTime = Math.min(audio.duration || Infinity, audio.currentTime + 15);
                });
            }

            // Scrubbing Progress Bar
            if (progressBar) {
                function seek(e) {
                    const rect = progressBar.getBoundingClientRect();
                    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
                    const pos = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
                    if (audio.duration) {
                        audio.currentTime = pos * audio.duration;
                    }
                }

                progressBar.addEventListener('click', seek);
                progressBar.addEventListener('keydown', (e) => {
                    if (e.key === 'ArrowLeft') {
                        audio.currentTime = Math.max(0, audio.currentTime - 5);
                    } else if (e.key === 'ArrowRight') {
                        audio.currentTime = Math.min(audio.duration || Infinity, audio.currentTime + 5);
                    }
                });
            }

            // Speed Selector Toggle
            if (speedBtn) {
                speedBtn.addEventListener('click', () => {
                    currentSpeedIndex = (currentSpeedIndex + 1) % speeds.length;
                    const newSpeed = speeds[currentSpeedIndex];
                    audio.playbackRate = newSpeed;
                    speedBtn.textContent = `${newSpeed}x`;
                    speedBtn.setAttribute('aria-label', `Playback speed ${newSpeed}x`);
                });
            }

            // Volume Mute Toggle
            if (volumeBtn) {
                volumeBtn.addEventListener('click', () => {
                    audio.muted = !audio.muted;
                    if (audio.muted) {
                        volumeBtn.setAttribute('aria-label', 'Unmute audio');
                        volumeBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06zm7.137 2.096a.5.5 0 0 1 0 .708L12.207 8l1.647 1.646a.5.5 0 0 1-.708.708L11.5 8.707l-1.646 1.647a.5.5 0 0 1-.708-.708L10.793 8 9.146 6.354a.5.5 0 1 1 .708-.708L11.5 7.293l1.646-1.647a.5.5 0 0 1 .708 0z"/></svg>';
                    } else {
                        volumeBtn.setAttribute('aria-label', 'Mute audio');
                        volumeBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z"/><path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z"/><path d="M8.707 11.182A4.486 4.486 0 0 0 10.025 8a4.486 4.486 0 0 0-1.318-3.182L8 5.525A3.489 3.489 0 0 1 9.025 8 3.49 3.49 0 0 1 8 10.475l.707.707zM6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06z"/></svg>';
                    }
                });
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAudioPlayers);
    } else {
        initAudioPlayers();
    }
})();
