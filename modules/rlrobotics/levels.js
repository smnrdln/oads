const roadmapData = {
    levels: [
        {
            id: 'level1',
            name: 'level.level1.name',
            topics: [
                { name: 'Mathematical Foundations for RL', category: 'essential', completed: false },
                { name: 'The Markov Decision Process (MDP)', category: 'essential', completed: false },
                { name: 'Value Functions and the Bellman Equation', category: 'essential', completed: false },
                { name: 'Dynamic Programming Methods', category: 'essential', completed: false },
                { name: 'Monte Carlo Methods', category: 'essential', completed: false },
                { name: 'Temporal Difference Learning', category: 'essential', completed: false },
                { name: 'Q-Learning and SARSA', category: 'embedded', completed: false },
                { name: 'Robot State and Action Spaces', category: 'embedded', completed: false }
            ]
        },
        {
            id: 'level2',
            name: 'level.level2.name',
            topics: [
                { name: 'Function Approximation and Neural Networks in RL', category: 'embedded', completed: false },
                { name: 'Deep Q-Network (DQN)', category: 'embedded', completed: false },
                { name: 'Policy Gradient Methods', category: 'embedded', completed: false },
                { name: 'Actor-Critic Methods', category: 'embedded', completed: false },
                { name: 'Proximal Policy Optimization (PPO)', category: 'embedded', completed: false },
                { name: 'Simulation Environments for Robotics', category: 'robotics', completed: false },
                { name: 'Reward Shaping for Robotics', category: 'robotics', completed: false },
                { name: 'Imitation Learning', category: 'robotics', completed: false }
            ]
        },
        {
            id: 'level3',
            name: 'level.level3.name',
            topics: [
                { name: 'Model-Based RL', category: 'robotics', completed: false },
                { name: 'Sim-to-Real Transfer', category: 'robotics', completed: false },
                { name: 'Continuous Control with SAC', category: 'robotics', completed: false },
                { name: 'TD3 — Twin Delayed Deep Deterministic Policy Gradient', category: 'embedded', completed: false },
                { name: 'Hindsight Experience Replay (HER)', category: 'embedded', completed: false },
                { name: 'Safe RL and Constrained MDPs', category: 'essential', completed: false },
                { name: 'Locomotion Policy Design', category: 'robotics', completed: false },
                { name: 'Dexterous Manipulation', category: 'robotics', completed: false }
            ]
        },
        {
            id: 'level4',
            name: 'level.level4.name',
            topics: [
                { name: 'Offline RL', category: 'robotics', completed: false },
                { name: 'Goal-Conditioned and Multi-Goal RL', category: 'robotics', completed: false },
                { name: 'Multi-Task and Meta-Learning for Robotics', category: 'robotics', completed: false },
                { name: 'Foundation Models for Robotics', category: 'robotics', completed: false },
                { name: 'Capstone Project — End-to-End Robotic Policy', category: 'essential', completed: false }
            ]
        }
    ]
};
