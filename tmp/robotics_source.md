Method: Rᵀ of the top-left 3×3 block, translation = −Rᵀ**p** = [−4, 3, 0]ᵀ.

### Decision Scenario
You have a robot arm with a camera mounted on its wrist. You want to know the position of a detected object in the robot's base frame. You have: T_base_to_wrist, T_wrist_to_camera, and p_in_camera.

- A — Add the translation vectors of all frames together
- B — **Multiply T_base_to_wrist × T_wrist_to_camera × p_in_camera (in homogeneous form)** ✓
- C — Multiply T_wrist_to_camera × T_base_to_wrist × p_in_camera
- D — Invert the camera transform and add to p_in_camera

> Transforms compose left-to-right from base to the point's frame. The chain T_(base←wrist) · T_(wrist←camera) · **p**_camera correctly expresses the point in base coordinates.

---

## Topic 8: Forward Kinematics

### Lesson Outline
- Definition: forward kinematics (FK) maps joint angles/positions → end-effector pose
- Denavit–Hartenberg (DH) convention: the four parameters (a, d, α, θ) per joint; building the DH table
- Modified DH vs. standard DH: which frame assignment differs; both are valid but must be consistent
- Building the FK chain: T_0^n = T_0^1 · T_1^2 ··· T_{n-1}^n
- Product of exponentials (PoE) formulation as the modern alternative to DH: screw axes
- Worked example: 2-DOF planar arm, then 6-DOF serial arm
- Workspace analysis from FK: reachable workspace, dexterous workspace
- Pitfall: DH singularities at zero-length links; PoE avoids this but requires understanding Lie algebra

### Key Takeaways
- FK always has a unique solution: given joint values, there is exactly one end-effector pose
- DH parameters encode each joint's geometry in a canonical 4-parameter form
- The full FK chain is the sequential product of joint transformation matrices
- PoE is more general and avoids frame-alignment ambiguities present in DH
- Workspace depends on both link geometry and joint limits

### Related Topics
- Coordinate Frames and Rigid Body Transformations
- Inverse Kinematics
- Velocity Kinematics and the Jacobian

### Further Learning
- Modern Robotics Ch. 4 (free): https://modernrobotics.northwestern.edu/
- Search query: `Denavit Hartenberg parameters tutorial derivation step by step`
- *Introduction to Robotics* Craig Ch. 3 — search query: `Craig Introduction Robotics Chapter 3 forward kinematics`
- Coursera Modern Robotics specialization: https://www.coursera.org/specializations/modernrobotics

### Check Understanding

**(a) Multiple Choice**
For a 2-DOF planar robot with L₁ = 1 m and L₂ = 0.5 m, with both joints at θ₁ = 0° and θ₂ = 0°, where is the end-effector?
- 0 — (0, 0)
- 1 — (0.5, 0)
- 2 — **(1.5, 0)** ✓
- 3 — (1, 0.5)

> Both links are aligned along the x-axis, so the tip is at x = L₁ + L₂ = 1.5 m, y = 0.

**(b) True / False**
**Statement:** Forward kinematics always yields a unique end-effector pose for a given set of joint angles.
**Answer:** True.
> FK is a direct function from joint space to task space — no ambiguity. The inverse problem (IK) is what produces multiple or zero solutions.

**(c) Numeric Problem**
For a 2-DOF planar arm (L₁ = L₂ = 1 m), compute the end-effector position when θ₁ = 90°, θ₂ = −90°.
**Expected answer:**
- x = cos(90°+(-90°)) + cos(90°) = 1·0 + 1·1 = 1 m
- y = sin(90°+(-90°)) + sin(90°) = 1·0 + 1·1 = 1 m
- End-effector at (1, 1) m. Tolerance: ±0.01 m.

### Decision Scenario
You are writing a robot simulation and need to compute the end-effector pose 1000 times per second to drive a real-time visualization. Should you use FK or IK?

- A — Solve IK because it gives you the desired pose directly
- B — **Use DH forward kinematics because FK is always a direct, computationally cheap calculation** ✓
- C — Use random search to find a suitable joint configuration
- D — Pre-compute all poses in a lookup table

> FK is a direct matrix multiplication chain — O(n) in number of joints, fast, and always has a unique answer. IK is iterative, potentially ambiguous, and unnecessary here because joint angles are already known from simulation state.

---

## Topic 9: Inverse Kinematics

### Lesson Outline
- Definition: IK maps a desired end-effector pose → joint angles
- Why IK is harder than FK: non-uniqueness (multiple solutions), singularities, no-solution regions
- Geometric (analytic) IK: closed-form solution for specific morphologies (2-DOF planar, 6-DOF with spherical wrist)
- Pieper's condition: a 6-DOF arm with three consecutive revolute joints meeting at a point has a closed-form IK solution
- Numerical IK: Jacobian-based iterative methods — Jacobian transpose, pseudo-inverse, damped least squares (DLS)
- Damped least squares: Δ**q** = Jᵀ(JJᵀ + λ²I)⁻¹ Δ**x** — the λ parameter prevents blow-up near singularities
- Null-space motion: redundant robots (DOF > 6) have extra DOF for secondary objectives (joint limit avoidance)
- Pitfall: numerical IK can converge to the wrong solution or diverge near singularities

### Key Takeaways
- IK maps from task space to joint space; it is generally non-unique and may have no solution
- Closed-form IK is fast and exact but only available for specific geometries
- The pseudo-inverse J⁺ = Jᵀ(JJᵀ)⁻¹ minimizes joint velocity norm at non-singular configurations
- Damped least squares trades accuracy for numerical stability near singularities
- Redundant robots (DOF > task DOF) have a null space that can be exploited

### Related Topics
- Forward Kinematics
- Velocity Kinematics and the Jacobian
- Motion Planning Algorithms

### Further Learning
- Modern Robotics Ch. 6 (free): https://modernrobotics.northwestern.edu/
- Search query: `damped least squares inverse kinematics Nakamura Hanafusa`
- Search query: `Pieper condition 6-DOF robot closed form IK spherical wrist`
- Search query: `null space projection redundant manipulator IK tutorial`

### Check Understanding

**(a) Multiple Choice**
A 2-DOF planar robot has a desired end-effector position. How many distinct joint angle solutions typically exist?
- 0 — None; IK is always unsolvable for planar robots
- 1 — Exactly one
- 2 — **Two (elbow-up and elbow-down)** ✓
- 3 — Infinitely many

> For a reachable 2-DOF planar target, there are generically two solutions. On the workspace boundary there is exactly one. Beyond the workspace there is none.

**(b) True / False**
**Statement:** Increasing the damping parameter λ in damped least squares IK always improves end-effector accuracy.
**Answer:** False.
> Larger λ increases numerical stability near singularities but introduces a position error — the end-effector no longer converges exactly to the target.

**(c) Numeric Problem**
A 2-DOF arm has L₁ = L₂ = 1 m. The target is (x, y) = (1, 0). Compute both IK solutions.

**Expected answer:**
- cos θ₂ = (x² + y² − L₁² − L₂²) / (2L₁L₂) = (1 + 0 − 1 − 1) / 2 = −0.5
- θ₂ = ±120°
- For θ₂ = +120°: θ₁ ≈ −30°; for θ₂ = −120°: θ₁ ≈ +30°.
- Tolerance: ±1°.

### Decision Scenario
Your 6-DOF robot arm needs to run IK 500 times per second for real-time teleoperation, and the robot has a spherical wrist (Pieper's condition holds).

- A — Use a general numerical Jacobian pseudo-inverse because it is more flexible
- B — Use a randomized sampling approach for diversity of solutions
- C — **Use the closed-form analytic solution enabled by the spherical wrist geometry** ✓
- D — Pre-compute and store all IK solutions in a lookup table

> When Pieper's condition holds, the closed-form solution runs in microseconds with no convergence risk. Lookup tables are impractical in 6D configuration space.

---

## Topic 10: Velocity Kinematics and the Jacobian

### Lesson Outline
- The Jacobian matrix J(**q**) relates joint velocities to end-effector velocities: **ẋ** = J(**q**)**q̇**
- Geometric Jacobian (linear + angular velocity) vs. analytic Jacobian (derivative of pose parameterization)
- Computing the geometric Jacobian column-by-column for revolute and prismatic joints
- Kinematic singularities: when det(J) = 0; physical interpretation as loss of motion in a task-space direction
- Manipulability measure: w = √(det(JJᵀ)) — a scalar measure of distance from singularity
- Using the Jacobian for resolved-rate control: **q̇** = J⁺ **ẋ**_desired
- Static force relationship (duality): **τ** = Jᵀ**f** — Jacobian transpose maps end-effector forces to joint torques
- Pitfall: the analytic Jacobian becomes singular at Euler angle gimbal lock

### Key Takeaways
- The Jacobian is a configuration-dependent matrix — recompute it at every control cycle
- Singularities are configurations where the robot loses ability to move in one or more task directions
- **τ** = Jᵀ**f** is the foundation of force control and impedance control
- Manipulability w measures proximity to singularity; maximize it in motion planning when possible
- The pseudo-inverse minimizes ‖**q̇**‖² for a desired **ẋ**

### Related Topics
- Forward Kinematics
- Inverse Kinematics
- Robot Dynamics
- Feedback Control and PID

### Further Learning
- Modern Robotics Ch. 5 (free): https://modernrobotics.northwestern.edu/
- *A Mathematical Introduction to Robotic Manipulation*, Murray et al. (free): https://www.cds.caltech.edu/~murray/mlswiki/
- Search query: `Jacobian singularity manipulability measure robotics tutorial`
- Search query: `resolved rate motion control robot manipulator Jacobian`

### Check Understanding

**(a) Multiple Choice**
A robot's Jacobian J is 6×6 and det(J) = 0 at the current configuration. What does this mean physically?
- 0 — The robot is at its maximum speed
- 1 — The robot has infinite force at its end-effector
- 2 — **The robot cannot move in one or more end-effector directions** ✓
- 3 — The joint velocities are maximized

> A zero determinant means J is rank-deficient. The end-effector has lost the ability to generate velocity in at least one Cartesian direction.

**(b) True / False**
**Statement:** The force/torque duality **τ** = Jᵀ**f** implies that at a singularity, the robot can exert infinite force in the singular direction.
**Answer:** True (with nuance).
> At a singularity, mechanical advantage becomes theoretically infinite — a small joint torque maps to a very large force. In practice, structural limits prevent true infinite force.

**(c) Numeric Problem**
For a 2-DOF planar arm at θ₁ = 0°, θ₂ = 0° (fully extended), L₁ = L₂ = 1 m:J = [,
]
Compute det(J).
**Expected answer:** det = 0×1 − 0×2 = 0. This is a singularity. Tolerance: Exact.

### Decision Scenario
During real-time trajectory execution, your 6-DOF robot approaches a singularity. The manipulability drops toward zero and the pseudo-inverse begins producing very large joint velocities.

- A — Ignore the issue; joints will physically limit themselves
- B — Increase the desired end-effector speed to pass through the singularity faster
- C — **Apply damped least squares (add λ²I to the inversion) to limit joint velocities near the singularity** ✓
- D — Switch to open-loop control until the singularity passes

> Damped least squares is the standard engineering solution for near-singular configurations. It trades a small position tracking error for bounded joint velocities.

---

## Topic 11: Robot Dynamics

### Lesson Outline
- Difference between kinematics (motion without forces) and dynamics (motion caused by forces)
- Newton-Euler recursive formulation: outward pass (velocities, accelerations) then inward pass (forces, torques)
- Lagrangian formulation: L = T − V; equations of motion d/dt(∂L/∂q̇ᵢ) − ∂L/∂qᵢ = τᵢ
- The standard manipulator dynamic equation: M(**q**)**q̈** + C(**q**,**q̇**)**q̇** + **g**(**q**) = **τ**
- Inertia matrix M: symmetric, positive definite; reflects how mass distribution changes with configuration
- Coriolis/centrifugal matrix C: velocity-dependent torques
- Gravity vector **g**: configuration-dependent gravitational torques
- Feedforward torque control: **τ** = M(**q**)**q̈**_d + C(**q**,**q̇**)**q̇**_d + **g**(**q**)
- Pitfall: ignoring dynamics is acceptable at low speed but causes instability at high speed or high payload

### Key Takeaways
- The manipulator equation M**q̈** + C**q̇** + **g** = **τ** fully describes robot dynamics for rigid bodies
- Inverse dynamics computes required torques for a desired trajectory — the core of feedforward control
- At slow speeds, C**q̇** is negligible; at high speeds, it dominates
- Gravity compensation alone dramatically improves arm feel during teleoperation
- The inertia matrix M(**q**) is always positive definite

### Related Topics
- Actuators and Drive Systems
- Velocity Kinematics and the Jacobian
- Feedback Control and PID
- Trajectory Generation and Optimization

### Further Learning
- Modern Robotics Ch. 8 (free): https://modernrobotics.northwestern.edu/
- The Construct "Robot Dynamics and Control": https://www.theconstruct.ai/robotigniteacademy_learnros/ros-courses-library/robotics-robot-dynamics-control/
- Search query: `Lagrangian dynamics robot manipulator derivation tutorial`
- Search query: `Newton Euler recursive algorithm robot dynamics`

### Check Understanding

**(a) Multiple Choice**
Which term in M**q̈** + C**q̇** + **g** = **τ** represents configuration-dependent gravitational effects?
- 0 — M**q̈**
- 1 — C**q̇**
- 2 — **g**(**q**) ✓
- 3 — **τ**

> **g**(**q**) is the gravity torque vector — it depends only on joint position (configuration), not velocity or acceleration.

**(b) True / False**
**Statement:** The inertia matrix M(**q**) is constant for all robot configurations.
**Answer:** False.
> As the robot changes configuration, the mass distribution relative to each joint changes, altering the effective inertia. Only for a single-link robot rotating about a fixed axis is the inertia truly constant.

**(c) Numeric Problem**
A single-DOF robot (mass m = 2 kg at tip, length L = 0.5 m) is at angle θ = 30° from horizontal. Compute the gravity torque τ_g to hold it stationary. (g = 9.81 m/s²)
**Expected answer:** τ_g = mgL cos θ = 2 × 9.81 × 0.5 × cos 30° = 9.81 × 0.866 ≈ 8.50 N·m. Tolerance: ±0.05 N·m.

### Decision Scenario
You are programming a robot arm to perform fast pick-and-place at 2 cycles/second. During testing, the arm overshoots significantly at high speed despite good performance at low speed. The controller is PD-based with no feedforward.

- A — Increase the derivative gain to suppress overshoot
- B — Reduce the robot speed to where PD works
- C — **Add inverse dynamics feedforward torque to handle Coriolis and inertia effects at high speed** ✓
- D — Add more gear reduction to increase mechanical damping

> At high speed, Coriolis and centrifugal terms dominate and cannot be canceled by a simple PD controller. Feedforward inverse dynamics preemptively compensates these terms.

---

## Topic 12: Feedback Control and PID

### Lesson Outline
- What feedback control is: measuring the system output and using the error to drive the input
- Proportional (P) control: u = K_p·e; fast but steady-state error for many systems
- Integral (I) control: u = K_i·∫e dt; eliminates steady-state error but can cause windup and oscillation
- Derivative (D) control: u = K_d·ė; adds damping, predicts trends, sensitive to noise
- The complete PID law: u(t) = K_p·e(t) + K_i·∫₀ᵗ e(τ)dτ + K_d·ė(t)
- Discretization for implementation: forward Euler, backward Euler, and the anti-windup integrator clamp
- Transfer functions and Laplace domain: why G(s) notation appears in control literature
- Stability: Bode plot intuition — gain margin and phase margin; why both must be positive
- Cascade (inner–outer loop) control: velocity inner loop + position outer loop
- Pitfall: tuning PID by trial and error on hardware without a simulation model risks damage

### Key Takeaways
- PID combines proportional (speed), integral (accuracy), and derivative (damping) actions
- Integral windup must be guarded against: clamp the integrator when the actuator saturates
- Derivative action amplifies measurement noise — low-pass filter the derivative term
- Cascade control (velocity inside position) is more robust than a single-loop position PID
- A phase margin > 45° and gain margin > 6 dB are common stability targets

### Related Topics
- Actuators and Drive Systems
- Robot Dynamics
- Velocity Kinematics and the Jacobian
- Embedded Computing and Robot Programming Basics

### Further Learning
- Search query: `PID controller tuning robotics Ziegler Nichols tutorial`
- MIT OpenCourseWare 6.003 Signals and Systems: https://ocw.mit.edu/courses/6-003-signals-and-systems-fall-2011/
- *Control Systems Engineering*, Norman Nise — search query: `Nise Control Systems Engineering 8th edition`
- Search query: `cascade PID control robot joint velocity position loop`

### Check Understanding

**(a) Multiple Choice**
Your robot joint has persistent steady-state position error even after tuning K_p to a high value. What should you add?
- 0 — Higher K_d
- 1 — **Integral term (K_i)** ✓
- 2 — A lower control loop frequency
- 3 — More mechanical damping

> Steady-state error under constant load is eliminated by integral action, which accumulates until the error is driven to zero.

**(b) True / False**
**Statement:** Increasing the proportional gain K_p indefinitely will always improve control performance.
**Answer:** False.
> Beyond a critical gain, the closed-loop system becomes oscillatory and eventually unstable due to phase lag in the system.

**(c) Numeric Problem**
A discrete PID with K_p = 10, K_i = 0.5, K_d = 2, Δt = 0.01 s. At current step: e = 0.2 m, e_prev = 0.22 m, accumulated integral ∫e = 0.05 m·s. Compute the PID output.
**Expected answer:**
u = 10(0.2) + 0.5(0.05) + 2·(0.2 − 0.22)/0.01 = 2.0 + 0.025 + 2·(−2) = 2.0 + 0.025 − 4.0 = **−1.975**
Tolerance: ±0.01.

### Decision Scenario
A robot joint overshoots its target by 15% and oscillates for 3 seconds before settling. Current gains: K_p = 50, K_i = 0, K_d = 0.

- A — Increase K_p to 100 to make the response faster
- B — Set K_i = 5 to eliminate the oscillation
- C — **Add derivative action (K_d > 0) to damp the oscillation without sacrificing speed** ✓
- D — Reduce the control frequency to 10 Hz

> Overshoot and oscillation in a P-only controller indicate insufficient damping. Adding K_d introduces a damping force proportional to rate-of-change of error.

---

## Topic 13: Mobile Robot Kinematics and Odometry

### Lesson Outline
- Mobile robot configurations: differential drive, omnidirectional (holonomic), Ackermann (car-like), tracked
- Holonomic vs. non-holonomic constraints: a differential drive robot cannot instantaneously move sideways
- Differential drive kinematics: v = (v_R + v_L)/2, ω = (v_R − v_L)/b where b is the wheel separation
- Pose integration (odometry): numerically integrating (ẋ, ẏ, θ̇) over time to estimate position
- Odometry error accumulation: sources (wheel slip, encoder resolution, uneven terrain) and why odometry alone drifts unboundedly
- Instantaneous center of curvature (ICC) and turning radius R = (b/2)·(v_R+v_L)/(v_R−v_L)
- Velocity commands as the standard interface: linear velocity v and angular velocity ω
- Pitfall: integrating heading error causes quadratic growth in position error; heading accuracy is critical

### Key Takeaways
- Non-holonomic constraints reduce instantaneous motion freedom but not reachable configurations
- Odometry accumulates unbounded error over time — correct with absolute sensing (LiDAR, cameras, beacons)
- Differential drive is simple, low-cost, and zero-turning-radius; Ackermann provides stable high-speed motion
- A 1° heading error over 100 m produces ~1.75 m lateral displacement
- Omnidirectional robots are holonomic, enabling simpler motion planning

### Related Topics
- Coordinate Frames and Rigid Body Transformations
- Sensors and Transducers
- State Estimation and Kalman Filtering
- Simultaneous Localization and Mapping

### Further Learning
- *Probabilistic Robotics*, Thrun et al. Ch. 5 — search query: `Thrun Probabilistic Robotics odometry motion model`
- Search query: `differential drive robot kinematics odometry derivation`
- Search query: `non-holonomic constraints mobile robot unicycle model`
- Modern Robotics Ch. 13 (free): https://modernrobotics.northwestern.edu/

### Check Understanding

**(a) Multiple Choice**
A differential drive robot has b = 0.3 m, v_R = 0.4 m/s, v_L = 0.2 m/s. What is ω?
- 0 — 0.3 rad/s
- 1 — 1.0 rad/s
- 2 — **0.667 rad/s** ✓
- 3 — 2.0 rad/s

> ω = (v_R − v_L) / b = (0.4 − 0.2) / 0.3 = 0.667 rad/s.

**(b) True / False**
**Statement:** A non-holonomic robot cannot eventually reach any configuration in its free space.
**Answer:** False.
> Non-holonomic constraints restrict instantaneous velocities, not reachable configurations. A car cannot slide sideways, but it can parallel-park into any spot given enough maneuvers.

**(c) Numeric Problem**
A robot starts at pose (0, 0, 0°). It drives at v = 0.5 m/s, ω = 0 rad/s for 4 seconds. What is its final pose?
**Expected answer:** (x, y, θ) = (2.0 m, 0, 0°). Tolerance: ±0.01 m, ±0.1°.

### Decision Scenario
Your warehouse robot has been driving for 30 minutes using wheel odometry alone. Position error has grown to ~0.8 m. It needs to dock accurately at a charging station.

- A — Trust the odometry; 0.8 m is close enough for docking
- B — Reset odometry to zero at the docking station every 30 minutes manually
- C — **Fuse wheel odometry with LiDAR scan matching or fiducial markers to correct position before docking** ✓
- D — Increase encoder resolution to reduce odometry error

> Odometry drift is irreducible over long distances — higher resolution encoders help marginally but cannot eliminate wheel slip or terrain variation.

---

# Stage 3 — Advanced

---

## Topic 14: State Estimation and Kalman Filtering

### Lesson Outline
- Why state estimation is necessary: all sensors are noisy, all models are imperfect
- The Bayesian estimation framework: belief as a probability distribution; predict–update cycle
- Gaussian state representation: mean **x̂** and covariance P
- Linear Kalman filter (KF): assumptions (linear dynamics, Gaussian noise), the five equations
  - Predict: **x̂**⁻ = A**x̂**, P⁻ = APA ᵀ + Q
  - Update: K = P⁻Hᵀ(HP⁻Hᵀ + R)⁻¹, **x̂** = **x̂**⁻ + K(**z** − H**x̂**⁻), P = (I − KH)P⁻
- Extended Kalman Filter (EKF): linearize nonlinear systems via Jacobians at the current estimate
- Unscented Kalman Filter (UKF): sigma-point propagation for highly nonlinear systems
- Sensor fusion with multiple sensors: different sensors update different parts of the state
- Observability: if the state cannot be inferred from measurements even in principle, no filter will work
- Pitfall: filter divergence when Q or R covariances are badly tuned

### Key Takeaways
- The Kalman gain K = P⁻Hᵀ(HP⁻Hᵀ + R)⁻¹ balances trust in prediction vs. measurement
- The EKF linearizes around the current estimate; it can diverge if nonlinearities are severe
- Sensor fusion is simply multiple measurement update steps at different rates
- A well-tuned Q (process noise) and R (measurement noise) covariance matrix is critical
- Observability is a structural property: check it before designing a filter

### Related Topics
- Sensors and Transducers
- Mobile Robot Kinematics and Odometry
- Simultaneous Localization and Mapping
- Robot Perception and Computer Vision

### Further Learning
- *Probabilistic Robotics*, Thrun, Burgard, Fox — search query: `Thrun Probabilistic Robotics Kalman filter chapter`
- Search query: `extended Kalman filter robot localization tutorial derivation`
- Search query: `unscented Kalman filter sigma points vs EKF comparison`
- *State Estimation for Robotics*, Timothy Barfoot (free draft): https://www.cambridge.org/core/books/state-estimation-for-robotics/

### Check Understanding

**(a) Multiple Choice**
What does a large measurement noise covariance R tell the Kalman filter?
- 0 — Trust the measurement more than the prediction
- 1 — The process model is very accurate
- 2 — **Trust the prediction more; the measurement is noisy** ✓
- 3 — Run the filter at a lower frequency

> Large R means the sensor is unreliable. The Kalman gain K decreases, giving more weight to the prior prediction and less to the noisy measurement.

**(b) True / False**
**Statement:** The Extended Kalman Filter is always more accurate than the standard Kalman Filter for nonlinear systems.
**Answer:** False.
> The EKF is more capable than the linear KF (which requires linear systems), but EKF linearization errors can cause it to diverge in highly nonlinear systems. The UKF or particle filter may outperform the EKF in those cases.

**(c) Numeric Problem**
A 1D Kalman filter has prior estimate x̂⁻ = 5.0 m, P⁻ = 2.0 m², measurement z = 4.5 m, R = 1.0 m², H = 1. Compute K, updated estimate x̂, and updated covariance P.
**Expected answer:**
- K = P⁻Hᵀ / (HP⁻Hᵀ + R) = 2.0 / (2.0 + 1.0) = 0.667
- x̂ = 5.0 + 0.667·(4.5 − 5.0) = 5.0 − 0.333 = **4.667 m**
- P = (1 − K·H)·P⁻ = (1 − 0.667)·2.0 = 0.333·2.0 = **0.667 m²**
- Tolerance: ±0.01.

### Decision Scenario
Your robot fuses an IMU (200 Hz, drifts over time) with a LiDAR pose estimate (5 Hz, accurate but slow). You need smooth, high-rate pose estimates.

- A — Use LiDAR pose directly at 5 Hz and interpolate linearly
- B — Use IMU integration alone since it is faster
- C — **Run an EKF: predict at 200 Hz using IMU, update at 5 Hz using LiDAR scan-match pose** ✓
- D — Average the IMU and LiDAR outputs at 5 Hz

> This is the canonical multi-rate sensor fusion pattern. The EKF prediction step integrates IMU data at high rate; the LiDAR update corrects accumulated drift at low rate. The result is smooth, bounded-error pose estimation.

---

## Topic 15: Simultaneous Localization and Mapping

### Lesson Outline
- The SLAM problem: a robot in an unknown environment must build a map and localize within it simultaneously — a chicken-and-egg problem
- Why SLAM is hard: map errors corrupt localization; localization errors corrupt the map
- Filter-based SLAM (EKF-SLAM): augmented state vector (robot pose + all landmark positions); computational cost grows quadratically O(n²) with landmark count
- Particle filter SLAM (FastSLAM): factorize the joint distribution; each particle carries its own map; scales better
- Graph-based SLAM (the modern standard): nodes are robot poses; edges are relative measurements; back-end solves a sparse nonlinear least squares problem
- Loop closure: recognizing a previously visited place and adding a constraint to correct accumulated drift — the critical step
- Occupancy grid mapping: discretize space into cells, each with a probability of being occupied; log-odds update rule
- Front-end vs. back-end: front-end extracts relative constraints from sensor data; back-end optimizes the pose graph
- Pitfall: a single false loop closure can catastrophically corrupt the map; robust data association is essential

### Key Takeaways
- SLAM must jointly solve map estimation and localization — treating them independently leads to inconsistency
- Graph SLAM (iSAM, GTSAM, g²o) is the dominant modern approach: sparse, efficient, and accurate
- Loop closure is what bounds long-term drift; without it, error grows without limit
- Occupancy grids are the most practical map representation for navigation; point clouds for 3D environments
- Dense 3D SLAM (LiDAR SLAM, visual SLAM) is computationally expensive but enables rich environment models

### Related Topics
- Mobile Robot Kinematics and Odometry
- State Estimation and Kalman Filtering
- Sensors and Transducers
- Path Planning for Mobile Robots

### Further Learning
- *Probabilistic Robotics*, Thrun et al. Ch. 10–11 — search query: `Thrun Probabilistic Robotics SLAM chapter occupancy grid`
- Search query: `graph SLAM tutorial pose graph optimization g2o`
- Search query: `FastSLAM particle filter landmark SLAM tutorial`
- Search query: `loop closure detection place recognition robotics`

### Check Understanding

**(a) Multiple Choice**
What is the primary purpose of loop closure in SLAM?
- 0 — To increase the map resolution
- 1 — To add new landmarks to the map
- 2 — **To correct accumulated drift by recognizing a previously visited place** ✓
- 3 — To reduce sensor noise

> Without loop closure, odometry and scan-matching errors accumulate unboundedly. Loop closure adds a constraint between the current pose and an earlier pose at the same location, enabling global optimization to correct the entire trajectory.

**(b) True / False**
**Statement:** EKF-SLAM is the preferred method for large-scale environments with thousands of landmarks.
**Answer:** False.
> EKF-SLAM's computational cost scales as O(n²) in the number of landmarks. For large-scale maps, graph-based SLAM or particle-filter SLAM (FastSLAM) is used because they exploit sparsity and scale much better.

**(c) Short Problem**
An occupancy grid cell has log-odds value l = 0.5 (prior). A LiDAR ray terminates at this cell, giving a hit measurement with log-odds update l_meas = 0.9. What is the new log-odds value?
**Expected answer:** l_new = l + l_meas − l_prior = 0.5 + 0.9 − 0.0 = 1.4 (using 0.0 as the zero-information prior in log-odds). Accept l_new = 0.5 + 0.9 = 1.4 (additive log-odds update). Tolerance: ±0.05.

### Decision Scenario
You are deploying a mobile robot in a large warehouse (200 m × 100 m) with a 2D LiDAR. The robot must autonomously build a map over 2 hours and then navigate using that map.

- A — Use dead-reckoning odometry only; the warehouse is structured
- B — Use EKF-SLAM with reflective tape landmarks on the walls
- C — **Use LiDAR-based graph SLAM with scan-matching edges and loop closure detection** ✓
- D — Pre-survey the warehouse manually and load a static map

> Graph SLAM with scan-matching is the industry standard for this scenario. It scales to large environments, handles loop closure, and does not require infrastructure like reflective tape. Pre-surveying requires manual effort and cannot handle any changes in the environment.

---

## Topic 16: Robot Perception and Computer Vision

### Lesson Outline
- The perception pipeline: raw sensor data → features → objects → scene understanding
- Camera models: the pinhole model, intrinsic matrix K, lens distortion (radial, tangential)
- Camera calibration: checkerboard method to estimate K and distortion coefficients
- Image processing basics: grayscale conversion, Gaussian blur, edge detection (Sobel, Canny)
- Feature detection and description: corners (Harris, Shi-Tomasi), blobs (SIFT, ORB); keypoint matching
- Depth estimation: structured light, stereo matching (disparity map), monocular depth estimation
- Object detection: classical (HOG + SVM) vs. deep learning (single-stage detectors, anchor-free methods); bounding boxes, confidence scores, non-maximum suppression
- Semantic segmentation: assigning a class label to every pixel; instance segmentation distinguishes individual objects
- Point cloud processing: voxel grids, normal estimation, ICP (Iterative Closest Point) for alignment
- Pitfall: a model that performs well in lab lighting will fail under warehouse fluorescents or outdoor sun; domain shift is the leading cause of perception failure in deployment

### Key Takeaways
- The intrinsic matrix K encodes focal length and principal point; it must be calibrated per camera
- Feature matching is the foundation of visual odometry, SLAM front-ends, and object recognition
- Deep learning detectors outperform classical methods in accuracy but require large labeled datasets and GPU inference
- ICP aligns two point clouds iteratively; it requires a good initial guess to avoid local minima
- Always test perception in the deployment environment, not just the training environment

### Related Topics
- Sensors and Transducers
- State Estimation and Kalman Filtering
- Simultaneous Localization and Mapping
- Manipulation and Grasping

### Further Learning
- *Multiple View Geometry in Computer Vision*, Hartley & Zisserman — search query: `Hartley Zisserman Multiple View Geometry Computer Vision Cambridge`
- Search query: `camera calibration pinhole model intrinsic matrix tutorial`
- Search query: `ORB feature detector descriptor robotics real-time`
- Search query: `ICP iterative closest point point cloud alignment tutorial`

### Check Understanding

**(a) Multiple Choice**
Which component of the camera intrinsic matrix K encodes the focal length along the x-axis?
- 0 — The principal point offset c_x
- 1 — The skew coefficient
- 2 — **f_x, the focal length in pixels along x** ✓
- 3 — The distortion coefficient k₁

> K = [[f_x, 0, c_x], [0, f_y, c_y], [0, 0, 1]]. f_x converts metric depth to pixel coordinates along x. c_x and c_y are the principal point (image center offset).

**(b) True / False**
**Statement:** A deep learning object detector trained on indoor lab images will reliably detect the same objects outdoors without retraining.
**Answer:** False.
> Domain shift (differences in lighting, background, scale, and viewpoint) causes significant performance degradation. Models must be fine-tuned or retrained with representative data from the deployment environment.

**(c) Numeric Problem**
A camera has focal length f_x = 600 pixels. A known object of width W = 0.1 m appears w = 30 pixels wide in the image. Estimate the object's depth Z.
**Expected answer:** Z = f_x · W / w = 600 × 0.1 / 30 = **2.0 m**. Tolerance: ±0.05 m.

### Decision Scenario
Your robot must pick randomly oriented bolts from a bin. You have a depth camera overhead. You need to detect bolt positions and orientations in real time at 10 Hz.

- A — Use color thresholding; bolts are shiny silver
- B — Use a 2D bounding box detector; a rough position is sufficient
- C — **Use a 6-DOF pose estimation pipeline: detect bolts with a learned detector, then refine pose with ICP on the depth point cloud** ✓
- D — Use GPS to locate each bolt

> 6-DOF pose (position + orientation) is required to plan a grasp. Color thresholding is too fragile; 2D bounding boxes lack orientation; GPS is irrelevant at centimeter scale. ICP refinement on depth data is the standard approach for bin-picking.

---

## Topic 17: Path Planning for Mobile Robots

### Lesson Outline
- Planning problem definition: given start, goal, and a map, find a collision-free path
- Configuration space (C-space): representing the robot's degrees of freedom as a point; obstacles become C-space obstacles
- Grid-based search: Dijkstra's algorithm (optimal, exhaustive), A* (optimal with admissible heuristic), D* Lite (dynamic replanning)
- Sampling-based planning: Probabilistic Roadmap (PRM) for multi-query planning; Rapidly-exploring Random Trees (RRT) for single-query planning; RRT* for asymptotically optimal paths
- Potential field methods: attractive potential toward goal + repulsive potential from obstacles; fast but prone to local minima
- Voronoi diagrams: plan in the maximally-clearance roadmap; safe but not shortest path
- Inflation of obstacles: expanding C-space obstacles by robot radius to reduce robot to a point
- Pitfall: sampling-based planners are probabilistically complete but not always optimal without RRT*; they may return unnecessarily long paths

### Key Takeaways
- A* is the standard for grid-based path planning; its heuristic must be admissible (never overestimates)
- RRT and PRM are the workhorses for high-dimensional C-spaces where grids are intractable
- Obstacle inflation converts the robot to a point particle, simplifying collision checking
- Potential fields are fast for reactive avoidance but can trap the robot at local minima
- Path planning finds a geometric path; trajectory planning adds timing (velocity profiles)

### Related Topics
- Simultaneous Localization and Mapping
- Trajectory Generation and Optimization
- Mobile Robot Kinematics and Odometry
- Motion Planning Algorithms

### Further Learning
- *Principles of Robot Motion*, Choset et al. — search query: `Choset Principles Robot Motion Theory Algorithms Implementations`
- Search query: `A* pathfinding algorithm grid map robotics tutorial`
- Search query: `RRT rapidly exploring random tree motion planning tutorial`
- *Planning Algorithms*, Steven LaValle (free): http://planning.cs.uiuc.edu/

### Check Understanding

**(a) Multiple Choice**
A* uses a heuristic h(n) to guide search. For a grid map with 8-directional movement, which heuristic is admissible?
- 0 — Manhattan distance (4-direction)
- 1 — **Euclidean distance** ✓
- 2 — The number of obstacles in the row
- 3 — A random positive number

> Euclidean distance never overestimates the true cost (it is the shortest possible path), making it admissible. Manhattan distance overestimates for 8-directional grids (diagonals are shorter). Random values are neither admissible nor consistent.

**(b) True / False**
**Statement:** RRT* is guaranteed to find the globally optimal path given enough computation time.
**Answer:** True.
> RRT* is asymptotically optimal: as the number of samples approaches infinity, the solution converges to the optimal path. In practice, it gives near-optimal solutions in finite time much faster than exhaustive search.

**(c) Short Problem**
A grid map has unit-cost edges. A* expands a node at (3, 4) with g(n) = 7 (cost so far) and h(n) = 5 (Euclidean heuristic to goal). What is f(n)?
**Expected answer:** f(n) = g(n) + h(n) = 7 + 5 = **12**. Tolerance: Exact.

### Decision Scenario
You are planning paths for a robot arm with 7 DOF in a cluttered environment. The arm must avoid several irregularly shaped obstacles. You need to plan 50 ms after receiving a new goal.

- A — Use A* on a 7D grid; it is optimal and complete
- B — Use a potential field; it is fast and simple
- C — **Use RRT or RRT* in the 7D configuration space; it handles high dimensions efficiently** ✓
- D — Enumerate all possible joint angle combinations and pick the shortest

> A 7D grid is computationally intractable (curse of dimensionality). Potential fields risk local minima in cluttered spaces. RRT-family planners are specifically designed for high-dimensional C-spaces with fast, probabilistically complete planning.

---

## Topic 18: Trajectory Generation and Optimization

### Lesson Outline
- Difference between path and trajectory: a path is geometric; a trajectory adds a time law (velocity, acceleration profiles)
- Polynomial trajectories: cubic (position + velocity BCs), quintic (+ acceleration BCs); coefficients from boundary conditions
- Trapezoidal velocity profiles: constant acceleration → constant velocity → constant deceleration; widely used in industrial robots
- S-curve profiles: smooth trapezoidal using jerk limits; reduces mechanical vibration
- Minimum-time vs. minimum-jerk trade-offs: faster cycles vs. smoother motion and reduced wear
- Multi-segment trajectories: concatenating segments with continuity constraints (C1, C2 continuity)
- Spline-based trajectories: cubic splines, B-splines for smooth multi-waypoint trajectories
- Trajectory optimization: formulate as constrained optimization problem minimizing cost (time, energy, jerk) subject to joint limits, velocity limits, and collision constraints
- Pitfall: a kinematically feasible path does not imply a dynamically feasible trajectory; always check torque and velocity limits

### Key Takeaways
- A cubic polynomial has 4 coefficients and satisfies 4 BCs (position and velocity at start and end)
- A quintic polynomial adds 2 more BCs (acceleration at start and end), giving smooth acceleration profiles
- Trapezoidal profiles are computationally cheap and sufficient for most industrial applications
- Jerk (rate of change of acceleration) is the primary cause of structural vibration in robot arms
- Trajectory optimization can produce near time-optimal motions while respecting all system constraints

### Related Topics
- Robot Dynamics
- Path Planning for Mobile Robots
- Feedback Control and PID
- Motion Planning Algorithms

### Further Learning
- Search query: `cubic quintic polynomial trajectory planning robot joint space`
- Search query: `trapezoidal velocity profile jerk limited trajectory robotics`
- Search query: `trajectory optimization TOPP time optimal path parameterization`
- Modern Robotics Ch. 9 (free): https://modernrobotics.northwestern.edu/

### Check Understanding

**(a) Multiple Choice**
A cubic polynomial trajectory θ(t) = a₀ + a₁t + a₂t² + a₃t³ must satisfy: θ(0) = 0, θ(T) = 1, θ̇(0) = 0, θ̇(T) = 0 with T = 2 s. How many equations are available to find the four coefficients?
- 0 — 2
- 1 — 3
- 2 — **4** ✓
- 3 — 6

> A cubic has exactly 4 coefficients. The four boundary conditions (position at start/end, velocity at start/end) give exactly 4 equations — a fully determined system.

**(b) True / False**
**Statement:** A path that avoids all obstacles in configuration space is guaranteed to be executable within the robot's joint velocity and torque limits.
**Answer:** False.
> A path is purely geometric. A trajectory adds time, velocity, and acceleration. A geometrically valid path may require velocities or torques that exceed hardware limits when traversed at a given speed. Trajectory optimization or time-scaling must check dynamic feasibility.

**(c) Numeric Problem**
A robot joint must move from 0 to 90° in 2 seconds using a cubic polynomial with zero start and end velocities. Compute the maximum angular velocity (which occurs at t = T/2).
**Expected answer:** θ̇_max = 1.5 × Δθ / T = 1.5 × 90° / 2 = **67.5°/s** (or ≈ 1.178 rad/s). Tolerance: ±0.5°/s.

### Decision Scenario
A robot arm must move between 8 waypoints as fast as possible while keeping vibration low enough that a camera on the wrist can capture sharp images at each waypoint.

- A — Use point-to-point trapezoidal profiles between each pair of waypoints with hard stops
- B — Use a minimum-time optimizer that ignores jerk
- C — **Fit a jerk-limited spline through all 8 waypoints and optimize timing subject to joint and jerk limits** ✓
- D — Command maximum joint velocity for the entire move and let the brakes stop the robot

> Hard stops at each waypoint waste time on deceleration/acceleration. Ignoring jerk causes vibration, blurring the camera. A smooth spline with jerk limits maintains mechanical stability and allows continuous motion while respecting hardware constraints.

---

## Topic 19: Motion Planning Algorithms

### Lesson Outline
- Distinction from path planning: motion planning considers dynamics, constraints, and uncertainty; path planning is often purely geometric
- Task and motion planning (TAMP): interleaving high-level task decisions with low-level motion plans
- Probabilistic completeness and resolution completeness: what guarantees different planners offer
- Bi-directional RRT (RRT-Connect): grow two trees simultaneously from start and goal; much faster in practice
- CHOMP (Covariant Hamiltonian Optimization for Motion Planning): gradient-based trajectory optimization on a functional space
- STOMP (Stochastic Trajectory Optimization): cost-function-based optimization using noisy rollouts; handles non-differentiable costs
- Manipulation planning: grasp pre-images, approach directions, and pre/post grasp trajectories
- Dynamic feasibility checking: verifying velocity, acceleration, and torque constraints along candidate trajectories
- Pitfall: decoupling task planning from motion planning leads to plans that are logically correct but physically unexecutable

### Key Takeaways
- RRT-Connect is typically 5–10× faster than standard RRT by growing trees from both ends
- CHOMP and STOMP optimize full trajectories jointly, naturally incorporating smoothness and obstacle avoidance costs
- TAMP is essential for multi-step manipulation tasks where the sequence of actions and the motions are interdependent
- Probabilistic completeness means the planner will find a solution if one exists, given enough time — not that it always runs fast
- Dynamic feasibility must be checked separately from geometric feasibility

### Related Topics
- Path Planning for Mobile Robots
- Trajectory Generation and Optimization
- Inverse Kinematics
- Manipulation and Grasping

### Further Learning
- *Planning Algorithms*, Steven LaValle (free): http://planning.cs.uiuc.edu/
- Search query: `RRT-Connect bidirectional motion planning Kuffner LaValle`
- Search query: `CHOMP trajectory optimization motion planning Ratliff`
- Search query: `task and motion planning TAMP survey robotics`

### Check Understanding

**(a) Multiple Choice**
RRT-Connect differs from standard RRT primarily because it:
- 0 — Uses a better heuristic to guide sampling
- 1 — Runs on a grid instead of a continuous space
- 2 — **Grows two trees simultaneously — one from the start and one from the goal — and connects them** ✓
- 3 — Guarantees an optimal path length

> RRT-Connect's bidirectional growth dramatically reduces the number of samples needed to find a connection. It is not optimal (RRT* would be needed for that) and works in continuous C-space, not grids.

**(b) True / False**
**Statement:** A probabilistically complete planner guarantees finding a solution in bounded time.
**Answer:** False.
> Probabilistic completeness means the probability of finding a solution approaches 1 as computation time approaches infinity. It makes no guarantee about how long it takes — only that the planner will not miss a solution that exists.

**(c) Short Problem**
Name the two primary cost terms that CHOMP minimizes, and explain what each one penalizes.
**Expected answer:**
1. **Obstacle cost** — penalizes trajectory configurations that are close to or inside obstacles (using a workspace potential field derived from the signed distance field).
2. **Smoothness cost** — penalizes high velocities and accelerations along the trajectory (the functional gradient norm), encouraging smooth, dynamically gentle motions.

### Decision Scenario
You are building a robot kitchen assistant that must pick up a mug, move it across a cluttered countertop, and place it on a shelf — a three-step task. Each step depends on the outcome of the previous one.

- A — Plan the full geometric path from start to shelf and execute it open-loop
- B — Solve IK for the final shelf pose and execute the arm directly
- C — **Use a Task and Motion Planner (TAMP) that reasons jointly about action sequences and generates collision-free motion plans for each step** ✓
- D — Use a potential field to continuously attract the robot toward the shelf

> TAMP is required because the feasibility of each motion (e.g., can the robot reach the shelf?) depends on earlier task decisions (e.g., which side of the mug was grasped). Pure geometric planners or potential fields cannot reason about this interdependency.

---

## Topic 20: Manipulation and Grasping

### Lesson Outline
- Manipulation taxonomy: pick-and-place, in-hand manipulation, tool use, deformable object handling
- Grasp types: power grasp (enveloping) vs. precision grasp (fingertip); implications for stability and dexterity
- Grasp quality metrics: Ferrari–Canny metric (largest perturbation wrench the grasp can resist), grasp isotropy
- Contact mechanics: point contact with friction (Coulomb friction cone), soft-finger contact; grasp wrench space
- Force closure and form closure: force closure requires friction to resist all wrenches; form closure does so purely geometrically
- Grasp planning: analytical methods for simple geometries; data-driven methods (GraspNet, 6-DOF GraspNet) for complex objects
- Bin picking: detecting and grasping randomly oriented objects from a heap; challenges of occlusion and collision
- In-hand manipulation: finger gaiting, rolling contacts, dexterous multi-finger manipulation
- Pitfall: grasps that pass simulation tests fail on hardware due to unmodeled surface friction, object compliance, and sensor calibration error

### Key Takeaways
- Force closure is the standard grasp quality criterion: a valid grasp must resist perturbations in all 6 wrench dimensions
- The Ferrari–Canny metric gives a single scalar quality score for a grasp
- Data-driven grasp planners generalize better to novel objects than analytic methods
- Contact friction is modeled as a friction cone; exceeding the cone boundary causes slip
- In-hand manipulation is an open research problem — most industrial robots avoid it by using fixtures

### Related Topics
- Robot Perception and Computer Vision
- Motion Planning Algorithms
- Robot Dynamics
- Trajectory Generation and Optimization

### Further Learning
- Search query: `force closure grasp quality Ferrari Canny metric robotics`
- Search query: `GraspNet 6-DOF grasp planning deep learning point cloud`
- Search query: `bin picking grasping tutorial robotic manipulation`
- *A Mathematical Introduction to Robotic Manipulation*, Murray et al. (free): https://www.cds.caltech.edu/~murray/mlswiki/

### Check Understanding

**(a) Multiple Choice**
A grasp achieves form closure. What additional property does force closure require that form closure does not?
- 0 — More contact points
- 1 — A larger end-effector
- 2 — **Friction at the contact points to resist all wrenches** ✓
- 3 — Knowledge of the object's mass

> Form closure constrains motion purely through geometry (like a peg in a hole). Force closure additionally relies on friction to resist forces and torques in all directions. Without friction, a form-closed grasp may still allow the object to slip.

**(b) True / False**
**Statement:** A grasp that achieves force closure in simulation is guaranteed to succeed on a real robot without further testing.
**Answer:** False.
> Simulation models idealized friction coefficients, rigid contacts, and perfect geometry. Real objects have surface variation, compliance, and the robot has calibration error. Simulation is a necessary but not sufficient test.

**(c) Short Problem**
A planar grasp applies two contact forces, each of magnitude 10 N, directed toward the object center from opposite sides. Is this a force-closure grasp for 2D perturbations? Why?
**Expected answer:** Yes — two opposing forces resist translation in the contact direction. If the contacts are not collinear with the object centroid, they also resist torque. With Coulomb friction, a small perturbation in any planar direction can be resisted by adjusting the normal and tangential force components within each friction cone. (Accept: "Yes, with appropriate friction at both contacts this is force-closed in 2D.")

### Decision Scenario
Your robot must pick irregularly shaped plastic parts from a bin. The parts arrive in random orientations. Your team debates between a custom-designed gripper matched to the part shape vs. a general-purpose two-finger gripper with a learned grasp planner.

- A — **Use the custom-designed gripper; it will be more reliable for this specific part at high throughput** ✓
- B — Use a five-finger dexterous hand for maximum flexibility
- C — Use a vacuum cup; it works on any surface
- D — Use the two-finger gripper with a learned planner only

> For a single known part in high-volume production, a custom-designed gripper (e.g., compliant fingers matched to the part profile) maximizes speed, reliability, and grasp success rate. The learned planner approach is better when part variety is high. Vacuum cups fail on porous or textured surfaces. Five-finger hands are slower and harder to program.

---

# Stage 4 — Expert / Capstone

---

## Topic 21: Robot Learning and Reinforcement Learning

### Lesson Outline
- Why classical control and planning have limits: unmodeled dynamics, novel environments, contact-rich tasks
- Supervised learning for robotics: learning from demonstration (LfD), behavior cloning, imitation learning; pitfall of distribution shift
- Reinforcement learning (RL) fundamentals: Markov Decision Process (MDP), state S, action A, reward R, discount γ, policy π
- The Bellman equation: V(s) = max_a [R(s,a) + γ Σ P(s'|s,a) V(s')]
- Value-based methods: Q-learning, Deep Q-Network (DQN) — learning Q(s,a) as a neural network
- Policy gradient methods: REINFORCE, PPO (Proximal Policy Optimization) — directly optimize the policy
- Model-based RL: learn a dynamics model, plan within it; more sample-efficient but model error propagates
- Sim-to-real transfer: training in simulation, deploying on hardware; domain randomization to bridge the gap
- Reward shaping: designing reward functions is an art; sparse rewards cause slow learning; dense rewards can introduce unintended behavior
- Pitfall: RL policies are brittle outside the training distribution; always evaluate on out-of-distribution scenarios

### Key Takeaways
- Behavior cloning is the simplest LfD approach but suffers from compounding distribution shift errors at test time
- PPO is the most widely used on-policy RL algorithm for continuous robot control due to its stability
- Sim-to-real transfer requires domain randomization or adaptation; without it, the reality gap causes failure
- Reward engineering is as important as algorithm choice — a poorly designed reward produces unexpected behavior
- Model-based RL is more sample-efficient; model-free RL is simpler but requires millions of interactions

### Related Topics
- Robot Perception and Computer Vision
- Manipulation and Grasping
- Motion Planning Algorithms
- Autonomous System Integration and Safety

### Further Learning
- *Reinforcement Learning: An Introduction*, Sutton & Barto (free): http://incompleteideas.net/book/the-book-2nd.html
- Search query: `proximal policy optimization PPO robotics continuous control tutorial`
- Search query: `sim-to-real transfer domain randomization robot learning`
- Search query: `behavior cloning imitation learning distribution shift DAgger`

### Check Understanding

**(a) Multiple Choice**
A robot trained with behavior cloning on 1000 human demonstrations performs well initially but degrades badly over a 30-second task. What is the most likely cause?
- 0 — The neural network is too large
- 1 — The demonstrations were too short
- 2 — **Distribution shift: the robot encounters states not covered by demonstrations and has no recovery behavior** ✓
- 3 — The reward function was too sparse

> Behavior cloning trains only on expert states. When the robot deviates slightly, it enters out-of-distribution states where it has no training signal. Errors compound over time. DAgger (Dataset Aggregation) addresses this by collecting corrective demonstrations at failure states.

**(b) True / False**
**Statement:** A dense, carefully shaped reward function always leads to better RL training than a sparse binary reward.
**Answer:** False.
> A poorly shaped dense reward can cause the agent to optimize an unintended proxy (reward hacking). Sparse rewards are harder to learn from but avoid this pitfall. The ideal is a shaped reward that does not introduce unintended shortcuts.

**(c) Numeric Problem**
An MDP has two states. In state s, the agent takes action a, receives reward R = 10, transitions to terminal state s', and the discount factor γ = 0.9. There are no further rewards. Compute Q(s, a).
**Expected answer:** Q(s, a) = R + γ · V(s') = 10 + 0.9 × 0 = **10**. (V of a terminal state = 0.) Tolerance: Exact.

### Decision Scenario
Your robot must learn to assemble a small connector that requires precise finger movements and contact-rich interaction. Classical motion planning fails due to the tight tolerances. You must choose a learning approach.

- A — Use pure behavior cloning on 50 human demonstrations
- B — Use sparse-reward model-free RL from scratch in the real world
- C — **Use imitation learning (DAgger or GAIL) to bootstrap from demonstrations, then fine-tune with RL using a dense reward in simulation with domain randomization** ✓
- D — Solve it analytically using force-closure grasping theory

> Pure behavior cloning will suffer from distribution shift on the delicate assembly. Pure RL from scratch on hardware is sample-inefficient and risks hardware damage. The hybrid approach leverages demonstrations for fast initialization and RL for fine-tuning, with sim-to-real bridging the gap safely.

---

## Topic 22: Multi-Robot Systems and Coordination

### Lesson Outline
- Why multiple robots: parallelism, redundancy, tasks too large for a single robot (coverage, transport)
- Multi-robot architectures: centralized (one planner, full information), decentralized (each robot plans locally), distributed (local info + communication)
- Task allocation: market-based (auction algorithms), Hungarian algorithm for optimal assignment, threshold-based stimulus-response
- Formation control: leader–follower, virtual structure, behavior-based; maintaining geometric formations while navigating
- Consensus algorithms: all robots converge to a common value (heading, velocity) through local communication; convergence conditions
- Communication constraints: bandwidth limits, latency, packet loss; planning must be robust to communication failure
- Conflict resolution in shared workspaces: priority scheduling, velocity obstacles (VO), multi-agent path finding (MAPF)
- Swarm robotics: large numbers of simple robots with local rules producing emergent global behavior (flocking, foraging, self-assembly)
- Pitfall: centralized systems are brittle to single points of failure; decentralized systems can deadlock or thrash without proper conflict resolution

### Key Takeaways
- The Hungarian algorithm solves optimal task-to-robot assignment in O(n³) for n robots and n tasks
- Velocity obstacles define the set of robot velocities that will cause a collision; RVO (Reciprocal VO) prevents deadlocks
- MAPF finds collision-free paths for all agents simultaneously; it is NP-hard in general but tractable with approximations (CBS, ORCA)
- Consensus convergence requires the communication graph to be connected at all times
- Swarm behaviors emerge from simple local rules; they are robust to individual failures but hard to program for specific tasks

### Related Topics
- Path Planning for Mobile Robots
- State Estimation and Kalman Filtering
- Autonomous System Integration and Safety
- Robot Learning and Reinforcement Learning

### Further Learning
- Search query: `multi-agent path finding MAPF conflict based search CBS tutorial`
- Search query: `reciprocal velocity obstacles RVO multi-robot collision avoidance`
- Search query: `swarm robotics flocking emergent behavior survey`
- Search query: `Hungarian algorithm task allocation multi-robot assignment`

### Check Understanding

**(a) Multiple Choice**
The Hungarian algorithm solves which problem optimally for multi-robot systems?
- 0 — Finding collision-free paths for all robots simultaneously
- 1 — Synchronizing robot clocks over a network
- 2 — **Assigning n tasks to n robots to minimize total cost** ✓
- 3 — Estimating the positions of all robots from shared sensor data

> The Hungarian algorithm solves the linear assignment problem: match n agents to n tasks optimally in O(n³). Path finding and clock synchronization are separate problems.

**(b) True / False**
**Statement:** A centralized multi-robot planner is more robust to communication failures than a decentralized planner.
**Answer:** False.
> Centralized planners depend on a single central node. If it fails or loses communication with any robot, the entire system is compromised. Decentralized planners distribute intelligence, making the system more resilient to individual failures or communication drops.

**(c) Short Problem**
Three robots must complete three tasks. The cost matrix is:
Task1 Task2 Task3
Robot1: 4 8 7
Robot2: 2 5 3
Robot3: 6 1 4
By inspection or the Hungarian algorithm, find the optimal assignment and total cost.
**Expected answer:**
- Robot1 → Task1 (cost 4), Robot2 → Task3 (cost 3), Robot3 → Task2 (cost 1)
- Total cost = 4 + 3 + 1 = **8**. Tolerance: Exact.

### Decision Scenario
A warehouse needs 20 mobile robots to fulfill orders. Robots share aisles and must not collide. Orders arrive dynamically. You must choose a coordination architecture.

- A — Use a fully centralized planner that computes all 20 paths simultaneously at every order
- B — Let each robot plan independently with no communication
- C — **Use a distributed architecture: each robot plans locally, with a lightweight MAPF layer (e.g., CBS or ORCA) for real-time conflict resolution** ✓
- D — Run all 20 robots at half speed to reduce collision probability

> A fully centralized planner becomes a bottleneck and single point of failure at scale. No communication leads to deadlocks and collisions. ORCA or CBS with a distributed task allocator is the industry-proven approach for warehouse multi-robot fleets, balancing efficiency and robustness.

---

## Topic 23: Autonomous System Integration and Safety

### Lesson Outline
- The full autonomy stack: perception → localization → mapping → planning → control → actuation → monitoring
- System integration challenges: timing, data synchronization, coordinate frame consistency across subsystems
- Functional safety standards: ISO 10218 (industrial robot safety), ISO/TS 15066 (collaborative robots), ISO 26262 (automotive), IEC 61508 (functional safety for E/E systems)
- Safety concepts: hazard analysis and risk assessment (HARA), safety integrity levels (SIL), fault trees and failure mode and effects analysis (FMEA)
- Safe robot operation modes: speed and separation monitoring, power and force limiting, hand-guiding (ISO/TS 15066 modes)
- Watchdog timers and fault monitoring: software and hardware watchdogs; what happens on timeout
- Safe stop categories: Stop 0 (immediate power off), Stop 1 (controlled deceleration then power off), Stop 2 (deceleration, hold position)
- Uncertainty-aware planning: how to plan safely when perception and localization have uncertainty bounds
- Pitfall: safety is not just a software layer added at the end — it must be designed in from the beginning through safety-by-design principles

### Key Takeaways
- Safety integrity level (SIL) quantifies the required risk reduction; SIL 3 requires at least 99.9% probability of safe execution on demand
- Collaborative robots must operate in power-and-force-limiting mode to prevent injury; this requires torque sensing, not just speed limits
- FMEA identifies how each component can fail and what the system-level consequence is
- A watchdog timer is the simplest, most reliable hardware safety mechanism for embedded control systems
- Safety must be verified at the system level, not just the component level — emergent unsafe behaviors arise from interactions

### Related Topics
- Embedded Computing and Robot Programming Basics
- Feedback Control and PID
- Multi-Robot Systems and Coordination
- Robot Learning and Reinforcement Learning

### Further Learning
- Search query: `ISO 10218 industrial robot safety standard summary`
- Search query: `ISO TS 15066 collaborative robot power force limiting`
- Search query: `FMEA failure mode effects analysis robotics systems engineering`
- Search query: `functional safety SIL IEC 61508 robotics automotive`

### Check Understanding

**(a) Multiple Choice**
Under ISO/TS 15066, which collaborative robot operation mode limits the contact force between robot and human to a defined threshold?
- 0 — Speed and separation monitoring
- 1 — Safety-rated monitored stop
- 2 — Hand-guiding
- 3 — **Power and force limiting** ✓

> Power and force limiting (PFL) directly caps the energy and force that can be transferred to a human body part. Speed and separation monitoring maintains physical distance. Hand-guiding requires operator-initiated motion. Safety-rated stop halts the robot when a human enters.

**(b) True / False**
**Statement:** Adding a safety module as the last step of system integration is sufficient to meet ISO functional safety requirements.
**Answer:** False.
> ISO 26262 and IEC 61508 require safety to be part of the design process from the start. Hazard analysis, safe architecture decisions, and validation must be conducted throughout development. Retrofitting safety at the end typically fails to meet SIL requirements.

**(c) Short Problem**
A watchdog timer is set with a 10 ms timeout. The control loop takes 7 ms on average but occasionally spikes to 15 ms under heavy load. What will happen during a 15 ms spike?
**Expected answer:** The watchdog timeout will trigger (15 ms > 10 ms), causing the watchdog to fire — typically executing a safe stop or reset. The control loop must reset (kick) the watchdog within the 10 ms window. The spike reveals that the timeout is too tight for the worst-case execution time; the loop must be optimized or the watchdog period increased.

### Decision Scenario
You are deploying a collaborative robot arm next to a human operator on an assembly line. The robot carries a screwdriver tool and moves at up to 1.5 m/s. Your safety engineer asks how to protect the operator.

- A — Install a safety fence to keep the human 2 m away at all times
- B — Cap the robot speed at 0.25 m/s permanently
- C — **Implement power-and-force-limiting mode with a certified force/torque sensor and safety-rated controller per ISO/TS 15066, with speed and separation monitoring using a safety laser scanner** ✓
- D — Add a visual warning light when the robot is moving

> The scenario specifically requires collaborative operation (human and robot sharing the workspace). ISO/TS 15066 PFL mode with separation monitoring is the correct, standards-compliant solution. A fence negates the collaboration benefit; a fixed speed cap may be insufficient at close range; a warning light provides no physical protection.

---

## Topic 24: Capstone — Full Autonomous Robot System Design

### Lesson Outline
- System design methodology: requirements → architecture → subsystem design → integration → test → deploy → monitor
- Writing robot requirements: functional requirements (what it must do), non-functional requirements (speed, accuracy, safety, availability)
- Architectural trade-off analysis: centralized vs. distributed compute; monolithic vs. modular software; reactive vs. deliberative vs. hybrid (subsumption, three-layer architectures)
- Hardware selection and sizing: computing the required torque, speed, sensing range, and compute budget for a target task
- Software architecture patterns: sense–plan–act, behavior trees (the modern standard for complex robot behavior), blackboard systems
- Behavior trees: nodes (sequence, selector, parallel, condition, action); composing complex behaviors from simple reusable building blocks
- Integration testing strategy: unit test each subsystem; integration test subsystem interfaces; system test with full hardware-in-the-loop; regression testing for deployments
- Performance benchmarking: define key performance indicators (KPIs) before building; measure against them objectively
- Deployment and monitoring: anomaly detection in production; graceful degradation when subsystems fail; telemetry and logging for post-incident analysis
- Pitfall: over-optimizing a single subsystem at the expense of system-level performance; the weakest link defines the system's capability

### Key Takeaways
- Behavior trees supersede FSMs for complex robot behavior: they are modular, reusable, readable, and handle failure gracefully
- A three-layer architecture (reactive layer + executive layer + deliberative layer) is the most common practical design for autonomous robots
- System-level KPIs must be defined before implementation to avoid post-hoc rationalization of poor performance
- Every deployed autonomous system needs telemetry and a graceful degradation plan; field failures are inevitable
- The capstone project should integrate all prior topics: perception, state estimation, planning, control, safety, and learning

### Related Topics
- Anatomy of a Robot
- Embedded Computing and Robot Programming Basics
- Autonomous System Integration and Safety
- All prior topics (this is the integration stage)

### Further Learning
- Search query: `behavior trees robot autonomy tutorial Colledanchise Ogren`
- Search query: `three-layer robot architecture deliberative reactive executive`
- *Behavior Trees in Robotics and AI*, Colledanchise & Ögren (free draft): https://arxiv.org/abs/1709.00084
- Search query: `robot system design KPI benchmarking autonomous deployment`

### Check Understanding

**(a) Multiple Choice**
In a behavior tree, a Sequence node with three child actions (A → B → C) behaves as follows:
- 0 — Runs all three children simultaneously and succeeds if any succeeds
- 1 — Runs children in random order until one fails
- 2 — **Runs children left-to-right; returns Failure immediately if any child fails; returns Success only if all succeed** ✓
- 3 — Runs the first child; if it fails, tries the next

> A Sequence node is the AND of its children: all must succeed in order. Option 0 describes a Parallel node. Option 3 describes a Selector (Fallback) node, which is the OR of its children.

**(b) True / False**
**Statement:** A robot that passes all unit and integration tests in simulation is guaranteed to perform correctly when deployed on hardware.
**Answer:** False.
> Simulation cannot perfectly replicate hardware: sensor noise, mechanical compliance, cable drag, thermal effects, and environment variation all introduce discrepancies. Hardware-in-the-loop testing and staged field deployment are mandatory steps before full autonomy.

**(c) Short Problem**
You must design a mobile robot to autonomously deliver packages in a hospital. List five system-level KPIs you would define before building the system, and state the measurement method for each.

**Expected answer (accept any five well-defined KPIs, examples):**
1. **Navigation success rate** — % of deliveries completed without human intervention; measured over 100 test runs.
2. **Delivery time** — Mean time from dispatch to delivery confirmation; measured by timestamps.
3. **Obstacle avoidance failure rate** — Contacts with humans or furniture per 100 hours; measured by bump sensor and safety logs.
4. **Localization error** — RMS position error vs. ground truth markers; measured by a motion capture system.
5. **System availability** — % uptime over 30-day deployment; measured by operational logs.
6. **Battery life per charge** — Distance covered per charge under nominal load; measured empirically.

### Decision Scenario
You are leading a team building an autonomous inspection robot for a chemical plant. The robot must navigate, identify anomalies, and report findings with minimal human oversight. Your team must choose the software control architecture.

- A — Implement a single large finite state machine with all behaviors encoded as states
- B — Write a monolithic main loop with if/else branching for all behaviors
- C — **Use a three-layer architecture: a reactive safety layer (collision avoidance, emergency stop) runs at 100 Hz; an executive behavior tree layer handles task sequencing; a deliberative planner handles mission-level scheduling** ✓
- D — Use a rule-based expert system with hardcoded inspection procedures

> A single FSM becomes unmaintainable at scale (state explosion). A monolithic loop is fragile and untestable. A rule-based system lacks adaptability. The three-layer architecture with a behavior tree at the executive level is the industry standard: it separates concerns (safety vs. task vs. mission), is modular and testable, and handles failures gracefully through tree fallback nodes.

---

*End of Curriculum*