i18n.registerContent('en', 'level3', [
    {
        title: 'Model-Based RL',
        content: `<h3>Learned dynamics</h3><p>Fit ŝ′ = f<sub>θ</sub>(s,a) or a probabilistic model; plan or generate synthetic rollouts.</p><h3>MBPO-style</h3><p>Short imagined rollouts limit <strong>compounding model error</strong> over long horizons.</p><h3>Planning</h3><p>MPC with a model replans at each step — strong when the model is locally accurate.</p><h3>Risks</h3><p>Out-of-distribution states produce fantasy data; uncertainty estimation and ensembles help.</p><h3>Robotics</h3><p>Sample-efficient when models capture contact reasonably; hybrid model-free correction is common.</p>`,
        keyPoints: ['Model error grows with rollout length', 'Short model rollouts + policy optimization is a practical pattern', 'Do not trust unlimited OOD synthetic data'],
        relatedTopics: [{ level: 'level1', index: 3, label: 'Dynamic Programming Methods' }, { level: 'level3', index: 1, label: 'Sim-to-Real Transfer' }, { level: 'level2', index: 5, label: 'Simulation Environments for Robotics' }],
        resources: [{ title: 'MBPO', url: 'https://arxiv.org/abs/1903.00374' }]
    },
    {
        title: 'Sim-to-Real Transfer',
        content: `<h3>Domain randomization</h3><p>Randomize friction, mass, delays, sensor noise in sim so the policy robustifies to real spread.</p><h3>System ID</h3><p>Fit sim parameters to real trajectories.</p><h3>Adaptation</h3><p>Fine-tune on real with small data; residual RL corrects sim bias.</p><h3>What to randomize</h3><p>For legged robots: dynamics and latency often matter more than texture alone.</p><h3>Validation</h3><p>Ablate which randomizations actually improved hardware metrics.</p>`,
        keyPoints: ['Sim-to-real is a distribution-shift problem', 'Physics parameters beat wallpaper for locomotion', 'Measure on the robot — sim success is necessary not sufficient'],
        relatedTopics: [{ level: 'level2', index: 5, label: 'Simulation Environments for Robotics' }, { level: 'level3', index: 0, label: 'Model-Based RL' }, { level: 'level3', index: 6, label: 'Locomotion Policy Design' }],
        resources: [{ title: 'OpenAI Dactyl / sim2real discussion', url: 'https://arxiv.org/' }]
    },
    {
        title: 'Continuous Control with SAC',
        content: `<h3>Maximum entropy RL</h3><p>Optimize expected return <em>plus</em> policy entropy — encourages exploration and robustness.</p><h3>Actor-critic for continuous actions</h3><p>Twin Q-networks and <strong>min(Q₁,Q₂)</strong> in the target reduce overestimation.</p><h3>Automatic temperature</h3><p>Dual update on α to hit an entropy target.</p><h3>Off-policy</h3><p>Replay buffer reuse improves sample efficiency vs PPO in many benchmarks.</p><h3>Robotics</h3><p>Widely used for manipulation and locomotion in sim and sometimes real with care.</p>`,
        keyPoints: ['SAC is sample-efficient among default continuous-control baselines', 'Entropy is a knob — auto-α reduces hand-tuning', 'Off-policy Q extrapolation still needs conservative tricks in some settings'],
        relatedTopics: [{ level: 'level2', index: 3, label: 'Actor-Critic Methods' }, { level: 'level3', index: 3, label: 'TD3 — Twin Delayed Deep Deterministic Policy Gradient' }, { level: 'level3', index: 7, label: 'Dexterous Manipulation' }],
        resources: [{ title: 'SAC', url: 'https://arxiv.org/abs/1801.01290' }]
    },
    {
        title: 'TD3 — Twin Delayed Deep Deterministic Policy Gradient',
        content: `<h3>Deterministic actor</h3><p>μ(s) outputs continuous actions; Q(s,a) critic.</p><h3>Twin Q</h3><p>Take minimum of two Q targets to curb overestimation (like SAC’s twin).</p><h3>Delayed policy updates</h3><p>Update the actor less frequently so the critic is sharper when guiding policy gradients.</p><h3>Target policy smoothing</h3><p>Add noise to target actions in the Q backup — smooths the value landscape.</p><h3>Use</h3><p>Strong baseline for many continuous control tasks when entropy is not required.</p>`,
        keyPoints: ['TD3 specifically attacks overestimation in deterministic actor-critic', 'Policy delay + target smoothing are simple stabilizers', 'Compare to SAC when exploration entropy matters'],
        relatedTopics: [{ level: 'level3', index: 2, label: 'Continuous Control with SAC' }, { level: 'level2', index: 2, label: 'Policy Gradient Methods' }],
        resources: [{ title: 'TD3', url: 'https://arxiv.org/abs/1802.09477' }]
    },
    {
        title: 'Hindsight Experience Replay (HER)',
        content: `<h3>Sparse goals</h3><p>In multi-goal settings failures are common — little reward signal.</p><h3>Relabeling</h3><p>Store transitions and also pretend the <strong>achieved final state</strong> was the goal, turning failures into successes for replay.</p><h3>Off-policy</h3><p>Works with DDPG/SAC-style replay — not a drop-in for pure on-policy PPO.</p><h3>Limits</h3><p>Generalization to goals far outside the achieved-goal hull still needs curricula or exploration.</p>`,
        keyPoints: ['HER manufactures learning signal from failed episodes', 'Requires a goal-conditioned formulation', 'Pairs naturally with off-policy continuous RL'],
        relatedTopics: [{ level: 'level4', index: 1, label: 'Goal-Conditioned and Multi-Goal RL' }, { level: 'level3', index: 2, label: 'Continuous Control with SAC' }, { level: 'level2', index: 6, label: 'Reward Shaping for Robotics' }],
        resources: [{ title: 'HER', url: 'https://arxiv.org/abs/1707.01495' }]
    },
    {
        title: 'Safe RL and Constrained MDPs',
        content: `<h3>CMDPs</h3><p>Maximize return subject to expected cost constraints (collisions, joint limits, human proximity).</p><h3>Lagrangian methods</h3><p>Augmented reward with λ·cost; update λ to enforce budgets — soft, not hard guarantees every step.</p><h3>Shielding / CBF</h3><p>Run-time filters or control barrier functions <strong>project</strong> unsafe actions — orthogonal to the RL objective.</p><h3>Conservative learning</h3><p>Penalize risk during training; validate with formal or statistical safety tests where possible.</p>`,
        keyPoints: ['Reward penalties alone rarely give hard safety', 'Separate safety layers are standard in deployed robotics', 'Lagrangian RL trades cost vs return via λ'],
        relatedTopics: [{ level: 'level4', index: 4, label: 'Capstone Project — End-to-End Robotic Policy' }, { level: 'level3', index: 6, label: 'Locomotion Policy Design' }],
        resources: [{ title: 'Constrained policy optimization', url: 'https://arxiv.org/abs/1705.10528' }]
    },
    {
        title: 'Locomotion Policy Design',
        content: `<h3>Observations</h3><p>Proprioception, base IMU, sometimes height scans or depth — balance sensing cost vs. generalization.</p><h3>Rewards</h3><p>Velocity tracking, orientation/height regularization, torque penalties, foot clearance — tune against falling and energy.</p><h3>Terrain curriculum</h3><p>Train on increasing difficulty to avoid flat-ground overfitting.</p><h3>Sim-to-real</h3><p>Randomize dynamics and delays; test on slopes, steps, and payload changes.</p>`,
        keyPoints: ['Locomotion is a sim-to-real poster child', 'Reward terms compete — ablate', 'Terrain diversity beats a single nominal plane'],
        relatedTopics: [{ level: 'level2', index: 4, label: 'Proximal Policy Optimization (PPO)' }, { level: 'level3', index: 1, label: 'Sim-to-Real Transfer' }, { level: 'level3', index: 5, label: 'Safe RL and Constrained MDPs' }],
        resources: [{ title: 'ANYmal / legged RL references', url: 'https://arxiv.org/' }]
    },
    {
        title: 'Dexterous Manipulation',
        content: `<h3>Contact-rich control</h3><p>Grasping, sliding, and reorientation need accurate contact models or heavy randomization.</p><h3>Observation</h3><p>Tactile, vision pose (fiducials, learned pose nets), proprioception — partial observability favors memory (LSTM/GRU).</p><h3>Action space</h3><p>End-effector vs joint torque; impedance-style targets can ease real hardware.</p><h3>Data</h3><p>IL warm-start + RL fine-tune is common for high DoF hands.</p>`,
        keyPoints: ['Manipulation stress-tests sim contact', 'Pose estimation and tactile reduce ambiguity', 'Memory helps under occlusion and noise'],
        relatedTopics: [{ level: 'level2', index: 7, label: 'Imitation Learning' }, { level: 'level3', index: 1, label: 'Sim-to-Real Transfer' }, { level: 'level3', index: 4, label: 'Hindsight Experience Replay (HER)' }],
        resources: [{ title: 'Learning dexterous in-hand manipulation', url: 'https://arxiv.org/' }]
    }
]);
