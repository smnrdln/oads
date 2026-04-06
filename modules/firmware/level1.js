i18n.registerContent('en', 'level1', [

{
    title: "Microcontroller Memory Architecture",
    content: `
        <h3>Lesson focus</h3>
        <ul>
            <li>Von Neumann vs Harvard; modified Harvard on ARM Cortex-M</li>
            <li>Flash vs SRAM vs ROM; memory-mapped peripherals and access latency</li>
            <li>Stack, heap, BSS, data, text; linker script placement; startup copies .data from Flash</li>
            <li>Stack growth and overflow; endianness; struct alignment vs MMIO casts</li>
        </ul>
        <div class="visual-ref-links">
            <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=firmware+RTOS+embedded+tutorial&udm=2')">🔍 Visual search</button>
        </div>
    `,
    keyPoints: [
        "Peripheral registers live at fixed bus addresses; volatile prevents stale optimization",
        "The linker script places sections; stacks usually grow down and can corrupt neighbors",
        "SRAM is not guaranteed zero-filled at power-on"
    ],
    relatedTopics: [
            { level: "level1", index: 1, label: "Bare-Metal C Programming for Embedded Systems" },
            { level: "level1", index: 2, label: "GPIO, Registers, and Peripheral Access" },
            { level: "level2", index: 5, label: "RTOS Memory Management" }
    ],
    resources: [
            { title: "Making Embedded Systems (Elecia White)", url: "https://www.oreilly.com/library/view/making-embedded-systems/9781449307761/" },
            { title: "FreeRTOS beginner overview", url: "https://www.freertos.org/Documentation/01-FreeRTOS-quick-start/01-Beginners-guide/00-Overview" }
    ]
},

{
    title: "Bare-Metal C Programming for Embedded Systems",
    content: `
        <h3>Lesson focus</h3>
        <ul>
            <li>stdint.h fixed-width types; bit set/clear/toggle idioms at MMIO</li>
            <li>volatile vs atomicity; const in Flash; static linkage and state</li>
            <li>Reset vector through startup to main; function pointer tables</li>
            <li>Undefined behavior that is painful on MCUs; MISRA-style discipline</li>
        </ul>
        <div class="visual-ref-links">
            <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=firmware+RTOS+embedded+tutorial&udm=2')">🔍 Visual search</button>
        </div>
    `,
    keyPoints: [
        "REG |= (1U<<n) sets a bit; volatile does not make arbitrary accesses atomic",
        "Use volatile uint32_t* for 32-bit registers \u2014 avoid char-pointer aliasing games",
        "Do not assume globals are initialized before your earliest reset-path code"
    ],
    relatedTopics: [
            { level: "level1", index: 0, label: "Microcontroller Memory Architecture" },
            { level: "level1", index: 2, label: "GPIO, Registers, and Peripheral Access" },
            { level: "level1", index: 3, label: "Interrupts and Exception Handling" }
    ],
    resources: [
            { title: "Programming Embedded Systems (Barr & Massa)", url: "https://www.oreilly.com/library/view/programming-embedded-systems/0596009836/" },
            { title: "Quantum Leaps embedded patterns", url: "https://www.state-machine.com/" }
    ]
},

{
    title: "GPIO, Registers, and Peripheral Access",
    content: `
        <h3>Lesson focus</h3>
        <ul>
            <li>Pin modes: input/output, push-pull vs open-drain, pull resistors</li>
            <li>Reading datasheets: base address, register map, reset values</li>
            <li>Peripheral clock/reset gating before first register access</li>
            <li>Alternate functions; atomic set/clear registers vs read-modify-write</li>
            <li>Debouncing inputs; slew rate / drive strength vs EMI</li>
        </ul>
        <div class="visual-ref-links">
            <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=firmware+RTOS+embedded+tutorial&udm=2')">🔍 Visual search</button>
        </div>
    `,
    keyPoints: [
        "If writes seem ignored, verify clock/reset for that peripheral",
        "Open-drain needs an external pull-up to reach a reliable high",
        "Prefer atomic GPIO updates over long IRQ-masked RMW sequences"
    ],
    relatedTopics: [
            { level: "level1", index: 1, label: "Bare-Metal C Programming for Embedded Systems" },
            { level: "level1", index: 3, label: "Interrupts and Exception Handling" },
            { level: "level3", index: 2, label: "Peripheral Driver Architecture" }
    ],
    resources: [
            { title: "ARM documentation hub", url: "https://developer.arm.com/documentation/" },
            { title: "search: STM32 GPIO BSRR tutorial", url: "https://www.google.com/search?q=STM32+GPIO+BSRR+tutorial" }
    ]
},

{
    title: "Interrupts and Exception Handling",
    content: `
        <h3>Lesson focus</h3>
        <ul>
            <li>Latency vs jitter; Cortex-M exceptions; NVIC enable/priority</li>
            <li>Preemption vs subpriority; tail-chaining; stacked context</li>
            <li>ISR rules: keep short; defer parsing, printf, blocking calls</li>
            <li>Critical sections: PRIMASK vs BASEPRI; shared data and reentrancy</li>
        </ul>
        <div class="visual-ref-links">
            <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=firmware+RTOS+embedded+tutorial&udm=2')">🔍 Visual search</button>
        </div>
    `,
    keyPoints: [
        "ISRs should not block on task-oriented RTOS APIs",
        "Mis-prioritized interrupts surface as rare timing failures",
        "Use FromISR variants and yield hints when waking higher-priority tasks"
    ],
    relatedTopics: [
            { level: "level1", index: 2, label: "GPIO, Registers, and Peripheral Access" },
            { level: "level1", index: 4, label: "Timers, Clocks, and Time Sources" },
            { level: "level2", index: 4, label: "ISR-to-Task Communication" }
    ],
    resources: [
            { title: "Cortex-M exception model", url: "https://developer.arm.com/documentation/dui0552/a/" }
    ]
},

{
    title: "Timers, Clocks, and Time Sources",
    content: `
        <h3>Lesson focus</h3>
        <ul>
            <li>Clock tree: oscillators, PLL, prescalers, bus clocks to peripherals</li>
            <li>SysTick as RTOS tick; general-purpose timers: PSC/ARR, PWM, input capture</li>
            <li>Watchdogs: independent vs window; disciplined petting policy</li>
            <li>Unsigned tick math: (now - start) >= delay avoids wrap bugs</li>
        </ul>
        <div class="visual-ref-links">
            <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=firmware+RTOS+embedded+tutorial&udm=2')">🔍 Visual search</button>
        </div>
    `,
    keyPoints: [
        "Faster ticks improve scheduling resolution but increase overhead",
        "Do not pet watchdogs from unrelated ISRs to hide stuck tasks",
        "Timer output rate scales with f_clk / ((PSC+1)(ARR+1)) in basic up-counting"
    ],
    relatedTopics: [
            { level: "level1", index: 3, label: "Interrupts and Exception Handling" },
            { level: "level2", index: 0, label: "RTOS Concepts and Scheduling Theory" },
            { level: "level2", index: 1, label: "Tasks and the Scheduler" }
    ],
    resources: [
            { title: "Cortex-M SysTick", url: "https://developer.arm.com/documentation/dui0552/a/cortex-m3-peripherals/system-timer--systick" }
    ]
}
]);
