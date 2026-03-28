i18n.registerContent('de', 'level4', [
    {
        title: 'Robotik-Lernen und Reinforcement Learning',
        content: `
            <h3>Grenzen klassischer Regelung</h3>
            <p>Unmodellierte Dynamik und Vielfalt → Daten und Lernen.</p>
            <h3>Imitation</h3>
            <p>Behavior Cloning einfach; <strong>Verteilungsverschiebung</strong> problematisch — DAgger etc.</p>
            <h3>MDP &amp; Bellman</h3>
            <p>Zustände, Aktionen, Belohnung, Übergänge.</p>
            <h3>PPO &amp; Co.</h3>
            <p>On-Policy-Standard für kontinuierliche Steuerung in Forschung.</p>
            <h3>Sim-to-Real</h3>
            <p>Domain-Randomisierung und Anpassung.</p>
            <h3>Belohnungsdesign</h3>
            <p>Reward-Hacking vermeiden.</p>`,
        keyPoints: ['BC allein driftet', 'PPO verbreitet', 'Sim-to-Real aktiv gestalten'],
        relatedTopics: [{ level: 'level3', index: 2, label: 'Robotikwahrnehmung und Computer Vision' }, { level: 'level3', index: 6, label: 'Manipulation und Greifen' }],
        resources: [{ title: 'Sutton &amp; Barto', url: 'http://incompleteideas.net/book/the-book-2nd.html' }]
    },
    {
        title: 'Multi-Roboter-Systeme und Koordination',
        content: `
            <h3>Architekturen</h3>
            <p>Zentral, dezentral, verteilt.</p>
            <h3>Zuordnung</h3>
            <p>Ungarischer Algorithmus <em>O</em>(<em>n</em>³).</p>
            <h3>Kollisionsvermeidung</h3>
            <p>RVO/ORCA, MAPF.</p>
            <h3>Schwarm</h3>
            <p>Lokale Regeln, globales Verhalten emergent.</p>`,
        keyPoints: ['Zentral = Flaschenhals', 'Ungarisch für Zuordnung', 'Lagerflotten hybrid'],
        relatedTopics: [{ level: 'level3', index: 3, label: 'Pfadplanung für mobile Roboter' }, { level: 'level3', index: 0, label: 'Zustandsschätzung und Kalman-Filter' }],
        resources: [{ title: 'MAPF / CBS Suche', url: 'https://www.google.com/search?q=multi-agent+path+finding+CBS' }]
    },
    {
        title: 'Systemintegration autonomer Systeme und Funktionale Sicherheit',
        content: `
            <h3>Stack</h3>
            <p>Wahrnehmung → Schätzung → Karte → Planung → Regelung → Aktorik.</p>
            <h3>Normen</h3>
            <p>ISO 10218, ISO/TS 15066, ISO 26262, IEC 61508 — je nach Anwendung.</p>
            <h3>Gefahrenanalyse</h3>
            <p>HARA, FMEA, SIL.</p>
            <h3>Kollaboration</h3>
            <p>Kraft-/Leistungsbegrenzung, Geschwindigkeits- und Abstandsüberwachung.</p>
            <h3>Watchdog</h3>
            <p>Hardware-Timeout sichert bei Softwareausfall.</p>`,
        keyPoints: ['Safety by Design', 'PFL braucht Messgrößen', 'NOT-HALT hardwareseitig'],
        relatedTopics: [{ level: 'level1', index: 5, label: 'Eingebettetes Rechnen und Grundlagen der Robotikprogrammierung' }, { level: 'level2', index: 4, label: 'Regelung und PID' }],
        resources: [{ title: 'ISO/TS 15066', url: 'https://www.google.com/search?q=ISO+TS+15066' }]
    },
    {
        title: 'Capstone — Vollständiges autonomes Robotersystem',
        content: `
            <h3>Anforderungen</h3>
            <p>Funktional und nicht-funktional (Latenz, SIL, Verfügbarkeit).</p>
            <h3>Architektur</h3>
            <p>Reaktiv + deliberativ; Verhaltensbäume für Aufgabenlogik.</p>
            <h3>Verhaltensbäume</h3>
            <p>Sequence, Selector, Parallel — lesbarer als riesige FSM.</p>
            <h3>Tests</h3>
            <p>Unit, Integration, HIL, Feld.</p>
            <h3>KPI</h3>
            <p>Vor dem Bau definieren.</p>
            <h3>Telemetrie</h3>
            <p>Degradation planen.</p>`,
        keyPoints: ['BT skalieren mit Teams', 'Simulation reicht nicht allein', 'End-to-End alle Disziplinen verbinden'],
        relatedTopics: [{ level: 'level1', index: 0, label: 'Anatomie eines Roboters' }, { level: 'level4', index: 2, label: 'Systemintegration autonomer Systeme und Funktionale Sicherheit' }],
        resources: [{ title: 'Behavior Trees (arXiv)', url: 'https://arxiv.org/abs/1709.00084' }]
    }
]);
