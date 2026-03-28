i18n.registerContent('de', 'level1', [
    {
        title: 'Anatomie eines Roboters',
        content: `
            <h3>Subsysteme</h3>
            <p>Roboter verbinden <strong>Mechanik</strong> (Glieder, Gelenke), <strong>Aktorik</strong>, <strong>Sensorik</strong>, <strong>Rechner</strong> und <strong>Software</strong> (Treiber, Planung, Sicherheit).</p>
            <h3>Freiheitsgrade</h3>
            <p>Jede unabhängige Bewegungsachse ist ein FG. Ein 6-Achsen-Arm auf fester Basis hat sechs FG.</p>
            <h3>Seriell vs. parallel</h3>
            <ul>
                <li><strong>Seriell:</strong> offene Kette (typischer Industrieroboter).</li>
                <li><strong>Parallel:</strong> mehrere Ketten auf eine Plattform (Stewart, Delta) — oft hohe Steifigkeit.</li>
            </ul>
            <h3>Arbeitsraum</h3>
            <p>Der <strong>Arbeitsraum</strong> enthält alle erreichbaren Endeffektor-Lagen — begrenzt durch Geometrie und Gelenkgrenzen.</p>`,
        keyPoints: ['Die fünf Säulen: Mechanik, Aktorik, Sensorik, Rechner, Software', 'Seriell vs. parallel unterscheiden', 'Arbeitsraum ≠ jede Pose erreichbar'],
        relatedTopics: [{ level: 'level1', index: 3, label: 'Sensoren und Aufnehmer' }, { level: 'level1', index: 4, label: 'Aktoren und Antriebssysteme' }],
        resources: [{ title: 'Modern Robotics', url: 'https://modernrobotics.northwestern.edu/' }, { title: 'ROS 2', url: 'https://docs.ros.org/' }]
    },
    {
        title: 'Lineare Algebra für die Robotik',
        content: `
            <h3>Vektoren und Koordinaten</h3>
            <p>Vektoren sind immer im <strong>Bezugssystem</strong> anzugeben.</p>
            <h3>Rotationsmatrizen</h3>
            <p>3×3-Matrix <strong>R</strong> mit <strong>R</strong>ᵀ<strong>R</strong>=<strong>I</strong>, det(<strong>R</strong>)=+1.</p>
            <h3>Homogene Transformationen</h3>
            <p>4×4-Matrix <strong>T</strong> verknüpft Rotation und Translation; Verkettung durch Multiplikation.</p>
            <h3>Kreuzprodukt</h3>
            <p>Tritt bei Momenten und Drehgeschwindigkeiten in 3D auf.</p>`,
        keyPoints: ['Bezugssystem nennen', '4×4-Matrizen für starre Bewegungen', 'Kreuzprodukt für 3D-Drehmomente'],
        relatedTopics: [{ level: 'level1', index: 6, label: 'Koordinatensysteme und starre Transformationen' }, { level: 'level2', index: 0, label: 'Vorwärtskinematik' }],
        resources: [{ title: 'Barfoot — State Estimation', url: 'https://www.cambridge.org/core/books/state-estimation-for-robotics/' }]
    },
    {
        title: 'Wahrscheinlichkeit und Statistik für die Robotik',
        content: `
            <h3>Unsicherheit</h3>
            <p>Sensorrauschen und Modellfehler erfordern <strong>Wahrscheinlichkeitsmodelle</strong>.</p>
            <h3>Gauß-Annahmen</h3>
            <p>Mittelwert und Kovarianz — Basis für Kalman-Filter, aber nicht immer realistisch.</p>
            <h3>Varianz des Mittelwerts</h3>
            <p>Mitteln vieler Messungen reduziert die Varianz — zentral für Fusion und Monte-Carlo-Methoden.</p>`,
        keyPoints: ['Unsicherheit explizit modellieren', 'Q und R im Filter bewusst wählen', 'Gauß ist bequem, nicht immer wahr'],
        relatedTopics: [{ level: 'level3', index: 0, label: 'Zustandsschätzung und Kalman-Filter' }, { level: 'level1', index: 3, label: 'Sensoren und Aufnehmer' }],
        resources: [{ title: 'Probabilistic Robotics', url: 'https://www.probabilistic-robotics.org/' }]
    },
    {
        title: 'Sensoren und Aufnehmer',
        content: `
            <h3>Propriozeptiv / exterozeptiv</h3>
            <p>Eigenzustand vs. Umwelt: Encoder, IMU vs. Kamera, LiDAR.</p>
            <h3>IMU</h3>
            <p>Kreisel driftet; Beschleunigungssensor mischt Gravitation und Linearbeschleunigung — <strong>Fusion</strong> nötig.</p>
            <h3>Encoder</h3>
            <p>Auflösung, Kalibrierung und Einfluss auf die Odometrie.</p>
            <h3>LiDAR &amp; Kamera</h3>
            <p>Geometrie vs. Erscheinung; beide brauchen Kalibrierung und Rauschmodell.</p>`,
        keyPoints: ['Sensorklasse zur Größe passend wählen', 'IMU allein driftet', 'Rauschmodell für Schätzung'],
        relatedTopics: [{ level: 'level3', index: 0, label: 'Zustandsschätzung und Kalman-Filter' }, { level: 'level3', index: 2, label: 'Robotikwahrnehmung und Computer Vision' }],
        resources: [{ title: 'OpenCV', url: 'https://docs.opencv.org/' }]
    },
    {
        title: 'Aktoren und Antriebssysteme',
        content: `
            <h3>Elektromotoren</h3>
            <p>DC, BLDC, Schrittmotoren — unterschiedliche Regelung und Haltemoment.</p>
            <h3>Getriebe</h3>
            <p>Drehzahl gegen Drehmoment; <strong>Spiel</strong> und Reibung begrenzen die Präzision.</p>
            <h3>Kaskadenregelung</h3>
            <p>Drehmoment/Strom innen, Geschwindigkeit, außen Lage — ähnlich PID-Kaskaden.</p>`,
        keyPoints: ['Kennlinie und thermische Grenzen kennen', 'Spiel mechanisch oder softwareseitig berücksichtigen', 'Kaskaden für Gelenke'],
        relatedTopics: [{ level: 'level2', index: 3, label: 'Roboterdynamik' }, { level: 'level2', index: 4, label: 'Regelung und PID' }],
        resources: [{ title: 'Modern Robotics', url: 'https://modernrobotics.northwestern.edu/' }]
    },
    {
        title: 'Eingebettetes Rechnen und Grundlagen der Robotikprogrammierung',
        content: `
            <h3>Echtzeit</h3>
            <p><strong>Harte</strong> Fristen für sicherheitskritische Regelung; Bildverarbeitung oft weich echtzeitfähig.</p>
            <h3>ROS 2</h3>
            <p>Knoten, Topics, Services, Actions; QoS pro Datenstrom wählen.</p>
            <h3>tf2</h3>
            <p>Zeitgestempelter Transform-Baum — muss zur Mathematik passen.</p>`,
        keyPoints: ['Regelkreis von Bildpipeline trennen', 'Konsistenter Transform-Baum', 'Logs für Debugging'],
        relatedTopics: [{ level: 'level1', index: 6, label: 'Koordinatensysteme und starre Transformationen' }, { level: 'level4', index: 2, label: 'Systemintegration autonomer Systeme und Funktionale Sicherheit' }],
        resources: [{ title: 'ROS 2 Dokumentation', url: 'https://docs.ros.org/en/humble/' }]
    },
    {
        title: 'Koordinatensysteme und starre Transformationen',
        content: `
            <h3>Frames</h3>
            <p>Je starrem Körper ein Koordinatensystem; Namen wie <code>base_link</code>, <code>tool0</code> einheitlich verwenden.</p>
            <h3>Komposition</h3>
            <p><strong>p</strong><sub>Basis</sub> = <strong>T</strong><sub>Basis←Handgelenk</sub> <strong>T</strong><sub>Handgelenk←Kamera</sub> <strong>p</strong><sub>Kamera</sub> (homogen).</p>
            <h3>Inverse</h3>
            <p><strong>T</strong>⁻¹ = [<strong>R</strong>ᵀ | −<strong>R</strong>ᵀ<strong>p</strong>; 0 0 0 | 1].</p>
            <h3>Fehlerquelle</h3>
            <p>Falsche Reihenfolge oder verwechselte Parent/Child-Richtung.</p>`,
        keyPoints: ['Homogene 4×4-Matrizen verkettet multiplizieren', 'Inverse nutzt Rᵀ', 'Häufigster Integrationsfehler: Frame-Reihenfolge'],
        relatedTopics: [{ level: 'level2', index: 0, label: 'Vorwärtskinematik' }, { level: 'level3', index: 2, label: 'Robotikwahrnehmung und Computer Vision' }],
        resources: [{ title: 'Modern Robotics', url: 'https://modernrobotics.northwestern.edu/' }]
    }
]);
