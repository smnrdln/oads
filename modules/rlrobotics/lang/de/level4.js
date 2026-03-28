i18n.registerContent('de', 'level4', [
    {
        title: 'Offline-RL',
        content: `<h3>Setting</h3><p>Policy aus einem <strong>fixen Datensatz</strong> (s,a,r,s′) lernen — keine Online-Exploration.</p><h3>Herausforderung</h3><p>Q-Methoden extrapolieren optimistisch bei schlecht abgedeckten Aktionen — <strong>Überschätzung</strong> bricht die gelernte Policy.</p><h3>Konservative Methoden</h3><p>CQL und Ähnliches bestrafen hohe Q auf OOD-Aktionen; BC-Regularisierer verankern an den Daten.</p><h3>Anwendungen</h3><p>Krankenhausroboter, Fabriklogs, teure Hardware — vorhandene Trajektorien nutzen.</p><h3>Realität</h3><p>Unbegrenzte Offline-Daten ersetzen keine schlechte Abdeckung der Aufgabe.</p>`,
        keyPoints: ['Offline-RL ≠ reines Batch-Imitation — es optimiert weiterhin Return', 'Extrapolationsfehler ist das zentrale technische Problem', 'Algorithmus an Logging-Policy-Abdeckung anpassen'],
        relatedTopics: [{ level: 'level2', index: 7, label: 'Imitation Learning' }, { level: 'level3', index: 2, label: 'Kontinuierliche Regelung mit SAC' }, { level: 'level4', index: 4, label: 'Capstone: End-to-End-Robotikpolicy' }],
        resources: [{ title: 'CQL', url: 'https://arxiv.org/abs/2006.04779' }]
    },
    {
        title: 'Zielkonditioniertes und Multi-Goal-RL',
        content: `<h3>UVFA</h3><p>Universelle Wertfunktionen: V(s,g) oder Q(s,a,g) für viele Ziele in einem Netz.</p><h3>Curricula</h3><p>Einfache Ziele zuerst — Gradienten dort, wo der Agent schon Fortschritt macht.</p><h3>HER-Synergie</h3><p>Umetikettierung liefert dichtes Signal um erreichte Zustände.</p><h3>Generalisierung</h3><p>Ziele weit außerhalb der Trainingshülle brauchen Exploration oder Hierarchien.</p>`,
        keyPoints: ['Ein Netz kann eine Aufgabenfamilie darstellen', 'Curriculum formt die Trainingsverteilung', 'HER „magisch“ alle Arbeitsraumziele nicht'],
        relatedTopics: [{ level: 'level3', index: 4, label: 'Hindsight Experience Replay (HER)' }, { level: 'level4', index: 2, label: 'Multi-Task und Meta-Learning für Robotik' }],
        resources: [{ title: 'UVFA', url: 'https://arxiv.org/abs/1511.06342' }]
    },
    {
        title: 'Multi-Task und Meta-Learning für Robotik',
        content: `<h3>Multi-Task</h3><p>Gemeinsame Repräsentationen über Fähigkeiten; negativen Transfer beachten, wenn Aufgaben kollidieren.</p><h3>MAML</h3><p>Meta-Training so, dass wenige Gradientenschritte auf neuer Aufgabe schnell adaptieren.</p><h3>Robotik</h3><p>Schnelle Adaption, wenn Objekte, Werkzeuge oder Umgebungen wechseln.</p><h3>Daten</h3><p>Diverse Aufgabenfamilien nötig — Sim-Suiten und skriptete Resets skalieren.</p>`,
        keyPoints: ['Multi-Task braucht Balance und Sampling', 'Meta-Learning optimiert für Adaption, nicht Zero-Shot', 'Sim-Diversität speist Meta-Training'],
        relatedTopics: [{ level: 'level4', index: 1, label: 'Zielkonditioniertes und Multi-Goal-RL' }, { level: 'level4', index: 3, label: 'Foundation Models für Robotik' }],
        resources: [{ title: 'MAML', url: 'https://arxiv.org/abs/1703.03400' }]
    },
    {
        title: 'Foundation Models für Robotik',
        content: `<h3>Große Modelle</h3><p>Vision-Language-Modelle, Trajektorien-Transformer und Policy-Priors aus breiten Daten.</p><h3>Sprachkonditionierung</h3><p>Natürlichsprachliche Ziele verbinden Mensch und Policy.</p><h3>Grenzen</h3><p>Sim2Real, Sicherheit und Embodiment-Lücke — Web-Semantik ≠ Millisekunden-Momentenregelung ohne Feintuning.</p><h3>Praxis</h3><p>Oft Wahrnehmungs-Backbone einfrieren und letzte Schichten mit Robotikdaten RL-feintunen.</p>`,
        keyPoints: ['Foundation Models liefern Priors, keine Plug-and-Play-Regler', 'Feintuning auf echten Logs meist nötig', 'Sicherheit und OOD-Verhalten explizit testen'],
        relatedTopics: [{ level: 'level2', index: 7, label: 'Imitation Learning' }, { level: 'level4', index: 2, label: 'Multi-Task und Meta-Learning für Robotik' }, { level: 'level4', index: 4, label: 'Capstone: End-to-End-Robotikpolicy' }],
        resources: [{ title: 'Robotics VLMs / Übersichten', url: 'https://arxiv.org/' }]
    },
    {
        title: 'Capstone: End-to-End-Robotikpolicy',
        content: `<h3>Problemspezifikation</h3><p>MDP definieren: Beobachtungsstack, Aktionsraum, Episodenende, Erfolgsmetrik.</p><h3>Pipeline</h3><p>Sim-Training → Domain Randomization → (optional) IL-Bootstrap → echtes Feintuning mit Sicherheitsschicht.</p><h3>Ablations</h3><p>Eine Randomisierung oder Belohnung nach der anderen wegnehmen; Sim- vs. Real-Kurven plotten.</p><h3>Deliverables</h3><p>Reproduzierbare Konfigs, Seeds, kurze Fehleranalyse (Kontakt, Latenz, Wahrnehmung).</p><h3>Mindset</h3><p>MDP-Framing, Algorithmuswahl, Sim-to-Real und Sicherheit integrieren — der Kurs in einem System.</p>`,
        keyPoints: ['End-to-End heißt Obs → Policy → Hardware mit Metriken', 'Ablations rechtfertigen Engineering-Entscheidungen', 'Sicherheit gehört in die Architektur, nicht nur in die Belohnung'],
        relatedTopics: [{ level: 'level3', index: 1, label: 'Sim-to-Real-Transfer' }, { level: 'level3', index: 5, label: 'Safe RL und CMDPs' }, { level: 'level4', index: 0, label: 'Offline-RL' }],
        resources: [{ title: 'Sutton & Barto — Buch', url: 'http://incompleteideas.net/book/the-book.html' }]
    }
]);
