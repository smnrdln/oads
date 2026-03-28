i18n.registerContent('de', 'level3', [
    {
        title: 'Modellbasiertes RL',
        content: `<h3>Gelernte Dynamik</h3><p>ŝ′ = f<sub>θ</sub>(s,a) oder probabilistisches Modell; planen oder synthetische Rollouts erzeugen.</p><h3>MBPO-ähnlich</h3><p>Kurze imaginäre Rollouts begrenzen <strong>akkumulierten Modellfehler</strong> über lange Horizonte.</p><h3>Planung</h3><p>MPC mit Modell plant jeden Schritt neu — stark, wenn das Modell lokal stimmt.</p><h3>Risiken</h3><p>Außerhalb der Verteilung halluziniert das Modell; Unsicherheit und Ensembles helfen.</p><h3>Robotik</h3><p>Sample-effizient, wenn Kontakt halbwegs modelliert ist; hybride modellfreie Korrektur ist üblich.</p>`,
        keyPoints: ['Modellfehler wächst mit der Rollout-Länge', 'Kurze Modell-Rollouts + Policy-Optimierung ist ein pragmatisches Muster', 'Unbegrenzte OOD-Synthese nicht blind vertrauen'],
        relatedTopics: [{ level: 'level1', index: 3, label: 'Dynamische Programmierung' }, { level: 'level3', index: 1, label: 'Sim-to-Real-Transfer' }, { level: 'level2', index: 5, label: 'Simulationsumgebungen für Robotik' }],
        resources: [{ title: 'MBPO', url: 'https://arxiv.org/abs/1903.00374' }]
    },
    {
        title: 'Sim-to-Real-Transfer',
        content: `<h3>Domain Randomization</h3><p>Reibung, Masse, Verzögerungen, Sensorrauschen randomisieren, damit die Policy gegen Streuung robust wird.</p><h3>Systemidentifikation</h3><p>Sim-Parameter an echte Trajektorien anpassen.</p><h3>Adaptation</h3><p>Mit wenig echten Daten feintunen; Residual RL korrigiert Sim-Bias.</p><h3>Was randomisieren</h3><p>Bei Läufern: Dynamik und Latenz oft wichtiger als Textur allein.</p><h3>Validierung</h3><p>Ablations, welche Randomisierungen Hardware-Metriken wirklich verbessern.</p>`,
        keyPoints: ['Sim-to-Real ist Verteilungsverschiebung', 'Physikparameter schlagen Tapeten für Lokomotion', 'Am Roboter messen — Sim-Erfolg reicht nicht'],
        relatedTopics: [{ level: 'level2', index: 5, label: 'Simulationsumgebungen für Robotik' }, { level: 'level3', index: 0, label: 'Modellbasiertes RL' }, { level: 'level3', index: 6, label: 'Lokomotion: Policy-Design' }],
        resources: [{ title: 'Sim2Real Übersichten', url: 'https://arxiv.org/' }]
    },
    {
        title: 'Kontinuierliche Regelung mit SAC',
        content: `<h3>Maximum-Entropy-RL</h3><p>Erwarteten Return <em>plus</em> Policy-Entropie optimieren — fördert Exploration und Robustheit.</p><h3>Actor-Critic kontinuierlich</h3><p>Zwei Q-Netze; <strong>min(Q₁,Q₂)</strong> im Ziel reduziert Überschätzung.</p><h3>Automatische Temperatur</h3><p>Dual-Update auf α für ein Entropieziel.</p><h3>Off-policy</h3><p>Replay verbessert oft die Sample-Effizienz gegenüber PPO.</p><h3>Robotik</h3><p>Weit verbreitet für Manipulation und Lokomotion in Sim und vorsichtig real.</p>`,
        keyPoints: ['SAC ist unter den Standard-Baselines sample-effizient', 'Entropie ist ein Regler — Auto-α reduziert Handarbeit', 'Off-policy-Q-Extrapolation braucht manchmal konservative Tricks'],
        relatedTopics: [{ level: 'level2', index: 3, label: 'Actor-Critic-Methoden' }, { level: 'level3', index: 3, label: 'TD3 — Twin Delayed DDPG' }, { level: 'level3', index: 7, label: 'Dexteres Greifen und Manipulation' }],
        resources: [{ title: 'SAC', url: 'https://arxiv.org/abs/1801.01290' }]
    },
    {
        title: 'TD3 — Twin Delayed DDPG',
        content: `<h3>Deterministischer Actor</h3><p>μ(s) liefert kontinuierliche Aktionen; Q(s,a) als Kritiker.</p><h3>Twin Q</h3><p>Minimum zweier Q-Ziele gegen Überschätzung.</p><h3>Verzögerte Policy-Updates</h3><p>Aktor seltener updaten, damit der Kritiker schärfer führt.</p><h3>Target Policy Smoothing</h3><p>Rauschen auf Zielaktionen im Q-Backup — glättet die Wertlandschaft.</p><h3>Einsatz</h3><p>Starker Baseline, wenn keine explizite Entropie-Exploration nötig ist.</p>`,
        keyPoints: ['TD3 adressiert Überschätzung im deterministischen Actor-Critic', 'Policy-Verzögerung + Ziel-Glättung stabilisieren', 'Mit SAC vergleichen, wenn Entropie-Exploration wichtig ist'],
        relatedTopics: [{ level: 'level3', index: 2, label: 'Kontinuierliche Regelung mit SAC' }, { level: 'level2', index: 2, label: 'Policy-Gradient-Methoden' }],
        resources: [{ title: 'TD3', url: 'https://arxiv.org/abs/1802.09477' }]
    },
    {
        title: 'Hindsight Experience Replay (HER)',
        content: `<h3>Spärliche Ziele</h3><p>Bei Multi-Goal-Settings sind Misserfolge häufig — wenig Belohnungssignal.</p><h3>Umetikettierung</h3><p>Übergänge speichern und so tun, als wäre der <strong>erreichte Endzustand</strong> das Ziel — aus Fehlern werden Erfolge im Replay.</p><h3>Off-policy</h3><p>Passt zu DDPG/SAC-Replay — nicht plug-in für reines On-Policy-PPO.</p><h3>Grenzen</h3><p>Verallgemeinerung auf Ziele weit außerhalb der erreichten Hülle braucht Curriculum oder Exploration.</p>`,
        keyPoints: ['HER erzeugt Lernsignal aus fehlgeschlagenen Episoden', 'Braucht goal-conditioned Formulierung', 'Passt natürlich zu off-policy kontinuierlichem RL'],
        relatedTopics: [{ level: 'level4', index: 1, label: 'Zielkonditioniertes und Multi-Goal-RL' }, { level: 'level3', index: 2, label: 'Kontinuierliche Regelung mit SAC' }, { level: 'level2', index: 6, label: 'Reward-Shaping für Robotik' }],
        resources: [{ title: 'HER', url: 'https://arxiv.org/abs/1707.01495' }]
    },
    {
        title: 'Safe RL und CMDPs',
        content: `<h3>CMDPs</h3><p>Return maximieren unter erwarteten Kostenbeschränkungen (Kollisionen, Gelenkgrenzen, Menschennähe).</p><h3>Lagrangesche Methoden</h3><p>Erweiterte Belohnung mit λ·Kosten; λ anpassen, um Budgets durchzusetzen — weich, keine harte Garantie jeden Schritt.</p><h3>Shielding / CBF</h3><p>Laufzeitfilter oder Control Barrier Functions <strong>projizieren</strong> unsichere Aktionen — orthogonal zum RL-Ziel.</p><h3>Konservatives Lernen</h3><p>Risiko im Training bestrafen; mit formalen oder statistischen Sicherheitstests validieren.</p>`,
        keyPoints: ['Belohnungsstrafen allein geben selten harte Sicherheit', 'Separate Sicherheitsschichten sind in Deployments Standard', 'Lagrangesches RL tauscht Kosten gegen Return über λ'],
        relatedTopics: [{ level: 'level4', index: 4, label: 'Capstone: End-to-End-Robotikpolicy' }, { level: 'level3', index: 6, label: 'Lokomotion: Policy-Design' }],
        resources: [{ title: 'Constrained Policy Optimization', url: 'https://arxiv.org/abs/1705.10528' }]
    },
    {
        title: 'Lokomotion: Policy-Design',
        content: `<h3>Beobachtungen</h3><p>Propriozeption, Basis-IMU, ggf. Höhenscans oder Tiefe — Balance zwischen Sensorik und Generalisierung.</p><h3>Belohnungen</h3><p>Geschwindigkeits-Tracking, Lage/Höhen-Regularisierung, Moment-Strafen, Fußfreiheit — gegen Stürzen und Energie abwägen.</p><h3>Terrain-Curriculum</h3><p>Schwierigkeit steigern, um Overfitting auf flachen Boden zu vermeiden.</p><h3>Sim-to-Real</h3><p>Dynamik und Verzögerungen randomisieren; Hänge, Stufen, Lastwechsel testen.</p>`,
        keyPoints: ['Lokomotion ist Sim-to-Real-Paradedisziplin', 'Belohnungsterme konkurrieren — ablatieren', 'Terrain-Diversität schlägt eine einzelne Nominalfläche'],
        relatedTopics: [{ level: 'level2', index: 4, label: 'Proximal Policy Optimization (PPO)' }, { level: 'level3', index: 1, label: 'Sim-to-Real-Transfer' }, { level: 'level3', index: 5, label: 'Safe RL und CMDPs' }],
        resources: [{ title: 'Beinlauf-RL (Übersichten)', url: 'https://arxiv.org/' }]
    },
    {
        title: 'Dexteres Greifen und Manipulation',
        content: `<h3>Kontaktreiche Regelung</h3><p>Greifen, Gleiten, Neuorientierung brauchen genaue Kontaktmodelle oder starke Randomisierung.</p><h3>Beobachtung</h3><p>Taktil, visuelle Pose (Fiducials, gelernte Pose-Netze), Propriozeption — Teilbeobachtung begünstigt Gedächtnis (LSTM/GRU).</p><h3>Aktionsraum</h3><p>Endeffektor vs. Gelenkmoment; Impedanz-Ziele erleichtern echte Hardware.</p><h3>Daten</h3><p>IL-Warmstart + RL-Feintuning ist bei hoher DoF üblich.</p>`,
        keyPoints: ['Manipulation strapaziert Sim-Kontakt', 'Pose-Schätzung und Taktil reduzieren Ambiguität', 'Gedächtnis hilft bei Okklusion und Rauschen'],
        relatedTopics: [{ level: 'level2', index: 7, label: 'Imitation Learning' }, { level: 'level3', index: 1, label: 'Sim-to-Real-Transfer' }, { level: 'level3', index: 4, label: 'Hindsight Experience Replay (HER)' }],
        resources: [{ title: 'Dexterous manipulation (Übersichten)', url: 'https://arxiv.org/' }]
    }
]);
