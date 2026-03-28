i18n.registerContent('en', 'level2', [
    {
        title: 'Function Approximation and Neural Networks in RL',
        content: `<h3>Why approximate</h3><p>Robotics state spaces are huge or continuous; tabular methods cannot store every (s,a).</p><h3>Linear FA</h3><p>Features φ(s) with weights w; TD converges to a <strong>projected</strong> Bellman fixed point, not necessarily true V*.</p><h3>Nonlinear nets</h3><p>MLPs and CNNs generalize across similar states — also introduce non-stationary targets and instability.</p><h3>Deadly triad</h3><p>Bootstrapping + off-policy + function approximation can diverge — mitigated by target networks, replay, and algorithm design.</p><h3>Robotics</h3><p>Normalize inputs; watch extrapolation outside training distribution.</p>`,
        keyPoints: ['FA trades exact tabular correctness for scalability', 'Nonlinear critics/actors need stabilization tricks', 'Feature design still matters even with deep nets'],
        relatedTopics: [{ level: 'level1', index: 7, label: 'Robot State and Action Spaces' }, { level: 'level2', index: 1, label: 'Deep Q-Network (DQN)' }, { level: 'level2', index: 2, label: 'Policy Gradient Methods' }],
        resources: [{ title: 'Sutton & Barto — FA', url: 'http://incompleteideas.net/book/the-book.html' }, { title: 'D2L — RL', url: 'https://d2l.ai/chapter_reinforcement-learning/' }]
    },
    {
        title: 'Deep Q-Network (DQN)',
        content: `<h3>Core ideas</h3><p>Neural Q(s,a); <strong>experience replay</strong> decorrelates minibatches; <strong>target network</strong> slows moving-target oscillation.</p><h3>Double DQN</h3><p>Decouple action selection and evaluation to cut overestimation.</p><h3>Dueling architecture</h3><p>Separate V(s) and advantage A(s,a) streams.</p><h3>Limits for manipulation</h3><p>Discrete action bins for high-DoF torque explode combinatorially — continuous control favors policy gradients or actor-critic.</p>`,
        keyPoints: ['Replay + target net are standard stabilizers', 'DQN is strong for discrete games; robotics often needs continuous actions', 'Overestimation bias is a known Q-learning pathology'],
        relatedTopics: [{ level: 'level1', index: 6, label: 'Q-Learning and SARSA' }, { level: 'level2', index: 0, label: 'Function Approximation and Neural Networks in RL' }, { level: 'level2', index: 4, label: 'Proximal Policy Optimization (PPO)' }],
        resources: [{ title: 'DQN (Nature)', url: 'https://www.nature.com/articles/nature14236' }]
    },
    {
        title: 'Policy Gradient Methods',
        content: `<h3>Score function</h3><p><code>∇J = E[∇log π(a|s) · G]</code> — increase probability of actions that yielded high return.</p><h3>Baseline</h3><p>Subtract b(s) (often V(s)) without biasing the gradient when b does not depend on the sampled action.</p><h3>Variance</h3><p>Returns are noisy; baselines and critic estimates help.</p><h3>Entropy bonus</h3><p>Encourages exploration; too large hurts final performance.</p><h3>Robotics</h3><p>Natural choice for continuous action spaces with Gaussian or squashed Gaussian policies.</p>`,
        keyPoints: ['REINFORCE is conceptually simple but high-variance', 'Baselines are not optional at scale', 'Connects to actor-critic and PPO'],
        relatedTopics: [{ level: 'level1', index: 0, label: 'Mathematical Foundations for RL' }, { level: 'level2', index: 3, label: 'Actor-Critic Methods' }, { level: 'level2', index: 4, label: 'Proximal Policy Optimization (PPO)' }],
        resources: [{ title: 'Sutton & Barto — policy gradients', url: 'http://incompleteideas.net/book/the-book.html' }]
    },
    {
        title: 'Actor-Critic Methods',
        content: `<h3>Split roles</h3><p><strong>Actor</strong> π<sub>θ</sub>(a|s); <strong>critic</strong> V or Q estimates returns for lower-variance updates.</p><h3>Advantage actor-critic</h3><p>Use A(s,a) ≈ Q−V or GAE to combine multi-step returns with bootstrapping.</p><h3>GAE</h3><p>Generalized advantage estimation: λ interpolates TD(0) and Monte Carlo.</p><h3>Shared vs separate nets</h3><p>Shared trunk saves compute; separate heads can reduce interference.</p><h3>Robotics</h3><p>Standard workhorse family before and alongside PPO/SAC.</p>`,
        keyPoints: ['Critic reduces variance of policy updates', 'GAE λ trades bias vs variance of advantage estimates', 'A2C/A3C/PPO are all in this family'],
        relatedTopics: [{ level: 'level2', index: 2, label: 'Policy Gradient Methods' }, { level: 'level2', index: 4, label: 'Proximal Policy Optimization (PPO)' }, { level: 'level3', index: 2, label: 'Continuous Control with SAC' }],
        resources: [{ title: 'GAE paper', url: 'https://arxiv.org/abs/1506.02438' }]
    },
    {
        title: 'Proximal Policy Optimization (PPO)',
        content: `<h3>Clipped objective</h3><p>Limit policy ratio r(θ)=π/π<sub>old</sub> so updates stay in a trust region without explicit KL quadratic penalties in the simplest form.</p><h3>On-policy</h3><p>Typically discards or lightly reuses old data — sample efficiency differs from off-policy SAC.</p><h3>Stable</h3><p>Easy hyperparameters; widely used in sim robotics (locomotion, manipulation benchmarks).</p><h3>Practical</h3><p>Multiple epochs on the same rollout batch with clipping; monitor KL and clip range.</p>`,
        keyPoints: ['PPO is the default on-policy deep RL for many sim robots', 'Clipping prevents destructively large policy steps', 'Not the same as unlimited replay of old transitions'],
        relatedTopics: [{ level: 'level2', index: 2, label: 'Policy Gradient Methods' }, { level: 'level2', index: 3, label: 'Actor-Critic Methods' }, { level: 'level3', index: 6, label: 'Locomotion Policy Design' }],
        resources: [{ title: 'PPO (Schulman et al.)', url: 'https://arxiv.org/abs/1707.06347' }]
    },
    {
        title: 'Simulation Environments for Robotics',
        content: `<h3>Physics engines</h3><p>Mujoco, PyBullet, Isaac — contact, friction, and timestep drive realism.</p><h3>Parallel envs</h3><p>Vectorized rollouts scale sample throughput on GPU clusters.</p><h3>Domain gap</h3><p>What matters for transfer is often <strong>contact dynamics</strong>, not just rendering quality.</p><h3>ROS / bridges</h3><p>Sim2real pipelines connect policies to hardware drivers.</p><h3>Validation</h3><p>Sanity-check energy, contacts, and sensor noise models against real logs.</p>`,
        keyPoints: ['Accurate contact beats pretty textures for manipulation transfer', 'Wall-clock time = steps / (envs × steps per second)', 'Sim is for data and safety — treat real robot as the final judge'],
        relatedTopics: [{ level: 'level2', index: 6, label: 'Reward Shaping for Robotics' }, { level: 'level3', index: 1, label: 'Sim-to-Real Transfer' }, { level: 'level1', index: 7, label: 'Robot State and Action Spaces' }],
        resources: [{ title: 'MuJoCo', url: 'https://mujoco.org/' }, { title: 'Isaac Gym/Sim', url: 'https://developer.nvidia.com/isaac-sim' }]
    },
    {
        title: 'Reward Shaping for Robotics',
        content: `<h3>Dense vs sparse</h3><p>Sparse success-only signals stall learning; dense proxies guide exploration.</p><h3>Potential-based shaping</h3><p><strong>R′ = R + γΦ(s′) − Φ(s)</strong> preserves optimal policy under standard assumptions (bounded potential Φ).</p><h3>Reward hacking</h3><p>Agents optimize the proxy — e.g. hover near goal without grasping — audit incentives.</p><h3>Multi-term rewards</h3><p>Combine tracking, regularization (energy, jerk), and constraints as soft penalties.</p>`,
        keyPoints: ['Shaping is engineering; test for loopholes', 'Potential-based shaping is the theory-backed default', 'Clipping or warping rewards can destroy ordering'],
        relatedTopics: [{ level: 'level1', index: 1, label: 'The Markov Decision Process (MDP)' }, { level: 'level2', index: 5, label: 'Simulation Environments for Robotics' }, { level: 'level3', index: 6, label: 'Locomotion Policy Design' }],
        resources: [{ title: 'Ng, Harada, Russell — potential shaping', url: 'https://people.eecs.berkeley.edu/~russell/papers/icml99-shaping.pdf' }]
    },
    {
        title: 'Imitation Learning',
        content: `<h3>Behavioral cloning (BC)</h3><p>Supervised learning π(a|s) on demos — suffers <strong>distribution shift</strong> and compounding error.</p><h3>DAgger</h3><p>Query expert on states the learner visits; corrects covariate shift.</p><h3>Inverse RL / GAIL</h3><p>Learn a reward or discriminator that matches expert occupancy.</p><h3>When to use</h3><p>Strong prior when demonstrations exist; often combined with RL fine-tuning.</p>`,
        keyPoints: ['BC is simple but brittle off the demo manifold', 'DAgger explicitly closes the train/test state gap', 'IL + RL is common in dexterous robotics'],
        relatedTopics: [{ level: 'level2', index: 6, label: 'Reward Shaping for Robotics' }, { level: 'level4', index: 3, label: 'Foundation Models for Robotics' }, { level: 'level3', index: 7, label: 'Dexterous Manipulation' }],
        resources: [{ title: 'DAgger', url: 'https://arxiv.org/abs/1011.0686' }, { title: 'GAIL', url: 'https://arxiv.org/abs/1606.03476' }]
    }
]);
