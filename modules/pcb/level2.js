i18n.registerContent('en', 'level2', [
    {
        title: 'Deeper Analog Electronics',
        content: `
            <h3>🔄 Thévenin & Norton Equivalents</h3>
            <p>Simplify complex circuits to a single voltage source + resistor (Thévenin) or current source + resistor (Norton)</p>
            <ul>
                <li><strong>Thévenin Voltage (V_th):</strong> Open-circuit voltage across terminals</li>
                <li><strong>Thévenin Resistance (R_th):</strong> Resistance with all sources deactivated</li>
                <li><strong>Why it matters:</strong> Analyze sensor outputs, load effects on power supplies</li>
            </ul>
            
            <h3>⚡ Op-Amp Non-Idealities</h3>
            <p><strong>Input Bias Current:</strong> Small current into op-amp inputs (~nA to µA)</p>
            <ul>
                <li>Causes DC offset in high-impedance circuits</li>
                <li>Solution: Match source impedances on both inputs</li>
            </ul>
            
            <p><strong>Input Offset Voltage:</strong> Voltage difference between inputs needed for zero output</p>
            <ul>
                <li>Typical: 1-5mV, causes DC error in precision circuits</li>
                <li>Solution: Offset null pins, AC coupling, chopper stabilization</li>
            </ul>
            
            <p><strong>Slew Rate:</strong> Maximum rate of output voltage change (V/µs)</p>
            <ul>
                <li>Limits high-frequency, large-amplitude signals</li>
                <li>Example: 1V/µs means 1V takes 1µs to change</li>
                <li>Important for: Fast sensors, PWM filtering</li>
            </ul>
            
            <p><strong>Gain-Bandwidth Product (GBW):</strong> Gain × Bandwidth = constant</p>
            <ul>
                <li>LM358: 1MHz GBW (gain of 100 → 10kHz bandwidth)</li>
                <li>Choose op-amps with GBW >> desired bandwidth</li>
            </ul>
            
            <h3>📏 Instrumentation Amplifiers</h3>
            <p>Specialized for low-level differential signals (mV range)</p>
            <ul>
                <li><strong>High CMRR:</strong> 80-120dB (rejects common-mode noise)</li>
                <li><strong>High input impedance:</strong> Minimal loading on source</li>
                <li><strong>Gain set by single resistor:</strong> G = 1 + (50kΩ / R_gain)</li>
            </ul>
            
            <p><strong>Applications in Robotics:</strong></p>
            <ul>
                <li><strong>Strain gauges:</strong> Measure force, torque (Wheatstone bridge output)</li>
                <li><strong>Current sensing:</strong> Amplify voltage across shunt resistor</li>
                <li><strong>Load cells:</strong> Weight measurement in robot grippers</li>
                <li><strong>Popular ICs:</strong> INA128, AD620, INA826</li>
            </ul>
            
            <h3>📊 ADC Input Conditioning</h3>
            <p><strong>Filtering:</strong> Remove noise before sampling</p>
            <ul>
                <li>Anti-aliasing filter: Low-pass with f_c < f_sample / 2</li>
                <li>RC filter: f_c = 1/(2πRC)</li>
                <li>Example: 10kHz ADC → 4.7kΩ + 10nF = 3.4kHz cutoff</li>
            </ul>
            
            <p><strong>Scaling:</strong> Match sensor range to ADC range</p>
            <ul>
                <li>Voltage divider for attenuation</li>
                <li>Op-amp gain for amplification</li>
                <li>Example: 0-24V sensor → 0-3.3V ADC (divide by 7.27)</li>
            </ul>
            
            <p><strong>Biasing:</strong> Center signal in ADC range</p>
            <ul>
                <li>AC signals need DC offset (e.g., 1.65V for 0-3.3V ADC)</li>
                <li>Use voltage divider + buffer op-amp</li>
            </ul>
            
            <h3>🎚️ Feedback & Stability</h3>
            <p><strong>Negative Feedback:</strong> Output fed back to inverting input</p>
            <ul>
                <li>Stabilizes gain, reduces distortion</li>
                <li>Increases bandwidth</li>
            </ul>
            
            <p><strong>Bode Plots:</strong> Visualize gain and phase vs frequency</p>
            <ul>
                <li><strong>Gain Margin:</strong> How much gain before oscillation</li>
                <li><strong>Phase Margin:</strong> How much phase shift before oscillation (want >45°)</li>
                <li>Use compensation capacitors to stabilize</li>
            </ul>

            <div class="visual-ref-links">
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=instrumentation+amplifier+circuit+diagram+INA128&udm=2')">🔍 See: Instrumentation Amps</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=Wheatstone+bridge+strain+gauge+load+cell+circuit&udm=2')">📷 See: Wheatstone Bridge</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=active+low+pass+filter+Sallen+Key+op+amp+circuit&udm=2')">🔽 See: Active Filters</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=Bode+plot+gain+phase+margin+op+amp&udm=2')">📈 See: Bode Plots</button>
            </div>
        `,
    },
    {
        title: 'Intermediate Digital Electronics',
        content: `
            <h3>🔄 Voltage Level Translation</h3>
            <p>Interface between different logic voltage standards (critical in mixed-voltage systems)</p>
            
            <p><strong>3.3V ↔ 5V Translation:</strong></p>
            <ul>
                <li><strong>Resistor divider:</strong> 5V → 3.3V (simple, one-way, slow)</li>
                <li><strong>MOSFET:</strong> Bidirectional, fast (BSS138 common)</li>
                <li><strong>Dedicated IC:</strong> TXS0108E (8-channel, auto-direction)</li>
            </ul>
            
            <p><strong>When needed:</strong></p>
            <ul>
                <li>Arduino (5V) ↔ Raspberry Pi (3.3V)</li>
                <li>ESP32 (3.3V) ↔ 5V sensors</li>
                <li>STM32 (3.3V) ↔ 5V peripherals</li>
            </ul>
            
            <h3>💾 Memory on PCB</h3>
            <p><strong>SRAM (Static RAM):</strong></p>
            <ul>
                <li>Fast, volatile, parallel interface</li>
                <li>Use: External RAM for data-intensive applications</li>
                <li>Typical: IS61WV51216 (512KB, parallel bus)</li>
            </ul>
            
            <p><strong>Flash Memory:</strong></p>
            <ul>
                <li>Non-volatile, slower than SRAM</li>
                <li>SPI interface common (W25Q128, 16MB)</li>
                <li>Use: Firmware storage, data logging, file systems</li>
            </ul>
            
            <p><strong>EEPROM:</strong></p>
            <ul>
                <li>Small capacity (few KB), byte-addressable</li>
                <li>I2C interface (24LC256, 32KB)</li>
                <li>Use: Configuration data, calibration values</li>
            </ul>
            
            <p><strong>PCB Considerations:</strong></p>
            <ul>
                <li><strong>Decoupling:</strong> 100nF close to each VCC pin</li>
                <li><strong>Addressing:</strong> A0-A2 pins for I2C device address</li>
                <li><strong>Write protect:</strong> WP pin on EEPROM</li>
            </ul>
            
            <h3>⏰ Clocking Concepts</h3>
            <p><strong>Crystal Oscillators:</strong></p>
            <ul>
                <li>Precise frequency reference for MCUs</li>
                <li>Common: 8MHz, 12MHz, 16MHz, 32.768kHz (RTC)</li>
                <li>Requires load capacitors: typically 2× 18-22pF to ground</li>
                <li>PCB: Short traces, ground plane underneath, away from noise</li>
            </ul>
            
            <p><strong>Clock Distribution:</strong></p>
            <ul>
                <li>Keep clock traces short and direct</li>
                <li>Avoid routing under or near clock lines</li>
                <li>Series termination resistor if long traces (22-33Ω)</li>
            </ul>
            
            <p><strong>Debouncing:</strong></p>
            <ul>
                <li><strong>Hardware:</strong> RC filter (10kΩ + 100nF) + Schmitt trigger</li>
                <li><strong>Software:</strong> Read button, delay 20ms, read again</li>
                <li>Prevents multiple triggers from mechanical bounce</li>
            </ul>
            
            <h3>🔄 Finite State Machines (FSM)</h3>
            <p>Sequential logic for complex control sequences</p>
            <ul>
                <li><strong>States:</strong> IDLE, RUNNING, ERROR, COMPLETE</li>
                <li><strong>Transitions:</strong> Events that change states</li>
                <li><strong>Outputs:</strong> Actions in each state</li>
            </ul>
            
            <p><strong>Robotics Examples:</strong></p>
            <ul>
                <li>Motor control: STOP → ACCELERATE → RUN → BRAKE → STOP</li>
                <li>Communication protocol: IDLE → TRANSMIT → WAIT_ACK → COMPLETE</li>
                <li>Implement in firmware, but understand hardware sequencing</li>
            </ul>
            
            <h3>🔢 Shift Registers & Counters</h3>
            <p><strong>Shift Registers (74HC595):</strong></p>
            <ul>
                <li>Serial input → parallel output</li>
                <li>Control 8 outputs with 3 MCU pins (data, clock, latch)</li>
                <li>Daisy-chain for more outputs (16, 24, 32...)</li>
                <li>Use: LED displays, relay control, GPIO expansion</li>
            </ul>
            
            <p><strong>Counters (74HC4040):</strong></p>
            <ul>
                <li>Count clock pulses, divide frequency</li>
                <li>Use: Frequency division, event counting</li>
            </ul>

            <div class="visual-ref-links">
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=logic+level+shifter+BSS138+MOSFET+circuit+3.3V+5V&udm=2')">🔍 See: Level Shifters</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=W25Q128+SPI+flash+memory+chip+PCB&udm=2')">💾 See: SPI Flash</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=74HC595+shift+register+wiring+LED+arduino&udm=2')">🔢 See: 74HC595 Shift Register</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=MCU+crystal+oscillator+load+capacitor+PCB+layout&udm=2')">⏰ See: Crystal Layout</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=switch+debounce+RC+circuit+Schmitt+trigger&udm=2')">🔘 See: Debounce Circuits</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=finite+state+machine+diagram+robot+control&udm=2')">🔄 See: State Machine Diagrams</button>
            </div>
        `,
        relatedTopics: [{ level: 'level1', index: 3, label: 'Digital Logic Basics' }, { level: 'level3', index: 3, label: 'FPGA/SoC Hardware Design' }],
        resources: [{ title: 'STM32 Hardware Design Guide (AN4488)', url: 'https://www.st.com/resource/en/application_note/an4488.pdf' }, { title: 'DigiKey Reference Designs', url: 'https://www.digikey.com/reference-designs' }]
    },
    {
        title: 'Power Electronics for Embedded/Robotics',
        content: `
            <h3>🔋 Linear Regulators (LDO)</h3>
            <p><strong>How they work:</strong> Pass transistor drops excess voltage as heat</p>
            <ul>
                <li><strong>Dropout Voltage:</strong> Minimum V_in - V_out (e.g., 0.3V for LDO)</li>
                <li><strong>Efficiency:</strong> η = V_out / V_in (e.g., 3.3V from 5V = 66%)</li>
                <li><strong>Power dissipation:</strong> P = (V_in - V_out) × I_out</li>
            </ul>
            
            <p><strong>Popular LDOs:</strong></p>
            <ul>
                <li><strong>AMS1117-3.3:</strong> 1A, 1.2V dropout, cheap, needs heatsink</li>
                <li><strong>MCP1700:</strong> 250mA, 178mV dropout, low quiescent (1.6µA)</li>
                <li><strong>LP5907:</strong> 250mA, ultra-low noise (for analog circuits)</li>
            </ul>
            
            <p><strong>Thermal Management:</strong></p>
            <ul>
                <li>Calculate: P_dissipated = (V_in - V_out) × I_load</li>
                <li>Example: 12V → 5V @ 500mA = 3.5W (needs heatsink!)</li>
                <li>Copper pours on PCB act as heatsinks</li>
                <li>Thermal vias under IC package to bottom ground plane</li>
            </ul>
            
            <h3>⚡ Switching Regulators</h3>
            <p><strong>Buck Converter (Step-Down):</strong></p>
            <ul>
                <li>Higher efficiency (80-95%) than linear</li>
                <li>V_out = V_in × Duty_Cycle</li>
                <li>Components: Inductor, diode (or sync FET), input/output caps</li>
                <li>Use: Battery power (reduce heat), high current loads</li>
                <li>Example ICs: LM2596 (fixed), TPS54340 (adjustable, 3.5A)</li>
            </ul>
            
            <p><strong>Boost Converter (Step-Up):</strong></p>
            <ul>
                <li>Increase voltage (e.g., 3.3V → 5V, 5V → 12V)</li>
                <li>Use: Power motors from battery, LCD backlights</li>
                <li>Example ICs: MT3608 (cheap module), TPS61088</li>
            </ul>
            
            <p><strong>Buck-Boost:</strong></p>
            <ul>
                <li>Output can be higher or lower than input</li>
                <li>Use: Battery systems (voltage varies during discharge)</li>
            </ul>
            
            <p><strong>PCB Layout for Switchers:</strong></p>
            <ul>
                <li><strong>Hot loop:</strong> High di/dt path - minimize area!</li>
                <li>Keep switching node traces short and thick</li>
                <li>Input/output caps close to IC</li>
                <li>Ground plane under entire circuit</li>
                <li>Avoid routing sensitive signals near switching node</li>
            </ul>
            
            <h3>🔌 Decoupling Strategy</h3>
            <p><strong>Bulk Capacitors (10-100µF):</strong></p>
            <ul>
                <li>Electrolytic or tantalum</li>
                <li>Stabilize low-frequency transients</li>
                <li>Place near power entry point</li>
            </ul>
            
            <p><strong>High-Frequency Capacitors (100nF):</strong></p>
            <ul>
                <li>Ceramic X7R or X5R</li>
                <li>Filter high-frequency switching noise</li>
                <li>Place as close as possible to IC power pins (&lt;5mm)</li>
                <li><strong>Rule:</strong> One 100nF per power pin pair (VCC/GND)</li>
            </ul>
            
            <p><strong>Placement Rules:</strong></p>
            <ul>
                <li>Via to ground plane directly from cap pad</li>
                <li>Short, wide traces to IC pins</li>
                <li>Multiple vias if high current (&gt;100mA)</li>
            </ul>
            
            <h3>🤖 Motor Drivers</h3>
            <p><strong>H-Bridge Topology:</strong></p>
            <ul>
                <li>4 transistors control motor direction and braking</li>
                <li>Forward: Q1+Q4 on, Q2+Q3 off</li>
                <li>Reverse: Q2+Q3 on, Q1+Q4 off</li>
                <li>Brake: All low-side on (short motor terminals)</li>
            </ul>
            
            <p><strong>PWM Control:</strong></p>
            <ul>
                <li>Duty cycle = speed (0-100%)</li>
                <li>Typical PWM frequency: 15-25kHz (above audible range)</li>
                <li>Direction pins + PWM pin (or 2× PWM for independent control)</li>
            </ul>
            
            <p><strong>Current Sensing:</strong></p>
            <ul>
                <li>Shunt resistor (0.01-0.1Ω) in series with motor</li>
                <li>Amplify voltage with op-amp or dedicated IC (INA139)</li>
                <li>Use for: Overcurrent protection, stall detection, torque estimation</li>
            </ul>
            
            <p><strong>Popular ICs:</strong></p>
            <ul>
                <li><strong>L298N:</strong> Dual H-bridge, 2A/channel, cheap, inefficient</li>
                <li><strong>DRV8871:</strong> 3.6A, PWM input, thermal protection</li>
                <li><strong>TB6612FNG:</strong> Dual, 1.2A, MOSFET-based (efficient)</li>
            </ul>
            
            <h3>🔋 Battery Management</h3>
            <p><strong>Li-Ion/LiPo Charging:</strong></p>
            <ul>
                <li>CC/CV profile: Constant current → constant voltage</li>
                <li>Charge to 4.2V, cutoff at 3.0V (never below!)</li>
                <li>Charge IC: TP4056 (1A, simple), BQ24195 (advanced)</li>
            </ul>
            
            <p><strong>Protection Circuits:</strong></p>
            <ul>
                <li><strong>Overcharge:</strong> Disconnect at 4.2V</li>
                <li><strong>Over-discharge:</strong> Disconnect at 3.0V</li>
                <li><strong>Overcurrent:</strong> Limit or shut down</li>
                <li>Protection IC: DW01 + FS8205A (common pair)</li>
            </ul>
            
            <p><strong>Fuel Gauge ICs:</strong></p>
            <ul>
                <li>Estimate battery % remaining</li>
                <li>MAX17048 (I2C, voltage-based estimation)</li>
                <li>Coulomb counting for more accuracy</li>
            </ul>
            
            <h3>🛡️ Protection Circuits</h3>
            <p><strong>TVS Diodes:</strong> Transient Voltage Suppressors</p>
            <ul>
                <li>Clamp voltage spikes (ESD, inductive kickback)</li>
                <li>Place across motor terminals, power inputs, communication lines</li>
                <li>Select V_breakdown &gt; V_normal + 20%</li>
            </ul>
            
            <p><strong>Reverse Polarity Protection:</strong></p>
            <ul>
                <li>P-MOSFET in high-side (V_gs &lt; 0 to conduct)</li>
                <li>Schottky diode (simple but wastes power)</li>
            </ul>
            
            <p><strong>Overcurrent Protection:</strong></p>
            <ul>
                <li>Resettable fuses (PTC, polyfuse)</li>
                <li>Electronic fuses with current sense + MOSFET</li>
            </ul>

            <div class="visual-ref-links">
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=buck+boost+LDO+voltage+regulator+PCB+circuit+diagram&udm=2')">🔍 See: Voltage Regulators</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=buck+converter+PCB+layout+inductor+capacitor&udm=2')">⚡ See: Buck Converter Layout</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=H-bridge+motor+driver+MOSFET+circuit+diagram&udm=2')">📷 See: H-Bridge Drivers</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=LiPo+battery+BMS+protection+module+PCB&udm=2')">🔋 See: LiPo BMS</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=current+sense+shunt+amplifier+INA+PCB&udm=2')">📊 See: Current Sense</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=TVS+diode+protection+circuit+ESD+PCB&udm=2')">🛡️ See: TVS Protection</button>
            </div>
        `,
        relatedTopics: [{ level: 'level1', index: 0, label: 'Math & Physics Basics' }, { level: 'level3', index: 2, label: 'Power Integrity & Advanced Power' }],
        resources: [{ title: 'TI Power Supply Design Seminar', url: 'https://www.ti.com/design-resources/design-tools-simulation/power-supply-design-seminar.html' }, { title: 'TI Webench Power Designer', url: 'https://www.ti.com/design-resources/design-tools-simulation/webench-power-designer.html' }]
    },
    {
        title: 'Microcontroller Hardware Design',
        content: `
            <h3>📖 Reading Datasheets</h3>
            <p><strong>Most Critical Sections:</strong></p>
            <ul>
                <li><strong>Absolute Maximum Ratings:</strong> DO NOT EXCEED (damage)</li>
                <li><strong>Electrical Characteristics:</strong> Operating ranges, current draw</li>
                <li><strong>Pin Descriptions:</strong> Function, alternate modes</li>
                <li><strong>Application Section:</strong> Reference designs (copy these!)</li>
                <li><strong>PCB Layout Recommendations:</strong> Decoupling, routing guidelines</li>
            </ul>
            
            <p><strong>Hardware Design Guides:</strong></p>
            <ul>
                <li>ST: AN4488 (STM32 hardware getting started)</li>
                <li>Espressif: ESP32 Hardware Design Guidelines</li>
                <li>Raspberry Pi: RP2040 Hardware Design</li>
                <li><strong>Always follow these - they prevent 90% of issues!</strong></li>
            </ul>
            
            <h3>⚡ Minimum Viable MCU Circuit</h3>
            <p><strong>Essential Components:</strong></p>
            <ol>
                <li><strong>Power Supply:</strong> 3.3V or 1.8V regulated, clean</li>
                <li><strong>Decoupling Capacitors:</strong> 100nF per VCC/GND pair + 10µF bulk</li>
                <li><strong>Reset Circuit:</strong> Pull-up resistor (10kΩ) + capacitor (100nF) + button</li>
                <li><strong>Clock:</strong> External crystal + load caps OR use internal RC oscillator</li>
                <li><strong>Boot Pins:</strong> Configure boot mode (run from flash vs bootloader)</li>
            </ol>
            
            <p><strong>STM32 Example:</strong></p>
            <ul>
                <li>VDD/VSS pairs: 100nF each + 4.7µF bulk on VDD</li>
                <li>VDDA (analog): 100nF + 1µF + ferrite bead from VDD</li>
                <li>NRST: 10kΩ pull-up + 100nF to GND + button to GND</li>
                <li>BOOT0: 10kΩ pull-down (run from flash), jumper to VDD for bootloader</li>
                <li>Crystal: 8MHz + 2× 20pF load caps to GND</li>
            </ul>
            
            <h3>🔌 Programming/Debug Connectors</h3>
            <p><strong>SWD (ARM Cortex):</strong></p>
            <ul>
                <li>4 wires: SWDIO, SWCLK, GND, VCC (optional)</li>
                <li>Use 2×5 0.05" header (TC2050-IDC common)</li>
                <li>Add series resistors (100Ω) for protection</li>
                <li>Keep traces short (&lt;10cm for reliable programming)</li>
            </ul>
            
            <p><strong>JTAG:</strong></p>
            <ul>
                <li>More pins, full debug access</li>
                <li>20-pin ARM standard header</li>
            </ul>
            
            <p><strong>UART Bootloader:</strong></p>
            <ul>
                <li>Many MCUs have ROM bootloader via UART</li>
                <li>No special programmer needed (USB-UART adapter)</li>
                <li>Requires BOOT pin configuration on reset</li>
            </ul>
            
            <p><strong>ISP (AVR):</strong></p>
            <ul>
                <li>6-pin header: MOSI, MISO, SCK, RESET, VCC, GND</li>
                <li>Arduino as ISP programmer</li>
            </ul>
            
            <h3>🛡️ GPIO Protection</h3>
            <p><strong>Input Protection:</strong></p>
            <ul>
                <li>Series resistor (1-10kΩ) limits current on overvoltage</li>
                <li>ESD diodes (built-in to MCU, but external adds robustness)</li>
                <li>TVS diodes for high-voltage environments</li>
            </ul>
            
            <p><strong>Output Protection:</strong></p>
            <ul>
                <li>Current limiting resistor for LEDs</li>
                <li>Flyback diodes for inductive loads (relays, solenoids)</li>
                <li>Never drive high current directly - use MOSFET/transistor</li>
            </ul>
            
            <h3>📊 ADC Input Circuits</h3>
            <p><strong>Reference Voltage:</strong></p>
            <ul>
                <li>VREF determines ADC full-scale (e.g., 3.3V)</li>
                <li>Internal reference (less accurate) or external (precision)</li>
                <li>External: TL431 (adjustable), REF3033 (3.3V, 0.05%)</li>
            </ul>
            
            <p><strong>Input Conditioning:</strong></p>
            <ul>
                <li>RC filter before ADC pin (anti-aliasing)</li>
                <li>Buffer op-amp if source impedance &gt;10kΩ</li>
                <li>Voltage divider to scale high voltages</li>
                <li>Protection: Schottky diodes to VDD/GND (clamp overvoltage)</li>
            </ul>
            
            <h3>⚙️ PWM Output Filtering</h3>
            <p><strong>Why filter:</strong> Convert PWM to analog voltage (DAC alternative)</p>
            <ul>
                <li>RC low-pass filter: R = 1kΩ, C = 1µF (f_c = 160Hz)</li>
                <li>2nd order (LC) for better filtering</li>
                <li>Buffer with op-amp if driving low impedance load</li>
            </ul>
            
            <h3>📡 Communication Buses on PCB</h3>
            <p><strong>UART:</strong></p>
            <ul>
                <li>2 wires: TX, RX (+ GND reference)</li>
                <li>No special PCB requirements for short distances</li>
                <li>Level shifters if voltage mismatch</li>
            </ul>
            
            <p><strong>SPI:</strong></p>
            <ul>
                <li>4 wires: MOSI, MISO, SCK, CS</li>
                <li>Keep traces &lt;30cm for reliable 10MHz+ operation</li>
                <li>Daisy-chain or star topology</li>
            </ul>
            
            <p><strong>I2C:</strong></p>
            <ul>
                <li>2 wires: SDA, SCL (open-drain)</li>
                <li>Requires pull-up resistors: 2.2kΩ - 10kΩ</li>
                <li>R = (V_supply - 0.4) / (3mA × devices)</li>
                <li>Bus capacitance limit: 400pF (standard), 100pF (fast mode)</li>
            </ul>
            
            <h3>⏱️ Real-Time Hardware Considerations</h3>
            <p><strong>Interrupt Lines:</strong></p>
            <ul>
                <li>Assign high-priority pins to critical signals</li>
                <li>Hardware debouncing for encoder inputs</li>
                <li>Schmitt trigger buffers for noisy signals</li>
            </ul>
            
            <p><strong>Timer Outputs:</strong></p>
            <ul>
                <li>PWM for motor control (complementary outputs for H-bridge)</li>
                <li>Dead-time insertion in hardware</li>
            </ul>
            
            <p><strong>Encoder Inputs:</strong></p>
            <ul>
                <li>Quadrature encoding: A and B channels (90° phase shift)</li>
                <li>Hardware quadrature decoder (STM32 timer in encoder mode)</li>
                <li>RC filter + Schmitt trigger for noise immunity</li>
            </ul>
            
            <h3>🎛️ Popular MCU Families</h3>
            <p><strong>STM32 (ARM Cortex-M):</strong></p>
            <ul>
                <li>Wide range: M0+ (ultra-low power) to M7 (high performance)</li>
                <li>Rich peripherals, hardware floating point</li>
                <li>Gotcha: Many pins have alternate functions - check mux carefully</li>
            </ul>
            
            <p><strong>ESP32:</strong></p>
            <ul>
                <li>Dual-core, Wi-Fi + Bluetooth integrated</li>
                <li>3.3V IO, careful with 5V tolerant pins (few)</li>
                <li>Gotcha: Some pins strapping pins (affect boot mode)</li>
            </ul>
            
            <p><strong>RP2040:</strong></p>
            <ul>
                <li>Dual Cortex-M0+, unique PIO peripheral</li>
                <li>Requires external flash memory (QSPI)</li>
                <li>Very flexible GPIO muxing</li>
            </ul>
            
            <p><strong>AVR (Arduino):</strong></p>
            <ul>
                <li>Simple 8-bit, easy to start</li>
                <li>5V or 3.3V variants</li>
                <li>Limited to simpler projects compared to ARM</li>
            </ul>

            <div class="visual-ref-links">
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=STM32+minimal+circuit+schematic+decoupling+bypass+capacitors&udm=2')">🔍 See: MCU Circuits</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=SWD+connector+TC2050+debug+header+PCB&udm=2')">🔌 See: SWD Debug Headers</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=crystal+oscillator+load+capacitor+PCB+layout&udm=2')">📷 See: Crystal Circuits</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=ADC+input+RC+filter+op+amp+buffer+circuit&udm=2')">📊 See: ADC Front-End</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=quadrature+encoder+A+B+signals+oscilloscope&udm=2')">🎛️ See: Quadrature Encoders</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=ESP32+STM32+RP2040+development+board+photo&udm=2')">🧩 See: MCU Dev Boards</button>
            </div>
        `,
    },
    {
        title: 'Communication Interfaces (Hardware Focus)',
        content: `
            <h3>📟 UART / RS-232 / RS-485</h3>
            <p><strong>UART Basics:</strong></p>
            <ul>
                <li>Asynchronous, 2-wire (TX/RX), no clock</li>
                <li>Logic-level (0-3.3V or 0-5V)</li>
                <li>Baud rate must match both sides</li>
            </ul>
            
            <p><strong>RS-232:</strong></p>
            <ul>
                <li>±12V signaling (logic 1 = -12V, logic 0 = +12V)</li>
                <li>Long distance capability (50+ feet)</li>
                <li>Line driver IC: MAX232 (charge pump, no external supply needed)</li>
                <li>DE-9 connector standard</li>
            </ul>
            
            <p><strong>RS-485:</strong></p>
            <ul>
                <li>Differential signaling (A/B pair)</li>
                <li>Multi-drop bus (up to 32 devices)</li>
                <li>Very long distance (1200m @ 100kbps)</li>
                <li>Transceiver: MAX485, SN65HVD75</li>
                <li><strong>Termination:</strong> 120Ω resistor at both bus ends</li>
                <li>Use: Industrial sensors, Modbus RTU</li>
            </ul>
            
            <p><strong>ESD Protection:</strong></p>
            <ul>
                <li>TVS diode arrays on TX/RX lines</li>
                <li>Critical for external connectors</li>
            </ul>
            
            <h3>🔄 SPI (Serial Peripheral Interface)</h3>
            <p><strong>Signals:</strong></p>
            <ul>
                <li><strong>MOSI:</strong> Master Out, Slave In (data to peripheral)</li>
                <li><strong>MISO:</strong> Master In, Slave Out (data from peripheral)</li>
                <li><strong>SCK:</strong> Clock (master generates)</li>
                <li><strong>CS/SS:</strong> Chip Select (active low, one per slave)</li>
            </ul>
            
            <p><strong>Trace Matching:</strong></p>
            <ul>
                <li>Not critical for distances &lt;30cm @ &lt;10MHz</li>
                <li>For high-speed (&gt;25MHz): match MOSI/MISO/SCK lengths ±5mm</li>
            </ul>
            
            <p><strong>Speed Limits:</strong></p>
            <ul>
                <li>Short PCB traces: 10-50MHz typical</li>
                <li>Limit by: Trace capacitance, peripheral max frequency</li>
                <li>Series termination (22-33Ω) if ringing observed</li>
            </ul>
            
            <p><strong>Chip Select Considerations:</strong></p>
            <ul>
                <li>Individual GPIO per slave, or use 74HC138 decoder (3→8)</li>
                <li>Pull-up resistors ensure CS high during MCU reset</li>
                <li>Setup/hold time requirements - check datasheet</li>
            </ul>
            
            <h3>🔗 I2C (Inter-Integrated Circuit)</h3>
            <p><strong>Open-Drain Topology:</strong></p>
            <ul>
                <li>Requires external pull-up resistors (both SDA and SCL)</li>
                <li>Devices can only pull low, resistors pull high</li>
                <li>Allows multiple masters (arbitration)</li>
            </ul>
            
            <p><strong>Pull-Up Resistor Sizing:</strong></p>
            <ul>
                <li><strong>Formula:</strong> R = (V_supply - 0.4V) / (0.003A × N_devices)</li>
                <li><strong>Typical range:</strong> 2.2kΩ - 10kΩ</li>
                <li><strong>Lower R:</strong> Faster rise time, more current</li>
                <li><strong>Higher R:</strong> Less current, slower (may not work at high speed)</li>
                <li>Example: 3.3V, 5 devices → 2.2kΩ - 4.7kΩ</li>
            </ul>
            
            <p><strong>Speed Modes:</strong></p>
            <ul>
                <li><strong>Standard:</strong> 100kHz (C_bus &lt; 400pF)</li>
                <li><strong>Fast:</strong> 400kHz (C_bus &lt; 400pF)</li>
                <li><strong>Fast Plus:</strong> 1MHz (C_bus &lt; 550pF)</li>
            </ul>
            
            <p><strong>Bus Capacitance Limits:</strong></p>
            <ul>
                <li>Calculate: C_trace + C_device_pins × N_devices</li>
                <li>PCB trace: ~2pF/cm (ground plane nearby)</li>
                <li>Each device adds 5-15pF</li>
                <li>If over limit: Reduce trace length, use buffer (P82B96)</li>
            </ul>
            
            <h3>🚗 CAN Bus</h3>
            <p><strong>Differential Signaling:</strong></p>
            <ul>
                <li>CAN_H and CAN_L twisted pair</li>
                <li>Dominant (0): |H - L| ≈ 2V</li>
                <li>Recessive (1): |H - L| ≈ 0V</li>
            </ul>
            
            <p><strong>Transceiver:</strong></p>
            <ul>
                <li>Converts MCU logic to differential</li>
                <li>Popular: MCP2551, TJA1050, SN65HVD230</li>
                <li>3.3V and 5V variants available</li>
            </ul>
            
            <p><strong>120Ω Termination:</strong></p>
            <ul>
                <li><strong>Required at both ends</strong> of bus (critical!)</li>
                <li>Resistor between CAN_H and CAN_L</li>
                <li>Without: Reflections cause errors</li>
                <li>Split termination (60Ω + 100nF each) improves EMC</li>
            </ul>
            
            <p><strong>Differential Pair Layout:</strong></p>
            <ul>
                <li>Route CAN_H and CAN_L together, same length</li>
                <li>Keep spacing consistent</li>
                <li>Avoid splits in ground plane underneath</li>
                <li>Typical PCB trace impedance: 120Ω differential</li>
            </ul>
            
            <p><strong>Use in Robotics:</strong></p>
            <ul>
                <li>Multi-motor control (distribute load)</li>
                <li>Sensor networks</li>
                <li>Automotive interfacing</li>
            </ul>
            
            <h3>🔌 USB</h3>
            <p><strong>USB 2.0 Full Speed (12 Mbps):</strong></p>
            <ul>
                <li>Differential pair: D+ and D- (90Ω impedance)</li>
                <li>Series termination: 22Ω on each line at source</li>
                <li>PCB routing: Same length (±5mm), tight coupling</li>
                <li>Trace width/spacing for 90Ω differential: Depends on stackup</li>
            </ul>
            
            <p><strong>USB High Speed (480 Mbps):</strong></p>
            <ul>
                <li>More critical routing: Match lengths ±0.5mm</li>
                <li>Controlled impedance traces</li>
                <li>No vias if possible, minimize stubs</li>
            </ul>
            
            <p><strong>ESD Protection:</strong></p>
            <ul>
                <li><strong>Mandatory for external connectors</strong></li>
                <li>Dedicated USB ESD ICs: TPD2E001, USBLC6</li>
                <li>Place close to connector (&lt;5mm)</li>
            </ul>
            
            <p><strong>Common Pitfalls:</strong></p>
            <ul>
                <li>Wrong trace impedance → reflections, errors</li>
                <li>Length mismatch → skew, timing issues</li>
                <li>No ESD protection → device damage</li>
            </ul>

            <div class="visual-ref-links">
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=SPI+I2C+UART+CAN+bus+wiring+diagram+comparison&udm=2')">🔍 See: Communication Buses</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=CAN+transceiver+TJA1051+termination+PCB&udm=2')">🚗 See: CAN Transceivers</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=RS-485+differential+pair+network+termination+diagram&udm=2')">📷 See: RS-485 Networks</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=USB+differential+pair+90+ohm+PCB+routing&udm=2')">🔌 See: USB PCB Routing</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=Ethernet+magnetics+RJ45+PCB+layout&udm=2')">🌐 See: Ethernet / RJ45</button>
            </div>
        `,
    },
    {
        title: 'Intermediate PCB Layout Techniques',
        content: `
            <h3>📚 4-Layer PCB Basics</h3>
            <p><strong>Standard Stack-up:</strong></p>
            <ul>
                <li><strong>Layer 1:</strong> Top signal layer</li>
                <li><strong>Layer 2:</strong> Ground plane (solid copper)</li>
                <li><strong>Layer 3:</strong> Power plane(s) (VCC, 3.3V, 5V)</li>
                <li><strong>Layer 4:</strong> Bottom signal layer</li>
            </ul>
            
            <p><strong>Benefits over 2-layer:</strong></p>
            <ul>
                <li>Better signal integrity (shorter return paths)</li>
                <li>Lower EMI (ground plane shielding)</li>
                <li>More routing space</li>
                <li>Better power distribution</li>
            </ul>
            
            <p><strong>When to use 4-layer:</strong></p>
            <ul>
                <li>High-speed signals (USB, Ethernet, QSPI)</li>
                <li>Mixed analog/digital (separate ground regions)</li>
                <li>Dense component placement</li>
                <li>Cost difference: ~2-3× vs 2-layer (often worth it!)</li>
            </ul>
            
            <h3>🌍 Ground Plane Best Practices</h3>
            <p><strong>No Splits:</strong></p>
            <ul>
                <li>Keep ground plane continuous (avoid cutting it)</li>
                <li>Splits force return current through long paths → EMI, noise</li>
                <li>Exception: Intentional analog/digital separation</li>
            </ul>
            
            <p><strong>Stitching Vias:</strong></p>
            <ul>
                <li>Connect top and bottom ground planes frequently</li>
                <li>Place around perimeter of board (every 1-2cm)</li>
                <li>Near high-speed components</li>
                <li>Connect ground pours with multiple vias</li>
            </ul>
            
            <p><strong>Copper Pours:</strong></p>
            <ul>
                <li>Fill unused areas with ground copper</li>
                <li>Reduces EMI, provides return path</li>
                <li>Thermal management for power components</li>
            </ul>
            
            <h3>⚡ Decoupling Cap Placement</h3>
            <p><strong>The Golden Rule:</strong> Right next to power pins!</p>
            <ul>
                <li><strong>Distance:</strong> &lt;5mm trace from cap to IC pin</li>
                <li><strong>Via placement:</strong> Directly from cap pad to ground plane</li>
                <li><strong>Trace width:</strong> Wide as reasonably possible</li>
            </ul>
            
            <p><strong>Capacitor Selection:</strong></p>
            <ul>
                <li>100nF ceramic (X7R): One per VCC/GND pair</li>
                <li>10µF bulk: One per IC (or per group of small ICs)</li>
                <li>If &gt;100mA draw: Add 47µF or larger</li>
            </ul>
            
            <p><strong>Via Strategy:</strong></p>
            <ul>
                <li>Cap pad → trace → via → ground plane (minimize loop area)</li>
                <li>Multiple vias for high current (&gt;100mA per via typical)</li>
            </ul>
            
            <h3>🔌 Power Routing</h3>
            <p><strong>Current Loops:</strong></p>
            <ul>
                <li>Minimize area of power supply and return path</li>
                <li>Keep VCC trace close to ground plane</li>
                <li>Route power traces over ground plane (direct return)</li>
            </ul>
            
            <p><strong>Trace Width by Current (IPC-2152):</strong></p>
            <ul>
                <li><strong>1A @ 10°C rise:</strong> ~0.4mm (16 mil) outer layer, 1oz copper</li>
                <li><strong>2A @ 10°C rise:</strong> ~1.0mm (40 mil)</li>
                <li><strong>3A @ 10°C rise:</strong> ~1.8mm (70 mil)</li>
                <li>Inner layers require ~2× width (less cooling)</li>
                <li><strong>Calculator:</strong> Use online trace width calculators!</li>
            </ul>
            
            <p><strong>Alternative for High Current:</strong></p>
            <ul>
                <li>Copper pours instead of traces</li>
                <li>2oz or 3oz copper (optional PCB fabrication)</li>
                <li>Top + bottom traces in parallel (via stitching)</li>
            </ul>
            
            <h3>🔥 High-Current Motor Traces</h3>
            <p><strong>Best Practices:</strong></p>
            <ul>
                <li>Use thick pours (not narrow traces)</li>
                <li>Parallel top + bottom layers (double capacity)</li>
                <li>Array of vias connecting layers (every 5-10mm)</li>
                <li>Keep traces short (motor to driver)</li>
            </ul>
            
            <p><strong>Thermal Relief:</strong></p>
            <ul>
                <li>For through-hole pads: Spoke connections to ground pour</li>
                <li><strong>Use thermal relief:</strong> Easier soldering (pour doesn't sink all heat)</li>
                <li><strong>Skip thermal relief:</strong> For high-current power connections</li>
            </ul>
            
            <h3>🧩 Component Placement</h3>
            <p><strong>Functional Grouping:</strong></p>
            <ul>
                <li>MCU + decoupling caps + crystal together</li>
                <li>Power supply section in one area</li>
                <li>Communication transceivers near connectors</li>
            </ul>
            
            <p><strong>Signal Flow Direction:</strong></p>
            <ul>
                <li>Input (connector) → Processing (MCU) → Output (actuators)</li>
                <li>Left-to-right or top-to-bottom logical flow</li>
                <li>Reduces trace crossings</li>
            </ul>
            
            <p><strong>Orientation:</strong></p>
            <ul>
                <li>Align ICs in same direction (easier to read)</li>
                <li>Connectors at board edges</li>
                <li>Test points accessible (not under components)</li>
            </ul>
            
            <h3>🔧 Via Types</h3>
            <p><strong>Through-Hole Via:</strong></p>
            <ul>
                <li>Drilled completely through board</li>
                <li>Most common, cheapest</li>
            </ul>
            
            <p><strong>Tented/Untented:</strong></p>
            <ul>
                <li><strong>Tented:</strong> Solder mask covers via (standard)</li>
                <li><strong>Untented:</strong> Exposed via (allows solder to fill, test points)</li>
            </ul>
            
            <p><strong>Thermal Vias:</strong></p>
            <ul>
                <li>Array of vias under QFN, power ICs</li>
                <li>Conduct heat from component to inner/bottom copper</li>
                <li>Fill with epoxy or cap with copper (prevents solder wicking)</li>
            </ul>
            
            <p><strong>Via Pad Under Component:</strong></p>
            <ul>
                <li>Tented vias OK under components</li>
                <li>Avoid open vias (solder can wick during reflow)</li>
            </ul>

            <div class="visual-ref-links">
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=PCB+layout+decoupling+capacitor+placement+ground+plane&udm=2')">🔍 See: Decoupling & Planes</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=4+layer+PCB+stackup+signal+ground+power+routing&udm=2')">📷 See: 4-Layer Stackups</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=PCB+differential+pair+length+match+routing&udm=2')">〰️ See: Differential Pairs</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=thermal+vias+QFN+heatsink+copper+pour+PCB&udm=2')">🔥 See: Thermal Vias</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=IPC+trace+width+current+capacity+chart&udm=2')">📐 See: Trace Width vs Current</button>
            </div>
        `,
    },
    {
        title: 'Design for Manufacturability (DFM) & Assembly (DFA)',
        content: `
            <h3>🏭 Fab Constraints</h3>
            <p><strong>Always Check Fab Capabilities Before Designing!</strong></p>
            
            <p><strong>Minimum Trace/Space:</strong></p>
            <ul>
                <li><strong>Standard:</strong> 6 mil / 6 mil (0.15mm)</li>
                <li><strong>Budget fabs:</strong> Often 6-8 mil minimum</li>
                <li><strong>Higher cost:</strong> 4 mil / 4 mil (finer routing)</li>
                <li>Stay above minimum by 20% for reliability</li>
            </ul>
            
            <p><strong>Minimum Drill Size:</strong></p>
            <ul>
                <li><strong>Standard:</strong> 0.3mm (12 mil)</li>
                <li>Smaller holes: 0.2mm available (extra cost)</li>
                <li>Through-hole components: Check lead diameter + clearance</li>
            </ul>
            
            <p><strong>Annular Ring:</strong></p>
            <ul>
                <li>Copper ring around drilled hole</li>
                <li><strong>Minimum:</strong> 4-6 mil (0.1-0.15mm)</li>
                <li>Too small → drill misalignment breaks connection</li>
            </ul>
            
            <p><strong>Board Thickness:</strong></p>
            <ul>
                <li><strong>Standard:</strong> 1.6mm (most common, cheapest)</li>
                <li>Alternatives: 0.8mm, 1.0mm, 2.0mm (extra cost/lead time)</li>
            </ul>
            
            <h3>📐 Footprint Design (IPC-7351)</h3>
            <p><strong>Land Pattern Guidelines:</strong></p>
            <ul>
                <li>Follow IPC-7351 standard (pad dimensions for SMD parts)</li>
                <li><strong>KiCad/Altium:</strong> Built-in libraries usually IPC-compliant</li>
                <li>Custom footprints: Measure component or use datasheet</li>
            </ul>
            
            <p><strong>Pad Dimensions:</strong></p>
            <ul>
                <li><strong>Toe:</strong> Extension beyond component lead (solder fillet)</li>
                <li><strong>Heel:</strong> Inside pad edge (solder wetting area)</li>
                <li><strong>Side:</strong> Pad width beyond lead</li>
                <li>Larger pads → easier hand soldering but takes more space</li>
            </ul>
            
            <p><strong>Thermal Pads (QFN, Power ICs):</strong></p>
            <ul>
                <li>Central exposed pad for heat dissipation</li>
                <li>Array of thermal vias (0.3mm, 1mm spacing)</li>
                <li>Connect to ground or power plane</li>
                <li>Tent vias or fill with epoxy (prevent solder wicking)</li>
            </ul>
            
            <h3>📦 BOM Management</h3>
            <p><strong>Bill of Materials Best Practices:</strong></p>
            <ul>
                <li><strong>Columns:</strong> Ref Des, Value, Footprint, Manufacturer, MPN, Supplier, SKU</li>
                <li><strong>Lifecycle:</strong> Check parts aren't obsolete/discontinued</li>
                <li><strong>Availability:</strong> Verify stock at distributors (LCSC, Mouser, Digikey)</li>
            </ul>
            
            <p><strong>Sourcing Strategy:</strong></p>
            <ul>
                <li><strong>LCSC:</strong> Integrated with JLCPCB assembly (cheapest)</li>
                <li><strong>Mouser/Digikey:</strong> Huge selection, fast shipping, higher cost</li>
                <li><strong>Alternate parts:</strong> List 2-3 compatible parts (supply chain backup)</li>
            </ul>
            
            <p><strong>Part Selection Tips:</strong></p>
            <ul>
                <li>Standard packages: 0805/0603 resistors/caps (hand-solderable)</li>
                <li>Avoid 0402 unless space-critical (hard to hand solder)</li>
                <li>Generic parts: Lower cost, better availability</li>
                <li>Active components: Check lead time (&lt;2 weeks ideal)</li>
            </ul>
            
            <h3>🏭 Assembly Output Files</h3>
            <p><strong>Pick-and-Place (CPL) File:</strong></p>
            <ul>
                <li>CSV: Ref Des, X, Y, Rotation, Side</li>
                <li>Tells machine where to place each component</li>
                <li>Generated by EDA tool (KiCad: File → Fabrication Outputs)</li>
                <li><strong>Verify rotation:</strong> Check IC pin 1 orientation!</li>
            </ul>
            
            <p><strong>Assembly Drawing:</strong></p>
            <ul>
                <li>PDF showing component placement, reference designators</li>
                <li>Top and bottom views</li>
                <li>For manual assembly or verification</li>
            </ul>
            
            <p><strong>BOM for Assembly House:</strong></p>
            <ul>
                <li>Match format required by assembler (JLCPCB, PCBWay)</li>
                <li>Include LCSC part numbers if using JLCPCB</li>
                <li>Designate "Do Not Place" (DNP) parts</li>
            </ul>
            
            <h3>✂️ Panelization Basics</h3>
            <p><strong>Why Panelize:</strong></p>
            <ul>
                <li>Combine multiple small boards on one larger panel</li>
                <li>Reduces cost per board (utilize full panel area)</li>
                <li>Easier handling in automated assembly</li>
            </ul>
            
            <p><strong>V-Score:</strong></p>
            <ul>
                <li>V-shaped groove cut into top/bottom (not fully through)</li>
                <li>Snap boards apart by bending</li>
                <li>Works for rectangular boards with straight edges</li>
                <li>Leaves rough edge (minor cosmetic issue)</li>
            </ul>
            
            <p><strong>Mouse Bites (Tab Routing):</strong></p>
            <ul>
                <li>Series of small drill holes connecting boards</li>
                <li>Break apart by twisting/cutting</li>
                <li>Works for irregular board shapes</li>
                <li>File/sand tabs after separation</li>
            </ul>
            
            <p><strong>Fiducial Marks:</strong></p>
            <ul>
                <li>Copper circles (1mm, 2mm, 3mm) for vision alignment</li>
                <li>Place 2-3 per board (non-collinear)</li>
                <li>Opposite corners of board (max distance apart)</li>
                <li>Keep clear of other copper features (3mm clearance)</li>
            </ul>
            
            <h3>🎨 Solder Mask, Paste Mask, Silkscreen</h3>
            <p><strong>Solder Mask:</strong></p>
            <ul>
                <li>Green (standard), or blue/red/black/white (extra cost)</li>
                <li>Covers copper except at pads (prevents solder bridges)</li>
                <li>Provides electrical insulation</li>
            </ul>
            
            <p><strong>Paste Mask:</strong></p>
            <ul>
                <li>Stencil for applying solder paste (SMD assembly)</li>
                <li>Openings match SMD pads</li>
                <li>Through-hole components: No paste mask openings</li>
            </ul>
            
            <p><strong>Silkscreen:</strong></p>
            <ul>
                <li>White text/graphics on solder mask</li>
                <li><strong>Include:</strong> Reference designators, polarity marks, pin 1 indicators</li>
                <li><strong>Minimum text size:</strong> 1mm height, 0.15mm width (readable)</li>
                <li><strong>Clear of pads:</strong> 0.1-0.2mm clearance (or it disappears)</li>
                <li><strong>Info to add:</strong> Board name, version, date, your logo</li>
            </ul>

            <div class="visual-ref-links">
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=PCB+fiducial+marks+pick+and+place&udm=2')">🎯 See: Fiducials</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=solder+paste+stencil+SMD+PCB+assembly&udm=2')">📋 See: Stencil & Paste</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=IPC-7351+SMD+footprint+pad+toe+heel&udm=2')">📐 See: SMD Footprints</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=PCB+panelization+V-score+tab+routing+manufacturing&udm=2')">🔍 See: Panelization</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=BGA+QFN+reflow+X-ray+inspection+PCB+assembly&udm=2')">📷 See: Assembly & X-Ray</button>
            </div>
        `,
    },
    {
        title: 'Intermediate Projects (Embedded/Robotics Focused)',
        content: `
            <h3>🤖 Project 1: Custom STM32/RP2040 Dev Board</h3>
            <p><strong>Goal:</strong> Design minimal MCU board from scratch, bring up successfully</p>
            
            <p><strong>STM32 Minimal Circuit:</strong></p>
            <ul>
                <li>STM32F103 or STM32F401 (popular, affordable)</li>
                <li>3.3V regulator (AMS1117-3.3 or LDO)</li>
                <li>Decoupling: 100nF per VDD pin + 10µF bulk</li>
                <li>8MHz crystal + 20pF load caps</li>
                <li>Reset: 10kΩ pull-up + button + 100nF cap</li>
                <li>BOOT0: 10kΩ pull-down (run from flash)</li>
                <li>SWD header: SWDIO, SWCLK, GND, 3.3V</li>
                <li>USB connector (if USB-capable variant)</li>
                <li>Status LED + resistor</li>
            </ul>
            
            <p><strong>RP2040 Minimal Circuit:</strong></p>
            <ul>
                <li>RP2040 MCU (56-pin QFN)</li>
                <li>W25Q128 flash (16MB, QSPI interface)</li>
                <li>12MHz crystal + load caps</li>
                <li>3.3V and 1.1V regulators (LDO for core)</li>
                <li>USB connector with ESD protection</li>
                <li>SWD header</li>
                <li>BOOTSEL button (enter bootloader mode)</li>
            </ul>
            
            <p><strong>Bring-Up Process:</strong></p>
            <ol>
                <li>Power on, measure all voltages (DMM)</li>
                <li>Check crystal oscillation (oscilloscope)</li>
                <li>Connect programmer (ST-Link, Picoprobe)</li>
                <li>Flash blink LED firmware</li>
                <li>Celebrate! 🎉</li>
            </ol>
            
            <h3>🚗 Project 2: Dual-Motor Driver with Sensing</h3>
            <p><strong>Features:</strong></p>
            <ul>
                <li>Drive 2× DC motors independently</li>
                <li>PWM speed control input (3.3V or 5V logic)</li>
                <li>Current sensing per motor (analog output)</li>
                <li>Fault output (overtemperature, overcurrent)</li>
            </ul>
            
            <p><strong>Design:</strong></p>
            <ul>
                <li><strong>Motor driver IC:</strong> DRV8871 (2× per board) or L298N</li>
                <li><strong>Power input:</strong> 6-24V, screw terminal</li>
                <li><strong>Current sensing:</strong> 0.1Ω shunt + INA139 per motor</li>
                <li><strong>PWM input:</strong> Headers for IN1, IN2, PWM per motor</li>
                <li><strong>Status LEDs:</strong> Power, fault, direction indicators</li>
                <li><strong>Connectors:</strong> Screw terminals for motors</li>
            </ul>
            
            <p><strong>PCB Considerations:</strong></p>
            <ul>
                <li>Thick power traces (motor current path)</li>
                <li>Heatsinking for motor driver IC (thermal vias, copper pour)</li>
                <li>Keep sensing circuit away from high-current switching</li>
            </ul>
            
            <h3>📡 Project 3: Sensor Fusion Board</h3>
            <p><strong>Components:</strong></p>
            <ul>
                <li><strong>IMU:</strong> MPU6050 or LSM6DS3 (6-DoF: accel + gyro)</li>
                <li><strong>Magnetometer:</strong> QMC5883L (3-axis compass)</li>
                <li><strong>Barometer:</strong> BMP280 (altitude, pressure)</li>
                <li><strong>MCU:</strong> STM32 or ESP32</li>
                <li><strong>Storage:</strong> SPI flash for data logging (W25Q32)</li>
                <li><strong>Communication:</strong> I2C for sensors, SPI for flash, UART/USB for output</li>
            </ul>
            
            <p><strong>Purpose:</strong></p>
            <ul>
                <li>Robot orientation (roll, pitch, yaw)</li>
                <li>Inertial navigation</li>
                <li>Altitude hold (drone, robot climbing)</li>
                <li>Data logging for post-analysis</li>
            </ul>
            
            <p><strong>Layout Tips:</strong></p>
            <ul>
                <li>Decouple all sensor ICs properly (100nF close to VCC)</li>
                <li>I2C pull-ups: 4.7kΩ (multiple sensors on bus)</li>
                <li>Keep sensors away from heat sources, motors, magnets</li>
                <li>Mounting holes for mechanical stability</li>
            </ul>
            
            <h3>🔋 Project 4: Li-Ion Battery Management Board</h3>
            <p><strong>Features:</strong></p>
            <ul>
                <li>Single-cell Li-Ion/LiPo charging (4.2V)</li>
                <li>Overcharge/overdischarge/overcurrent protection</li>
                <li>5V and 3.3V regulated outputs</li>
                <li>Battery level indicator (LEDs or ADC output)</li>
            </ul>
            
            <p><strong>Design:</strong></p>
            <ul>
                <li><strong>Charge IC:</strong> TP4056 (1A, CC/CV)</li>
                <li><strong>Protection:</strong> DW01 + FS8205A MOSFETs</li>
                <li><strong>Boost converter:</strong> 3.7V → 5V (MT3608 or similar)</li>
                <li><strong>LDO:</strong> 5V → 3.3V (AMS1117 or MCP1700)</li>
                <li><strong>Voltage divider:</strong> Monitor battery voltage via ADC</li>
                <li><strong>Connectors:</strong> JST-PH for battery, USB for charging, headers for outputs</li>
            </ul>
            
            <p><strong>Safety:</strong></p>
            <ul>
                <li>Never bypass protection circuit!</li>
                <li>Use proper Li-Ion/LiPo cells (18650, pouch cells)</li>
                <li>Test with current-limited power supply first</li>
            </ul>
            
            <h3>🤖 Project 5: Robot Main Controller Board</h3>
            <p><strong>Integration Project - Combines Everything!</strong></p>
            
            <p><strong>Features:</strong></p>
            <ul>
                <li>MCU (STM32F4 or ESP32)</li>
                <li>Onboard motor drivers (2× channels)</li>
                <li>IMU sensor</li>
                <li>Ultrasonic sensor connectors</li>
                <li>Encoder inputs (quadrature, hardware decoding)</li>
                <li>I2C/SPI/UART headers for expansion</li>
                <li>Battery input + regulation</li>
                <li>Status LEDs, buzzer</li>
            </ul>
            
            <p><strong>Power Architecture:</strong></p>
            <ul>
                <li>Input: 7.4V LiPo (2S) or 11.1V (3S)</li>
                <li>Buck converter: Battery → 5V (motor logic, sensors)</li>
                <li>LDO: 5V → 3.3V (MCU, digital logic)</li>
                <li>Separate motor power path (high current)</li>
            </ul>
            
            <p><strong>Communication:</strong></p>
            <ul>
                <li>USB for programming/debugging</li>
                <li>Bluetooth or Wi-Fi (if ESP32) for wireless control</li>
                <li>CAN bus option for multi-board systems</li>
            </ul>
            
            <p><strong>PCB Layout:</strong></p>
            <ul>
                <li>4-layer board (signal integrity for high-speed)</li>
                <li>Partition: MCU section, power section, motor section</li>
                <li>Test points on all critical signals</li>
                <li>Mounting holes matching robot chassis</li>
            </ul>
            
            <h3>✅ Project Success Tips</h3>
            <ul>
                <li><strong>Start Small:</strong> Test subsystems on breadboard first</li>
                <li><strong>Reference Designs:</strong> Study existing open-source projects</li>
                <li><strong>Version Control:</strong> Git for KiCad files (track changes)</li>
                <li><strong>Test Plan:</strong> Write step-by-step bring-up procedure before boards arrive</li>
                <li><strong>Order Extras:</strong> Get 5-10 boards (practice soldering, backups)</li>
                <li><strong>Rework Budget:</strong> Leave space for bodge wires, cut traces (you will need it!)</li>
                <li><strong>Document:</strong> Photos, notes, schematic annotations during bring-up</li>
            </ul>

            <div class="visual-ref-links">
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=STM32+blue+pill+minimal+custom+PCB&udm=2')">🔍 See: STM32 Boards</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=DRV8871+motor+driver+module+PCB&udm=2')">🚗 See: Motor Driver PCBs</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=IMU+sensor+fusion+PCB+MPU6050+LSM6DS3&udm=2')">📡 See: IMU Sensor Boards</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=TP4056+LiPo+charger+module+PCB&udm=2')">🔋 See: Li-Ion Charger Modules</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=robot+motor+controller+PCB+custom+design&udm=2')">🤖 See: Robot Controllers</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=line+following+robot+PCB+sensor+array&udm=2')">📷 See: Line Followers</button>
            </div>
        `,
    }
]);