i18n.registerContent('de', 'level3', [
    {
        title: 'Zustandsschätzung und Kalman-Filter',
        content: `
            <h3>Prinzip</h3>
            <p>Vorhersage mit Bewegungsmodell, Korrektur mit Messung — Glaube an Zustände.</p>
            <h3>Linearer Kalman</h3>
            <p>Gauß bleibt Gauß; Kalman-Gain gewichtet Modell vs. Sensor.</p>
            <h3>EKF / UKF</h3>
            <p>Linearisierung bzw. Sigma-Punkte für Nichtlinearitäten.</p>
            <h3>Mehrtakt</h3>
            <p>Schnelle IMU-Vorhersage, langsamere absolute Updates — Standard.</p>`,
        keyPoints: ['Großes R → weniger Messvertrauen', 'Q und R abstimmen', 'EKF-Workflow kennen'],
        relatedTopics: [{ level: 'level2', index: 5, label: 'Mobile Robotik: Kinematik und Odometrie' }, { level: 'level3', index: 1, label: 'Simultane Lokalisierung und Kartierung (SLAM)' }],
        resources: [{ title: 'Barfoot — State Estimation', url: 'https://www.cambridge.org/core/books/state-estimation-for-robotics/' }]
    },
    {
        title: 'Simultane Lokalisierung und Kartierung (SLAM)',
        content: `
            <h3>Problem</h3>
            <p>Karte und Pose gleichzeitig — Fehler koppeln.</p>
            <h3>Graph-SLAM</h3>
            <p>Knoten Posen, Kanten Messungen; sparse Optimierung.</p>
            <h3>Loop Closure</h3>
            <p>Wiedererkennung begrenzt Drift.</p>
            <h3>Belegtheitsraster</h3>
            <p>Log-Odds-Updates aus Entfernungsmessungen.</p>`,
        keyPoints: ['Graph-SLAM skaliert', 'Ohne Loop Closure driftet es', 'Falsche Schließungen zerstören die Karte'],
        relatedTopics: [{ level: 'level3', index: 0, label: 'Zustandsschätzung und Kalman-Filter' }, { level: 'level3', index: 3, label: 'Pfadplanung für mobile Roboter' }],
        resources: [{ title: 'Probabilistic Robotics', url: 'https://www.probabilistic-robotics.org/' }]
    },
    {
        title: 'Robotikwahrnehmung und Computer Vision',
        content: `
            <h3>Pipeline</h3>
            <p>Rohdaten → Merkmale → Objekte → Szene.</p>
            <h3>Kameramodell</h3>
            <p><strong>K</strong>, Verzerrung, Kalibrierung mit Schachbrett.</p>
            <h3>Tiefe</h3>
            <p>Stereo, strukturiertes Licht, ToF — unterschiedliche Stärken.</p>
            <h3>Lernbasierte Detektoren</h3>
            <p>Domain-Shift zwischen Labor und Einsatz beachten.</p>
            <h3>Punktwolken</h3>
            <p>ICP zur Ausrichtung — Startnähe wichtig.</p>`,
        keyPoints: ['Intrinsiken kalibrieren', 'Feldtests', 'ICP braucht guten Start'],
        relatedTopics: [{ level: 'level3', index: 1, label: 'Simultane Lokalisierung und Kartierung (SLAM)' }, { level: 'level3', index: 6, label: 'Manipulation und Greifen' }],
        resources: [{ title: 'OpenCV', url: 'https://docs.opencv.org/' }]
    },
    {
        title: 'Pfadplanung für mobile Roboter',
        content: `
            <h3>Konfigurationsraum</h3>
            <p>Roboter als Punkt; Hindernisse aufblasen.</p>
            <h3>A*</h3>
            <p>Zulässige Heuristik — z. B. euklidisch bei 8-Nachbarschaft.</p>
            <h3>RRT / PRM</h3>
            <p>Hochdimensionale Räume.</p>
            <h3>Potentialfelder</h3>
            <p>Schnell, aber lokale Minima.</p>`,
        keyPoints: ['C-Space-Inflation', 'A* Heuristik', 'Sampling für hohe DOF'],
        relatedTopics: [{ level: 'level3', index: 1, label: 'Simultane Lokalisierung und Kartierung (SLAM)' }, { level: 'level3', index: 4, label: 'Trajektoriengenerierung und -optimierung' }],
        resources: [{ title: 'LaValle — Planning Algorithms', url: 'http://planning.cs.uiuc.edu/' }]
    },
    {
        title: 'Trajektoriengenerierung und -optimierung',
        content: `
            <h3>Pfad vs. Trajektorie</h3>
            <p>Zeit, Geschwindigkeit, Beschleunigung hinzufügen.</p>
            <h3>Polynome</h3>
            <p>Kubisch / quintisch nach Randbedingungen.</p>
            <h3>Trapez / S-Kurve</h3>
            <p>Jerk-Limitierung schont Mechanik und Bilder.</p>
            <h3>Dynamische Machbarkeit</h3>
            <p>Geometrisch frei heißt nicht kraftmäßig machbar.</p>`,
        keyPoints: ['Dynamik prüfen', 'Jerk begrenzen', 'Glatt über Wegpunkte'],
        relatedTopics: [{ level: 'level2', index: 3, label: 'Roboterdynamik' }, { level: 'level3', index: 5, label: 'Bewegungsplanungsalgorithmen' }],
        resources: [{ title: 'Modern Robotics Kap. 9', url: 'https://modernrobotics.northwestern.edu/' }]
    },
    {
        title: 'Bewegungsplanungsalgorithmen',
        content: `
            <h3>Über geometrische Pfade</h3>
            <p>Dynamik, Kontakte, TAMP.</p>
            <h3>RRT-Connect</h3>
            <p>Zwei Bäume — schneller Verbindung.</p>
            <h3>CHOMP / STOMP</h3>
            <p>Kosten auf ganzer Bahn optimieren.</p>
            <h3>Probabilistische Vollständigkeit</h3>
            <p>Asymptotisch, nicht feste Zeitgrenze.</p>`,
        keyPoints: ['RRT-Connect praktisch', 'Optimierungsplaner für Kostenformen', 'TAMP für gekoppelte Aufgaben'],
        relatedTopics: [{ level: 'level3', index: 3, label: 'Pfadplanung für mobile Roboter' }, { level: 'level3', index: 4, label: 'Trajektoriengenerierung und -optimierung' }],
        resources: [{ title: 'LaValle', url: 'http://planning.cs.uiuc.edu/' }]
    },
    {
        title: 'Manipulation und Greifen',
        content: `
            <h3>Greifarten</h3>
            <p>Kraft- vs. Präzisionsgriff.</p>
            <h3>Form- und Kraftschluss</h3>
            <p>Reibung im Kraftschluss entscheidend.</p>
            <h3>Qualitätsmetriken</h3>
            <p>Ferrari–Canny und ähnliche Größen.</p>
            <h3>Gelernte Greifer</h3>
            <p>Datengetrieben für unstrukturierte Behälter.</p>`,
        keyPoints: ['Kraftschluss mit Reibkegeln', 'Sim ≠ Real', 'Werkzeug vs. Universalität'],
        relatedTopics: [{ level: 'level3', index: 2, label: 'Robotikwahrnehmung und Computer Vision' }, { level: 'level3', index: 5, label: 'Bewegungsplanungsalgorithmen' }],
        resources: [{ title: 'Murray MLS', url: 'https://www.cds.caltech.edu/~murray/mlswiki/' }]
    }
]);
