i18n.registerContent('de', 'level2', [
    {
        title: 'Vorwärtskinematik',
        content: `
            <h3>Definition</h3>
            <p><strong>Vorwärtskinematik</strong> bildet Gelenkwinkel auf die Pose des Endeffektors ab — für feste Werte eindeutig.</p>
            <h3>Denavit–Hartenberg</h3>
            <p>Vier Parameter pro Gelenk; Standard- vs. modifiziertes DH — eine Konvention durchziehen.</p>
            <h3>Kette</h3>
            <p><strong>T</strong>₀<sup>n</sup> als Produkt der Gelenk-Transformationen.</p>
            <h3>PoE</h3>
            <p>Produkt der Exponentialform — alternative zu DH.</p>
            <h3>Arbeitsraum</h3>
            <p>Erreichbar vs. dexter — Orientierung kann eingeschränkt sein.</p>`,
        keyPoints: ['FK ist schnelle Matrixkette', 'DH kompakt, PoE flexibel', 'Arbeitsraum von Geometrie und Grenzen'],
        relatedTopics: [{ level: 'level1', index: 6, label: 'Koordinatensysteme und starre Transformationen' }, { level: 'level2', index: 1, label: 'Inverse Kinematik' }],
        resources: [{ title: 'Modern Robotics Kap. 4', url: 'https://modernrobotics.northwestern.edu/' }]
    },
    {
        title: 'Inverse Kinematik',
        content: `
            <h3>Definition</h3>
            <p>Soll-Pose → Gelenkwinkel; <strong>mehrdeutig oder unlösbar</strong> möglich.</p>
            <h3>Analytisch</h3>
            <p>2R-Ebene, 6R mit Kugelgelenk-Hand — <strong>Pieper</strong>.</p>
            <h3>Numerisch</h3>
            <p>Jacobi-Transponierte, Pseudo-Inverse, <strong>gedämpfte kleinste Quadrate</strong> mit λ.</p>
            <h3>Redundanz</h3>
            <p>Nullraum für Nebenziele (Kollision, Ellbogenhaltung).</p>`,
        keyPoints: ['Geschlossene Form wo möglich', 'DLS stabilisiert singularitätsnah', 'Lösungsauswahl nötig'],
        relatedTopics: [{ level: 'level2', index: 0, label: 'Vorwärtskinematik' }, { level: 'level2', index: 2, label: 'Geschwindigkeitskinematik und Jacobi-Matrix' }],
        resources: [{ title: 'Modern Robotics Kap. 6', url: 'https://modernrobotics.northwestern.edu/' }]
    },
    {
        title: 'Geschwindigkeitskinematik und Jacobi-Matrix',
        content: `
            <h3><strong>ẋ</strong> = <strong>J</strong>(<strong>q</strong>)<strong>q̇</strong></h3>
            <p><strong>J</strong> hängt von <strong>q</strong> ab — pro Zyklus neu.</p>
            <h3>Singularitäten</h3>
            <p>Rangverlust → keine Geschwindigkeit in manchen Richtungen. Manipulierbarkeit als Abstandsmaß.</p>
            <h3>Statik</h3>
            <p><strong>τ</strong> = <strong>J</strong>ᵀ<strong>f</strong>.</p>
            <h3>Resolved-rate</h3>
            <p><strong>q̇</strong> = <strong>J</strong>⁺<strong>ẋ</strong> — mit DLS singularitätsnah.</p>`,
        keyPoints: ['J ist lokales lineares Modell', 'Singularitäten sind physikalisch', 'Jᵀ für Kräfte und Drehmomente'],
        relatedTopics: [{ level: 'level2', index: 1, label: 'Inverse Kinematik' }, { level: 'level2', index: 3, label: 'Roboterdynamik' }],
        resources: [{ title: 'Modern Robotics Kap. 5', url: 'https://modernrobotics.northwestern.edu/' }]
    },
    {
        title: 'Roboterdynamik',
        content: `
            <h3>Manipulatorgleichung</h3>
            <p><strong>M</strong><strong>q̈</strong> + <strong>C</strong><strong>q̇</strong> + <strong>g</strong> = <strong>τ</strong>. <strong>M</strong> symmetrisch positiv definit.</p>
            <h3>Newton–Euler / Lagrange</h3>
            <p>Rekursiv effizient; Energiebetrachtung für Intuition.</p>
            <h3>Vorsteuerung</h3>
            <p>Modellbasierte <strong>τ</strong> kompensiert Trägheit und Coriolis bei schnellen Bewegungen.</p>
            <h3>Gravitationskompensation</h3>
            <p>Verbessert Teleoperation und langsame Führung.</p>`,
        keyPoints: ['Bei hoher Geschwindigkeit dominieren dynamische Terme', 'Inverse Dynamik für Vorsteuerung', 'M(q) positiv definit'],
        relatedTopics: [{ level: 'level2', index: 2, label: 'Geschwindigkeitskinematik und Jacobi-Matrix' }, { level: 'level2', index: 4, label: 'Regelung und PID' }],
        resources: [{ title: 'Modern Robotics Kap. 8', url: 'https://modernrobotics.northwestern.edu/' }]
    },
    {
        title: 'Regelung und PID',
        content: `
            <h3>PID</h3>
            <p>P für Schnelligkeit, I gegen bleibende Fehler, D für Dämpfung — Rauschen am D-Glied beachten.</p>
            <h3>Windup</h3>
            <p>Integrator bei Sättigung begrenzen.</p>
            <h3>Kaskade</h3>
            <p>Innere Geschwindigkeit, äußere Lage — Standard in der Antriebstechnik.</p>`,
        keyPoints: ['I bei Lastfehler', 'Anti-Windup', 'Kaskade robuster als ein einzelner Lage-PID'],
        relatedTopics: [{ level: 'level2', index: 3, label: 'Roboterdynamik' }, { level: 'level1', index: 5, label: 'Eingebettetes Rechnen und Grundlagen der Robotikprogrammierung' }],
        resources: [{ title: 'MIT OCW Signale und Systeme', url: 'https://ocw.mit.edu/courses/6-003-signals-and-systems-fall-2011/' }]
    },
    {
        title: 'Mobile Robotik: Kinematik und Odometrie',
        content: `
            <h3>Differenzialantrieb</h3>
            <p><em>v</em>, <em>ω</em> aus Radgeschwindigkeiten und Spurweite <em>b</em>.</p>
            <h3>Nichtholonom</h3>
            <p>Kein seitliches Rutschen — aber Posen mit Manövern erreichbar.</p>
            <h3>Odometrie</h3>
            <p>Integration driftet — absolute Korrektur nötig.</p>
            <h3>Heading-Fehler</h3>
            <p>Kleine Winkelabweichung wächst lateral mit der Strecke.</p>`,
        keyPoints: ['Odometrie allein driftet', 'Nichtholonom begrenzt <em>v</em>, nicht alle Posen', 'Gierwinkelgenauigkeit kritisch'],
        relatedTopics: [{ level: 'level1', index: 6, label: 'Koordinatensysteme und starre Transformationen' }, { level: 'level3', index: 0, label: 'Zustandsschätzung und Kalman-Filter' }],
        resources: [{ title: 'Modern Robotics Kap. 13', url: 'https://modernrobotics.northwestern.edu/' }]
    }
]);
