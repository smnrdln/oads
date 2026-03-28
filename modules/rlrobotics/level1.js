i18n.registerContent('en', 'level1', [
    {
        title: 'Mathematical Foundations for RL',
        content: `<h3>Linear algebra &amp; probability</h3><p>Vectors and matrices represent states, actions, and weights. Expectations <strong>E[X]</strong> and conditional probability underpin returns and policies.</p><h3>Calculus</h3><p>Partial derivatives and the chain rule drive gradient-based updates. The gradient points in the direction of <strong>steepest ascent</strong>.</p><h3>Log-derivative trick</h3><p><code>∇<sub>θ</sub> E[R] = E[R · ∇<sub>θ</sub> log π<sub>θ</sub>(a|s)]</code> — the REINFORCE identity — turns sampling through π into an unbiased gradient estimator.</p><h3>Pitfalls</h3><p>Confusing one trajectory’s return with the true expectation; ignoring policy stochasticity when differentiating.</p>`,
        keyPoints: ['RL optimizes expectations, not single rollouts', 'The log form is required for correct policy-gradient Monte Carlo', 'These tools are prerequisites for reading algorithm papers'],
        relatedTopics: [{ level: 'level1', index: 1, label: 'The Markov Decision Process (MDP)' }, { level: 'level1', index: 2, label: 'Value Functions and the Bellman Equation' }, { level: 'level2', index: 2, label: 'Policy Gradient Methods' }],
        resources: [{ title: 'Mathematics for Machine Learning', url: 'https://mml-book.github.io/' }, { title: 'Sutton & Barto (free)', url: 'http://incompleteideas.net/book/the-book.html' }]
    },
    {
        title: 'The Markov Decision Process (MDP)',
        content: `<h3>Definition</h3><p>Tuple <strong>(S, A, P, R, γ)</strong>: states, actions, transition dynamics, reward, discount.</p><h3>Markov property</h3><p>Future depends only on the current state — often <em>approximate</em> on real robots (latency, noise → POMDP).</p><h3>Discount γ</h3><p>Geometric weighting of future reward; high γ cares about long horizons but can increase return variance.</p><h3>Robotics</h3><p><strong>P(s′|s,a)</strong> encodes physics and is usually unknown; <strong>sparse</strong> success rewards are realistic but hard to learn from.</p>`,
        keyPoints: ['Cast every control problem as MDP or POMDP before choosing an algorithm', 'γ trades myopia vs. long-term credit assignment', 'Reward design is core engineering work'],
        relatedTopics: [{ level: 'level1', index: 0, label: 'Mathematical Foundations for RL' }, { level: 'level1', index: 2, label: 'Value Functions and the Bellman Equation' }, { level: 'level2', index: 6, label: 'Reward Shaping for Robotics' }],
        resources: [{ title: 'Sutton & Barto Ch. 3–4', url: 'http://incompleteideas.net/book/the-book.html' }, { title: 'David Silver — MDPs', url: 'https://www.davidsilver.uk/teaching/' }]
    },
    {
        title: 'Value Functions and the Bellman Equation',
        content: `<h3>V and Q</h3><p><strong>V<sup>π</sup>(s)</strong> is expected return from s under π; <strong>Q<sup>π</sup>(s,a)</strong> conditions on the first action.</p><h3>Bellman expectation</h3><p>Recursive decomposition: value at s equals immediate reward plus discounted expected successor value.</p><h3>Bellman optimality</h3><p><strong>V*</strong> and <strong>Q*</strong> use <code>max<sub>a</sub></code> over actions — the backbone of dynamic programming and many deep RL targets.</p><h3>Advantage</h3><p><strong>A(s,a) = Q(s,a) − V(s)</strong> centers learning signals and reduces variance in policy gradients.</p><h3>Pitfall</h3><p>Mixing on-policy V<sup>π</sup> with optimal V*.</p>`,
        keyPoints: ['Bellman equations encode sequential structure', 'Advantage separates how good an action is vs. the average action', 'Optimality backups drive Q-learning and fitted-Q ideas'],
        relatedTopics: [{ level: 'level1', index: 1, label: 'The Markov Decision Process (MDP)' }, { level: 'level1', index: 3, label: 'Dynamic Programming Methods' }, { level: 'level2', index: 3, label: 'Actor-Critic Methods' }],
        resources: [{ title: 'Sutton & Barto — value functions', url: 'http://incompleteideas.net/book/the-book.html' }]
    },
    {
        title: 'Dynamic Programming Methods',
        content: `<h3>When it applies</h3><p>Known model and manageable state space — rare on full robots but essential theory.</p><h3>Policy evaluation</h3><p>Iterative Bellman backups until V<sup>π</sup> converges.</p><h3>Policy iteration</h3><p>Alternate evaluation and greedy improvement; monotonic improvement in finite MDPs.</p><h3>Value iteration</h3><p>Fuse backup and max in one sweep — converges to V*.</p><h3>Curse of dimensionality</h3><p>Tabular DP does not scale to high-dimensional continuous robotics state spaces.</p>`,
        keyPoints: ['DP assumes a model; robotics usually learns or simulates instead', 'Policy iteration vs. value iteration trade inner-loop cost vs. simplicity', 'Explains why model-free and function approximation dominate on hardware'],
        relatedTopics: [{ level: 'level1', index: 2, label: 'Value Functions and the Bellman Equation' }, { level: 'level1', index: 5, label: 'Temporal Difference Learning' }, { level: 'level3', index: 0, label: 'Model-Based RL' }],
        resources: [{ title: 'Sutton & Barto — DP', url: 'http://incompleteideas.net/book/the-book.html' }]
    },
    {
        title: 'Monte Carlo Methods',
        content: `<h3>Idea</h3><p>Estimate values from <strong>full-episode returns</strong> — unbiased but high variance and needs clear episode boundaries.</p><h3>Every-visit vs first-visit</h3><p>Averaging returns that pass through a state.</p><h3>On-policy MC</h3><p>Follow π while estimating V<sup>π</sup> or Q<sup>π</sup>.</p><h3>Off-policy &amp; IS</h3><p>Importance sampling corrects for behavior vs. target policy — ratios can explode in variance.</p><h3>Robotics</h3><p>Long horizons and continuing tasks make pure MC awkward; TD methods bootstrap instead.</p>`,
        keyPoints: ['MC waits until the end of the episode', 'IS off-policy MC is not automatically more sample-efficient', 'Episode structure matters for credit assignment'],
        relatedTopics: [{ level: 'level1', index: 3, label: 'Dynamic Programming Methods' }, { level: 'level1', index: 5, label: 'Temporal Difference Learning' }, { level: 'level2', index: 2, label: 'Policy Gradient Methods' }],
        resources: [{ title: 'Sutton & Barto — MC methods', url: 'http://incompleteideas.net/book/the-book.html' }]
    },
    {
        title: 'Temporal Difference Learning',
        content: `<h3>Bootstrapping</h3><p>TD updates use <strong>one-step</strong> targets mixing real reward with estimated successor value — lower variance than MC, some bias.</p><h3>TD(0)</h3><p><code>V ← V + α [r + γV(s′) − V(s)]</code>.</p><h3>TD(λ)</h3><p>λ=0 is one-step TD; λ=1 aligns (forward view) with full Monte Carlo.</p><h3>n-step returns</h3><p>Bridge bias and variance.</p><h3>Robotics</h3><p>Online TD-style targets appear inside actor-critic and many deep RL critics.</p>`,
        keyPoints: ['TD learns before episode end — critical for long tasks', 'Bootstrapping introduces bias when value estimates are wrong', 'λ and n-step tune the bias–variance trade-off'],
        relatedTopics: [{ level: 'level1', index: 4, label: 'Monte Carlo Methods' }, { level: 'level1', index: 6, label: 'Q-Learning and SARSA' }, { level: 'level2', index: 3, label: 'Actor-Critic Methods' }],
        resources: [{ title: 'Sutton & Barto — TD learning', url: 'http://incompleteideas.net/book/the-book.html' }]
    },
    {
        title: 'Q-Learning and SARSA',
        content: `<h3>Tabular control</h3><p>Maintain Q(s,a) and act ε-greedy (or softmax) while updating from transitions.</p><h3>SARSA (on-policy)</h3><p>Backup uses the <strong>actual</strong> next action a′ from the behavior policy.</p><h3>Q-learning (off-policy)</h3><p>Backup uses <code>max<sub>a′</sub> Q(s′,a′)</code> — learns Q* while exploring with another policy (under standard conditions).</p><h3>Exploration</h3><p>Must visit state–action pairs sufficiently; otherwise Q* estimates stay wrong.</p><h3>Limits</h3><p>Tabular form does not scale; continuous actions need function approximation and different algorithms (e.g. policy gradients, SAC).</p>`,
        keyPoints: ['SARSA respects the exploration policy; Q-learning targets the greedy optimum', 'Off-policy Q-learning converges tabularly with broad exploration', 'Foundation for DQN-style deep Q-learning'],
        relatedTopics: [{ level: 'level1', index: 5, label: 'Temporal Difference Learning' }, { level: 'level2', index: 1, label: 'Deep Q-Network (DQN)' }, { level: 'level1', index: 7, label: 'Robot State and Action Spaces' }],
        resources: [{ title: 'Sutton & Barto — control', url: 'http://incompleteideas.net/book/the-book.html' }]
    },
    {
        title: 'Robot State and Action Spaces',
        content: `<h3>State design</h3><p>Proprioception (joints, velocities, torques), end-effector pose, object-relative features, and <strong>compact</strong> task descriptors often learn faster than raw high-res RGB alone.</p><h3>Partial observability</h3><p>Stack frames, append recent actions, or use RNN/Transformer memory when the Markov property fails.</p><h3>Actions</h3><p>Position, velocity, or torque commands; discrete vs continuous; safety and controllability trade-offs.</p><h3>Normalization</h3><p>Scale observations and actions to stable ranges for neural nets.</p><h3>Pitfalls</h3><p>Redundant or unobservable state; sim–real mismatch in what the policy actually sees.</p>`,
        keyPoints: ['Low-dimensional structured state often beats bloated pixels for sample efficiency', 'History in the observation approximates a Markov state', 'Action choice affects learnability and safety filters downstream'],
        relatedTopics: [{ level: 'level1', index: 1, label: 'The Markov Decision Process (MDP)' }, { level: 'level2', index: 0, label: 'Function Approximation and Neural Networks in RL' }, { level: 'level2', index: 5, label: 'Simulation Environments for Robotics' }],
        resources: [{ title: 'OpenAI Gym / Gymnasium', url: 'https://gymnasium.farama.org/' }]
    }
]);
