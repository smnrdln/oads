i18n.registerContent('de', 'level3', [
    {
        title: 'Fortgeschrittenes Analog- und Mixed-Signal-Design',
        content: `
            <h3>🎯 Präzisions-Signalketten-Design</h3>
            <p>Eine Signalkette ist der Weg vom Sensor zum ADC. Jede Stufe muss sorgfältig ausgelegt werden.</p>
            <ul>
                <li><strong>Verstärkungsstufen:</strong> Rohe Sensorsignale auf den ADC-Eingangsbereich anheben</li>
                <li><strong>Filterung:</strong> Anti-Aliasing-Tiefpass vor dem ADC (f_c &lt; f_sample / 2)</li>
                <li><strong>Rauschbudget:</strong> Rauschbeitrag je Stufe zuweisen; Gesamtrauschen = √(V_n1² + V_n2² + ...)</li>
                <li><strong>OP-Amp-Auswahl:</strong> Eingangs-Spannungsrauschen (nV/√Hz) und Stromrauschen (pA/√Hz) passend zur Impedanz wählen</li>
            </ul>

            <h3>🤫 Rauscharme PCB-Layout-Regeln</h3>
            <p><strong>Analog-Insel:</strong> Alle Analogbauteile in einer dedizierten Zone zusammenfassen</p>
            <ul>
                <li>Durchgehende analoge Massefläche darunter (keine digitalen Leitungen kreuzen)</li>
                <li>Rückströme müssen lokal im Analogbereich bleiben</li>
                <li>Empfindliche Leitungen mit Guard-Ringen (mit stiller Masse verbunden) abschirmen</li>
                <li>Leitungslängen für hochohmige Knoten minimieren (wirken als Antenne)</li>
            </ul>

            <p><strong>Stille-Masse-Strategie:</strong></p>
            <ul>
                <li>Durchgehende Massefläche ohne willkürliche Schlitze verwenden</li>
                <li>Analog-Digital-Masseverbindung an einem einzelnen Punkt (Sternpunkt)</li>
                <li>Ferritperle zwischen AGND und DGND zum Blockieren von HF-Rauschkopplung</li>
            </ul>

            <h3>⚡ Strommessverfahren</h3>
            <p><strong>Shunt-Widerstand + INA:</strong> Am häufigsten in der Robotik</p>
            <ul>
                <li>Low-Side-Shunt: Einfach, aber Masse verschoben (OK für nicht-isolierte Systeme)</li>
                <li>High-Side-Shunt: INA (INA219, INA226) für Strom- und Leistungsmessung</li>
                <li>Shunt-Wert: R so wählen, dass Volllaststrom → ~100 mV Differenz ergibt</li>
                <li>Kelvin-Sensing: Sense-Leitungen direkt von Shunt-Pad-Kanten führen, nicht von Vias</li>
            </ul>

            <p><strong>Hall-Effekt-Stromsensoren:</strong></p>
            <ul>
                <li>ACS712, ACS758 — integrierter Hall-Sensor + Aufbereitung</li>
                <li>Galvanisch isoliert: PCB-Stromschiene führt durch den Sensorkörper</li>
                <li>Empfindlichkeit: 66–185 mV/A je nach Variante</li>
            </ul>

            <h3>🤖 Motorgeberfeedback-Hardware</h3>
            <ul>
                <li>A/B-Kanäle 90° versetzt → Richtung und Position</li>
                <li>10 nF + 1 kΩ RC-Entprellung auf jedem Kanal</li>
                <li>Hardware-Timer im Encoder-Mode (STM32 TIM_EncoderMode)</li>
                <li>Für lange Kabel: RS-422 differenziell (26LS31 Treiber + 26LS32 Empfänger)</li>
            </ul>

            <div class="visual-ref-links">
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=precision+signal+chain+sensor+ADC+diagram&udm=2')">🔍 Ansehen: Signalketten-Design</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=Kelvin+4+wire+sense+shunt+resistor+layout&udm=2')">📐 Ansehen: Kelvin-Messung</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=sigma+delta+ADC+noise+oversampling+diagram&udm=2')">📊 Ansehen: Delta-Sigma-ADC</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=ACS712+hall+effect+current+sensor+module+PCB&udm=2')">📷 Ansehen: Stromsensoren</button>
            </div>
        `,
        keyPoints: ['Mixed-Signal-Design verlangt gleichzeitig Schaltungs- und Layoutdisziplin', 'Strommessung per Shunt braucht Kelvin-Sensing für Genauigkeit', 'Rauscharmes Layout beginnt mit der Analog-Insel-Konzeption'],
        relatedTopics: [{ level: 'level2', index: 0, label: 'Vertiefte Analogelektronik' }, { level: 'level3', index: 1, label: 'Signalintegrität (SI) für Embedded-Systeme' }]
    },
    {
        title: 'Signalintegrität (SI) für Embedded-Systeme',
        content: `
            <h3>📡 Wann Leitungslänge relevant wird</h3>
            <p><strong>Faustregel:</strong> Leiterbahn als Übertragungsleitung behandeln, wenn Länge &gt; λ/10</p>
            <ul>
                <li>Flankensteilheit (nicht Frequenz) entscheidet, wann SI relevant wird</li>
                <li>Bei 1 ns Anstiegszeit: kritische Länge ≈ 15 mm (in FR-4, ε_r ≈ 4)</li>
                <li>Formel: λ = c / (f × √ε_r), kritische Länge = λ / 10</li>
                <li>USB-HS (480 Mbit/s), QSPI (80 MHz+), SDIO — alle erfordern SI-Aufmerksamkeit</li>
            </ul>

            <h3>📏 Kontrollierte Impedanz</h3>
            <p><strong>Microstrip (äußere Lage):</strong> Leiterbahn auf Oberfläche über Massefläche</p>
            <ul>
                <li>Z₀ ≈ 50 Ω (single-ended) oder 100 Ω (differenziell) als typische Zielwerte</li>
                <li>Z₀ hängt ab von: Leiterbahnbreite (W), Dielektrikumshöhe (H), Kupferdicke (T)</li>
                <li>PCB-Impedanzrechner verwenden (Saturn PCB, Altiums Online-Tool, Hersteller-Rechner)</li>
            </ul>

            <p><strong>Stripline (innere Lagen):</strong> Leiterbahn zwischen zwei Masseflächen eingebettet</p>
            <ul>
                <li>Bessere EMI-Abschirmung als Microstrip</li>
                <li>Für RF, GHz-Signale, differenzielle Paare auf inneren Lagen</li>
            </ul>

            <p><strong>Angabe an den Hersteller:</strong></p>
            <ul>
                <li>Impedanzhinweis in Fertigungsnotizen: „Lage 1: 50 Ω ±10 % Microstrip, W=0,2 mm"</li>
                <li>JLC, PCBWay bieten impedanzkontrollierten Service — deren Stackup-Rechner nutzen</li>
            </ul>

            <h3>🔀 Differenzpaar-Routing</h3>
            <p>Für: USB, CAN, RS-485, LVDS, Ethernet, HDMI</p>
            <ul>
                <li><strong>Längenabgleich:</strong> P- und N-Leitungen auf ±0,1 mm angleichen</li>
                <li><strong>Kopplung:</strong> Paar eng zusammenrouten (Abstand = 2× Leiterbahnbreite)</li>
                <li><strong>Gleichtaktunterdrückung:</strong> Jede Längenabweichung wird zum Rausch-Signal-Wandler</li>
                <li><strong>KiCad:</strong> Differenzpaar-Router (Strg+5), Abstand und Breite in den Router-Einstellungen</li>
            </ul>

            <h3>⚠️ SI-Probleme und Lösungen</h3>
            <table style="width:100%; border-collapse:collapse; font-size:0.95em; margin-top:8px;">
                <tr style="background:#1e293b"><th style="padding:6px; border:1px solid #334155">Problem</th><th style="padding:6px; border:1px solid #334155">Ursache</th><th style="padding:6px; border:1px solid #334155">Lösung</th></tr>
                <tr><td style="padding:5px; border:1px solid #334155">Reflexionen</td><td style="padding:5px; border:1px solid #334155">Impedanzsprung am Leitungsende</td><td style="padding:5px; border:1px solid #334155">Serienterminierung (33–50 Ω) an der Quelle</td></tr>
                <tr><td style="padding:5px; border:1px solid #334155">Überschwingen</td><td style="padding:5px; border:1px solid #334155">Nicht terminierter Stub oder Via-Resonanz</td><td style="padding:5px; border:1px solid #334155">Stubs entfernen, Vias rückbohren</td></tr>
                <tr><td style="padding:5px; border:1px solid #334155">Übersprechen</td><td style="padding:5px; border:1px solid #334155">Parallele Leitungen zu dicht beieinander</td><td style="padding:5px; border:1px solid #334155">3W-Regel: Abstand = 3× Leiterbahnbreite</td></tr>
                <tr><td style="padding:5px; border:1px solid #334155">Masseprellen</td><td style="padding:5px; border:1px solid #334155">Induktivität im Versorgungs-/Massepfad</td><td style="padding:5px; border:1px solid #334155">Je IC entkoppeln, Rückstrompfade verkürzen</td></tr>
            </table>

            <div class="visual-ref-links">
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=transmission+line+impedance+matching+reflection+diagram&udm=2')">🔍 Ansehen: Übertragungsleitungen</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=eye+diagram+jitter+signal+integrity+oscilloscope&udm=2')">👁️ Ansehen: Augendiagramme</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=PCB+crosstalk+3W+rule+parallel+traces&udm=2')">〰️ Ansehen: Übersprechen / Abstand</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=controlled+impedance+PCB+trace+microstrip+stripline&udm=2')">📷 Ansehen: Impedanzkontrolle</button>
            </div>
        `,
        keyPoints: ['Übertragungsleitungsregeln bei schnellen Flankenzeiten anwenden', 'Kontrollierte Impedanz mit Stackup-Geometrie berechnen und beim Hersteller spezifizieren', 'Reflexionen, Übersprechen und Stubs im Layout systematisch beseitigen'],
        relatedTopics: [{ level: 'level2', index: 5, label: 'PCB-Layout-Techniken für Fortgeschrittene' }, { level: 'level3', index: 4, label: 'Fortgeschrittene PCB-Stackups und Materialien' }]
    },
    {
        title: 'Power Integrity und fortgeschrittenes Versorgungsdesign',
        content: `
            <h3>🏗️ PDN — Power Distribution Network</h3>
            <p>Das PDN ist alles zwischen der Spannungsquelle und jedem IC-Versorgungspin. Ziel: <strong>niedrige Impedanz über alle Frequenzen</strong>.</p>
            <ul>
                <li><strong>DC-Widerstand:</strong> Breite Leiterbahnen und Kupferflächen → geringer Spannungsabfall unter Last</li>
                <li><strong>Mittelfrequenz (1 kHz–100 MHz):</strong> Bulk- und Keramikkondensatoren als Ladungsreservoir</li>
                <li><strong>Hochfrequenz (&gt;100 MHz):</strong> On-Die-Kondensatoren und enges PCB-Decoupling</li>
                <li><strong>Ziel-PDN-Impedanz:</strong> Z_target = ΔV / ΔI (z. B. 10 mV Ripple bei 1 A Transient → 10 mΩ)</li>
            </ul>

            <h3>🔋 Entkopplungsstrategie nach Frequenz</h3>
            <p><strong>Stufe 1: Bulk-Elektrolyt (1–100 µF)</strong></p>
            <ul>
                <li>Deckt langsame Transienten ab (Motoranlauf, Prozessor-Wakeup)</li>
                <li>Am Versorgungseingang der Platine platzieren; niedriger ESR bevorzugt</li>
            </ul>

            <p><strong>Stufe 2: MLCC Keramik (100 nF–10 µF)</strong></p>
            <ul>
                <li>Entkoppelt mittlere Schaltfrequenzen; &lt; 2 mm von jedem IC-VCC-Pin</li>
                <li>X5R/X7R-Dielektrikum (temperaturstabil); 0402 oder 0603</li>
            </ul>

            <p><strong>Stufe 3: Kleine Keramik (10–100 nF)</strong></p>
            <ul>
                <li>GHz-Schalten in schnellen digitalen ICs; Via direkt vom Kondensatorpad zur Massefläche</li>
            </ul>

            <h3>⏱️ Power-Sequencing</h3>
            <p>Viele Systeme (MCU + FPGA + Peripherie) erfordern definierte Startreihenfolge der Rails</p>
            <ul>
                <li><strong>Warum wichtig:</strong> Latch-up, Datenfehler oder Bauteilschäden bei falscher Reihenfolge</li>
                <li><strong>FPGA-Beispiel:</strong> VCCINT zuerst, dann VCCIO, dann Konfigurationspins</li>
                <li><strong>Implementierung:</strong> Enable-Pin des DC-DC → verzögertes RC + Komparator, oder Sequencer-IC (TPS3702)</li>
                <li><strong>Power-Good-Signale:</strong> PGOOD-Ausgänge der Regler zum Freischalten nachfolgender Rails nutzen</li>
            </ul>

            <h3>🤖 Leistungshalbleiter-Stufen für Motorantriebe</h3>
            <ul>
                <li>Gate-Widerstand R_g steuert Schaltgeschwindigkeit (kleiner = schneller, mehr EMI)</li>
                <li>Gate-Treiber-IC (DRV8300, IR2104): High/Low-Side-Bootstrap, Shoot-Through-Schutz</li>
                <li><strong>Dead-Time:</strong> Kurze Pause zwischen High-Side-Aus und Low-Side-Ein; typisch 50–200 ns</li>
                <li>Schaltschleife minimieren: Bulk-Kondensator direkt über VCC-GND der Halbbrücke (&lt; 5 mm)</li>
                <li>Kelvin-Verbindung für Gate-Treiber-Masse (getrennt von Leistungsmasse)</li>
                <li>Thermische Vias unter Leistungs-FETs: 0,3 mm Durchmesser, 1,2 mm Raster</li>
            </ul>

            <h3>🌡️ Thermisches Design auf dem PCB</h3>
            <ul>
                <li>T_junction = T_ambient + P_dissipiert × (θ_JC + θ_CS + θ_SA)</li>
                <li>θ_JC: Junction-to-Case (aus Datenblatt) | θ_SA: Kühlkörper-zu-Umgebung</li>
                <li>EP-Bauteile: 9–16 Thermovias 0,3 mm unter dem Pad, Kupferfläche auf Unterseite</li>
                <li>2-oz-Kupfer auf Leistungslagen reduziert Wärmewiderstand signifikant</li>
            </ul>

            <div class="visual-ref-links">
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=power+delivery+network+PDN+impedance+decoupling+capacitor+PCB&udm=2')">🔍 Ansehen: PDN-Design</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=MLCC+capacitor+ESR+ESL+SRF+impedance+curve&udm=2')">📊 Ansehen: Kondensator-Impedanz</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=via+inductance+power+plane+PCB+simulation&udm=2')">🔌 Ansehen: Via-Induktivität</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=buck+converter+PCB+layout+switching+regulator+thermal&udm=2')">📷 Ansehen: Schaltregler-Layouts</button>
            </div>
        `,
        keyPoints: ['Niederimpedantes PDN über alle Frequenzbereiche auslegen', 'Mehrstufige Entkopplungsstrategie mit Bulk-, MLCC- und Feinkondensatoren', 'Thermische Budgets für Leistungskomponenten berechnen'],
        relatedTopics: [{ level: 'level2', index: 2, label: 'Leistungselektronik für Embedded und Robotik' }, { level: 'level3', index: 1, label: 'Signalintegrität (SI) für Embedded-Systeme' }]
    },
    {
        title: 'FPGA- und SoC-Hardwaredesign',
        content: `
            <h3>🔷 FPGA Mindestbeschaltung</h3>
            <p><strong>Versorgungsrails (Xilinx Artix-7 / Lattice ECP5 Beispiel):</strong></p>
            <ul>
                <li>VCCINT: Kernspannung (1,0–1,2 V) — kritischste Rail, niedrigste Rauschtoleranz</li>
                <li>VCCIO (pro Bank): I/O-Spannung (1,8 V, 2,5 V oder 3,3 V je nach Bank/Standard)</li>
                <li>AVCC / VCCAUX: Analogversorgung für PLLs (typisch 1,8 V), muss sehr sauber sein</li>
            </ul>

            <p><strong>Konfigurations-Flash:</strong></p>
            <ul>
                <li>SPI-NOR-Flash speichert Bitstream (W25Q16, S25FL064P)</li>
                <li>Verbindung zu FPGA-CCLK, DIN, DOUT, CSn-Pins</li>
                <li>JTAG-Kette: FPGA TDI → TDO → Debug-Header</li>
                <li>DONE-Pin: Signalisiert erfolgreiche Konfiguration; LED zur visuellen Bestätigung</li>
            </ul>

            <h3>🏦 Bank-Versorgung und I/O-Standard-Abgleich</h3>
            <p>Jede I/O-Bank muss mit der korrekten VCCIO-Spannung versorgt werden:</p>
            <ul>
                <li>LVCMOS33: VCCIO = 3,3 V | LVCMOS18: VCCIO = 1,8 V</li>
                <li>SSTL15 (DDR3): VCCIO = 1,5 V, VREF = VCCIO/2</li>
                <li>LVDS: VCCIO = 2,5 V, kein VREF nötig</li>
                <li><strong>Kritische Regel:</strong> Alle Signale einer Bank müssen kompatible I/O-Standards verwenden</li>
            </ul>

            <h3>💾 DDR-Speicher-Routing</h3>
            <p><strong>Adress-/Befehlsbus:</strong></p>
            <ul>
                <li>Fly-by-Topologie: Daisy-Chain vom Controller durch jeden DRAM, Terminierung am Ende</li>
                <li>Alle Adressleitungen auf ±25 mil Länge abgleichen</li>
                <li>Serienterminierung an der Quelle (22–33 Ω)</li>
            </ul>

            <p><strong>Datenbus (je Byte-Lane):</strong></p>
            <ul>
                <li>DQ-Leitungen auf ±10 mil von DQS (Data-Strobe) der jeweiligen Byte-Lane abgleichen</li>
                <li>Differenzielles DQS-Paar: 100 Ω Impedanz, max. 5 mil Intra-Paar-Versatz</li>
                <li>DRAM so nah wie möglich am FPGA/SoC platzieren</li>
            </ul>

            <h3>💡 SoC-Trägerplatinen-Design-Tipps</h3>
            <p>Für Rechenmodule (iMX8, AM335x, CM4):</p>
            <ul>
                <li>Modulstecker-Pinbelegung als Gesetz behandeln — niemals modifizieren</li>
                <li>Board-to-Board-Stecker: Hirose DF40, Samtec BTE</li>
                <li>USB, Ethernet, HDMI: nach SI-Regeln routen (impedanzkontrolliert, abgeglichene Paare)</li>
                <li>Debug: UART-Konsole, JTAG, eMMC-Boot-Schalter immer herausführen</li>
            </ul>

            <div class="visual-ref-links">
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=FPGA+SoC+PCB+design+BGA+fanout+DDR+routing&udm=2')">🔍 Ansehen: FPGA/SoC-Boards</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=BGA+fanout+via+in+pad+dogbone+PCB&udm=2')">🧩 Ansehen: BGA-Fanout</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=PCIe+differential+pair+routing+PCB+layout&udm=2')">🔌 Ansehen: PCIe-Routing</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=DDR4+memory+length+matching+serpentine+routing+PCB&udm=2')">📷 Ansehen: DDR-Routing</button>
            </div>
        `,
        keyPoints: ['FPGA-Mindestbeschaltung mit korrekter Power-Sequenzierung auslegen', 'DDR-Speicher mit Längenabgleich und Fly-by-Topologie routen', 'I/O-Bank-Spannungen korrekt zuweisen'],
        relatedTopics: [{ level: 'level2', index: 1, label: 'Digitalelektronik für Fortgeschrittene' }, { level: 'level3', index: 1, label: 'Signalintegrität (SI) für Embedded-Systeme' }]
    },
    {
        title: 'Fortgeschrittene PCB-Stackups und Materialien',
        content: `
            <h3>📚 Stackup-Design für kontrollierte Impedanz</h3>
            <p><strong>Standard 4-Lagen (Signal – GND – PWR – Signal):</strong></p>
            <ul>
                <li>L1: Obere Signallage | L2: Massefläche | L3: Versorgungsfläche | L4: Untere Signallage</li>
                <li>Kern (L2–L3): 1,2 mm; Prepreg (L1–L2, L3–L4): 0,2 mm typisch</li>
            </ul>

            <p><strong>6-Lagen (für komplexe MCU/FPGA-Boards):</strong></p>
            <ul>
                <li>L1: Oben | L2: GND | L3: Signal | L4: Signal | L5: GND | L6: Unten</li>
                <li>Zwei Masseflächen für bessere Schirmung bei DDR, USB-HS, CAN + Analog</li>
            </ul>

            <h3>🧪 Materialauswahl</h3>
            <table style="width:100%; border-collapse:collapse; font-size:0.9em; margin-top:8px;">
                <tr style="background:#1e293b"><th style="padding:6px; border:1px solid #334155">Material</th><th style="padding:6px; border:1px solid #334155">Dk (ε_r)</th><th style="padding:6px; border:1px solid #334155">Df (Verlustfaktor)</th><th style="padding:6px; border:1px solid #334155">Anwendungsfall</th></tr>
                <tr><td style="padding:5px; border:1px solid #334155">FR-4 (Standard)</td><td style="padding:5px; border:1px solid #334155">4,0–4,8</td><td style="padding:5px; border:1px solid #334155">0,02</td><td style="padding:5px; border:1px solid #334155">Die meisten Embedded/Robotik-Boards</td></tr>
                <tr><td style="padding:5px; border:1px solid #334155">FR-4 (High-Speed)</td><td style="padding:5px; border:1px solid #334155">3,9–4,2</td><td style="padding:5px; border:1px solid #334155">0,012</td><td style="padding:5px; border:1px solid #334155">USB-HS, GbE, PCIe Gen 1</td></tr>
                <tr><td style="padding:5px; border:1px solid #334155">Rogers 4003C</td><td style="padding:5px; border:1px solid #334155">3,55</td><td style="padding:5px; border:1px solid #334155">0,0027</td><td style="padding:5px; border:1px solid #334155">RF, Mikrowelle (&gt;1 GHz)</td></tr>
                <tr><td style="padding:5px; border:1px solid #334155">Isola I-Speed</td><td style="padding:5px; border:1px solid #334155">3,62</td><td style="padding:5px; border:1px solid #334155">0,007</td><td style="padding:5px; border:1px solid #334155">PCIe Gen 2/3, 10GbE</td></tr>
            </table>

            <h3>🔬 HDI — High-Density Interconnect</h3>
            <p>Erforderlich für BGA-Gehäuse mit engem Raster (&lt; 0,8 mm)</p>
            <ul>
                <li><strong>Microvias:</strong> Lasergebohrt, ≤ 0,1 mm Durchmesser, nur 1 Lage tief</li>
                <li><strong>Via-in-Pad:</strong> Microvia direkt auf BGA-Pad — ermöglicht Fan-out ohne Leitungsausleitung</li>
                <li><strong>Kosten:</strong> HDI-Boards 2–5× teurer als Standard; nur wenn nötig</li>
                <li><strong>Alternative:</strong> Bei 0,8-mm-BGA-Raster können Standard-0,2-mm-Vias mit sorgfältigem Layout noch funktionieren</li>
            </ul>

            <h3>📐 Rechenbeispiel: 50-Ω-Microstrip-Impedanz</h3>
            <p><strong>Gegeben:</strong> FR-4, Dk = 4,3, Prepreg-Dicke = 0,2 mm, 1-oz-Kupfer (35 µm)</p>
            <p><strong>Ziel:</strong> 50 Ω Single-Ended Microstrip auf Lage 1 referenziert auf Lage 2 (GND)</p>
            <ul>
                <li>Z₀ ≈ (87 / √(ε_r + 1,41)) × ln(5,98 × h / (0,8 × w + t))</li>
                <li>h = 0,2 mm, t = 0,035 mm, ε_r = 4,3 → Leiterbahnbreite ~0,30 mm ergibt Z₀ ≈ 50 Ω</li>
                <li><strong>Immer mit dem Hersteller-Impedanzrechner überprüfen</strong></li>
                <li>Für differenziell 100 Ω: zwei 50-Ω-Leiterbahnen mit Abstand ≈ Breite</li>
            </ul>

            <div class="visual-ref-links">
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=PCB+stackup+layers+impedance+controlled+prepreg&udm=2')">🔍 Ansehen: PCB-Stackups</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=HDI+microvia+laser+drilled+PCB+cross+section&udm=2')">📐 Ansehen: HDI / Microvias</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=Rogers+RF+substrate+PCB+material+photo&udm=2')">📷 Ansehen: HF-Materialien</button>
            </div>
        `,
        keyPoints: ['Microstrip-Impedanz aus Stackup-Geometrie und Dk berechnen', 'Material nach Frequenz und Verlustfaktor auswählen', 'HDI-Fan-out für BGA mit engem Raster auslegen'],
        relatedTopics: [{ level: 'level3', index: 1, label: 'Signalintegrität (SI) für Embedded-Systeme' }, { level: 'level3', index: 5, label: 'EMV-/EMI-Design für Embedded und Robotik' }]
    },
    {
        title: 'EMV-/EMI-Design für Embedded und Robotik',
        content: `
            <h3>🧠 EMV-First-Designphilosophie</h3>
            <p>EMV muss von Anfang an eingebaut werden — nachträgliche Ferritperlen lösen das Problem nicht.</p>
            <ul>
                <li><strong>Drei Säulen:</strong> Filterung (Rauschunterdrückung), Abschirmung (Strahlungsblockierung), Layout (Stromschleifen minimieren)</li>
                <li><strong>Abgestrahlte Emissionen:</strong> Das PCB wird zur Antenne für jeden Hochfrequenz-Stromkreis</li>
                <li><strong>Leitungsgeführte Emissionen:</strong> Rauschen auf Versorgungsleitungen, das andere Boards erreicht</li>
            </ul>

            <h3>🔁 Gleichtakt- vs. Gegentaktrauschen</h3>
            <p><strong>Gegentakt (DM):</strong> Strom fließt auf einer Leitung hin, auf der anderen zurück</p>
            <ul>
                <li>Quellen: Schaltregler, Taktleitungen</li>
                <li>Filter: Seriendrossel + Kondensator (LC-Filter)</li>
            </ul>

            <p><strong>Gleichtakt (CM):</strong> Strom fließt auf beiden Leitungen und kehrt über Gehäuse/Masse zurück</p>
            <ul>
                <li>Quellen: Masseschleifen, parasitäre Kapazität zum Gehäuse bei Motorantrieben</li>
                <li>Filter: Gleichtaktdrossel (beide Leitungen gleichsinnig durch Kern gewickelt)</li>
                <li>Typische ICs: TDK ACM-Serie, Würth WE-CMB</li>
            </ul>

            <p><strong>Ferritperlen:</strong></p>
            <ul>
                <li>Hohe Impedanz bei HF, niedrige Impedanz bei DC/NF</li>
                <li>Nach Impedanz bei Zielfrequenz auswählen (z. B. 600 Ω @ 100 MHz)</li>
                <li>DC-Strom-Rating nicht überschreiten (Sättigung = Wirkungsverlust)</li>
            </ul>

            <h3>🤖 Motor-EMI-Unterdrückung</h3>
            <p>PWM-Motorantriebe sind große EMI-Quellen — schnelle Schaltvorgänge erzeugen reiche Oberwellenspektren</p>
            <ul>
                <li><strong>Gate-Widerstände:</strong> Langsamere Schaltflanken → weniger dV/dt → weniger EMI</li>
                <li><strong>Snubber über Motor:</strong> RC-Snubber (10 Ω + 100 nF) dämpft Spannungsspitzen</li>
                <li><strong>Gehäusemasse:</strong> Motorgehäuse und Enclosure über niederohmige Ableitung erden</li>
                <li><strong>Abgeschirmte Motorkabel:</strong> Schirm einseitig am Antrieb erden — verhindert Antenneneffekt</li>
                <li><strong>EMI-Filter am Versorgungseingang:</strong> Gleichtaktdrossel + X/Y-Kondensatoren vor der PWM-Stufe</li>
            </ul>

            <h3>🛡️ ESD-Schutz an allen I/Os</h3>
            <ul>
                <li><strong>TVS-Dioden:</strong> Klemmen schnelle Transienten; V_clamp unter Bauteil-Abs-Max wählen</li>
                <li>Bidirektional für Datenleitungen, unidirektional für Versorgungsrails</li>
                <li>Innerhalb 1–2 mm vom Stecker-Pad platzieren, vor jedem Serienwiderstand</li>
                <li><strong>ESD-Arrays:</strong> PRTR5V0U2X (2-kanalig), ESDA6V1W6 (6-kanalig) für Mehrstiftstecker</li>
                <li><strong>IEC 61000-4-2:</strong> Kontakt ±4 kV, Luft ±8 kV — Bauteilwerte müssen diese Pegel abdecken</li>
            </ul>

            <div class="visual-ref-links">
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=EMC+EMI+shielding+ferrite+bead+common+mode+choke+PCB&udm=2')">🔍 Ansehen: EMV-Komponenten</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=spread+spectrum+clocking+EMI+reduction+diagram&udm=2')">📡 Ansehen: Spread-Spectrum-Takt</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=near+field+EMI+probe+PCB+debugging&udm=2')">🔎 Ansehen: Nahfeldsonden</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=EMC+test+anechoic+chamber+radiated+emissions&udm=2')">📷 Ansehen: EMV-Prüfung</button>
            </div>
        `,
        keyPoints: ['EMV-First-Denkweise von Anfang an anwenden', 'Motor-PWM-Emissionen filtern und unterdrücken', 'ESD-Schutz an allen Steckverbindern platzieren'],
        relatedTopics: [{ level: 'level2', index: 2, label: 'Leistungselektronik für Embedded und Robotik' }, { level: 'level3', index: 1, label: 'Signalintegrität (SI) für Embedded-Systeme' }]
    },
    {
        title: 'Relevante PCB-Standards für Embedded und Robotik',
        content: `
            <h3>📖 IPC-2221: Allgemeiner PCB-Designstandard</h3>
            <p>Die grundlegende PCB-Designreferenz — Pflichtlektüre für professionelle Designer.</p>
            <ul>
                <li>Umfasst: Designregeln, Leiterbahnbreiten, Kriech-/Luftstrecken für Spannungsisolation</li>
                <li><strong>Luftstrecke:</strong> Mindestabstand zwischen Leitern verschiedener Netze (spannungsabhängig)</li>
                <li><strong>Kriechstrecke:</strong> Abstand entlang der Oberfläche; kritischer in feuchten/verschmutzten Umgebungen</li>
                <li>IPC-2221-Tabellen für Boards &gt; 50 V oder sicherheitsrelevante Anwendungen verwenden</li>
            </ul>

            <h3>⚡ IPC-2152: Stromtragfähigkeit</h3>
            <p>Bestimmt sichere Leiterbahnbreite für Strom und Temperaturanstieg</p>
            <ul>
                <li>Eingaben: Strom (A), Kupfergewicht (oz), zulässiger Temperaturanstieg (ΔT, typisch 10–20 °C)</li>
                <li>Faustregel: 1 oz, 1 mm breit → ~1 A intern / ~2 A extern bei 10 °C Anstieg</li>
                <li>Online-Rechner: Saturn PCB Toolkit, IPC-2152-Rechner</li>
                <li><strong>Für Motorversorgungsleitungen:</strong> Immer Reserve einplanen — 3-A-Leiterbahn für 2 A max.</li>
            </ul>

            <h3>🔲 IPC-7351: Land-Pattern-Design</h3>
            <p>Standard für SMD-Bauteilpad-Abmessungen (Footprints)</p>
            <ul>
                <li>Drei Dichte-Level: A (Maximum, für Nacharbeit), B (nominal), C (dicht)</li>
                <li>Pad-Toe, Heel und Side-Extensions relativ zu Bauteilanschlussdimensionen</li>
                <li>Korrekte Footprints = gute Lötverbindungen = weniger Bestückungsfehler</li>
            </ul>

            <h3>🔍 IPC-A-610: Akzeptanzkriterien für Lötbaugruppen</h3>
            <p>Standard zur Inspektion bestückter Platinen</p>
            <ul>
                <li>Drei Klassen: Klasse 1 (allgemeine Elektronik), Klasse 2 (dedizierter Betrieb), Klasse 3 (hohe Zuverlässigkeit — Medizin, Militär)</li>
                <li>Definiert: Lötmeniskus, Benetzung, Brücken, Kaltstellen, Tombstoning</li>
            </ul>

            <h3>🌍 CE / FCC / UL (Konzeptebene)</h3>
            <ul>
                <li><strong>CE (Europa):</strong> Pflicht für EU-Produkte — EMV (EN 55032), Niederspannungsrichtlinie, RoHS</li>
                <li><strong>FCC (USA):</strong> Part 15 für unbeabsichtigte Sender (Klasse A industriell, Klasse B Endverbraucher)</li>
                <li>EMV-Vorkonformitätsprüfung: Nahfeldprobe + Spektrumanalysator für Hotspot-Suche vor formaler Prüfung</li>
            </ul>

            <div class="visual-ref-links">
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=IPC+class+2+class+3+PCB+inspection+standards&udm=2')">🔍 Ansehen: IPC-Standards</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=IPC-2152+trace+width+current+chart&udm=2')">📐 Ansehen: IPC-2152 Leiterbahnen</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=UL+IEC+60950+clearance+creepage+table+PCB&udm=2')">⚡ Ansehen: Sicherheitsabstände</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=creepage+clearance+distance+PCB+high+voltage+isolation&udm=2')">📷 Ansehen: Kriech- und Luftstrecken</button>
            </div>
        `,
        keyPoints: ['IPC-2221-Luftstreckenregeln für Spannungsisolation anwenden', 'Leiterbahnbreiten mit IPC-2152-Stromtabellen dimensionieren', 'Funktionale Sicherheitskonzepte (ISO 26262) grundlegend verstehen'],
        relatedTopics: [{ level: 'level2', index: 6, label: 'Design für Herstellbarkeit' }, { level: 'level3', index: 7, label: 'Test, Inbetriebnahme und Fehlersuche' }]
    },
    {
        title: 'Test, Inbetriebnahme und Fehlersuche',
        content: `
            <h3>🚦 Stufenweise Inbetriebnahme</h3>
            <p>Neues Board niemals sofort vollständig belasten — stufenweise vorgehen:</p>
            <ol>
                <li><strong>Stufe 1 — Sichtprüfung:</strong> Lötbrücken, fehlende Bauteile, falsche Polung prüfen. USB-Mikroskop verwenden.</li>
                <li><strong>Stufe 2 — Versorgungsprüfung (ohne Last):</strong> Labornetzgerät mit ~50 mA begrenzt anschließen. Alle Rails messen. Keine Kurzschlüsse vor Vollstrom.</li>
                <li><strong>Stufe 3 — Taktprüfung:</strong> Oszillatorausgang mit Oszi messen. MCU/FPGA-Takt vorhanden und korrekte Frequenz?</li>
                <li><strong>Stufe 4 — MCU-Boot:</strong> SWD/JTAG anschließen. Mit Debugger verbinden. Minimale Blink-Firmware flashen.</li>
                <li><strong>Stufe 5 — Peripherie einzeln:</strong> Jede Schnittstelle (UART, SPI, I²C) separat testen. Motorstrom erst nach Logikverifikation.</li>
            </ol>

            <h3>📍 Testpunkt-Platzierstrategie</h3>
            <ul>
                <li>Testpunkt (TP) auf jede Versorgungsschiene: VIN, 5 V, 3,3 V, 1,8 V, VBAT</li>
                <li>TPs auf: Reset-Leitung, Boot/Mode-Pins, SWD CLK/DIO, UART TX/RX</li>
                <li>TPs auf: jeden I²C/SPI-Bus, Encoder-Eingänge, PWM-Ausgänge</li>
                <li><strong>Standard:</strong> 1-mm-Rundpad, im Siebdruck beschriftet</li>
            </ul>

            <h3>📊 Oszilloskop und Logikanalysator einsetzen</h3>
            <p><strong>Oszilloskop — Was prüfen:</strong></p>
            <ul>
                <li>Versorgungsripple: VCC mit kurzem Masseclip messen (langer Masseclip addiert Induktivität)</li>
                <li>Takt: Frequenz, Tastverhältnis, Anstiegs-/Abfallzeiten</li>
                <li>SPI/UART-Wellenformen: Mit Oszi-Trigger auf CS oder Startbit dekodieren</li>
            </ul>

            <p><strong>Logikanalysator — Was prüfen:</strong></p>
            <ul>
                <li>I²C: Adresse, ACK/NAK, Datenbytes — fehlende Pull-ups erkennen (kein ACK)</li>
                <li>SPI: MOSI/MISO/CLK/CS-Beziehungen — Phase/Polaritätsfehler erkennen</li>
                <li>UART: Baudrate, Start/Stop-Bits — 115200 vs. 9600 Mismatch typisches Problem</li>
                <li>PulseView (Open-Source) oder Saleae Logic — beide dekodieren Protokolle automatisch</li>
            </ul>

            <h3>🏗️ Design for Test (DFT)</h3>
            <ul>
                <li>Testbarkeit ist ein Designmerkmal, kein Nachtrag</li>
                <li><strong>Boundary Scan (JTAG BSDL):</strong> I/Os über JTAG treiben — für Board-Konnektivitätstests ohne Firmware</li>
                <li><strong>UART-Debug-Konsole:</strong> Immer einen UART zu einem Testpunkt herausführen; unschätzbar für Produktionstests</li>
                <li><strong>LED-Indikatoren:</strong> Versorgungs-LED, Heartbeat-LED — schnellste visuelle Plausibilitätsprüfung</li>
            </ul>

            <div class="visual-ref-links">
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=PCB+bring+up+debug+oscilloscope+probe+test+point&udm=2')">🔍 Ansehen: PCB-Debugging</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=current+probe+oscilloscope+power+rail+noise&udm=2')">⚡ Ansehen: Stromzangen / Probes</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=TDR+time+domain+reflectometry+PCB+impedance&udm=2')">📈 Ansehen: TDR-Messung</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=flying+probe+test+boundary+scan+JTAG+PCB&udm=2')">📷 Ansehen: Testausrüstung</button>
            </div>
        `,
        keyPoints: ['Stufenweiser Einschaltablauf konsequent einhalten', 'Testpunkte auf alle kritischen Signale im Layout vorsehen', 'Systematisch mit Oszi und Logikanalysator debuggen'],
        relatedTopics: [{ level: 'level1', index: 4, label: 'Werkzeuge und Messtechnik' }, { level: 'level3', index: 6, label: 'Relevante PCB-Standards für Embedded und Robotik' }]
    },
    {
        title: 'Expertenprojekte (Fokus: Embedded/Robotik)',
        content: `
            <h3>🚀 Projekt 1: Hochgeschwindigkeits-MCU-Board</h3>
            <p><strong>STM32H7 oder STM32F7 mit:</strong></p>
            <ul>
                <li>QSPI-Flash (W25Q64, ≤ 80 MHz, Längenabgleich 4 Datenleitungen)</li>
                <li>USB-HS (90 Ω differenziell, ESD-Schutz)</li>
                <li>Ethernet RMII (50-MHz-Referenztakt, Übertrager nach Layout-Guide)</li>
                <li>4-Lagen-Stackup: Signal – GND – PWR – Signal, kontrollierte Impedanz</li>
            </ul>

            <h3>🤖 Projekt 2: Vollständiger Roboter-Controller</h3>
            <ul>
                <li><strong>MCU:</strong> STM32F4/H7 (FPU für Regelkreise)</li>
                <li><strong>Motortreiber:</strong> 4× DRV8874 (Bürstenmotor, 2 A)</li>
                <li><strong>Encoder:</strong> 4× Quadratur-Hardware-Decoder</li>
                <li><strong>IMU:</strong> ICM-42688-P (6-Achsen, SPI)</li>
                <li><strong>CAN-Bus:</strong> TJA1051 Transceiver, 120-Ω-Abschluss</li>
                <li><strong>Versorgung:</strong> 3S-LiPo, synchroner Buck (5 V/3 A Logik), separater Motorstrompfad</li>
            </ul>

            <h3>📡 Projekt 3: Mixed-Signal-Datenerfassungsboard</h3>
            <ul>
                <li>Instrumentenverstärker (INA128) für Dehnungsmessstreifen-Brücke</li>
                <li>Präzisions-24-Bit-ADC (ADS1256, SPI, 30 kSPS)</li>
                <li>Rauscharme Analogversorgung: LT3042 (0,8 µVrms)</li>
                <li>Isolierte Versorgung und Signal (ISO7242C)</li>
                <li>Separate AGND-/DGND-Flächen mit Sternpunkt</li>
            </ul>

            <h3>🔷 Projekt 4: FPGA-Board mit DDR und High-Speed-I/O</h3>
            <ul>
                <li>Lattice ECP5 oder Xilinx Artix-7</li>
                <li>DDR3L SDRAM (256 MB, Fly-by-Topologie, Längenabgleich)</li>
                <li>MIPI CSI-2 Kameraschnittstelle (LVDS-Differenzpaare, AC-gekoppelt)</li>
                <li>6-Lagen-Stackup für DDR-Signalintegrität</li>
            </ul>

            <h3>✅ Erfolgs-Checkliste</h3>
            <ul>
                <li>SI-Tools einsetzen: PCB-Impedanzrechner verwenden, beim Hersteller vor Bestellung prüfen</li>
                <li>Jedes Differenzpaar auf Längenabgleich und Impedanz prüfen</li>
                <li>Bring-up-Ablauf vor Boardanlieferung schreiben</li>
                <li>EMV-Vorkonformität: Board mit Nahfeldprobe messen vor Produktversand</li>
                <li>Dokumentieren: SI-Berechnungen, Stackup-Tabelle, Testprozedur — alles in Git</li>
            </ul>

            <div class="visual-ref-links">
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=custom+robot+controller+PCB+complete+multi-layer&udm=2')">🔍 Ansehen: Roboter-Controller-Boards</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=BLDC+motor+controller+FOC+PCB+three+phase&udm=2')">🤖 Ansehen: BLDC / FOC</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=LiDAR+sensor+interface+PCB+robot&udm=2')">📡 Ansehen: LiDAR-Schnittstellen</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=6+layer+PCB+layout+high+speed+mixed+signal&udm=2')">📷 Ansehen: Mehrlagen-Layouts</button>
            </div>
        `,
        keyPoints: ['Hochgeschwindigkeits-MCU-Boards aufbauen und in Betrieb nehmen', 'Vollständige Multi-Subsystem-Roboter-Controller entwerfen', 'SI/PI- und EMV-Praktiken in echten Projekten anwenden'],
        relatedTopics: [{ level: 'level3', index: 7, label: 'Test, Inbetriebnahme und Fehlersuche' }, { level: 'level4', index: 6, label: 'Leitprojekte' }]
    },
    {
        title: 'Antennen- und Funkdesign für Embedded-Systeme',
        content: `
            <h3>📡 Warum Antennendesign in der Robotik wichtig ist</h3>
            <p>Die meisten modernen Roboter verwenden Wi-Fi (ESP32), Bluetooth (BLE), GPS oder LoRa. Schlechtes Antennendesign = schlechte Reichweite, verlorene Pakete und unzuverlässige Steuerung.</p>

            <h3>🔀 Antennentypen für Embedded-Systeme</h3>
            <p><strong>PCB-Leitungsantenne (Inverted-F, Meanderline):</strong></p>
            <ul>
                <li>Kein BOM-Kostenpunkt — direkt auf Kupferlage geätzt</li>
                <li>Üblich auf ESP32-, nRF52-, CC2640-Modulen</li>
                <li>Viertelwellen-Monopol bei 2,4 GHz ≈ 31 mm (in FR-4)</li>
                <li>Inverted-F (IFA): kompakt, gute Bandbreite — am beliebtesten für Wi-Fi/BLE</li>
            </ul>

            <p><strong>Chip-Antenne:</strong></p>
            <ul>
                <li>Kleines SMD-Bauteil (z. B. Johanson 2450AT) — 2–3 mm Größe</li>
                <li>Hersteller-Layout-Guide exakt befolgen — Masseabstand und Anpassnetzwerk kritisch</li>
                <li>Typischer Gewinn: 1–2 dBi</li>
            </ul>

            <p><strong>Externe Antenne (SMA/U.FL-Anschluss):</strong></p>
            <ul>
                <li>Beste Leistung — Antennenplatzierung abseits von PCB-Störquellen möglich</li>
                <li>50-Ω-Koaxialspeisung — Impedanzabgleich zu Leiterbahn und Stecker</li>
                <li>Erforderlich für: GPS (Patch-Antenne), Langstrecken-LoRa, High-Performance-Wi-Fi</li>
            </ul>

            <h3>🏗️ PCB-Layout-Regeln für Antennen</h3>
            <p><strong>Masseflächen-Keep-Out (Kritisch!):</strong></p>
            <ul>
                <li>Alle Kupferlagen unter und um das Antennenelement entfernen</li>
                <li>Keep-out-Zone per Datenblatt (typisch 10–15 mm über Antennenrand)</li>
                <li>Keine Leiterbahnen, Vias oder Bauteile in der Antennen-Keep-out-Zone</li>
            </ul>

            <p><strong>Antennen-Speiseleitung:</strong></p>
            <ul>
                <li>50-Ω-Microstrip vom RF-Pin zur Antenne (kontrollierte Impedanz)</li>
                <li>So kurz wie möglich halten (jeder mm addiert Verluste bei 2,4 GHz)</li>
                <li>Keine 90°-Knicke — 45°-Chamfer-Knicke verwenden</li>
            </ul>

            <p><strong>Anpassnetzwerk:</strong></p>
            <ul>
                <li>Pi-Netzwerk (Serien-L, Parallel-C, Parallel-C) zwischen RF-Pin und Antenne</li>
                <li>Pads für 2–3 Anpassbauteile vorsehen — auch wenn zunächst 0-Ω-Brücken</li>
                <li>Ziel: S11 &lt; −10 dB bei Betriebsfrequenz (NanoVNA für 2,4 GHz gut geeignet)</li>
            </ul>

            <h3>🛰️ GPS-Antennenaspekte</h3>
            <ul>
                <li>GPS empfängt sehr schwache Signale (−130 dBm) — saubere HF-Umgebung nötig</li>
                <li>Keramik-Patch-Antenne (25×25 mm typisch) oder externe Aktivantenne verwenden</li>
                <li>GPS-Antenne auf Platinenoberseite, Richtung Himmel, abseits von Schalt­rausch</li>
                <li>Keine Massefläche über GPS-Antenne — freier Himmelssicht nötig</li>
            </ul>

            <div class="visual-ref-links">
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=PCB+antenna+design+WiFi+BLE+trace+inverted+F&udm=2')">🔍 Ansehen: PCB-Antennen</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=chip+antenna+2.4GHz+ESP32+PCB+layout&udm=2')">📶 Ansehen: Chip-Antennen</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=RF+shield+can+EMI+wireless+module+PCB&udm=2')">🛡️ Ansehen: HF-Schirme</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=antenna+matching+network+smith+chart+VNA+NanoVNA&udm=2')">📷 Ansehen: Antennenanpassung</button>
            </div>
        `,
        keyPoints: ['Massefläche in der Antennen-Keep-out-Zone auf allen Lagen entfernen', '50-Ω-kontrollierte-Impedanz-Speiseleitung verwenden', 'Anpassnetzwerk-Pads für Nachoptimierung nach der Fertigung vorsehen'],
        relatedTopics: [{ level: 'level3', index: 5, label: 'EMV-/EMI-Design für Embedded und Robotik' }, { level: 'level3', index: 4, label: 'Fortgeschrittene PCB-Stackups und Materialien' }]
    }
]);
