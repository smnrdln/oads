/**
 * Mounts AdSense display units only inside [data-oads-slot] regions.
 * Configure in assets/js/oads-ads-config.js (defaultSlot and/or slots.*).
 *
 * Behaviour:
 *  - On viewports >= 768px: activates siteRail / moduleRail slots.
 *  - On viewports <  768px: skips rail slots; activates mobileBanner slot
 *    (injected as a new shell below the page <header> / <main> if configured).
 *  - Guards against double-initialisation with data-oads-initialized attribute.
 *  - Wraps all DOM queries in DOMContentLoaded to ensure elements exist.
 *  - Never throws if a shell element is absent on the current page.
 */
(function () {
    'use strict';

    var cfg = window.OADS_ADS || {};
    var client = cfg.client || 'ca-pub-4757211359193207';
    var slots = cfg.slots || {};
    var defaultSlot = cfg.defaultSlot;

    var MOBILE_BREAKPOINT = 768;
    var isMobile = window.innerWidth < MOBILE_BREAKPOINT;

    /* Rail slot keys that must be bypassed on mobile */
    var RAIL_SLOTS = ['siteRail', 'moduleRail'];

    function validSlotId(id) {
        return id != null &&
            String(id).replace(/\s/g, '') !== '' &&
            /^\d+$/.test(String(id).trim());
    }

    function markLayoutNoAds(region) {
        var layout = region.closest('.oads-layout, .oads-module-stage');
        if (layout) {
            layout.classList.add('oads-no-side-ads');
        }
    }

    /**
     * Injects an <ins class="adsbygoogle"> into the given shell element and
     * calls adsbygoogle.push(). Guards against re-initialisation.
     */
    function mountAd(shell, slotId) {
        /* Guard: skip if already initialised */
        if (shell.hasAttribute('data-oads-initialized')) {
            return;
        }

        /* Reuse existing inner wrapper or create one */
        var inner = shell.querySelector('.oads-ad-inner');
        if (!inner) {
            inner = document.createElement('div');
            inner.className = 'oads-ad-inner';
            shell.appendChild(inner);
        }

        var ins = document.createElement('ins');
        ins.className = 'adsbygoogle';
        ins.style.display = 'block';
        ins.setAttribute('data-ad-client', client);
        ins.setAttribute('data-ad-slot', String(slotId).trim());
        ins.setAttribute('data-ad-format', 'auto');
        ins.setAttribute('data-full-width-responsive', 'true');

        /* Append BEFORE push so the element is fully in the DOM */
        inner.appendChild(ins);

        /* Mark as initialised before push to prevent accidental double-push */
        shell.setAttribute('data-oads-initialized', '1');

        (window.adsbygoogle = window.adsbygoogle || []).push({});
    }

    /**
     * On mobile, attempt to inject a single mobileBanner slot.
     * The banner shell is inserted once, just before the first <main> or
     * <article> element found in the document, so it stays below the fold
     * on a typical first screen and does not interrupt navigation.
     */
    function mountMobileBanner() {
        var mobileBannerSlotId = slots['mobileBanner'] != null &&
            String(slots['mobileBanner']).trim() !== ''
            ? slots['mobileBanner']
            : defaultSlot;

        if (!validSlotId(mobileBannerSlotId)) {
            /* No valid mobile banner ID configured — skip silently */
            return;
        }

        /* Check if a mobileBanner shell is already present in the DOM */
        var existing = document.querySelector('[data-oads-slot="mobileBanner"]');
        if (existing) {
            mountAd(existing, mobileBannerSlotId);
            return;
        }

        /* Create and inject the mobile banner shell */
        var anchor = document.querySelector('main') ||
                     document.querySelector('article') ||
                     document.body;

        var shell = document.createElement('div');
        shell.className = 'oads-ad-shell';
        shell.setAttribute('data-oads-slot', 'mobileBanner');
        shell.setAttribute('aria-label', 'Advertisement');

        var label = document.createElement('span');
        label.className = 'oads-ad-label';
        label.textContent = 'Ad';
        shell.appendChild(label);

        var inner = document.createElement('div');
        inner.className = 'oads-ad-inner';
        shell.appendChild(inner);

        /* Insert before the anchor element */
        if (anchor && anchor !== document.body) {
            anchor.parentNode.insertBefore(shell, anchor);
        } else {
            document.body.insertBefore(shell, document.body.firstChild);
        }

        mountAd(shell, mobileBannerSlotId);
    }

    function initAds() {
        /* ── Mobile path: skip rail slots, inject banner if configured ── */
        if (isMobile) {
            /* Mark all rail shells as empty so CSS hides them */
            RAIL_SLOTS.forEach(function (key) {
                document.querySelectorAll('[data-oads-slot="' + key + '"]')
                    .forEach(function (region) {
                        region.classList.add('oads-ad-rail--empty');
                        markLayoutNoAds(region);
                    });
            });

            mountMobileBanner();
            return;
        }

        /* ── Desktop / tablet path: activate rail slots ── */
        document.querySelectorAll('[data-oads-slot]').forEach(function (region) {
            var key = region.getAttribute('data-oads-slot');

            /* Skip mobileBanner shells on non-mobile viewports */
            if (key === 'mobileBanner') {
                return;
            }

            var slotId = slots[key] != null && String(slots[key]).trim() !== ''
                ? slots[key]
                : defaultSlot;

            if (!validSlotId(slotId)) {
                region.classList.add('oads-ad-rail--empty');
                markLayoutNoAds(region);
                return;
            }

            mountAd(region, slotId);
        });
    }

    /* Wrap in DOMContentLoaded to ensure all shells exist before querying */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAds);
    } else {
        /* DOMContentLoaded already fired */
        initAds();
    }
})();
