i18n.registerContent('de', 'level4', [
    {
        title: "Kommunikationsprotokolle f\u00fcr IoT",
        content: `
<p><em>Hinweis: Lektionstext auf Englisch (Originalkurrikulum).</em></p>
<h3>Lesson outline</h3>
<ul>
<li>Protocol stack overview: physical layer → MAC → network → transport → application</li>
<li>Low-power wireless: BLE 5.x (advertising, GATT, L2CAP), Zigbee/IEEE 802.15.4, Z-Wave, Thread/OpenThread</li>
<li>LPWAN: LoRaWAN (SF/BW trade-offs, airtime calculation, duty cycle regulations), NB-IoT, LTE-M</li>
<li>Wired field protocols: CAN bus (arbitration, bit stuffing, error frames, CAN FD), RS-485/Modbus RTU, LIN</li>
<li>CAN message prioritization: lower CAN ID = higher priority; non-destructive arbitration</li>
<li>MQTT and CoAP as application protocols for constrained devices: QoS levels, retained messages, LWT</li>
<li>Time synchronization: PTP (IEEE 1588), SNTP, GPS 1PPS</li>
<li>Designing for intermittent connectivity: store-and-forward, message queuing, acknowledgment retry</li>
<li>Common pitfall: LoRaWAN duty-cycle violations in the EU 868 MHz band (1% maximum)</li>
<li>Common pitfall: CAN bus termination resistance — both ends must have 120 Ω; missing termination causes reflections</li>
</ul>
        `,
        keyPoints: ["CAN bus is the backbone of automotive and industrial embedded systems; understanding arbitration and error confinement is mandatory for those domains", "LoRaWAN airtime is inversely proportional to data rate; a higher spreading factor = longer range but also longer airtime, consuming more of the 1% duty-cycle budget", "MQTT is not appropriate for battery-powered devices that sleep; CoAP over UDP with DTLS is the IETF standard for constrained node networking", "Always implement store-and-forward for IoT sensors \u2014 network connectivity is never guaranteed", "BLE GATT is the application layer; understand services, characteristics, and descriptors before writing BLE firmware"],
        relatedTopics: [{"level": "level3", "index": 4, "label": "Embedded-Security-Grundlagen"}, {"level": "level2", "index": 4, "label": "Energiemanagement und Low-Power-Design"}, {"level": "level3", "index": 0, "label": "Echtzeitbetriebssysteme (RTOS)"}, {"level": "level4", "index": 4, "label": "Capstone-Projekt \u2014 Systemintegration"}],
        resources: [{"title": "LoRaWAN specification:", "url": "https://lora-alliance.org/resource_hub/lorawan-specification-v1-0-4/"}, {"title": "search query: `Bosch CAN specification 2.0 PDF free download", "url": "https://www.google.com/search?q=search+query:+`Bosch+CAN+specification+2.0+PDF+free+download"}, {"title": "OpenThread documentation:", "url": "https://openthread.io/guides"}, {"title": "MQTT vs CoAP constrained IoT devices comparison embedded", "url": "https://www.google.com/search?q=MQTT+vs+CoAP+constrained+IoT+devices+comparison+embedded"}]
    },
    {
        title: "Performance-Optimierung und Profiling",
        content: `
<p><em>Hinweis: Lektionstext auf Englisch (Originalkurrikulum).</em></p>
<h3>Lesson outline</h3>
<ul>
<li>Profiling methodology: measure first, then optimize; Amdahl's Law</li>
<li>Cycle-accurate profiling: DWT \`CYCCNT\`, ETM instruction trace, SysTick-based sampling profiler</li>
<li>Compiler optimization levels: \`-O0\`, \`-O1\`, \`-O2\`, \`-O3\`, \`-Os\`, \`-Og\` — what each does and when to use</li>
<li>Code placement: hot paths in SRAM (\`.ramfunc\`), flash wait states and ART accelerator</li>
<li>Data structure optimization: struct padding, cache-friendly sequential access (locality of reference)</li>
<li>Loop optimizations: loop unrolling, strength reduction, hoisting loop-invariant code</li>
<li>SIMD and DSP extensions on Cortex-M4/M7: CMSIS-DSP library, single-cycle MAC</li>
<li>Fixed-point arithmetic: Q-format notation, saturation arithmetic, avoiding floating-point on M0/M0+</li>
<li>DMA usage for zero-copy data pipelines</li>
<li>Flash wait-state configuration and prefetch buffers</li>
<li>Interrupt latency budget analysis: worst-case response time calculation</li>
<li>Common pitfall: optimizing non-bottleneck code; always profile before touching anything</li>
</ul>
        `,
        keyPoints: ["Amdahl's Law: if 10% of code takes 90% of runtime, optimizing the other 90% gives at most 10% total speedup \u2014 profile first", "Executing performance-critical functions from SRAM eliminates Flash wait-state latency and is the fastest code-placement technique on most MCUs", "Fixed-point Q15 multiplication on Cortex-M4 DSP extension (SMLAD) runs in 1 clock cycle; software floating-point on M4 FPU takes ~14 cycles for fmul", "The CMSIS-DSP library provides optimized, tested implementations of FFT, FIR/IIR filters, matrix operations \u2014 never rewrite these from scratch", "Measure interrupt latency under realistic load; worst-case latency = longest ISR at the same or higher priority + stacking cycles (~12 cycles on Cortex-M)"],
        relatedTopics: [{"level": "level1", "index": 1, "label": "Grundlagen der Mikrocontroller-Architektur"}, {"level": "level3", "index": 0, "label": "Echtzeitbetriebssysteme (RTOS)"}, {"level": "level3", "index": 2, "label": "Debugging und Fehlerdiagnose"}, {"level": "level2", "index": 3, "label": "Speicherarchitektur und -verwaltung"}],
        resources: [{"title": "CMSIS-DSP library documentation:", "url": "https://arm-software.github.io/CMSIS-DSP/latest/"}, {"title": "DWT CYCCNT cycle counter profiling Cortex-M embedded C", "url": "https://www.google.com/search?q=DWT+CYCCNT+cycle+counter+profiling+Cortex-M+embedded+C"}, {"title": "fixed-point arithmetic Q format embedded DSP tutorial", "url": "https://www.google.com/search?q=fixed-point+arithmetic+Q+format+embedded+DSP+tutorial"}, {"title": "Amdahl's law embedded firmware optimization bottleneck profiling", "url": "https://www.google.com/search?q=Amdahl's+law+embedded+firmware+optimization+bottleneck+profiling"}]
    },
    {
        title: "Hardware-Software-Co-Design",
        content: `
<p><em>Hinweis: Lektionstext auf Englisch (Originalkurrikulum).</em></p>
<h3>Lesson outline</h3>
<ul>
<li>Co-design philosophy: allocating functions to hardware or firmware to meet cost, performance, and power targets simultaneously</li>
<li>Schematic review from a firmware perspective: pull-up/down values, decoupling capacitor placement, reset circuit, SWD header</li>
<li>Signal integrity basics: rise time vs. bandwidth, transmission line effects above ~100 MHz, ground planes</li>
<li>PCB layout considerations that affect firmware: ADC analog ground, clock trace length, bypass capacitors near power pins</li>
<li>External component selection: crystal load capacitance calculation, oscillator start-up time in firmware</li>
<li>Hardware debugging tools: oscilloscope, logic analyzer, in-circuit emulator, network analyzer</li>
<li>GPIO current budget: total MCU current sink/source vs. regulator rating</li>
<li>Reset and power-on sequencing: brown-out detector (BOD), power-on reset (POR) timing</li>
<li>Designing for testability (DFT): test points, JTAG header, loopback modes</li>
<li>Pin assignment strategy: grouping peripheral pins, avoiding high-speed signals near analog inputs</li>
<li>Common pitfall: assuming firmware can compensate for hardware design errors — some problems require PCB spins</li>
</ul>
        `,
        keyPoints: ["A firmware engineer reading the schematic before writing a single line of code prevents hours of debugging hardware-induced software bugs", "Crystal load capacitance mismatch causes the oscillator to run off-frequency, which cascades into baud-rate errors, timing failures, and radio frequency deviations", "Analog and digital ground planes must be joined at a single point near the ADC; separate ground planes with multiple connection points create ground loops that inject noise", "Every GPIO should appear in a pin assignment table with its alternate function, default state, and the test point that probes it \u2014 this is documentation that outlasts any team member", "Brown-out detection must be set above the minimum supply voltage for Flash write operations; writing to Flash below the minimum voltage causes data corruption"],
        relatedTopics: [{"level": "level1", "index": 3, "label": "GPIO und Pin-Steuerung"}, {"level": "level2", "index": 2, "label": "Analog-Digital-Umsetzung"}, {"level": "level3", "index": 4, "label": "Embedded-Security-Grundlagen"}, {"level": "level4", "index": 4, "label": "Capstone-Projekt \u2014 Systemintegration"}],
        resources: [{"title": "Have Fun While Voiding Your Warranty* (Huang & Grand): search query: `hardware hacking embedded syst", "url": "https://www.google.com/search?q=Have+Fun+While+Voiding+Your+Warranty*+(Huang+&+Grand):+search+query:+`hardware+hacking+embedded+systems+PCB+reverse+engineering+book"}, {"title": "crystal load capacitance calculation embedded oscillator frequency accuracy", "url": "https://www.google.com/search?q=crystal+load+capacitance+calculation+embedded+oscillator+frequency+accuracy"}, {"title": "PCB layout analog digital ground plane ADC noise embedded", "url": "https://www.google.com/search?q=PCB+layout+analog+digital+ground+plane+ADC+noise+embedded"}, {"title": "search query: `bunnie Huang The Hardware Hacker book embedded PCB", "url": "https://www.google.com/search?q=search+query:+`bunnie+Huang+The+Hardware+Hacker+book+embedded+PCB"}]
    },
    {
        title: "Sicherheitskritische Firmware",
        content: `
<p><em>Hinweis: Lektionstext auf Englisch (Originalkurrikulum).</em></p>
<h3>Lesson outline</h3>
<ul>
<li>Functional safety standards: IEC 61508 (general), ISO 26262 (automotive), IEC 62443 (industrial), IEC 60730 (home appliance) — structure and applicability</li>
<li>Safety Integrity Level (SIL) and Automotive Safety Integrity Level (ASIL): definitions, requirements per level</li>
<li>Failure modes and effects analysis (FMEA) for firmware: systematic enumeration of single-point failures</li>
<li>Defensive coding patterns: parameter validation at every layer, invariant assertions, state machine completeness</li>
<li>Memory self-test (RAM test: March C algorithm), Flash CRC check at startup and periodic runtime</li>
<li>CPU self-test: program flow monitoring, instruction set test</li>
<li>Dual-channel and redundant computation: cross-checking results from two independent code paths</li>
<li>Safe state: designing the system so any detected failure drives to a known-safe output (e.g., motor off, valve closed)</li>
<li>Lockstep processors: concept and use in automotive (Cortex-R5 lockstep)</li>
<li>Software requirements specification (SRS) and traceability: requirements → design → implementation → test</li>
<li>Common pitfall: disabling safety checks in the release build "for performance" — this is non-compliant</li>
<li>Common pitfall: safety assertions only in test builds; production firmware must also run checks</li>
</ul>
        `,
        keyPoints: ["A safe state must be defined for every failure mode before writing code; if you cannot define safe behavior, you cannot certify the system", "Assertions and invariant checks must remain enabled in production firmware; remove them only for functions proven by formal verification", "The March C RAM test detects all single-cell and many multi-cell faults; it must run before any RAM-dependent code at startup", "Traceability from every line of safety-critical code back to a numbered requirement is not optional for IEC 61508 SIL 2+ \u2014 it is mandatory evidence", "Functional safety is a system property, not a software property; hardware fault tolerance and software rigor must both be addressed"],
        relatedTopics: [{"level": "level3", "index": 4, "label": "Embedded-Security-Grundlagen"}, {"level": "level3", "index": 2, "label": "Debugging und Fehlerdiagnose"}, {"level": "level2", "index": 3, "label": "Speicherarchitektur und -verwaltung"}, {"level": "level4", "index": 4, "label": "Capstone-Projekt \u2014 Systemintegration"}],
        resources: [{"title": "search query: `IEC 61508 functional safety SIL levels requirements overview", "url": "https://www.google.com/search?q=search+query:+`IEC+61508+functional+safety+SIL+levels+requirements+overview"}, {"title": "March C algorithm RAM test embedded safety startup self-test", "url": "https://www.google.com/search?q=March+C+algorithm+RAM+test+embedded+safety+startup+self-test"}, {"title": "MISRA C 2012 coding guidelines safety critical embedded", "url": "https://www.google.com/search?q=MISRA+C+2012+coding+guidelines+safety+critical+embedded"}, {"title": "search query: `\"Safety-Critical Systems Handbook\" Smith Simpson IEC 61508 book", "url": "https://www.google.com/search?q=search+query:+`\"Safety-Critical+Systems+Handbook\"+Smith+Simpson+IEC+61508+book"}]
    },
    {
        title: "Capstone-Projekt \u2014 Systemintegration",
        content: `
<p><em>Hinweis: Lektionstext auf Englisch (Originalkurrikulum).</em></p>
<h3>Lesson outline</h3>
<ul>
<li>Capstone scope definition: system requirements specification (SRS), block diagram, interface control document (ICD)</li>
<li>System bring-up sequence: power rails, clock, minimal GPIO, debug console, then peripherals one by one</li>
<li>Integration testing strategy: bottom-up integration, mock hardware, hardware-in-the-loop (HIL)</li>
<li>Software architecture for the full product: layered model (BSP → HAL → drivers → middleware → application)</li>
<li>Configuration management: versioning firmware artifacts, tagging releases, changelog maintenance</li>
<li>Over-the-air (OTA) update end-to-end: server → signed package → device → bootloader → verify → swap → confirm</li>
<li>Production testing: in-circuit test (ICT), functional test fixture, boundary-scan (JTAG)</li>
<li>Calibration and factory provisioning: storing calibration coefficients in non-volatile memory, unique key injection</li>
<li>Field failure analysis: crash dump to non-volatile memory (coredump), remote log retrieval</li>
<li>Post-release maintenance: semantic versioning, backward-compatible protocol evolution, deprecation policy</li>
<li>Common pitfall: under-specifying the production test — a firmware bug not caught in production test ships to customers</li>
<li>Common pitfall: lack of crash dump storage — field failures become impossible to reproduce</li>
</ul>
        `,
        keyPoints: ["Every layer of the software stack must have a clear owner, a defined API, and documented assumptions \u2014 ambiguity at layer boundaries is the most common cause of system integration failures", "Bring up hardware incrementally: validate power and clock before enabling any peripheral; a stable debug console is the most valuable bring-up tool", "A coredump (saved register state, stack trace, and key variables in non-volatile memory) transforms a field failure from \"unreproducible\" to \"debuggable within hours\"", "Production firmware must be identical to the firmware used for certification testing \u2014 any post-certification change requires re-evaluation", "OTA update must be treated as a safety-critical operation: rollback, integrity checks, and retry logic are not optional even in non-safety products"],
        relatedTopics: [{"level": "level3", "index": 3, "label": "Bootloader und Firmware-Updates"}, {"level": "level3", "index": 4, "label": "Embedded-Security-Grundlagen"}, {"level": "level4", "index": 3, "label": "Sicherheitskritische Firmware"}, {"level": "level3", "index": 2, "label": "Debugging und Fehlerdiagnose"}, {"level": "level3", "index": 0, "label": "Echtzeitbetriebssysteme (RTOS)"}, {"level": "level4", "index": 0, "label": "Kommunikationsprotokolle f\u00fcr IoT"}],
        resources: [{"title": "Making Embedded Systems* (Elecia White, O'Reilly) Chapter 10 \u2014 Getting to Done:", "url": "https://www.oreilly.com/library/view/making-embedded-systems/9781449308889/"}, {"title": "embedded software architecture layered BSP HAL driver middleware application", "url": "https://www.google.com/search?q=embedded+software+architecture+layered+BSP+HAL+driver+middleware+application"}, {"title": "coredump embedded firmware non-volatile crash log field debug", "url": "https://www.google.com/search?q=coredump+embedded+firmware+non-volatile+crash+log+field+debug"}, {"title": "production firmware testing ICT functional test fixture embedded", "url": "https://www.google.com/search?q=production+firmware+testing+ICT+functional+test+fixture+embedded"}]
    }
]);
