# Temporary generator — run: python3 _gen_content.py && rm _gen_content.py
import json
from pathlib import Path
ROOT = Path(__file__).resolve().parent

def emit_quizzes(path, lang, rows):
    lines = [f"i18n.registerContent('{lang}', 'quizzes', ["]
    for q in rows:
        parts = []
        for k, v in q.items():
            if k == "options":
                parts.append("options: " + json.dumps(v, ensure_ascii=False))
            elif k in ("question", "explanation", "type", "unit"):
                parts.append(f"{k}: {json.dumps(v, ensure_ascii=False)}")
            elif isinstance(v, bool):
                parts.append(f"{k}: {'true' if v else 'false'}")
            elif isinstance(v, str):
                parts.append(f"{k}: {json.dumps(v, ensure_ascii=False)}")
            else:
                parts.append(f"{k}: {v}")
        lines.append("    { " + ", ".join(parts) + " },")
    lines.append("]);")
    path.write_text("\n".join(lines), encoding="utf-8")

def emit_scenarios(path, lang, scenarios):
    lines = [f"i18n.registerContent('{lang}', 'scenarios', ["]
    for s in scenarios:
        ch = ", ".join(
            "{{ text: {}, correct: {}, xp: {} }}".format(json.dumps(c["t"], ensure_ascii=False), "true" if c["ok"] else "false", 15 if c["ok"] else 0)
            for c in s["choices"]
        )
        lines.append(
            "    {{ level: '{}', topicIndex: {}, title: {}, description: {}, choices: [{}], explanation: {} }},".format(
                s["level"], s["ti"], json.dumps(s["title"], ensure_ascii=False), json.dumps(s["desc"], ensure_ascii=False), ch, json.dumps(s["exp"], ensure_ascii=False)
            )
        )
    lines.append("]);")
    path.write_text("\n".join(lines), encoding="utf-8")

def Q(level, ti, **kw):
    kw.setdefault("xp", 10 if kw.get("type") != "calculation" else 15)
    return dict(level=level, topicIndex=ti, **kw)

# English quizzes (29 topics × 3)
en = []
# 1
en.append(Q("level1", 0, question="Policy gradient log-derivative trick: which identity is correct?", options=[
    "∇E[R] = E[R · ∇π]", "∇E[R] = E[R · ∇ log π]", "∇E[R] = ∇R · π", "∇E[R] = E[∇R]"
], correct=1, explanation="REINFORCE uses log π for unbiased MC gradient.", xp=10))
en.append(Q("level1", 0, type="truefalse", question="The gradient always points away from a local minimum (steepest ascent).", answer=True, explanation="Ascent direction is +gradient.", xp=10))
en.append(Q("level1", 0, type="calculation", question="Gaussian N(μ=1.2, σ=0.4): density f(1.2) = 1/(σ√(2π))?", answer=0.997, unit="", tolerance=0.02, explanation="At mean, f = 1/(σ√2π) ≈ 0.997.", xp=15))
# 2
en.append(Q("level1", 1, question="In real robot RL, which MDP component is usually unknown?", options=[
    "State space S", "Action space A", "Transition dynamics P(s'|s,a)", "Discount γ"
], correct=2, explanation="Physics encoded in P is unknown or simulated.", xp=10))
en.append(Q("level1", 1, type="truefalse", question="Higher γ (e.g. 0.99 vs 0.9) always speeds up learning.", answer=False, explanation="Longer horizon raises return variance.", xp=10))
en.append(Q("level1", 1, type="calculation", question="γ=0.9, rewards 1 each for 5 steps then terminate. G₀?", answer=4.095, unit="", tolerance=0.02, explanation="Geometric sum ≈ 4.095.", xp=15))
# 3
en.append(Q("level1", 2, question="Bellman optimality for Q*(s,a) (finite MDP):", options=[
    "Q* = R + γ Σ P max Q*(s',a) in wrong form",
    "Q* = R + γ max Q* only",
    "Q* = Σ P [R + γ max_a' Q*(s',a')]",
    "Q* = R - γV*"
], correct=2, explanation="Expectation over next state, max over actions.", xp=10))
en.append(Q("level1", 2, type="truefalse", question="V^π depends on the policy π.", answer=True, explanation="Value is defined under π.", xp=10))
en.append(Q("level1", 2, type="calculation", question="Q(s,a1)=5, Q(s,a2)=3, π picks each with 0.5. V^π(s)?", answer=4.0, unit="", tolerance=0.01, explanation="0.5·5+0.5·3 = 4.", xp=15))
# 4
en.append(Q("level1", 3, question="Policy iteration converges because:", options=[
    "Each step minimizes MSBE",
    "Finite policy space; each improvement step improves or ties policy value",
    "Policy space is a smooth manifold for gradient descent",
    "Rewards bounded and γ<1"
], correct=1, explanation="Monotonic improvement in finite MDPs.", xp=10))
en.append(Q("level1", 3, type="truefalse", question="Value iteration fully evaluates V^π to convergence before each improvement.", answer=False, explanation="VI fuses backup and max in one sweep.", xp=10))
en.append(Q("level1", 3, type="calculation", question="One state, one action, R=2, γ=0.8, self-loop P=1, V₀=0. V₁ after one VI backup?", answer=2.0, unit="", tolerance=0.01, explanation="2 + 0.8·0 = 2.", xp=15))
# 5
en.append(Q("level1", 4, question="When is Monte Carlo RL especially impractical?", options=[
    "Dense rewards", "Discrete state space", "No natural episode boundaries (continuing task)", "Stochastic policy"
], correct=2, explanation="MC needs episode returns.", xp=10))
en.append(Q("level1", 4, type="truefalse", question="Off-policy MC with importance sampling is always more sample-efficient than on-policy MC.", answer=False, explanation="IS ratios can explode in variance.", xp=10))
en.append(Q("level1", 4, type="calculation", question="Every-visit MC: G₀ visits 10,8,12 for state s. V̂(s)?", answer=10.0, unit="", tolerance=0.01, explanation="Mean = 10.", xp=15))
# 6
en.append(Q("level1", 5, question="TD(0) update V ← V + α[r+γV(s')-V(s)] is:", options=[
    "Full Monte Carlo return", "MLE model fit", "One-step bootstrapped backup", "IS gradient step"
], correct=2, explanation="Bootstraps with current V estimate.", xp=10))
en.append(Q("level1", 5, type="truefalse", question="TD(λ) with λ=1 matches full Monte Carlo (forward view).", answer=True, explanation="λ=1 credits full returns.", xp=10))
en.append(Q("level1", 5, type="calculation", question="V(s)=3, r=1, V(s')=4, γ=0.9, α=0.1. New V(s)?", answer=3.16, unit="", tolerance=0.01, explanation="δ=1.6; V+=0.16.", xp=15))
# 7
en.append(Q("level1", 6, question="Q-learning vs SARSA bootstrap target differs because:", options=[
    "Only Q-learning uses neural nets", "Q-learning is on-policy", "Q-learning uses max_a' Q(s',a'); SARSA uses actual next action", "Q-learning needs a model"
], correct=2, explanation="Off-policy vs on-policy backup.", xp=10))
en.append(Q("level1", 6, type="truefalse", question="Tabular Q-learning converges to Q* under exploration even if behavior is random (conditions met).", answer=True, explanation="Watkins conditions.", xp=10))
en.append(Q("level1", 6, type="calculation", question="Q-learning: Q=2, r=0, max Q(s')=5, γ=0.95, α=0.1. New Q?", answer=2.275, unit="", tolerance=0.01, explanation="Target 4.75.", xp=15))
# 8
en.append(Q("level1", 7, question="Most sample-efficient state for reaching with a robot arm?", options=[
    "Raw 256×256×3 RGB", "Depth only", "Joint angles, velocities, target pose (compact)", "Full LiDAR cloud"
], correct=2, explanation="Low-D proprio + task state learns fast.", xp=10))
en.append(Q("level1", 7, type="truefalse", question="Torque actions are always better than position actions for robot RL.", answer=False, explanation="Position is often easier to learn.", xp=10))
en.append(Q("level1", 7, question="Without an RNN, partial observability is often handled by:", options=[
    "Doubling the discount only", "Removing exteroceptive sensors", "Frame stacking and/or appending recent actions", "Using tabular Q only"
], correct=2, explanation="History in the observation vector.", xp=10))

# level2 topics 0-7 = curriculum 9-16
en.append(Q("level2", 0, question="Why use a target network in neural Q-learning?", options=[
    "Stores replay buffer", "Prevents unsafe states", "Stabilizes regression target vs moving Q", "Doubles learning rate"
], correct=2, explanation="Reduces oscillations from chasing a moving target.", xp=10))
en.append(Q("level2", 0, type="truefalse", question="Linear FA + TD(0) converges to the true optimal V*.", answer=False, explanation="Converges to projected Bellman fixed point.", xp=10))
en.append(Q("level2", 0, type="calculation", question="V̂=3.5, TD target 5.0, loss MSE = ½(5-3.5)²?", answer=1.125, unit="", tolerance=0.01, explanation="1.5²/2.", xp=15))

en.append(Q("level2", 1, question="DQN experience replay mainly:", options=[
    "Replay same transition once", "Learn from demos only", "Break temporal correlation in minibatches", "Compress states"
], correct=2, explanation="IID-ish samples stabilize SGD.", xp=10))
en.append(Q("level2", 1, type="truefalse", question="DQN on 7-DOF torque by 100 bins/joint is practical.", answer=False, explanation="Action space explodes.", xp=10))
en.append(Q("level2", 1, type="calculation", question="Dueling: V=4, A=[1.5,-0.5,0.2], mean A=0.4. Q(s,a1)?", answer=5.1, unit="", tolerance=0.01, explanation="V + A - meanA.", xp=15))

en.append(Q("level2", 2, question="Baseline b(s) in policy gradient does not bias because:", options=[
    "b equals V always", "b subtracted after grad", "E[∇log π · b]=0 if b independent of a", "PG always unbiased anyway"
], correct=2, explanation="Score function trick.", xp=10))
en.append(Q("level2", 2, type="truefalse", question="Very large entropy coefficient always improves final policy quality.", answer=False, explanation="Over-randomizes policy.", xp=10))
en.append(Q("level2", 2, type="calculation", question="REINFORCE: G=10, b=6, ∇logπ=0.3, α=0.01. Δθ?", answer=0.012, unit="", tolerance=0.001, explanation="0.01*4*0.3.", xp=15))

en.append(Q("level2", 3, question="GAE with λ=0 reduces advantage to:", options=[
    "Full MC return", "REINFORCE only", "One-step TD error δ_t", "Q minus mean reward"
], correct=2, explanation="λ=0 drops multi-step sum.", xp=10))
en.append(Q("level2", 3, type="truefalse", question="Actor and critic must always share weights.", answer=False, explanation="Separate nets are common.", xp=10))
en.append(Q("level2", 3, type="calculation", question="GAE: γ=0.99, λ=0.95, δ0=1, δ1=0.5. Â0?", answer=1.47025, unit="", tolerance=0.01, explanation="δ0 + γλ δ1.", xp=15))

en.append(Q("level2", 4, question="PPO ratio r_t(θ)=π/π_old equals 1 when:", options=[
    "Advantage is 0", "Action differs", "Same state-action probability under old and new", "LR minimum"
], correct=2, explanation="Identical probabilities.", xp=10))
en.append(Q("level2", 4, type="truefalse", question="PPO can reuse transitions from many past iterations like SAC.", answer=False, explanation="PPO is on-policy.", xp=10))
en.append(Q("level2", 4, type="calculation", question="PPO clip: r=1.3, A=2, ε=0.2. min(rA, clip(r,0.8,1.2)A)?", answer=2.4, unit="", tolerance=0.01, explanation="Clipped term wins min.", xp=15))

en.append(Q("level2", 5, question="Most critical sim property for manipulator transfer?", options=[
    "High render resolution", "Max parallel envs", "Accurate contact/friction", "Fastest reset"
], correct=2, explanation="Contact dominates sim-to-real.", xp=10))
en.append(Q("level2", 5, type="truefalse", question="Perfect simulator guarantees identical real-robot performance.", answer=False, explanation="Unmodeled effects remain.", xp=10))
en.append(Q("level2", 5, type="calculation", question="1 env 100 steps/s, need 10M steps. Wall hours (single instance)?", answer=27.78, unit=" h", tolerance=0.5, explanation="1e7/100/3600.", xp=15))

en.append(Q("level2", 6, question="Which shaping preserves optimal policy (bounded potential Φ)?", options=[
    "Constant bonus near goal", "Positive scale of R", "R̂ = R + γΦ(s') - Φ(s)", "Subtract velocity from R"
], correct=2, explanation="Ng–Harada–Russell potential-based.", xp=10))
en.append(Q("level2", 6, type="truefalse", question="Clipping rewards to [-1,1] is always free improvement.", answer=False, explanation="Can destroy reward ordering.", xp=10))
en.append(Q("level2", 6, question="Reward hacking example in manipulation:", options=[
    "Robot grasps object firmly", "Policy maximizes power efficiency", "Gripper hovers at fixed spot to maximize proximity reward without grasp", "Robot completes task slower to save energy"
], correct=2, explanation="Proxy satisfied without true goal.", xp=10))

en.append(Q("level2", 7, question="Primary failure mode of behavioral cloning?", options=[
    "Overfit demos only", "Cannot use discrete actions", "Distribution shift and compounding errors", "Too slow on big data"
], correct=2, explanation="Train/test state mismatch.", xp=10))
en.append(Q("level2", 7, type="truefalse", question="GAIL needs expert-supplied numeric reward labels.", answer=False, explanation="Discriminator supplies signal.", xp=10))
en.append(Q("level2", 7, question="DAgger improves on pure BC mainly by:", options=[
    "Using smaller networks", "Training only on initial states", "Querying expert on states the learner actually visits", "Removing exploration noise"
], correct=2, explanation="Matches deployment distribution.", xp=10))

# level3 = topics 17-24
en.append(Q("level3", 0, question="MBPO uses short model rollouts because:", options=[
    "Long rollouts need too much VRAM", "Short are faster per iter", "Error compounds over long horizons", "Short give more diversity"
], correct=2, explanation="Model bias grows with horizon.", xp=10))
en.append(Q("level3", 0, type="truefalse", question="A learned dynamics model can safely generate unlimited OOD synthetic data.", answer=False, explanation="Uncertainty gates needed.", xp=10))
en.append(Q("level3", 0, type="calculation", question="Per-step model error ε=0.02 linearly. Accumulated after 50 steps?", answer=1.0, unit="", tolerance=0.05, explanation="50·0.02 linear approx.", xp=15))

en.append(Q("level3", 1, question="Domain randomization primarily fights:", options=[
    "Sample efficiency", "Discrete vs continuous mismatch", "Sim vs real parameter distribution shift", "Long credit assignment"
], correct=2, explanation="Robustness to physical variation.", xp=10))
en.append(Q("level3", 1, type="truefalse", question="Randomizing only textures suffices for locomotion sim-to-real.", answer=False, explanation="Dynamics matter most.", xp=10))
en.append(Q("level3", 1, question="Pick three to randomize for legged sim-to-real:", options=[
    "Only camera exposure", "Link masses, friction, actuator delay", "Learning rate schedule", "Batch size only"
], correct=1, explanation="Physics + latency + noise.", xp=10))

en.append(Q("level3", 2, question="SAC uses two Q-networks to:", options=[
    "Split actor/critic", "Parallelize GPUs", "Reduce overestimation via min(Q1,Q2) in target", "Mix discrete/continuous"
], correct=2, explanation="Clipped double-Q style.", xp=10))
en.append(Q("level3", 2, type="truefalse", question="SAC with automatic temperature must hand-tune α for each task.", answer=False, explanation="Dual descent on α.", xp=10))
en.append(Q("level3", 2, type="calculation", question="SAC target: r=1, γ=0.99, minQ=3.8, αlogπ=-0.3. y?", answer=4.465, unit="", tolerance=0.02, explanation="1+0.99*(3.8-0.3).", xp=15))

en.append(Q("level3", 3, question="TD3 delays actor updates relative to critic to:", options=[
    "Save compute", "Fill buffer first", "Let critic be more accurate before guiding actor", "Cheap trust region"
], correct=2, explanation="More stable actor grad.", xp=10))
en.append(Q("level3", 3, type="truefalse", question="TD3 target policy smoothing adds noise to the behavior policy during env steps.", answer=False, explanation="Noise on target actor for Q backup.", xp=10))
en.append(Q("level3", 3, type="calculation", question="TD3: r=0.5, γ=0.99, min(Q noisy)=5.3. y?", answer=5.747, unit="", tolerance=0.02, explanation="0.5+0.99*5.3.", xp=15))

en.append(Q("level3", 4, question="HER is most helpful when:", options=[
    "Dense rewards", "Very short episodes", "Sparse success and rare random goals", "Discrete actions only"
], correct=2, explanation="Relabel failures as goals.", xp=10))
en.append(Q("level3", 4, type="truefalse", question="HER works with standard PPO replay.", answer=False, explanation="Needs off-policy buffer.", xp=10))
en.append(Q("level3", 4, question="HER final strategy: achieved s_T vs goal g, failure. Relabeled goal is:", options=[
    "Always g", "Random workspace point", "The achieved state s_T as new goal", "Average of g and s_T"
], correct=2, explanation="Success under relabeled goal.", xp=10))

en.append(Q("level3", 5, question="Lagrangian CMDP multiplier λ role:", options=[
    "Discount for cost", "Replaces reward entirely", "Penalizes violations until constraint satisfied", "Sets exploration near danger"
], correct=2, explanation="Augmented Lagrangian style.", xp=10))
en.append(Q("level3", 5, type="truefalse", question="Lagrangian methods guarantee zero constraint violations every step during training.", answer=False, explanation="Soft constraints; use CBF for hard.", xp=10))
en.append(Q("level3", 5, question="Hard z≥0.05 m constraint at runtime without changing RL objective:", options=[
    "Lower γ", "Only penalty in reward", "Safety layer / QP projection of torques", "Freeze critic"
], correct=2, explanation="Filter unsafe commands.", xp=10))

en.append(Q("level3", 6, question="Flat-terrain-only locomotion training often fails on rough ground because:", options=[
    "Too many sim steps", "PPO incompatible", "Overfits nominal flat dynamics", "Too many collisions"
], correct=2, explanation="Lacks irregularity distribution.", xp=10))
en.append(Q("level3", 6, type="truefalse", question="Pure proprio policies can never climb stairs.", answer=False, explanation="Moderate stairs possible reactively.", xp=10))
en.append(Q("level3", 6, question="Pick three typical quadruped velocity-tracking reward terms:", options=[
    "Font choice in UI", "Forward vel tracking, height/orientation reg, torque penalty", "GPU driver version", "Optimizer brand"
], correct=1, explanation="Standard shaping bundle.", xp=10))

en.append(Q("level3", 7, question="Why LSTM/GRU in contact-rich dexterous policies?", options=[
    "Fewer parameters", "Multi-GPU requirement", "Maintain belief over pose under noisy partial obs", "Speeds tabular Q"
], correct=2, explanation="Temporal integration.", xp=10))
en.append(Q("level3", 7, type="truefalse", question="Randomizing only object RGB texture is enough for manipulation sim-to-real.", answer=False, explanation="Contact dynamics dominate.", xp=10))
en.append(Q("level3", 7, question="Two valid 6-DoF object pose sources:", options=[
    "WiFi RSSI + clock skew", "AprilTag/Aruco fiducials and learned RGB(D) pose nets", "Motor serial numbers only", "DNS lookup"
], correct=1, explanation="Classic perception stack.", xp=10))

# level4 25-29
en.append(Q("level4", 0, question="Core offline RL challenge vs online:", options=[
    "Sparse manipulation rewards", "High-dim RGB", "OOD actions inflate Q and break policy", "Target networks hard"
], correct=2, explanation="Extrapolation error.", xp=10))
en.append(Q("level4", 0, type="truefalse", question="With unlimited offline data, offline RL always matches best online RL.", answer=False, explanation="Coverage must support the task.", xp=10))
en.append(Q("level4", 0, question="CQL adds penalty on Q under broad μ mainly to:", options=[
    "Speed simulation", "Increase entropy", "Discourage high Q on unseen actions", "Normalize rewards"
], correct=2, explanation="Conservative Q.", xp=10))

en.append(Q("level4", 1, question="UVFA learns a single function over:", options=[
    "Multiple agents", "Many γ at once", "States and goals jointly", "Multiple physics engines"
], correct=2, explanation="V(s,g) or Q(s,a,g).", xp=10))
en.append(Q("level4", 1, type="truefalse", question="HER alone generalizes to goals far outside achieved-goal distribution.", answer=False, explanation="Need curriculum/exploration.", xp=10))
en.append(Q("level4", 1, question="Goal curriculum easy→hard helps because:", options=[
    "Hard goals always give signal", "Easy goals near capability give gradients; difficulty ramps", "Uniform is always optimal", "γ must decrease"
], correct=1, explanation="Informative learning frontier.", xp=10))

en.append(Q("level4", 2, question="MAML meta-objective: find θ* such that:", options=[
    "Average loss at θ only", "Maximize cross-task entropy", "Loss after few inner steps from θ* is low", "Zero-shot with no adaptation"
], correct=2, explanation="Few-step adaptation.", xp=10))
en.append(Q("level4", 2, type="truefalse", question="In RL², RNN hidden state can encode implicit task context.", answer=True, explanation="Trajectory-based inference.", xp=10))
en.append(Q("level4", 2, question="Mitigate multi-task gradient conflict:", options=[
    "Ignore all negative gradients", "PCGrad / uncertainty weighting / per-task scaling", "Single task only forever", "Remove critic"
], correct=1, explanation="Balance opposing task grads.", xp=10))

en.append(Q("level4", 3, question="Frozen CLIP/ViT encoder helps robot policies because:", options=[
    "Removes RL need", "Shortens episodes", "Rich semantic visuals from web-scale pretraining", "Removes sim-to-real gap"
], correct=2, explanation="Strong visual prior.", xp=10))
en.append(Q("level4", 3, type="truefalse", question="Language-conditioned policies always execute novel unseen instruction types reliably.", answer=False, explanation="Grounding limits generalization.", xp=10))
en.append(Q("level4", 3, question="LLM planner + low-level RL executor:", options=[
    "LLM replaces robot", "Only BC, no goals", "LLM decomposes instructions; RL policy executes sub-goals", "Random motor babbling"
], correct=2, explanation="Hierarchical stack.", xp=10))

en.append(Q("level4", 4, question="Reward plateaus after 200k steps — first step:", options=[
    "Switch algorithm immediately", "Double network width", "Visualize behavior for hacking/local optimum/sim limits", "Set γ=0.999"
], correct=2, explanation="Diagnose before changing stack.", xp=10))
en.append(Q("level4", 4, type="truefalse", question="Ablations showing −60% real success without domain rand should be hidden as negative.", answer=False, explanation="Strong positive evidence for DR.", xp=10))
en.append(Q("level4", 4, question="Ordered diagnostics sim≈95% vs real 40%:", options=[
    "First collect 1M new real demos always", "First add delay/noise in sim; then sysID; then small real fine-tune", "Only increase network depth", "Skip simulation"
], correct=1, explanation="Cheap→expensive isolation.", xp=10))

assert len(en) == 87, len(en)
emit_quizzes(ROOT / "exercises.js", "en", en)

# German: same structure, translated question/explanation/options
def loc(entry, question, explanation, options=None):
    d = dict(entry)
    d["question"] = question
    d["explanation"] = explanation
    if options is not None:
        d["options"] = options
    return d

de = []
i = 0
de.append(loc(en[i], "Log-Ableitung beim Policy-Gradient: welche Identität ist korrekt?", "REINFORCE nutzt log π für unverzerrten MC-Gradienten.", ["∇E[R] = E[R · ∇π]", "∇E[R] = E[R · ∇ log π]", "∇E[R] = ∇R · π", "∇E[R] = E[∇R]"])); i+=1
de.append(loc(en[i], "Der Gradient zeigt immer vom lokalen Minimum weg (steilster Anstieg).", "Anstiegsrichtung ist +Gradient.", None)); i+=1
de.append(loc(en[i], "Gauß N(μ=1.2, σ=0.4): Dichte f(1.2) = 1/(σ√(2π))?", "Am Mittelwert: f = 1/(σ√2π) ≈ 0.997.", None)); i+=1
de.append(loc(en[i], "Beim echten Roboter-RL: welche MDP-Komponente ist meist unbekannt?", "Physik steckt in P — unbekannt oder nur simuliert.", ["Zustandsraum S", "Aktionsraum A", "Übergangsdynamik P(s'|s,a)", "Diskont γ"])); i+=1
de.append(loc(en[i], "Höheres γ (z. B. 0,99 vs. 0,9) beschleunigt immer das Lernen.", "Längerer Horizont erhöht Return-Varianz.", None)); i+=1
de.append(loc(en[i], "γ=0,9, Belohnung 1 pro Schritt für 5 Schritte, dann Ende. G₀?", "Geometrische Summe ≈ 4,095.", None)); i+=1
de.append(loc(en[i], "Bellman-Optimalität für Q*(s,a) (endliches MDP):", "Erwartung über Folgezustand, Max über Aktionen.", ["falsche Form", "nur R + γ max", "Q* = Σ P [R + γ max_a' Q*(s',a')]", "Q* = R - γV*"])); i+=1
de.append(loc(en[i], "V^π hängt von der Policy π ab.", "Wert ist unter π definiert.", None)); i+=1
de.append(loc(en[i], "Q(s,a1)=5, Q(s,a2)=3, π wählt je 0,5. V^π(s)?", "0,5·5+0,5·3 = 4.", None)); i+=1
de.append(loc(en[i], "Policy-Iteration konvergiert, weil:", "Monotone Verbesserung in endlichen MDPs.", ["Schritt minimiert MSBE", "Endliche Policy; jeder Schritt verbessert oder hält Wert", "Mannigfaltigkeit für Gradientenabstieg", "Belohnung beschränkt und γ<1"])); i+=1
de.append(loc(en[i], "Wertiteration wertet V^π vor jeder Verbesserung voll konvergent aus.", "VI verbindet Backup und max in einem Durchlauf.", None)); i+=1
de.append(loc(en[i], "Ein Zustand, eine Aktion, R=2, γ=0,8, Selbstschleife P=1, V₀=0. V₁ nach einem VI-Backup?", "2 + 0,8·0 = 2.", None)); i+=1
de.append(loc(en[i], "Wann ist Monte-Carlo-RL besonders unpraktisch?", "MC braucht Episoden-Returns.", ["Dichte Belohnungen", "Diskreter Zustandsraum", "Fortlaufende Aufgabe ohne Episodengrenze", "Stochastische Policy"])); i+=1
de.append(loc(en[i], "Off-Policy-MC mit Importance Sampling ist immer dateneffizienter als On-Policy-MC.", "IS-Gewichte können die Varianz explodieren lassen.", None)); i+=1
de.append(loc(en[i], "Every-visit-MC: G₀-Werte 10,8,12 für Zustand s. V̂(s)?", "Mittelwert = 10.", None)); i+=1
de.append(loc(en[i], "TD(0)-Update V ← V + α[r+γV(s')-V(s)] ist:", "Bootstrap mit aktuellem V.", ["Voller MC-Return", "ML-Schätzer", "Ein-Schritt-bootstrap-Backup", "IS-Gradientenschritt"])); i+=1
de.append(loc(en[i], "TD(λ) mit λ=1 entspricht vollem Monte-Carlo (Forward-View).", "λ=1 volle Returns.", None)); i+=1
de.append(loc(en[i], "V(s)=3, r=1, V(s')=4, γ=0,9, α=0,1. Neues V(s)?", "δ=1,6; V+=0,16.", None)); i+=1
de.append(loc(en[i], "Unterschied Q-Learning vs. SARSA beim Bootstrap-Ziel:", "Off- vs. On-Policy-Backup.", ["Nur Q NN", "Q on-policy", "Q nutzt max Q(s',a'); SARSA nächste echte Aktion", "Q braucht Modell"])); i+=1
de.append(loc(en[i], "Tabellen-Q-Learning konvergiert gegen Q* unter Erkundung (Bedingungen), auch bei zufälligem Verhalten.", "Watkins-Bedingungen.", None)); i+=1
de.append(loc(en[i], "Q-Learning: Q=2, r=0, max Q(s')=5, γ=0,95, α=0,1. Neues Q?", "Ziel 4,75.", None)); i+=1
de.append(loc(en[i], "Sample-effizientester Zustand fürs Greifen mit Arm?", "Niedrigdimensionale Proprio + Aufgabe.", ["Raw RGB 256³", "Nur Tiefe", "Gelenkwinkel, -geschw., Zielpose (kompakt)", "Volle LiDAR-Wolke"])); i+=1
de.append(loc(en[i], "Drehmomente als Aktion sind immer besser als Positionsaktionen.", "Position ist oft leichter zu lernen.", None)); i+=1
de.append(loc(en[i], "Ohne RNN: Teilbeobachtbarkeit oft durch:", "Historie im Beobachtungsvektor.", ["γ verdoppeln", "Sensoren entfernen", "Frame-Stacking und/oder letzte Aktionen anhängen", "Nur tabellarisches Q"])); i+=1
de.append(loc(en[i], "Warum Ziel-Netz beim neuronalen Q-Learning?", "Weniger Oszillation durch wanderndes Ziel.", ["Puffer speichern", "Unsichere Zustände blockieren", "Stabilisiert Regressionsziel vs. bewegliches Q", "Doppelte LR"])); i+=1
de.append(loc(en[i], "Lineare FA + TD(0) konvergiert zum wahren optimalen V*.", "Konvergiert zum projizierten Bellman-Fixpunkt.", None)); i+=1
de.append(loc(en[i], "V̂=3,5, TD-Ziel 5,0, MSE = ½(5-3,5)²?", "1,5²/2.", None)); i+=1
de.append(loc(en[i], "DQN Experience Replay vor allem:", "Minibatches weniger korreliert.", ["Transition nur einmal", "Nur aus Demos", "Zeitkorrelation in Minibatches brechen", "Zustände komprimieren"])); i+=1
de.append(loc(en[i], "DQN für 7-DOF mit 100 Binning/Joint ist praktikabel.", "Aktionsraum explodiert.", None)); i+=1
de.append(loc(en[i], "Dueling: V=4, A=[1,5,-0,5,0,2], Mittel A=0,4. Q(s,a1)?", "V + A - Mittel(A).", None)); i+=1
de.append(loc(en[i], "Baseline b(s) im PG verzerrt nicht, weil:", "Score-Funktion-Trick.", ["b = V immer", "b nach Gradient", "E[∇log π · b]=0 wenn b unabh. von a", "PG immer unverzerrt"])); i+=1
de.append(loc(en[i], "Sehr großer Entropiekoeffizient verbessert immer die finale Policy.", "Übermäßige Zufälligkeit.", None)); i+=1
de.append(loc(en[i], "REINFORCE: G=10, b=6, ∇logπ=0,3, α=0,01. Δθ?", "0,01·4·0,3.", None)); i+=1
de.append(loc(en[i], "GAE mit λ=0 reduziert Advantage auf:", "λ=0 nur ein Schritt.", ["Voller MC", "Nur REINFORCE", "Ein-Schritt-TD-Fehler δ_t", "Q minus mittlere Belohnung"])); i+=1
de.append(loc(en[i], "Actor und Critic müssen immer geteilte Gewichte haben.", "Getrennte Netze sind üblich.", None)); i+=1
de.append(loc(en[i], "GAE: γ=0,99, λ=0,95, δ₀=1, δ₁=0,5. Â₀?", "δ₀ + γλ δ₁.", None)); i+=1
de.append(loc(en[i], "PPO-Verhältnis r_t(θ)=π/π_old = 1 wenn:", "Gleiche Wahrscheinlichkeiten.", ["Vorteil 0", "Andere Aktion", "Gleiche Wkt. für a|s unter alt und neu", "LR minimal"])); i+=1
de.append(loc(en[i], "PPO kann alte Übergänge vieler Iterationen wie SAC wiederverwenden.", "PPO ist on-policy.", None)); i+=1
de.append(loc(en[i], "PPO-Clip: r=1,3, A=2, ε=0,2. min(rA, clip(r,0,8,1,2)A)?", "Gekappter Term gewinnt min.", None)); i+=1
de.append(loc(en[i], "Kritischste Sim-Eigenschaft für Manipulator-Transfer?", "Kontakt dominiert Sim-to-Real.", ["Hohe Render-Auflösung", "Max parallele Env", "Genauer Kontakt/Reibung", "Schnellster Reset"])); i+=1
de.append(loc(en[i], "Perfekter Simulator garantiert identische Real-Roboter-Performance.", "Unmodellierte Effekte bleiben.", None)); i+=1
de.append(loc(en[i], "1 Env 100 Steps/s, 10M Steps. Wandstunden (eine Instanz)?", "1e7/100/3600.", None)); i+=1
de.append(loc(en[i], "Welche Formung erhält optimale Policy (beschränktes Potential Φ)?", "Potential-basiert Ng–Harada–Russell.", ["Konstantbonus am Ziel", "Skalierung von R", "R̂ = R + γΦ(s') - Φ(s)", "Geschwindigkeit abziehen"])); i+=1
de.append(loc(en[i], "Belohnung auf [-1,1] clippen ist immer kostenlos besser.", "Kann Größenordnung zerstören.", None)); i+=1
de.append(loc(en[i], "Reward-Hacking in Manipulation:", "Proxy ohne echtes Ziel.", ["Greift fest", "Energieeffizienz", "Greifer schwebt fest — Nähe-Belohnung ohne Griff", "Langsamer fertig"])); i+=1
de.append(loc(en[i], "Hauptproblem von Behavioral Cloning?", "Train/Deploy-Verteilungsverschiebung.", ["Overfit nur Demos", "Diskret unmöglich", "Verteilungsverschiebung und Fehlerfortpflanzung", "Zu langsam"])); i+=1
de.append(loc(en[i], "GAIL braucht explizite Belohnungslabels vom Experten.", "Diskriminator liefert Signal.", None)); i+=1
de.append(loc(en[i], "DAgger verbessert BC vor allem durch:", "Trainingsverteilung = Laufzeitverteilung.", ["Kleinere Netze", "Nur Startzustände", "Experte in besuchten Zuständen befragen", "Exploration weg"])); i+=1
de.append(loc(en[i], "MBPO nutzt kurze Modell-Rollouts, weil:", "Bias wächst mit Horizont.", ["Lange brauchen VRAM", "Kurz schneller", "Fehler summieren sich über langen Horizont", "Kurz vielfältiger"])); i+=1
de.append(loc(en[i], "Ein gelerntes Dynamikmodell darf unbegrenzt OOD-Synthese erzeugen.", "Unsicherheit begrenzen.", None)); i+=1
de.append(loc(en[i], "Modellfehler ε=0,02 pro Schritt linear. Nach 50 Schritten akkumuliert?", "50·0,02 linear.", None)); i+=1
de.append(loc(en[i], "Domain Randomization bekämpft vor allem:", "Robustheit gegen Physikstreuung.", ["Sampleffizienz", "Diskret/kontinuierlich", "Sim-vs.-Real-Parameterverschiebung", "Credit assignment"])); i+=1
de.append(loc(en[i], "Nur Texturen randomisieren reicht für Lokomotion Sim-to-Real.", "Dynamik zuerst.", None)); i+=1
de.append(loc(en[i], "Wähle drei zum Randomisieren für Beine Sim-to-Real:", "Physik + Latenz + Rauschen.", ["Nur Belichtung", "Massen, Reibung, Aktuatorverzögerung", "LR-Plan", "Nur Batchgröße"])); i+=1
de.append(loc(en[i], "SAC nutzt zwei Q-Netze, um:", "Clipped Double-Q-Stil.", ["Actor/Critic trennen", "GPUs", "Überschätzung via min(Q1,Q2) im Ziel", "Diskret/kontinuierlich mischen"])); i+=1
de.append(loc(en[i], "SAC mit automatischer Temperatur braucht manuelles α pro Task.", "Dualer Abstieg auf α.", None)); i+=1
de.append(loc(en[i], "SAC-Ziel: r=1, γ=0,99, minQ=3,8, αlogπ=-0,3. y?", "1+0,99·(3,8-0,3).", None)); i+=1
de.append(loc(en[i], "TD3 verzögert Actor-Updates relativ zum Critic, um:", "Stabilerer Actor-Gradient.", ["Compute sparen", "Puffer füllen", "Critic genauer bevor Actor führt", "Billiges Trust-Region"])); i+=1
de.append(loc(en[i], "TD3 Target-Smoothing addiert Rauschen zur Verhaltenspolicy während Env-Schritten.", "Rauschen am Ziel-Actor für Q-Backup.", None)); i+=1
de.append(loc(en[i], "TD3: r=0,5, γ=0,99, min(Q noisy)=5,3. y?", "0,5+0,99·5,3.", None)); i+=1
de.append(loc(en[i], "HER hilft vor allem wenn:", "Fehlschläge als Ziele umbennen.", ["Dichte Belohnungen", "Sehr kurze Episoden", "Sparse Erfolg und seltenes Ziel", "Nur diskrete Aktionen"])); i+=1
de.append(loc(en[i], "HER funktioniert mit Standard-PPO-Replay.", "Braucht Off-Policy-Puffer.", None)); i+=1
de.append(loc(en[i], "HER Final: erreicht s_T, Ziel g, Misserfolg. Relabel-Ziel:", "Erfolg unter neuem Ziel.", ["Immer g", "Zufallspunkt", "Erreichter Zustand s_T als neues Ziel", "Mittel aus g und s_T"])); i+=1
de.append(loc(en[i], "Lagrangian-CMDP-Multiplikator λ:", "Weiche Strafen bis Constraint passt.", ["Diskont für Kosten", "Ersetzt R", "Bestraft Verletzungen bis erfüllt", "Exploration in Gefahr"])); i+=1
de.append(loc(en[i], "Lagrangian garantiert null Verletzungen jeden Schritt beim Training.", "Weich; CBF für hart.", None)); i+=1
de.append(loc(en[i], "Harte z≥0,05 m zur Laufzeit ohne RL-Ziel zu ändern:", "Sichere Aktion projizieren.", ["γ senken", "Nur Reward-Strafe", "Safety-Layer / QP auf Momente", "Critic einfrieren"])); i+=1
de.append(loc(en[i], "Nur flaches Terrain beim Laufen scheitert oft auf unebenem Boden, weil:", "Fehlende Irregularitätsverteilung.", ["Zu viele Sim-Schritte", "PPO ungeeignet", "Überanpassung an flache Dynamik", "Zu viele Kollisionen"])); i+=1
de.append(loc(en[i], "Rein proprio kann nie Treppen.", "Moderate Treppen reaktiv möglich.", None)); i+=1
de.append(loc(en[i], "Drei typische Reward-Terme für Vierbeiner Geschwindigkeitsfolge:", "Standard-Bündel.", ["Schriftart UI", "Vorwärtsgeschw., Höhe/Lage, Drehmomentstrafe", "GPU-Treiber", "Optimizer-Marke"])); i+=1
de.append(loc(en[i], "Warum LSTM/GRU bei dexteroser Kontakt-Politik?", "Zeitliche Integration / Glaube über Pose.", ["Weniger Parameter", "Multi-GPU Pflicht", "Glaube über Pose bei Rauschen", "Tabellen-Q schneller"])); i+=1
de.append(loc(en[i], "Nur Objekt-RGB-Textur randomisieren reicht für Manipulation Sim-to-Real.", "Kontaktdynamik dominiert.", None)); i+=1
de.append(loc(en[i], "Zwei gültige Quellen für 6-DoF Objektpose:", "Klassischer Perception-Stack.", ["WLAN+RSSI", "AprilTag/Aruco und gelernte RGB(D)-Pose", "Motor-Seriennummern", "DNS"])); i+=1
de.append(loc(en[i], "Kernproblem Offline-RL vs. Online:", "Extrapolation.", ["Sparse Rewards", "Hohe RGB-Dim", "OOD-Aktionen blasen Q auf", "Zielnetze schwer"])); i+=1
de.append(loc(en[i], "Mit unendlich Offline-Daten erreicht Offline-RL immer bestes Online.", "Abdeckung muss reichen.", None)); i+=1
de.append(loc(en[i], "CQL addiert Strafe auf Q unter breitem μ hauptsächlich um:", "Konservatives Q.", ["Sim beschleunigen", "Entropie erhöhen", "Hohe Q auf ungesehenen Aktionen dämpfen", "R normalisieren"])); i+=1
de.append(loc(en[i], "UVFA lernt eine Funktion über:", "V(s,g) oder Q(s,a,g).", ["Mehrere Agenten", "Viele γ", "Zustände und Ziele gemeinsam", "Mehrere Physik-Engines"])); i+=1
de.append(loc(en[i], "HER allein verallgemeinert weit außerhalb der erreichten Zielverteilung.", "Curriculum nötig.", None)); i+=1
de.append(loc(en[i], "Ziel-Curriculum einfach→schwer hilft, weil:", "Lernende Grenze informativ.", ["Schwere Ziele immer Signal", "Leichte nahe Fähigkeit geben Gradienten", "Uniform immer optimal", "γ runter"])); i+=1
de.append(loc(en[i], "MAML-Meta-Ziel: θ* sodass:", "Wenige innere Schritte.", ["Mittelverlust nur bei θ", "Entropie max", "Verlust nach wenigen Schritten von θ* niedrig", "Zero-shot ohne Adaption"])); i+=1
de.append(loc(en[i], "In RL² kann der RNN-Zustand impliziten Task-Kontext kodieren.", "Inferenz aus Trajektorie.", None)); i+=1
de.append(loc(en[i], "Gradientenkonflikt Multi-Task mildern:", "Gegensätzliche Tasks ausgleichen.", ["Negative ignorieren", "PCGrad / Unsicherheit / Task-Skalierung", "Nur ein Task", "Critic weg"])); i+=1
de.append(loc(en[i], "Gefrorener CLIP/ViT-Encoder hilft Roboter-Politiken, weil:", "Starker visueller Prior vom Web.", ["RL unnötig", "Kürzere Episoden", "Semantik aus Web-Vortrainingsbildern", "Kein Sim-to-Real"])); i+=1
de.append(loc(en[i], "Sprachkonditionierte Policies führen immer neuartige Anweisungen zuverlässig aus.", "Grounding begrenzt Generalisierung.", None)); i+=1
de.append(loc(en[i], "LLM-Planer + untergelagerte RL-Ausführung:", "Hierarchischer Stack.", ["LLM ersetzt Roboter", "Nur BC", "LLM zerlegt Befehle; RL erfüllt Teilziele", "Zufallsmotoren"])); i+=1
de.append(loc(en[i], "Belohnung stagniert nach 200k Schritten — erster Schritt:", "Diagnose vor Stack-Wechsel.", ["Sofort Algorithmus wechseln", "Breite verdoppeln", "Verhalten visualisieren (Hacking/Lokaloptimum/Sim)", "γ=0,999"])); i+=1
de.append(loc(en[i], "Ablations −60 % Real ohne Domain-Rand als negativ verstecken.", "Zeigt Wert von DR.", None)); i+=1
de.append(loc(en[i], "Geordnete Diagnose Sim≈95 % vs Real 40 %:", "Günstig → teuer.", ["Zuerst 1M echte Demos", "Erst Delay/Rauschen in Sim; dann SysID; dann wenig Real-FT", "Nur Tiefe erhöhen", "Sim überspringen"])); i+=1
assert i == 87 and len(de) == 87
emit_quizzes(ROOT / "lang/de/quizzes.js", "de", de)

# Scenarios EN
sc = [
    dict(level="level1", ti=0, title="Wrong policy gradient", desc="Teammate uses Δθ = R·∇π instead of R·∇log π.", choices=[dict(t="Equivalent", ok=False), dict(t="Log only for entropy reg", ok=False), dict(t="Fix: missing log biases MC gradient", ok=True), dict(t="OK for deterministic π only", ok=False)], exp="Log-derivative form is the standard unbiased estimator."),
    dict(level="level1", ti=1, title="Sparse grasp reward", desc="+1 on success only; 200k steps no progress.", choices=[dict(t="Bigger replay buffer alone", ok=False), dict(t="Switch off-policy only", ok=False), dict(t="Lower γ to 0.5", ok=False), dict(t="Add dense shaping (e.g., distance)", ok=True)], exp="Sparse signal needs guidance."),
    dict(level="level1", ti=2, title="Advantage for variance", desc="Training slow; colleague suggests advantages vs raw Q.", choices=[dict(t="Reject: doubles compute unjustified", ok=False), dict(t="Reject: loses scale info", ok=False), dict(t="Use advantages; centers returns", ok=True), dict(t="Only for discrete actions", ok=False)], exp="Baselines/advantages reduce PG variance."),
    dict(level="level1", ti=3, title="7-DOF tabular DP", desc="100 bins per joint, value iteration.", choices=[dict(t="Accept full accuracy", ok=False), dict(t="10 bins is fine", ok=False), dict(t="Policy eval only", ok=False), dict(t="Reject: 100^7 states infeasible", ok=True)], exp="Curse of dimensionality."),
    dict(level="level1", ti=4, title="Non-episodic walking", desc="Continuous locomotion, no resets; estimate V.", choices=[dict(t="First-visit MC", ok=False), dict(t="TD methods", ok=True), dict(t="Every-visit MC long timeout", ok=False), dict(t="DP with learned model only", ok=False)], exp="MC needs episode boundaries."),
    dict(level="level1", ti=5, title="Pick-and-place every step", desc="Need updates each step without episode end.", choices=[dict(t="Every-visit MC", ok=False), dict(t="Full policy iteration sweeps", ok=False), dict(t="TD or Q-learning style", ok=True), dict(t="DP with true model", ok=False)], exp="Bootstrapping per step."),
    dict(level="level1", ti=6, title="Warehouse ε-greedy damage", desc="ε=0.3 hits shelves often; Q-learning optimal but risky.", choices=[dict(t="Increase ε", ok=False), dict(t="Value iteration", ok=False), dict(t="Greedy from start", ok=False), dict(t="SARSA or lower ε", ok=True)], exp="On-policy backup accounts for exploration."),
    dict(level="level1", ti=7, title="Limited compute sensing", desc="Pick-place: joints, F/T, RGB available.", choices=[dict(t="RGB only end-to-end", ok=False), dict(t="Joints only", ok=False), dict(t="F/T only", ok=False), dict(t="Proprio + F/T; camera if needed", ok=True)], exp="Compact state learns faster."),
    dict(level="level2", ti=0, title="Q-loss diverges", desc="Robot nav Q-net unstable after 50k steps.", choices=[dict(t="Shrink width only", ok=False), dict(t="Remove replay", ok=False), dict(t="Raise LR", ok=False), dict(t="Target net + lower LR", ok=True)], exp="Deadly triad symptom."),
    dict(level="level2", ti=1, title="8-bin sorting", desc="8 discrete package bins; colleague wants PPO continuous.", choices=[dict(t="PPO always", ok=False), dict(t="PPO + noise", ok=False), dict(t="DQN / discrete PPO", ok=True), dict(t="SAC native discrete", ok=False)], exp="Small discrete action set."),
    dict(level="level2", ti=2, title="Drone REINFORCE", desc="500 episodes still random hover.", choices=[dict(t="5000 episodes only", ok=False), dict(t="Remove entropy", ok=False), dict(t="Switch tabular Q", ok=False), dict(t="Baseline + actor-critic", ok=True)], exp="Variance reduction."),
    dict(level="level2", ti=3, title="Single slow sim walker", desc="12-DoF, one 1kHz instance, 48h poor.", choices=[dict(t="Raise LR", ok=False), dict(t="DQN", ok=False), dict(t="Train longer one env", ok=False), dict(t="Parallel vectorized rollouts", ok=True)], exp="Wall-clock throughput."),
    dict(level="level2", ti=4, title="Quadruped PPO collapse", desc="Good until epoch 5000 then fails.", choices=[dict(t="Increase clip ε", ok=False), dict(t="Higher LR", ok=False), dict(t="Remove GAE", ok=False), dict(t="Lower LR / fewer PPO epochs", ok=True)], exp="Over-updating on-policy data."),
    dict(level="level2", ti=5, title="Dexterous hand + 4 GPUs", desc="Train manipulation policy.", choices=[dict(t="Single hi-fi rendered sim", ok=False), dict(t="No contact low-fi", ok=False), dict(t="Scratch on hardware", ok=False), dict(t="GPU parallel contact-rich sim", ok=True)], exp="Scale sim throughput with fidelity."),
    dict(level="level2", ti=6, title="Pouring sparse reward", desc="+1 only if liquid in cup; no learning.", choices=[dict(t="Scale R×10", ok=False), dict(t="Random bonus", ok=False), dict(t="Off-policy alone", ok=False), dict(t="Potential-based intermediate shaping", ok=True)], exp="Guide policy with dense shaping."),
    dict(level="level2", ti=7, title="50 surgical demos", desc="Max quality, minimal hardware risk.", choices=[dict(t="GAIL scratch", ok=False), dict(t="DAgger live surgeon always", ok=False), dict(t="BC only deploy", ok=False), dict(t="BC pretrain + sim RL fine-tune", ok=True)], exp="Safe bootstrap then sim RL."),
    dict(level="level3", ti=0, title="100 expensive real episodes", desc="Need sample-efficient learning.", choices=[dict(t="PPO 1M on robot", ok=False), dict(t="BC only", ok=False), dict(t="Huge DQN replay", ok=False), dict(t="MBPO/PETS-style model + short rollouts", ok=True)], exp="Model augments scarce data."),
    dict(level="level3", ti=1, title="95% sim 30% real legged", desc="Leg policy transfer gap.", choices=[dict(t="More flat sim steps", ok=False), dict(t="More demos", ok=False), dict(t="Bigger net", ok=False), dict(t="Domain rand physics + delay + sensor noise", ok=True)], exp="Widen train distribution."),
    dict(level="level3", ti=2, title="500 real arm episodes", desc="Choose algorithm for continuous control.", choices=[dict(t="PPO parallel sim only", ok=False), dict(t="REINFORCE", ok=False), dict(t="DQN discretized torques", ok=False), dict(t="SAC off-policy replay", ok=True)], exp="Reuse every transition."),
    dict(level="level3", ti=3, title="Deterministic welding track", desc="Precise repeatable path, no contact noise.", choices=[dict(t="SAC exploratory", ok=False), dict(t="PPO high entropy", ok=False), dict(t="DQN discretized poses", ok=False), dict(t="TD3 deterministic stable tracking", ok=True)], exp="Deterministic optimum."),
    dict(level="level3", ti=4, title="Pick-place almost never succeeds", desc="Sparse +1 only.", choices=[dict(t="MBRL only", ok=False), dict(t="Potential shaping only", ok=False), dict(t="BC jump start only", ok=False), dict(t="HER + off-policy SAC/TD3", ok=True)], exp="Relabel failures."),
    dict(level="level3", ti=5, title="Cobot swings near human", desc="Learning phase unsafe motion.", choices=[dict(t="Lower LR only", ok=False), dict(t="More entropy", ok=False), dict(t="Reward penalty only", ok=False), dict(t="CBF / hard safety layer", ok=True)], exp="Hard constraints for humans."),
    dict(level="level3", ti=6, title="Flat sim perfect, real grass fail", desc="Quadruped transfer.", choices=[dict(t="More flat training", ok=False), dict(t="Bigger network", ok=False), dict(t="PPO→SAC swap", ok=False), dict(t="Terrain curriculum + dynamics rand + noise", ok=True)], exp="Match real variability."),
    dict(level="level3", ti=7, title="Cube rotation exploration fail", desc="10M steps no success.", choices=[dict(t="Dense orientation only", ok=False), dict(t="BC 50 demos only", ok=False), dict(t="DQN fingers", ok=False), dict(t="Curriculum + HER + SAC", ok=True)], exp="Progressive goals and relabeling."),
    dict(level="level4", ti=0, title="Hospital teleop dataset", desc="No live RL in hospital.", choices=[dict(t="BC only", ok=False), dict(t="GAIL online", ok=False), dict(t="PPO in hospital", ok=False), dict(t="Offline RL then sim validate", ok=True)], exp="CQL/IQL on fixed data."),
    dict(level="level4", ti=1, title="Warehouse arbitrary goals", desc="One policy to many locations.", choices=[dict(t="100 separate policies", ok=False), dict(t="Fixed distance penalty one goal", ok=False), dict(t="PPO single fixed goal", ok=False), dict(t="UVFA + HER generalization", ok=True)], exp="Goal-conditioned value."),
    dict(level="level4", ti=2, title="Home robot multi-skill", desc="Drawers, pour, fold one policy.", choices=[dict(t="Three separate policies", ok=False), dict(t="DQN task id", ok=False), dict(t="MAML one step only", ok=False), dict(t="Multi-task conditioned + grad balance", ok=True)], exp="Shared policy with balancing."),
    dict(level="level4", ti=3, title="Clear table → dishwasher", desc="Only local grasp skills trained.", choices=[dict(t="Scratch end-to-end", ok=False), dict(t="100 full demos BC", ok=False), dict(t="Language reward hack", ok=False), dict(t="LLM planner + goal RL skills", ok=True)], exp="Decompose long horizon."),
    dict(level="level4", ti=4, title="Capstone one week left", desc="55% sim PPO, no real yet.", choices=[dict(t="Chase 90% sim", ok=False), dict(t="Hardware scratch week", ok=False), dict(t="VLA swap", ok=False), dict(t="Domain rand + one real trial + ablations", ok=True)], exp="Rigorous partial beats rushed target."),
]
assert len(sc) == 29
emit_scenarios(ROOT / "scenarios.js", "en", sc)
print("OK", len(en), "quizzes,", len(sc), "scenarios")
