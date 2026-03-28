i18n.registerContent('de', 'level1', [
    {
        title: 'Mathematische Grundlagen für RL',
        content: `<h3>Lineare Algebra &amp; Wahrscheinlichkeit</h3><p>Vektoren und Matrizen repräsentieren Zustände, Aktionen und Gewichte. Erwartungswerte <strong>E[X]</strong> und bedingte Wahrscheinlichkeiten sind Grundlage von Returns und Policies.</p><h3>Analysis</h3><p>Partielle Ableitungen und Kettenregel steuern Gradientenupdates. Der Gradient zeigt in die Richtung des <strong>steilsten Anstiegs</strong>.</p><h3>Log-Ableitungs-Trick</h3><p><code>∇<sub>θ</sub> E[R] = E[R · ∇<sub>θ</sub> log π<sub>θ</sub>(a|s)]</code> — die REINFORCE-Identität — macht aus Stichproben durch π einen unverzerrten Gradientenschätzer.</p><h3>Fallen</h3><p>Einen Trajektorien-Return mit dem wahren Erwartungswert verwechseln; Stochastik der Policy beim Differenzieren ignorieren.</p>`,
        keyPoints: ['RL optimiert Erwartungen, nicht einzelne Rollouts', 'Die Log-Form ist für korrekte Policy-Gradient-Monte-Carlo nötig', 'Diese Werkzeuge sind Voraussetzung für Algorithmus-Papers'],
        relatedTopics: [{ level: 'level1', index: 1, label: 'Der Markov-Entscheidungsprozess (MDP)' }, { level: 'level1', index: 2, label: 'Wertfunktionen und die Bellman-Gleichung' }, { level: 'level2', index: 2, label: 'Policy-Gradient-Methoden' }],
        resources: [{ title: 'Mathematics for Machine Learning', url: 'https://mml-book.github.io/' }, { title: 'Sutton & Barto (frei)', url: 'http://incompleteideas.net/book/the-book.html' }]
    },
    {
        title: 'Der Markov-Entscheidungsprozess (MDP)',
        content: `<h3>Definition</h3><p>Tupel <strong>(S, A, P, R, γ)</strong>: Zustände, Aktionen, Übergangsdynamik, Belohnung, Diskontierung.</p><h3>Markov-Eigenschaft</h3><p>Die Zukunft hängt nur vom aktuellen Zustand ab — auf echten Robotern oft nur <em>approximativ</em> (Latenz, Rauschen → POMDP).</p><h3>Diskont γ</h3><p>Geometrische Gewichtung zukünftiger Belohnung; hohes γ betont lange Horizonte, kann aber die Varianz der Returns erhöhen.</p><h3>Robotik</h3><p><strong>P(s′|s,a)</strong> kodiert Physik und ist meist unbekannt; <strong>sparse</strong> Erfolgsbelohnungen sind realistisch, aber schwer zu lernen.</p>`,
        keyPoints: ['Jedes Steuerungsproblem als MDP oder POMDP formulieren', 'γ tauscht Kurzsicht vs. langfristige Credit-Zuweisung', 'Reward-Design ist zentrale Ingenieursarbeit'],
        relatedTopics: [{ level: 'level1', index: 0, label: 'Mathematische Grundlagen für RL' }, { level: 'level1', index: 2, label: 'Wertfunktionen und die Bellman-Gleichung' }, { level: 'level2', index: 6, label: 'Reward-Shaping für Robotik' }],
        resources: [{ title: 'Sutton & Barto Kap. 3–4', url: 'http://incompleteideas.net/book/the-book.html' }, { title: 'David Silver — MDPs', url: 'https://www.davidsilver.uk/teaching/' }]
    },
    {
        title: 'Wertfunktionen und die Bellman-Gleichung',
        content: `<h3>V und Q</h3><p><strong>V<sup>π</sup>(s)</strong> ist der erwartete Return ab s unter π; <strong>Q<sup>π</sup>(s,a)</strong> bedingt auf die erste Aktion.</p><h3>Bellman-Erwartung</h3><p>Rekursive Zerlegung: Wert in s gleich sofortige Belohnung plus diskontierter erwarteter Nachfolgewert.</p><h3>Bellman-Optimalität</h3><p><strong>V*</strong> und <strong>Q*</strong> nutzen <code>max<sub>a</sub></code> über Aktionen — Basis von dynamischer Programmierung und vielen Deep-RL-Zielen.</p><h3>Vorteil (Advantage)</h3><p><strong>A(s,a) = Q(s,a) − V(s)</strong> zentriert Lernsignale und reduziert Varianz in Policy-Gradienten.</p><h3>Falle</h3><p>On-policy V<sup>π</sup> mit optimalem V* vermischen.</p>`,
        keyPoints: ['Bellman-Gleichungen kodieren sequenzielle Struktur', 'Advantage trennt „besser als durchschnittliche Aktion“ ab', 'Optimalitäts-Backups treiben Q-Learning und Fitted-Q'],
        relatedTopics: [{ level: 'level1', index: 1, label: 'Der Markov-Entscheidungsprozess (MDP)' }, { level: 'level1', index: 3, label: 'Dynamische Programmierung' }, { level: 'level2', index: 3, label: 'Actor-Critic-Methoden' }],
        resources: [{ title: 'Sutton & Barto — Wertfunktionen', url: 'http://incompleteideas.net/book/the-book.html' }]
    },
    {
        title: 'Dynamische Programmierung',
        content: `<h3>Wann anwendbar</h3><p>Bekanntes Modell und überschaubarer Zustandsraum — auf dem vollen Roboter selten, aber theoretisch zentral.</p><h3>Policy-Evaluation</h3><p>Iterative Bellman-Backups bis V<sup>π</sup> konvergiert.</p><h3>Policy-Iteration</h3><p>Abwechselnd Evaluation und gierige Verbesserung; monotone Verbesserung in endlichen MDPs.</p><h3>Wert-Iteration</h3><p>Backup und Max in einem Durchlauf — konvergiert zu V*.</p><h3>Fluch der Dimensionalität</h3><p>Tabellarische DP skaliert nicht zu hochdimensionalen kontinuierlichen Robotikzuständen.</p>`,
        keyPoints: ['DP setzt ein Modell voraus; Robotik lernt oder simuliert stattdessen', 'Policy- vs. Wert-Iteration tauscht inneren Aufwand gegen Einfachheit', 'Erklärt Dominanz modellfreier Methoden mit Funktionsapproximation'],
        relatedTopics: [{ level: 'level1', index: 2, label: 'Wertfunktionen und die Bellman-Gleichung' }, { level: 'level1', index: 5, label: 'Temporal-Difference-Lernen' }, { level: 'level3', index: 0, label: 'Modellbasiertes RL' }],
        resources: [{ title: 'Sutton & Barto — DP', url: 'http://incompleteideas.net/book/the-book.html' }]
    },
    {
        title: 'Monte-Carlo-Methoden',
        content: `<h3>Idee</h3><p>Werte aus <strong>vollen Episoden-Returns</strong> schätzen — unverzerrt, aber hohe Varianz und klare Episodengrenzen nötig.</p><h3>Every-visit vs. First-visit</h3><p>Mittelung über Returns, die einen Zustand passieren.</p><h3>On-policy-MC</h3><p>π folgen während V<sup>π</sup> oder Q<sup>π</sup> geschätzt wird.</p><h3>Off-policy &amp; IS</h3><p>Importance Sampling korrigiert Verhalten vs. Zielpolicy — Verhältnisse können die Varianz explodieren lassen.</p><h3>Robotik</h3><p>Lange Horizonte und fortlaufende Aufgaben erschweren reines MC; TD bootstrappt stattdessen.</p>`,
        keyPoints: ['MC wartet bis Episodenende', 'IS-Off-policy-MC ist nicht automatisch effizienter', 'Episodenstruktur zählt für Credit Assignment'],
        relatedTopics: [{ level: 'level1', index: 3, label: 'Dynamische Programmierung' }, { level: 'level1', index: 5, label: 'Temporal-Difference-Lernen' }, { level: 'level2', index: 2, label: 'Policy-Gradient-Methoden' }],
        resources: [{ title: 'Sutton & Barto — MC', url: 'http://incompleteideas.net/book/the-book.html' }]
    },
    {
        title: 'Temporal-Difference-Lernen',
        content: `<h3>Bootstrapping</h3><p>TD-Updates nutzen <strong>Ein-Schritt</strong>-Ziele mit echter Belohnung und geschätztem Nachfolgewert — niedrigere Varianz als MC, etwas Bias.</p><h3>TD(0)</h3><p><code>V ← V + α [r + γV(s′) − V(s)]</code>.</p><h3>TD(λ)</h3><p>λ=0 ist Ein-Schritt-TD; λ=1 (Forward-Sicht) entspricht vollem Monte Carlo.</p><h3>n-Schritt-Returns</h3><p>Brücke zwischen Bias und Varianz.</p><h3>Robotik</h3><p>Online-TD-ähnliche Ziele stecken in Actor-Critic und vielen Deep-RL-Kritikern.</p>`,
        keyPoints: ['TD lernt vor Episodenende — wichtig bei langen Aufgaben', 'Bootstrapping erzeugt Bias bei falschen Wertschätzungen', 'λ und n-Schritt justieren Bias–Varianz'],
        relatedTopics: [{ level: 'level1', index: 4, label: 'Monte-Carlo-Methoden' }, { level: 'level1', index: 6, label: 'Q-Learning und SARSA' }, { level: 'level2', index: 3, label: 'Actor-Critic-Methoden' }],
        resources: [{ title: 'Sutton & Barto — TD', url: 'http://incompleteideas.net/book/the-book.html' }]
    },
    {
        title: 'Q-Learning und SARSA',
        content: `<h3>Tabulare Steuerung</h3><p>Q(s,a) pflegen und ε-greedy (oder Softmax) während Updates aus Übergängen.</p><h3>SARSA (on-policy)</h3><p>Backup nutzt die <strong>tatsächliche</strong> Folgeaktion a′ der Verhaltenspolicy.</p><h3>Q-Learning (off-policy)</h3><p>Backup nutzt <code>max<sub>a′</sub> Q(s′,a′)</code> — lernt Q* während mit anderer Policy explorativ wird (unter Standardbedingungen).</p><h3>Exploration</h3><p>Zustands-Aktions-Paare müssen ausreichend besucht werden.</p><h3>Grenzen</h3><p>Tabellarisch nicht skalierbar; kontinuierliche Aktionen brauchen Funktionsapproximation und andere Algorithmen.</p>`,
        keyPoints: ['SARSA respektiert die Explorationspolicy; Q-Learning zielt auf die gierige Optimum-Backup', 'Tabellarisches Q-Learning konvergiert mit breiter Exploration', 'Grundlage für DQN-ähnliches Deep Q-Learning'],
        relatedTopics: [{ level: 'level1', index: 5, label: 'Temporal-Difference-Lernen' }, { level: 'level2', index: 1, label: 'Deep Q-Network (DQN)' }, { level: 'level1', index: 7, label: 'Robotik: Zustands- und Aktionsräume' }],
        resources: [{ title: 'Sutton & Barto — Steuerung', url: 'http://incompleteideas.net/book/the-book.html' }]
    },
    {
        title: 'Robotik: Zustands- und Aktionsräume',
        content: `<h3>Zustandsdesign</h3><p>Propriozeption (Gelenke, Geschwindigkeiten, Momente), Endeffektor-Pose, objekt-relative Merkmale und <strong>kompakte</strong> Aufgabenbeschreibungen lernen oft schneller als rohes hochauflösendes RGB allein.</p><h3>Teilbeobachtbarkeit</h3><p>Frames stapeln, letzte Aktionen anhängen oder RNN/Transformer-Gedächtnis, wenn die Markov-Annahme bricht.</p><h3>Aktionen</h3><p>Lage-, Geschwindigkeits- oder Momentenbefehle; diskret vs. kontinuierlich; Trade-offs für Lernbarkeit und Sicherheit.</p><h3>Normalisierung</h3><p>Beobachtungen und Aktionen für stabile Netze skalieren.</p><h3>Fallen</h3><p>Redundanter oder nicht beobachtbarer Zustand; Sim–Real-Mismatch bei den tatsächlichen Sensoren.</p>`,
        keyPoints: ['Niedrigdimensionale, strukturierte Zustände schlagen oft blähende Pixel hinsichtlich Sample-Effizienz', 'Historie in der Beobachtung approximiert einen Markov-Zustand', 'Aktionswahl beeinflusst Lernbarkeit und nachgelagerte Sicherheitsfilter'],
        relatedTopics: [{ level: 'level1', index: 1, label: 'Der Markov-Entscheidungsprozess (MDP)' }, { level: 'level2', index: 0, label: 'Funktionsapproximation und neuronale Netze im RL' }, { level: 'level2', index: 5, label: 'Simulationsumgebungen für Robotik' }],
        resources: [{ title: 'Gymnasium', url: 'https://gymnasium.farama.org/' }]
    }
]);
