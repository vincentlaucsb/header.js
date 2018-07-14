// Ref: https://github.com/robnyman/robnyman.github.com/blob/master/fullscreen/js/base.js

function Fullscreen(
    trigger,
    target,
    fullscreen_callback = null,
    exit_callback = null
    ) {
        this.trigger = trigger;
        this.target = target;
        this.fullscreen_callback = fullscreen_callback;
        this.exit_callback = exit_callback;
        this.is_fullscreen = function() {
            // This is bullshit
            return document.fullscreenElement || document.mozFullScreenElement || document.msFullscreenElement || document.webkitFullscreenElement;
        }
        
        // Add appropriate fullscreen handler       
        const fs_change_handler = function(event) {
            // console.log(event);
            if (is_fullscreen()) {
                fullscreen_callback();
            } else {
                exit_callback();
            }
        };
        
        if (document.onmozfullscreenchange === null) {
            document.onmozfullscreenchange = fs_change_handler;
        } else if (document.onwebkitfullscreenchange === null) {
            document.onmozfullscreenchange = fs_change_handler;            
        } else if (document.MSFullscreenChange === null) {
            document.MSFullscreenChange = fs_change_handler;            
        }
        
        trigger.addEventListener("click", function(event) {
            /** Switch between fullscreen and normal modes */
            if (is_fullscreen()) {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullscreen();
                }
            }
            
            if (target.requestFullscreen) {
                target.requestFullscreen();
            } else if (target.msRequestFullscreen) {
                target.requestFullscreen();                
            } else if (target.mozRequestFullScreen) {
                target.mozRequestFullScreen();
            } else if (target.webkitRequestFullScreen) {
                target.webkitRequestFullScreen();
            }
        });
    }