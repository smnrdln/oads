i18n.registerContent('en', 'level4', [
    {
        title: 'Robot Learning and Reinforcement Learning',
        content: `
            <h3>Limits of classical control</h3>
            <p>Unmodeled dynamics, contact-rich tasks, and diverse scenes push toward <strong>data-driven</strong> policies.</p>
            <h3>Imitation</h3>
            <p><strong>Behavior cloning</strong> is simple but suffers <strong>distribution shift</strong>; DAgger queries the expert on failures.</p>
            <h3>MDP &amp; Bellman</h3>
            <p>Markov decision processes define states, actions, rewards, transitions; value iteration / policy iteration in tabular form.</p>
            <h3>Deep RL</h3>
            <p>DQN-style value methods; <strong>PPO</strong> is a stable on-policy default for continuous control.</p>
            <h3>Sim-to-real</h3>
            <p><strong>Domain randomization</strong> and adaptation reduce the reality gap.</p>
            <h3>Reward design</h3>
            <p>Shaping speeds learning but may cause <strong>reward hacking</strong>—validate behaviors, not only scalar returns.</p>`,
        keyPoints: ['Pure BC drifts off-distribution without corrective data', 'PPO is widely used for continuous robot control in research prototypes', 'Sim-to-real needs deliberate randomization or adaptation'],
        relatedTopics: [{ level: 'level3', index: 2, label: 'Robot Perception and Computer Vision' }, { level: 'level3', index: 6, label: 'Manipulation and Grasping' }, { level: 'level4', index: 2, label: 'Autonomous System Integration and Safety' }],
        resources: [{ title: 'Sutton &amp; Barto — RL book', url: 'http://incompleteideas.net/book/the-book-2nd.html' }]
    },
    {
        title: 'Multi-Robot Systems and Coordination',
        content: `
            <h3>Architectures</h3>
            <p><strong>Centralized</strong> (full knowledge, SPoF), <strong>decentralized</strong> (local plans), <strong>distributed</strong> (communicating peers).</p>
            <h3>Assignment</h3>
            <p><strong>Hungarian algorithm</strong> solves optimal <em>n</em>×<em>n</em> task assignment in <em>O</em>(<em>n</em>³).</p>
            <h3>Collision avoidance</h3>
            <p><strong>Velocity obstacles</strong>, <strong>RVO/ORCA</strong> for reciprocal avoidance; <strong>MAPF</strong> for discrete coordinated paths.</p>
            <h3>Consensus</h3>
            <p>Local averaging protocols converge on common headings/velocities if the graph stays connected.</p>
            <h3>Swarms</h3>
            <p>Simple local rules → emergent flocking; hard to guarantee specific global tasks.</p>`,
        keyPoints: ['Central planners scale poorly and fail if the hub drops', 'Hungarian solves assignment, not continuous collision avoidance', 'Warehouse fleets combine task allocation + MAPF/ORCA-style layers'],
        relatedTopics: [{ level: 'level3', index: 3, label: 'Path Planning for Mobile Robots' }, { level: 'level3', index: 0, label: 'State Estimation and Kalman Filtering' }, { level: 'level4', index: 2, label: 'Autonomous System Integration and Safety' }],
        resources: [{ title: 'Search: MAPF CBS tutorial', url: 'https://www.google.com/search?q=multi-agent+path+finding+conflict-based+search' }]
    },
    {
        title: 'Autonomous System Integration and Safety',
        content: `
            <h3>Autonomy stack</h3>
            <p>Perception → estimation → mapping → planning → control → actuation, wrapped in monitoring.</p>
            <h3>Standards touchpoints</h3>
            <p>ISO 10218 (industrial robots), ISO/TS 15066 (collaborative robots), automotive ISO 26262, IEC 61508 for programmable safety.</p>
            <h3>HARA / FMEA</h3>
            <p>Identify hazards, severities, mitigations; trace failures through subsystems.</p>
            <h3>Collaborative modes</h3>
            <p>Speed/separation monitoring, power &amp; force limiting, hand guiding—each implies different sensor and control requirements.</p>
            <h3>Watchdogs</h3>
            <p>Hardware watchdogs cut power if control stops kicking—simple, effective last lines of defense.</p>
            <h3>Safe stops</h3>
            <p>Category 0/1/2 stops differ in whether motion is uncontrolled braking vs. controlled halt.</p>`,
        keyPoints: ['Safety is architectural—not a sticker added at the end', 'PFL needs measured contact forces/torques, not guessed', 'E-stop must work when firmware crashes (hardware path)'],
        relatedTopics: [{ level: 'level1', index: 5, label: 'Embedded Computing and Robot Programming Basics' }, { level: 'level2', index: 4, label: 'Feedback Control and PID' }, { level: 'level4', index: 0, label: 'Robot Learning and Reinforcement Learning' }],
        resources: [{ title: 'ISO/TS 15066 overview (search)', url: 'https://www.google.com/search?q=ISO+TS+15066+collaborative+robots' }]
    },
    {
        title: 'Capstone — Full Autonomous Robot System Design',
        content: `
            <h3>Requirements</h3>
            <p>Functional (must-do behaviors) and non-functional (latency, safety integrity, uptime, cost).</p>
            <h3>Architecture patterns</h3>
            <p><strong>Sense–plan–act</strong>; hybrid <strong>reactive + deliberative</strong> stacks; three-layer models common in field robots.</p>
            <h3>Behavior trees</h3>
            <p>Composable <strong>Sequence</strong>, <strong>Selector</strong>, <strong>Parallel</strong> nodes with decorators—readable failure handling vs. giant FSMs.</p>
            <h3>Integration testing</h3>
            <p>Unit → integration → HIL → field pilots; regression suites before OTA or fleet rollouts.</p>
            <h3>KPIs</h3>
            <p>Define success metrics (success rate, MTBF, localization RMS) <em>before</em> building to avoid moving goalposts.</p>
            <h3>Telemetry</h3>
            <p>Log enough to reconstruct incidents; plan <strong>graceful degradation</strong> when subsystems fail.</p>`,
        keyPoints: ['Behavior trees scale team workflows better than monolithic FSMs', 'Simulation passes are necessary but not sufficient for field readiness', 'Capstone success means closing the loop on perception, estimation, planning, control, and safety together'],
        relatedTopics: [{ level: 'level1', index: 0, label: 'Anatomy of a Robot' }, { level: 'level4', index: 2, label: 'Autonomous System Integration and Safety' }],
        resources: [{ title: 'Behavior Trees in Robotics and AI (arXiv)', url: 'https://arxiv.org/abs/1709.00084' }]
    }
]);
