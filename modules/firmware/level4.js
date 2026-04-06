i18n.registerContent('en', 'level4', [

{
    title: "Bootloader Architecture and Firmware Updates",
    content: `
        <h3>Lesson focus</h3>
        <ul>
            <li>Bootloader role: minimal init, image selection, integrity checks, jump to app</li>
            <li>Flash layout: bootloader, app slots, metadata, staging</li>
            <li>A/B banking; resilience to power loss mid-update</li>
            <li>Transports: UART/USB/CAN/BLE — framing, flow control, retries</li>
            <li>Signed images; rollback and anti-rollback concepts</li>
        </ul>
        <div class="visual-ref-links">
            <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=firmware+RTOS+embedded+tutorial&udm=2')">🔍 Visual search</button>
        </div>
    `,
    keyPoints: [
        "Every power-loss point must still leave a bootable device",
        "CRC finds accidents; signatures prove authenticity",
        "Protect bootloader flash from application erase"
    ],
    relatedTopics: [
            { level: "level4", index: 1, label: "Firmware Security and Secure Boot" },
            { level: "level1", index: 0, label: "Microcontroller Memory Architecture" },
            { level: "level2", index: 5, label: "RTOS Memory Management" }
    ],
    resources: [
            { title: "MCUboot docs", url: "https://docs.mcuboot.com/" }
    ]
},

{
    title: "Firmware Security and Secure Boot",
    content: `
        <h3>Lesson focus</h3>
        <ul>
            <li>Threat modeling (STRIDE-style); assets and adversaries</li>
            <li>TrustZone-M secure vs non-secure worlds; least privilege</li>
            <li>Debug port lockdown; RDP-style options and irreversible traps</li>
            <li>Encrypted/authenticated update channels; constant-time compares</li>
        </ul>
        <div class="visual-ref-links">
            <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=firmware+RTOS+embedded+tutorial&udm=2')">🔍 Visual search</button>
        </div>
    `,
    keyPoints: [
        "Debug ports left open are a skeleton key for attackers",
        "Keys must not live in plaintext Flash",
        "Security is structural \u2014 not a last-week add-on"
    ],
    relatedTopics: [
            { level: "level4", index: 0, label: "Bootloader Architecture and Firmware Updates" },
            { level: "level2", index: 5, label: "RTOS Memory Management" }
    ],
    resources: [
            { title: "ARM TrustZone-M", url: "https://developer.arm.com/ip-products/security-ip/trustzone-for-cortex-m" }
    ]
},

{
    title: "Safety-Critical Firmware and Formal Methods",
    content: `
        <h3>Lesson focus</h3>
        <ul>
            <li>Standards mindset: IEC 61508, ISO 26262, DO-178C evidence</li>
            <li>FMEA/FTA; defensive checks and redundancy patterns</li>
            <li>Coverage expectations: statement, branch, MC/DC in high-DAL domains</li>
            <li>Static analysis + independence requirements at higher SIL</li>
        </ul>
        <div class="visual-ref-links">
            <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=firmware+RTOS+embedded+tutorial&udm=2')">🔍 Visual search</button>
        </div>
    `,
    keyPoints: [
        "Watchdogs need narrow, argued pet paths",
        "MISRA reduces UB \u2014 it is not a functional proof",
        "Safety cases link failures to mitigations with traceable evidence"
    ],
    relatedTopics: [
            { level: "level3", index: 0, label: "Real-Time Analysis and Schedulability" },
            { level: "level3", index: 1, label: "Priority Inversion, Deadlock, and Starvation" },
            { level: "level4", index: 1, label: "Firmware Security and Secure Boot" }
    ],
    resources: [
            { title: "search: DO-178C MC/DC", url: "https://www.google.com/search?q=DO-178C+MC%2FDC" }
    ]
},

{
    title: "Firmware Testing and Continuous Integration",
    content: `
        <h3>Lesson focus</h3>
        <ul>
            <li>Test pyramid: host unit tests, emulation, HIL last</li>
            <li>Mocks behind HAL; fault injection on error paths</li>
            <li>CI: cross-compile, static analysis gates, signed artifacts</li>
            <li>Coverage limits on-target vs host</li>
        </ul>
        <div class="visual-ref-links">
            <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=firmware+RTOS+embedded+tutorial&udm=2')">🔍 Visual search</button>
        </div>
    `,
    keyPoints: [
        "If logic cannot be tested without hardware, refactor seams",
        "HIL is slow \u2014 reserve it for release gates",
        "Fault injection proves error handling actually runs"
    ],
    relatedTopics: [
            { level: "level3", index: 2, label: "Peripheral Driver Architecture" },
            { level: "level4", index: 0, label: "Bootloader Architecture and Firmware Updates" },
            { level: "level4", index: 2, label: "Safety-Critical Firmware and Formal Methods" }
    ],
    resources: [
            { title: "search: Unity cmock embedded CI", url: "https://www.google.com/search?q=Unity+cmock+embedded+CI" }
    ]
},

{
    title: "Capstone \u2014 End-to-End Real-Time Firmware System",
    content: `
        <h3>Lesson focus</h3>
        <ul>
            <li>Requirements → task table: periods, deadlines, priorities, stacks</li>
            <li>Architecture map: ISRs, drivers, RTOS objects; avoid dependency cycles</li>
            <li>Schedulability, memory, and power budgets signed with measurements</li>
            <li>Security/safety reviews; OTA rehearsal; postmortems after fielding</li>
        </ul>
        <div class="visual-ref-links">
            <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=firmware+RTOS+embedded+tutorial&udm=2')">🔍 Visual search</button>
        </div>
    `,
    keyPoints: [
        "Ship with measured WCETs \u2014 not guessed",
        "Automate regression before fleet scale",
        "Plan maintenance, updates, and end-of-life on day one"
    ],
    relatedTopics: [
            { level: "level3", index: 0, label: "Real-Time Analysis and Schedulability" },
            { level: "level4", index: 0, label: "Bootloader Architecture and Firmware Updates" },
            { level: "level4", index: 3, label: "Firmware Testing and Continuous Integration" }
    ],
    resources: [
            { title: "FreeRTOS", url: "https://www.freertos.org/" }
    ]
}
]);
