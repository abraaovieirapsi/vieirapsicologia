(function () {
  'use strict';
  var STORAGE_KEY = 'vieira_cookie_consent_v1';
  var ADS_ID = 'AW-18537155916';
  var CONSENT = 'accepted';
  var REJECTED = 'rejected';
  var state = 'unset';
  var tagLoaded = false;
  var banner, settings, trigger, toggle;

  function readChoice() {
    try { return localStorage.getItem(STORAGE_KEY) || 'unset'; }
    catch (e) { return 'unset'; }
  }

  function saveChoice(choice) {
    state = choice;
    try { localStorage.setItem(STORAGE_KEY, choice); } catch (e) {}
    window.__vieiraAdsConsent = choice;
  }

  function loadAdsTag() {
    if (tagLoaded || state !== CONSENT) return;
    tagLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', ADS_ID);
    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + ADS_ID;
    script.dataset.vieiraGoogleAds = 'true';
    document.head.appendChild(script);
  }

  function expireAdsCookies() {
    var names = ['_gcl_au', '_gcl_aw', '_gcl_gb', '_gcl_dc', '_gcl_gs'];
    var domains = ['', '; domain=vieirapsicologia.com.br', '; domain=.vieirapsicologia.com.br'];
    names.forEach(function (name) {
      domains.forEach(function (domain) {
        document.cookie = name + '=; Max-Age=0; path=/' + domain + '; SameSite=Lax';
      });
    });
  }

  function openBanner(showSettings) {
    if (!banner) return;
    banner.hidden = false;
    trigger.hidden = true;
    settings.hidden = !showSettings;
    toggle.checked = readChoice() === CONSENT;
    var first = showSettings ? settings.querySelector('[data-cookie-save]') : banner.querySelector('[data-cookie-accept]');
    if (first) first.focus({ preventScroll: true });
  }

  function closeBanner() {
    banner.hidden = true;
    trigger.hidden = false;
  }

  function applyChoice(choice) {
    var previous = readChoice();
    saveChoice(choice);
    if (choice === CONSENT) {
      loadAdsTag();
      closeBanner();
      return;
    }
    if (previous === CONSENT) {
      expireAdsCookies();
      // Reload without the advertising tag so no further measurement occurs after revocation.
      window.location.reload();
      return;
    }
    closeBanner();
  }

  function recordWhatsAppClick(event) {
    var link = event.target && event.target.closest ? event.target.closest('a[data-ads-conversion="whatsapp"]') : null;
    if (!link || state !== CONSENT || readChoice() !== CONSENT || typeof window.gtag !== 'function') return;
    window.gtag('event', 'conversion', {
      send_to: 'AW-18537155916/I36DCJ2I2qkdEMyamodF'
    });
  }

  function init() {
    state = readChoice();
    window.__vieiraAdsConsent = state;
    if (state === CONSENT) loadAdsTag();

    var wrapper = document.createElement('div');
    wrapper.innerHTML = '<section class="cookie-consent-banner" role="dialog" aria-modal="false" aria-labelledby="cookie-consent-title" hidden>' +
      '<div class="cookie-consent-main"><p class="cookie-consent-copy" id="cookie-consent-title">Este site usa cookies para melhorar sua experiência na web.</p>' +
      '<div class="cookie-consent-actions"><button type="button" class="cookie-consent-button cookie-consent-accept" data-cookie-accept>Aceitar</button><a href="#" class="cookie-consent-preferences" data-cookie-settings-open>Preferências</a></div></div>' +
      '<div class="cookie-settings-panel" hidden><p class="cookie-consent-detail">A medição ajuda a identificar cliques nos links de WhatsApp das páginas de psicoterapia presencial e online. Um clique não significa que houve agendamento ou atendimento. Saiba mais na <a href="/privacidade/">Política de Privacidade</a> e nas <a href="https://policies.google.com/technologies/ads?hl=pt-BR" target="_blank" rel="noopener noreferrer">informações do Google sobre publicidade</a>.</p>' +
      '<label class="cookie-consent-option"><input type="checkbox" data-cookie-ads><span><strong>Medição de conversões do Google Ads</strong><span>Permite carregar a tag publicitária e medir os cliques de contato descritos acima. Desativada até sua autorização.</span></span></label>' +
      '<div class="cookie-consent-actions"><button type="button" class="cookie-consent-button" data-cookie-save>Salvar preferências</button><button type="button" class="cookie-consent-button" data-cookie-back>Voltar</button></div></div></section>' +
      '<a href="#" class="cookie-preferences-trigger" data-cookie-settings hidden>Preferências</a>';
    document.body.appendChild(wrapper);
    banner = wrapper.querySelector('.cookie-consent-banner');
    settings = wrapper.querySelector('.cookie-settings-panel');
    trigger = wrapper.querySelector('.cookie-preferences-trigger');
    toggle = wrapper.querySelector('[data-cookie-ads]');

    banner.querySelector('[data-cookie-accept]').addEventListener('click', function () { applyChoice(CONSENT); });
    banner.querySelector('[data-cookie-reject]').addEventListener('click', function () { applyChoice(REJECTED); });
    banner.querySelector('[data-cookie-settings-open]').addEventListener('click', function (event) { event.preventDefault(); openBanner(true); });
    settings.querySelector('[data-cookie-save]').addEventListener('click', function () { applyChoice(toggle.checked ? CONSENT : REJECTED); });
    settings.querySelector('[data-cookie-back]').addEventListener('click', function () { settings.hidden = true; });
    trigger.addEventListener('click', function (event) { event.preventDefault(); openBanner(true); });
    document.querySelectorAll('.cookie-policy-settings').forEach(function (el) {
      el.addEventListener('click', function () { openBanner(true); });
    });
    document.addEventListener('click', recordWhatsAppClick, true);

    if (state === 'unset') {
      // Show only after 15 seconds, and only if no choice was stored meanwhile.
      window.setTimeout(function () {
        if (readChoice() === 'unset') openBanner(false);
      }, 15000);
    } else {
      banner.hidden = true;
      trigger.hidden = false;
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
