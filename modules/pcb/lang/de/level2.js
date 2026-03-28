i18n.registerContent('de', 'level2', [
    {
        title: 'Vertiefte Analogelektronik',
        content: `
            <h3>🔄 Thévenin- und Norton-Ersatzschaltungen</h3>
            <p>Komplexe Netzwerke lassen sich auf eine Spannungsquelle mit Serienwiderstand (Thévenin) oder eine Stromquelle mit Parallelwiderstand (Norton) vereinfachen</p>
            <ul>
                <li><strong>Thévenin-Spannung (V_th):</strong> Leerlaufspannung an den betrachteten Klemmen</li>
                <li><strong>Thévenin-Widerstand (R_th):</strong> Ersatzwiderstand bei deaktivierten Quellen</li>
                <li><strong>Praxisnutzen:</strong> Analyse von Sensorausgängen und Lasteffekten auf Versorgungen</li>
            </ul>

            <h3>⚡ Nichtidealitäten von Operationsverstärkern</h3>
            <p><strong>Eingangsbiasstrom:</strong> Kleiner Strom in die OP-Amp-Eingänge (~nA bis µA)</p>
            <ul>
                <li>Verursacht DC-Offset bei hochohmigen Schaltungen</li>
                <li>Lösung: Quellimpedanzen an beiden Eingängen angleichen</li>
            </ul>

            <p><strong>Eingangs-Offsetspannung:</strong> Spannungsdifferenz am Eingang für Ausgang = 0</p>
            <ul>
                <li>Typisch: 1–5 mV, führt zu DC-Fehlern in Präzisionsschaltungen</li>
                <li>Lösung: Offset-Null-Pins, AC-Kopplung, Chopper-Stabilisierung</li>
            </ul>

            <p><strong>Slew Rate:</strong> Maximale Ausgangsänderungsrate (V/µs)</p>
            <ul>
                <li>Begrenzt hochfrequente, großamplitudige Signale</li>
                <li>Beispiel: 1 V/µs bedeutet, 1 V braucht 1 µs</li>
                <li>Wichtig für: Schnelle Sensoren, PWM-Filterung</li>
            </ul>

            <p><strong>Gain-Bandwidth-Produkt (GBW):</strong> Verstärkung × Bandbreite = konstant</p>
            <ul>
                <li>LM358: 1 MHz GBW (Verstärkung 100 → 10 kHz Bandbreite)</li>
                <li>OP-Amp mit GBW >> gewünschter Bandbreite wählen</li>
            </ul>

            <h3>📏 Instrumentenverstärker</h3>
            <p>Speziell für niederpegeligen differenzielle Signale (mV-Bereich)</p>
            <ul>
                <li><strong>Hohe Gleichtaktunterdrückung:</strong> 80–120 dB (unterdrückt Gleichtaktrauschen)</li>
                <li><strong>Hohe Eingangsimpedanz:</strong> Minimale Belastung der Quelle</li>
                <li><strong>Verstärkung über einen Widerstand:</strong> G = 1 + (50 kΩ / R_gain)</li>
            </ul>

            <p><strong>Anwendungen in der Robotik:</strong></p>
            <ul>
                <li><strong>Dehnungsmessstreifen:</strong> Kraft- und Drehmomentemessung (Wheatstone-Brückenausgang)</li>
                <li><strong>Strommessung:</strong> Shunt-Widerstandsspannung verstärken</li>
                <li><strong>Wägezellen:</strong> Gewichtsmessung in Robotergreifern</li>
                <li><strong>Gängige ICs:</strong> INA128, AD620, INA826</li>
            </ul>

            <h3>📊 ADC-Eingangsaufbereitung</h3>
            <p><strong>Filterung:</strong> Rauschen vor der Abtastung entfernen</p>
            <ul>
                <li>Anti-Aliasing-Filter: Tiefpass mit f_c &lt; f_sample / 2</li>
                <li>RC-Filter: f_c = 1 / (2πRC)</li>
                <li>Beispiel: 10-kHz-ADC → 4,7 kΩ + 10 nF = 3,4 kHz Grenzfrequenz</li>
            </ul>

            <p><strong>Skalierung:</strong> Sensorbereich an ADC-Bereich anpassen</p>
            <ul>
                <li>Spannungsteiler zur Dämpfung</li>
                <li>OP-Amp-Verstärkung zur Amplitudierung</li>
                <li>Beispiel: 0–24 V Sensor → 0–3,3 V ADC (Teiler 7,27)</li>
            </ul>

            <h3>🎚️ Rückkopplung und Stabilität</h3>
            <p><strong>Negative Rückkopplung:</strong> Ausgang auf invertierenden Eingang zurückgeführt</p>
            <ul>
                <li>Stabilisiert Verstärkung, reduziert Verzerrung, erhöht Bandbreite</li>
            </ul>

            <p><strong>Bode-Diagramme:</strong> Verstärkung und Phase über Frequenz darstellen</p>
            <ul>
                <li><strong>Verstärkungsreserve:</strong> Wie viel Verstärkung bis zur Schwingung</li>
                <li><strong>Phasenreserve:</strong> Phasenabstand bis zur Schwingung (angestrebt &gt; 45°)</li>
                <li>Kompensationskondensatoren zur Stabilisierung verwenden</li>
            </ul>

            <div class="visual-ref-links">
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=instrumentation+amplifier+circuit+diagram+INA128&udm=2')">🔍 Ansehen: Instrumentenverstärker</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=Wheatstone+bridge+strain+gauge+load+cell+circuit&udm=2')">📷 Ansehen: Wheatstone-Brücke</button>
            </div>
        `,
    },
    {
        title: 'Digitalelektronik für Fortgeschrittene',
        content: `
            <h3>🔄 Pegelanpassung</h3>
            <p>Schnittstelle zwischen verschiedenen Logikspannungsstandards (kritisch in Mischspannungssystemen)</p>

            <p><strong>3,3 V ↔ 5 V Wandlung:</strong></p>
            <ul>
                <li><strong>Widerstandsteiler:</strong> 5 V → 3,3 V (einfach, unidirektional, langsam)</li>
                <li><strong>MOSFET:</strong> Bidirektional, schnell (BSS138 verbreitet)</li>
                <li><strong>Dedizierter IC:</strong> TXS0108E (8-Kanal, automatische Richtungserkennung)</li>
            </ul>

            <p><strong>Wann nötig:</strong></p>
            <ul>
                <li>Arduino (5 V) ↔ Raspberry Pi (3,3 V)</li>
                <li>ESP32 (3,3 V) ↔ 5-V-Sensoren</li>
                <li>STM32 (3,3 V) ↔ 5-V-Peripherie</li>
            </ul>

            <h3>💾 Speicher auf dem PCB</h3>
            <p><strong>SRAM (Static RAM):</strong></p>
            <ul>
                <li>Schnell, flüchtig, parallele Schnittstelle</li>
                <li>Verwendung: Externer RAM für datenintensive Anwendungen</li>
                <li>Typisch: IS61WV51216 (512 KB, Parallelbus)</li>
            </ul>

            <p><strong>Flash-Speicher:</strong></p>
            <ul>
                <li>Nichtflüchtig, langsamer als SRAM</li>
                <li>SPI-Schnittstelle üblich (W25Q128, 16 MB)</li>
                <li>Verwendung: Firmware-Speicherung, Datenprotokollierung, Dateisysteme</li>
            </ul>

            <p><strong>EEPROM:</strong></p>
            <ul>
                <li>Kleine Kapazität (einige KB), byteadressierbar</li>
                <li>I²C-Schnittstelle (24LC256, 32 KB)</li>
                <li>Verwendung: Konfigurationsdaten, Kalibrierwerte</li>
            </ul>

            <p><strong>PCB-Hinweise (Speicher):</strong></p>
            <ul>
                <li><strong>Entkopplung:</strong> 100 nF nah an jedem VCC-Pin</li>
                <li><strong>Adressierung:</strong> A0–A2-Pins für die I²C-Geräteadresse</li>
                <li><strong>Schreibschutz:</strong> WP-Pin beim EEPROM</li>
            </ul>

            <h3>⏰ Taktung</h3>
            <p><strong>Quarzoszillatoren:</strong></p>
            <ul>
                <li>Präzise Frequenzreferenz für MCUs</li>
                <li>Üblich: 8 MHz, 12 MHz, 16 MHz, 32,768 kHz (RTC)</li>
                <li>Benötigt Lastkondensatoren: typisch 2× 18–22 pF nach Masse</li>
                <li>PCB: Kurze Leitungen, Massefläche darunter, abseits von Störquellen</li>
            </ul>

            <p><strong>Taktverteilung:</strong></p>
            <ul>
                <li>Taktleitungen kurz und direkt führen</li>
                <li>Andere Leitungen nicht parallel unter oder direkt über Taktsignalen routen</li>
                <li>Bei langen Leitungen Serienterminierung (22–33 Ω)</li>
            </ul>

            <p><strong>Entprellung:</strong></p>
            <ul>
                <li><strong>Hardware:</strong> RC-Filter (10 kΩ + 100 nF) + Schmitt-Trigger</li>
                <li><strong>Software:</strong> Taster lesen, 20 ms warten, nochmals lesen</li>
                <li>Verhindert Mehrfachauslösung durch mechanisches Prellen</li>
            </ul>

            <h3>🔄 Zustandsautomaten (FSM)</h3>
            <p>Sequenzielle Logik für komplexe Steuerungsabläufe</p>
            <ul>
                <li><strong>Zustände:</strong> IDLE, RUNNING, ERROR, COMPLETE</li>
                <li><strong>Übergänge:</strong> Ereignisse, die Zustände wechseln</li>
                <li><strong>Ausgänge:</strong> Aktionen in jedem Zustand</li>
            </ul>

            <p><strong>Beispiele Robotik:</strong></p>
            <ul>
                <li>Motorregelung: STOP → BESCHLEUNIGEN → LAUF → BREMSEN → STOP</li>
                <li>Kommunikationsprotokoll: IDLE → SENDEN → WARTE_ACK → FERTIG</li>
                <li>Umsetzung in der Firmware — Hardware-Sequencing dennoch verstehen</li>
            </ul>

            <h3>🔢 Schieberegister und Zähler</h3>
            <p><strong>Schieberegister (74HC595):</strong></p>
            <ul>
                <li>Serieller Eingang → paralleler Ausgang</li>
                <li>8 Ausgänge mit 3 MCU-Pins steuern (Daten, Takt, Latch)</li>
                <li>Verkettbar für mehr Ausgänge (16, 24, 32 ...)</li>
                <li>Verwendung: LED-Anzeigen, Relaissteuerung, GPIO-Erweiterung</li>
            </ul>

            <p><strong>Zähler (74HC4040):</strong></p>
            <ul>
                <li>Zählt Taktimpulse, teilt Frequenz</li>
                <li>Einsatz: Frequenzteilung, Ereigniszählung</li>
            </ul>

            <div class="visual-ref-links">
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=FPGA+development+board+JTAG+debug+SPI+flash&udm=2')">🔍 Ansehen: FPGA-Entwicklungsboards</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=logic+level+shifter+BSS138+MOSFET+circuit+3.3V+5V&udm=2')">📷 Ansehen: Pegelwandler</button>
            </div>
        `,
        relatedTopics: [{ level: 'level1', index: 3, label: 'Grundlagen der Digitaltechnik' }, { level: 'level3', index: 3, label: 'FPGA- und SoC-Hardwaredesign' }],
        resources: [{ title: 'STM32 Hardware Design Guide (AN4488)', url: 'https://www.st.com/resource/en/application_note/an4488.pdf' }, { title: 'DigiKey Referenzdesigns', url: 'https://www.digikey.com/reference-designs' }]
    },
    {
        title: 'Leistungselektronik für Embedded und Robotik',
        content: `
            <h3>🔋 Lineare Regler (LDO)</h3>
            <p><strong>Funktionsprinzip:</strong> Längstransistor dissipiert überschüssige Spannung als Wärme</p>
            <ul>
                <li><strong>Dropout-Spannung:</strong> Minimale V_in − V_out (z. B. 0,3 V für LDO)</li>
                <li><strong>Wirkungsgrad:</strong> η = V_out / V_in (z. B. 3,3 V aus 5 V = 66 %)</li>
                <li><strong>Verlustleistung:</strong> P = (V_in − V_out) × I_out</li>
            </ul>

            <p><strong>Gängige LDOs:</strong></p>
            <ul>
                <li><strong>AMS1117-3.3:</strong> 1 A, 1,2 V Dropout, günstig, Kühlkörper nötig</li>
                <li><strong>MCP1700:</strong> 250 mA, 178 mV Dropout, geringer Ruhestrom (1,6 µA)</li>
                <li><strong>LP5907:</strong> 250 mA, ultraniederrauschend (für Analogschaltungen)</li>
            </ul>

            <p><strong>Thermikberechnung:</strong></p>
            <ul>
                <li>Berechnen: P_verlust = (V_in − V_out) × I_last</li>
                <li>Beispiel: 12 V → 5 V @ 500 mA = 3,5 W (Kühlkörper erforderlich!)</li>
                <li>Kupferflächen auf dem PCB als Wärmesenke nutzen</li>
                <li>Thermische Vias unter dem Gehäuse zur Massefläche</li>
            </ul>

            <h3>⚡ Schaltregler</h3>
            <p><strong>Buck-Regler (Tiefsetzsteller):</strong></p>
            <ul>
                <li>Höherer Wirkungsgrad (80–95 %) als Linearregler</li>
                <li>V_out = V_in × Tastverhältnis</li>
                <li>Komponenten: Induktivität, Diode (oder Sync-FET), Ein-/Ausgangskondensatoren</li>
                <li>Beispiel-ICs: LM2596 (fest), TPS54340 (einstellbar, 3,5 A)</li>
            </ul>

            <p><strong>Boost-Regler (Hochsetzsteller):</strong></p>
            <ul>
                <li>Spannung erhöhen (z. B. 3,3 V → 5 V, 5 V → 12 V)</li>
                <li>Einsatz: Motoren aus Batterie, LCD-Hintergrundbeleuchtung</li>
                <li>Beispiel-ICs: MT3608 (günstiges Modul), TPS61088</li>
            </ul>

            <p><strong>Buck-Boost:</strong></p>
            <ul>
                <li>Ausgang kann höher oder niedriger als der Eingang sein</li>
                <li>Einsatz: Batteriesysteme mit schwankender Spannung</li>
            </ul>

            <p><strong>PCB-Layout für Schaltregler:</strong></p>
            <ul>
                <li><strong>Hot-Loop:</strong> Strompfad mit hohem di/dt — Fläche minimieren!</li>
                <li>Schaltknoten-Leiterbahnen kurz und breit halten</li>
                <li>Ein-/Ausgangskondensatoren nah am IC platzieren</li>
                <li>Massefläche unter der gesamten Schaltung</li>
                <li>Empfindliche Signale nicht am Schaltknoten vorbeiführen</li>
            </ul>

            <h3>🔌 Entkopplungsstrategie</h3>
            <p><strong>Bulk-Kondensatoren (10–100 µF):</strong></p>
            <ul>
                <li>Elektrolyt oder Tantal</li>
                <li>Stabilisieren tieffrequente Transienten</li>
                <li>Nah am Versorgungseingang platzieren</li>
            </ul>
            <p><strong>Hochfrequente Kondensatoren (100 nF):</strong></p>
            <ul>
                <li>Keramik X7R oder X5R</li>
                <li>Dämpfen HF-Schaltnetz-Rauschen</li>
                <li>So nah wie möglich an IC-Versorgungspins (&lt;5 mm)</li>
                <li><strong>Regel:</strong> Ein 100 nF pro VCC/GND-Pin-Paar</li>
            </ul>
            <p><strong>Platzierung:</strong></p>
            <ul>
                <li>Via vom Kondensatorpad direkt zur Massefläche</li>
                <li>Kurze, breite Leiterbahnen zu den IC-Pins</li>
                <li>Mehrere Vias bei hohem Strom (&gt;100 mA)</li>
            </ul>

            <h3>🤖 Motortreiber</h3>
            <p><strong>H-Brücken-Topologie:</strong></p>
            <ul>
                <li>4 Transistoren steuern Motorrichtung und Bremsen</li>
                <li>Vorwärts: Q1+Q4 ein, Q2+Q3 aus</li>
                <li>Rückwärts: Q2+Q3 ein, Q1+Q4 aus</li>
                <li>Bremse: Alle Low-Side ein (Motorklemmen kurzschließen)</li>
            </ul>

            <p><strong>PWM-Steuerung:</strong></p>
            <ul>
                <li>Tastverhältnis = Drehzahl (0–100 %)</li>
                <li>Typische PWM-Frequenz: 15–25 kHz (über dem Hörbereich)</li>
                <li>Richtungs-Pins plus PWM (oder zwei PWM für unabhängige Steuerung)</li>
            </ul>

            <p><strong>Strommessung:</strong></p>
            <ul>
                <li>Shunt-Widerstand (0,01–0,1 Ω) in Reihe zum Motor</li>
                <li>Spannung mit OPV oder speziellem IC verstärken (z. B. INA139)</li>
                <li>Einsatz: Überstromschutz, Stall-Erkennung, Drehmomentschätzung</li>
            </ul>

            <p><strong>Gängige ICs:</strong></p>
            <ul>
                <li><strong>L298N:</strong> Doppelte H-Brücke, 2 A/Kanal, günstig, ineffizient</li>
                <li><strong>DRV8871:</strong> 3,6 A, PWM-Eingang, Thermoschutz</li>
                <li><strong>TB6612FNG:</strong> Dual, 1,2 A, MOSFET-basiert (effizient)</li>
            </ul>

            <h3>🔋 Batteriemanagement</h3>
            <p><strong>Li-Ion/LiPo-Laden:</strong></p>
            <ul>
                <li>CC/CV: Konstantstrom → Konstantspannung</li>
                <li>Laden bis 4,2 V, Abschaltung bei 3,0 V (niemals tiefer entladen!)</li>
                <li>Lade-IC: TP4056 (1 A, einfach), BQ24195 (fortgeschritten)</li>
            </ul>
            <p><strong>Schutz:</strong></p>
            <ul>
                <li><strong>Überladung:</strong> Abschalten bei 4,2 V</li>
                <li><strong>Tiefentladung:</strong> Abschalten bei 3,0 V</li>
                <li><strong>Überstrom:</strong> Begrenzung oder Abschaltung</li>
                <li>Schutz-ICs: DW01 + FS8205A (häufige Kombination)</li>
            </ul>
            <p><strong>Fuel-Gauge-ICs:</strong></p>
            <ul>
                <li>Schätzen verbleibende Akku-Kapazität</li>
                <li>MAX17048 (I²C, spannungsbasiert)</li>
                <li>Coulomb-Zählung für höhere Genauigkeit</li>
            </ul>

            <h3>🛡️ Schutzschaltungen</h3>
            <p><strong>TVS-Dioden (Transient Voltage Suppressor):</strong></p>
            <ul>
                <li>Begrenzen Spannungsspitzen (ESD, induktive Rückschläge)</li>
                <li>Über Motorklemmen, Versorgungseingängen, Datenleitungen</li>
                <li>Durchbruchspannung &gt; Nennspannung + etwa 20 % wählen</li>
            </ul>
            <p><strong>Verpolschutz:</strong></p>
            <ul>
                <li>P-MOSFET in der High-Side (V_gs &lt; 0 für Leitung)</li>
                <li>Schottky-Diode (einfach, aber Verlustleistung)</li>
            </ul>
            <p><strong>Überstromschutz:</strong></p>
            <ul>
                <li>Rückstellbare Sicherungen (PTC, Polyfuse)</li>
                <li>Elektronische Sicherungen mit Strommessung + MOSFET</li>
            </ul>

            <div class="visual-ref-links">
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=buck+boost+LDO+voltage+regulator+PCB+circuit+diagram&udm=2')">🔍 Ansehen: Spannungsregler</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=H-bridge+motor+driver+MOSFET+circuit+diagram&udm=2')">📷 Ansehen: H-Brücken-Treiber</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=TVS+diode+protection+circuit+ESD+PCB&udm=2')">⚡ Ansehen: TVS-Schutz</button>
            </div>
        `,
        relatedTopics: [{ level: 'level1', index: 0, label: 'Mathematik, Physik und grundlegende Konzepte' }, { level: 'level3', index: 2, label: 'Power Integrity und fortgeschrittenes Versorgungsdesign' }],
        resources: [{ title: 'TI Power Supply Design Seminar', url: 'https://www.ti.com/design-resources/design-tools-simulation/power-supply-design-seminar.html' }, { title: 'TI Webench Power Designer', url: 'https://www.ti.com/design-resources/design-tools-simulation/webench-power-designer.html' }]
    },
    {
        title: 'Mikrocontroller-Hardwaredesign',
        content: `
            <h3>📖 Datenblätter lesen</h3>
            <p><strong>Wichtigste Abschnitte:</strong></p>
            <ul>
                <li><strong>Absolute Maximum Ratings:</strong> NIEMALS ÜBERSCHREITEN (Schäden)</li>
                <li><strong>Electrical Characteristics:</strong> Betriebsbereiche, Stromaufnahme</li>
                <li><strong>Pin Descriptions:</strong> Funktion, Alternativmodi</li>
                <li><strong>Application Section:</strong> Referenzdesigns (diese als Vorlage nutzen!)</li>
                <li><strong>PCB Layout Recommendations:</strong> Entkopplungs- und Routing-Richtlinien</li>
            </ul>

            <p><strong>Hardware-Design-Guides:</strong></p>
            <ul>
                <li>ST: AN4488 (STM32 Hardware-Einstieg)</li>
                <li>Espressif: ESP32 Hardware Design Guidelines</li>
                <li>Raspberry Pi: RP2040 Hardware Design</li>
                <li><strong>Diese Guides verhindern 90 % der häufigen Probleme!</strong></li>
            </ul>

            <h3>⚡ Mindestbeschaltung des MCU</h3>
            <p><strong>Erforderliche Komponenten:</strong></p>
            <ol>
                <li><strong>Stromversorgung:</strong> 3,3 V oder 1,8 V geregelt, sauber</li>
                <li><strong>Entkopplungskondensatoren:</strong> 100 nF pro VCC/GND-Pin-Paar + 10 µF Bulk</li>
                <li><strong>Reset-Schaltung:</strong> Pull-up (10 kΩ) + Kondensator (100 nF) + Taster</li>
                <li><strong>Takt:</strong> Externer Quarz + Lastkondensatoren oder interner RC-Oszillator</li>
                <li><strong>Boot-Pins:</strong> Boot-Modus konfigurieren (Flash oder Bootloader)</li>
            </ol>

            <p><strong>STM32-Beispiel:</strong></p>
            <ul>
                <li>VDD/VSS-Paare: je 100 nF + 4,7 µF Bulk auf VDD</li>
                <li>VDDA (Analog): 100 nF + 1 µF + Ferritperle von VDD</li>
                <li>NRST: 10 kΩ Pull-up + 100 nF nach GND + Taster nach GND</li>
                <li>BOOT0: 10 kΩ Pull-down (Flash-Start), Jumper auf VDD für Bootloader</li>
                <li>Quarz: 8 MHz + 2× 20 pF Lastkondensatoren nach GND</li>
            </ul>

            <h3>🔌 Programmier- und Debug-Anschlüsse</h3>
            <p><strong>SWD (ARM Cortex):</strong></p>
            <ul>
                <li>4 Leitungen: SWDIO, SWDCLK, GND, VCC (optional)</li>
                <li>2×5 0,05"-Stecker verwenden (TC2050-IDC üblich)</li>
                <li>Serienwiderstände (100 Ω) zum Schutz hinzufügen</li>
                <li>Leitungen kurz halten (&lt; 10 cm für zuverlässige Programmierung)</li>
            </ul>

            <p><strong>UART-Bootloader:</strong></p>
            <ul>
                <li>Viele MCUs haben einen ROM-Bootloader über UART</li>
                <li>Kein spezieller Programmer nötig (USB-UART-Adapter reicht)</li>
                <li>BOOT-Pin-Konfiguration beim Reset erforderlich</li>
            </ul>

            <h3>🛡️ GPIO-Schutz</h3>
            <p><strong>Eingangsschutz:</strong></p>
            <ul>
                <li>Serienwiderstand (1–10 kΩ) begrenzt Strom bei Überspannung</li>
                <li>ESD-Dioden erhöhen Robustheit (intern vorhanden, extern optional)</li>
                <li>TVS-Dioden für Hochspannungsumgebungen</li>
            </ul>

            <p><strong>Ausgangsschutz:</strong></p>
            <ul>
                <li>Strombegrenzungswiderstand für LEDs</li>
                <li>Freilaufdioden für induktive Lasten (Relais, Solenoide)</li>
                <li>Niemals hohe Ströme direkt treiben — MOSFET/Transistor verwenden</li>
            </ul>

            <h3>📊 ADC-Eingangsschaltungen</h3>
            <ul>
                <li><strong>Referenzspannung:</strong> VREF bestimmt ADC-Vollaussteuerung (z. B. 3,3 V)</li>
                <li>Extern: TL431 (einstellbar), REF3033 (3,3 V, 0,05 %)</li>
                <li>RC-Filter vor ADC-Pin (Anti-Aliasing)</li>
                <li>Schutz: Schottky-Dioden auf VDD/GND (Überspannungsklemmung)</li>
            </ul>

            <div class="visual-ref-links">
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=STM32+minimal+circuit+schematic+decoupling+bypass+capacitors&udm=2')">🔍 Ansehen: MCU-Mindestbeschaltung</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=crystal+oscillator+load+capacitor+PCB+layout&udm=2')">📷 Ansehen: Quarzschaltungen</button>
            </div>
        `,
    },
    {
        title: 'Kommunikationsschnittstellen (Hardware-Fokus)',
        content: `
            <h3>📟 UART / RS-232 / RS-485</h3>
            <p><strong>UART-Grundlagen:</strong></p>
            <ul>
                <li>Asynchron, 2-Draht (TX/RX), kein Takt</li>
                <li>Logikpegel (0–3,3 V oder 0–5 V); Baudrate muss auf beiden Seiten übereinstimmen</li>
            </ul>

            <p><strong>RS-232:</strong></p>
            <ul>
                <li>±12-V-Signalisierung (logisch 1 = −12 V, logisch 0 = +12 V)</li>
                <li>Lange Übertragungswege (>15 m möglich)</li>
                <li>Leitungstreiber-IC: MAX232 (Ladungspumpe, keine externe Versorgung nötig)</li>
                <li>DE-9-Stecker als Standard</li>
            </ul>

            <p><strong>RS-485:</strong></p>
            <ul>
                <li>Differenzsignalisierung (A/B-Paar)</li>
                <li>Multi-Drop-Bus (bis zu 32 Teilnehmer)</li>
                <li>Sehr lange Distanzen (1200 m @ 100 kbps)</li>
                <li>Transceiver: MAX485, SN65HVD75</li>
                <li><strong>Abschluss:</strong> 120-Ω-Widerstand an beiden Busenden</li>
            </ul>

            <h3>🔄 SPI (Serial Peripheral Interface)</h3>
            <p><strong>Signale:</strong></p>
            <ul>
                <li><strong>MOSI:</strong> Master Out, Slave In (Daten zur Peripherie)</li>
                <li><strong>MISO:</strong> Master In, Slave Out (Daten von der Peripherie)</li>
                <li><strong>SCK:</strong> Takt (Master erzeugt)</li>
                <li><strong>CS/SS:</strong> Chip-Select (aktiv Low, einer pro Slave)</li>
            </ul>

            <p><strong>Geschwindigkeitsgrenzen:</strong></p>
            <ul>
                <li>Kurze PCB-Leitungen: 10–50 MHz typisch</li>
                <li>Begrenzt durch: Leitungskapazität, maximale Peripheriefrequenz</li>
                <li>Serienterminierung (22–33 Ω) bei beobachtetem Überschwingen</li>
            </ul>

            <h3>🔗 I²C (Inter-Integrated Circuit)</h3>
            <p><strong>Open-Drain-Topologie:</strong></p>
            <ul>
                <li>Erfordert externe Pull-up-Widerstände (SDA und SCL)</li>
                <li>Geräte können nur auf Low ziehen, Widerstände ziehen auf High</li>
            </ul>

            <p><strong>Pull-up-Widerstandsberechnung:</strong></p>
            <ul>
                <li><strong>Formel:</strong> R = (V_supply − 0,4 V) / (3 mA × N_Geräte)</li>
                <li><strong>Typischer Bereich:</strong> 2,2 kΩ – 10 kΩ</li>
                <li>Standard: 100 kHz (C_bus &lt; 400 pF) | Fast: 400 kHz | Fast Plus: 1 MHz</li>
            </ul>

            <h3>🚗 CAN-Bus</h3>
            <p><strong>Differenzsignalisierung:</strong></p>
            <ul>
                <li>CAN_H und CAN_L als verdrilltes Paar</li>
                <li>Transceiver konvertiert MCU-Logik in Differenzsignal: MCP2551, TJA1050, SN65HVD230</li>
                <li><strong>120-Ω-Abschluss an beiden Busenden erforderlich!</strong></li>
                <li>CAN_H und CAN_L zusammen routen, gleiche Länge, konsistenter Abstand</li>
            </ul>

            <h3>🔌 USB</h3>
            <p><strong>USB 2.0 Full-Speed (12 Mbit/s):</strong></p>
            <ul>
                <li>Differenzpaar: D+ und D− (90 Ω Impedanz)</li>
                <li>Serienterminierung: 22 Ω auf jeder Leitung an der Quelle</li>
                <li>PCB-Routing: Gleiche Länge (±5 mm), enge Kopplung</li>
            </ul>

            <p><strong>ESD-Schutz:</strong></p>
            <ul>
                <li><strong>Pflicht für externe Anschlüsse</strong></li>
                <li>Dedizierte USB-ESD-ICs: TPD2E001, USBLC6</li>
                <li>Nah am Stecker platzieren (&lt; 5 mm)</li>
            </ul>

            <div class="visual-ref-links">
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=SPI+I2C+UART+CAN+bus+wiring+diagram+comparison&udm=2')">🔍 Ansehen: Kommunikationsbusse</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=RS-485+differential+pair+network+termination+diagram&udm=2')">📷 Ansehen: RS-485-Netzwerke</button>
            </div>
        `,
    },
    {
        title: 'PCB-Layout-Techniken für Fortgeschrittene',
        content: `
            <h3>📚 4-Lagen-PCB Grundlagen</h3>
            <p><strong>Standard-Lagenaufbau:</strong></p>
            <ul>
                <li><strong>Lage 1:</strong> Obere Signallage</li>
                <li><strong>Lage 2:</strong> Massefläche (vollflächiges Kupfer)</li>
                <li><strong>Lage 3:</strong> Versorgungsfläche(n) (VCC, 3,3 V, 5 V)</li>
                <li><strong>Lage 4:</strong> Untere Signallage</li>
            </ul>

            <p><strong>Vorteile gegenüber 2-Lagen:</strong></p>
            <ul>
                <li>Bessere Signalintegrität (kürzere Rückstrompfade)</li>
                <li>Geringere EMI (Massefläche als Abschirmung)</li>
                <li>Mehr Routing-Platz | Bessere Stromverteilung</li>
                <li>Kostendifferenz: ~2–3× gegenüber 2-Lagen (oft lohnenswert!)</li>
            </ul>

            <h3>🌍 Best Practices für Masseflächen</h3>
            <ul>
                <li>Massefläche durchgehend halten (nicht aufschneiden)</li>
                <li>Einschnürungen zwingen Rückstrom auf langen Umweg → EMI, Rauschen</li>
                <li>Stitching-Vias: Ober- und Unterseiten-Masseflächen häufig verbinden</li>
                <li>Kupferfüllungen in ungenutzten Bereichen → GND-Kupfer</li>
            </ul>

            <h3>⚡ Entkopplungskondensator-Platzierung</h3>
            <p><strong>Die goldene Regel:</strong> Direkt neben den Versorgungspins!</p>
            <ul>
                <li><strong>Abstand:</strong> &lt; 5 mm Leiterbahn vom Kondensator zum IC-Pin</li>
                <li><strong>Via-Platzierung:</strong> Direkt vom Kondensatorpad zur Massefläche</li>
                <li>100 nF Keramik (X7R): Eines pro VCC/GND-Pin-Paar</li>
                <li>10 µF Bulk: Eines pro IC (oder pro Gruppe kleiner ICs)</li>
            </ul>

            <h3>🔌 Stromführung</h3>
            <p><strong>Leiterbahnbreiten:</strong></p>
            <ul>
                <li>Nach IPC-2152 dimensionieren (1 oz, 1 mm breit → ~2 A extern bei 10 °C Erwärmung)</li>
                <li>Für Motorversorgung: Immer Puffer einplanen — 3-A-Leiterbahn für 2 A max.</li>
                <li>Kupferflächen für Hochstrompfade verwenden</li>
            </ul>

            <p><strong>Schaltregler-Layout (Hot-Loop):</strong></p>
            <ul>
                <li>Hot-Loop: Hochfrequenter di/dt-Strompfad — Fläche minimieren!</li>
                <li>Schaltknoten-Leiterbahnen kurz und breit halten</li>
                <li>Massefläche unter der gesamten Schaltung</li>
            </ul>

            <h3>🧱 Mehrlagige Aufbauten</h3>
            <ul>
                <li>Vierlagige Platinen vereinfachen Rückstromführung und EMV deutlich</li>
                <li>6-lagig für komplexe MCU/FPGA-Boards mit DDR, USB-HS, CAN + Analog</li>
                <li>DRC ist notwendig, garantiert aber keine einwandfreie Signalintegrität</li>
            </ul>

            <div class="visual-ref-links">
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=4+layer+PCB+stackup+ground+plane+signal+power&udm=2')">🔍 Ansehen: Mehrlagenaufbauten</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=decoupling+capacitor+PCB+placement+via+ground+plane&udm=2')">📷 Ansehen: Entkopplungsplatzierung</button>
            </div>
        `,
    },
    {
        title: 'Design für Herstellbarkeit (DFM) und Montage (DFA)',
        content: `
            <h3>🏭 Fertigungsgrenzen verstehen</h3>
            <ul>
                <li>Mindestbreiten, Mindestabstände, Bohrdurchmesser und Restringe müssen zur Fertigung passen</li>
                <li>Designs sollten nicht auf der absoluten Fertigungsgrenze betrieben werden</li>
                <li>Mechanische Toleranzen müssen Teil des Layoutdenkens sein</li>
            </ul>

            <h3>📐 Footprints und Land Patterns</h3>
            <ul>
                <li>Footprints aus Datenblatt oder IPC-7351-Standard ableiten</li>
                <li>Drei Dichte-Level: A (Maximum, für Nachlötung), B (nominal), C (dicht)</li>
                <li>Thermal Pads und Via-in-Pad erfordern besondere Aufmerksamkeit</li>
                <li>Für Handlötung darf ein Footprint etwas gutmütiger ausgelegt sein</li>
            </ul>

            <h3>📦 BOM-Management</h3>
            <ul>
                <li>Hersteller, MPN, Lieferant und Lebenszyklusstatus dokumentieren</li>
                <li>Alternativbauteile reduzieren Lieferkettenrisiko</li>
                <li>Verfügbarkeitsprüfung ist Teil der Entwicklung, nicht nur des Einkaufs</li>
                <li>Lifecycle-Status prüfen: NRND (Not Recommended for New Designs) oder Obsolete vermeiden</li>
            </ul>

            <h3>🏗️ Montageausgaben</h3>
            <ul>
                <li>BOM, Pick-and-Place-Datei und Bestückungszeichnung müssen konsistent sein</li>
                <li>Polung, Pin-1-Markierung und DNP-Bauteile klar kennzeichnen</li>
                <li>Fiducials (3 pro Panel mindestens) und Panelisierung früh berücksichtigen</li>
            </ul>

            <h3>🎨 Siebdruck und Pastenmaske</h3>
            <ul>
                <li>Beschriftung muss lesbar und frei von Pads bleiben</li>
                <li>Pastenmaske entscheidet über Lötqualität und Tombstoning</li>
                <li>Gute Dokumentation reduziert Montagefehler drastisch</li>
            </ul>
        `,
    },
    {
        title: 'Fortgeschrittene Projekte (Fokus: Embedded/Robotik)',
        content: `
            <h3>🚀 Projekt 1: Hochgeschwindigkeits-MCU-Board</h3>
            <p><strong>Ziel: STM32H7 oder STM32F7 mit:</strong></p>
            <ul>
                <li>QSPI-Flash (W25Q64, ≤ 80 MHz, Längenabgleich für 4 Datenleitungen)</li>
                <li>SDIO SD-Karte (4-Bit, ≤ 50 MHz, abgeglichener Bus)</li>
                <li>USB-HS (90 Ω differenziell, ESD-Schutz, Crystal-less mit ULPI-PHY)</li>
                <li>Ethernet RMII (50-MHz-Referenztakt, Übertrager nach Layout-Guide)</li>
                <li>4-Lagen-Stackup: Signal – GND – PWR – Signal</li>
            </ul>
            <p><strong>Geübte Fähigkeiten:</strong> SI-Routing, kontrollierte Impedanz, USB-HS-Layout, staged Bring-up</p>

            <h3>🤖 Projekt 2: Vollständiger Roboter-Controller</h3>
            <p><strong>Kompletter Einplatinen-Controller für einen Rad-/Beinroboter:</strong></p>
            <ul>
                <li><strong>MCU:</strong> STM32F4/H7 (Cortex-M4/7, FPU für Regelkreise)</li>
                <li><strong>Motortreiber:</strong> 4× DRV8874 (Bürstenmotor, 2 A je Kanal)</li>
                <li><strong>Encoder-Eingänge:</strong> 4× Quadratur-Hardware-Decoder (Timer-Encoder-Mode)</li>
                <li><strong>IMU:</strong> ICM-42688-P (6-Achsen, SPI, rauscharmes Layout)</li>
                <li><strong>CAN-Bus:</strong> TJA1051 Transceiver, 120-Ω-Abschluss, Differenzpaar-Layout</li>
                <li><strong>Versorgung:</strong> 3S-LiPo-Eingang, synchroner Buck (5 V/3 A Logik), separater Motorstrompfad</li>
            </ul>

            <h3>📡 Projekt 3: Mixed-Signal-Datenerfassungsboard</h3>
            <p><strong>Für Präzisionsmessanwendungen (Kraft, Vibration, Umwelt):</strong></p>
            <ul>
                <li>Instrumentenverstärker (INA128) für Dehnungsmessstreifen-Brücke</li>
                <li>Präzisions-24-Bit-ADC (ADS1256 SPI, 30 kSPS)</li>
                <li>Rauscharme Analogversorgung: LT3042 (Ultratiefstärke-LDO, 0,8 µVrms)</li>
                <li>Isolierte Versorgung und Signal (ISO7242C digitaler Isolator)</li>
                <li>Separate AGND-/DGND-Flächen mit Sternpunkt</li>
            </ul>

            <h3>✅ Erfolgsstrategie</h3>
            <ul>
                <li>Teilsysteme zuerst getrennt testen</li>
                <li>Vorab einen Bring-up-Plan formulieren</li>
                <li>Zusätzliche Messpunkte und Reserveflächen für Nacharbeit vorsehen</li>
            </ul>
        `,
    }
]);
