i18n.registerContent('de', 'level2', [
    {
        title: 'Funktionsapproximation und neuronale Netze im RL',
        content: `<h3>Warum approximieren</h3><p>Robotikzustandsräume sind riesig oder kontinuierlich; tabellarische Methoden speichern nicht jedes (s,a).</p><h3>Lineare FA</h3><p>Merkmale φ(s) mit Gewichten w; TD konvergiert zu einem <strong>projizierten</strong> Bellman-Fixpunkt, nicht notwendig zum wahren V*.</p><h3>Nichtlineare Netze</h3><p>MLPs und CNNs generalisieren über ähnliche Zustände — bringen aber nicht-stationäre Ziele und Instabilität.</p><h3>Tödliches Trias</h3><p>Bootstrapping + Off-policy + FA kann divergieren — Zielnetze, Replay und Algorithmusdesign mildern das.</p><h3>Robotik</h3><p>Eingänge normalisieren; Extrapolation außerhalb der Trainingsverteilung beobachten.</p>`,
        keyPoints: ['FA tauscht exakte Tabellen gegen Skalierbarkeit', 'Nichtlineare Kritiker/Aktoren brauchen Stabilisatoren', 'Merkmalsdesign zählt auch mit Deep Nets'],
        relatedTopics: [{ level: 'level1', index: 7, label: 'Robotik: Zustands- und Aktionsräume' }, { level: 'level2', index: 1, label: 'Deep Q-Network (DQN)' }, { level: 'level2', index: 2, label: 'Policy-Gradient-Methoden' }],
        resources: [{ title: 'Sutton & Barto — FA', url: 'http://incompleteideas.net/book/the-book.html' }, { title: 'D2L — RL', url: 'https://d2l.ai/chapter_reinforcement-learning/' }]
    },
    {
        title: 'Deep Q-Network (DQN)',
        content: `<h3>Kernideen</h3><p>Neuronales Q(s,a); <strong>Experience Replay</strong> entkoppelt Minibatches; <strong>Zielnetz</strong> bremst oszillierende bewegte Ziele.</p><h3>Double DQN</h3><p>Auswahl und Bewertung der Aktion entkoppeln — reduziert Überschätzung.</p><h3>Dueling-Architektur</h3><p>Getrennte V(s)- und A(s,a)-Pfade.</p><h3>Grenzen für Manipulation</h3><p>Diskrete Aktions-Bins für hohe DoF explodieren — kontinuierliche Regelung begünstigt Policy-Gradienten oder Actor-Critic.</p>`,
        keyPoints: ['Replay + Zielnetz sind Standard-Stabilisatoren', 'DQN stark für diskrete Spiele; Robotik oft kontinuierliche Aktionen', 'Überschätzungsbias ist bekannte Q-Learning-Pathologie'],
        relatedTopics: [{ level: 'level1', index: 6, label: 'Q-Learning und SARSA' }, { level: 'level2', index: 0, label: 'Funktionsapproximation und neuronale Netze im RL' }, { level: 'level2', index: 4, label: 'Proximal Policy Optimization (PPO)' }],
        resources: [{ title: 'DQN (Nature)', url: 'https://www.nature.com/articles/nature14236' }]
    },
    {
        title: 'Policy-Gradient-Methoden',
        content: `<h3>Score-Funktion</h3><p><code>∇J = E[∇log π(a|s) · G]</code> — erhöht Wahrscheinlichkeit von Aktionen mit hohem Return.</p><h3>Baseline</h3><p>b(s) (oft V(s)) subtrahieren ohne Verzerrung, wenn b nicht von der gezogenen Aktion abhängt.</p><h3>Varianz</h3><p>Returns sind laut; Baselines und Kritiker helfen.</p><h3>Entropie-Bonus</h3><p>Fördert Exploration; zu groß schadet der Endpolitik.</p><h3>Robotik</h3><p>Natürliche Wahl für kontinuierliche Aktionen mit Gauß- oder squashed-Gauß-Policies.</p>`,
        keyPoints: ['REINFORCE ist einfach, aber hochvarianz', 'Baselines sind in der Praxis Pflicht', 'Übergang zu Actor-Critic und PPO'],
        relatedTopics: [{ level: 'level1', index: 0, label: 'Mathematische Grundlagen für RL' }, { level: 'level2', index: 3, label: 'Actor-Critic-Methoden' }, { level: 'level2', index: 4, label: 'Proximal Policy Optimization (PPO)' }],
        resources: [{ title: 'Sutton & Barto — Policy Gradients', url: 'http://incompleteideas.net/book/the-book.html' }]
    },
    {
        title: 'Actor-Critic-Methoden',
        content: `<h3>Rollen</h3><p><strong>Aktor</strong> π<sub>θ</sub>(a|s); <strong>Kritiker</strong> V oder Q schätzt Returns für updates mit geringerer Varianz.</p><h3>Advantage Actor-Critic</h3><p>A(s,a) ≈ Q−V oder GAE kombiniert Mehrschritt-Returns mit Bootstrapping.</p><h3>GAE</h3><p>Generalized Advantage Estimation: λ interpoliert zwischen TD(0) und Monte Carlo.</p><h3>Geteilt vs. getrennt</h3><p>Gemeinsamer Stamm spart Rechenzeit; getrennte Köpfe reduzieren Interferenz.</p><h3>Robotik</h3><p>Standard-Familie neben und mit PPO/SAC.</p>`,
        keyPoints: ['Kritiker senkt die Varianz der Policy-Updates', 'GAE-λ tauscht Bias gegen Varianz der Advantage', 'A2C/A3C/PPO gehören hierher'],
        relatedTopics: [{ level: 'level2', index: 2, label: 'Policy-Gradient-Methoden' }, { level: 'level2', index: 4, label: 'Proximal Policy Optimization (PPO)' }, { level: 'level3', index: 2, label: 'Kontinuierliche Regelung mit SAC' }],
        resources: [{ title: 'GAE', url: 'https://arxiv.org/abs/1506.02438' }]
    },
    {
        title: 'Proximal Policy Optimization (PPO)',
        content: `<h3>Clipped Objective</h3><p>Policy-Ratio r(θ)=π/π<sub>old</sub> begrenzen, damit Updates in einer Trust-Region bleiben.</p><h3>On-policy</h3><p>Verwirft oder nutzt alte Daten nur begrenzt — Sample-Effizienz unterscheidet sich von off-policy SAC.</p><h3>Stabil</h3><p>Einfache Hyperparameter; weit verbreitet in Sim-Robotik.</p><h3>Praxis</h3><p>Mehrere Epochen auf demselben Rollout-Batch mit Clipping; KL und Clip-Range monitoren.</p>`,
        keyPoints: ['PPO ist Default-On-Policy-Deep-RL für viele Sim-Roboter', 'Clipping verhindert zerstörerisch große Policy-Schritte', 'Kein unbegrenztes Replay alter Übergänge wie bei SAC'],
        relatedTopics: [{ level: 'level2', index: 2, label: 'Policy-Gradient-Methoden' }, { level: 'level2', index: 3, label: 'Actor-Critic-Methoden' }, { level: 'level3', index: 6, label: 'Lokomotion: Policy-Design' }],
        resources: [{ title: 'PPO (Schulman et al.)', url: 'https://arxiv.org/abs/1707.06347' }]
    },
    {
        title: 'Simulationsumgebungen für Robotik',
        content: `<h3>Physik-Engines</h3><p>Mujoco, PyBullet, Isaac — Kontakt, Reibung und Zeitschritt bestimmen Realismus.</p><h3>Parallele Umgebungen</h3><p>Vektorisierte Rollouts skalieren den Durchsatz.</p><h3>Domain-Gap</h3><p>Für Transfer zählt oft <strong>Kontaktdynamik</strong>, nicht nur Render-Qualität.</p><h3>ROS / Brücken</h3><p>Sim2Real-Pipelines verbinden Policies mit Hardware.</p><h3>Validierung</h3><p>Energie, Kontakte und Sensorrauschen gegen echte Logs prüfen.</p>`,
        keyPoints: ['Genaue Kontakte schlagen hübsche Texturen für Manipulation', 'Wandzeit = Schritte / (Umgebungen × Schritte/s)', 'Sim liefert Daten und Sicherheit — der echte Roboter entscheidet'],
        relatedTopics: [{ level: 'level2', index: 6, label: 'Reward-Shaping für Robotik' }, { level: 'level3', index: 1, label: 'Sim-to-Real-Transfer' }, { level: 'level1', index: 7, label: 'Robotik: Zustands- und Aktionsräume' }],
        resources: [{ title: 'MuJoCo', url: 'https://mujoco.org/' }, { title: 'Isaac Sim', url: 'https://developer.nvidia.com/isaac-sim' }]
    },
    {
        title: 'Reward-Shaping für Robotik',
        content: `<h3>Dicht vs. spärlich</h3><p>Nur Erfolgssignal bremst Lernen; dichte Proxys führen Exploration.</p><h3>Potentialbasiertes Shaping</h3><p><strong>R′ = R + γΦ(s′) − Φ(s)</strong> erhält unter Standardannahmen die optimale Policy.</p><h3>Reward Hacking</h3><p>Agenten optimieren den Proxy — z. B. Schweben ohne Greifen; Anreize auditieren.</p><h3>Mehrterm-Belohnungen</h3><p>Tracking, Regularisierung (Energie, Ruck), weiche Constraints kombinieren.</p>`,
        keyPoints: ['Shaping ist Ingenieursarbeit; auf Schlupflöcher testen', 'Potentialbasiert ist die theoretisch saubere Standardwahl', 'Clipping kann Ordnungsrelation zerstören'],
        relatedTopics: [{ level: 'level1', index: 1, label: 'Der Markov-Entscheidungsprozess (MDP)' }, { level: 'level2', index: 5, label: 'Simulationsumgebungen für Robotik' }, { level: 'level3', index: 6, label: 'Lokomotion: Policy-Design' }],
        resources: [{ title: 'Ng, Harada, Russell — Shaping', url: 'https://people.eecs.berkeley.edu/~russell/papers/icml99-shaping.pdf' }]
    },
    {
        title: 'Imitation Learning',
        content: `<h3>Behavioral Cloning (BC)</h3><p>Überwachtes Lernen π(a|s) auf Demos — leidet unter <strong>Verteilungsverschiebung</strong> und akkumulierten Fehlern.</p><h3>DAgger</h3><p>Experte auf Zustände abfragen, die der Lerner besucht; korrigiert Kovariate-Shift.</p><h3>Inverse RL / GAIL</h3><p>Belohnung oder Diskriminator lernen, der Experten-Besetzung matcht.</p><h3>Wann nutzen</h3><p>Starker Prior bei Demos; oft kombiniert mit RL-Feintuning.</p>`,
        keyPoints: ['BC ist einfach, aber spröde außerhalb der Demo-Mannigfaltigkeit', 'DAgger schließt Train/Test-Zustandslücke explizit', 'IL + RL ist in dexterer Robotik üblich'],
        relatedTopics: [{ level: 'level2', index: 6, label: 'Reward-Shaping für Robotik' }, { level: 'level4', index: 3, label: 'Foundation Models für Robotik' }, { level: 'level3', index: 7, label: 'Dexteres Greifen und Manipulation' }],
        resources: [{ title: 'DAgger', url: 'https://arxiv.org/abs/1011.0686' }, { title: 'GAIL', url: 'https://arxiv.org/abs/1606.03476' }]
    }
]);
