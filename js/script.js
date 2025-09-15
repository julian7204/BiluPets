(function ($) {

  "use strict";

  var countdownTimer = function() {
    function getTimeRemaining(endtime) {
      const total = Date.parse(endtime) - Date.parse(new Date());
      const seconds = Math.floor((total / 1000) % 60);
      const minutes = Math.floor((total / 1000 / 60) % 60);
      const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
      const days = Math.floor(total / (1000 * 60 * 60 * 24));
      return {
        total,
        days,
        hours,
        minutes,
        seconds
      };
    }

    function initializeClock(id, endtime) {
      const clock = document.getElementById(id);
      const daysSpan = clock.querySelector('.days');
      const hoursSpan = clock.querySelector('.hours');
      const minutesSpan = clock.querySelector('.minutes');
      const secondsSpan = clock.querySelector('.seconds');

      function updateClock() {
        const t = getTimeRemaining(endtime);
        daysSpan.innerHTML = t.days;
        hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
        minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
        secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
        if (t.total <= 0) {
          clearInterval(timeinterval);
        }
      }
      updateClock();
      const timeinterval = setInterval(updateClock, 1000);
    }

    $('#countdown-clock').each(function(){
      const deadline = new Date(Date.parse(new Date()) + 28 * 24 * 60 * 60 * 1000);
      initializeClock('countdown-clock', deadline);
    });
  }

  var initScrollSpy = function() {
    /** Scroll Spy Mejorado y Preciso */
    const links = document.querySelectorAll(".scrollspy-link a");
    const sections = document.querySelectorAll(".scrollspy-section");
    const indicator = document.querySelector(".scrollspy-indicator");

    function getOffsetTop(elem) {
      let offsetTop = 0;
      while (elem) {
        offsetTop += elem.offsetTop;
        elem = elem.offsetParent;
      }
      return offsetTop;
    }

    function scrollspy() {
      const pageYPosition = window.scrollY || window.pageYOffset;
      const headerOffset = 100; // Ajusta este valor si tu header es más alto o más bajo
      let currentSectionId = sections[0].id;
      for (let i = 0; i < sections.length; i++) {
        const sectionTop = getOffsetTop(sections[i]) - headerOffset;
        const sectionBottom = sectionTop + sections[i].offsetHeight;
        if (pageYPosition >= sectionTop && pageYPosition < sectionBottom) {
          currentSectionId = sections[i].id;
          break;
        }
        // Si estamos al final de la página, marca la última sección
        if ((window.innerHeight + pageYPosition) >= document.body.offsetHeight - 2) {
          currentSectionId = sections[sections.length - 1].id;
        }
      }
      links.forEach((link) => {
        if (link.dataset.target === currentSectionId) {
          const linkItem = link.closest('.scrollspy-link');
          indicator.style.left = `${linkItem.offsetLeft}px`;
          indicator.style.width = `${linkItem.offsetWidth}px`;
        }
      });
    }

    window.addEventListener('scroll', scrollspy);
    window.addEventListener('resize', scrollspy);
    window.addEventListener('load', scrollspy);
    scrollspy();
  }

  var initSlider = function () {

    $('.swiper').each(function(){

      var swiper = new Swiper(".review-swiper", {
        slidesPerView: 3,
        spaceBetween: 30,
        freemode: true,
        pagination: {
          el: "#testimonials .swiper-pagination",
          clickable: true,
        },
        breakpoints: {
          0: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          767: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1299: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
        },
      });
  
      var swiper = new Swiper(".product-swiper", {
        slidesPerView: 3,
        spaceBetween: 30,
        pagination: {
          el: "#our-products .swiper-pagination",
          clickable: true,
        },
        breakpoints: {
          0: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          575: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1299: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
        },
      });
  
      var swiper = new Swiper(".product-slideshow", {
        slidesPerView: 1,
        spaceBetween: 20,
        pagination: {
          el: ".product-slideshow .swiper-pagination",
          clickable: true,
        },
        breakpoints: {
          0: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          575: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          1299: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
        },
      });

    });

  };

  var initScrollNav = function () {
    var scroll = $(window).scrollTop();
    var textColor = $('.site-header').data("text-color");
    
    if (scroll >= 200) {
      $('.site-header.position-fixed').addClass("bg-white").removeClass("text-white").addClass("text-dark");
    } else {
      $('.site-header.position-fixed').removeClass("bg-white").removeClass("text-dark").addClass("text-"+textColor);
    }
  }


  var initJarallax = function() {
    jarallax(document.querySelectorAll(".jarallax"));

    jarallax(document.querySelectorAll(".jarallax-keep-img"), {
      keepImg: true,
    });
  }

  $(window).scroll(function () {
    initScrollNav();
  });

  $(document).ready(function () {

    $(".youtube").colorbox({
      iframe: true,
      innerWidth: 960,
      innerHeight: 585
    });

    // document ready
    $(document).ready(function () {
      initScrollNav();
      initScrollSpy();
      initSlider();
      countdownTimer();
      initJarallax();

      AOS.init({
        duration: 1200,
        once: true,
      })
    }); // document ready

  }); // End of a document

})(jQuery);

function calcularComida() {
  let peso = parseFloat(document.getElementById("peso").value);
  let estado = document.getElementById("estado").value;

  if (isNaN(peso) || peso <= 0) {
      document.getElementById("resultado").innerHTML = "<p>Por favor, ingresa un peso válido.</p>";
      return;
  }

  kcalDia = estado === "Entero" ? Math.round(Math.pow(peso, 0.75) * 126) : Math.round(Math.pow(peso, 0.75) * 70);
  grDia = Math.round(kcalDia / 0.68);
  lbSemanal = Math.round((grDia * 7 * 0.0022) * 100) / 100;
  inversionSemanal = (lbSemanal * 2.75).toFixed(2);

  document.getElementById("resultado").innerHTML = `
      <p><strong>Kcal/Día:</strong> ${kcalDia} kcal</p>
      <p><strong>Gramos/Día:</strong> ${grDia} g</p>
      <p><strong>Libras Semanales:</strong> ${lbSemanal} lb</p>
      <p><strong>Inversión Semanal Estimada:</strong> $${inversionSemanal}</p>
  `;
}

function enviarWhatsApp() {
  if (!kcalDia || !grDia || !lbSemanal || !inversionSemanal) {
      alert("Primero debes calcular la comida.");
      return;
  }

  const numero = "593989999282"; // ← Cambia este número por el tuyo en formato internacional sin +
  const mensaje = `Hola, quiero hacer un pedido basado en los siguientes resultados:\n\n` +
      `Kcal/Día: ${kcalDia} kcal\n` +
      `Gramos/Día: ${grDia} g\n` +
      `Libras Semanales: ${lbSemanal} lb\n` +
      `Inversión Semanal Estimada: $${inversionSemanal}`;

  const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, '_blank');
}

var swiper = new Swiper(".carrusel-testimonios", {
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  pagination: {
    el: ".carrusel-testimonios .swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".carrusel-testimonios .swiper-button-next",
    prevEl: ".carrusel-testimonios .swiper-button-prev",
  },
  breakpoints: {
    768: {
      slidesPerView: 2,
    },
    1200: {
      slidesPerView: 3,
    }
  }
});
// ... existing code ...