i18n.registerContent('en', 'level1', [
    {
        title: 'Math, Physics, and Basic Concepts',
        content: `
            <h3>⚡ Electrical Fundamentals</h3>
            <p><strong>Ohm's Law:</strong> V = I × R</p>
            <ul>
                <li><strong>Voltage (V):</strong> Electrical potential difference, measured in Volts</li>
                <li><strong>Current (I):</strong> Flow of electric charge, measured in Amperes</li>
                <li><strong>Resistance (R):</strong> Opposition to current flow, measured in Ohms (Ω)</li>
            </ul>
            
            <h3>📐 Kirchhoff's Laws</h3>
            <p><strong>KCL (Current Law):</strong> Sum of currents entering a node equals sum leaving</p>
            <p><strong>KVL (Voltage Law):</strong> Sum of voltages around any closed loop is zero</p>
            
            <h3>🔌 DC Circuits</h3>
            <ul>
                <li><strong>Series:</strong> R_total = R1 + R2 + R3...</li>
                <li><strong>Parallel:</strong> 1/R_total = 1/R1 + 1/R2 + 1/R3...</li>
                <li><strong>Voltage Divider:</strong> V_out = V_in × (R2 / (R1 + R2))</li>
                <li><strong>Current Divider:</strong> I1 = I_total × (R2 / (R1 + R2))</li>
            </ul>
            
            <h3>🌊 AC Concepts</h3>
            <p><strong>Sine waves:</strong> v(t) = V_peak × sin(2πft)</p>
            <p><strong>Frequency (f):</strong> Cycles per second (Hz)</p>
            <p><strong>RMS:</strong> Root Mean Square = Peak / √2 (effective AC value)</p>
            <p><strong>Reactance:</strong> AC resistance in capacitors (X_C) and inductors (X_L)</p>

            <div class="visual-ref-links">
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=Ohms+law+circuit+diagram+voltage+current+resistance&udm=2')">🔍 See: Ohm's Law Circuits</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=series+parallel+circuit+diagram+educational&udm=2')">📷 See: Series vs Parallel</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=Kirchhoff+voltage+current+law+circuit+diagram&udm=2')">⚡ See: Kirchhoff's Laws</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=AC+sine+wave+RMS+peak+voltage+diagram&udm=2')">🌊 See: AC & Sine Waves</button>
            </div>
        `,
        keyPoints: ['Master Ohm\'s Law: V = I × R for any circuit calculation', 'Calculate series/parallel resistance and voltage divider outputs', 'Distinguish DC (constant) from AC (frequency, RMS) concepts'],
        relatedTopics: [{ level: 'level1', index: 1, label: 'Core Electronic Components' }, { level: 'level1', index: 2, label: 'Basic Analog Circuits' }],
        resources: [{ title: 'All About Circuits — Textbook', url: 'https://www.allaboutcircuits.com/textbook/' }, { title: 'Falstad Circuit Simulator', url: 'https://www.falstad.com/circuit/' }]
    },
    {
        title: 'Core Electronic Components',
        content: `
            <h3>⚡ Resistors</h3>
            <p>Limit current flow, divide voltage, and dissipate power as heat.</p>
            <ul>
                <li><strong>Color Codes:</strong> Brown(1) Red(2) Orange(3) Yellow(4) Green(5) Blue(6) Violet(7) Gray(8) White(9)</li>
                <li><strong>Tolerance:</strong> Gold(±5%), Silver(±10%), None(±20%)</li>
                <li><strong>Power Rating:</strong> 1/8W, 1/4W, 1/2W, 1W, 2W...</li>
            </ul>
            
            <h3>🔋 Capacitors</h3>
            <p>Store energy in electric field. Block DC, pass AC.</p>
            <ul>
                <li><strong>Ceramic:</strong> Small values (pF to µF), non-polarized, cheap</li>
                <li><strong>Electrolytic:</strong> Large values (µF to mF), polarized, voltage-sensitive</li>
                <li><strong>Formula:</strong> C = Q/V, Energy = ½CV²</li>
                <li><strong>Applications:</strong> Filtering, decoupling, timing circuits</li>
            </ul>
            
            <h3>🧲 Inductors</h3>
            <p>Store energy in magnetic field. Pass DC, block high-frequency AC.</p>
            <ul>
                <li><strong>Formula:</strong> V = L(dI/dt)</li>
                <li><strong>Applications:</strong> Filters, DC-DC converters, EMI suppression</li>
            </ul>
            
            <h3>➡️ Diodes</h3>
            <p>Allow current in one direction only.</p>
            <ul>
                <li><strong>Rectifier:</strong> Convert AC to DC (forward voltage ~0.7V)</li>
                <li><strong>Zener:</strong> Voltage regulation (constant reverse breakdown)</li>
                <li><strong>Schottky:</strong> Low forward voltage (~0.3V), fast switching</li>
                <li><strong>LED:</strong> Light emission (V_f: Red 2V, Green 2.2V, Blue 3.2V)</li>
            </ul>
            
            <h3>🔀 Transistors</h3>
            <p><strong>BJT (Bipolar Junction Transistor):</strong> Current-controlled switch/amplifier</p>
            <ul>
                <li>NPN: Collector → Emitter when base current applied</li>
                <li>PNP: Emitter → Collector when base pulled low</li>
                <li>Used in: Motor drivers, logic interfacing, amplifiers</li>
            </ul>
            
            <p><strong>MOSFET:</strong> Voltage-controlled switch (robotics favorite!)</p>
            <ul>
                <li>N-channel: Conducts when gate voltage high</li>
                <li>P-channel: Conducts when gate voltage low</li>
                <li>Very high input impedance, efficient switching</li>
                <li>Applications: Motor control, power switching, H-bridges</li>
            </ul>

            <div class="visual-ref-links">
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=resistor+capacitor+inductor+diode+real+photo+labeled&udm=2')">🔍 See: Electronic Components</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=ceramic+vs+electrolytic+capacitor+comparison+photo&udm=2')">🔋 See: Capacitor Types</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=LED+diode+Zener+Schottky+symbol+photo&udm=2')">💡 See: Diode & LED Types</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=MOSFET+BJT+transistor+pinout+diagram&udm=2')">📷 See: Transistor Types</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=resistor+color+code+chart+4+band&udm=2')">🎨 See: Color Code Chart</button>
            </div>
        `,
        keyPoints: ['Read 4-band resistor color codes to determine value', 'Choose correct capacitor type (ceramic vs electrolytic) for application', 'Select NPN MOSFET or BJT for switching loads based on gate/base drive']
    },
    {
        title: 'Basic Analog Circuits',
        content: `
            <h3>🔽 RC Filters</h3>
            <p><strong>Low-Pass Filter:</strong> Allows low frequencies, blocks high frequencies</p>
            <ul>
                <li>Configuration: R → C to ground</li>
                <li>Cutoff frequency: f_c = 1 / (2πRC)</li>
                <li>Use: Sensor noise filtering, ADC input conditioning</li>
            </ul>
            
            <p><strong>High-Pass Filter:</strong> Blocks DC, passes AC</p>
            <ul>
                <li>Configuration: C → R to ground</li>
                <li>Use: Remove DC offset, AC coupling</li>
            </ul>
            
            <h3>📊 Voltage Dividers</h3>
            <p>Create reference voltages for ADC inputs, sensor biasing.</p>
            <pre>V_out = V_in × (R2 / (R1 + R2))</pre>
            <p><strong>ADC Input Conditioning:</strong></p>
            <ul>
                <li>Scale 0-24V sensor to 0-3.3V ADC range</li>
                <li>Add protection (clamping diodes, series resistor)</li>
                <li>Low-pass filter to reduce noise</li>
            </ul>
            
            <h3>🔺 Op-Amp Basics</h3>
            <p><strong>Buffer:</strong> Unity gain, high input impedance</p>
            <p><strong>Non-Inverting Amplifier:</strong> Gain = 1 + (R_f / R_in)</p>
            <p><strong>Inverting Amplifier:</strong> Gain = -(R_f / R_in)</p>
            <p><strong>Comparator:</strong> Output high if V+ > V-, low otherwise</p>
            
            <h3>🌡️ Sensor Interfacing</h3>
            <p><strong>NTC Thermistor:</strong> Resistance decreases with temperature</p>
            <ul>
                <li>Use voltage divider + ADC to measure resistance</li>
                <li>Convert to temperature using Steinhart-Hart equation</li>
            </ul>
            
            <p><strong>Current Sensing (Shunt Resistor):</strong></p>
            <ul>
                <li>Small resistor (0.01Ω - 0.1Ω) in series with load</li>
                <li>Measure voltage across shunt: I = V / R_shunt</li>
                <li>Amplify with op-amp or dedicated current sense IC</li>
            </ul>

            <div class="visual-ref-links">
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=RC+low+pass+high+pass+filter+circuit+diagram&udm=2')">🔍 See: RC Filter Circuits</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=voltage+divider+circuit+diagram+ADC+sensor&udm=2')">📐 See: Voltage Dividers</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=op+amp+inverting+non+inverting+buffer+circuit+diagram&udm=2')">📷 See: Op-Amp Circuits</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=current+sense+shunt+resistor+amplifier+circuit&udm=2')">📊 See: Current Sensing</button>
            </div>
        `,
        keyPoints: ['Calculate RC filter cutoff: f_c = 1/(2πRC)', 'Scale sensor voltage to ADC range using voltage dividers', 'Configure non-inverting op-amp gain: 1 + (R_f/R_in)'],
        relatedTopics: [{ level: 'level1', index: 0, label: 'Math, Physics, and Basic Concepts' }, { level: 'level2', index: 0, label: 'Deeper Analog Electronics' }],
        resources: [{ title: 'LTspice — Free SPICE Simulator', url: 'https://www.analog.com/en/design-center/design-tools-and-calculators/ltspice-simulator.html' }, { title: 'TI Precision Labs — Op-Amp Training', url: 'https://www.ti.com/video/series/precision-labs-op-amps.html' }]
    },
    {
        title: 'Digital Logic Basics',
        content: `
            <h3>⚡ Logic Levels</h3>
            <p><strong>Common Standards:</strong></p>
            <ul>
                <li><strong>5V TTL:</strong> Low: 0-0.8V, High: 2.0-5V</li>
                <li><strong>3.3V CMOS:</strong> Low: 0-0.8V, High: 2.0-3.3V (most modern MCUs)</li>
                <li><strong>1.8V:</strong> Used in some low-power MCUs, FPGAs</li>
            </ul>
            
            <h3>🚪 Logic Gates</h3>
            <ul>
                <li><strong>AND:</strong> Output 1 only if all inputs 1</li>
                <li><strong>OR:</strong> Output 1 if any input 1</li>
                <li><strong>NOT:</strong> Inverts input</li>
                <li><strong>NAND:</strong> NOT-AND (universal gate)</li>
                <li><strong>NOR:</strong> NOT-OR (universal gate)</li>
                <li><strong>XOR:</strong> Output 1 if inputs differ (exclusive OR)</li>
            </ul>
            
            <h3>💾 Flip-Flops & Latches</h3>
            <p><strong>D Flip-Flop:</strong> Stores 1 bit, changes on clock edge</p>
            <p><strong>Shift Register:</strong> Chain of flip-flops, data shifts on each clock</p>
            <ul>
                <li>Use: Serial to parallel conversion (e.g., 74HC595)</li>
                <li>Application: Drive multiple LEDs with 3 MCU pins</li>
            </ul>
            
            <h3>🔢 Number Systems</h3>
            <p><strong>Binary:</strong> Base 2 (0, 1) - e.g., 1011 = 11 decimal</p>
            <p><strong>Hexadecimal:</strong> Base 16 (0-9, A-F) - e.g., 0x2F = 47 decimal</p>
            <p><strong>Two's Complement:</strong> Signed integer representation</p>
            <ul>
                <li>Invert bits and add 1 to get negative</li>
                <li>Example: -5 in 8-bit = 11111011</li>
                <li>Critical for firmware: ADC readings, sensor data</li>
            </ul>

            <div class="visual-ref-links">
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=3.3V+5V+TTL+CMOS+logic+levels+diagram&udm=2')">🔍 See: Logic Levels</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=logic+gates+AND+OR+NOT+truth+table+diagram&udm=2')">🚪 See: Logic Gates</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=D+flip+flop+shift+register+74HC595+diagram&udm=2')">📷 See: Flip-Flops & Registers</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=binary+hexadecimal+conversion+chart+embedded&udm=2')">🔢 See: Binary & Hex</button>
            </div>
        `,
        keyPoints: ['Distinguish 5V TTL vs 3.3V CMOS logic level thresholds', 'Convert between binary, decimal, and hexadecimal', 'Use D flip-flops and shift registers (74HC595) for data storage']
    },
    {
        title: 'Tools & Instrumentation Basics',
        content: `
            <h3>🍞 Breadboard Prototyping</h3>
            <ul>
                <li>Rows connected horizontally, power rails vertically</li>
                <li>No solder required - quick testing</li>
                <li>Limitations: Poor for high-speed signals, loose connections</li>
            </ul>
            
            <h3>📏 Multimeter</h3>
            <p><strong>Essential measurements:</strong></p>
            <ul>
                <li><strong>Voltage:</strong> Parallel to component (red=+, black=ground)</li>
                <li><strong>Current:</strong> In series (break circuit, insert meter)</li>
                <li><strong>Resistance:</strong> Power off circuit first!</li>
                <li><strong>Diode Test:</strong> Check forward voltage (~0.6-0.7V)</li>
                <li><strong>Continuity:</strong> Beep test for short circuits</li>
            </ul>
            
            <h3>📊 Oscilloscope</h3>
            <p>Visualize voltage waveforms over time - critical for debugging!</p>
            <ul>
                <li><strong>Channels:</strong> 2-4 simultaneous signals</li>
                <li><strong>Bandwidth:</strong> 50MHz for basic, 100MHz+ for high-speed</li>
                <li><strong>Triggering:</strong> Capture specific events (rising edge, etc.)</li>
                <li><strong>Measurements:</strong> Frequency, amplitude, rise time, duty cycle</li>
            </ul>
            <p><strong>What to probe:</strong></p>
            <ul>
                <li>Power rails (check ripple, noise)</li>
                <li>PWM signals (verify frequency, duty cycle)</li>
                <li>Digital communication (SPI/I2C/UART timing)</li>
                <li>Analog sensor outputs</li>
            </ul>
            
            <h3>🔍 Logic Analyzer</h3>
            <p>Decode digital protocols - essential for communication debugging!</p>
            <ul>
                <li>8-16 channels for multi-signal capture</li>
                <li>Protocol decoders: SPI, I2C, UART, CAN built-in</li>
                <li>Affordable options: Saleae Logic, DSLogic</li>
                <li>Use when: Communication not working, timing issues</li>
            </ul>
            
            <h3>⚡ SPICE Simulation</h3>
            <p><strong>LTspice (free):</strong> Analog circuit simulation</p>
            <ul>
                <li>Test circuits before building</li>
                <li>Verify filter designs, op-amp circuits</li>
                <li>AC analysis for frequency response</li>
                <li>Transient analysis for time-domain behavior</li>
            </ul>
            
            <p><strong>Falstad Circuit Simulator (online):</strong></p>
            <ul>
                <li>Interactive, real-time visualization</li>
                <li>Great for learning basic circuits</li>
                <li>No installation needed</li>
            </ul>

            <div class="visual-ref-links">
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=breadboard+layout+connections+diagram+explained&udm=2')">🔍 See: Breadboard Layout</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=digital+multimeter+bench+handheld+photo&udm=2')">📏 See: Multimeters</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=oscilloscope+probe+ground+clip+measurement+setup&udm=2')">📊 See: Scope & Probes</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=oscilloscope+screen+waveform+PWM+signal&udm=2')">📷 See: Oscilloscope Waveforms</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=logic+analyzer+SPI+I2C+decode+screen+Saleae&udm=2')">🔍 See: Logic Analyzers</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=LTspice+circuit+simulation+schematic+screenshot&udm=2')">⚡ See: LTspice</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=Falstad+circuit+simulator+applet+screenshot&udm=2')">🌐 See: Falstad Simulator</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=digital+multimeter+how+to+measure+voltage+current&udm=2')">🔧 See: Multimeter How-To</button>
            </div>
        `,
        keyPoints: ['Measure voltage in parallel, current in series, resistance with power off', 'Use oscilloscope triggering to capture PWM and communication signals', 'Simulate circuits in LTspice or Falstad before building hardware'],
        relatedTopics: [{ level: 'level1', index: 5, label: 'Intro to PCB Design Concepts' }, { level: 'level1', index: 8, label: 'Soldering & Assembly Skills' }],
        resources: [{ title: 'EEVblog Multimeter Tutorial', url: 'https://www.youtube.com/watch?v=gh1n_ELmpFI' }, { title: 'Saleae Logic Analyzer', url: 'https://www.saleae.com/' }]
    },
    {
        title: 'Intro to PCB Design Concepts',
        content: `
            <h3>🖼️ What is a PCB?</h3>
            <p>Printed Circuit Board - mechanical support + electrical connections for components</p>
            <ul>
                <li><strong>Layers:</strong> Copper (conductive), FR-4 substrate (insulating)</li>
                <li><strong>Traces:</strong> Copper paths carrying signals/power</li>
                <li><strong>Pads:</strong> Where components solder to board</li>
                <li><strong>Vias:</strong> Plated holes connecting layers</li>
                <li><strong>Copper Pours:</strong> Large copper areas (usually ground/power)</li>
            </ul>
            
            <div class="visual-ref-links">
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=PCB+traces+pads+vias+diagram+labeled&udm=2')">🔍 See: PCB Traces, Pads & Vias</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=printed+circuit+board+close+up+photo+copper+traces&udm=2')">📷 See: Real PCB Close-ups</button>
            </div>
            
            <h3>📐 Schematic vs PCB</h3>
            <p><strong>Schematic Symbol:</strong> Logical representation (resistor, capacitor, IC)</p>
            <p><strong>Footprint (Land Pattern):</strong> Physical pad layout for soldering</p>
            <ul>
                <li>SMD (Surface Mount): Tiny, automated assembly (0805, SOIC)</li>
                <li>Through-Hole: Larger, hand-solderable (DIP, radial capacitors)</li>
            </ul>

            <div class="visual-ref-links">
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=SMD+vs+through+hole+components+comparison+PCB&udm=2')">🔍 See: SMD vs Through-Hole</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=SMD+0805+0603+component+size+comparison&udm=2')">📷 See: SMD Component Sizes</button>
            </div>
            
            <h3>🔌 Nets & Labels</h3>
            <p><strong>Net:</strong> Electrically connected nodes in schematic</p>
            <p><strong>Net Label:</strong> Name for a net (e.g., "VCC", "GND", "MOSI")</p>
            <p><strong>Reference Designator:</strong> Component ID (R1, C5, U3)</p>
            
            <h3>📚 Layer Types</h3>
            <p><strong>Single-Layer:</strong> One copper side (cheap, simple projects)</p>
            <p><strong>Double-Layer:</strong> Top + bottom copper (most hobbyist boards)</p>
            <ul>
                <li>Ground plane on bottom</li>
                <li>Signal routing on top</li>
                <li>Vias connect layers</li>
            </ul>

            <div class="visual-ref-links">
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=PCB+layer+stackup+cross+section+diagram&udm=2')">🔍 See: PCB Layer Stackup</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=PCB+cross+section+microscope+photo+layers&udm=2')">📷 See: Real Cross-Section Photos</button>
            </div>
            
            <h3>⚙️ Design Rules</h3>
            <p>Constraints ensuring manufacturability:</p>
            <ul>
                <li><strong>Trace Width:</strong> Minimum 6-8 mil (0.15-0.2mm) typical</li>
                <li><strong>Clearance:</strong> Space between traces (6-8 mil minimum)</li>
                <li><strong>Hole Size:</strong> Minimum drill 0.3mm</li>
                <li><strong>Annular Ring:</strong> Copper around hole for strength</li>
            </ul>
            
            <h3>🏭 Fabrication Overview</h3>
            <ol>
                <li><strong>Imaging:</strong> Transfer circuit pattern to copper</li>
                <li><strong>Etching:</strong> Remove unwanted copper</li>
                <li><strong>Drilling:</strong> Create holes for vias/through-hole parts</li>
                <li><strong>Plating:</strong> Make holes conductive</li>
                <li><strong>Solder Mask:</strong> Green protective coating</li>
                <li><strong>Silkscreen:</strong> White component labels/text</li>
                <li><strong>Surface Finish:</strong> Protect copper (HASL, ENIG)</li>
            </ol>

            <div class="visual-ref-links">
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=schematic+net+label+reference+designator+KiCad+example&udm=2')">🔌 See: Nets & Labels</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=PCB+trace+width+clearance+annular+ring+diagram&udm=2')">⚙️ See: Design Rules</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=PCB+manufacturing+etching+drilling+solder+mask+process&udm=2')">🏭 See: PCB Fabrication</button>
            </div>
        `,
        keyPoints: ['Distinguish traces, pads, vias, and copper pours on a PCB', 'Set minimum trace width (6-8 mil) and clearance per fab capability', 'Map schematic symbols to physical footprints (SMD vs through-hole)'],
        relatedTopics: [{ level: 'level1', index: 6, label: 'Beginner EDA Tool Workflow' }, { level: 'level2', index: 5, label: 'Intermediate PCB Layout Techniques' }],
        resources: [{ title: 'KiCad Official Docs', url: 'https://docs.kicad.org/' }, { title: 'JLCPCB Capabilities', url: 'https://jlcpcb.com/capabilities/pcb-capabilities' }]
    },
    {
        title: 'Beginner EDA Tool Workflow (KiCad)',
        content: `
            <h3>🛠️ KiCad Workflow</h3>
            <p>Free, open-source, professional-grade EDA tool</p>
            
            <h3>📝 Step 1: Schematic Capture</h3>
            <ol>
                <li><strong>Place Components:</strong> Press 'A', search library (resistor, LED, MCU)</li>
                <li><strong>Add Power Symbols:</strong> VCC, GND, +3.3V nets</li>
                <li><strong>Wire Components:</strong> Press 'W', click to connect</li>
                <li><strong>Label Nets:</strong> Name important signals (MOSI, SCK, TX, RX)</li>
                <li><strong>Add Values:</strong> Annotate resistor values, capacitor ratings</li>
            </ol>
            
            <h3>🔗 Step 2: Assign Footprints</h3>
            <ul>
                <li>Each symbol needs physical footprint</li>
                <li>Resistor → 0805, 1206, through-hole?</li>
                <li>MCU → QFN32, LQFP48, etc.</li>
                <li>Check datasheet for recommended land pattern</li>
            </ul>
            
            <h3>✅ Step 3: Electrical Rule Check (ERC)</h3>
            <ul>
                <li>Catches errors: unconnected pins, missing power</li>
                <li>Warnings: input connected to input (usually bad)</li>
                <li>Fix all errors before PCB layout</li>
            </ul>
            
            <h3>🖼️ Step 4: PCB Layout</h3>
            <ol>
                <li><strong>Import Netlist:</strong> Transfer schematic to PCB editor</li>
                <li><strong>Place Components:</strong> Functional grouping (MCU + decoupling caps together)</li>
                <li><strong>Define Board Outline:</strong> Edge cuts layer</li>
                <li><strong>Route Traces:</strong> Connect pads following ratsnest (airwires)</li>
                <li><strong>Add Ground Plane:</strong> Fill unused area with copper (zone fill)</li>
                <li><strong>Add Mounting Holes:</strong> M3 screws common</li>
            </ol>
            
            <h3>✅ Step 5: Design Rule Check (DRC)</h3>
            <ul>
                <li>Verify trace width/clearance rules</li>
                <li>Check for overlapping tracks</li>
                <li>Ensure no unrouted nets</li>
                <li>Fix all errors before manufacturing</li>
            </ul>
            
            <h3>📦 Step 6: Generate Manufacturing Files</h3>
            <ul>
                <li><strong>Gerber Files:</strong> Standard format for PCB fabs (RS-274X)</li>
                <li><strong>Drill Files:</strong> Excellon format for holes</li>
                <li><strong>BOM (Bill of Materials):</strong> Component list with part numbers</li>
                <li><strong>Assembly Drawings:</strong> Component placement reference</li>
            </ul>
            
            <h3>🏭 Step 7: Order from Fab</h3>
            <p><strong>Popular Budget Fabs:</strong></p>
            <ul>
                <li><strong>JLCPCB:</strong> $2 for 5 boards, fast shipping, assembly service</li>
                <li><strong>PCBWay:</strong> Good quality, competitive pricing</li>
                <li><strong>OSH Park:</strong> US-based, purple boards, excellent quality</li>
            </ul>
            <p><strong>Typical Lead Time:</strong> 2-5 days fabrication + shipping</p>
            <p><strong>Standard Specs:</strong> 2-layer, 1.6mm thick, HASL finish, green solder mask</p>

            <div class="visual-ref-links">
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=KiCad+schematic+editor+PCB+layout+screenshot&udm=2')">🔍 See: KiCad Schematic & PCB</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=KiCad+footprint+editor+library+SMD&udm=2')">📦 See: Footprint Editor</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=KiCad+3D+board+viewer+render&udm=2')">🧊 See: KiCad 3D View</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=KiCad+DRC+design+rule+check+clearance&udm=2')">✅ See: DRC in KiCad</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=Gerber+file+viewer+PCB+manufacturing+layers&udm=2')">📷 See: Gerber Files</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=JLCPCB+PCBWay+prototype+boards+photo&udm=2')">🏭 See: Prototype PCBs</button>
            </div>
        `,
        keyPoints: ['Complete the KiCad workflow: schematic → footprints → ERC → layout → DRC → Gerbers', 'Fix all ERC and DRC errors before manufacturing', 'Generate Gerber + drill files and order from JLCPCB/PCBWay']
    },
    {
        title: 'Beginner Projects (Embedded/Robotics Focused)',
        content: `
            <h3>💡 Project 1: LED Blinker</h3>
            <p><strong>Using 555 Timer (no microcontroller):</strong></p>
            <ul>
                <li>Astable mode - generates square wave</li>
                <li>Frequency = 1.44 / ((R1 + 2×R2) × C)</li>
                <li>Components: 555 IC, 2 resistors, capacitor, LED, power</li>
                <li>Learn: Timing circuits, component selection</li>
            </ul>
            
            <p><strong>Using Microcontroller (Arduino/STM32):</strong></p>
            <ul>
                <li>Minimal circuit: MCU + power + LED + resistor</li>
                <li>Firmware: Toggle GPIO pin with delay</li>
                <li>Learn: MCU basics, GPIO control, programming</li>
            </ul>
            
            <h3>🌡️ Project 2: Sensor Breakout Board</h3>
            <p><strong>IMU (MPU6050, LSM6DS3):</strong></p>
            <ul>
                <li>I2C interface to MCU</li>
                <li>Components: IMU chip, decoupling caps, pull-up resistors, header pins</li>
                <li>Learn: I2C hardware, sensor interfacing, PCB layout for mixed-signal</li>
            </ul>
            
            <p><strong>Temperature Sensor (DS18B20, TMP36):</strong></p>
            <ul>
                <li>Analog or digital output</li>
                <li>Learn: Sensor conditioning, ADC interfacing</li>
            </ul>
            
            <p><strong>Ultrasonic (HC-SR04):</strong></p>
            <ul>
                <li>Trigger/echo pins for distance measurement</li>
                <li>Learn: Pulse timing, level shifting if needed</li>
            </ul>
            
            <h3>🔌 Project 3: Custom Arduino Shield</h3>
            <p>PCB that plugs into Arduino Uno/Mega</p>
            <ul>
                <li><strong>Ideas:</strong> Motor driver shield, sensor array, relay control</li>
                <li>Match Arduino header pinout exactly</li>
                <li>Add LEDs for status indication</li>
                <li>Learn: Stackable headers, shield design constraints</li>
            </ul>
            
            <h3>🎛️ Project 4: Raspberry Pi Pico Carrier Board</h3>
            <p>Custom board hosting RP2040 microcontroller</p>
            <ul>
                <li>Minimum circuit: RP2040, flash memory, crystal, power regulation</li>
                <li>Add: USB connector, GPIO breakout, status LEDs</li>
                <li>Learn: Flash storage interfacing, USB routing, reset circuits</li>
            </ul>
            
            <h3>⚡ Project 5: USB Power Supply Board</h3>
            <p>Convert USB 5V to 3.3V for embedded projects</p>
            <ul>
                <li><strong>Components:</strong> USB connector, LDO regulator (AMS1117), capacitors</li>
                <li>Input: 5V from USB</li>
                <li>Outputs: 5V and 3.3V rails with header pins</li>
                <li>Add: Power LED, ESD protection (optional)</li>
                <li>Learn: Linear regulation, decoupling, power distribution</li>
            </ul>
            
            <h3>🎯 Success Tips</h3>
            <ul>
                <li><strong>Start Simple:</strong> Don't add features until basic version works</li>
                <li><strong>Test on Breadboard First:</strong> Verify circuit before PCB</li>
                <li><strong>Read Datasheets:</strong> Follow reference designs closely</li>
                <li><strong>Add Test Points:</strong> Probe important signals easily</li>
                <li><strong>Version Control:</strong> Git for KiCad files (track changes)</li>
                <li><strong>Document:</strong> Schematic notes, README with assembly instructions</li>
            </ul>

            <div class="visual-ref-links">
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=555+timer+LED+blinker+circuit+diagram+breadboard&udm=2')">🔍 See: 555 Timer Circuits</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=Arduino+STM32+LED+blink+breadboard+circuit&udm=2')">💡 See: MCU LED Circuits</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=HC-SR04+ultrasonic+sensor+wiring+diagram&udm=2')">📡 See: HC-SR04</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=Arduino+shield+PCB+custom+motor+driver&udm=2')">📷 See: Arduino Shields</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=Raspberry+Pi+Pico+carrier+board+PCB&udm=2')">🎛️ See: Pico Carriers</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=USB+5V+to+3.3V+LDO+power+bank+PCB&udm=2')">⚡ See: USB Power Boards</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=MPU6050+IMU+breakout+board+PCB&udm=2')">🔧 See: Sensor Breakouts</button>
            </div>
        `,
        keyPoints: ['Build complete breadboard prototypes before PCB', 'Calculate LED resistors and 555 timer values', 'Order and assemble PCBs from budget fabs']
    },
    {
        title: 'Soldering & Assembly Skills',
        content: `
            <h3>🔥 Hand Soldering Fundamentals</h3>
            <p><strong>Equipment You Need:</strong></p>
            <ul>
                <li><strong>Soldering Iron:</strong> Temperature-controlled (e.g., Hakko FX-888D, Pinecil) — 350–370°C for lead-free</li>
                <li><strong>Solder:</strong> Lead-free SAC305 (Sn96.5/Ag3/Cu0.5) — 0.5mm dia for SMD, 0.8mm for through-hole</li>
                <li><strong>Flux:</strong> No-clean flux pen or paste — essential for SMD work and rework</li>
                <li><strong>Tip Cleaner:</strong> Brass wool (preferred over wet sponge — less thermal shock to tip)</li>
                <li><strong>Fume Extractor:</strong> Always use one — flux fumes are irritating to eyes/lungs</li>
            </ul>

            <h3>📐 Through-Hole Soldering Technique</h3>
            <ol>
                <li><strong>Insert:</strong> Component leads through holes, bend slightly to hold in place</li>
                <li><strong>Heat:</strong> Touch iron tip to BOTH the pad and lead simultaneously (2-3 seconds)</li>
                <li><strong>Feed solder:</strong> Apply solder wire to the junction (not to the iron tip) — let it flow</li>
                <li><strong>Remove:</strong> Pull solder wire away, then iron. Total time: 3-5 seconds</li>
                <li><strong>Inspect:</strong> Good joint = shiny, concave fillet that wets both pad and lead</li>
            </ol>

            <p><strong>Common Mistakes:</strong></p>
            <ul>
                <li><strong>Cold joint:</strong> Dull, grainy appearance — insufficient heat, won't conduct reliably</li>
                <li><strong>Too much solder:</strong> Ball/blob shape — components can't be inspected, may bridge</li>
                <li><strong>Burned pad:</strong> Pad lifts from PCB — too much heat or too long dwell time</li>
                <li><strong>Dry joint:</strong> Solder didn't wet surface — dirty pad or no flux</li>
            </ul>

            <h3>🔬 SMD (Surface Mount) Soldering</h3>
            <p><strong>Hand Soldering SMD — Drag Technique (for SOIC, TQFP ICs):</strong></p>
            <ol>
                <li>Apply flux generously to all pads</li>
                <li>Tack one corner pin with minimal solder</li>
                <li>Align IC under magnification — adjust while tack pin is re-heated</li>
                <li>Tack opposite corner</li>
                <li>Add small solder to iron tip and drag across pins — flux prevents bridges</li>
                <li>Repeat for all sides</li>
            </ol>

            <p><strong>Passive Components (0805, 0603, 0402):</strong></p>
            <ul>
                <li>Pre-tin one pad with a small dome of solder</li>
                <li>Hold component with tweezers, re-melt the solder, slide component into place</li>
                <li>Solder the other pad normally</li>
                <li>Re-touch first pad if needed for a clean fillet</li>
            </ul>

            <h3>🌊 Reflow Soldering (DIY)</h3>
            <p><strong>For SMD assembly at home:</strong></p>
            <ul>
                <li><strong>Solder paste:</strong> Apply with stencil (or syringe for small runs) — SAC305, Type 3 or 4</li>
                <li><strong>Place components:</strong> Tweezers for passives, vacuum pen optional for ICs</li>
                <li><strong>Reflow:</strong> Hot plate (MHP30), hot air station, or DIY reflow oven (modified toaster oven)</li>
                <li><strong>Profile:</strong> Preheat 150°C → Soak 200°C → Peak 245°C (30s) → Cool down</li>
                <li><strong>Do NOT exceed 260°C</strong> — components may be damaged above their rated peak temp</li>
            </ul>

            <h3>🔧 Desoldering & Rework</h3>
            <ul>
                <li><strong>Solder wick:</strong> Copper braid soaks up solder when heated — great for through-hole and pads</li>
                <li><strong>Solder sucker:</strong> Spring-loaded pump removes molten solder — good for through-hole</li>
                <li><strong>Hot air station:</strong> Essential for removing SMD ICs (QFP, QFN, BGA). Apply flux first, heat evenly</li>
                <li><strong>Flux is your friend:</strong> Always apply fresh flux before any rework attempt</li>
            </ul>

            <h3>🔍 Inspection & Quality</h3>
            <ul>
                <li><strong>Visual:</strong> Use USB microscope or 10× loupe — check every joint</li>
                <li><strong>Continuity test:</strong> Multimeter beep test across all connections</li>
                <li><strong>Good joint:</strong> Smooth, shiny (leaded) or slightly satin (lead-free), concave fillet, wets both surfaces</li>
                <li><strong>Bad signs:</strong> Dull/grainy (cold), ball-shaped (too much), lifted pad (overheated), bridge (excess solder between pins)</li>
            </ul>

            <h3>⚠️ Safety</h3>
            <ul>
                <li>Use fume extraction — never breathe flux smoke directly</li>
                <li>Wash hands after handling solder (especially leaded)</li>
                <li>Keep iron in holder when not in use — tip is 350°C+</li>
                <li>Work on heat-resistant mat (silicone)</li>
                <li>Safety glasses when cutting leads (flying wire ends)</li>
            </ul>

            <div class="visual-ref-links">
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=temperature+controlled+soldering+iron+station+Hakko&udm=2')">🔥 See: Soldering Stations</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=through+hole+soldering+technique+pad+wire+photo&udm=2')">📐 See: Through-Hole Joints</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=good+solder+joint+vs+bad+cold+joint+PCB+photo&udm=2')">🔍 See: Good vs Bad Joints</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=SMD+0805+tombstoning+reflow+photo&udm=2')">📌 See: Tombstoning</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=SMD+drag+soldering+technique+TQFP+IC&udm=2')">📷 See: SMD Drag Soldering</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=solder+wick+braid+desoldering+rework&udm=2')">🔧 See: Desoldering & Wick</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=reflow+soldering+oven+solder+paste+stencil+PCB&udm=2')">🌊 See: Reflow & Stencil</button>
            </div>
        `,
        keyPoints: ['Solder through-hole with heat-both-surfaces technique', 'Use drag soldering for SMD ICs', 'Identify and fix cold joints, bridges, and tombstoning'],
        relatedTopics: [{ level: 'level1', index: 4, label: 'Tools & Instrumentation Basics' }, { level: 'level1', index: 7, label: 'Beginner Projects' }],
        resources: [{ title: 'Pace Soldering Training Videos', url: 'https://www.youtube.com/watch?v=vIT4ra6Mo0s' }, { title: 'IPC J-STD-001 — Soldering Standard', url: 'https://www.ipc.org/ipc-j-std-001' }]
    }
]);