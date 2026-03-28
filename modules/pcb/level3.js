i18n.registerContent('en', 'level3', [
    {
        title: 'Advanced Analog & Mixed-Signal Design',
        content: `
            <h3>🎯 Precision Signal Chain Design</h3>
            <p>A signal chain is the path from sensor to ADC. Every stage must be carefully designed to preserve signal integrity.</p>
            <ul>
                <li><strong>Gain Stages:</strong> Amplify the raw sensor signal to fill the ADC input range</li>
                <li><strong>Filtering:</strong> Anti-aliasing LP filter before ADC (f_c &lt; f_sample / 2)</li>
                <li><strong>Noise Budget:</strong> Allocate noise contribution per stage; total noise = √(V_n1² + V_n2² + ...)</li>
                <li><strong>Op-amp selection:</strong> Match input voltage noise (nV/√Hz) and current noise (pA/√Hz) to your impedance level</li>
            </ul>

            <h3>🤫 Low-Noise PCB Layout Rules</h3>
            <p><strong>Analog Island:</strong> Group all analog components in a dedicated zone</p>
            <ul>
                <li>Solid analog ground plane underneath (no digital traces crossing)</li>
                <li>Return currents must stay local to the analog section</li>
                <li>Shield sensitive traces with guard rings tied to quiet ground</li>
                <li>Minimize trace length for high-impedance nodes (pick-up antennas)</li>
            </ul>

            <p><strong>Quiet Ground Strategy:</strong></p>
            <ul>
                <li>Use a single continuous ground plane — never split it arbitrarily</li>
                <li>Place the analog-to-digital ground join at a single point (star ground)</li>
                <li>Ferrite bead between AGND and DGND to block HF noise coupling</li>
            </ul>

            <h3>⚡ Current Sensing Techniques</h3>
            <p><strong>Shunt Resistor + INA:</strong> Most common in robotics</p>
            <ul>
                <li>Low-side shunt: Simple, but ground is shifted (OK for non-isolated)</li>
                <li>High-side shunt: Use INA (INA219, INA226) for current + power measurement</li>
                <li>Shunt value: Pick R so full-scale current → ~100mV differential (balance accuracy vs power loss)</li>
                <li>Kelvin sensing: Route sense traces from shunt pad edges, not from vias, to avoid trace resistance errors</li>
            </ul>

            <p><strong>Hall-Effect Current Sensors:</strong></p>
            <ul>
                <li>ACS712, ACS758 — integrated Hall sensor + conditioning</li>
                <li>Galvanically isolated: PCB current rail passes through sensor body</li>
                <li>Use when isolation from high-voltage rail is needed</li>
                <li>Sensitivity: 66–185 mV/A depending on variant</li>
            </ul>

            <h3>🤖 Motor Feedback Hardware</h3>
            <p><strong>Quadrature Encoder Input:</strong></p>
            <ul>
                <li>A/B channels 90° apart → direction and position</li>
                <li>Use 10nF + 1kΩ RC debounce on each channel</li>
                <li>LVTTL output → use hardware timer in encoder mode (STM32 TIM_EncoderMode)</li>
                <li>For long cables: RS-422 differential (26LS31 driver + 26LS32 receiver)</li>
            </ul>

            <p><strong>Mixed-Signal PCB Partitioning:</strong></p>
            <ul>
                <li>Three domains: analog (sensors), digital (MCU), and power (motor/supply)</li>
                <li>Place domains in separate zones; route connections across zone boundaries carefully</li>
                <li>Power domain: thick traces, copper pours, away from sensitive analog</li>
                <li>Analog domain: no digital clocks crossing underneath</li>
            </ul>

            <div class="visual-ref-links">
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=precision+signal+chain+sensor+ADC+diagram&udm=2')">🔍 See: Signal Chain Design</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=Kelvin+4+wire+sense+shunt+resistor+layout&udm=2')">📐 See: Kelvin Sensing</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=sigma+delta+ADC+noise+oversampling+diagram&udm=2')">📊 See: Delta-Sigma ADC</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=ACS712+hall+effect+current+sensor+module+PCB&udm=2')">📷 See: Current Sensors</button>
            </div>
        `,
        keyPoints: ['Design full precision signal chains', 'Apply low-noise analog layout rules', 'Implement high-side current sensing']
    },
    {
        title: 'Signal Integrity (SI) for Embedded',
        content: `
            <h3>📡 When Trace Length Matters</h3>
            <p><strong>Rule of Thumb:</strong> Treat trace as transmission line when length &gt; λ/10</p>
            <ul>
                <li>Signal edge rate (not frequency) determines when SI matters</li>
                <li>For a 1ns rise time: critical length ≈ 15mm (in FR-4, ε_r ≈ 4)</li>
                <li>Formula: λ = c / (f × √ε_r), critical length = λ / 10</li>
                <li>USB HS (480Mbps), QSPI (80MHz+), SDIO — all require SI attention</li>
            </ul>

            <h3>📏 Controlled Impedance</h3>
            <p><strong>Microstrip (outer layer):</strong> Trace on surface over ground plane</p>
            <ul>
                <li>Z₀ ≈ 50Ω (single-ended) or 100Ω (differential) typical targets</li>
                <li>Z₀ depends on: trace width (W), dielectric height (H), copper thickness (T)</li>
                <li>Narrower trace → higher impedance; thicker dielectric → higher impedance</li>
                <li>Use PCB impedance calculators (Saturn PCB, Altium, fab's online tool)</li>
            </ul>

            <p><strong>Stripline (inner layers):</strong> Trace buried between two ground planes</p>
            <ul>
                <li>Better EMI shielding than microstrip</li>
                <li>Use for RF, GHz signals, differential pairs on inner layers</li>
                <li>Requires symmetric stackup to maintain impedance</li>
            </ul>

            <p><strong>Specifying to the fab:</strong></p>
            <ul>
                <li>Add a controlled-impedance note in fab notes: "Layer 1: 50Ω ±10% microstrip, W=0.2mm"</li>
                <li>Provide stackup table with dielectric constants and prepreg thickness</li>
                <li>JLC, PCBWay offer impedance-controlled service — use their stack calculator</li>
            </ul>

            <h3>🔀 Differential Pair Routing</h3>
            <p>Used for: USB, CAN, RS-485, LVDS, Ethernet, HDMI</p>
            <ul>
                <li><strong>Length Matching:</strong> Keep P and N traces within 0.1mm of each other</li>
                <li><strong>Coupling:</strong> Route pair tightly together (gap = 2× trace width)</li>
                <li><strong>Common-Mode Rejection:</strong> Any length mismatch becomes a noise-to-signal converter</li>
                <li><strong>Avoid:</strong> Routing one trace through a via without the other (break symmetry)</li>
                <li><strong>KiCad:</strong> Use differential pair router (Ctrl+5), set gap and width in interactive router settings</li>
            </ul>

            <h3>🔌 High-Speed Interface Layout Rules</h3>
            <p><strong>USB Full-Speed / High-Speed (D+ / D−):</strong></p>
            <ul>
                <li>90Ω differential impedance</li>
                <li>Keep pairs matched to ≤0.1mm, avoid 90° bends (use 45° or curved)</li>
                <li>Place ESD protection (TPD2E2U06, PRTR5V0U2X) close to the connector</li>
                <li>No vias on differential pairs for FS; minimal vias for HS</li>
            </ul>

            <p><strong>QSPI Flash:</strong></p>
            <ul>
                <li>Length-match all 4 data lines + CLK + CS within 2mm</li>
                <li>Keep traces short, direct, over unbroken ground</li>
            </ul>

            <p><strong>RMII Ethernet:</strong></p>
            <ul>
                <li>50MHz reference clock: route as a clean, short trace with ground guard</li>
                <li>Use Ethernet magnetics (transformer + common-mode choke) per PHY datasheet</li>
            </ul>

            <h3>⚠️ SI Issues & Fixes</h3>
            <table style="width:100%; border-collapse:collapse; font-size:0.95em; margin-top:8px;">
                <tr style="background:#1e293b"><th style="padding:6px; border:1px solid #334155">Problem</th><th style="padding:6px; border:1px solid #334155">Cause</th><th style="padding:6px; border:1px solid #334155">Fix</th></tr>
                <tr><td style="padding:5px; border:1px solid #334155">Reflections</td><td style="padding:5px; border:1px solid #334155">Impedance mismatch at end of line</td><td style="padding:5px; border:1px solid #334155">Series termination resistor (33–50Ω) at source</td></tr>
                <tr><td style="padding:5px; border:1px solid #334155">Ringing</td><td style="padding:5px; border:1px solid #334155">Unterminated stub or via resonance</td><td style="padding:5px; border:1px solid #334155">Remove stubs, back-drill vias</td></tr>
                <tr><td style="padding:5px; border:1px solid #334155">Crosstalk</td><td style="padding:5px; border:1px solid #334155">Parallel traces too close</td><td style="padding:5px; border:1px solid #334155">3W rule: space = 3× trace width</td></tr>
                <tr><td style="padding:5px; border:1px solid #334155">Ground bounce</td><td style="padding:5px; border:1px solid #334155">Inductance in power/ground path</td><td style="padding:5px; border:1px solid #334155">Decouple per IC, shorten return paths</td></tr>
            </table>

            <div class="visual-ref-links">
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=transmission+line+impedance+matching+reflection+diagram&udm=2')">🔍 See: Transmission Lines</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=eye+diagram+jitter+signal+integrity+oscilloscope&udm=2')">👁️ See: Eye Diagrams</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=PCB+crosstalk+3W+rule+parallel+traces&udm=2')">〰️ See: Crosstalk & Spacing</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=controlled+impedance+PCB+trace+microstrip+stripline&udm=2')">📷 See: Impedance Control</button>
            </div>
        `,
        keyPoints: ['Apply transmission line rules to high-speed traces', 'Route and specify controlled impedance', 'Fix reflections, crosstalk, ringing in layout']
    },
    {
        title: 'Power Integrity & Advanced Power Design',
        content: `
            <h3>🏗️ PDN — Power Distribution Network</h3>
            <p>The PDN is everything between the voltage source and each IC's power pin. The goal is <strong>low impedance across all frequencies</strong>.</p>
            <ul>
                <li><strong>DC resistance:</strong> Thick traces and copper pours → low voltage drop under load</li>
                <li><strong>Mid-frequency (1kHz–100MHz):</strong> Bulk and ceramic capacitors provide charge reservoir</li>
                <li><strong>High-frequency (&gt;100MHz):</strong> On-die capacitors and tight PCB decoupling</li>
                <li><strong>Target PDN impedance:</strong> Z_target = ΔV / ΔI (e.g., for 10mV ripple at 1A transient → 10mΩ)</li>
            </ul>

            <h3>🔋 Decoupling Strategy by Frequency</h3>
            <p><strong>Tier 1: Bulk Electrolytic (1–100µF)</strong></p>
            <ul>
                <li>Handles slow transients (motor start, processor wake-up)</li>
                <li>Place at power entry point to board</li>
                <li>Aluminum or tantalum; low ESR preferred</li>
            </ul>

            <p><strong>Tier 2: MLCC Ceramic (100nF–10µF)</strong></p>
            <ul>
                <li>Decouples mid-frequency switching noise</li>
                <li>Place &lt;2mm from each IC's VCC pin</li>
                <li>Use X5R/X7R dielectric (stable vs. temperature)</li>
                <li>0402 or 0603; smaller = lower inductance = better HF performance</li>
            </ul>

            <p><strong>Tier 3: Small Ceramic (10–100nF)</strong></p>
            <ul>
                <li>Handle GHz switching in fast digital ICs</li>
                <li>Place directly adjacent to power pin, minimal trace length</li>
                <li>Via directly from capacitor pad to ground plane</li>
            </ul>

            <h3>⏱️ Power Sequencing</h3>
            <p>Many systems (MCU + FPGA + peripherals) require rails to come up in a specific order</p>
            <ul>
                <li><strong>Why it matters:</strong> Latch-up, data corruption, or component damage from wrong sequence</li>
                <li><strong>FPGA example:</strong> VCCINT first, then VCCIO, then config pins</li>
                <li><strong>STM32 + 1.8V SDRAM:</strong> 3.3V first, then 1.8V</li>
                <li><strong>Implementation:</strong> Enable pin on DC-DC converter → delayed RC + comparator, or dedicated sequencer IC (TPS3702, UCD90xxx)</li>
                <li><strong>Power-good signals:</strong> Use PGOOD outputs of regulators to gate subsequent rails</li>
            </ul>

            <h3>🤖 High-Current Motor Power Stages</h3>
            <p><strong>Gate Drive Design:</strong></p>
            <ul>
                <li>Gate resistor R_g: controls switching speed (lower = faster switching, more EMI; higher = slower, less EMI)</li>
                <li>Gate driver IC (DRV8300, IR2104): provides high/low side bootstrap, shoot-through prevention</li>
                <li><strong>Deadtime:</strong> Short gap between high-side off and low-side on; prevents shoot-through (crowbar)</li>
                <li>Typical deadtime: 50–200ns depending on MOSFET characteristics</li>
            </ul>

            <p><strong>PCB Layout for Power Stages:</strong></p>
            <ul>
                <li>Minimize switching loop area: battery → high-side FET → load → low-side FET → battery</li>
                <li>Place bulk cap directly across VCC-GND of the half-bridge (within 5mm)</li>
                <li>Kelvin connection for gate driver ground (separate return from power ground)</li>
                <li>Thermal vias under power FETs: 0.3mm diameter, 1.2mm pitch, exposed pad to copper pour</li>
            </ul>

            <h3>🌡️ Thermal Design on PCB</h3>
            <p><strong>Calculations:</strong></p>
            <ul>
                <li>T_junction = T_ambient + P_dissipated × (θ_JC + θ_CS + θ_SA)</li>
                <li>θ_JC: junction-to-case (from datasheet)</li>
                <li>θ_CS: case-to-heatsink (TIM compound)</li>
                <li>θ_SA: heatsink-to-ambient (from heatsink datasheet)</li>
            </ul>

            <p><strong>PCB Heatsinking:</strong></p>
            <ul>
                <li>Exposed pad (EP) components: place 9–16 thermal vias 0.3mm dia under pad</li>
                <li>Copper pour on bottom layer tied to EP to spread heat</li>
                <li>2 oz copper on power layers reduces thermal resistance significantly</li>
                <li>Use KiCad thermal via generator plugin or add manually</li>
            </ul>

            <div class="visual-ref-links">
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=power+delivery+network+PDN+impedance+decoupling+capacitor+PCB&udm=2')">🔍 See: PDN Design</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=MLCC+capacitor+ESR+ESL+SRF+impedance+curve&udm=2')">📊 See: Capacitor Impedance</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=via+inductance+power+plane+PCB+simulation&udm=2')">🔌 See: Via Inductance</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=buck+converter+PCB+layout+switching+regulator+thermal&udm=2')">📷 See: Switching Layouts</button>
            </div>
        `,
        keyPoints: ['Design low-impedance PDNs', 'Implement multi-tier decoupling strategy', 'Calculate thermal budgets for power components']
    },
    {
        title: 'FPGA & SoC Hardware Design',
        content: `
            <h3>🔷 FPGA Minimum-Viable Hardware Circuit</h3>
            <p><strong>Power Rails (Xilinx Artix-7 / Lattice ECP5 example):</strong></p>
            <ul>
                <li>VCCINT: Core voltage (1.0–1.2V) — most critical, lowest noise tolerance</li>
                <li>VCCIO (per bank): I/O voltage (1.8V, 2.5V, or 3.3V depending on bank/standard)</li>
                <li>VCCO_DDR: 1.35V or 1.5V for DDR interfaces</li>
                <li>AVCC / VCCAUX: Analog supply for PLLs (typically 1.8V), must be very clean</li>
            </ul>

            <p><strong>Configuration Flash:</strong></p>
            <ul>
                <li>SPI NOR Flash stores bitstream (W25Q16, S25FL064P)</li>
                <li>Connect to FPGA CCLK, DIN, DOUT, CSn pins</li>
                <li>JTAG chain: FPGA TDI → TDO → debug header</li>
                <li>DONE pin: signals successful configuration; drive LED for visual confirmation</li>
            </ul>

            <h3>🏦 Bank Power & I/O Standard Matching</h3>
            <p>Each I/O bank must be powered at the correct VCCIO to match its I/O standard:</p>
            <ul>
                <li>LVCMOS33: VCCIO = 3.3V</li>
                <li>LVCMOS18: VCCIO = 1.8V</li>
                <li>SSTL15 (DDR3): VCCIO = 1.5V, VREF = VCCIO/2</li>
                <li>LVDS: VCCIO = 2.5V, no VREF needed</li>
                <li><strong>Critical rule:</strong> All signals in a bank must use compatible I/O standards</li>
            </ul>

            <h3>💾 DDR Memory Routing</h3>
            <p><strong>Address/Command Bus:</strong></p>
            <ul>
                <li>Fly-by topology: daisy-chain from controller through each DRAM, single termination at end</li>
                <li>All address lines length-matched within ±25mil of each other</li>
                <li>Series termination at source (22–33Ω)</li>
            </ul>

            <p><strong>Data Bus (per byte lane):</strong></p>
            <ul>
                <li>Match DQ lines within ±10mil of DQS (data strobe) for that byte lane</li>
                <li>Differential DQS pair: 100Ω impedance, 5mm max intra-pair skew</li>
                <li>Use reference planes on adjacent layers to control impedance</li>
            </ul>

            <p><strong>Layout Essentials:</strong></p>
            <ul>
                <li>Place DRAM as close as possible to FPGA/SoC to minimize stub lengths</li>
                <li>Dedicated ground plane directly beneath all DDR signals</li>
                <li>Decouple every DRAM power pin with 100nF directly on the pin</li>
            </ul>

            <h3>📸 High-Speed Serial (LVDS/SERDES)</h3>
            <p>Used for: camera (MIPI, sub-LVDS), PCIe, multi-Gbit sensor links</p>
            <ul>
                <li><strong>LVDS differential pairs:</strong> 100Ω impedance, tightly coupled</li>
                <li>Length-match within byte lanes (intra-pair skew &lt; 5mil)</li>
                <li>Inter-lane skew: less critical, compensated by word-alignment in SERDES</li>
                <li>AC coupling capacitors (100nF) between source and receiver per lane</li>
                <li>Reference clock: lowest jitter possible, route as controlled impedance with solid ground reference</li>
            </ul>

            <h3>💡 SoC Carrier Board Design Tips</h3>
            <p>Designing for compute modules (iMX8, AM335x, CM4):</p>
            <ul>
                <li>Use module connector pinout as the law — never modify it</li>
                <li>Board-to-board connectors: Hirose DF40, Samtec BTE series</li>
                <li>Provide all required power rails; check module power sequence requirements</li>
                <li>USB, Ethernet, HDMI: route per SI rules (impedance-controlled, matched pairs)</li>
                <li>Debug: Always bring out UART console, JTAG, eMMC boot switch</li>
            </ul>

            <div class="visual-ref-links">
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=FPGA+SoC+PCB+design+BGA+fanout+DDR+routing&udm=2')">🔍 See: FPGA/SoC Boards</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=BGA+fanout+via+in+pad+dogbone+PCB&udm=2')">🧩 See: BGA Fanout</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=PCIe+differential+pair+routing+PCB+layout&udm=2')">🔌 See: PCIe Routing</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=DDR4+memory+length+matching+serpentine+routing+PCB&udm=2')">📷 See: DDR Routing</button>
            </div>
        `,
        keyPoints: ['Design FPGA minimum-viable circuits', 'Route DDR memory with length matching', 'Specify I/O bank voltages correctly']
    },
    {
        title: 'Advanced PCB Stackups & Materials',
        content: `
            <h3>📚 Stackup Design for Controlled Impedance</h3>
            <p>Stackup = layer arrangement, dielectric materials, and copper weights</p>
            
            <p><strong>Standard 4-Layer (Signal – GND – PWR – Signal):</strong></p>
            <ul>
                <li>L1: Top signal (components + routing)</li>
                <li>L2: Ground plane (reference for L1 and L3)</li>
                <li>L3: Power plane (quiet, low-impedance power distribution)</li>
                <li>L4: Bottom signal (secondary routing)</li>
                <li>Core (L2–L3): 1.2mm; prepreg (L1–L2, L3–L4): 0.2mm typical</li>
            </ul>

            <p><strong>6-Layer (for complex MCU/FPGA boards):</strong></p>
            <ul>
                <li>L1: Top signal | L2: GND | L3: Signal | L4: Signal | L5: GND | L6: Bottom signal</li>
                <li>Two ground planes provide better shielding and cleaner impedance reference</li>
                <li>Use for boards with DDR, USB HS, CAN + analog mixed</li>
            </ul>

            <h3>🧪 Material Selection</h3>
            <table style="width:100%; border-collapse:collapse; font-size:0.9em; margin-top:8px;">
                <tr style="background:#1e293b"><th style="padding:6px; border:1px solid #334155">Material</th><th style="padding:6px; border:1px solid #334155">Dk (ε_r)</th><th style="padding:6px; border:1px solid #334155">Df (loss tangent)</th><th style="padding:6px; border:1px solid #334155">Use Case</th></tr>
                <tr><td style="padding:5px; border:1px solid #334155">FR-4 (standard)</td><td style="padding:5px; border:1px solid #334155">4.0–4.8</td><td style="padding:5px; border:1px solid #334155">0.02</td><td style="padding:5px; border:1px solid #334155">Most embedded/robotics boards</td></tr>
                <tr><td style="padding:5px; border:1px solid #334155">FR-4 (high-speed)</td><td style="padding:5px; border:1px solid #334155">3.9–4.2</td><td style="padding:5px; border:1px solid #334155">0.012</td><td style="padding:5px; border:1px solid #334155">USB HS, GbE, PCIe Gen 1</td></tr>
                <tr><td style="padding:5px; border:1px solid #334155">Rogers 4003C</td><td style="padding:5px; border:1px solid #334155">3.55</td><td style="padding:5px; border:1px solid #334155">0.0027</td><td style="padding:5px; border:1px solid #334155">RF, microwave (&gt;1GHz)</td></tr>
                <tr><td style="padding:5px; border:1px solid #334155">Isola I-Speed</td><td style="padding:5px; border:1px solid #334155">3.62</td><td style="padding:5px; border:1px solid #334155">0.007</td><td style="padding:5px; border:1px solid #334155">PCIe Gen 2/3, 10GbE</td></tr>
            </table>

            <h3>🔬 HDI — High-Density Interconnect</h3>
            <p>Required for BGA packages with tight pitch (&lt;0.8mm): SoC, DDR ICs, FPGAs</p>
            <ul>
                <li><strong>Microvias:</strong> Laser-drilled, ≤0.1mm diameter, 1 layer depth only</li>
                <li><strong>Via-in-pad:</strong> Microvia placed directly on BGA pad — enables fan-out without trace escape</li>
                <li><strong>Stacked microvias:</strong> Multiple layers (costly, requires careful thermal management)</li>
                <li><strong>Cost:</strong> HDI boards are 2–5× more expensive than standard; use only when needed</li>
                <li><strong>Alternative:</strong> For 0.8mm BGA pitch, standard 0.2mm vias can fan out with careful layout</li>
            </ul>

            <h3>🪛 Copper Weights</h3>
            <ul>
                <li><strong>0.5 oz (17µm):</strong> Fine-pitch routing, small signals</li>
                <li><strong>1 oz (35µm):</strong> Standard — use for most signal and moderate power layers</li>
                <li><strong>2 oz (70µm):</strong> Power layers carrying &gt;3A; reduces trace width needed and improves thermal</li>
                <li>Heavier copper affects etching precision — min trace/space increases</li>
            </ul>

            <h3>🦾 Flex & Rigid-Flex PCBs</h3>
            <p>Relevant in compact robotics (drone IMU boards, joint sensor ribbons)</p>
            <ul>
                <li><strong>Flex (PI substrate):</strong> Kapton polyimide, 0.05–0.1mm thick dielectric</li>
                <li><strong>Rigid-Flex:</strong> Flex layers sandwiched between rigid FR-4 cores</li>
                <li>Trace routing in bend area: perpendicular to bend axis, generous bend radius (&gt;10× flex thickness)</li>
                <li>No vias in flex bend zone</li>
                <li>Design rule: Keep stub-free connectors; FPC connectors (0.5mm/1.0mm pitch) are typical</li>
            </ul>

            <h3>📐 Worked Example: 50Ω Microstrip Impedance Calculation</h3>
            <p><strong>Given:</strong> FR-4 standard, Dk = 4.3, prepreg thickness = 0.2mm (8 mil), 1oz copper (35µm)</p>
            <p><strong>Target:</strong> 50Ω single-ended microstrip on Layer 1 referenced to Layer 2 (GND)</p>
            <p><strong>Using the approximation:</strong> Z₀ ≈ (87 / √(ε_r + 1.41)) × ln(5.98 × h / (0.8 × w + t))</p>
            <ul>
                <li>h = 0.2mm (dielectric height), t = 0.035mm (copper thickness), ε_r = 4.3</li>
                <li>Solving for w: trace width ≈ 0.30mm (12 mil) gives Z₀ ≈ 50Ω</li>
                <li><strong>Always verify with your fab's impedance calculator</strong> — they know their exact materials and process</li>
                <li>For differential 100Ω: two 50Ω traces with spacing ≈ width (e.g., 0.30mm trace, 0.30mm gap)</li>
            </ul>
            <p><strong>Key lesson:</strong> impedance depends on trace width, dielectric height, Dk, and copper weight — change any one and you must recalculate.</p>
        `,
        keyPoints: ['Calculate microstrip impedance from stackup geometry and Dk', 'Select materials based on frequency and loss tangent', 'Design HDI fan-out for fine-pitch BGAs, apply flex-PCB bend rules'],
        relatedTopics: [{ level: 'level3', index: 1, label: 'Signal Integrity for Embedded' }, { level: 'level3', index: 5, label: 'EMC/EMI Design' }],
        resources: [{ title: 'JLCPCB Impedance Calculator', url: 'https://jlcpcb.com/pcb-impedance-calculator' }, { title: 'IPC-2141 Controlled Impedance Standard', url: 'https://www.ipc.org/ipc-2141' }]
    },
    {
        title: 'EMC/EMI Design for Embedded & Robotics',
        content: `
            <h3>🧠 EMC-First Design Mindset</h3>
            <p>EMC must be designed in from the start — it cannot be fixed by adding ferrites after the fact.</p>
            <ul>
                <li><strong>Three pillars:</strong> Filtering (suppress noise at source), Shielding (block radiation), Layout (minimize current loops)</li>
                <li><strong>Radiated emissions:</strong> Your PCB becomes an antenna for any high-frequency current loop</li>
                <li><strong>Conducted emissions:</strong> Noise riding on power lines reaching other boards</li>
            </ul>

            <h3>🔁 Common-Mode vs. Differential-Mode Noise</h3>
            <p><strong>Differential-Mode (DM):</strong> Current flows out on one wire, returns on the other</p>
            <ul>
                <li>Source: switching regulators, clock lines</li>
                <li>Filter: Differential inductor (common mode choke filters CM, passes DM) — or series inductor + cap</li>
            </ul>

            <p><strong>Common-Mode (CM):</strong> Current flows out on both wires and returns via chassis/ground</p>
            <ul>
                <li>Source: ground loops, parasitic capacitance to chassis in motor drives</li>
                <li>Filter: Common-mode choke (both wires wound in same direction through core)</li>
                <li>Popular: TDK ACM series, Würth WE-CMB</li>
            </ul>

            <p><strong>Ferrite Beads:</strong></p>
            <ul>
                <li>High impedance at HF, low impedance at DC/LF</li>
                <li>Choose based on impedance at target frequency (e.g., 600Ω @ 100MHz)</li>
                <li>Rated by DC current; don't exceed rating (saturation = loss of effectiveness)</li>
                <li>Use between AGND and DGND, or on MCU power pins</li>
            </ul>

            <h3>🤖 Motor EMI Suppression</h3>
            <p>PWM motor drives are major EMI sources — fast switching creates rich harmonic spectra</p>
            <ul>
                <li><strong>Gate resistors:</strong> Slow switching edges → reduce dV/dt → less EMI (at cost of switching losses)</li>
                <li><strong>Snubber across motor:</strong> RC snubber (10Ω + 100nF) damps voltage spikes</li>
                <li><strong>Chassis ground:</strong> Motor body and enclosure grounded via low-impedance strap</li>
                <li><strong>Shielded motor cables:</strong> Shield grounded at one end (drive end) — prevents antenna effect</li>
                <li><strong>EMI filter on power input:</strong> Common-mode choke + X/Y capacitors before PWM stage</li>
            </ul>

            <h3>📻 Reducing Radiated Emissions</h3>
            <ul>
                <li><strong>Return path continuity:</strong> Signal current must return adjacent to forward path; use ground plane</li>
                <li><strong>Avoid ground plane splits:</strong> Any gap forces return current to detour → large loop → strong radiation</li>
                <li><strong>Stitching vias:</strong> Connect top and bottom ground pours every 1/20 wavelength</li>
                <li><strong>Clock traces:</strong> Route over solid ground, away from board edges, terminate properly</li>
                <li><strong>Spread-spectrum clocking:</strong> Spreads energy over frequency range (reduces peak emissions)</li>
            </ul>

            <h3>🛡️ ESD Protection at All I/O</h3>
            <ul>
                <li><strong>TVS Diodes:</strong> Clamp fast transients; choose V_clamp below device abs-max</li>
                <li>Bidirectional TVS for data lines, unidirectional for power rails</li>
                <li>Place within 1–2mm of connector pad, before any series resistor</li>
                <li><strong>ESD Arrays:</strong> PRTR5V0U2X (2-ch), ESDA6V1W6 (6-ch) for multi-pin connectors</li>
                <li>Layout: ESD component has a direct, low-inductance path to ground — short wide trace to ground via</li>
                <li><strong>IEC 61000-4-2 levels:</strong> Contact ±4kV, Air ±8kV — ensure device ratings cover these</li>
            </ul>

            <div class="visual-ref-links">
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=EMC+EMI+shielding+ferrite+bead+common+mode+choke+PCB&udm=2')">🔍 See: EMC/EMI Components</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=spread+spectrum+clocking+EMI+reduction+diagram&udm=2')">📡 See: Spread-Spectrum Clock</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=near+field+EMI+probe+PCB+debugging&udm=2')">🔎 See: Near-Field Probes</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=EMC+test+anechoic+chamber+radiated+emissions&udm=2')">📷 See: EMC Testing</button>
            </div>
        `,
        keyPoints: ['Design with EMC mindset from start', 'Filter and suppress motor PWM emissions', 'Place ESD protection at all connectors']
    },
    {
        title: 'PCB Standards Relevant to Embedded & Robotics',
        content: `
            <h3>📖 IPC-2221: Generic PCB Design Standard</h3>
            <p>The foundational PCB design reference — required reading for professional designers.</p>
            <ul>
                <li>Covers: design rules, trace widths, creepage/clearance for voltage isolation, spacing tables</li>
                <li><strong>Clearance:</strong> Minimum distance between conductors of different nets (voltage-dependent)</li>
                <li><strong>Creepage:</strong> Distance along surface; more critical in humid/contaminated environments</li>
                <li>Defines: drill-to-copper, board edge clearance, annular ring minimums</li>
                <li>Use IPC-2221 tables when designing boards &gt;50V or for any safety-relevant application</li>
            </ul>

            <h3>⚡ IPC-2152: Current-Carrying Capacity</h3>
            <p>Determines safe trace width for a given current and temperature rise</p>
            <ul>
                <li>Inputs: current (A), copper weight (oz), acceptable temperature rise (ΔT, typically 10–20°C)</li>
                <li>Provides two charts: external traces (cooled by air) and internal traces (less cooling)</li>
                <li>Rule of thumb: 1oz, 1mm wide trace → ~1A internal / ~2A external at 10°C rise</li>
                <li>Use online calculator (Saturn PCB Toolkit, IPC-2152 calculator)</li>
                <li><strong>For motor power traces:</strong> Always add margin — 3A trace for 2A max current</li>
            </ul>

            <h3>🔲 IPC-7351: Land Pattern Design</h3>
            <p>Standard for SMD component pad (land pattern / footprint) dimensions</p>
            <ul>
                <li>Three density levels: A (maximum — for rework), B (nominal — most common), C (minimum — dense boards)</li>
                <li>Pad toe, heel, and side extensions relative to component lead dimensions</li>
                <li>Use IPC Compliant Footprint Wizard or KiCad's built-in footprint calculator</li>
                <li>Correct footprints = good solder joints = fewer assembly failures</li>
            </ul>

            <h3>🔍 IPC-A-610: Acceptability of Solder Assemblies</h3>
            <p>The standard for inspecting assembled boards — used by assemblers and quality teams</p>
            <ul>
                <li>Three classes: Class 1 (general electronics), Class 2 (dedicated service — most products), Class 3 (high reliability — medical, military)</li>
                <li>Defines acceptable: solder fillet shape, wetting, bridging, cold joints, tombstoning</li>
                <li>Useful when reviewing assembly quality from contract manufacturers</li>
                <li>Learn the key defect photos — helps you write better assembly notes and inspect your boards</li>
            </ul>

            <h3>🏭 ISO 26262 / IEC 61508 — Functional Safety Overview</h3>
            <p>Relevant when robots operate around humans or in safety-critical environments</p>
            <ul>
                <li><strong>IEC 61508:</strong> Generic functional safety for E/E/PE systems → defines SIL 1–4</li>
                <li><strong>ISO 26262:</strong> Automotive adaptation → defines ASIL A–D (Automotive Safety Integrity Level)</li>
                <li><strong>Hardware requirements:</strong> Redundant power supplies, watchdog circuits, diagnostic coverage, safe state design</li>
                <li><strong>FMEA (Failure Mode and Effects Analysis):</strong> Systematic analysis of what fails and what happens</li>
                <li>At this level: understand the concepts and vocabulary — full certification is a specialization track</li>
            </ul>

            <h3>🌍 CE / FCC / UL (Concept Level)</h3>
            <ul>
                <li><strong>CE (Europe):</strong> Mandatory for products sold in EU — covers EMC (EN 55032), LV Directive, RoHS</li>
                <li><strong>FCC (USA):</strong> Part 15 for unintentional radiators (Class A industrial, Class B consumer)</li>
                <li><strong>UL:</strong> Safety certification, required for some US markets</li>
                <li>EMC pre-compliance testing: Use near-field probe + spectrum analyzer to find hotspots before formal testing</li>
                <li>Designing for compliance from the start saves expensive re-spins</li>
            </ul>

            <div class="visual-ref-links">
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=IPC+class+2+class+3+PCB+inspection+standards&udm=2')">🔍 See: IPC Standards</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=IPC-2152+trace+width+current+chart&udm=2')">📐 See: IPC-2152 Traces</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=UL+IEC+60950+clearance+creepage+table+PCB&udm=2')">⚡ See: Safety Spacing</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=creepage+clearance+distance+PCB+high+voltage+isolation&udm=2')">📷 See: Creepage & Clearance</button>
            </div>
        `,
        keyPoints: ['Apply IPC-2221 clearance rules for voltage isolation', 'Size traces with IPC-2152 current tables', 'Understand functional safety concepts (ISO 26262)']
    },
    {
        title: 'Testing, Bring-Up, and Debugging',
        content: `
            <h3>🚦 Staged Bring-Up Methodology</h3>
            <p>Never power on a new board and connect everything at once. Use a staged approach:</p>
            <ol>
                <li><strong>Stage 1 — Visual inspection:</strong> Check for solder bridges, missing parts, wrong orientation. Use a magnifier or USB microscope.</li>
                <li><strong>Stage 2 — Power supply check (no load):</strong> Bench PSU current-limited to ~50mA. Measure all rails. Verify no shorts before applying full current.</li>
                <li><strong>Stage 3 — Clock check:</strong> Probe oscillator output on scope. Verify MCU/FPGA clock is present and at correct frequency.</li>
                <li><strong>Stage 4 — MCU boot:</strong> Connect SWD/JTAG. Try to connect with debugger. Flash a minimal blink firmware.</li>
                <li><strong>Stage 5 — Peripherals one by one:</strong> Test each interface (UART, SPI, I2C) independently. Add power to motor stage only after logic is verified.</li>
            </ol>

            <h3>📍 Test Points — Placement Strategy</h3>
            <ul>
                <li>Place a test point (TP) on every power rail: VIN, 5V, 3.3V, 1.8V, VBAT</li>
                <li>Place TPs on: reset line, boot/mode pins, SWD CLK/DIO, UART TX/RX</li>
                <li>Place TPs on: every I2C/SPI bus, encoder inputs, PWM outputs</li>
                <li><strong>Standard:</strong> 1mm round pad, labeled in silkscreen</li>
                <li>TPs are for logic analyzer clips and scope probes — don't omit them to save space</li>
            </ul>

            <h3>🔌 SWD/JTAG Bring-Up on Custom Boards</h3>
            <ul>
                <li><strong>STM32:</strong> SWDIO, SWDCLK, GND, 3.3V → 4-pin header (+ optional nRST)</li>
                <li><strong>RP2040:</strong> SWDIO, SWDCLK, GND — no dedicated JTAG, SWD-only</li>
                <li>Verify VCC of debugger matches board voltage (many ST-Link/J-Link adapt automatically)</li>
                <li>BOOT pin state during reset determines if ROM bootloader or SWD is active</li>
                <li>If SWD fails: check reset line, check boot pin, check target power, check debug connector pinout against schematic</li>
            </ul>

            <h3>📊 Using Oscilloscope & Logic Analyzer</h3>
            <p><strong>Oscilloscope — What to check:</strong></p>
            <ul>
                <li>Power rail ripple: probe VCC with ground clip short (long ground lead adds inductance)</li>
                <li>Clock waveform: check frequency, duty cycle, rise/fall times</li>
                <li>SPI/UART waveforms: decode with scope trigger on CS or start bit</li>
                <li>PWM signals: verify duty cycle and frequency match firmware settings</li>
            </ul>

            <p><strong>Logic Analyzer — What to check:</strong></p>
            <ul>
                <li>I2C: address, ACK/NAK, data bytes — catch missing pull-ups (no ACK)</li>
                <li>SPI: verify MOSI/MISO/CLK/CS relationships — catch phase/polarity mismatches</li>
                <li>UART: check baud rate, start/stop bits — common issue: 115200 vs 9600 mismatch</li>
                <li>Use PulseView (open-source) or Saleae Logic — both decode protocols automatically</li>
            </ul>

            <h3>🤖 Motor Drive Bring-Up</h3>
            <ul>
                <li><strong>Current-limit PSU to 0.5A initially</strong> — catches wiring errors before smoke</li>
                <li>Verify gate signals with scope before enabling high-side: check timing, deadtime, duty cycle</li>
                <li>Back-EMF waveform: spinning motor should show clean sine/trapezoid on phase terminals</li>
                <li>Current waveform on scope: should follow PWM duty cycle; saturation or spikes indicate driver issue</li>
                <li>Thermal monitoring: thermistor or IR thermometer on FETs during first full-power run</li>
            </ul>

            <h3>🏗️ Design for Test (DFT)</h3>
            <ul>
                <li>Testability is a design feature, not an afterthought</li>
                <li><strong>Boundary scan (JTAG BSDL):</strong> Drive I/Os from JTAG — useful for testing board connectivity without firmware</li>
                <li><strong>ICT (In-Circuit Test):</strong> Test bed with pogo pins — requires test points on bottom side at 2.54mm grid</li>
                <li><strong>UART debug console:</strong> Always bring out a UART to a test point or header; invaluable for production testing</li>
                <li><strong>LED indicators:</strong> Power LED, heartbeat LED (firmware blinks it) — fastest visual sanity check</li>
            </ul>

            <div class="visual-ref-links">
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=PCB+bring+up+debug+oscilloscope+probe+test+point&udm=2')">🔍 See: PCB Debugging</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=current+probe+oscilloscope+power+rail+noise&udm=2')">⚡ See: Current Probes</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=TDR+time+domain+reflectometry+PCB+impedance&udm=2')">📈 See: TDR Measurement</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=flying+probe+test+boundary+scan+JTAG+PCB&udm=2')">📷 See: Test Equipment</button>
            </div>
        `,
        keyPoints: ['Follow staged power-on bring-up procedure', 'Place test points on all critical signals', 'Debug with scope and logic analyzer systematically']
    },
    {
        title: 'Advanced Projects (Embedded/Robotics Focused)',
        content: `
            <h3>🚀 Project 1: High-Speed MCU Board</h3>
            <p><strong>Target: STM32H7 or STM32F7 with:</strong></p>
            <ul>
                <li>QSPI Flash (W25Q64, ≤80MHz, length-matched 4 data lines)</li>
                <li>SDIO SD card (4-bit, ≤50MHz, matched bus)</li>
                <li>USB HS (90Ω differential, ESD protection, crystal-less with ULPI PHY or internal HS PHY)</li>
                <li>Ethernet RMII (50MHz ref clock, magnetics per layout guide)</li>
                <li>4-layer stackup: Signal – GND – PWR – Signal</li>
                <li>Controlled impedance specification to fab</li>
            </ul>
            <p><strong>Skills practiced:</strong> SI routing, controlled impedance, USB HS layout, RMII magnetics, staged bring-up</p>

            <h3>🤖 Project 2: Full Robot Controller</h3>
            <p><strong>A complete single-board controller for a wheeled/legged robot:</strong></p>
            <ul>
                <li><strong>MCU:</strong> STM32F4/H7 (Cortex-M4/7, FPU for control loops)</li>
                <li><strong>Motor Drivers:</strong> 4× DRV8874 or similar (brushed DC, 2A each)</li>
                <li><strong>Encoder inputs:</strong> 4× quadrature hardware decoder (timer encoder mode)</li>
                <li><strong>IMU:</strong> ICM-42688-P (6-axis, SPI, low-noise layout)</li>
                <li><strong>CAN Bus:</strong> TJA1051 transceiver, 120Ω termination, differential pair layout</li>
                <li><strong>Power:</strong> 3S LiPo input, synchronous buck (5V/3A logic), separate motor power path</li>
                <li><strong>Communication:</strong> USB CDC, UART expansion headers</li>
            </ul>

            <h3>📡 Project 3: Mixed-Signal Data Acquisition Board</h3>
            <p><strong>For precision sensing applications (force, vibration, environmental):</strong></p>
            <ul>
                <li>Instrumentation amp (INA128) for strain gauge / load cell bridge</li>
                <li>Precision 24-bit ADC (ADS1256 SPI, 30kSPS)</li>
                <li>Low-noise analog supply: LT3042 (ultra-low-noise LDO, 0.8µVrms)</li>
                <li>Isolated power and signal (ISO7242C digital isolator)</li>
                <li>Separate AGND / DGND planes with single-point junction</li>
                <li>MCU: STM32 for SPI control and USB data output</li>
            </ul>
            <p><strong>Skills practiced:</strong> Mixed-signal partitioning, low-noise supply, isolation design</p>

            <h3>🔷 Project 4: FPGA Board with DDR and High-Speed I/O</h3>
            <p><strong>Lattice ECP5 or Xilinx Artix-7 based:</strong></p>
            <ul>
                <li>DDR3L SDRAM (256MB, fly-by topology, length-matched)</li>
                <li>MIPI CSI-2 camera interface (LVDS differential pairs, AC coupled)</li>
                <li>HDMI output (TMDS differential pairs, 100Ω impedance)</li>
                <li>SPI configuration flash + JTAG debug header</li>
                <li>6-layer stackup for DDR signal integrity</li>
            </ul>

            <h3>🔋 Project 5: Complete Mobile Robot Mainboard</h3>
            <p><strong>The flagship Level 3 project — combines everything:</strong></p>
            <ul>
                <li>STM32H743 + 2MB external QSPI Flash</li>
                <li>3-phase BLDC motor power stage (6× MOSFETs, gate drivers, current sense)</li>
                <li>Li-Ion 3S management: BQ77915 protection + BQ25713 charger</li>
                <li>IMU + magnetometer + barometer sensor cluster</li>
                <li>CAN bus + RS-485 for multi-actuator communication</li>
                <li>4-layer board with controlled impedance, full EMC design</li>
            </ul>
            <p><strong>Bring-up sequence:</strong> Power rails → clock → MCU boot → sensors → motor stage → full system</p>

            <h3>✅ Level 3 Success Checklist</h3>
            <ul>
                <li>SI tools: use PCB impedance calculators, verify in fab before ordering</li>
                <li>Review every differential pair for length match and impedance</li>
                <li>Write a bring-up procedure before boards arrive</li>
                <li>Pre-compliance EMC: probe board with near-field probe before shipping product</li>
                <li>Document: signal integrity calculations, stackup table, test procedure — all in Git</li>
            </ul>

            <div class="visual-ref-links">
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=custom+robot+controller+PCB+complete+multi-layer&udm=2')">🔍 See: Advanced Robot Boards</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=BLDC+motor+controller+FOC+PCB+three+phase&udm=2')">🤖 See: BLDC / FOC Boards</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=LiDAR+sensor+interface+PCB+robot&udm=2')">📡 See: LiDAR Interfaces</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=6+layer+PCB+layout+high+speed+mixed+signal&udm=2')">📷 See: Multi-Layer Layouts</button>
            </div>
        `,
        keyPoints: ['Design and bring up high-speed MCU boards', 'Build a complete multi-subsystem robot controller', 'Apply SI/PI and EMC practices in real projects']
    },
    {
        title: 'Antenna & Wireless Design for Embedded',
        content: `
            <h3>📡 Why Antenna Design Matters in Robotics</h3>
            <p>Most modern robots use Wi-Fi (ESP32), Bluetooth (BLE), GPS, or LoRa. Poor antenna design = poor range, lost packets, and unreliable control. The antenna is often the most overlooked part of wireless embedded design.</p>

            <h3>🔀 Antenna Types for Embedded Systems</h3>
            <p><strong>PCB Trace Antenna (Inverted-F, Meander):</strong></p>
            <ul>
                <li>Zero BOM cost — etched directly onto the PCB copper layer</li>
                <li>Common on ESP32, nRF52, CC2640 modules</li>
                <li>Performance depends heavily on correct PCB layout</li>
                <li>Quarter-wave monopole at 2.4 GHz ≈ 31mm (in FR-4)</li>
                <li>Inverted-F (IFA): compact, good bandwidth — most popular for Wi-Fi/BLE</li>
            </ul>

            <p><strong>Chip Antenna:</strong></p>
            <ul>
                <li>Tiny SMD component (e.g., Johanson 2450AT, Pulse W3011) — 2-3mm size</li>
                <li>Follow datasheet layout guide exactly — ground clearance and matching network are critical</li>
                <li>Good balance of size vs. performance for space-constrained designs</li>
                <li>Typical gain: 1-2 dBi</li>
            </ul>

            <p><strong>External Antenna (SMA/U.FL connector):</strong></p>
            <ul>
                <li>Best performance — allows antenna placement away from PCB noise</li>
                <li>Use U.FL or IPEX connector on PCB for small form factor</li>
                <li>50Ω coaxial feed — match impedance to trace and connector</li>
                <li>Required for: GPS (patch antenna), long-range LoRa, high-performance Wi-Fi</li>
            </ul>

            <h3>🏗️ PCB Layout Rules for Antennas</h3>
            <p><strong>Ground Plane Keep-Out (Critical!):</strong></p>
            <ul>
                <li>Remove ALL copper (all layers) underneath and around the antenna element</li>
                <li>Keep-out zone dimensions: per datasheet (typically 10-15mm beyond antenna edge)</li>
                <li>The ground plane EDGE becomes the antenna ground reference — keep it clean and straight</li>
                <li>No traces, no vias, no components in the antenna keep-out zone</li>
            </ul>

            <p><strong>Antenna Feed Line:</strong></p>
            <ul>
                <li>50Ω microstrip from RF pin to antenna (controlled impedance)</li>
                <li>Keep feed line as short as possible (every mm adds loss at 2.4 GHz)</li>
                <li>No bends if possible; if needed, use 45° chamfered bends (not 90°)</li>
                <li>Continuous ground plane underneath the feed line (no splits!)</li>
            </ul>

            <p><strong>Matching Network:</strong></p>
            <ul>
                <li>Pi-network (series L, shunt C, shunt C) between RF pin and antenna</li>
                <li>Pads for 2-3 matching components — even if initially 0Ω shorts</li>
                <li>Allows tuning after boards arrive with a VNA (NanoVNA works for 2.4 GHz)</li>
                <li>Target: S11 < -10 dB at operating frequency (return loss > 10dB)</li>
            </ul>

            <h3>📶 Wi-Fi / BLE (2.4 GHz) Design Tips</h3>
            <ul>
                <li><strong>ESP32:</strong> Follow Espressif hardware design guide antenna section exactly</li>
                <li><strong>nRF52:</strong> Nordic provides reference antenna designs and matching values</li>
                <li>Place antenna at board edge, away from metal enclosure walls</li>
                <li>If using metal enclosure: add external antenna via U.FL connector</li>
                <li>Battery/motor wires should be routed away from antenna area</li>
                <li>2.4 GHz is shared with microwave ovens — environment matters for range</li>
            </ul>

            <h3>🛰️ GPS Antenna Considerations</h3>
            <ul>
                <li>GPS receives very weak signals (−130 dBm) — needs clean RF environment</li>
                <li>Use ceramic patch antenna (25×25mm typical) or external active antenna</li>
                <li>Active antenna needs DC bias through coaxial feed (LNA powered via cable)</li>
                <li>Place GPS antenna on top of board, facing skyward, away from switching noise</li>
                <li>No ground plane above GPS antenna — clear view to sky needed</li>
            </ul>

            <h3>📏 Testing & Validation</h3>
            <ul>
                <li><strong>NanoVNA:</strong> Affordable vector network analyzer for 2.4 GHz — measure S11 (return loss)</li>
                <li>Target: S11 < -10 dB at center frequency (< -15dB is excellent)</li>
                <li>Measure in real enclosure — metal housing shifts resonant frequency</li>
                <li>Range test: measure RSSI vs. distance in free space AND typical operating environment</li>
                <li>If S11 is poor: adjust matching network values (change L/C) or modify keep-out zone</li>
            </ul>

            <div class="visual-ref-links">
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=PCB+antenna+design+WiFi+BLE+trace+inverted+F&udm=2')">🔍 See: PCB Antennas</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=chip+antenna+2.4GHz+ESP32+PCB+layout&udm=2')">📶 See: Chip Antennas</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=RF+shield+can+EMI+wireless+module+PCB&udm=2')">🛡️ See: RF Shields</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=antenna+matching+network+smith+chart+VNA+NanoVNA&udm=2')">📷 See: Antenna Matching</button>
            </div>
        `,
        keyPoints: ['Clear ground plane in antenna keep-out zone on all layers', 'Use 50Ω controlled impedance feed line', 'Include matching network pads for post-fabrication tuning'],
        relatedTopics: [{ level: 'level3', index: 5, label: 'EMC/EMI Design' }, { level: 'level3', index: 4, label: 'Advanced PCB Stackups & Materials' }],
        resources: [{ title: 'Espressif ESP32 Hardware Design Guide', url: 'https://docs.espressif.com/projects/esp-idf/en/latest/esp32/hw-reference/index.html' }, { title: 'NanoVNA — Affordable Vector Network Analyzer', url: 'https://nanovna.com/' }]
    }
]);
