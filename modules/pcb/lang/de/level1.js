i18n.registerContent('de', 'level1', [
    {
        title: 'Mathematik, Physik und grundlegende Konzepte',
        content: `
            <h3>⚡ Elektrische Grundlagen</h3>
            <p><strong>Ohmsches Gesetz:</strong> U = I × R</p>
            <ul>
                <li><strong>Spannung (U):</strong> Elektrische Potenzialdifferenz, gemessen in Volt (V)</li>
                <li><strong>Strom (I):</strong> Fluss der elektrischen Ladung, gemessen in Ampere (A)</li>
                <li><strong>Widerstand (R):</strong> Widerstand gegen den Stromfluss, gemessen in Ohm (Ω)</li>
            </ul>
            
            <h3>📐 Kirchhoffsche Gesetze</h3>
            <p><strong>Knotenregel (KCL):</strong> Die Summe der in einen Knoten fließenden Ströme ist gleich der Summe der abfließenden Ströme</p>
            <p><strong>Maschenregel (KVL):</strong> Die Summe aller Spannungen in einer geschlossenen Masche ist Null</p>
            
            <h3>🔌 Gleichstromkreise (DC)</h3>
            <ul>
                <li><strong>Reihenschaltung:</strong> R_ges = R1 + R2 + R3...</li>
                <li><strong>Parallelschaltung:</strong> 1/R_ges = 1/R1 + 1/R2 + 1/R3...</li>
                <li><strong>Spannungsteiler:</strong> U_aus = U_ein × (R2 / (R1 + R2))</li>
                <li><strong>Stromteiler:</strong> I1 = I_ges × (R2 / (R1 + R2))</li>
            </ul>
            
            <h3>🌊 Wechselstromkonzepte (AC)</h3>
            <p><strong>Sinuswellen:</strong> u(t) = U_peak × sin(2πft)</p>
            <p><strong>Frequenz (f):</strong> Zyklen pro Sekunde (Hz)</p>
            <p><strong>Effektivwert (RMS):</strong> Root Mean Square = Peak / √2</p>
            <p><strong>Reaktanz:</strong> Wechselstromwiderstand in Kondensatoren (X_C) und Induktivitäten (X_L)</p>

            <div class="visual-ref-links">
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=Ohms+law+circuit+diagram+voltage+current+resistance&udm=2')">🔍 Ansehen: Ohmsches Gesetz Schaltungen</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=series+parallel+circuit+diagram+educational&udm=2')">📷 Ansehen: Reihen- vs. Parallelschaltung</button>
            </div>
        `,
        keyPoints: ['Beherrsche das Ohmsche Gesetz: U = I × R für jede Schaltungsberechnung', 'Berechne Reihen-/Parallelschaltungen und Spannungsteiler', 'Unterscheide Gleichstrom (konstant) von Wechselstrom (Frequenz, Effektivwert)'],
        relatedTopics: [{ level: 'level1', index: 1, label: 'Elektronische Kernkomponenten' }, { level: 'level1', index: 2, label: 'Grundlegende Analogschaltungen' }],
        resources: [{ title: 'All About Circuits — Lehrbuch (Englisch)', url: 'https://www.allaboutcircuits.com/textbook/' }, { title: 'Falstad Schaltungssimulator', url: 'https://www.falstad.com/circuit/circuitjs.html?lang=de' }]
    },
    {
        title: 'Elektronische Kernkomponenten',
        content: `
            <h3>⚡ Widerstände</h3>
            <p>Begrenzen den Stromfluss, teilen Spannungen auf und leiten Leistung als Wärme ab.</p>
            <ul>
                <li><strong>Farbcode:</strong> Braun(1) Rot(2) Orange(3) Gelb(4) Grün(5) Blau(6) Violett(7) Grau(8) Weiß(9)</li>
                <li><strong>Toleranz:</strong> Gold(±5%), Silber(±10%), Keine(±20%)</li>
                <li><strong>Leistung:</strong> 1/8W, 1/4W, 1/2W, 1W, 2W...</li>
            </ul>
            
            <h3>🔋 Kondensatoren</h3>
            <p>Speichern Energie in einem elektrischen Feld. Blockieren DC, leiten AC.</p>
            <ul>
                <li><strong>Keramik:</strong> Kleine Werte (pF bis µF), ungepolt, günstig</li>
                <li><strong>Elektrolyt:</strong> Große Werte (µF bis mF), gepolt, spannungsempfindlich</li>
                <li><strong>Formel:</strong> C = Q/U, Energie = ½CU²</li>
                <li><strong>Anwendungen:</strong> Filterung, Entkopplung, Zeitschaltungen</li>
            </ul>
            
            <h3>🧲 Induktivitäten (Spulen)</h3>
            <p>Speichern Energie in einem Magnetfeld. Leiten DC, blockieren hochfrequenten AC.</p>
            <ul>
                <li><strong>Formel:</strong> U = L(dI/dt)</li>
                <li><strong>Anwendungen:</strong> Filter, DC-DC Wandler, EMI-Unterdrückung</li>
            </ul>
            
            <h3>➡️ Dioden</h3>
            <p>Lassen Strom nur in eine Richtung fließen.</p>
            <ul>
                <li><strong>Gleichrichterdieode:</strong> Wandelt AC in DC (~0.7V Durchlassspannung)</li>
                <li><strong>Zener-Diode:</strong> Spannungsregulierung (konstante Durchbruchspannung)</li>
                <li><strong>Schottky-Diode:</strong> Niedrige Durchlassspannung (~0.3V), schnelles Schalten</li>
                <li><strong>LED:</strong> Lichtemission (U_f: Rot 2V, Grün 2.2V, Blau 3.2V)</li>
            </ul>
            
            <h3>🔀 Transistoren</h3>
            <p><strong>BJT (Bipolartransistor):</strong> Stromgesteuerter Schalter/Verstärker</p>
            <ul>
                <li>NPN: Kollektor → Emitter, wenn Basisstrom anliegt</li>
                <li>PNP: Emitter → Kollektor, wenn Basisstrom auf Low gezogen wird</li>
                <li>Verwendung: Motortreiber, Logik-Schnittstellen, Verstärker</li>
            </ul>
            
            <p><strong>MOSFET:</strong> Spannungsgesteuerter Schalter (Favorit in der Robotik!)</p>
            <ul>
                <li>N-Kanal: Leitet, wenn Gate-Spannung hoch ist</li>
                <li>P-Kanal: Leitet, wenn Gate-Spannung niedrig ist</li>
                <li>Sehr hohe Eingangsimpedanz, effizientes Schalten</li>
                <li>Anwendungen: Motorsteuerung, Leistungsschaltung, H-Brücken</li>
            </ul>

            <div class="visual-ref-links">
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=resistor+capacitor+inductor+diode+real+photo+labeled&udm=2')">🔍 Ansehen: Elektronische Bauteile</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=MOSFET+BJT+transistor+pinout+diagram&udm=2')">📷 Ansehen: Transistortypen</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=resistor+color+code+chart+4+band&udm=2')">🎨 Ansehen: Farbcode-Tabelle</button>
            </div>
        `,
        keyPoints: ['Lese 4-Ring-Widerstandsfarbcodes, um den Wert zu bestimmen', 'Wähle den richtigen Kondensatortyp (Keramik vs. Elektrolyt) für die Anwendung', 'Nutze NPN, MOSFET oder BJT zum Schalten von Lasten basierend auf der Gate-/Basissteuerung']
    },
    {
        title: 'Grundlegende Analogschaltungen',
        content: `
            <h3>🔽 RC-Filter</h3>
            <p><strong>Tiefpassfilter:</strong> Lässt tiefe Frequenzen passieren, blockiert hohe Frequenzen</p>
            <ul>
                <li>Konfiguration: R → C nach Masse</li>
                <li>Grenzfrequenz: f_c = 1 / (2πRC)</li>
                <li>Verwendung: Sensorrauschfilterung, Konditionierung von ADC-Eingängen</li>
            </ul>
            
            <p><strong>Hochpassfilter:</strong> Blockiert Gleichspannung (DC), lässt Wechselspannung (AC) passieren</p>
            <ul>
                <li>Konfiguration: C → R nach Masse</li>
                <li>Verwendung: Entfernen von DC-Offset, AC-Kopplung</li>
            </ul>
            
            <h3>📊 Spannungsteiler</h3>
            <p>Erzeugen Referenzspannungen für ADC-Eingänge oder Sensor-Vorspannungen.</p>
            <pre>U_aus = U_ein × (R2 / (R1 + R2))</pre>
            <p><strong>Konditionierung für ADC-Eingänge:</strong></p>
            <ul>
                <li>Skaliere 0-24V Sensoren auf den 0-3.3V ADC-Bereich</li>
                <li>Schutz hinzufügen (Klemmdioden, Vorwiderstand)</li>
                <li>Tiefpassfilter zur Rauschminderung</li>
            </ul>
            
            <h3>🔺 Operationsverstärker (Op-Amp) Grundlagen</h3>
            <p><strong>Puffer (Impedanzwandler):</strong> Verstärkung = 1, hohe Eingangsimpedanz</p>
            <p><strong>Nicht-invertierender Verstärker:</strong> Verstärkung = 1 + (R_f / R_in)</p>
            <p><strong>Invertierender Verstärker:</strong> Verstärkung = -(R_f / R_in)</p>
            <p><strong>Komparator:</strong> Ausgang High, wenn U+ > U-, sonst Low</p>
            
            <h3>🌡️ Sensor-Schnittstellen</h3>
            <p><strong>NTC-Thermistor:</strong> Widerstand sinkt mit steigender Temperatur</p>
            <ul>
                <li>Spannungsteiler + ADC zur Widerstandsmessung</li>
                <li>Umrechnung in Temperatur mit der Steinhart-Hart-Gleichung</li>
            </ul>
            
            <p><strong>Strommessung (Shunt-Widerstand):</strong></p>
            <ul>
                <li>Kleiner Messwiderstand (0.01Ω - 0.1Ω) in Reihe zur Last</li>
                <li>Spannungsabfall am Shunt messen: I = U / R_shunt</li>
                <li>Verstärkung mit Op-Amp oder speziellem Strommess-IC</li>
            </ul>

            <div class="visual-ref-links">
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=RC+low+pass+high+pass+filter+circuit+diagram&udm=2')">🔍 Ansehen: RC-Filterschaltungen</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=op+amp+inverting+non+inverting+buffer+circuit+diagram&udm=2')">📷 Ansehen: Op-Amp Schaltungen</button>
            </div>
        `,
        keyPoints: ['Berechne die RC-Filter-Grenzfrequenz: f_c = 1/(2πRC)', 'Skaliere Sensorspannungen mit Spannungsteilern auf den ADC-Bereich', 'Konfiguriere die Verstärkung des nicht-invertierenden Op-Amps: 1 + (R_f/R_in)'],
        relatedTopics: [{ level: 'level1', index: 0, label: 'Mathematik, Physik und grundlegende Konzepte' }, { level: 'level2', index: 0, label: 'Tiefere Analogelektronik' }],
        resources: [{ title: 'LTspice — Kostenloser SPICE Simulator', url: 'https://www.analog.com/en/design-center/design-tools-and-calculators/ltspice-simulator.html' }]
    },
    {
        title: 'Grundlagen der Digitalen Logik',
        content: `
            <h3>⚡ Logikpegel</h3>
            <p><strong>Gängige Standards:</strong></p>
            <ul>
                <li><strong>5V TTL:</strong> Low: 0-0.8V, High: 2.0-5V</li>
                <li><strong>3.3V CMOS:</strong> Low: 0-0.8V, High: 2.0-3.3V (meiste moderne MCUs)</li>
                <li><strong>1.8V:</strong> Wird in einigen stromsparenden MCUs und FPGAs verwendet</li>
            </ul>
            
            <h3>🚪 Logikgatter</h3>
            <ul>
                <li><strong>AND (UND):</strong> Ausgang 1 nur, wenn alle Eingänge 1 sind</li>
                <li><strong>OR (ODER):</strong> Ausgang 1, wenn ein Eingang 1 ist</li>
                <li><strong>NOT (NICHT):</strong> Invertiert den Eingang</li>
                <li><strong>NAND:</strong> NOT-AND (Universelles Gatter)</li>
                <li><strong>NOR:</strong> NOT-OR (Universelles Gatter)</li>
                <li><strong>XOR:</strong> Ausgang 1, wenn Eingänge unterschiedlich sind (Exklusiv-ODER)</li>
            </ul>
            
            <h3>💾 Flip-Flops & Register</h3>
            <p><strong>D-Flip-Flop:</strong> Speichert 1 Bit, ändert sich an der Taktflanke</p>
            <p><strong>Schieberegister:</strong> Kette von Flip-Flops, Daten verschieben sich bei jedem Takt</p>
            <ul>
                <li>Verwendung: Seriell-zu-Parallel-Wandlung (z.B. 74HC595)</li>
                <li>Anwendung: Steuerung vieler LEDs mit nur 3 MCU-Pins</li>
            </ul>
            
            <h3>🔢 Zahlensysteme</h3>
            <p><strong>Binär:</strong> Basis 2 (0, 1) - z.B. 1011 = 11 Dezimal</p>
            <p><strong>Hexadezimal:</strong> Basis 16 (0-9, A-F) - z.B. 0x2F = 47 Dezimal</p>
            <p><strong>Zweierkomplement:</strong> Darstellung vorzeichenbehafteter Ganzzahlen</p>
            <ul>
                <li>Bits invertieren und 1 addieren, um den negativen Wert zu erhalten</li>
                <li>Beispiel: -5 in 8-Bit = 11111011</li>
                <li>Wichtig für Firmware: ADC-Werte, Sensordaten</li>
            </ul>

            <div class="visual-ref-links">
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=logic+gates+AND+OR+NOT+truth+table+diagram&udm=2')">🔍 Ansehen: Logikgatter</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=D+flip+flop+shift+register+74HC595+diagram&udm=2')">📷 Ansehen: Flip-Flops & Register</button>
            </div>
        `,
        keyPoints: ['Unterscheide 5V TTL vs. 3.3V CMOS Logikpegel', 'Rechne zwischen Binär-, Dezimal- und Hexadezimalsystemen um', 'Nutze D-Flip-Flops und Schieberegister (74HC595) zur Datenspeicherung']
    },
    {
        title: 'Grundlagen: Werkzeuge & Messgeräte',
        content: `
            <h3>🍞 Breadboard-Prototyping (Steckplatine)</h3>
            <ul>
                <li>Reihen sind horizontal verbunden, Stromschienen vertikal</li>
                <li>Kein Löten erforderlich - schnelles Testen</li>
                <li>Einschränkungen: Schlecht für Hochgeschwindigkeits-Signale, lose Verbindungen</li>
            </ul>
            
            <h3>📏 Multimeter</h3>
            <p><strong>Wichtige Messungen:</strong></p>
            <ul>
                <li><strong>Spannung:</strong> Parallel zum Bauteil messen (Rot=+, Schwarz=Masse)</li>
                <li><strong>Strom:</strong> In Reihe messen (Stromkreis auftrennen, Messgerät dazwischen schalten)</li>
                <li><strong>Widerstand:</strong> Stromkreis vorher stromlos machen!</li>
                <li><strong>Diodentest:</strong> Prüft die Durchlassspannung (~0.6-0.7V)</li>
                <li><strong>Durchgangsprüfer:</strong> Piepton bei Kurzschluss oder guter Verbindung</li>
            </ul>
            
            <h3>📊 Oszilloskop</h3>
            <p>Visualisiert Spannungsverläufe über die Zeit - kritisch für Fehlersuche!</p>
            <ul>
                <li><strong>Kanäle:</strong> 2-4 gleichzeitige Signale</li>
                <li><strong>Bandbreite:</strong> 50MHz für Basics, 100MHz+ für High-Speed</li>
                <li><strong>Triggerung:</strong> Erfassen spezifischer Ereignisse (steigende Flanke, etc.)</li>
                <li><strong>Messungen:</strong> Frequenz, Amplitude, Anstiegszeit, Tastgrad (Duty Cycle)</li>
            </ul>
            <p><strong>Was man misst:</strong></p>
            <ul>
                <li>Stromversorgung (Prüfung auf Restwelligkeit, Rauschen)</li>
                <li>PWM-Signale (Frequenz, Tastgrad verifizieren)</li>
                <li>Digitale Kommunikation (SPI/I2C/UART Timing)</li>
                <li>Analoge Sensorausgänge</li>
            </ul>
            
            <h3>🔍 Logikanalysator</h3>
            <p>Dekodiert digitale Protokolle - unverzichtbar für Kommunikations-Debugging!</p>
            <ul>
                <li>8-16 Kanäle zur Erfassung mehrerer Signale</li>
                <li>Protokolldecoder: SPI, I2C, UART, CAN integriert</li>
                <li>Günstige Optionen: Saleae Logic, DSLogic</li>
                <li>Verwenden, wenn: Kommunikation fehlschlägt, Timing-Probleme</li>
            </ul>
            
            <h3>⚡ SPICE Simulation</h3>
            <p><strong>LTspice (kostenlos):</strong> Analoge Schaltungssimulation</p>
            <ul>
                <li>Schaltungen vor dem Bauen testen</li>
                <li>Filterdesigns, Op-Amp-Schaltungen verifizieren</li>
                <li>AC-Analyse (Frequenzgang), Transienten-Analyse (Zeitverhalten)</li>
            </ul>
            
            <p><strong>Falstad-Schaltungssimulator (online):</strong></p>
            <ul>
                <li>Interaktive Echtzeit-Visualisierung</li>
                <li>Gut zum Erlernen einfacher Schaltungen</li>
                <li>Keine Installation nötig</li>
            </ul>

            <div class="visual-ref-links">
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=breadboard+layout+connections+diagram+explained&udm=2')">🔍 Ansehen: Breadboard-Layout</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=oscilloscope+screen+waveform+PWM+signal&udm=2')">📷 Ansehen: Oszilloskop Signale</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=digital+multimeter+how+to+measure+voltage+current&udm=2')">🔧 Ansehen: Multimeter Nutzung</button>
            </div>
        `,
        keyPoints: ['Messe Spannung parallel, Strom in Reihe, Widerstand stromlos', 'Nutze Oszilloskop-Triggering, um PWM und Kommunikationssignale zu erfassen', 'Simuliere Schaltungen in LTspice oder Falstad vor dem Bau der Hardware'],
        relatedTopics: [{ level: 'level1', index: 5, label: 'Einführung in PCB-Design-Konzepte' }, { level: 'level1', index: 8, label: 'Löt- & Montagefähigkeiten' }],
        resources: [{ title: 'EEVblog — Multimeter-Tutorial (Englisch)', url: 'https://www.youtube.com/watch?v=gh1n_ELmpFI' }, { title: 'Saleae Logic Analyzer', url: 'https://www.saleae.com/' }]
    },
    {
        title: 'Einführung in PCB-Design-Konzepte',
        content: `
            <h3>🖼️ Was ist eine PCB?</h3>
            <p>Printed Circuit Board (Leiterplatte) - mechanischer Halt + elektrische Verbindungen</p>
            <ul>
                <li><strong>Ebenen (Layers):</strong> Kupfer (leitfähig), FR-4 Substrat (isolierend)</li>
                <li><strong>Leiterbahnen (Traces):</strong> Kupferwege für Signale/Strom</li>
                <li><strong>Pads:</strong> Lötpads für Komponenten</li>
                <li><strong>Durchkontaktierungen (Vias):</strong> Kontaktierte Löcher, die Ebenen verbinden</li>
                <li><strong>Kupferflächen (Copper Pours):</strong> Große Kupferbereiche (meist Masse/Ground)</li>
            </ul>
            
            <div class="visual-ref-links">
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=PCB+traces+pads+vias+diagram+labeled&udm=2')">🔍 Ansehen: Leiterbahnen, Pads & Vias</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=printed+circuit+board+close+up+photo+copper+traces&udm=2')">📷 Ansehen: Echte PCB-Nahaufnahmen</button>
            </div>
            
            <h3>📐 Schaltplan vs. Leiterplatte</h3>
            <p><strong>Schaltsymbol (Schematic Symbol):</strong> Logische Darstellung (Widerstand, IC)</p>
            <p><strong>Footprint (Land Pattern):</strong> Physisches Pad-Layout zum Löten</p>
            <ul>
                <li>SMD (Surface Mount): Winzig, für maschinelle Bestückung (0805, SOIC)</li>
                <li>THT (Through-Hole): Größer, für Handlötung (DIP, bedrahtete Kondensatoren)</li>
            </ul>

            <div class="visual-ref-links">
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=SMD+vs+through+hole+components+comparison+PCB&udm=2')">🔍 Ansehen: SMD vs. THT (Through-Hole)</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=SMD+0805+0603+component+size+comparison&udm=2')">📷 Ansehen: SMD-Bauformgrößen</button>
            </div>
            
            <h3>🔌 Netze & Beschriftungen</h3>
            <p><strong>Netz:</strong> Elektrisch verbundene Knoten im Schaltplan</p>
            <p><strong>Netz-Label:</strong> Name für ein Netz (z.B. "VCC", "GND", "MOSI")</p>
            <p><strong>Referenz-Bezeichner:</strong> Bauteil-ID (R1, C5, U3)</p>
            
            <h3>📚 Ebenentypen (Layer)</h3>
            <p><strong>Einseitig (Single-Layer):</strong> Nur oben Kupfer (billig, sehr einfach)</p>
            <p><strong>Zweiseitig (Double-Layer):</strong> Kupfer oben + unten (die meisten Hobby-Platinen)</p>
            <ul>
                <li>Massefläche (Ground Plane) unten</li>
                <li>Signal-Routing oben</li>
                <li>Vias verbinden die Ebenen</li>
            </ul>

            <div class="visual-ref-links">
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=PCB+layer+stackup+cross+section+diagram&udm=2')">🔍 Ansehen: PCB Schichtaufbau</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=PCB+cross+section+microscope+photo+layers&udm=2')">📷 Ansehen: Echte Querschnittsfotos</button>
            </div>
            
            <h3>⚙️ Designregeln (Design Rules)</h3>
            <p>Einschränkungen zur Sicherstellung der Herstellbarkeit:</p>
            <ul>
                <li><strong>Leiterbahnbreite (Trace Width):</strong> Minimal 6-8 mil (0.15-0.2mm) typisch</li>
                <li><strong>Abstand (Clearance):</strong> Platz zwischen Leiterbahnen (typ. min. 6–8 mil)</li>
                <li><strong>Bohrungsgröße:</strong> Minimalbohrer 0.3mm</li>
                <li><strong>Restring (Annular Ring):</strong> Kupfer um das Loch für Stabilität</li>
            </ul>
            
            <h3>🏭 Fertigungsübersicht</h3>
            <ol>
                <li><strong>Belichtung:</strong> Schaltkreismuster auf Kupfer übertragen</li>
                <li><strong>Ätzen:</strong> Unerwünschtes Kupfer entfernen</li>
                <li><strong>Bohren:</strong> Löcher für Vias und THT-Teile erstellen</li>
                <li><strong>Durchkontaktieren:</strong> Bohrlöcher leitfähig machen</li>
                <li><strong>Lötstopplack (Solder Mask):</strong> (Meist) grüne Schutzschicht</li>
                <li><strong>Bestückungsdruck (Silkscreen):</strong> Weiße Beschriftung</li>
                <li><strong>Oberfläche (Surface Finish):</strong> Kupfer schützen (HASL, ENIG)</li>
            </ol>
        `,
        keyPoints: ['Unterscheide Leiterbahnen, Pads, Vias und Kupferflächen', 'Lege minimale Breite und Abstände fest gemäß den Fähigkeiten der Fabrik', 'Ordne logischen Schaltsymbolen physische Footprints zu'],
        relatedTopics: [{ level: 'level1', index: 6, label: 'Anfänger EDA Tool Workflow' }, { level: 'level2', index: 5, label: 'PCB-Layout-Techniken für Fortgeschrittene' }],
        resources: [{ title: 'KiCad — offizielle Dokumentation', url: 'https://docs.kicad.org/' }, { title: 'JLCPCB — Fertigungsfähigkeiten', url: 'https://jlcpcb.com/capabilities/pcb-capabilities' }]
    },
    {
        title: 'Anfänger EDA Tool Workflow (KiCad)',
        content: `
            <h3>🛠️ KiCad Workflow</h3>
            <p>Kostenlose, quelloffene, professionelle EDA-Software</p>
            
            <h3>📝 Schritt 1: Schaltplanzeichnung (Schematic Capture)</h3>
            <ol>
                <li><strong>Komponenten platzieren:</strong> Taste 'A', Bibliothek durchsuchen</li>
                <li><strong>Strom-Symbole hinzufügen:</strong> VCC, GND, +3.3V</li>
                <li><strong>Verdrahten:</strong> Taste 'W', zum Verbinden klicken</li>
                <li><strong>Netze benennen:</strong> Wichtige Signale benennen (MOSI, SCK, TX, RX)</li>
                <li><strong>Werte hinzufügen:</strong> Widerstandswerte, Kondensatorspannungen etc.</li>
            </ol>
            
            <h3>🔗 Schritt 2: Footprints zuweisen</h3>
            <ul>
                <li>Jedes Symbol braucht einen physischen Footprint</li>
                <li>Widerstand → 0805, 1206 oder bedrahtet?</li>
                <li>MCU → QFN32, LQFP48 usw.</li>
                <li>Datenblatt nach empfohlenem „Land Pattern“ prüfen</li>
            </ul>
            
            <h3>✅ Schritt 3: Electrical Rule Check (ERC)</h3>
            <ul>
                <li>Deckt Fehler auf: nicht verbundene Pins, fehlende Versorgung</li>
                <li>Warnungen: Eingang mit Eingang verbunden (meist schlecht)</li>
                <li>Alle Fehler vor dem PCB-Layout beheben</li>
            </ul>
            
            <h3>🖼️ Schritt 4: PCB-Layout</h3>
            <ol>
                <li><strong>Netzliste importieren:</strong> Schaltplan in Editor laden</li>
                <li><strong>Platzieren:</strong> Funktionale Gruppierung (MCU + Kondensatoren nah beisammen)</li>
                <li><strong>Platinenumriss festlegen:</strong> Edge Cuts Ebene</li>
                <li><strong>Routen:</strong> Pads anhand des "Ratsnest" (Luftlinien) verbinden</li>
                <li><strong>Massefläche:</strong> Unbenutzte Fläche mit Kupfer füllen (Zone Fill)</li>
                <li><strong>Bohrlöcher:</strong> Montagebohrungen für M3 Schrauben hinzufügen</li>
            </ol>
            
            <h3>✅ Schritt 5: Design Rule Check (DRC)</h3>
            <ul>
                <li>Spurbreiten- und Abstandsregeln prüfen</li>
                <li>Auf überlappende Bahnen prüfen</li>
                <li>Sicherstellen, dass keine Netze unroutet sind</li>
                <li>Alle Fehler vor der Fertigung beheben</li>
            </ul>
            
            <h3>📦 Schritt 6: Fertigungsdateien erzeugen</h3>
            <ul>
                <li><strong>Gerber-Dateien:</strong> Standardformat für PCB-Fabriken (RS-274X)</li>
                <li><strong>Bohrdateien:</strong> Excellon-Format für Bohrungen</li>
                <li><strong>Stückliste (BOM):</strong> Komponentenliste mit Bestellnummern</li>
                <li><strong>Bestückungszeichnungen:</strong> Referenz für Bauteilplatzierung</li>
            </ul>
            
            <h3>🏭 Schritt 7: Bei der Fab bestellen</h3>
            <p><strong>Gängige Budget-Fabs:</strong></p>
            <ul>
                <li><strong>JLCPCB:</strong> z. B. wenige Dollar für 5 Platinen, schneller Versand, Bestückservice</li>
                <li><strong>PCBWay:</strong> gute Qualität, wettbewerbsfähige Preise</li>
                <li><strong>OSH Park:</strong> USA, violette Platinen, hohe Qualität</li>
            </ul>
            <p><strong>Typische Durchlaufzeit:</strong> 2–5 Tage Fertigung plus Versand</p>
            <p><strong>Standard-Spec:</strong> 2 Lagen, 1,6 mm, HASL, grüner Lötstopplack</p>

            <div class="visual-ref-links">
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=KiCad+schematic+editor+PCB+layout+screenshot&udm=2')">🔍 Ansehen: KiCad Benutzeroberfläche</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=Gerber+file+viewer+PCB+manufacturing+layers&udm=2')">📷 Ansehen: Gerber-Dateien</button>
            </div>
        `,
        keyPoints: ['KiCad-Workflow durchlaufen: Schaltplan → Footprints → ERC → Layout → DRC → Gerber', 'Alle ERC- und DRC-Fehler vor der Fertigung beheben', 'Gerber- und Bohrdateien erzeugen und bei JLCPCB/PCBWay bestellen']
    },
    {
        title: 'Anfängerprojekte (Fokus: Embedded & Robotik)',
        content: `
            <h3>💡 Projekt 1: LED Blinker</h3>
            <p><strong>Mit 555-Timer-IC (ohne Mikrocontroller):</strong></p>
            <ul>
                <li>Astabiler Modus - erzeugt Rechtecksignal</li>
                <li>Frequenz = 1.44 / ((R1 + 2×R2) × C)</li>
                <li>Komponenten: 555 IC, 2 Widerstände, Kondensator, LED, Stromversorgung</li>
                <li>Lerne: Timerschaltungen, Komponentenauswahl</li>
            </ul>
            
            <p><strong>Mit Mikrocontroller (Arduino/STM32):</strong></p>
            <ul>
                <li>Minimale Schaltung: MCU + Stromversorgung + LED + Widerstand</li>
                <li>Firmware: GPIO-Pin mit Verzögerung umschalten</li>
                <li>Lerne: MCU-Grundlagen, GPIO-Steuerung, Programmierung</li>
            </ul>
            
            <h3>🌡️ Projekt 2: Sensor-Zusatzplatine (Breakout Board)</h3>
            <p><strong>IMU (MPU6050, LSM6DS3) Beschleunigungssensor:</strong></p>
            <ul>
                <li>I2C-Schnittstelle zur MCU</li>
                <li>Komponenten: IMU-Chip, Entkopplungskondensatoren, Pull-up-Widerstände, Stiftleisten</li>
                <li>Lerne: I2C-Hardware, Sensoranbindung, PCB-Layout für Mixed-Signal</li>
            </ul>
            
            <p><strong>Temperatursensor (DS18B20, TMP36):</strong></p>
            <ul>
                <li>Analoger oder digitaler Ausgang</li>
                <li>Lerne: Sensorkonditionierung, ADC-Anbindung</li>
            </ul>
            
            <p><strong>Ultraschall (HC-SR04):</strong></p>
            <ul>
                <li>Trigger/Echo-Pins für Distanzmessung</li>
                <li>Lerne: Impuls-Timing, Pegelanpassung bei Bedarf</li>
            </ul>
            
            <h3>🔌 Projekt 3: Custom Arduino Shield</h3>
            <p>Spezialplatine, die auf einen Arduino Uno/Mega aufgesteckt wird</p>
            <ul>
                <li><strong>Ideen:</strong> Motortreiber-Shield, Sensor-Array, Relais-Steuerung</li>
                <li>Pin-Belegung des Arduino genau anpassen</li>
                <li>LEDs für Statusanzeigen hinzufügen</li>
                <li>Lerne: Stapelbare Header, Einschränkungen bei Shield-Design</li>
            </ul>
            
            <h3>🎛️ Projekt 4: Raspberry Pi Pico Carrier Board</h3>
            <p>Custom-Platine für einen RP2040 Mikrocontroller</p>
            <ul>
                <li>Minimalschaltung: RP2040, Flash-Speicher, Quarz, Spannungsregelung</li>
                <li>Hinzufügen: USB-Anschluss, GPIO-Breakout, Status-LEDs</li>
                <li>Lerne: Flash-Speicher-Anbindung, USB-Routing, Reset-Schaltungen</li>
            </ul>
            
            <h3>⚡ Projekt 5: USB Stromversorgungs-Board</h3>
            <p>Wandlung von 5V USB auf 3.3V für Elektronik-Projekte</p>
            <ul>
                <li><strong>Komponenten:</strong> USB-Buchse, LDO-Spannungsregler (AMS1117), Kondensatoren</li>
                <li>Eingang: 5V von USB</li>
                <li>Ausgang: 5V und 3.3V (mit Stiftleisten)</li>
                <li>Hinzufügen: Power-LED, ESD-Schutz (optional)</li>
                <li>Lerne: Lineare Spannungsregelung, Entkopplung, Stromverteilung</li>
            </ul>
            
            <h3>🎯 Erfolgstipps</h3>
            <ul>
                <li><strong>Einfach anfangen:</strong> Keine neuen Funktionen hinzufügen, bis die Basisversion läuft</li>
                <li><strong>Zuerst auf dem Breadboard testen:</strong> Schaltung verifizieren, bevor man die PCB erstellt</li>
                <li><strong>Datenblätter lesen:</strong> Referenzdesigns genau befolgen</li>
                <li><strong>Testpunkte (Test Points) einplanen:</strong> Wichtige Signale leicht messebar machen</li>
                <li><strong>Versionskontrolle (Version Control):</strong> Git für KiCad-Dateien nutzen (Änderungen nachverfolgen)</li>
                <li><strong>Dokumentieren:</strong> Schaltplan-Notizen, README mit Montageanleitung erstellen</li>
            </ul>

            <div class="visual-ref-links">
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=555+timer+LED+blinker+circuit+diagram+breadboard&udm=2')">🔍 Ansehen: 555-Timer Schaltungen</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=Arduino+shield+PCB+custom+motor+driver&udm=2')">📷 Ansehen: Arduino Shields</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=MPU6050+IMU+breakout+board+PCB&udm=2')">🔧 Ansehen: Sensor Breakout Boards</button>
            </div>
        `,
        keyPoints: ['Baue Prototypen vollständig auf dem Breadboard vor der PCB', 'Berechne LED-Vorwiderstände und Timer-Frequenzen', 'Bestelle und bestücke PCBs von günstigen Fabriken']
    },
    {
        title: 'Löt- & Montagefähigkeiten',
        content: `
            <h3>🔥 Grundlagen des Handlötens</h3>
            <p><strong>Benötigte Ausrüstung:</strong></p>
            <ul>
                <li><strong>Lötkolben:</strong> Temperaturgeregelt, z. B. Hakko FX-888D oder Pinecil; für bleifreies Löten meist 350–370 °C</li>
                <li><strong>Lötzinn:</strong> Bleifreies SAC305 (Sn96.5/Ag3/Cu0.5); etwa 0,5 mm für SMD und 0,8 mm für THT</li>
                <li><strong>Flussmittel:</strong> No-Clean-Flussmittelstift oder Paste; unverzichtbar für SMD-Arbeiten und Nacharbeit</li>
                <li><strong>Spitzenreiniger:</strong> Messingwolle ist besser als ein nasser Schwamm, weil die Spitze weniger thermisch belastet wird</li>
                <li><strong>Lötrauchabsaugung:</strong> Immer verwenden; Flussmitteldämpfe reizen Augen und Atemwege</li>
            </ul>

            <h3>📐 Technik für THT-Lötstellen</h3>
            <ol>
                <li><strong>Einsetzen:</strong> Bauteildrähte durch die Bohrungen stecken und leicht umbiegen, damit sie halten</li>
                <li><strong>Erwärmen:</strong> Lötspitze gleichzeitig an Pad und Draht anlegen, typischerweise 2–3 Sekunden</li>
                <li><strong>Lötzinn zuführen:</strong> Das Zinn an die erhitzte Verbindung halten, nicht direkt an die Spitze</li>
                <li><strong>Entfernen:</strong> Zuerst das Zinn, dann den Lötkolben wegnehmen; die gesamte Lötzeit sollte kurz bleiben</li>
                <li><strong>Prüfen:</strong> Eine gute Lötstelle ist glatt, leicht konkav und benetzt Pad und Anschluss vollständig</li>
            </ol>

            <p><strong>Häufige Fehler:</strong></p>
            <ul>
                <li><strong>Kalte Lötstelle:</strong> Matt oder körnig; entsteht durch zu wenig Wärme und ist elektrisch unzuverlässig</li>
                <li><strong>Zu viel Lötzinn:</strong> Kugel- oder Blob-Form; erschwert die Sichtprüfung und kann Brücken erzeugen</li>
                <li><strong>Abgelöstes Pad:</strong> Entsteht durch zu lange oder zu starke Erwärmung</li>
                <li><strong>Trockene Lötstelle:</strong> Das Lot benetzt die Oberfläche nicht; Ursache sind oft Schmutz oder fehlendes Flussmittel</li>
            </ul>

            <h3>🔬 SMD-Löten</h3>
            <p><strong>Drag-Soldering für SOIC- und TQFP-ICs:</strong></p>
            <ol>
                <li>Alle Pads großzügig mit Flussmittel benetzen</li>
                <li>Einen Eckpin mit wenig Lot fixieren</li>
                <li>IC unter Vergrößerung exakt ausrichten und bei Bedarf nachjustieren</li>
                <li>Die gegenüberliegende Ecke fixieren</li>
                <li>Etwas Lot an die Spitze geben und die Pins mit der Spitze abziehen; das Flussmittel verhindert Brücken</li>
                <li>Den Vorgang für alle Seiten wiederholen</li>
            </ol>

            <p><strong>Passive Bauteile wie 0805, 0603 oder 0402:</strong></p>
            <ul>
                <li>Ein Pad leicht vorverzinnen</li>
                <li>Das Bauteil mit der Pinzette halten, das Lot erneut aufschmelzen und das Bauteil in Position schieben</li>
                <li>Das zweite Pad normal verlöten</li>
                <li>Das erste Pad bei Bedarf kurz nacharbeiten, damit eine saubere Hohlkehle entsteht</li>
            </ul>

            <h3>🌊 Reflow-Löten im Hobbybereich</h3>
            <p><strong>Für SMD-Montage zu Hause:</strong></p>
            <ul>
                <li><strong>Lötpaste:</strong> Mit Schablone oder Spritze auftragen; üblich ist SAC305 in Typ 3 oder 4</li>
                <li><strong>Bestücken:</strong> Mit Pinzette, bei ICs optional mit Vakuumheber</li>
                <li><strong>Reflow:</strong> Mit Heizplatte, Heißluftstation oder modifiziertem Reflow-Ofen</li>
                <li><strong>Temperaturprofil:</strong> Vorheizen, Soak-Phase, Peak um etwa 245 °C und kontrolliertes Abkühlen</li>
                <li><strong>Grenzwert:</strong> 260 °C nicht überschreiten, da Bauteile sonst beschädigt werden können</li>
            </ul>

            <h3>🔧 Entlöten und Nacharbeit</h3>
            <ul>
                <li><strong>Entlötlitze:</strong> Nimmt geschmolzenes Lot auf und eignet sich gut für Pads und THT-Lötstellen</li>
                <li><strong>Entlötpumpe:</strong> Praktisch für durchkontaktierte Bohrungen</li>
                <li><strong>Heißluftstation:</strong> Wichtig zum Entfernen von SMD-ICs wie QFP, QFN oder BGA</li>
                <li><strong>Frisches Flussmittel:</strong> Vor jeder Nacharbeit neu auftragen; das verbessert Benetzung und Wärmeübertragung</li>
            </ul>

            <h3>🔍 Sichtprüfung und Qualität</h3>
            <ul>
                <li><strong>Sichtprüfung:</strong> Mit USB-Mikroskop oder Lupe jede Lötstelle kontrollieren</li>
                <li><strong>Durchgangsprüfung:</strong> Mit dem Multimeter kritische Verbindungen und Kurzschlüsse prüfen</li>
                <li><strong>Gute Lötstelle:</strong> Glatt, sauber benetzt, ohne Brücke und mit klar erkennbarer Form</li>
                <li><strong>Warnzeichen:</strong> Mattes Lot, Lotkugeln, angehobene Pads oder Brücken zwischen Pins</li>
            </ul>

            <h3>⚠️ Sicherheit</h3>
            <ul>
                <li>Lötrauch absaugen und Rauch nie direkt einatmen</li>
                <li>Nach dem Umgang mit Lot die Hände waschen, besonders bei bleihaltigem Material</li>
                <li>Den Lötkolben immer in einer Halterung ablegen</li>
                <li>Auf einer hitzebeständigen Unterlage arbeiten</li>
                <li>Beim Kürzen von Drahtenden Schutzbrille tragen</li>
            </ul>

            <div class="visual-ref-links">
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=good+solder+joint+vs+bad+cold+joint+PCB+photo&udm=2')">🔍 Ansehen: Gute und schlechte Lötstellen</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=SMD+drag+soldering+technique+TQFP+IC&udm=2')">📷 Ansehen: SMD-Löttechnik</button>
                <button class="visual-ref-btn" onclick="openVisualRef('https://www.google.com/search?igu=1&q=reflow+soldering+oven+solder+paste+stencil+PCB&udm=2')">🌊 Ansehen: Reflow-Prozess</button>
            </div>
        `,
        keyPoints: ['Beim THT-Löten immer Pad und Anschluss gleichzeitig erwärmen', 'Für SMD-ICs ist Drag-Soldering mit reichlich Flussmittel besonders effizient', 'Kalte Lötstellen, Brücken und beschädigte Pads müssen konsequent erkannt und nachgearbeitet werden'],
        relatedTopics: [{ level: 'level1', index: 4, label: 'Werkzeuge und Messtechnik' }, { level: 'level1', index: 7, label: 'Anfängerprojekte (Fokus: Embedded/Robotik)' }],
        resources: [{ title: 'Pace Lötschulung (YouTube)', url: 'https://www.youtube.com/watch?v=vIT4ra6Mo0s' }, { title: 'IPC J-STD-001 – Lötstandard', url: 'https://www.ipc.org/ipc-j-std-001' }]
    }
]);
