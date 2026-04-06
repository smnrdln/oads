i18n.registerContent('de', 'level2', [
    {
        title: "Serielle Protokolle \u2014 UART, SPI, I2C",
        content: `
<p><em>Hinweis: Lektionstext auf Englisch (Originalkurrikulum).</em></p>
<h3>Lesson outline</h3>
<ul>
<li><strong>UART:</strong> asynchronous, no shared clock; baud rate, start/stop bits, parity; how baud-rate mismatch causes framing errors; RS-232 vs. TTL logic levels; hardware flow control (RTS/CTS)</li>
<li><strong>SPI:</strong> synchronous, full-duplex, master-slave; four clock modes (CPOL/CPHA combinations); chip-select management; daisy-chain topology; throughput calculation</li>
<li><strong>I2C:</strong> synchronous, half-duplex, multi-master capable; 7-bit and 10-bit addressing; START/STOP/REPEATED START conditions; ACK/NACK; clock stretching; open-drain requirement; 400 kHz Fast Mode vs. 1 MHz Fast-Mode Plus</li>
<li>Reading device datasheets: timing diagrams, setup and hold times</li>
<li>DMA-driven transfers vs. interrupt-driven vs. polling — trade-offs</li>
<li>Common pitfall: I2C address collision; scanning for devices on a bus</li>
<li>Common pitfall: SPI mode mismatch causing garbled first byte</li>
<li>Common pitfall: leaving UART RX floating when the transmitter is absent</li>
<li>Protocol selection heuristic: distance, speed, pin count, multi-device needs</li>
</ul>
        `,
        keyPoints: ["UART is simplest but requires matched baud rates and is point-to-point; use for debug consoles and GPS modules", "SPI is fastest and simplest hardware-wise but needs one chip-select pin per slave and a separate clock", "I2C uses only two wires for up to 127 devices but is half-duplex, slower, and requires pull-up resistors and careful ACK handling", "Always verify CPOL/CPHA mode in the target device datasheet \u2014 wrong mode = correctly clocked but bit-shifted data", "Use DMA for high-rate transfers (>115 kbps) to prevent CPU saturation"],
        relatedTopics: [{"level": "level1", "index": 3, "label": "GPIO und Pin-Steuerung"}, {"level": "level1", "index": 4, "label": "Interrupts und ereignisgetriebene Programmierung"}, {"level": "level2", "index": 2, "label": "Analog-Digital-Umsetzung"}, {"level": "level3", "index": 1, "label": "Ger\u00e4tetreiber-Entwicklung"}],
        resources: [{"title": "I2C specification (NXP UM10204):", "url": "https://www.nxp.com/docs/en/user-guide/UM10204.pdf"}, {"title": "SPI CPOL CPHA clock mode explained timing diagram", "url": "https://www.google.com/search?q=SPI+CPOL+CPHA+clock+mode+explained+timing+diagram"}, {"title": "UART baud rate calculation error tolerance embedded C", "url": "https://www.google.com/search?q=UART+baud+rate+calculation+error+tolerance+embedded+C"}]
    },
    {
        title: "Timer, PWM und Capture/Compare",
        content: `
<p><em>Hinweis: Lektionstext auf Englisch (Originalkurrikulum).</em></p>
<h3>Lesson outline</h3>
<ul>
<li>General-purpose timer anatomy: prescaler, auto-reload register (ARR), counter register (CNT), clock source</li>
<li>Timer modes: up-counting, down-counting, center-aligned (up-down)</li>
<li>PWM output: duty cycle formula, frequency formula, dead-time for complementary outputs</li>
<li>Input capture: measuring pulse width and period (e.g., RC receiver, ultrasonic sensor)</li>
<li>Output compare: generating periodic events, one-shot pulses</li>
<li>Systick timer: 24-bit down-counter, dedicated to OS tick or \`HAL_Delay\`</li>
<li>Watchdog timer (IWDG/WWDG): purpose, kick interval calculation, use in production firmware</li>
<li>Timer chaining and cascading for extended time bases</li>
<li>Common pitfall: ARR + 1 period — the counter counts 0 to ARR inclusive</li>
<li>Common pitfall: forgetting to start the timer after configuring it</li>
</ul>
        `,
        keyPoints: ["PWM frequency = $\\frac{f_{clock}}{(PSC+1)(ARR+1)}$; duty cycle = $\\frac{CCR}{ARR+1} \\times 100\\%$", "Always enable the watchdog in production hardware and service it only from a known-good code path, not a bare while(1) loop", "Input capture requires the timer to run at a much higher frequency than the signal being measured to achieve adequate resolution", "Center-aligned PWM halves effective frequency but produces symmetric pulses ideal for motor control", "Systick has the lowest priority on Cortex-M and should not be relied on for hard real-time timing in the presence of a RTOS"],
        relatedTopics: [{"level": "level1", "index": 3, "label": "GPIO und Pin-Steuerung"}, {"level": "level1", "index": 4, "label": "Interrupts und ereignisgetriebene Programmierung"}, {"level": "level2", "index": 0, "label": "Serielle Protokolle \u2014 UART, SPI, I2C"}, {"level": "level3", "index": 0, "label": "Echtzeitbetriebssysteme (RTOS)"}],
        resources: [{"title": "STM32 timer PWM frequency ARR PSC calculation tutorial", "url": "https://www.google.com/search?q=STM32+timer+PWM+frequency+ARR+PSC+calculation+tutorial"}, {"title": "watchdog timer embedded systems IWDG WWDG window watchdog", "url": "https://www.google.com/search?q=watchdog+timer+embedded+systems+IWDG+WWDG+window+watchdog"}, {"title": "input capture ultrasonic sensor embedded timer tutorial", "url": "https://www.google.com/search?q=input+capture+ultrasonic+sensor+embedded+timer+tutorial"}, {"title": "Making Embedded Systems* (Elecia White) Chapter 5 \u2014 Timers:", "url": "https://www.oreilly.com/library/view/making-embedded-systems/9781449308889/"}]
    },
    {
        title: "Analog-Digital-Umsetzung",
        content: `
<p><em>Hinweis: Lektionstext auf Englisch (Originalkurrikulum).</em></p>
<h3>Lesson outline</h3>
<ul>
<li>Analog signal fundamentals: sampling theorem (Nyquist), aliasing, anti-aliasing filters</li>
<li>ADC architectures: SAR (successive approximation), sigma-delta, flash — trade-offs in speed, resolution, and cost</li>
<li>Resolution and quantization: LSB voltage formula, dynamic range in dB</li>
<li>Reference voltage: internal vs. external VREF; ratiometric vs. absolute measurement</li>
<li>Conversion time and throughput: sampling time, conversion cycles, total acquisition time</li>
<li>ADC input impedance and source resistance: RC settling time requirement</li>
<li>Oversampling and decimation to increase effective resolution beyond hardware bits</li>
<li>Averaging and filtering in firmware: moving average, exponential filter (IIR)</li>
<li>Common pitfall: ADC reading noise from power supply — proper decoupling capacitor placement</li>
<li>Common pitfall: sampling a signal faster than the anti-aliasing filter allows</li>
<li>DAC basics: R-2R ladder, PWM + RC low-pass filter as a poor-man's DAC</li>
</ul>
        `,
        keyPoints: ["LSB voltage = $V_{REF} / 2^N$ where N is the ADC resolution in bits; a 12-bit ADC on 3.3 V has LSB \u2248 0.8 mV", "Nyquist theorem: sample at least twice the highest frequency component, or alias artifacts appear", "Oversampling by 4\u00d7 and averaging gives 1 additional bit of effective resolution (ENOB)", "Use an external VREF whenever absolute accuracy matters; the internal VREF on most MCUs has \u00b11\u20135% tolerance", "Source impedance must be low enough to let the ADC sample capacitor fully charge before the sampling window closes"],
        relatedTopics: [{"level": "level1", "index": 1, "label": "Grundlagen der Mikrocontroller-Architektur"}, {"level": "level2", "index": 1, "label": "Timer, PWM und Capture/Compare"}, {"level": "level2", "index": 0, "label": "Serielle Protokolle \u2014 UART, SPI, I2C"}, {"level": "level2", "index": 4, "label": "Energiemanagement und Low-Power-Design"}],
        resources: [{"title": "ADC successive approximation register SAR architecture explained", "url": "https://www.google.com/search?q=ADC+successive+approximation+register+SAR+architecture+explained"}, {"title": "oversampling decimation ENOB embedded ADC tutorial", "url": "https://www.google.com/search?q=oversampling+decimation+ENOB+embedded+ADC+tutorial"}, {"title": "TI ADC selection guide:", "url": "https://www.ti.com/analog/docs/adc.page"}, {"title": "exponential moving average IIR filter embedded C implementation", "url": "https://www.google.com/search?q=exponential+moving+average+IIR+filter+embedded+C+implementation"}]
    },
    {
        title: "Speicherarchitektur und -verwaltung",
        content: `
<p><em>Hinweis: Lektionstext auf Englisch (Originalkurrikulum).</em></p>
<h3>Lesson outline</h3>
<ul>
<li>MCU memory types: embedded Flash, SRAM, EEPROM, external NOR/NAND Flash, FRAM</li>
<li>Linker script anatomy: \`MEMORY\` blocks, \`SECTIONS\`, VMA vs. LMA</li>
<li>Stack sizing: estimating worst-case stack depth, stack painting/canary techniques</li>
<li>Heap in embedded: when to use, fragmentation risk, deterministic allocators (pool allocator)</li>
<li>Memory-mapped files and XIP (Execute in Place) from Flash</li>
<li>Flash wear leveling basics: write cycles, erase granularity, block vs. page erase</li>
<li>Memory protection unit (MPU) on Cortex-M: region descriptors, fault detection</li>
<li>Cache coherency on Cortex-M7 (D-cache / I-cache): flush/invalidate requirements for DMA</li>
<li>Common pitfall: stack growing into heap or \`.bss\` — symptoms and detection</li>
<li>Common pitfall: writing to Flash while executing from it (self-programming hazards)</li>
<li>External QSPI Flash: XIP mode vs. indirect mode</li>
</ul>
        `,
        keyPoints: ["The linker script defines exactly where everything lives; understanding it is mandatory for advanced debugging", "Stack overflows are silent killers \u2014 always paint the stack at startup and check the watermark periodically", "Flash has finite write endurance (typically 10,000\u2013100,000 erase cycles); never write to the same sector in a tight loop", "The MPU allows you to make the stack region non-executable and catch null-pointer dereferences as hard faults instead of silent corruption", "On Cortex-M7 with data cache, any DMA transfer to/from a cached region requires explicit cache maintenance or the DMA will see stale data"],
        relatedTopics: [{"level": "level1", "index": 1, "label": "Grundlagen der Mikrocontroller-Architektur"}, {"level": "level1", "index": 2, "label": "Embedded-C-Programmierung \u2014 Grundlagen"}, {"level": "level3", "index": 3, "label": "Bootloader und Firmware-Updates"}, {"level": "level3", "index": 1, "label": "Ger\u00e4tetreiber-Entwicklung"}],
        resources: [{"title": "linker script embedded GCC MEMORY SECTIONS VMA LMA tutorial", "url": "https://www.google.com/search?q=linker+script+embedded+GCC+MEMORY+SECTIONS+VMA+LMA+tutorial"}, {"title": "Cortex-M MPU memory protection unit configuration embedded", "url": "https://www.google.com/search?q=Cortex-M+MPU+memory+protection+unit+configuration+embedded"}, {"title": "stack overflow detection canary pattern embedded firmware", "url": "https://www.google.com/search?q=stack+overflow+detection+canary+pattern+embedded+firmware"}, {"title": "Embedded Systems Architecture* (Daniele Lacamera):", "url": "https://www.packtpub.com/product/embedded-systems-architecture/9781788832502"}]
    },
    {
        title: "Energiemanagement und Low-Power-Design",
        content: `
<p><em>Hinweis: Lektionstext auf Englisch (Originalkurrikulum).</em></p>
<h3>Lesson outline</h3>
<ul>
<li>Power consumption components: active current, peripheral leakage, static vs. dynamic power</li>
<li>MCU low-power modes: Sleep, Stop, Standby (Cortex-M taxonomy); entry/exit sequences</li>
<li>Wake-up sources: RTC alarm, EXTI pin, LPUART, IWDG</li>
<li>Clock gating: disabling peripheral clocks when not in use — the single biggest quick win</li>
<li>Voltage scaling: dynamic voltage-frequency scaling (DVFS); operating points</li>
<li>Run mode optimization: code from Flash vs. SRAM, wait states and Flash prefetch buffer</li>
<li>Peripheral power gating: LDO vs. switched supply, GPIO state during Stop mode</li>
<li>Energy profiling methodology: current probe, energy monitor, cycle counting</li>
<li>Battery life calculation: capacity (mAh) / average current (mA)</li>
<li>Common pitfall: GPIO floating inputs during low-power mode causing current leakage</li>
<li>Common pitfall: DMA active during Stop mode preventing entry</li>
</ul>
        `,
        keyPoints: ["Disabling unused peripheral clocks is free in code size and complexity and can cut active current by 20\u201340%", "All digital inputs must be driven to a defined level (or configured as analog/high-Z appropriately) before entering Stop mode; floating pins have undefined current draw", "Battery life doubles when average current halves \u2014 focus on reducing duty cycle (sleep time fraction) not just peak current", "Measure power with a current probe or dedicated energy monitor; calculations alone are insufficient for certification", "The transition from Sleep to Stop to Standby trades deeper savings for longer wake-up latency and more state lost"],
        relatedTopics: [{"level": "level1", "index": 3, "label": "GPIO und Pin-Steuerung"}, {"level": "level2", "index": 1, "label": "Timer, PWM und Capture/Compare"}, {"level": "level1", "index": 4, "label": "Interrupts und ereignisgetriebene Programmierung"}, {"level": "level3", "index": 0, "label": "Echtzeitbetriebssysteme (RTOS)"}],
        resources: [{"title": "STM32 low power modes Sleep Stop Standby entry exit wake-up", "url": "https://www.google.com/search?q=STM32+low+power+modes+Sleep+Stop+Standby+entry+exit+wake-up"}, {"title": "embedded battery life calculation duty cycle average current", "url": "https://www.google.com/search?q=embedded+battery+life+calculation+duty+cycle+average+current"}, {"title": "Nordic Semiconductor Power Profiler Kit documentation:", "url": "https://www.nordicsemi.com/Products/Development-hardware/Power-Profiler-Kit-2"}, {"title": "clock gating peripheral disable embedded power optimization", "url": "https://www.google.com/search?q=clock+gating+peripheral+disable+embedded+power+optimization"}]
    }
]);
