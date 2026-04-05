/**
 * Single config for AdSense — include oads-ads-config.js + oads-ads.js on every site HTML page.
 *
 * Pages today: index.html + privacy.html use data-oads-slot="siteRail"; modules (pcb, robotics, …) use "moduleRail".
 * On viewports < 768px, rail ads are hidden; a "mobileBanner" slot is injected instead (horizontal leaderboard).
 *
 * - Set defaultSlot to one numeric ad unit ID from AdSense to fill every region (easiest).
 * - Or leave defaultSlot empty and set slots.siteRail / slots.moduleRail (and add keys for new modules).
 *
 * Slot IDs must be digits only, from the same AdSense account as client (ca-pub-…).
 */
window.OADS_ADS = {
    client: 'ca-pub-4757211359193207',
    defaultSlot: '',
    slots: {
        siteRail: '5527467530',
        moduleRail: '4879331358',
        // mobileBanner: used on viewports < 768px (horizontal leaderboard / adaptive banner).
        // Set this to a valid AdSense ad unit ID for a 320x50 or adaptive banner unit.
        // Leave empty string to disable mobile ads entirely.
        mobileBanner: ''
    }
};
