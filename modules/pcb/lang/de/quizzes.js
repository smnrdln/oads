i18n.registerContent('de', 'quizzes', [
    // ═══════════════════════════════════════════
    // STUFE 1 — Anfänger (gemischte Fragetypen)
    // ═══════════════════════════════════════════

    // ─── Berechnungsaufgaben ───
    { level: 'level1', topicIndex: 2, type: 'calculation', question: 'Berechne die Grenzfrequenz (in Hz) eines RC-Tiefpassfilters mit R = 10 kΩ und C = 100 nF. Formel: f_c = 1 / (2πRC)', answer: 159, unit: 'Hz', tolerance: 0.05, xp: 15, explanation: 'f_c = 1 / (2π × 10.000 × 0,0000001) = 1 / (0,00628) ≈ 159 Hz. Dort liegt die Ausgangsspannung bei −3 dB (≈70,7 %) der Eingangsspannung.' },
    { level: 'level1', topicIndex: 7, type: 'calculation', question: 'Berechne den Widerstand (in Ω), der den Strom auf 15 mA für eine rote LED (U_f = 1,8 V) aus einer 5-V-Versorgung begrenzt. R = (U_versorgung − U_LED) / I', answer: 213, unit: 'Ω', tolerance: 0.05, xp: 15, explanation: 'R = (5 V − 1,8 V) / 0,015 A = 3,2 V / 0,015 A ≈ 213 Ω. In der Praxis nimmt man den nächsthöheren Normwert, z. B. 220 Ω.' },

    // ─── Richtig/Falsch ───
    { level: 'level1', topicIndex: 0, type: 'truefalse', question: 'Bei Kirchhoffs Spannungsregel (Maschenregel, KVL) ist die Summe aller Spannungen in einer geschlossenen Masche gleich null.', answer: true, xp: 10, explanation: 'Richtig. Die Maschenregel besagt, dass die Summe der Spannungen in jedem geschlossenen Umlauf null ist — zugeführte und abgegebene Energie gleichen sich aus.' },
    { level: 'level1', topicIndex: 1, type: 'truefalse', question: 'Elektrolytkondensatoren können beliebig gepolt angeschlossen werden — sie sind ungepolte Bauteile.', answer: false, xp: 10, explanation: 'Falsch! Elektrolytkondensatoren sind gepolt — falscher Anschluss kann Überhitzung, Aufblähen oder Explosion verursachen. Immer Polaritätsmarkierung beachten (Streifen = Minus).' },

    { level: 'level1', topicIndex: 0, question: 'Was besagt das Ohmsche Gesetz?', options: ['U = I × R', 'U = I / R', 'U = R / I', 'U = I + R'], correct: 0, explanation: 'Das Ohmsche Gesetz: Spannung U = Strom I × Widerstand R.', xp: 10 },
    { level: 'level1', topicIndex: 0, question: 'Nach Kirchhoffs Knotenregel (KCL) gilt an jedem Knoten:', options: ['Spannung rein gleich Spannung raus', 'Summe der zufließenden Ströme gleich Summe der abfließenden', 'Widerstand bleibt immer erhalten', 'Leistung verteilt sich immer gleichmäßig'], correct: 1, explanation: 'KCL: Die Summe der Ströme in einen Knoten hinein gleicht der Summe hinaus — Ladung bleibt erhalten.', xp: 10 },

    // Thema 1: Elektronische Kernkomponenten
    { level: 'level1', topicIndex: 1, question: 'Welches Bauteil speichert elektrische Energie im elektrischen Feld?', options: ['Spule', 'Kondensator', 'Widerstand', 'Diode'], correct: 1, explanation: 'Kondensatoren speichern Energie im Feld zwischen zwei leitenden Platten.', xp: 10 },
    { level: 'level1', topicIndex: 1, question: 'Wofür steht die Abkürzung BJT?', options: ['Binary Junction Transistor', 'Bipolar Junction Transistor', 'Basic Joint Transistor', 'Bilateral Junction Transistor'], correct: 1, explanation: 'BJT = Bipolar Junction Transistor, üblich als Schalter oder Verstärker.', xp: 10 },

    // Thema 2: Grundlegende Analogschaltungen
    { level: 'level1', topicIndex: 2, question: 'Wie lautet die Grenzfrequenzformel für einen RC-Tiefpass 1. Ordnung?', options: ['f_c = 2πRC', 'f_c = 1 / (2πRC)', 'f_c = R / C', 'f_c = RC / 2π'], correct: 1, explanation: 'Bei −3 dB Dämpfung gilt f_c = 1/(2πRC).', xp: 10 },
    { level: 'level1', topicIndex: 2, question: 'Wie lautet die Verstärkungsformel eines nichtinvertierenden OPV?', options: ['V = R_f / R_in', 'V = 1 + (R_f / R_in)', 'V = −(R_f / R_in)', 'V = R_in / R_f'], correct: 1, explanation: 'Nichtinvertierend: V = 1 + (R_f / R_in), Ausgang gleichphasig zur Eingangsspannung.', xp: 10 },

    // Thema 3: Grundlagen digitale Logik
    { level: 'level1', topicIndex: 3, question: 'Welches Gatter heißt „Universalgatter“, weil sich jede logische Funktion daraus aufbauen lässt?', options: ['AND', 'OR', 'NAND', 'XOR'], correct: 2, explanation: 'NAND (und NOR) sind universal — jede boolesche Funktion lässt sich nur mit NAND realisieren.', xp: 10 },
    { level: 'level1', topicIndex: 3, question: 'Welchen Dezimalwert hat die Binärzahl 1011?', options: ['9', '10', '11', '13'], correct: 2, explanation: '1011₂ = 1×8 + 0×4 + 1×2 + 1×1 = 11.', xp: 10 },

    // Thema 4: Werkzeuge und Messtechnik
    { level: 'level1', topicIndex: 4, question: 'Beim Widerstandsmessen mit dem Multimeter musst du:', options: ['maximale Spannung anlegen', 'die Schaltung zuerst spannungsfrei schalten', 'den AC-Modus wählen', 'in Reihe zum Messobjekt schalten'], correct: 1, explanation: 'Vor dem Widerstandsmessen Schaltung spannungsfrei schalten — sonst falsche Werte und möglicher Schaden am Gerät.', xp: 10 },
    { level: 'level1', topicIndex: 4, question: 'Ein Oszilloskop misst in erster Linie:', options: ['Widerstand über der Zeit', 'Stromverläufe direkt', 'Spannungsverläufe über der Zeit', 'Leistungsaufnahme'], correct: 2, explanation: 'Das Oszilloskop zeigt Spannung über der Zeit. Strom indirekt z. B. über Shunt oder Stromzange.', xp: 10 },

    // Thema 5: Einführung PCB-Design
    { level: 'level1', topicIndex: 5, question: 'Was ist eine „Via“ im PCB-Design?', options: ['Eine Kupferbahn auf der Oberseite', 'Eine metallisierte Bohrung zwischen Kupferlagen', 'Die Platinenkontur', 'Ein Footprint'], correct: 1, explanation: 'Eine Via ist eine durchkontaktierte Bohrung, die elektrisch verschiedene Kupferlagen verbindet.', xp: 10 },
    { level: 'level1', topicIndex: 5, question: 'Wozu dient die Lötstoplack auf einer Platine?', options: ['Leitfähigkeit erhöhen', 'Kupfer schützen und Lötbrücken vermeiden', 'Mechanische Festigkeit erhöhen', 'Wärmeabfuhr verbessern'], correct: 1, explanation: 'Lötstoplack (grün/blau) bedeckt Leiterbahnen, verhindert ungewollte Lötbrücken und isoliert.', xp: 10 },

    // Thema 6: Anfänger-EDA-Workflow (KiCad)
    { level: 'level1', topicIndex: 6, question: 'Wofür steht ERC in KiCad?', options: ['Electronic Routing Check', 'Electrical Rule Check', 'Error Recovery Console', 'Edge Reference Constraint'], correct: 1, explanation: 'ERC (Electrical Rule Check) findet Schaltplanfehler wie offene Pins, fehlende Versorgung oder widersprüchliche Ausgänge.', xp: 10 },
    { level: 'level1', topicIndex: 6, question: 'Welches Dateiformat ist Industriestandard für die PCB-Fertigung?', options: ['PDF', 'SVG', 'Gerber (RS-274X)', 'DXF'], correct: 2, explanation: 'Gerber (RS-274X) ist der übliche Standard zur Übergabe von Leiterplatendaten an Fertiger.', xp: 10 },

    // Thema 7: Anfängerprojekte
    { level: 'level1', topicIndex: 7, question: 'Am Ausgang eines NE555 in astabiler Schaltung entsteht:', options: ['konstante Gleichspannung', 'ein kontinuierliches Rechtecksignal', 'ein einzelner Impuls', 'eine Sinuswelle'], correct: 1, explanation: 'Im astabilen Modus erzeugt der 555 ein Dauer-Rechtecksignal — z. B. für LEDs oder Takt.', xp: 10 },
    { level: 'level1', topicIndex: 7, question: 'Welcher Widerstand begrenzt den Strom auf 20 mA für eine LED (U_f = 2 V) aus 5 V?', options: ['100 Ω', '150 Ω', '220 Ω', '330 Ω'], correct: 1, explanation: 'R = (U_versorgung − U_LED) / I = (5 V − 2 V) / 0,02 A = 150 Ω.', xp: 10 },

    // Thema 8: Löten und Montage
    { level: 'level1', topicIndex: 8, question: 'Die übliche Lötkolben-Temperatur für bleifreien Lot (SAC305) liegt bei etwa:', options: ['200 °C', '280 °C', '350–370 °C', '450 °C'], correct: 2, explanation: 'Bleifreies Lot schmilzt bei ~217 °C; 350–370 °C erlaubt gute Wärmeübergabe ohne Bauteilschaden. Zu heiß verbrennt Flussmittel, zu kalt → Kaltlötstellen.', xp: 10 },
    { level: 'level1', topicIndex: 8, question: 'Eine Kaltlötstelle erkennt man an:', options: ['glänzendem, konkavem Lötmeniskus', 'matter, körniger, klumpiger Oberfläche mit schlechter Benetzung', 'perfekt flacher Verbindung', 'blauer Verfärbung auf dem Pad'], correct: 1, explanation: 'Zu wenig Wärme: Lot benetzt nicht vollständig — matte, raue, unzuverlässige Verbindung, Risiko unter Vibration.', xp: 10 },

    // ═══════════════════════════════════════════
    // STUFE 2 — Fortgeschritten (gemischte Fragetypen)
    // ═══════════════════════════════════════════

    // ─── L2 Berechnungsaufgaben ───
    { level: 'level2', topicIndex: 2, type: 'calculation', question: 'Ein LDO wandelt 12 V in 3,3 V bei 400 mA. Berechne die Verlustleistung: P = (U_ein − U_aus) × I', answer: 3.48, unit: 'W', tolerance: 0.05, xp: 20, explanation: 'P = (12 V − 3,3 V) × 0,4 A = 3,48 W. Sehr viel Wärme — der Wirkungsgrad des LDO ist hier nur ~27 %. Ein Buck-Wandler wäre ~90 % effizient.' },
    { level: 'level2', topicIndex: 5, type: 'calculation', question: 'Nach IPC-2152: Welche Breite in mil braucht eine 1oz-Außenlage-Leiterbahn für 2 A bei 10 °C Erwärmung? (Antwort: 40)', answer: 40, unit: 'mil', tolerance: 0.15, xp: 20, explanation: 'IPC-2152: ~1,0 mm (40 mil) Außenlage, 1 oz Kupfer, trägt ~2 A bei 10 °C Anstieg. Innenlagen etwa doppelt so breit für denselben Strom.' },

    // ─── L2 Richtig/Falsch ───
    { level: 'level2', topicIndex: 4, type: 'truefalse', question: 'I²C braucht externe Pull-up-Widerstände, weil der Bus Open-Drain-Ausgänge verwendet.', answer: true, xp: 15, explanation: 'Richtig! I²C-Teilnehmer ziehen SDA/SCL nur auf LOW. Pull-ups (typ. 4,7 kΩ) ziehen die Leitungen auf HIGH, wenn sie freigegeben sind — ohne sie keine Funktion.' },
    { level: 'level2', topicIndex: 4, type: 'truefalse', question: 'SPI benötigt maximal 3 Leitungen, egal wie viele Slaves angeschlossen sind.', answer: false, xp: 15, explanation: 'Falsch! SPI braucht MOSI, MISO, SCK (3 gemeinsam) plus je einen CS-Leitung pro Slave. Bei 4 Slaves = 7 Leitungen.' },

    // Thema 0: Vertiefte Analogelektronik
    { level: 'level2', topicIndex: 0, question: 'Was bedeutet das Gain-Bandwidth-Produkt (GBW) für einen OPV?', options: ['Verstärkung plus Bandbreite ist konstant', 'Verstärkung × Bandbreite = konstant', 'Verstärkung hängt nicht von der Bandbreite ab', 'Bandbreite verdoppelt sich, wenn die Verstärkung sich verdoppelt'], correct: 1, explanation: 'GBW ist näherungsweise konstant: höhere Verstärkung → geringere Bandbreite. Beispiel: 1 MHz GBW bei V=100 → 10 kHz Bandbreite.', xp: 15 },
    { level: 'level2', topicIndex: 0, question: 'Ein Instrumentenverstärker ist speziell für:', options: ['hohe Ausgangsleistung', 'Verstärkung kleiner Differenzsignale mit hoher Gleichtaktunterdrückung', 'Oszillatorschaltungen', 'digitale Pufferung'], correct: 1, explanation: 'Instrumentenverstärker: sehr hohe CMRR (80–120 dB) und hohe Eingangsimpedanz — ideal für DMS, Wägezellen, Strommessung.', xp: 15 },

    // Thema 1: Digitalelektronik für Fortgeschrittene
    { level: 'level2', topicIndex: 1, question: '5-V-Arduino an 3,3-V-ESP32-GPIO: Du brauchst:', options: ['nichts — kompatibel', 'einen Pegelwandler', 'eine größere Versorgung', 'eine zusätzliche Masseleitung allein'], correct: 1, explanation: 'ESP32-GPIO sind nicht 5-V-tolerant. Pegelwandler (z. B. BSS138) oder Spannungsteiler nötig.', xp: 15 },
    { level: 'level2', topicIndex: 1, question: 'Ein Quarzoszillator auf dem MCU-Board benötigt zusätzlich:', options: ['nur den Quarz', 'Quarz + zwei Lastkondensatoren nach Masse', 'Quarz + nur Serienwiderstand', 'Quarz + Spule + Kondensator'], correct: 1, explanation: 'Quarze brauchen zwei Lastkondensatoren (typ. 18–22 pF) von jedem Pin nach Masse für die richtige Frequenz.', xp: 15 },

    // Thema 2: Leistungselektronik
    { level: 'level2', topicIndex: 2, question: 'Welcher Wirkungsgrad ergibt sich für einen LDO von 12 V auf 5 V?', options: ['etwa 95 %', 'etwa 80 %', 'etwa 42 %', 'etwa 66 %'], correct: 2, explanation: 'η ≈ U_aus/U_ein = 5/12 ≈ 42 % — der Rest wird Wärme. Buck wäre hier viel besser.', xp: 15 },
    { level: 'level2', topicIndex: 2, question: 'Beim Buck-Abwärtswandler gilt U_aus = U_ein × D. D ist:', options: ['Diodenspannung', 'das Tastverhältnis des Schaltsignals', 'Abstand zwischen Bauteilen', 'Entkopplungsfaktor'], correct: 1, explanation: 'D ist das PWM-Tastverhältnis (0…1).', xp: 15 },

    // Thema 3: Mikrocontroller-Hardwaredesign
    { level: 'level2', topicIndex: 3, question: 'Hauptzweck von Entkopplungskondensatoren an MCU-Versorgungspins?', options: ['Spannung erhöhen', 'Wechselstromsignale filtern', 'Versorgungsrauschen reduzieren und lokale Ladung bereitstellen', 'Langzeitenergie speichern'], correct: 2, explanation: 'Entkopplung: lokaler Energiespeicher, mindert HF-Rauschen. Faustregel: 100 nF pro VCC/GND-Paar.', xp: 15 },
    { level: 'level2', topicIndex: 3, question: 'STM32-SWD-Debug mindestens:', options: ['MOSI, MISO, SCK, GND', 'TX, RX, GND', 'SWDIO, SWCLK, GND', 'TDI, TDO, TCK, TMS, GND'], correct: 2, explanation: 'SWD: SWDIO, SWCLK, GND — VCC optional zur Zielerkennung.', xp: 15 },

    // Thema 4: Kommunikationsschnittstellen
    { level: 'level2', topicIndex: 4, question: 'CAN-Bus: Welche Abschlussbeschaltung an jedem Busende?', options: ['50 Ω', '120 Ω zwischen CAN_H und CAN_L', '10 kΩ Pull-up auf jeder Leitung', 'kein Abschluss nötig'], correct: 1, explanation: '120-Ω-Terminierung an beiden physikalischen Busenden verhindert Reflexionen.', xp: 20 },
    { level: 'level2', topicIndex: 4, question: 'I²C-Pull-ups sind nötig, weil:', options: ['Push-Pull-Ausgänge', 'Open-Drain — nur Low ziehen', 'Differentielle Signalisierung', 'Tristate-Puffer'], correct: 1, explanation: 'Open-Drain: Geräte ziehen nur LOW; Pull-ups liefern HIGH.', xp: 15 },

    // Thema 5: PCB-Layout für Fortgeschrittene
    { level: 'level2', topicIndex: 5, question: 'Standard-4-Lagen-Stackup (Sig–GND–PWR–Sig): Wo liegt die Massefläche?', options: ['Lage 1 (Top)', 'Lage 2', 'Lage 3', 'Lage 4 (Bottom)'], correct: 1, explanation: 'Lage 2 ist typisch durchgehende Masse — guter Rückleiter und Abschirmung.', xp: 15 },
    { level: 'level2', topicIndex: 5, question: 'Leiterbahnbreite für 2 A, 10 °C Anstieg, Außenlage 1 oz:', options: ['0,1 mm (4 mil)', '0,4 mm (16 mil)', '1,0 mm (40 mil)', '3,0 mm (120 mil)'], correct: 2, explanation: 'IPC-2152: ~1 mm (40 mil) Außenlage, 1 oz, ~2 A bei 10 °C.', xp: 20 },

    // Thema 6: DFM und DFA
    { level: 'level2', topicIndex: 6, question: 'Wozu dienen Fiducials auf der Platine?', options: ['Dekoration', 'Optische Ausrichtung der Bestückmaschine', 'Messtasten für elektrischen Test', 'Bohrtiefenkalibrierung'], correct: 1, explanation: 'Fiducials: Kupfermarken für die Kamera der Pick-and-Place-Maschine.', xp: 15 },
    { level: 'level2', topicIndex: 6, question: 'Typisches Minimum Leiterbahn/Abstand bei Budget-Fabs:', options: ['2 mil / 2 mil', '4 mil / 4 mil', '6 mil / 6 mil', '12 mil / 12 mil'], correct: 2, explanation: '6 mil / 6 mil (0,15 mm) ist Standard bei vielen günstigen Fabs — etwas Puffer erhöht Zuverlässigkeit.', xp: 15 },

    // Thema 7: Fortgeschrittene Projekte
    { level: 'level2', topicIndex: 7, question: 'Zweck eines Shunt-Widerstands in der Motorregelung?', options: ['Spannungsregelung', 'Strommessung', 'Drehzahlregelung', 'Richtungsumschaltung'], correct: 1, explanation: 'Shunt in Reihe: Strom über Spannungsabfall U = I×R messen.', xp: 15 },
    { level: 'level2', topicIndex: 7, question: 'Wofür steht LDO bei Spannungsreglern?', options: ['Low Dropout', 'Linear Direct Output', 'Load Distribution Output', 'Low Distortion Oscillator'], correct: 0, explanation: 'LDO = Low Dropout — geringe Mindestdifferenz zwischen Ein- und Ausgang.', xp: 15 },

    // ═══════════════════════════════════════════
    // STUFE 3 — Experten (gemischte Fragetypen)
    // ═══════════════════════════════════════════

    // ─── L3 Berechnungsaufgaben ───
    { level: 'level3', topicIndex: 2, type: 'calculation', question: 'Berechne die Zielimpedanz des PDN: zulässiges Ripple = 50 mV, transienter Strom = 2 A. Z_ziel = ΔU / ΔI', answer: 25, unit: 'mΩ', tolerance: 0.05, xp: 25, explanation: 'Z_ziel = 50 mV / 2 A = 25 mΩ. Die Impedanz des Versorgungsnetzes muss darunter bleiben, damit das Ripple im Spec bleibt.' },
    { level: 'level3', topicIndex: 9, type: 'calculation', question: 'Berechne die λ/4-Antennenlänge (mm) für 2,4 GHz in FR-4 (Geschwindigkeitsfaktor ≈ 0,5). λ/4 = (c × VF) / (4 × f)', answer: 15.6, unit: 'mm', tolerance: 0.10, xp: 25, explanation: 'λ = (3×10⁸ × 0,5) / 2,4×10⁹ = 62,5 mm. λ/4 ≈ 15,6 mm. Hinweis: oft zitierte ~31 mm gelten eher für VF≈1 am Strahler; im Substrat kürzer.' },

    // ─── L3 Richtig/Falsch ───
    { level: 'level3', topicIndex: 5, type: 'truefalse', question: 'Spread-Spectrum-Taktung beseitigt EMV-Emissionen vollständig — die Harmonischen verschwinden.', answer: false, xp: 20, explanation: 'Falsch! Spread-Spectrum verteilt die Energie auf ein breiteres Band und senkt die SPITZE pro Frequenz — die Gesamtleistung bleibt ähnlich, der Peak sinkt um typ. 5–10 dB.' },
    { level: 'level3', topicIndex: 7, type: 'truefalse', question: 'Beim Board-Bring-up soll man zuerst mit Strombegrenzung auf den erwarteten Maximalstrom gehen.', answer: false, xp: 20, explanation: 'Falsch! Zuerst niedriges Stromlimit (z. B. 100 mA), Versorgungen prüfen, Kurzschlüsse ausschließen — dann langsam hochdrehen.' },

    // Thema 0: Fortgeschrittenes Analog- und Mixed-Signal
    { level: 'level3', topicIndex: 0, question: 'Kelvin-Messung am Shunt bedeutet:', options: ['4 Anschlüsse statt 2', 'Sense-Leiter von den Shunt-Padrändern, um Leiterbahnwiderstand zu vermeiden', 'Temperatur in Kelvin messen', 'einen Kelvin-bewerteten Widerstand'], correct: 1, explanation: 'Kelvin: getrennte Sense-Leitungen von den Shunt-Pads direkt zum Verstärker — kein Spannungsabfall auf den Leistungsleitungen.', xp: 25 },
    { level: 'level3', topicIndex: 0, question: 'Bei Mixed-Signal-PCBs sollten Analog- und Digital-Masse:', options: ['völlig getrennt ohne Verbindung sein', 'an einem Punkt (Sternpunkt) verbunden sein', 'auf verschiedenen Platinen liegen', 'verschachtelt für beste Kopplung'], correct: 1, explanation: 'Ein Sternpunkt zwischen AGND und DGND verhindert, dass digitale Rückströme durch den Analogteil fließen.', xp: 25 },

    // Thema 1: Signalintegrität
    { level: 'level3', topicIndex: 1, question: 'Eine Leiterbahn sollte als Leitung behandelt werden, wenn ihre Länge übersteigt:', options: ['1 mm', 'λ/10 der Flanken-basierten effektiven Wellenlänge', 'halbe Platinenbreite', 'immer 100 mm'], correct: 1, explanation: 'Länge > λ/10 (aus Anstiegszeit) → Reflexionen. Bei 1 ns Anstieg in FR-4 ≈ 15 mm.', xp: 25 },
    { level: 'level3', topicIndex: 1, question: 'Die „3W-Regel“ gegen Übersprechen bedeutet:', options: ['3 Drähte pro Signal', 'parallel: Mittelpunktsabstand ≥ 3× Leiterbahnbreite', 'max. 3 Vias', 'jedes 3. Layer nutzen'], correct: 1, explanation: 'Abstand parallel ≥ 3× Breite reduziert kapazitive und induktive Kopplung.', xp: 25 },

    // Thema 2: Power Integrity
    { level: 'level3', topicIndex: 2, question: 'PDN-Zielimpedanz:', options: ['Z = U_versorgung / I_max', 'Z = ΔU_zul / ΔI_transient', 'Z = R_Bahn + R_Via', 'immer 50 Ω'], correct: 1, explanation: 'Z_ziel = ΔU/ΔI. Beispiel: 10 mV Ripple, 1 A Sprung → 10 mΩ.', xp: 25 },
    { level: 'level3', topicIndex: 2, question: 'Warum mehrere Kondensatorwerte (z. B. 100 µF + 10 µF + 100 nF)?', options: ['günstiger in Menge', 'jeder deckt einen anderen Frequenzbereich für niedrige Impedanz', 'sieht professioneller aus', 'Redundanz'], correct: 1, explanation: 'Jeder Kondensator hat eine ESR/ESL/SRF — zusammen niedrige PDN-Impedanz über weiten Frequenzbereich.', xp: 25 },

    // Thema 3: FPGA- und SoC-Hardwaredesign
    { level: 'level3', topicIndex: 3, question: 'VCCINT beim FPGA ist:', options: ['externe I/O-Spannung', 'Kernversorgung der Logik (niedrig, kritisch)', 'Programmierspannung', 'I/O-Bank-Spannung'], correct: 1, explanation: 'VCCINT versorgt den Kern, typ. 1,0–1,2 V, engste Rauschtoleranz.', xp: 25 },
    { level: 'level3', topicIndex: 3, question: 'DDR Adress-/Kommando-Bus-Topologie?', options: ['Stern', 'Fly-by (Daisy-Chain)', 'nur Punkt-zu-Punkt', 'Ring'], correct: 1, explanation: 'Fly-by durch die DRAMs, Termination am Ende; Write Leveling gleicht Laufzeit aus.', xp: 30 },

    // Thema 4: Fortgeschrittene PCB-Stackups
    { level: 'level3', topicIndex: 4, question: 'FR-4: Dielektrizitätskonstante Dk etwa:', options: ['1,0', '2,2', '4,0–4,8', '10,0'], correct: 2, explanation: 'FR-4 Dk ≈ 4–4,8 — beeinflusst Impedanz und Ausbreitungsgeschwindigkeit.', xp: 25 },
    { level: 'level3', topicIndex: 4, question: 'Microvia im HDI-Design:', options: ['sehr kleines Durchgangsvia', 'lasergebohrtes Blindvia über nur eine Lage', 'kupfergefülltes Via', 'jedes Via unter 0,5 mm'], correct: 1, explanation: 'Microvias: laser, ≤0,1 mm, eine Lage — Via-in-Pad für feine BGAs.', xp: 25 },

    // Thema 5: EMV-/EMI-Design
    { level: 'level3', topicIndex: 5, question: 'Gemeinschaftsdrossel filtert, indem sie:', options: ['alle Frequenzen gleich blockiert', 'hohe Impedanz für Gleichtakt, niedrige für Gegentakt', 'Rauschen kurzschließt', 'reflektiert'], correct: 1, explanation: 'Hohe Impedanz für gleichsinnige Ströme (Störung), niedrige für differenzielle Signale.', xp: 25 },
    { level: 'level3', topicIndex: 5, question: 'Spread-Spectrum senkt EMV-Emissionen durch:', options: ['niedrigere Taktfrequenz', 'Verteilung der Energie über Frequenzen → niedrigere Peaks', 'Takt abschalten', 'Filter am Ausgang'], correct: 1, explanation: 'Leichte Frequenzmodulation des Takts verteilt das Spektrum und senkt Peaks.', xp: 25 },

    // Thema 6: IPC-Normen
    { level: 'level3', topicIndex: 6, question: 'IPC-2152 dient zur Bestimmung von:', options: ['Pastenstencil-Maßen', 'sicherer Leiterbahnbreite für Strom und Temperaturanstieg', 'Footprint-Pads', 'Platinenkantenabstand'], correct: 1, explanation: 'IPC-2152: Diagramme für Mindestbreite aus Strom, Kupferstärke und ΔT.', xp: 25 },
    { level: 'level3', topicIndex: 6, question: 'IPC-7351 Dichte-Level A, B, C — Level B ist:', options: ['Maximum — einfache Nacharbeit', 'Nominal — üblich', 'Minimum — dichte Boards', 'Null — keine Pads'], correct: 1, explanation: 'A großzügig, B Standard, C dicht — meist B.', xp: 25 },

    // Thema 7: Test, Inbetriebnahme und Debugging
    { level: 'level3', topicIndex: 7, question: 'Erster Schritt beim Bring-up:', options: ['sofort Firmware flashen', 'alles gleichzeitig testen', 'Sichtprüfung auf Lötfehler', 'volle Spannung und Strom'], correct: 2, explanation: 'Zuerst visuell: Brücken, fehlende Teile, Polarität — dann Spannung.', xp: 25 },
    { level: 'level3', topicIndex: 7, question: 'Boundary Scan (JTAG) in DFT dient zum:', options: ['nur Flash programmieren', 'Verbindungstest über JTAG-I/Os ohne Firmware', 'Leistungsmessung', 'Lötqualität'], correct: 1, explanation: 'JTAG schaltet Pins — Netztest ohne laufende Firmware, wichtig in Fertigung.', xp: 25 },

    // Thema 8: Expertenprojekte
    { level: 'level3', topicIndex: 8, question: '„Hot loop“ bei 3-phasigem BLDC-Leistungsteil:', options: ['Motorwicklung', 'hoher di/dt-Pfad: DC-Bus → FETs → zurück über Bus-C', 'Wärmepfad zum Kühlkörper', 'Rand-Kupferfläche'], correct: 1, explanation: 'Kleine Schleifenfläche reduziert Spitzen und EMI.', xp: 30 },
    { level: 'level3', topicIndex: 8, question: 'Bring-up eines mobilen Robot-Mainboards beginnt mit:', options: ['Motoren volle Last', 'Versorgungen strombegrenzt prüfen, dann Takt, MCU, Peripherie nacheinander', 'alle Sensoren sofort', 'komplette Applikations-Firmware'], correct: 1, explanation: 'Gestaffelt: Power → Takt → MCU → Peripherie → Motor — immer zuerst Strombegrenzung.', xp: 30 },

    // Thema 9: Antennen- und Funkdesign (Grundlagen)
    { level: 'level3', topicIndex: 9, question: 'PCB-Trace-Antenne 2,4-GHz-Wi-Fi Länge etwa:', options: ['λ/4 ≈ 31 mm in FR-4', 'λ = 125 mm', 'beliebig', 'immer 10 mm'], correct: 0, explanation: 'Bei 2,4 GHz, VF~0,5 in FR-4: λ≈62 mm, λ/4≈31 mm — genau abhängig vom Layout.', xp: 25 },
    { level: 'level3', topicIndex: 9, question: 'Massefläche unter einer PCB-Antenne:', options: ['voll Kupfer', 'Keep-out (ohne Kupfer) im Antennenbereich', 'an VCC', 'viele Löcher'], correct: 1, explanation: 'Kupfer darunter dämpft Abstrahlung — Keep-out auf allen Lagen laut Datenblatt.', xp: 25 },

    // ═══════════════════════════════════════════
    // STUFE 4 — Post-Advanced (gemischte Fragetypen)
    // ═══════════════════════════════════════════

    // ─── L4 Berechnungsaufgaben ───
    { level: 'level4', topicIndex: 2, type: 'calculation', question: 'Bootstrap-Kapazität für 100-kHz-Halbbrücken-Gatetreiber: Q_gate = 50 nC, Leckstrom 100 µA. C_boot ≥ 10 × Q_gate / U_treib. Mit U_treib = 12 V:', answer: 42, unit: 'nF', tolerance: 0.10, xp: 30, explanation: 'C_boot ≥ 10 × 50 nC / 12 V ≈ 41,7 nF → 42 nF; in der Praxis eher 100 nF Reserve. Verhindert Einbruch der Bootstrap-Spannung beim Treiben.' },
    { level: 'level4', topicIndex: 1, type: 'calculation', question: 'Augendiagramm: Augenhöhe 300 mV, Augenbreite 80 ps bei 5 Gbit/s (UI 200 ps). Augenöffnung (Breite/UI) in %:', answer: 40, unit: '%', tolerance: 0.05, xp: 35, explanation: '80 ps / 200 ps = 40 %. Unter ~30 % kritisch; >50 % komfortabel — ggf. Pre-Emphasis/Equalizing nötig.' },

    // ─── L4 Richtig/Falsch ───
    { level: 'level4', topicIndex: 4, type: 'truefalse', question: 'NRND (Not Recommended for New Designs) bedeutet: Bauteil sofort nicht lieferbar und muss jetzt ersetzt werden.', answer: false, xp: 25, explanation: 'Falsch! NRND = geplante Abkündigung, Teil ist oft NOCH bestellbar. Für NEUE Designs Alternativen wählen; Bestand bis EOL möglich.' },
    { level: 'level4', topicIndex: 3, type: 'truefalse', question: 'Ein Not-Aus am Roboter sollte für Flexibilität nur in Firmware umgesetzt werden.', answer: false, xp: 25, explanation: 'Falsch! Not-Aus muss in Hardware (Relais/MOSFET) die Motorleistung abschalten — unabhängig von der Firmware.' },

    // Thema 0: Spezialisierungspfade
    { level: 'level4', topicIndex: 0, question: 'DDR4 „Write Leveling“ gleicht aus:', options: ['Spannungsunterschiede zwischen DRAMs', 'Laufzeitunterschiede in Fly-by-Takt-Topologie', 'Temperaturdrift', 'Streuung der Kondensatoren'], correct: 1, explanation: 'Write Leveling kalibriert DQS zum Takt je Chip und kompensiert unterschiedliche Laufzeiten.', xp: 30 },
    { level: 'level4', topicIndex: 0, question: 'FOC für BLDC erfordert:', options: ['nur einen Hall-Sensor', 'präzise Phasenstrommessung und Koordinatentransformation', '555 für Kommutierung', 'nur DC, kein PWM'], correct: 1, explanation: 'FOC: Phasenströme messen, Clarke/Park, Drehmoment und Fluss getrennt regeln.', xp: 30 },

    // Thema 1: Fortgeschrittene SI/PI-Simulation
    { level: 'level4', topicIndex: 1, question: '„Augenhöhe“ im Augendiagramm bedeutet:', options: ['physische Bahnbreite', 'Spannungsrauschabstand für sichere Detektion', 'Anzahl Flanken', 'Takt-Jitter'], correct: 1, explanation: 'Vertikale Öffnung = Spannungsmarge zwischen Pegeln — muss Empfängerschwelle überschreiten.', xp: 30 },
    { level: 'level4', topicIndex: 1, question: 'S11 (Rückflussdämpfung) bedeutet:', options: ['Einfügedämpfung', 'reflektierte Energie bei Fehlanpassung', 'Nebensprechen', 'Versorgungsrauschen'], correct: 1, explanation: 'S11: Reflexion — niedrig (z. B. −20 dB) = gute Anpassung.', xp: 35 },

    // Thema 2: Motor- und Leistungselektronik (fortgeschritten)
    { level: 'level4', topicIndex: 2, question: 'Bootstrap-Treibung High-Side-MOSFET:', options: ['separate isolierte Hilfsversorgung', 'Kondensator laden bei leitendem Low-Side-FET, dann Gate treiben', 'Gate direkt an VCC', 'Optokoppler'], correct: 1, explanation: 'Bei Low-Side an: Bootstrap-C lädt über Diode; High-Side nutzt diese Energie über schwimmendem Source.', xp: 30 },
    { level: 'level4', topicIndex: 2, question: '„Kelvin-Source“ beim Gatetreiber:', options: ['Source über Kelvin-Widerstand an Masse', 'getrennter Rückleiter für Treiber vs. Leistungsstrom', 'Source in Kelvin messen', '4-Pol-Sense am Leistungs-MOSFET'], correct: 1, explanation: 'Treiber-Masse getrennt vom di/dt-Leistungsrückleiter — weniger Störung im Schaltzeitpunkt.', xp: 35 },

    // Thema 3: Komplexes Systemdesign
    { level: 'level4', topicIndex: 3, question: 'Ein Versorgungsbaum (Power Tree) sollte erstellt werden:', options: ['nach dem Layout', 'vor Beginn des Schaltplans', 'nur bei Batterie', 'während der Firmware-Entwicklung'], correct: 1, explanation: 'Jede Schiene, Quelle, Last, Sequencing und Strombudget — vor dem Schematic.', xp: 30 },
    { level: 'level4', topicIndex: 3, question: 'Not-Aus für einen Roboter:', options: ['nur Software-Interrupt', 'Hardware-Relais/MOSFET schaltet Motorleistung unabhängig von Firmware', 'MCU-Reset', 'OTA-Befehl'], correct: 1, explanation: 'Firmware-unabhängige Abschaltung der Motorleistung — auch bei Softwareausfall.', xp: 30 },

    // Thema 4: Fertigung und Lieferkette
    { level: 'level4', topicIndex: 4, question: 'Via-in-Pad unter SMD:', options: ['offen lassen', 'füllen und planverkupfern gegen Lotabsaugung', 'nur Lötstoplack', 'größer bohren'], correct: 1, explanation: 'Offene Vias unter Pads saugen Lot — gefüllt/plan für zuverlässige Lötung.', xp: 30 },
    { level: 'level4', topicIndex: 4, question: '„NRND“ im Datenblatt:', options: ['Not Recommended for New Designs — noch lieferbar, geplante Abkündigung', 'New Reference Number', 'Normal Rated', 'Not Returned'], correct: 0, explanation: 'NRND: für neue Designs Ersatz planen.', xp: 30 },

    // Thema 5: Führung und Architektur
    { level: 'level4', topicIndex: 5, question: 'Eine Hardware Requirements Specification (HRS) enthält:', options: ['nur den Schaltplan', 'Leistungsbudget, Schnittstellen, Umgebung, Zuverlässigkeit, Kosten', 'nur Stückliste', 'Marketing'], correct: 1, explanation: 'HRS = verbindliche Anforderungen vor dem Entwurf.', xp: 30 },
    { level: 'level4', topicIndex: 5, question: 'Risiko gegenüber Management am wirksamsten:', options: ['reines Fachchinesisch', 'Kosten/Risiko: „TVS weglassen spart 0,15 $/Stk., erhöht Rückrufrisiko“', '„Vertraut mir“', 'Risiko verstecken'], correct: 1, explanation: 'Business-Entscheider brauchen Kosten-Nutzen-Risiko-Rahmen.', xp: 30 },

    // Thema 6: Flaggschiff-Projekte
    { level: 'level4', topicIndex: 6, question: 'Bei NPI prüft die First-Article-Inspection:', options: ['nur Firmware', 'ob erste Serienboards dem Design entsprechen — Maße, Platzierung, Lötqualität', 'nur Verpackung', 'nur Bauteilkosten'], correct: 1, explanation: 'Erkennt Fertigungsprobleme vor Vollserie: Maße, Bestückung, Lötung, elektrischer Test.', xp: 30 },
    { level: 'level4', topicIndex: 6, question: 'Open-Source-Hardware reproduzierbar machen:', options: ['nur THT', 'vollständige Designfiles, BOM mit MPNs, Montageanleitung', 'nur Schaltplan-PDF', 'billigste Teile'], correct: 1, explanation: 'Quelldateien, BOM mit Alternativen, Zeichnungen, Firmware, getestete Bauanleitung.', xp: 30 }
]);
