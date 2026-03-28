i18n.registerContent('de', 'level4', [
    {
        title: 'Spezialisierungspfade für Embedded/Robotik',
        content: `
            <h3>🎯 Schwerpunkt wählen</h3>
            <p>Auf Stufe 4 vertiefst du 1–2 Bereiche passend zu Karriere oder Projekt — aufbauend auf Stufe 3.</p>

            <h3>🔌 Pfad 1: High-Speed-Digital</h3>
            <p><strong>Fokus:</strong> DDR4/5, PCIe Gen 3/4, SerDes, GHz-Layouts für SoC-Robotik</p>
            <ul>
                <li><strong>DDR4/5:</strong> Fly-by, Write Leveling, Read DQ/DQS-Training, ZQ-Kalibrierung</li>
                <li><strong>PCIe:</strong> 8 GT/s (Gen3) bis 16 GT/s (Gen4) — 85 Ω Differenzimpedanz, Verlustbudget, De-Embedding</li>
                <li><strong>SerDes/MGT:</strong> Multi-Gbit-Transceiver auf FPGAs — Pre-Emphasis, Equalizer</li>
                <li><strong>Werkzeuge:</strong> Cadence Sigrity, Ansys HFSS, HyperLynx (Vollwellen-EM)</li>
                <li><strong>Relevant für:</strong> ROS2-Rechenboards, Bildverarbeitungsroboter, Edge-AI-SoCs</li>
            </ul>

            <h3>🤖 Pfad 2: Motorregelung & Leistungselektronik</h3>
            <p><strong>Fokus:</strong> BLDC-Servo, Umrichter, Hochstrom-Leiterplatten für Aktoren</p>
            <ul>
                <li>3-Phasen-Umrichter: Gatetreiber, Bootstrap, Dead-Time</li>
                <li>FOC-Hardware: Shunt-Strommessung, Resolver/Encoder</li>
                <li>HF-Layout: Schleifen minimieren (L×di/dt-Spitzen)</li>
                <li>Bus-Kondensatoren: Haltezeit, Ripple-Strom-Belastbarkeit</li>
                <li><strong>Relevant für:</strong> Roboterarme, AGVs, Servos, Exoskelette</li>
            </ul>

            <h3>🔬 Pfad 3: Präzisions-Analog / Mixed-Signal</h3>
            <p><strong>Fokus:</strong> Sub-µV-Rauschboden, 24-Bit-ADC, Industriesensorik</p>
            <ul>
                <li>Rauschanalyse: thermisches (Johnson), 1/f, Schrotrauschen</li>
                <li>Sigma-Delta-ADC: Dezimation, OSR, Noise Shaping</li>
                <li>Isolation: kapazitiv (ISO7xxx), Transformator, optisch</li>
                <li>Kalibrierung: Präzisionsreferenzen (LT6657), Temperaturkompensation</li>
                <li><strong>Relevant für:</strong> Kraft/Drehmoment, Wägezellen, Schwingungsüberwachung, Labor</li>
            </ul>

            <h3>⚠️ Pfad 4: Sicherheitskritische Hardware</h3>
            <p><strong>Fokus:</strong> Funktionale Sicherheit für autonome und kollaborative Roboter</p>
            <ul>
                <li>ISO 26262 ASIL: Aufteilung auf zwei Kanäle</li>
                <li>Redundanz: Dual-MCU (Lockstep), getrennte Versorgungen, Kreuzüberwachung</li>
                <li>Sicherer Zustand: stromlos = Stop, Hardware-Watchdog</li>
                <li>Diagnose: Selbsttest, Strom- und Temperaturüberwachung</li>
                <li><strong>Relevant für:</strong> Cobots, OP-Roboter, autonome Fahrzeuge</li>
            </ul>

            <h3>💤 Pfad 5: Ultra-Low-Power</h3>
            <p><strong>Fokus:</strong> µA-Mittelstrom für Batterie-IoT und Wearables</p>
            <ul>
                <li>Energiebudget: mAh pro Betriebsmodus</li>
                <li>Power Gating: Lastschalter (TPS22917), Teilsysteme ein/aus</li>
                <li>Wake-up vs. Leckstrom: Deep Sleep vs. Stop</li>
                <li>Energy Harvesting: Solar, Vibration, HF — Schnittstellen, MPPT</li>
                <li><strong>Relevant für:</strong> Funk-Sensorknoten, Wearables, Umweltmonitoring</li>
            </ul>

            <h3>🏗️ Pfad 6: Harte Umgebung</h3>
            <p><strong>Fokus:</strong> Platinen für Vibration, Temperatur, Feuchte, EMI im Feld</p>
            <ul>
                <li>Schutzlack: Acryl (AR), Silikon (SR), Urethan (UR) — IPC-CC-830</li>
                <li>Steckverbinder: IP67/68, MIL-DTL-38999, Amphenol rund</li>
                <li>Vibration: schwere Bauteile flach, BGA-Underfill, Abstandshalter für große Cs</li>
                <li>Thermik: erweiterter Temperaturbereich (−40 °C bis +85/+125 °C), thermische Zyklen-Qualifikation</li>
                <li><strong>Relevant für:</strong> Feldroboter, UAVs, Outdoor-Inspektion, Agrar</li>
            </ul>
            <h3>📊 Beispiel: PCIe-Verlustbudget</h3>
            <p><strong>Szenario:</strong> PCIe Gen3 x4 (8 GT/s NRZ) auf Rechenboard für ROS2</p>
            <ul>
                <li><strong>Max. Einfügedämpfung:</strong> ~12 dB bei 4 GHz (Nyquist für 8 GT/s)</li>
                <li><strong>Budget:</strong> TX-Gehäuse (1,5 dB) + PCB 4" (3,5 dB) + 2 Vias (1,0 dB) + Stecker (1,5 dB) + Kabel/Backplane (3,0 dB) + RX (1,5 dB) = 12 dB</li>
                <li><strong>Über Budget:</strong> niedrigverlustiges Material, kürzere Leitung, FIR Pre-Emphasis am Sender</li>
                <li><strong>Tools:</strong> HyperLynx oder Ansys SIwave pro Abschnitt</li>
            </ul>

            <h3>⚙️ Beispiel: FOC-Strommessung</h3>
            <p><strong>Szenario:</strong> 3-phasiger BLDC für 6-DOF-Gelenk, 3 A max</p>
            <ul>
                <li><strong>Shunt:</strong> R = U_voll / I_max = 50 mV / 3 A = 16,7 mΩ → 20 mΩ Normwert</li>
                <li><strong>Verlust:</strong> P = I²R = 9 × 0,02 = 180 mW</li>
                <li><strong>Verstärker:</strong> INA240A3 (V=100, 50 mV → 5 V zum ADC)</li>
                <li><strong>Layout:</strong> Kelvin vom Shunt-Pad zum INA, kein Leistungsstrom auf Sense-Leitern</li>
            </ul>

            <div class="visual-ref-links">
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=DDR4+PCIe+high+speed+PCB+routing+layout&udm=2')">🔍 Ansehen: High-Speed-Digital</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=PCIe+insertion+loss+budget+pre-emphasis+diagram&udm=2')">📊 Ansehen: Link-Verlustbudget</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=BLDC+3+phase+inverter+gate+driver+PCB+schematic&udm=2')">📷 Ansehen: Motor-Umrichter</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=INA240+Kelvin+shunt+current+sense+PCB+layout&udm=2')">📐 Ansehen: Kelvin-Strommessung</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=safety+critical+hardware+redundant+microcontroller+design&udm=2')">⚠️ Ansehen: Safety-Hardware</button>
            </div>
        `,
        keyPoints: ['1–2 Spezialisierungspfade zu Zielen auswählen', 'Verlustbudgets für schnelle Seriellinks berechnen', 'FOC-Strommessung mit Kelvin und passendem Shunt auslegen']
    },
    {
        title: 'Fortgeschrittene Signal- und Power-Integrity (Simulation)',
        content: `
            <h3>🖥️ SI/PI-Simulationswerkzeuge</h3>
            <p>Von Faustregeln zu simuliert nachgewiesenem Design</p>
            <ul>
                <li><strong>Kommerziell:</strong> HyperLynx (Mentor), Ansys SIwave, Cadence Sigrity — Industriestandard, teuer</li>
                <li><strong>Open Source / zugänglich:</strong> OpenEMS, Qucs-S, KiCad-SPICE (eeschema)</li>
                <li><strong>Ablauf:</strong> PCB exportieren → SI-Tool → Stackup/Material → simulieren</li>
                <li>DDR-Timing, PDN-Impedanz, Differenz-Skew vor Fertigung prüfen</li>
            </ul>

            <h3>👁️ Augendiagramm</h3>
            <p>Das Augendiagramm ist die zentrale Güteansicht für schnelle Serienlinks</p>
            <ul>
                <li><strong>Inhalt:</strong> Überlagerung aller Bitintervalle → Öffnung = Rauschabstand</li>
                <li><strong>Augenhöhe:</strong> Spannungsmarge über Rauschen; &gt; Empfindlichkeit des Empfängers</li>
                <li><strong>Augenbreite:</strong> Zeitmarge; &gt; Setup + Hold</li>
                <li><strong>Jitter:</strong> deterministisch (DDJ, DCD, PJ) und zufällig (RJ) — verengen die Öffnung</li>
                <li>Messung: Oszilloskop Persistenz oder BERT</li>
            </ul>

            <p><strong>TDR (Time Domain Reflectometry):</strong></p>
            <ul>
                <li>Schneller Sprung; Reflexionen an Impedanzsprüngen</li>
                <li>X: Zeit (→ Distanz); Y: Impedanzabweichung</li>
                <li>Zeigt: Stubs, Via-Sprünge, schlechte Steckerübergänge</li>
                <li>In High-End-Scopes und VNAs</li>
            </ul>

            <h3>📈 S-Parameter in der Praxis</h3>
            <ul>
                <li><strong>S11:</strong> Reflexion — niedrig = gute Anpassung</li>
                <li><strong>S21:</strong> Durchgang — hoch und flach über f</li>
                <li><strong>.s2p/.s4p:</strong> Stecker, Leitungen, Kabel — nach SPICE/HyperLynx</li>
                <li>Messung: VNA (NanoVNA günstig &lt;3 GHz)</li>
                <li>Hersteller-Touchstone-Modelle nutzen</li>
            </ul>

            <h3>📊 PDN-Impedanz</h3>
            <p>Ziel: Z &lt; Z_ziel = ΔU/ΔI über den gesamten Frequenzbereich</p>
            <ul>
                <li><strong>Frequenzsimulation:</strong> Jeder Kondensator mit ESR, ESL, C</li>
                <li>Anti-Resonanzen: SRF-Kollisionen → Impedanzspitzen</li>
                <li>Abhilfe: verschiedene SRFs mischen</li>
                <li>SIwave: ganze Platine inkl. Ebenen-Resonanzen</li>
                <li>SPICE: Leiternetz aus Bulk, MLCC, Ebeneninduktivität</li>
            </ul>

            <h3>🔁 Rückleiter / Masseführung</h3>
            <ul>
                <li><strong>Stitching-Vias:</strong> bei Lagenwechsel und um HF-Leitungen</li>
                <li>Abstand ≤ λ/20 der obersten Frequenz (1 GHz in FR-4 ≈ ≤15 mm)</li>
                <li><strong>Spalten in Versorgungsebenen:</strong> Signale orthogonal zur Spalte, nicht parallel</li>
                <li>100 pF (0402) über Spalten für HF-Rückstrom</li>
                <li><strong>Signal-Vias:</strong> nahes GND-Via für Referenz</li>
            </ul>

            <div class="visual-ref-links">
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=eye+diagram+signal+integrity+simulation+jitter&udm=2')">🔍 Ansehen: Augendiagramme</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=vector+network+analyzer+S+parameter+Smith+chart+PCB&udm=2')">📡 Ansehen: VNA & S-Parameter</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=PDN+target+impedance+plot+decoupling+capacitor&udm=2')">⚡ Ansehen: PDN-Impedanzkurven</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=TDR+time+domain+reflectometry+impedance+measurement+PCB&udm=2')">📷 Ansehen: TDR-Messung</button>
            </div>
        `,
        keyPoints: ['SI-Tools für Augendiagramm und PDN nutzen', 'TDR und S-Parameter interpretieren', 'Rückleiter systematisch führen und Masse vernähen']
    },
    {
        title: 'Fortgeschrittene Motor- und Leistungselektronik',
        content: `
            <h3>⚡ Vollständiger Wechselrichter / Servo-Treiber</h3>
            <p>Ein 3-Phasen-BLDC-Treiber ist oft die komplexeste Leistungsplatine in Robotik</p>
            <ul>
                <li><strong>3-Phasen-Brücke:</strong> 6× MOSFETs (je 2 pro Schenkel) als Halbbrücken</li>
                <li><strong>High-Side-Ansteuerung:</strong> Gate muss über der schwimmenden Source liegen</li>
                <li><strong>Bootstrap:</strong> Kondensator laden, wenn Low-Side ein; Energie für High-Side-Gate</li>
                <li>Diode schnell (Schottky, z. B. BAT54), Spannung &gt; Bus</li>
                <li>Mindest-Ein-Zeit für Refresh: typ. 1–3 µs (abhängig von C und Q_g)</li>
            </ul>

            <p><strong>Gate-Treiber (z. B. DRV8300, IR2136, IRS2003):</strong></p>
            <ul>
                <li>I_peak = Q_g / t_anstieg (Ziel oft 5–20 ns)</li>
                <li>Unterschiedliche Laufzeiten High/Low → Tastverzerrung — passende Treiber wählen</li>
                <li>Separate R_g_ein / R_g_aus — schnelles Ausschalten reduziert Shoot-Through</li>
                <li>UVLO: Abschaltung bei zu niedrigem Bootstrap — Schutz vor halber Ansteuerung</li>
            </ul>

            <h3>🔁 Schleifenfläche minimieren</h3>
            <p>Die Schaltkreisfläche (DC-Bus → MOSFET → Phase → Rückleiter) führt dI/dt</p>
            <ul>
                <li>Große Fläche → Streuinduktivität → Spannungsspitzen → EMI / Überlast</li>
                <li><strong>Layout:</strong> Bulk-Entkopplung maximal nahe Drain/Source (&lt;5 mm)</li>
                <li>Direkte Kupferfläche zwischen Cap und FETs</li>
                <li>Snubber (z. B. 10 Ω + 10 nF) über FET oder Bus-C</li>
                <li>Kelvin-Source: Leistungsrückleiter getrennt vom Gate-Rückleiter</li>
            </ul>

            <h3>📐 Strommessung für FOC</h3>
            <p>FOC braucht genaue Phasenströme</p>
            <ul>
                <li><strong>3-Shunt:</strong> je Low-Side-Source — genau, gleichzeitige ADC-Abtastung</li>
                <li><strong>1-Shunt (DC):</strong> günstiger, Phasen rekonstruieren</li>
                <li><strong>Isoliert:</strong> AMC1301 (±50 mV) für Hochspannung</li>
                <li>Shunt: 50–100 mV Vollast (Auflösung vs. Verlust)</li>
                <li>Kelvin direkt zum INA — keine Fremdströme auf den Messleitungen</li>
            </ul>

            <h3>🔋 BMS — Mehrzellen</h3>
            <p>Für 3S–7S Li-Ion-Packs:</p>
            <ul>
                <li><strong>Zell-IC:</strong> BQ76920 (3–5S), BQ76940 (9–15S) — Spannungen, Temperaturen</li>
                <li><strong>Schutz-FETs:</strong> zwei N-MOSFETs rückwärts im Minuspfad (CHG/DSG)</li>
                <li><strong>Balancing:</strong> passiv (Widerstände, Wärme) oder aktiv (Energieverschiebung)</li>
                <li><strong>SoC:</strong> Coulomb-Zählung + OCV-Kalibrierung</li>
                <li><strong>Fuel-Gauge:</strong> BQ27z561 — SoC, SoH, I²C zum MCU</li>
                <li>Layout: Sense direkt zum IC; CHG/DSG mit breiten Leitungen/Flächen</li>
            </ul>

            <div class="visual-ref-links">
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=3+phase+inverter+schematic+MOSFET+gate+driver+bootstrap&udm=2')">🔍 Ansehen: 3-Phasen-Wechselrichter</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=MOSFET+half+bridge+PCB+layout+minimize+switching+loop&udm=2')">🔄 Ansehen: Kompakte Schaltkreise</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=BQ76920+BMS+PCB+layout+Li+ion+battery+protection&udm=2')">🔋 Ansehen: BMS-Layouts</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=wireless+power+transfer+WPC+Qi+coil+PCB+design&udm=2')">📷 Ansehen: Drahtlose Energieübertragung</button>
            </div>
        `,
        keyPoints: ['3-Phasen-Brücken mit Bootstrap ansteuern', 'Schaltkreisfläche klein halten (EMI, Spitzen)', '3-Shunt-FOC sauber layouten']
    },
    {
        title: 'Komplexes Systemdesign',
        content: `
            <h3>🏛️ Mehrplatinen-Architekturen</h3>
            <p>Große Roboter und eingebettete Systeme verteilen Funktionen auf mehrere PCBs</p>
            
            <p><strong>Typische Aufteilung:</strong></p>
            <ul>
                <li><strong>Compute:</strong> SoC (iMX8, Jetson, RK3588) — Bild, Planung, High-Level</li>
                <li><strong>Echtzeit-Controller:</strong> STM32/DSP — Bewegung, PID, Sensorfusion</li>
                <li><strong>Power:</strong> BMS, Regler, Verteilung, Sicherungen</li>
                <li><strong>Aktoren:</strong> Motortreiber, Encoder — pro Gelenk oder Achse</li>
                <li><strong>Sensoren:</strong> IMU, Lidar, Kamera, Ultraschall — gebündelt und gefiltert</li>
            </ul>

            <p><strong>Kommunikation zwischen Boards:</strong></p>
            <ul>
                <li>CAN: robust, differentiell, Multi-Drop — bis 1 Mbit/s (CAN FD 5–8 Mbit/s)</li>
                <li>EtherCAT: deterministisches Ethernet &lt;1 ms — Industrieroboter</li>
                <li>RS-485: einfach, weite Strecken — langsamere Sensoren</li>
                <li>Hochgeschwindigkeit: LVDS, USB, PCIe — Kameras, breite Datenströme</li>
            </ul>

            <h3>⚡ Power Tree</h3>
            <p>Der Power Tree bildet jede Schiene, Quelle und Last ab</p>
            <ul>
                <li><strong>Zuerst zeichnen:</strong> vor dem Schaltplan</li>
                <li>Eingang, jeder Wandler, Ausgangsspannung, Maximalstrom, Lastliste</li>
                <li>Sequencing am Baum vermerken</li>
                <li>PGOOD/Enable als Verbindungen zwischen Knoten</li>
            </ul>

            <p><strong>Überwachung und Fehler:</strong></p>
            <ul>
                <li>Alle Schienen: MCU-ADC oder Supervisor (TPS3700)</li>
                <li>Fehler: UVLO, Überstrom, Übertemperatur → FAULT zum MCU</li>
                <li>Not-Aus: Relais/MOSFET schaltet Motoren unabhängig von Firmware</li>
                <li>Hot-Swap (LTC4412, TPS2490): Einstecken unter Last</li>
            </ul>

            <h3>🔗 Co-Design über Disziplinen</h3>
            <p>Hardware auf Expertenniveau nicht isoliert entwickeln</p>
            <ul>
                <li><strong>HW ↔ FW:</strong> Register, Interrupts, Boot-Pins, Speicher gemeinsam</li>
                <li><strong>HW ↔ Mechanik:</strong> Umschlag, Bohrungen, Stecker, Kühlung, Dämpfung</li>
                <li><strong>HW ↔ Fertigung:</strong> DFM mit Bestücker; lange Lieferzeiten früh klären</li>
                <li>ICD für elektrische Schnittstellen zwischen Boards</li>
                <li>Steckerbelegung vor erstem Spin mit allen abstimmen</li>
            </ul>

            <h3>📋 Backplane und Stecker</h3>
            <ul>
                <li><strong>Backplane:</strong> passiv, nur Verdrahtung — Aktiv auf Modulen</li>
                <li>Vorteile: modular, parallele Entwicklung, Test</li>
                <li>HS-Stecker: TE Z-Pack, Amphenol VHDM — mehrere Gbit/s</li>
                <li>Leistung: TE MTA, Molex Mini-Fit Jr.</li>
                <li>Backplane-Leitungen brauchen volle SI (Z, kurze Stubs)</li>
            </ul>

            <div class="visual-ref-links">
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=modular+robot+electronics+system+architecture+block+diagram&udm=2')">🔍 Ansehen: Systemarchitektur</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=CAN+bus+wiring+harness+robot+industrial+PCB+connector&udm=2')">🔌 Ansehen: CAN & Feldverdrahtung</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=EtherCAT+slave+industrial+robot+controller+PCB&udm=2')">🌐 Ansehen: EtherCAT-Hardware</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=power+tree+distribution+diagram+PCB+sequencing&udm=2')">📷 Ansehen: Power Trees</button>
            </div>
        `,
        keyPoints: ['Roboter in funktionale PCB-Subsysteme teilen', 'Power Trees inkl. Sequencing und Fehler', 'HW mit FW, Mechanik und Fertigung abstimmen']
    },
    {
        title: 'Fertigung, Lieferkette und Kosten',
        content: `
            <h3>🏭 DFM für konkrete Leiterplatten- und Bestückungswerke</h3>
            <p>Jeder Fertiger hat eigene Möglichkeiten — DFM ist nicht generisch</p>
            <ul>
                <li><strong>Früh einbinden:</strong> Gerber und Stückliste vor Layout-Abschluss zum Bestücker — Hinweise rechtzeitig</li>
                <li>Feinteil-QFN/BGA: Schablone und Reflow-Profil abklären</li>
                <li>0201: nicht überall bestückbar — vor Einplanung prüfen</li>
                <li>Selektivlöt- / Handbestück-Zonen in Zeichnungen kennzeichnen</li>
                <li><strong>Via-in-Pad:</strong> unter SMD gefüllt und durchkontaktiert — Fähigkeit und Aufpreis klären</li>
                <li>First Article vor Großserie anfordern</li>
            </ul>

            <h3>📦 Lebenszyklus der Bauteile</h3>
            <p>Lieferkettenrisiko ist echte Ingenieursarbeit — Obsoleszenz, lange Lieferzeiten, Nichtverfügbarkeit</p>
            <ul>
                <li><strong>Lifecycle prüfen:</strong> Octopart, IHS Haystack, SnapEDA — „NRND“, „Obsolete“</li>
                <li><strong>Zweitquelle:</strong> Alternativen für kritische Teile; Footprints flexibel halten</li>
                <li><strong>Lange Lieferzeit:</strong> FPGAs, Spezial-ICs — oft 26–52 Wochen; früh bestellen</li>
                <li><strong>Nur autorisierte Händler:</strong> Grauhandel vermeiden (Fälschungsrisiko bei ICs)</li>
                <li>„Preferred parts“-Bibliothek im Team pflegen</li>
            </ul>

            <h3>📐 Panelisierung und Ausbeute</h3>
            <ul>
                <li><strong>Panel:</strong> mehrere Boards → schnellere Bestückung, niedrigere Stückkosten</li>
                <li><strong>V-Nut:</strong> nur gerade; nach Bestückung brechen</li>
                <li><strong>Mouse-Bites:</strong> Perforation — auch unregelmäige Umrisse</li>
                <li>Fiducials: mindestens 3 pro Panel für Vision</li>
                <li>Werkzeuglöcher: z. B. 3,2 mm in Ecken für Transport</li>
                <li>Rand: z. B. 5 mm frei von Bauteilen</li>
                <li><strong>Ausbeute:</strong> enge Toleranzen und Komplexität senken sie — Kosten vs. Leistung</li>
            </ul>

            <h3>🔧 Austausch und Service vor Ort</h3>
            <p>Roboter im Feld fallen aus — reparierbar bauen</p>
            <ul>
                <li><strong>Modular:</strong> Motortreiber als Tochterkarte — ohne ganzes System tauschen</li>
                <li><strong>Stecker statt Löten:</strong> für Motoren, Sensoren im Feld</li>
                <li><strong>Sicherungen:</strong> oben, beschriftet, ohne Demontage erreichbar</li>
                <li><strong>Silkscreen:</strong> alle Stecker klar (Polarität, Spannung)</li>
                <li><strong>Ersatzteilkasten:</strong> Sicherungen, TVS, häufige Schwachstellen definieren</li>
            </ul>

            <h3>💰 Kostenengineering</h3>
            <ul>
                <li>Stückliste dominiert bei Volumen oft die Kosten</li>
                <li><strong>Senken:</strong> Gehäuse vereinheitlichen (0402 statt 0201), Lagenzahl, Funktionen in einem IC</li>
                <li>NRE: Werkzeuge, Schablonen, Rüsten — über Stückzahl verteilen</li>
                <li>Zielkosten aus Systemvorgaben → BOM top-down steuern</li>
                <li>Kleinserie: LCSC/JLCPCB; Volumen: CM evaluieren</li>
            </ul>

            <div class="visual-ref-links">
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=PCB+SMT+assembly+line+pick+and+place+machine+factory&udm=2')">🔍 Ansehen: Bestückungslinien</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=PCB+panelization+fiducial+mouse+bite+V-score&udm=2')">📐 Ansehen: Panel & Fiducials</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=solder+paste+stencil+aperture+QFN+BGA+design&udm=2')">🖼️ Ansehen: Lötpasten-Schablone</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=electronics+BOM+bill+of+materials+cost+optimization&udm=2')">📷 Ansehen: Stücklisten-Management</button>
            </div>
        `,
        keyPoints: ['Bestücker früh für DFM einbinden', 'Lifecycle und Zweitquellen managen', 'Feld-Service bei Robotik-Einsatz mitdenken']
    },
    {
        title: 'Führung und Architektur',
        content: `
            <h3>🏗️ Von Anforderungen zur Hardware-Architektur</h3>
            <p>Experten starten bei Systemanforderungen, nicht bei Bauteilen</p>
            <ul>
                <li><strong>Erfassen:</strong> Leistungsbudget, Schnittstellen, Umgebung (Temp, Vibration, IP), Zuverlässigkeit, Kosten</li>
                <li><strong>Architektur:</strong> Anzahl Boards, Aufteilungsbegründung, Verbindungen, Versorgungsstrategie</li>
                <li>Hardware Requirements Specification (HRS) — eine gemeinsame Wahrheit</li>
                <li>Rückverfolgbarkeit: jede Entscheidung zu einer Anforderung</li>
                <li>Architektur mit FW, Mechanik, Test vor Schaltplan abstimmen</li>
            </ul>

            <h3>🔍 Schaltplan- und Layout-Reviews</h3>
            <p>Fremd- und Eigenreview sind hohe Hebelwirkung</p>
            <p><strong>Schaltplan-Checkliste:</strong></p>
            <ul>
                <li>Versorgung: Entkopplung, Sequencing, Schutz</li>
                <li>MCU/FPGA: Boot, Reset, Bypass, Programmierheader</li>
                <li>Kommunikation: Terminierung, ESD, Pegelwandler-Richtung</li>
                <li>Analog: Vorspannung, Anti-Aliasing, Masse</li>
                <li>Stückliste: verfügbar, keine NRND/Obsolet ohne Alternative</li>
            </ul>

            <p><strong>Layout-Checkliste:</strong></p>
            <ul>
                <li>Entkopplung direkt an Versorgungspins, Via zur Masse</li>
                <li>Rückleiter: keine Masse-Spalten unter kritischen Signalen, genug Stitching</li>
                <li>Differenzpaare: Länge, Z, keine Stubs</li>
                <li>Leistungsleitungen: Breite nach IPC-2152, Thermovias unter heißen Teilen</li>
                <li>Silkscreen: Stecker, Polarität, Referenzen lesbar</li>
                <li>Prüfpunkte für kritische Signale</li>
            </ul>

            <h3>📝 Design Guides und interne Standards</h3>
            <ul>
                <li>Teamregeln: bevorzugte Teile, Schaltkonventionen, Layernamen, Footprint-Politik</li>
                <li>Lebendes Dokument — nach jedem Learning aktualisieren</li>
                <li>Schaltplan-, Layout-, Bring-up-, Fab-Checklisten einbinden</li>
                <li>Onboarding: schneller produktionsreife Designs liefern</li>
            </ul>

            <h3>🗣️ Kommunikation über Disziplinen</h3>
            <p>Hardware-Experten übersetzen zwischen Domänen</p>
            <ul>
                <li><strong>Zur Firmware:</strong> Pin-Fähigkeiten (5V-tolerant? Open-Drain?), Interrupt-Latenz, Ein-Zeitfenster</li>
                <li><strong>Zur Mechanik:</strong> Umschlag, Keep-out, Thermik, Steifigkeit</li>
                <li><strong>Zur Führung:</strong> Risiko in Kosten: „TVS weglassen spart 0,15 €/Stück, erhöht Rückrufrisiko“</li>
                <li>Jargon nach außen vermeiden — Wirkung formulieren</li>
            </ul>

            <h3>📋 Hardware-Checkliste aufbauen</h3>
            <p>Systematische Listen verhindern teure Fehler</p>
            <ul>
                <li><strong>Schaltplan:</strong> Schienen, MCU-Minimalschaltung, Schnittstellen, Schutz</li>
                <li><strong>Layout:</strong> Entkopplung, Rückleiter, Paare, Hochstrom, DRC sauber</li>
                <li><strong>Fab:</strong> Gerber geprüft, Bohrdatei, Stackup, Notizen</li>
                <li><strong>Bring-up:</strong> strombegrenzte PSU, Schienen, Takt, Programmierer, Peripherie nacheinander</li>
                <li><strong>Validierung:</strong> alle Specs gegen Anforderungen, Verbrauch, Thermik</li>
                <li>Checkliste versionieren (Git) — Teil des Engineering-Produkts</li>
            </ul>

            <div class="visual-ref-links">
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=hardware+design+review+checklist+schematic+review&udm=2')">🔍 Ansehen: Design Reviews</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=embedded+system+hardware+architecture+block+diagram&udm=2')">🏗️ Ansehen: Architekturdiagramme</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=NPI+stage+gate+review+hardware+development+process&udm=2')">📋 Ansehen: NPI-Stage-Gates</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=hardware+project+Gantt+chart+NPI+product+development&udm=2')">📷 Ansehen: HW-Projektplanung</button>
            </div>
        `,
        keyPoints: ['Hardware-Architektur aus Systemanforderungen ableiten', 'Strukturierte Schaltplan- und Layout-Reviews führen', 'Lebendige Checklisten aus Erfahrung pflegen']
    },
    {
        title: 'Flaggschiff-Projekte',
        content: `
            <h3>🤖 Projekt 1: Vollständiger autonomer Roboter — alle Boards von Grund auf</h3>
            <p><strong>Entwerfen, fertigen, in Betrieb nehmen und Firmware auf allen PCBs eines kompletten Roboters</strong></p>
            <ul>
                <li><strong>Compute:</strong> SoC-Träger (CM4 oder Jetson Nano) — CSI, USB, Ethernet, SD, M.2</li>
                <li><strong>Bewegungssteuerung:</strong> STM32H7 — Encoder, FOC, CAN, IMU, Safety-Watchdog</li>
                <li><strong>Stromverteilung:</strong> 4S LiPo, BMS, mehrere DC/DC (24 V, 12 V, 5 V, 3,3 V), Stromüberwachung</li>
                <li><strong>Aktoren:</strong> 3-Phasen-Treiber pro Gelenk/Rad — über CAN verkettet</li>
            </ul>

            <p><strong>Ablauf:</strong></p>
            <ul>
                <li>HRS → Architektur → Schaltplan → Layout → Fab → Bring-up → Validierung</li>
                <li>SI bei HS-Schnittstellen; Thermik bei Leistungsstufen</li>
                <li>Bring-up-Prozedur vor Anlieferung; alle Prüfpunkte gesetzt und beschriftet</li>
                <li>Gesamtprojekt in Git: KiCad/Altium, BOM, Doku, Firmware</li>
            </ul>

            <h3>🛡️ Projekt 2: Formaler EMC- oder Safety-Review-Zyklus</h3>
            <p><strong>EMC oder funktionale Sicherheit an einem echten Produkt durchziehen</strong></p>
            <ul>
                <li><strong>EMC Vorab:</strong> Nahfeldsonde + Spektrumanalysator → Emissionsquellen → Layout-Iteration</li>
                <li><strong>Formaler EMC-Test:</strong> abgestrahlte Störungen (EN 55032), ESD (IEC 61000-4-2), leitungsgebunden</li>
                <li><strong>Funktionale Sicherheit:</strong> FMEA am sicherheitsrelevanten Teil; Diagnoseabdeckung; Watchdog und Safe State</li>
                <li>Jede Änderung dokumentieren: Bericht → Designänderung → erneuter Test</li>
                <li><strong>Nutzen:</strong> Kompromisse, die erst unter Prüfbedingungen sichtbar werden</li>
            </ul>

            <h3>🌐 Projekt 3: Open-Source-Robotics-MCU-Referenzplattform</h3>
            <p><strong>Steuerplatine, die andere nutzen und erweitern können</strong></p>
            <ul>
                <li>STM32H7 oder RP2040, vollständig offen (KiCad, Gerber, BOM auf GitHub)</li>
                <li>Peripherie über beschriftete Stecker und Silkscreen dokumentiert</li>
                <li>Reproduzierbar: LCSC/DigiKey, keine exotischen/NDA-Teile</li>
                <li>Hardware-User-Guide: Bring-up, Pin-Tabelle, Schaltplanerklärung</li>
                <li>Community: Release, Issues, Iteration — Kommunikationskompetenz</li>
            </ul>

            <h3>🏭 Projekt 4: Idee bis Kleinserie</h3>
            <p><strong>Vollständiges NPI und First-Article</strong></p>
            <ul>
                <li><strong>DFM mit Bestücker:</strong> Gerber + BOM + Montagezeichnung → Feedback ins Layout</li>
                <li><strong>Schablone:</strong> Pastenöffnungen für feine QFN/BGA prüfen</li>
                <li><strong>NPI-Paket:</strong> Gerber, Bohrung, CPL, BOM mit Herstellernummern, Montagehinweise</li>
                <li><strong>First Article:</strong> AOI, Röntgen BGA/QFN, Funktionstest Erstmuster</li>
                <li><strong>Serientest:</strong> automatisiertes Skript; klare Pass/Fail pro ausgelieferter Platine</li>
                <li>Delta-Log vom Prototyp zur Serie</li>
            </ul>

            <h3>🎯 Level-4-Meisterkriterien</h3>
            <p>Expertenniveau, wenn du:</p>
            <ul>
                <li>ein Mehrplatinen-Roboter-System aus Anforderungen architekturierst und Aufteilungen begründest</li>
                <li>SI/PI vor der Fab simulierst und verifizierst</li>
                <li>formale Schaltplan-/Layout-Reviews mit Checkliste leitest oder mitmachst</li>
                <li>eine Platine durch EMC-Vorab bringst und Mängel behebst</li>
                <li>Level 1–3 einem Junior klar und korrekt erklärst</li>
                <li>Bauteilkosten schätzt und Design-for-Cost sicher abwägst</li>
                <li>den kompletten NPI-Zyklus bis Serientest managst</li>
            </ul>

            <h3>📋 Planung: BOM-Budget und Zeit</h3>
            <p><strong>Typisches BOM-Budget mobiler Roboter (Prototyp, USD):</strong></p>
            <ul>
                <li><strong>Compute:</strong> 80–150 $ (CM4 + Träger + Stecker)</li>
                <li><strong>Motion:</strong> 30–60 $ (STM32H7 + Quarze + Stecker + Passiv)</li>
                <li><strong>Power:</strong> 40–80 $ (BMS + FETs + Wandler + Kondensatoren)</li>
                <li><strong>Pro Aktor:</strong> 15–35 $ (Treiber + 6× FET + Strommessung + Entkopplung)</li>
                <li><strong>PCB-Fertigung:</strong> 50–200 $ pro Design (4–6 Lagen, 5 Stk., JLCPCB/PCBWay)</li>
                <li><strong>Bestückung:</strong> 100–300 $ extern; DIY spart Geld, kostet Zeit</li>
            </ul>

            <p><strong>Zeitrahmen 4-Board-System (erfahrener Ingenieur):</strong></p>
            <ul>
                <li>Anforderungen + Architektur: 1–2 Wochen</li>
                <li>Schaltplan alle Boards: 2–3 Wochen</li>
                <li>Layout + Review: 2–4 Wochen</li>
                <li>Fab + Bestückung: 2–3 Wochen</li>
                <li>Bring-up + Debug: 2–4 Wochen</li>
                <li><strong>Gesamt: 9–16 Wochen</strong> bis erster funktionsfähiger Prototyp</li>
            </ul>

            <h3>⚠️ Typische Herausforderungen</h3>
            <ul>
                <li><strong>Teilemangel:</strong> kritisches Bauteil ausverkauft — immer Alternativen</li>
                <li><strong>Layout-Iterationen:</strong> erster Entwurf selten DRC+SI sauber — zwei Runden einplanen</li>
                <li><strong>Bring-up:</strong> mindestens eine Platine braucht Nacharbeit oder Draht</li>
                <li><strong>EMC:</strong> motorisierte Roboter fast immer EMC-Runden — Vorab einplanen</li>
                <li><strong>Thermik:</strong> Leistungsstufen heißer als gedacht — früh messen, Kühlung</li>
            </ul>

            <h3>🚀 Nach Level 4?</h3>
            <ul>
                <li><strong>Principal / Staff:</strong> organisationsweite Architektur, Mentoring</li>
                <li><strong>Spezialisierung:</strong> GHz-SI-Beratung, zertifizierte Functional Safety (TÜV), Forschung Leistungselektronik</li>
                <li><strong>Gründung:</strong> Hardware-Startup — Design-to-Production als Vorteil</li>
                <li><strong>Weiterlernen:</strong> IEEE, Konferenzen (DesignCon, PCIM, …), Hersteller-Seminare</li>
            </ul>

            <div class="visual-ref-links">
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=autonomous+robot+PCB+complete+electronics+custom+board&udm=2')">🔍 Ansehen: Robotik-Boards</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=EMC+semi+anechoic+chamber+radiated+emissions+test&udm=2')">📡 Ansehen: EMC-Prüfräume</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=open+source+robot+controller+KiCad+GitHub+hardware&udm=2')">🌐 Ansehen: Open-HW-Robotik</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=electronics+product+development+prototype+to+production&udm=2')">📷 Ansehen: Prototyp → Serie</button>
            </div>
        `,
        keyPoints: ['Komplettes autonomes Robotik-Hardware-Set von Grund auf', 'Formalen EMC- oder Safety-Zyklus durchführen', 'Vollständiges NPI und Serientest leiten']
    }
]);
