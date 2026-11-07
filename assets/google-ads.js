(function () {
  'use strict';

  var ADS_ID = 'AW-18537155916';
  var CONVERSION_ID = 'AW-18537155916/I36DCJ2I2qkdEMyamodF';

  // Instalação padrão da Google tag para Google Ads, sem Consent Mode.
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', ADS_ID);

  var script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=' + ADS_ID;
  document.head.appendChild(script);

  // Registra os cliques nos links de WhatsApp marcados nas páginas presencial e online.
  document.addEventListener('click', function (event) {
    var link = event.target && event.target.closest
      ? event.target.closest('a[data-ads-conversion=\"whatsapp\"]')
      : null;

    if (!link) return;

    window.gtag('event', 'conversion', {
      send_to: CONVERSION_ID
    });
  }, true);
})();
