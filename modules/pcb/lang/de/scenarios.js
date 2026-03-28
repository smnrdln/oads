i18n.registerContent('de', 'scenarios', [
    // ═══════════════════════════════════════════
    // STUFE 1 — Anfänger-Szenarien (8, eines pro Thema)
    // ═══════════════════════════════════════════
    {
        level: 'level1', topicIndex: 0,
        title: 'Spannungsteiler für den ADC',
        description: 'Du willst eine 0–12-V-Batteriespannung mit einem 3,3-V-ADC messen. Welches Teilverhältnis brauchst du?',
        choices: [
            { text: 'Halbieren (R1=R2)', correct: false, xp: 0 },
            { text: 'Teilen durch ~3,64 (z. B. R1=10 kΩ, R2=3,9 kΩ)', correct: true, xp: 15 },
            { text: 'Mit 3,3 multiplizieren', correct: false, xp: 0 },
            { text: 'Kein Teiler — direkt anschließen', correct: false, xp: 0 }
        ],
        explanation: 'U_aus = U_ein × R2/(R1+R2). 12 V → 3,3 V: Faktor ≈ 3,3/12. Mit R1=10 kΩ, R2=3,9 kΩ: U_aus ≈ 3,37 V. Niemals ADC-Maximum überschreiten!'
    },
    {
        level: 'level1', topicIndex: 1,
        title: 'LED leuchtet nicht',
        description: 'Einfache LED-Schaltung mit 9-V-Batterie und Vorwiderstand — die LED bleibt dunkel. Was prüfst du zuerst?',
        choices: [
            { text: 'LED-Polarität (Anode zu +, Kathode zu −)', correct: true, xp: 15 },
            { text: 'Batterie durch 12 V ersetzen', correct: false, xp: 0 },
            { text: 'Vorwiderstand entfernen für mehr Strom', correct: false, xp: 0 },
            { text: 'Andere LED-Farbe probieren', correct: false, xp: 0 }
        ],
        explanation: 'LEDs sind gepolt — längeres Bein (Anode) über Vorwiderstand zu Plus, kürzeres (Kathode) zu Masse. Verpolt = kein Licht.'
    },
    {
        level: 'level1', topicIndex: 2,
        title: 'Rauschende Sensorwerte',
        description: 'Analogsensor (TMP36) am Arduino-ADC liefert starke Schwankungen, Verdrahtung wirkt ok. Welche analoge Maßnahme?',
        choices: [
            { text: 'Tiefpass RC (z. B. 1 kΩ + 100 nF) zwischen Sensor und ADC', correct: true, xp: 15 },
            { text: 'Versorgung auf 12 V erhöhen', correct: false, xp: 0 },
            { text: 'Längeres Kabel zum Sensor', correct: false, xp: 0 },
            { text: 'ADC schneller abtasten zum Mitteln', correct: false, xp: 0 }
        ],
        explanation: 'RC-Tiefpass dämpft HF-Rauschen vor dem ADC. Mit 1 kΩ und 100 nF Grenzfrequenz ~1,6 kHz — über dem langsamen Temperatursignal.'
    },
    {
        level: 'level1', topicIndex: 3,
        title: 'Rätselhafter Gatter-Ausgang',
        description: 'Gatter mit A=1, B=0 liefert Ausgang 1. Bei A=1, B=1 ist der Ausgang 0. Welches Gatter?',
        choices: [
            { text: 'AND', correct: false, xp: 0 },
            { text: 'OR', correct: false, xp: 0 },
            { text: 'NAND', correct: true, xp: 15 },
            { text: 'XOR', correct: false, xp: 0 }
        ],
        explanation: 'NAND ist nur 0, wenn alle Eingänge 1 sind — passt zu (1,0)→1 und (1,1)→0.'
    },
    {
        level: 'level1', topicIndex: 4,
        title: 'Oszilloskop zeigt nichts',
        description: 'Tastkopf auf 1-kHz-PWM, Anzeige flach — Schaltung funktioniert (LED blinkt). Was fehlt wahrscheinlich?',
        choices: [
            { text: 'Masseklemme nicht mit Schaltungsmasse verbunden', correct: true, xp: 15 },
            { text: 'Oszilloskop defekt', correct: false, xp: 0 },
            { text: 'PWM nicht messbar', correct: false, xp: 0 },
            { text: 'Frequenz zu hoch für das Gerät', correct: false, xp: 0 }
        ],
        explanation: 'Das Oszilloskop misst Spannung zwischen Tipp und Masseklemme — ohne Massebezug kein sinnvolles Signal.'
    },
    {
        level: 'level1', topicIndex: 5,
        title: 'Erste Platine — wie viele Lagen?',
        description: 'Einfaches Arduino-Shield mit 5 LEDs und 3 Tastern. Wie viele Kupferlagen?',
        choices: [
            { text: '1-lagig', correct: false, xp: 0 },
            { text: '2-lagig (Top + Bottom)', correct: true, xp: 15 },
            { text: '4-lagig', correct: false, xp: 0 },
            { text: '6-lagig', correct: false, xp: 0 }
        ],
        explanation: '2 Lagen: günstig, Massefläche unten für Rückleiter. 1 Lage oft zu eng; 4+ hier übertrieben.'
    },
    {
        level: 'level1', topicIndex: 6,
        title: 'KiCad ERC: „Unconnected Pin“',
        description: 'ERC meldet 3 unverbundene Pins an einem IC — im Datenblatt NC. Wie lösen?',
        choices: [
            { text: 'Warnungen ignorieren', correct: false, xp: 0 },
            { text: 'NC-Pins auf Masse legen', correct: false, xp: 0 },
            { text: '„No connect“-Flag (X) an jedem NC-Pin setzen', correct: true, xp: 15 },
            { text: 'Bauteil löschen und anderes wählen', correct: false, xp: 0 }
        ],
        explanation: 'KiCad-X am Pin sagt ERC: absichtlich offen — saubere Praxis. ERC-Warnungen nicht blind ignorieren.'
    },
    {
        level: 'level1', topicIndex: 7,
        title: 'Breadboard ok, PCB nicht',
        description: 'Dein LED-Blinker funktioniert auf dem Breadboard einwandfrei, aber nach dem Auflöten auf Lochraster (Perfboard) bleibt die LED dauernd an. Was solltest du prüfen?',
        choices: [
            { text: 'Versehentliche Lötbrücken zwischen benachbarten Pads', correct: true, xp: 15 },
            { text: 'Das Lochraster-Material blockiert den Strom', correct: false, xp: 0 },
            { text: 'Lötzinn ändert den Widerstand der Drähte', correct: false, xp: 0 },
            { text: 'LEDs funktionieren auf Lochraster nicht', correct: false, xp: 0 }
        ],
        explanation: 'Lötbrücken (unerwünschte Verbindungen zwischen Pads) sind auf Lochraster am häufigsten. Mit der Lupe prüfen und mit dem Multimeter Durchgang messen.'
    },
    {
        level: 'level1', topicIndex: 8,
        title: 'Tombstoning bei SMD',
        description: 'Nach Reflow stehen 0805-Kondensatoren auf („Tombstone“). Ursache?',
        choices: [
            { text: 'Ungleiche Pastenmenge auf den Pads — eine Seite zieht stärker', correct: true, xp: 15 },
            { text: 'Ofen zu kalt', correct: false, xp: 0 },
            { text: 'Kondensatoren defekt', correct: false, xp: 0 },
            { text: 'Platine zu dick', correct: false, xp: 0 }
        ],
        explanation: 'Ungleiche Oberflächenspannung: Paste, Pad-Geometrie, Wärmekapazität — symmetrische Pads und gleichmäßige Paste.'
    },

    // ═══════════════════════════════════════════
    // STUFE 2 — Fortgeschrittene Szenarien (8, eines pro Thema)
    // ═══════════════════════════════════════════
    {
        level: 'level2', topicIndex: 0,
        title: 'LDO wird extrem heiß',
        description: 'AMS1117 von 12 V auf 3,3 V bei 400 mA wird gefährlich heiß. Verlustleistung und was tun?',
        choices: [
            { text: '3,48 W Verlust — für diesen Spannungsabfall auf Buck umstellen', correct: true, xp: 25 },
            { text: '1,32 W — größeren Kühlkörper', correct: false, xp: 0 },
            { text: '0,4 W — normal', correct: false, xp: 0 },
            { text: '12 W — IC defekt', correct: false, xp: 0 }
        ],
        explanation: 'P = (U_ein − U_aus) × I = 3,48 W — viel für ein kleines Gehäuse. Buck bei ~90 % nur ~0,15 W Verlust.'
    },
    {
        level: 'level2', topicIndex: 1,
        title: 'SPI-Sensor liefert nur Nullen',
        description: 'SPI-Beschleunigungssensor: jedes Register 0x00. LA zeigt MOSI, SCK, CS — MISO bleibt 0 V. Was passt nicht?',
        choices: [
            { text: 'SPI-Modus: CPOL/CPHA passt nicht zum Datenblatt', correct: true, xp: 25 },
            { text: 'Sensor braucht I²C', correct: false, xp: 0 },
            { text: 'MOSI und SCK vertauscht', correct: false, xp: 0 },
            { text: 'CS muss dauernd High', correct: false, xp: 0 }
        ],
        explanation: 'Vier SPI-Modi — falscher Modus = Abtastung auf falscher Flanke = nur Nullen.'
    },
    {
        level: 'level2', topicIndex: 2,
        title: 'Buck-Ausgang rauscht',
        description: 'LM2596 liefert 5 V, Scope zeigt 200 mVpp Ripple — MCU resettet. Was hilft?',
        choices: [
            { text: 'Größeren Ausgangskondensator (220 µF Low-ESR) nah am IC', correct: true, xp: 25 },
            { text: 'Spule entfernen', correct: false, xp: 0 },
            { text: 'Eingangsspannung erhöhen', correct: false, xp: 0 },
            { text: 'Widerstand in Reihe zum Ausgang', correct: false, xp: 0 }
        ],
        explanation: 'Größere L und C, Low-ESR-Ausgangselko nah am IC, Eingangselko und minimale Hot-Loop-Fläche.'
    },
    {
        level: 'level2', topicIndex: 3,
        title: 'MCU bootet nicht',
        description: 'Eigenes STM32-Board: 3,3 V ok, SWD antwortet nicht. Wahrscheinlichste Ursache?',
        choices: [
            { text: 'Fehlende oder falsch platzierte Entkopplungskondensatoren', correct: true, xp: 25 },
            { text: 'Falsches USB-Kabel', correct: false, xp: 0 },
            { text: 'Falscher LED-Widerstandscode', correct: false, xp: 0 },
            { text: 'Falsche Platinenfarbe', correct: false, xp: 0 }
        ],
        explanation: '100 nF pro VDD + Bulk, BOOT0, Reset, Quarz prüfen.'
    },
    {
        level: 'level2', topicIndex: 4,
        title: 'I²C-Sensor antwortet nicht',
        description: 'BMP280 auf I²C: immer NAK. Verdrahtung und Adresse stimmen. Was fehlt?',
        choices: [
            { text: 'Pull-up-Widerstände auf SDA und SCL', correct: true, xp: 25 },
            { text: 'Dritter Takt-Draht', correct: false, xp: 0 },
            { text: 'Chip-Select', correct: false, xp: 0 },
            { text: 'Sensor-Firmware-Update', correct: false, xp: 0 }
        ],
        explanation: 'Open-Drain ohne Pull-ups (2,2–10 kΩ) → keine sauberen High-Pegel — häufigster I²C-Fehler.'
    },
    {
        level: 'level2', topicIndex: 5,
        title: 'Motortreiber überhitzt',
        description: 'H-Brücke wird in Sekunden heiß, Motor unbelastet. Was prüfen?',
        choices: [
            { text: 'Shoot-through: High- und Low-Side gleichzeitig leitend', correct: true, xp: 25 },
            { text: 'Größeren Motor', correct: false, xp: 0 },
            { text: 'Versorgung auf 1 V', correct: false, xp: 0 },
            { text: 'Kühlkörper abnehmen', correct: false, xp: 0 }
        ],
        explanation: 'Gleichzeitig leitende FETs kurzen die Versorgung — Dead-Time 50–200 ns einhalten.'
    },
    {
        level: 'level2', topicIndex: 6,
        title: 'Haupt-MCU nicht lieferbar',
        description: 'Vor Assembly: STM32F411 26 Wochen Lieferzeit. Beste Sofortmaßnahme?',
        choices: [
            { text: '26 Wochen warten', correct: false, xp: 0 },
            { text: 'Pin-kompatible Alternativen (z. B. STM32F401) prüfen — Footprint und Features', correct: true, xp: 25 },
            { text: 'Grauhandel', correct: false, xp: 0 },
            { text: 'Projekt aufgeben', correct: false, xp: 0 }
        ],
        explanation: 'STM32-Familien haben oft pin-kompatible Varianten — kritische Teile von Anfang an doppelt beziehen.'
    },
    {
        level: 'level2', topicIndex: 7,
        title: 'CAN-Bus schlägt fehl',
        description: 'Zwei STM32 mit MCP2551: A sendet, B empfängt nichts. Was fehlt?',
        choices: [
            { text: '120-Ω-Terminierung an beiden Busenden', correct: true, xp: 25 },
            { text: 'Dritter Daten-Draht', correct: false, xp: 0 },
            { text: 'Pull-ups auf CAN_H/L', correct: false, xp: 0 },
            { text: 'Gleiche Firmware-Version', correct: false, xp: 0 }
        ],
        explanation: '120 Ω zwischen CAN_H und CAN_L an beiden physikalischen Enden — sonst Reflexionen und Fehler.'
    },

    // ═══════════════════════════════════════════
    // STUFE 3 — Experten-Szenarien (8, eines pro Thema)
    // ═══════════════════════════════════════════
    {
        level: 'level3', topicIndex: 0,
        title: 'ADC: 50-Hz-Brummen',
        description: '24-Bit-ADC (ADS1256) zeigt klares 50-Hz-Rauschen auf DMS-Messung — 10× größer als das Signal. Hauptgegenmaßnahme?',
        choices: [
            { text: 'Stern-Erdung + Kelvin am Shunt, Schutzring um analoge Leitungen', correct: true, xp: 35 },
            { text: 'Abtastrate auf 1 MHz erhöhen', correct: false, xp: 0 },
            { text: 'Geschirmtes USB-Kabel', correct: false, xp: 0 },
            { text: '8-Bit-ADC einsetzen', correct: false, xp: 0 }
        ],
        explanation: 'Netzkopplung in hochohmige Knoten: Sternpunkt, Kelvin, Guard-Ring.'
    },
    {
        level: 'level3', topicIndex: 1,
        title: 'USB High-Speed bricht ab',
        description: 'USB-HS (480 Mbit/s) disconnects oft. TDR: 75-Ω-Abschnitt auf D+/D−. Was ist falsch?',
        choices: [
            { text: 'Differenzpaar nicht 90 Ω — Breite/Abstand nach Stackup neu', correct: true, xp: 35 },
            { text: 'Kabel zu lang', correct: false, xp: 0 },
            { text: 'Firmware-Bug', correct: false, xp: 0 },
            { text: 'USB-HS braucht keine Impedanzkontrolle', correct: false, xp: 0 }
        ],
        explanation: 'USB-HS: 90 Ω ±10 %. 75 Ω → Reflexionen — Augendiagramm leidet.'
    },
    {
        level: 'level3', topicIndex: 2,
        title: 'MCU resettet unter Motorlast',
        description: 'Roboter-MCU: bei Motorstart Resets — ohne Motoren ok. DMM zeigt „ok“ auf VCC. Was messen?',
        choices: [
            { text: 'Oszilloskop an VCC — Einbrüche/Spitzen beim Motorstart', correct: true, xp: 35 },
            { text: 'DMM an Motorklemmen', correct: false, xp: 0 },
            { text: 'Logikanalysator auf SPI', correct: false, xp: 0 },
            { text: 'MCU sofort tauschen', correct: false, xp: 0 }
        ],
        explanation: 'DMM mittelt — schnelle Einbrüche nur mit Scope. Bulk-Elkos (470 µF+), getrennte Motor-/Logik-Versorgung.'
    },
    {
        level: 'level3', topicIndex: 3,
        title: 'FPGA-I/O-Bank falsch versorgt',
        description: '3,3-V-LVDS an Bank 2 Artix-7, aber VCCIO Bank 2 = 1,8 V. Folge?',
        choices: [
            { text: 'FPGA passt sich automatisch an', correct: false, xp: 0 },
            { text: 'Ausgänge erreichen keine 3,3-V-Pegel — Datenfehler oder Latch-up', correct: true, xp: 35 },
            { text: 'FPGA resettet sich', correct: false, xp: 0 },
            { text: 'Nur Takt betroffen', correct: false, xp: 0 }
        ],
        explanation: 'VCCIO muss zum I/O-Standard passen — sonst falsche Pegel und Risiko.'
    },
    {
        level: 'level3', topicIndex: 4,
        title: 'Leiterbahn auf Motorboard verbrannt',
        description: '0,2 mm breite Bahn verkokelt, Motor 3 A Dauerstrom. Fehler?',
        choices: [
            { text: 'Viel zu schmal — IPC-2152 ~1,8 mm für 3 A, 10 °C, 1 oz', correct: true, xp: 35 },
            { text: 'Lötstop zu dick', correct: false, xp: 0 },
            { text: 'Platinendicke falsch', correct: false, xp: 0 },
            { text: 'Stromsensor falsch', correct: false, xp: 0 }
        ],
        explanation: '0,2 mm ≈ ~0,3 A — Unterdimensionierung kann Brand verursachen.'
    },
    {
        level: 'level3', topicIndex: 5,
        title: 'EMV: abgestrahlte Störung',
        description: 'Funkstörabstrahlung bei 48/96/144 MHz, MCU-Takt 48 MHz. Wirksamstes Layout-Mittel?',
        choices: [
            { text: 'Takt über durchgehender Massefläche, Serienterminierung, Spread-Spectrum', correct: true, xp: 35 },
            { text: 'MCU langsamer takten', correct: false, xp: 0 },
            { text: 'Mehr Kupfer oben', correct: false, xp: 0 },
            { text: 'Dickere Platine', correct: false, xp: 0 }
        ],
        explanation: 'Grundwelle und Harmonische: kleine Schleifenfläche, Terminierung, Spread-Spectrum.'
    },
    {
        level: 'level3', topicIndex: 6,
        title: 'ESD am Feldbus-Stecker',
        description: 'Externer Sensor-Stecker (UART, 3,3 V): Labor ok, Feld defekt, Funken beim Stecken. Was fehlte?',
        choices: [
            { text: 'TVS/ESD-Schutz (z. B. PRTR5V0U2X) <2 mm vom Stecker', correct: true, xp: 35 },
            { text: 'Größerer Stecker', correct: false, xp: 0 },
            { text: 'Längeres Kabel', correct: false, xp: 0 },
            { text: 'UART-Debouncing in Software', correct: false, xp: 0 }
        ],
        explanation: 'Externe Schnittstellen brauchen ESD-Klemmung nah am Stecker, kurzer Pfad zu Masse.'
    },
    {
        level: 'level3', topicIndex: 7,
        title: 'Neues Board: erstes Einschalten',
        description: '4-Lagen STM32H7 mit Buck, LDO, QSPI, Ethernet-PHY. Erster Bring-up-Schritt?',
        choices: [
            { text: 'Sichtprüfung unter Lupe: Brücken, fehlende Teile, Polarität', correct: true, xp: 35 },
            { text: 'USB an und sofort flashen', correct: false, xp: 0 },
            { text: 'Ethernet anstecken', correct: false, xp: 0 },
            { text: '24 V aufgeben und schauen', correct: false, xp: 0 }
        ],
        explanation: 'Zuerst sehen — dann strombegrenzte PSU, Rails, Takt, SWD, Blink, Peripherie nacheinander.'
    },
    {
        level: 'level3', topicIndex: 8,
        title: 'Integration: IMU springt bei Motor',
        description: 'Mainboard: MCU, BLDC-Treiber, IMU, CAN — bei aktivem Treiber IMU-Werte wild. Designproblem?',
        choices: [
            { text: 'Motor-PWM koppelt in Sensorik — getrennte Versorgungen, Filter, Massezonen', correct: true, xp: 35 },
            { text: 'IMU defekt', correct: false, xp: 0 },
            { text: 'CAN stört', correct: false, xp: 0 },
            { text: 'Falscher MCU-Takt', correct: false, xp: 0 }
        ],
        explanation: 'Hohe di/dt über gemeinsame Pfade — LC-Filter, Zonen, Abstand Motor↔Sensor.'
    },
    {
        level: 'level3', topicIndex: 9,
        title: 'ESP32: WLAN-Reichweite zu kurz',
        description: 'Nur ~3 m statt ~30 m — unter Antenne Kupfer auf allen Lagen. Problem?',
        choices: [
            { text: 'Masse unter Antenne schildert ab — Keep-out ohne Kupfer laut Datenblatt', correct: true, xp: 35 },
            { text: 'Modul defekt', correct: false, xp: 0 },
            { text: 'WLAN nur 3 m', correct: false, xp: 0 },
            { text: 'Antenne braucht eigene Versorgung', correct: false, xp: 0 }
        ],
        explanation: 'Kupfer im Antennenbereich dämpft stark — Freihalten aller Lagen.'
    },

    // ═══════════════════════════════════════════
    // STUFE 4 — Post-Advanced-Szenarien (7, eines pro Thema)
    // ═══════════════════════════════════════════
    {
        level: 'level4', topicIndex: 0,
        title: 'DDR3-Training schlägt fehl',
        description: 'FPGA mit DDR3: Initialisierung scheitert beim Write Leveling. Adresse/Takt wirken sauber. Wahrscheinlichste PCB-Ursache?',
        choices: [
            { text: 'DQ-zu-DQS-Skew in der Byte-Lane zu groß — Längenanpassung nachziehen', correct: true, xp: 40 },
            { text: 'DDR-Fälschung', correct: false, xp: 0 },
            { text: 'Falsche Firmware-Init', correct: false, xp: 0 },
            { text: 'Massefläche zu groß', correct: false, xp: 0 }
        ],
        explanation: 'Write Leveling braucht enge DQ/DQS-Zeitfenster pro Byte-Lane — zu große Längendifferenz verhindert Training.'
    },
    {
        level: 'level4', topicIndex: 1,
        title: 'BLDC: 60-V-Spitzen bei 24-V-Bus',
        description: '3-phasiger Umrichter: Phasenknoten 60-V-Spitzen, Bus 24 V, 40-V-FETs sterben. PCB-Fehler?',
        choices: [
            { text: 'Schleifeninduktivität zu hoch — Bus-C zu weit von FETs → L×di/dt', correct: true, xp: 40 },
            { text: 'PWM zu niedrig', correct: false, xp: 0 },
            { text: 'Motor zu stark', correct: false, xp: 0 },
            { text: 'Treiber zu schnell', correct: false, xp: 0 }
        ],
        explanation: 'Bus-Elko <5 mm zu FETs, Hot-Loop minimieren, RC-Snubber möglich.'
    },
    {
        level: 'level4', topicIndex: 2,
        title: 'CAN mit 6 Boards instabil',
        description: 'Mit 2 Boards ok, mit 6 unzuverlässig, Bus 1,5 m. Was fehlt?',
        choices: [
            { text: 'Daisy-Chain-Topologie, 120 Ω nur an beiden Enden', correct: true, xp: 40 },
            { text: 'Dickere Drähte', correct: false, xp: 0 },
            { text: '9600 Baud', correct: false, xp: 0 },
            { text: 'Pull-ups auf CAN_H/L', correct: false, xp: 0 }
        ],
        explanation: 'Kein Stern — Stichleitungen reflektieren. Terminierung nur an den Enden.'
    },
    {
        level: 'level4', topicIndex: 3,
        title: 'Architektur 6-DOF-Arm',
        description: 'Ein großes Board oder mehrere für Arm mit Vision?',
        choices: [
            { text: 'Funktionsmodule (Rechner, Antrieb, Power, Gelenk) über CAN mit Schnittstellen-Doku', correct: true, xp: 40 },
            { text: 'Ein Board ist immer billiger/einfacher', correct: false, xp: 0 },
            { text: 'So viele Boards wie möglich', correct: false, xp: 0 },
            { text: 'Alles auf einem Flex', correct: false, xp: 0 }
        ],
        explanation: 'Modularität: Fehlerdomänen, parallele Entwicklung, Feldtausch — Steckerlohn lohnt sich.'
    },
    {
        level: 'level4', topicIndex: 4,
        title: 'First-Article: hohe Ausfallrate',
        description: '30 % Ausfall, Röntgen: Hohlräume unter QFN-Thermalpad, 0402-Tombstones. Fix?',
        choices: [
            { text: 'Thermal-Pad Fenster-Paste, symmetrische 0402-Pads, Reflow-Profil mit Fertiger', correct: true, xp: 40 },
            { text: 'Fertiger wechseln', correct: false, xp: 0 },
            { text: '30 % ist normal', correct: false, xp: 0 },
            { text: 'Nur Firmware falsch', correct: false, xp: 0 }
        ],
        explanation: 'QFN: Fenster-Stencil; Tombstone: symmetrische thermische Pads — frühes DFM mit Monteur.'
    },
    {
        level: 'level4', topicIndex: 5,
        title: 'Vorab-EMV: Peak 150 MHz',
        description: 'Nahfeld: 150 MHz — 3× 50-MHz-RMII-Takt, lokalisiert am Takt. Größter Layout-Hebel?',
        choices: [
            { text: 'Takt über durchgehender Masse, Guard-Vias, 33 Ω Serienwiderstand', correct: true, xp: 40 },
            { text: 'Takt auf andere Seite legen', correct: false, xp: 0 },
            { text: '2 mm dicke Platine', correct: false, xp: 0 },
            { text: 'Gesamtschirmkanne', correct: false, xp: 0 }
        ],
        explanation: '3. Harmonische trapezförmiger Flanken — Massefläche, Vias, langsameres Flankensteilheit.'
    },
    {
        level: 'level4', topicIndex: 6,
        title: 'FPGA wird NRND',
        description: 'Lattice ECP5 NRND, 500 Stück in Produktion. Richtige Reaktion?',
        choices: [
            { text: 'Last-time-buy für Bedarf UND parallele Einführung eines aktuellen FPGA', correct: true, xp: 40 },
            { text: 'Ignorieren — NRND ewig lieferbar', correct: false, xp: 0 },
            { text: 'Sofort alles stoppen', correct: false, xp: 0 },
            { text: 'Komplett andere Architektur', correct: false, xp: 0 }
        ],
        explanation: 'NRND → Abkündigung in 1–3 Jahren; LTB + Ersatz-Design — Dual-Sourcing.'
    }
]);
