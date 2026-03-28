i18n.registerContent('en', 'level4', [
    {
        title: 'Offline RL',
        content: `<h3>Setting</h3><p>Learn a policy from a <strong>fixed dataset</strong> of (s,a,r,s′) — no online exploration.</p><h3>Challenge</h3><p>Q-methods extrapolate optimistically on actions not well covered by data — <strong>overestimation</strong> breaks the learned policy.</p><h3>Conservative methods</h3><p>CQL and similar penalize high Q on out-of-distribution actions; behavior cloning regularizers anchor to the data.</p><h3>Use cases</h3><p>Hospital robots, factory logs, expensive hardware — leverage existing trajectories safely.</p><h3>Reality</h3><p>Unlimited offline data does not guarantee online-optimal performance if coverage is poor.</p>`,
        keyPoints: ['Offline RL ≠ batch imitation — it still optimizes return', 'Extrapolation error is the central technical enemy', 'Match algorithm to logging policy coverage'],
        relatedTopics: [{ level: 'level2', index: 7, label: 'Imitation Learning' }, { level: 'level3', index: 2, label: 'Continuous Control with SAC' }, { level: 'level4', index: 4, label: 'Capstone Project — End-to-End Robotic Policy' }],
        resources: [{ title: 'CQL', url: 'https://arxiv.org/abs/2006.04779' }, { title: 'Offline RL tutorial', url: 'https://arxiv.org/' }]
    },
    {
        title: 'Goal-Conditioned and Multi-Goal RL',
        content: `<h3>UVFA</h3><p>Universal value function approximators: V(s,g) or Q(s,a,g) for many goals in one network.</p><h3>Curricula</h3><p>Easy goals first — gradients appear where the agent can already make progress.</p><h3>HER synergy</h3><p>Relabeling builds a dense signal around achieved states.</p><h3>Generalization</h3><p>Goals far from the training hull still need exploration or hierarchical methods.</p>`,
        keyPoints: ['One network can represent a family of tasks', 'Curriculum shapes the training distribution', 'HER does not magically cover all workspace goals'],
        relatedTopics: [{ level: 'level3', index: 4, label: 'Hindsight Experience Replay (HER)' }, { level: 'level4', index: 2, label: 'Multi-Task and Meta-Learning for Robotics' }],
        resources: [{ title: 'UVFA', url: 'https://arxiv.org/abs/1511.06342' }]
    },
    {
        title: 'Multi-Task and Meta-Learning for Robotics',
        content: `<h3>Multi-task</h3><p>Shared representations across skills; watch negative transfer when tasks conflict.</p><h3>MAML</h3><p>Meta-train so a few gradient steps on a new task adapt quickly.</p><h3>Robotics</h3><p>Fast adaptation matters when objects, tools, or environments change.</p><h3>Data</h3><p>Need diverse task families — sim suites and scripted resets help scale.</p>`,
        keyPoints: ['Multi-task needs careful balancing and sampling', 'Meta-learning optimizes for adaptation not zero-shot', 'Sim diversity feeds meta-training'],
        relatedTopics: [{ level: 'level4', index: 1, label: 'Goal-Conditioned and Multi-Goal RL' }, { level: 'level4', index: 3, label: 'Foundation Models for Robotics' }],
        resources: [{ title: 'MAML', url: 'https://arxiv.org/abs/1703.03400' }]
    },
    {
        title: 'Foundation Models for Robotics',
        content: `<h3>Large models</h3><p>Vision-language models, trajectory transformers, and policy priors trained on broad internet or cross-robot data.</h3><h3>Language conditioning</h3><p>Natural-language goals interface humans to policies.</p><h3>Limits</h3><p>Sim2real, safety, and embodiment gap — web-scale semantics ≠ millisecond torque control without finetuning.</p><h3>Practice</h3><p>Often freeze a perception backbone and RL-finetune the last layers on robot data.</p>`,
        keyPoints: ['Foundation models supply priors, not plug-and-play controllers', 'Finetuning on real logs is usually required', 'Safety and OOD behavior need explicit testing'],
        relatedTopics: [{ level: 'level2', index: 7, label: 'Imitation Learning' }, { level: 'level4', index: 2, label: 'Multi-Task and Meta-Learning for Robotics' }, { level: 'level4', index: 4, label: 'Capstone Project — End-to-End Robotic Policy' }],
        resources: [{ title: 'RT-2 / robotics VLMs (survey papers)', url: 'https://arxiv.org/' }]
    },
    {
        title: 'Capstone Project — End-to-End Robotic Policy',
        content: `<h3>Problem spec</h3><p>Define MDP: observation stack, action space, episode termination, success metric.</p><h3>Pipeline</h3><p>Sim training → domain randomization → (optional) IL bootstrap → real fine-tune with safety layer.</p><h3>Ablations</h3><p>Remove one randomization or reward term at a time; plot sim vs real curves.</p><h3>Deliverables</h3><p>Reproducible configs, seeds, and a short failure analysis (contact, latency, perception).</p><h3>Mindset</h3><p>Integrate MDP framing, algorithm choice, sim-to-real, and safety — the course in one system.</p>`,
        keyPoints: ['End-to-end means tracing obs → policy → hardware with metrics', 'Ablations justify engineering choices', 'Safety constraints belong in the system architecture, not only the reward'],
        relatedTopics: [{ level: 'level3', index: 1, label: 'Sim-to-Real Transfer' }, { level: 'level3', index: 5, label: 'Safe RL and Constrained MDPs' }, { level: 'level4', index: 0, label: 'Offline RL' }],
        resources: [{ title: 'Sutton & Barto — full book', url: 'http://incompleteideas.net/book/the-book.html' }]
    }
]);
