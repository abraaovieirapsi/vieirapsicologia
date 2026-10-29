(function () {
  'use strict';

  var STORAGE_KEY = 'vieira_cookie_consent_v1';
  var ADS_ID = 'AW-18537155916';
  var CONSENT = 'accepted';
  var REJECTED = 'rejected';
  var state = 'unset';
  var tagLoaded = false;
  var banner, settings, trigger, toggle;

  // Consent Mode v2: defaults must be queued before any Google tag/config/event.
  // This site has one consent option for Google Ads conversion measurement.
  // Analytics and personalized advertising remain denied because they are not
  // separately enabled by the current banner.
  function initializeGoogleTag() {
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    window.gtag('consent', 'default', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'denied',
      wait_for_update: 500
    });
    window.gtag('set', 'ads_data_redaction', true);
    window.gtag('js', new Date());
  }

  function updateGoogleConsent(choice) {
    if (typeof window.gtag !== 'function') return;
    var accepted = choice === CONSENT;
    window.gtag('consent', 'update', {
      ad_storage: accepted ? 'granted' : 'denied',
      ad_user_data: accepted ? 'granted' : 'denied',
      // The current banner only offers conversion measurement, not ad personalization.
      ad_personalization: 'denied',
      analytics_storage: 'denied'
    });
  }

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
    if (tagLoaded) return;
    tagLoaded = true;
    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + ADS_ID;
    script.dataset.vieiraGoogleAds = 'true';
    document.head.appendChild(script);
    window.gtag('config', ADS_ID);
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
    updateGoogleConsent(choice);

    if (choice === CONSENT) {
      closeBanner();
      return;
    }

    if (previous === CONSENT) expireAdsCookies();
    closeBanner();
  }

  function recordWhatsAppClick(event) {
    var link = event.target && event.target.closest ? event.target.closest('a[data-ads-conversion="whatsapp"]') : null;
    if (!link || typeof window.gtag !== 'function' || !tagLoaded) return;

    // In advanced Consent Mode this event can produce a cookieless signal when
    // ad_storage is denied; Google must apply the consent state queued above.
    window.gtag('event', 'conversion', {
      send_to: 'AW-18537155916/I36DCJ2I2qkdEMyamodF'
    });
  }

  function init() {
    state = readChoice();
    window.__vieiraAdsConsent = state;

    // The tag loads on entry in advanced mode, even while consent is unset/denied.
    // Restore the saved choice before configuring the tag so its first config
    // uses the current state; unset and rejected both remain denied.
    updateGoogleConsent(state);
    loadAdsTag();

    var wrapper = document.createElement('div');
    wrapper.innerHTML = '<section class="cookie-consent-banner" role="dialog" aria-modal="false" aria-labelledby="cookie-consent-title" hidden>' +
      '<div class="cookie-consent-main"><p class="cookie-consent-copy"><strong id="cookie-consent-title">Privacidade e cookies.</strong> Usamos cookies e tecnologias semelhantes para o funcionamento do site e, se você permitir, para medir cliques em links de contato pelo Google Ads. Você pode alterar sua escolha a qualquer momento em Configurações.</p>' +
      '<div class="cookie-consent-actions"><button type="button" class="cookie-consent-button" data-cookie-accept>Aceitar</button><button type="button" class="cookie-consent-button" data-cookie-reject>Rejeitar</button><button type="button" class="cookie-consent-button" data-cookie-settings-open>Configurações</button></div></div>' +
      '<div class="cookie-settings-panel" hidden><p class="cookie-consent-detail">A medição ajuda a identificar cliques nos links de WhatsApp das páginas de psicoterapia presencial e online. Um clique não significa que houve agendamento ou atendimento. Saiba mais na <a href="/privacidade/">Política de Privacidade</a> e nas <a href="https://policies.google.com/technologies/ads?hl=pt-BR" target="_blank" rel="noopener noreferrer">informações do Google sobre publicidade</a>.</p>' +
      '<label class="cookie-consent-option"><input type="checkbox" data-cookie-ads><span><strong>Medição de conversões do Google Ads</strong><span>Permite carregar a tag publicitária e medir os cliques de contato descritos acima. Desativada até sua autorização.</span></span></label>' +
      '<div class="cookie-consent-actions"><button type="button" class="cookie-consent-button" data-cookie-save>Salvar preferências</button><button type="button" class="cookie-consent-button" data-cookie-back>Voltar</button></div></div></section>' +
      '<button type="button" class="cookie-preferences-trigger" data-cookie-settings hidden>Preferências de cookies</button>';
    document.body.appendChild(wrapper);
    banner = wrapper.querySelector('.cookie-consent-banner');
    settings = wrapper.querySelector('.cookie-settings-panel');
    trigger = wrapper.querySelector('.cookie-preferences-trigger');
    toggle = wrapper.querySelector('[data-cookie-ads]');

    banner.querySelector('[data-cookie-accept]').addEventListener('click', function () { applyChoice(CONSENT); });
    banner.querySelector('[data-cookie-reject]').addEventListener('click', function () { applyChoice(REJECTED); });
    banner.querySelector('[data-cookie-settings-open]').addEventListener('click', function () { openBanner(true); });
    settings.querySelector('[data-cookie-save]').addEventListener('click', function () { applyChoice(toggle.checked ? CONSENT : REJECTED); });
    settings.querySelector('[data-cookie-back]').addEventListener('click', function () { settings.hidden = true; });
    trigger.addEventListener('click', function () { openBanner(true); });
    document.querySelectorAll('.cookie-policy-settings').forEach(function (el) {
      el.addEventListener('click', function () { openBanner(true); });
    });
    document.addEventListener('click', recordWhatsAppClick, true);

    if (state === 'unset') openBanner(false);
    else { banner.hidden = true; trigger.hidden = false; }
  }

  // Run before DOMContentLoaded where possible, and crucially before loading Ads.
  initializeGoogleTag();
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
