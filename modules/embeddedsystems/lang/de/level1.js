i18n.registerContent('de', 'level1', [
    {
        title: "Digitaltechnik und Zahlensysteme",
        content: `
<p><em>Hinweis: Lektionstext auf Englisch (Originalkurrikulum).</em></p>
<h3>Lesson outline</h3>
<ul>
<li>Why microcontrollers operate in binary: voltage levels as logic states</li>
<li>Positional notation: binary, octal, hexadecimal, and decimal conversions</li>
<li>Two's complement representation for signed integers; overflow vs. wrap-around</li>
<li>Boolean algebra: AND, OR, NOT, XOR, NAND, NOR truth tables</li>
<li>Logic gate implementations and fan-out concepts</li>
<li>Bitwise operators in C: \`&\`, \`|\`, \`^\`, \`~\`, \`<<\`, \`>>\`; practical use for masking, setting, clearing, and toggling bits</li>
<li>Common pitfall: confusing logical operators (\`&&\`, \`||\`) with bitwise operators</li>
<li>Common pitfall: integer promotion rules when operating on \`uint8_t\` in C</li>
</ul>
        `,
        keyPoints: ["Every hardware register is just a collection of bits; bitwise operations are your primary tool to control hardware without disturbing neighboring bits", "Two's complement is universal for signed arithmetic on modern MCUs; know the range of each integer type", "Hexadecimal is shorthand for binary groups of four \u2014 always think in hex when reading register values", "Setting a bit: reg |= (1u << n); clearing: reg &= ~(1u << n); toggling: reg ^= (1u << n); testing: (reg >> n) & 1u", "Integer promotion in C can silently widen a uint8_t to int; cast explicitly after bitwise NOT"],
        relatedTopics: [{"level": "level1", "index": 1, "label": "Grundlagen der Mikrocontroller-Architektur"}, {"level": "level1", "index": 3, "label": "GPIO und Pin-Steuerung"}, {"level": "level1", "index": 2, "label": "Embedded-C-Programmierung \u2014 Grundlagen"}],
        resources: [{"title": "The C Programming Language\" Kernighan Ritchie 2nd edition PDF", "url": "https://www.google.com/search?q=The+C+Programming+Language\"+Kernighan+Ritchie+2nd+edition+PDF"}, {"title": "Barr Group Embedded C Coding Standard:", "url": "https://barrgroup.com/embedded-systems/books/embedded-c-coding-standard"}, {"title": "bitwise operations embedded systems\" tutorial register manipulation C", "url": "https://www.google.com/search?q=bitwise+operations+embedded+systems\"+tutorial+register+manipulation+C"}, {"title": "two's complement overflow explained microcontroller firmware", "url": "https://www.google.com/search?q=two's+complement+overflow+explained+microcontroller+firmware"}]
    },
    {
        title: "Grundlagen der Mikrocontroller-Architektur",
        content: `
<p><em>Hinweis: Lektionstext auf Englisch (Originalkurrikulum).</em></p>
<h3>Lesson outline</h3>
<ul>
<li>Von Neumann vs. Harvard architecture; why most MCUs use a modified Harvard design</li>
<li>Core components: ALU, program counter, stack pointer, link register, status/flag register</li>
<li>Memory map anatomy: Flash (code), SRAM (data), peripheral registers all in one address space</li>
<li>Clock tree: oscillator sources (internal RC, external crystal, PLL), clock dividers, and why frequency matters for power and timing accuracy</li>
<li>Reset sources and the reset vector; startup code flow before \`main()\`</li>
<li>Pipeline basics: fetch, decode, execute — and the implication for branch timing</li>
<li>ARM Cortex-M overview: exception model, privilege levels (Thread vs. Handler mode), Thumb-2 ISA</li>
<li>Vendor HAL vs. bare-metal register access: trade-offs</li>
<li>Common pitfall: treating peripherals as memory without \`volatile\`</li>
</ul>
        `,
        keyPoints: ["The MCU has a single, flat address space; peripheral registers are just memory addresses, not magic", "Clock configuration is the first thing firmware must do \u2014 nearly every other peripheral depends on it", "The CPU never truly \"starts\" at main(); startup code copies .data, zeroes .bss, and calls constructors first", "volatile tells the compiler not to cache a memory location \u2014 mandatory for any register that hardware can change", "ARM Cortex-M cores share a common exception and memory map architecture across vendors; vendor differentiation is in peripherals, not the core"],
        relatedTopics: [{"level": "level1", "index": 0, "label": "Digitaltechnik und Zahlensysteme"}, {"level": "level1", "index": 2, "label": "Embedded-C-Programmierung \u2014 Grundlagen"}, {"level": "level2", "index": 3, "label": "Speicherarchitektur und -verwaltung"}, {"level": "level3", "index": 3, "label": "Bootloader und Firmware-Updates"}],
        resources: [{"title": "Joseph Yiu \"ARM Cortex-M\" definitive guide PDF", "url": "https://www.google.com/search?q=Joseph+Yiu+\"ARM+Cortex-M\"+definitive+guide+PDF"}, {"title": "ARM Architecture Reference Manual:", "url": "https://developer.arm.com/documentation/ddi0487/latest"}, {"title": "startup code C embedded before main crt0 explained", "url": "https://www.google.com/search?q=startup+code+C+embedded+before+main+crt0+explained"}, {"title": "volatile keyword embedded systems C compiler optimization", "url": "https://www.google.com/search?q=volatile+keyword+embedded+systems+C+compiler+optimization"}]
    },
    {
        title: "Embedded-C-Programmierung \u2014 Grundlagen",
        content: `
<p><em>Hinweis: Lektionstext auf Englisch (Originalkurrikulum).</em></p>
<h3>Lesson outline</h3>
<ul>
<li>Why C dominates firmware: deterministic memory layout, direct hardware access, no hidden runtime</li>
<li>Fixed-width integer types: \`uint8_t\`, \`int16_t\`, \`uint32_t\` from \`<stdint.h>\` — always prefer over \`int\`</li>
<li>\`const\` and \`volatile\` qualifiers: correct placement and interaction</li>
<li>Pointers to hardware: dereferencing a fixed address, pointer arithmetic risks</li>
<li>\`struct\` and \`union\` for register-map modeling; alignment and padding pitfalls</li>
<li>Bit-fields: portability limitations and when to use masking instead</li>
<li>Inline functions vs. function-like macros: side-effect safety</li>
<li>Defensive programming: assert-style checks, range validation</li>
<li>The \`restrict\` keyword and strict aliasing rule in embedded context</li>
<li>Stack vs. heap: why dynamic allocation is often forbidden in safety-critical firmware</li>
<li>Compiler-specific attributes: \`__attribute__((section(...)))\`, \`__attribute__((aligned(...)))\`</li>
<li>Common pitfall: uninitialized local variables producing non-deterministic behavior at power-on</li>
</ul>
        `,
        keyPoints: ["Always use <stdint.h> fixed-width types; int size is implementation-defined and a bug source on MCUs", "Never use malloc/free in production firmware unless you have a deterministic allocator with failure handling", "volatile does not imply atomicity; reads of multi-byte volatile variables can be torn by interrupts", "Bit-field layout is not standardized across compilers; use masking and shifting for portable register access", "Keep functions short, pure where possible, and free of global state \u2014 it makes unit testing trivially easy later"],
        relatedTopics: [{"level": "level1", "index": 0, "label": "Digitaltechnik und Zahlensysteme"}, {"level": "level1", "index": 1, "label": "Grundlagen der Mikrocontroller-Architektur"}, {"level": "level1", "index": 4, "label": "Interrupts und ereignisgetriebene Programmierung"}, {"level": "level3", "index": 1, "label": "Ger\u00e4tetreiber-Entwicklung"}],
        resources: [{"title": "Making Embedded Systems* (Elecia White, O'Reilly):", "url": "https://www.oreilly.com/library/view/making-embedded-systems/9781449308889/"}, {"title": "2012 guidelines overview \u2014 search query: `MISRA C 2012 guidelines embedded safety summary", "url": "https://www.google.com/search?q=2012+guidelines+overview+\u2014+search+query:+`MISRA+C+2012+guidelines+embedded+safety+summary"}, {"title": "volatile vs atomic embedded C multi-byte variables interrupt", "url": "https://www.google.com/search?q=volatile+vs+atomic+embedded+C+multi-byte+variables+interrupt"}, {"title": "Programming Embedded Systems in C and C++* (Michael Barr):", "url": "https://barrgroup.com/embedded-systems/books"}]
    },
    {
        title: "GPIO und Pin-Steuerung",
        content: `
<p><em>Hinweis: Lektionstext auf Englisch (Originalkurrikulum).</em></p>
<h3>Lesson outline</h3>
<ul>
<li>What a GPIO pin is: the physical pin, the pad, the I/O cell</li>
<li>Direction register (DDR/MODER): input vs. output configuration</li>
<li>Output modes: push-pull vs. open-drain; when each is required (I2C, wired-OR)</li>
<li>Input modes: floating, pull-up, pull-down — and why floating inputs are unreliable</li>
<li>Output drive strength and slew-rate settings; EMI implications of fast edges</li>
<li>Reading back output state vs. reading the pin state (IDR vs. ODR on STM32 family)</li>
<li>Software debouncing algorithms: count-based, timer-based, integrator</li>
<li>LED current limiting and GPIO current sourcing/sinking limits</li>
<li>The read-modify-write hazard in multi-threaded code</li>
<li>Alternate function mux: how one pin maps to multiple peripherals</li>
<li>Common pitfall: configuring alternate function mode before or after the peripheral clock enable</li>
</ul>
        `,
        keyPoints: ["Always enable the GPIO peripheral clock before any configuration \u2014 the register will silently not accept writes otherwise", "Use pull-ups or pull-downs on every digital input that is not actively driven; floating inputs can oscillate and drain power", "Open-drain output requires an external pull-up resistor; the MCU can only pull low", "Debounce every mechanical switch in software or hardware \u2014 raw GPIO reads will see multiple transitions per press", "Drive strength settings affect EMI; keep edge rates as slow as the application allows"],
        relatedTopics: [{"level": "level1", "index": 0, "label": "Digitaltechnik und Zahlensysteme"}, {"level": "level1", "index": 1, "label": "Grundlagen der Mikrocontroller-Architektur"}, {"level": "level1", "index": 4, "label": "Interrupts und ereignisgetriebene Programmierung"}, {"level": "level2", "index": 1, "label": "Timer, PWM und Capture/Compare"}],
        resources: [{"title": "STM32 GPIO MODER OTYPER OSPEEDR PUPDR reference manual", "url": "https://www.google.com/search?q=STM32+GPIO+MODER+OTYPER+OSPEEDR+PUPDR+reference+manual"}, {"title": "GPIO debounce algorithm embedded C software integrator method", "url": "https://www.google.com/search?q=GPIO+debounce+algorithm+embedded+C+software+integrator+method"}, {"title": "open drain vs push pull GPIO embedded explained", "url": "https://www.google.com/search?q=open+drain+vs+push+pull+GPIO+embedded+explained"}, {"title": "The Definitive Guide to ARM Cortex-M0* (Joseph Yiu):", "url": "https://www.elsevier.com/books/the-definitive-guide-to-arm-cortex-m0-and-cortex-m0-plus-processors/yiu/978-0-12-800634-4"}]
    },
    {
        title: "Interrupts und ereignisgetriebene Programmierung",
        content: `
<p><em>Hinweis: Lektionstext auf Englisch (Originalkurrikulum).</em></p>
<h3>Lesson outline</h3>
<ul>
<li>What an interrupt is: the hardware mechanism — interrupt request line, interrupt controller (NVIC on ARM), vector table</li>
<li>Interrupt latency: the path from IRQ asserted to first instruction executed</li>
<li>Writing an ISR: naming convention, \`__attribute__((interrupt))\`, clearing the interrupt flag</li>
<li>The golden rules of ISRs: keep them short, do not block, do not call non-reentrant functions</li>
<li>Volatile and the ISR–main communication pattern: flag + main-loop polling</li>
<li>Interrupt priority: preemption and sub-priority in Cortex-M NVIC; priority inversion preview</li>
<li>Enabling and disabling interrupts globally: critical sections with \`__disable_irq()\` / \`__enable_irq()\`</li>
<li>Edge-triggered vs. level-triggered interrupts</li>
<li>EXTI (External Interrupt) line configuration for GPIO</li>
<li>Common pitfall: forgetting to clear the interrupt pending flag, causing infinite re-entry</li>
<li>Common pitfall: stack overflow from deeply nested interrupts</li>
</ul>
        `,
        keyPoints: ["Always clear the interrupt source flag at the start of the ISR (or end, depending on peripheral requirements) \u2014 failing to do so causes immediate re-entry", "Communicate between an ISR and the main loop using a volatile flag, not a function call with side effects", "ISR execution time should be microseconds, not milliseconds; defer heavy work to main context via a pending flag", "Each Cortex-M interrupt has a configurable priority 0\u2013255; lower numeric value means higher priority", "Never use printf or dynamic allocation inside an ISR"],
        relatedTopics: [{"level": "level1", "index": 3, "label": "GPIO und Pin-Steuerung"}, {"level": "level1", "index": 1, "label": "Grundlagen der Mikrocontroller-Architektur"}, {"level": "level2", "index": 1, "label": "Timer, PWM und Capture/Compare"}, {"level": "level3", "index": 0, "label": "Echtzeitbetriebssysteme (RTOS)"}],
        resources: [{"title": "ARM NVIC documentation:", "url": "https://developer.arm.com/documentation/100235/0004/the-cortex-m33-peripherals/nested-vectored-interrupt-controller"}, {"title": "NVIC priority Cortex-M interrupt preemption subpriority grouping", "url": "https://www.google.com/search?q=NVIC+priority+Cortex-M+interrupt+preemption+subpriority+grouping"}, {"title": "ISR best practices embedded systems short fast defer", "url": "https://www.google.com/search?q=ISR+best+practices+embedded+systems+short+fast+defer"}, {"title": "Making Embedded Systems* (Elecia White, O'Reilly) Chapter 4 on Interrupts:", "url": "https://www.oreilly.com/library/view/making-embedded-systems/9781449308889/"}]
    }
]);
