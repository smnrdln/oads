/**
 * Single config for AdSense — include oads-ads-config.js + oads-ads.js on every site HTML page.
 *
 * Pages today: index.html + privacy.html use data-oads-slot="siteRail"; modules (pcb, robotics, …) use "moduleRail".
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
        moduleRail: '4879331358'
    }
};
