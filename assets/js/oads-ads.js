/**
 * Mounts AdSense display units only inside [data-oads-slot] regions.
 * Configure in assets/js/oads-ads-config.js (defaultSlot and/or slots.*).
 */
(function () {
    var cfg = window.OADS_ADS || {};
    var client = cfg.client || 'ca-pub-4757211359193207';
    var slots = cfg.slots || {};
    var defaultSlot = cfg.defaultSlot;

    function validSlotId(id) {
        return id != null && String(id).replace(/\s/g, '') !== '' && /^\d+$/.test(String(id).trim());
    }

    function markLayoutNoAds(region) {
        var layout = region.closest('.oads-layout, .oads-module-stage');
        if (layout) {
            layout.classList.add('oads-no-side-ads');
        }
    }

    document.querySelectorAll('[data-oads-slot]').forEach(function (region) {
        var key = region.getAttribute('data-oads-slot');
        var slotId = slots[key] != null && String(slots[key]).trim() !== ''
            ? slots[key]
            : defaultSlot;
        if (!validSlotId(slotId)) {
            region.classList.add('oads-ad-rail--empty');
            markLayoutNoAds(region);
            return;
        }

        var inner = region.querySelector('.oads-ad-inner');
        if (!inner) {
            inner = document.createElement('div');
            inner.className = 'oads-ad-inner';
            region.appendChild(inner);
        }

        var ins = document.createElement('ins');
        ins.className = 'adsbygoogle';
        ins.style.display = 'block';
        ins.setAttribute('data-ad-client', client);
        ins.setAttribute('data-ad-slot', String(slotId).trim());
        ins.setAttribute('data-ad-format', 'auto');
        ins.setAttribute('data-full-width-responsive', 'true');
        inner.appendChild(ins);

        (window.adsbygoogle = window.adsbygoogle || []).push({});
    });
})();
