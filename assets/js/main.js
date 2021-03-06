const refreshRate = 16000;//10000
const fadeRate = 2000;//1000
const pic = document.getElementById('pic');

(function() {
  const FX = {
    easing: {
      linear: function(progress) {
        return progress;
      },
      quadratic: function(progress) {
        return Math.pow(progress, 2);
      },
      swing: function(progress) {
        return 0.5 - Math.cos(progress * Math.PI) / 2;
      },
      circ: function(progress) {
        return 1 - Math.sin(Math.acos(progress));
      },
      back: function(progress, x) {
        return Math.pow(progress, 2) * ((x + 1) * progress - x);
      },
      bounce: function(progress) {
        for (var a = 0, b = 1, result; 1; a += b, b /= 2) {
          if (progress >= (7 - 4 * a) / 11) {
            return -Math.pow((11 - 6 * a - 11 * progress) / 4, 2) +
              Math.pow(b, 2);
          }
        }
      },
      elastic: function(progress, x) {
        return Math.pow(2, 10 * (progress - 1)) * Math.cos(20 *
          Math.PI * x / 3 * progress);
      }
    },
    animate: function(options) {
      const start = new Date;
      const id = setInterval(function() {
        const timePassed = new Date - start;
        let progress = timePassed / options.duration;
        if (progress > 1) {
          progress = 1;
        }
        options.progress = progress;
        const delta = options.delta(progress);
        options.step(delta);
        if (progress == 1) {
          clearInterval(id);
          options.complete();
        }
      }, options.delay || 10);
    },
    fadeOut: function(element, options) {
      const to = 1;
      this.animate({
        duration: options.duration,
        delta: function(progress) {
          progress = this.progress;
          return FX.easing.swing(progress);
        },
        complete: options.complete,
        step: function(delta) {
          element.style.opacity = to - delta;
        }
      });
    },
    fadeIn: function(element, options) {
      const to = 0;
      this.animate({
        duration: options.duration,
        delta: function(progress) {
          progress = this.progress;
          return FX.easing.swing(progress);
        },
        complete: options.complete,
        step: function(delta) {
          element.style.opacity = to + delta;
        }
      });
    }
  };
  window.FX = FX;
})()
function changeImage() {
  FX.fadeOut(pic, {
    duration: fadeRate,
    delay: 50,
    complete: function() {
      pic.style.backgroundImage =
        'url(https://source.unsplash.com/collection/1062065?sig=' +
        Math.random() + ')';
      FX.fadeIn(pic, {
        duration: fadeRate * 6,
        delay: 50
      });
    }
  })
}
setInterval(changeImage, refreshRate);
