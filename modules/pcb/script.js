// ════════════════════════════════════════════════
// State
// ════════════════════════════════════════════════
const achievements = [
    { id: 'first_steps', icon: '🎓', titleKey: 'achievement.first_steps.title', descKey: 'achievement.first_steps.desc', unlocked: false },
    { id: 'beginner_master', icon: '⚡', titleKey: 'achievement.beginner_master.title', descKey: 'achievement.beginner_master.desc', unlocked: false },
    { id: 'quiz_master', icon: '🎯', titleKey: 'achievement.quiz_master.title', descKey: 'achievement.quiz_master.desc', unlocked: false },
    { id: 'scenario_solver', icon: '🔧', titleKey: 'achievement.scenario_solver.title', descKey: 'achievement.scenario_solver.desc', unlocked: false },
    { id: 'intermediate', icon: '🚀', titleKey: 'achievement.intermediate.title', descKey: 'achievement.intermediate.desc', unlocked: false },
    { id: 'advanced', icon: '⚙️', titleKey: 'achievement.advanced.title', descKey: 'achievement.advanced.desc', unlocked: false },
    { id: 'expert', icon: '👑', titleKey: 'achievement.expert.title', descKey: 'achievement.expert.desc', unlocked: false },
    { id: 'perfectionist', icon: '💎', titleKey: 'achievement.perfectionist.title', descKey: 'achievement.perfectionist.desc', unlocked: false }
];

let userProgress = {
    completedTopics: [],
    xp: 0,
    level: 1,
    quizzesCompleted: 0,
    scenariosCompleted: 0,
    streak: 0,
    achievements: []
};

let currentView = { levelId: null, topicIndex: null };

const themeStorageKey = 'appTheme';

function getSystemTheme() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function getCurrentTheme() {
    const activeTheme = document.documentElement.dataset.theme;
    return activeTheme === 'light' || activeTheme === 'dark' ? activeTheme : getSystemTheme();
}

function applyTheme(theme) {
    const resolvedTheme = theme === 'light' ? 'light' : 'dark';
    document.documentElement.dataset.theme = resolvedTheme;
    document.documentElement.style.colorScheme = resolvedTheme;
}

function setTheme(theme) {
    applyTheme(theme);
    localStorage.setItem(themeStorageKey, theme);
    updateThemeToggle();
}

function toggleTheme() {
    setTheme(getCurrentTheme() === 'dark' ? 'light' : 'dark');
}

function updateThemeToggle() {
    const toggle = document.getElementById('themeToggle');
    if (!toggle) return;

    const currentTheme = getCurrentTheme();
    const nextThemeLabel = currentTheme === 'dark' ? t('theme.switchToLight') : t('theme.switchToDark');

    toggle.textContent = '🌙';
    toggle.dataset.theme = currentTheme;
    toggle.setAttribute('aria-label', nextThemeLabel);
    toggle.setAttribute('title', nextThemeLabel);
}

/**
 * Return the translated display title for a sidebar topic.
 * Looks up the translated title from the i18n content registry by matching
 * the English topic name, then falls back to the raw name string.
 *
 * @param {string} topicName - The English topic name from roadmapData
 * @param {string} levelId   - The level this topic belongs to (e.g. 'level1')
 * @param {number} topicIndex - Index of topic within its level
 */
function topicLabel(topicName, levelId, topicIndex) {
    // Prefer translated content title from the content registry
    if (levelId !== undefined && topicIndex !== undefined) {
        const langContent = i18n.getContent(levelId);
        if (langContent && langContent[topicIndex] && langContent[topicIndex].title) {
            return langContent[topicIndex].title;
        }
    }
    // Final fallback: the raw English name
    return topicName;
}

function categoryLabel(category) {
    return t(`category.${category}`);
}

function updateStaticTexts() {
    const appTitle = document.getElementById('appTitle');
    if (appTitle) appTitle.textContent = t('app.title');

    const progressLabel = document.getElementById('headerProgressLabel');
    if (progressLabel) progressLabel.textContent = t('header.progress');

    const xpLabel = document.getElementById('headerXPLabel');
    if (xpLabel) xpLabel.textContent = t('header.xp');

    const streakLabel = document.getElementById('headerStreakLabel');
    if (streakLabel) streakLabel.textContent = t('header.streak');

    const sidebarTitle = document.getElementById('sidebarTitle');
    if (sidebarTitle) sidebarTitle.textContent = t('sidebar.title');

    updateThemeToggle();
    document.title = t('app.title');
}

// ════════════════════════════════════════════════
// Persistence
// ════════════════════════════════════════════════
function loadProgress() {
    const saved = localStorage.getItem('electronicsProgress');
    if (saved) {
        userProgress = JSON.parse(saved);
        roadmapData.levels.forEach(level => {
            level.topics.forEach(topic => {
                if (userProgress.completedTopics.includes(`${level.id}_${topic.name}`)) {
                    topic.completed = true;
                }
            });
        });
        achievements.forEach(ach => {
            if (userProgress.achievements.includes(ach.id)) {
                ach.unlocked = true;
            }
        });
    }
}

function saveProgress() {
    localStorage.setItem('electronicsProgress', JSON.stringify(userProgress));
}

// ════════════════════════════════════════════════
// Progress & XP
// ════════════════════════════════════════════════
function updateProgressDisplay() {
    let totalTopics = 0, completedCount = 0;
    roadmapData.levels.forEach(level => {
        totalTopics += level.topics.length;
        level.topics.forEach(topic => { if (topic.completed) completedCount++; });
    });

    const percentage = totalTopics > 0 ? Math.round((completedCount / totalTopics) * 100) : 0;
    document.getElementById('overallProgress').style.background =
        `conic-gradient(var(--color-accent) ${percentage * 3.6}deg, var(--color-bg-tertiary) 0deg)`;
    document.getElementById('overallProgress').querySelector('span').textContent = `${percentage}%`;
    document.getElementById('completedTopics').textContent = completedCount;
    document.getElementById('totalTopics').textContent = totalTopics;
    document.getElementById('xpDisplay').textContent = userProgress.xp;
    document.getElementById('levelDisplay').textContent = t('header.level', userProgress.level);
    document.getElementById('streakCount').textContent = userProgress.streak;

    checkAchievements();
}

function addXP(amount) {
    userProgress.xp += amount;
    const newLevel = Math.floor(userProgress.xp / 100) + 1;
    if (newLevel > userProgress.level) {
        userProgress.level = newLevel;
        showNotification(t('notification.levelUp', userProgress.level));
    }
    updateProgressDisplay();
    saveProgress();
}

function checkAchievements() {
    let totalCompleted = 0;
    roadmapData.levels.forEach(level => {
        level.topics.forEach(topic => { if (topic.completed) totalCompleted++; });
    });
    const totalTopics = roadmapData.levels.reduce((sum, level) => sum + level.topics.length, 0);

    if (totalCompleted >= 1 && !achievements[0].unlocked) unlockAchievement('first_steps');
    if (roadmapData.levels[0].topics.every(t => t.completed) && !achievements[1].unlocked) unlockAchievement('beginner_master');
    if (userProgress.quizzesCompleted >= 10 && !achievements[2].unlocked) unlockAchievement('quiz_master');
    if (userProgress.scenariosCompleted >= 5 && !achievements[3].unlocked) unlockAchievement('scenario_solver');
    if (roadmapData.levels[1].topics.every(t => t.completed) && !achievements[4].unlocked) unlockAchievement('intermediate');
    if (roadmapData.levels[2].topics.every(t => t.completed) && !achievements[5].unlocked) unlockAchievement('advanced');
    if (roadmapData.levels[3].topics.every(t => t.completed) && !achievements[6].unlocked) unlockAchievement('expert');
    if (totalCompleted === totalTopics && !achievements[7].unlocked) unlockAchievement('perfectionist');
}

function unlockAchievement(id) {
    const ach = achievements.find(a => a.id === id);
    if (ach && !ach.unlocked) {
        ach.unlocked = true;
        userProgress.achievements.push(id);
        showNotification(t('notification.achievement', t(ach.titleKey)));
        addXP(50);
    }
}

function showNotification(message) {
    const n = document.createElement('div');
    n.style.cssText = `
        position: fixed; top: 20px; right: 20px;
        background: var(--color-success); color: white;
        padding: 16px 24px; border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 1000; font-weight: 600;
        animation: slideIn 0.3s ease-out;
    `;
    n.textContent = message;
    document.body.appendChild(n);
    setTimeout(() => {
        n.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => n.remove(), 300);
    }, 3000);
}

// ════════════════════════════════════════════════
// Sidebar
// ════════════════════════════════════════════════
function renderSidebar() {
    const nav = document.getElementById('sidebarNav');
    nav.innerHTML = roadmapData.levels.map(level => {
        const completed = level.topics.filter(t => t.completed).length;
        const total = level.topics.length;
        return `
            <div class="level-group">
                <div class="level-group-header" onclick="toggleLevelGroup('${level.id}')">
                    <span>${t(level.name)} <span class="level-group-progress">(${completed}/${total})</span></span>
                    <span class="chevron">▼</span>
                </div>
                <div class="level-group-topics" id="topics-${level.id}">
                    ${level.topics.map((topic, idx) => `
                        <div class="topic-nav-item ${topic.completed ? 'completed' : ''}"
                             id="nav-${level.id}-${idx}"
                             onclick="showTopic('${level.id}', ${idx})">
                            <span class="status-dot"></span>
                            <span class="topic-name">${topicLabel(topic.name, level.id, idx)}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }).join('');
}

function toggleLevelGroup(levelId) {
    const topics = document.getElementById(`topics-${levelId}`);
    const header = topics.previousElementSibling;
    topics.classList.toggle('collapsed');
    header.classList.toggle('collapsed');
}

function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('open');
}

function setActiveNav(levelId, topicIndex) {
    document.querySelectorAll('.topic-nav-item').forEach(el => el.classList.remove('active'));
    const el = document.getElementById(`nav-${levelId}-${topicIndex}`);
    if (el) el.classList.add('active');
}

// ════════════════════════════════════════════════
// Language Switcher
// ════════════════════════════════════════════════
function updateLanguageSwitcher() {
    const select = document.getElementById('langSwitcher');
    if (!select) return;

    const langs = i18n.getAvailableLanguages();
    const current = i18n.getCurrentLang();
    select.innerHTML = langs.map(lang =>
        `<option value="${lang.code}" ${lang.code === current ? 'selected' : ''}>${lang.label}</option>`
    ).join('');
}

const systemThemeQuery = window.matchMedia ? window.matchMedia('(prefers-color-scheme: light)') : null;

if (systemThemeQuery && typeof systemThemeQuery.addEventListener === 'function') {
    systemThemeQuery.addEventListener('change', () => {
        if (!localStorage.getItem(themeStorageKey)) {
            applyTheme(getSystemTheme());
            updateThemeToggle();
        }
    });
}

// ════════════════════════════════════════════════
// Welcome View (default)
// ════════════════════════════════════════════════
function showWelcome() {
    currentView = { levelId: null, topicIndex: null };
    document.querySelectorAll('.topic-nav-item').forEach(el => el.classList.remove('active'));

    const main = document.getElementById('mainContent');
    main.innerHTML = `
        <div class="welcome-view">
            <h2>${t('welcome.heading')}</h2>
            <p>${t('welcome.description')}</p>

            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-value" id="welcomeXP">${userProgress.xp}</div>
                    <div class="stat-label">${t('welcome.totalXP')}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value" id="welcomeQuizzes">${userProgress.quizzesCompleted}</div>
                    <div class="stat-label">${t('welcome.exercisesDone')}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value" id="welcomeScenarios">${userProgress.scenariosCompleted}</div>
                    <div class="stat-label">${t('welcome.scenariosSolved')}</div>
                </div>
            </div>

            <div class="achievements-section">
                <h3>${t('achievements.title')}</h3>
                <div class="achievements-grid">
                    ${achievements.map(ach => `
                        <div class="achievement ${ach.unlocked ? 'unlocked' : 'locked'}">
                            <div class="achievement-icon">${ach.unlocked ? ach.icon : '🔒'}</div>
                            <div class="achievement-title">${t(ach.titleKey)}</div>
                            <div class="achievement-desc">${t(ach.descKey)}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

// ════════════════════════════════════════════════
// Topic View
// ════════════════════════════════════════════════
function showTopic(levelId, topicIndex) {
    const level = roadmapData.levels.find(l => l.id === levelId);
    const topic = level.topics[topicIndex];
    
    // Fetch content blocks dynamic for current language
    const levelContentArray = i18n.getContent(levelId) || [];
    const content = levelContentArray[topicIndex] || null;

    currentView = { levelId, topicIndex };
    setActiveNav(levelId, topicIndex);

    // Close mobile sidebar
    document.getElementById('sidebar').classList.remove('open');

    const main = document.getElementById('mainContent');

    if (!content) {
        main.innerHTML = `
            <div class="topic-view">
                <div class="topic-header">
                    <span class="badge badge-${topic.category}">${categoryLabel(topic.category)}</span>
                    <h2>${topicLabel(topic.name, levelId, topicIndex)}</h2>
                    <div class="topic-level-label">${t(level.name)}</div>
                </div>
                <p style="color: var(--color-text-secondary);">${t('topic.comingSoon')}</p>
            </div>
        `;
        return;
    }

    const allQuizzes = i18n.getContent('quizzes') || [];
    const topicQuizzes = allQuizzes.filter(q => q.level === levelId && q.topicIndex === topicIndex);

    const allScenarios = i18n.getContent('scenarios') || [];
    const topicScenarios = allScenarios.filter(s => s.level === levelId && s.topicIndex === topicIndex);

    main.innerHTML = `
        <div class="topic-view">
            <div class="topic-header">
                <span class="badge badge-${topic.category}">${categoryLabel(topic.category)}</span>
                <h2>${content.title}</h2>
                <div class="topic-level-label">${t(level.name)}</div>
            </div>

            <div class="topic-lesson">
                ${content.content}
            </div>

            <div class="key-points">
                <h3>${t('topic.keyTakeaways')}</h3>
                <ul>
                    ${content.keyPoints.map(p => `<li>${p}</li>`).join('')}
                </ul>
            </div>

            ${content.relatedTopics && content.relatedTopics.length > 0 ? `
                <div class="related-topics">
                    <h3>${t('topic.relatedTopics')}</h3>
                    <div class="related-chips">
                        ${content.relatedTopics.map(rt => `<span class="related-chip" onclick="showTopic('${rt.level}', ${rt.index})">${rt.label}</span>`).join('')}
                    </div>
                </div>
            ` : ''}

            ${content.resources && content.resources.length > 0 ? `
                <div class="external-resources">
                    <h3>${t('topic.furtherReading')}</h3>
                    <ul>
                        ${content.resources.map(r => `<li><a href="${r.url}" target="_blank" rel="noopener">${r.title} ↗</a></li>`).join('')}
                    </ul>
                </div>
            ` : ''}

            ${topicQuizzes.length > 0 ? `
                <div class="exercises-section">
                    <div class="exercises-header">
                        <h3>${t('exercises.title')}</h3>
                        <button class="btn btn-secondary btn-small" id="retryExercisesBtn" style="display:none" onclick="retryExercises('${levelId}', ${topicIndex})">${t('exercises.retry')}</button>
                    </div>
                    <div id="quizContainer">
                        ${topicQuizzes.map((q, qIdx) => renderQuizCard(q, qIdx)).join('')}
                    </div>
                </div>
            ` : ''}

            ${topicScenarios.length > 0 ? `
                <div class="scenarios-section">
                    <h3>${t('scenarios.title')}</h3>
                    <div id="scenarioContainer">
                        ${topicScenarios.map((s, sIdx) => renderScenarioCard(s, sIdx)).join('')}
                    </div>
                </div>
            ` : ''}

            <div class="topic-actions">
                ${!topic.completed ? `
                    <button class="btn btn-primary" onclick="completeTopic('${levelId}', '${topic.name.replace(/'/g, "\\'")}')">
                        ${t('topic.markCompleted')}
                    </button>
                ` : `
                    <button class="btn btn-success">${t('topic.completed')}</button>
                `}
                ${getNextTopicButton(levelId, topicIndex)}
            </div>
        </div>
    `;

    // Scroll to top
    main.scrollTop = 0;

    // Attach quiz event listeners
    attachQuizListeners(topicQuizzes);
    attachScenarioListeners(topicScenarios);
}

function getNextTopicButton(levelId, topicIndex) {
    const level = roadmapData.levels.find(l => l.id === levelId);
    if (topicIndex < level.topics.length - 1) {
        return `<button class="btn btn-secondary" onclick="showTopic('${levelId}', ${topicIndex + 1})">${t('topic.nextTopic')}</button>`;
    }
    // Check if there's a next level
    const levelIdx = roadmapData.levels.indexOf(level);
    if (levelIdx < roadmapData.levels.length - 1) {
        const nextLevel = roadmapData.levels[levelIdx + 1];
        return `<button class="btn btn-secondary" onclick="showTopic('${nextLevel.id}', 0)">${t('topic.nextLevel')}</button>`;
    }
    return '';
}

function showRetryButton() {
    const btn = document.getElementById('retryExercisesBtn');
    if (btn) btn.style.display = 'inline-block';
}

function retryExercises(levelId, topicIndex) {
    // Re-render just the exercises for this topic
    showTopic(levelId, topicIndex);
    // Scroll to exercises section
    setTimeout(() => {
        const section = document.querySelector('.exercises-section');
        if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
}

// ════════════════════════════════════════════════
// Quiz Rendering & Logic (supports: multiple-choice, calculation, true/false)
// ════════════════════════════════════════════════
function renderQuizCard(quiz, qIdx) {
    const type = quiz.type || 'multiple-choice';

    if (type === 'calculation') {
        return `
            <div class="quiz-card" id="quiz-${qIdx}">
                <div class="question-badge">${t('exercises.calculation')}</div>
                <div class="question-text">${quiz.question}</div>
                <div class="calc-input-group">
                    <input type="text" class="calc-input" id="calc-input-${qIdx}" placeholder="${t('exercises.typePlaceholder')}" autocomplete="off">
                    <span class="calc-unit">${quiz.unit || ''}</span>
                </div>
                <div class="quiz-actions">
                    <button class="btn btn-primary" data-submit-calc="${qIdx}">${t('exercises.checkAnswer')}</button>
                </div>
                <div class="quiz-result" id="quiz-result-${qIdx}"></div>
            </div>
        `;
    }

    if (type === 'truefalse') {
        return `
            <div class="quiz-card" id="quiz-${qIdx}">
                <div class="question-badge">${t('exercises.trueOrFalse')}</div>
                <div class="question-text">${quiz.question}</div>
                <div class="options tf-options">
                    <div class="option tf-option" data-quiz="${qIdx}" data-option="true">${t('exercises.true')}</div>
                    <div class="option tf-option" data-quiz="${qIdx}" data-option="false">${t('exercises.false')}</div>
                </div>
                <div class="quiz-actions">
                    <button class="btn btn-primary" data-submit-tf="${qIdx}">${t('exercises.submitAnswer')}</button>
                </div>
                <div class="quiz-result" id="quiz-result-${qIdx}"></div>
            </div>
        `;
    }

    // Default: multiple-choice
    return `
        <div class="quiz-card" id="quiz-${qIdx}">
            <div class="question-text">${quiz.question}</div>
            <div class="options">
                ${quiz.options.map((opt, oIdx) => `
                    <div class="option" data-quiz="${qIdx}" data-option="${oIdx}">${opt}</div>
                `).join('')}
            </div>
            <div class="quiz-actions">
                <button class="btn btn-primary" data-submit-quiz="${qIdx}">${t('exercises.submitAnswer')}</button>
            </div>
            <div class="quiz-result" id="quiz-result-${qIdx}"></div>
        </div>
    `;
}

function attachQuizListeners(quizzes) {
    // --- Multiple-choice ---
    document.querySelectorAll('.option[data-quiz]').forEach(opt => {
        opt.addEventListener('click', function () {
            const qIdx = this.dataset.quiz;
            document.querySelectorAll(`.option[data-quiz="${qIdx}"]`).forEach(o => o.classList.remove('selected'));
            this.classList.add('selected');
        });
    });

    document.querySelectorAll('[data-submit-quiz]').forEach(btn => {
        btn.addEventListener('click', function () {
            const qIdx = parseInt(this.dataset.submitQuiz);
            const quiz = quizzes[qIdx];
            const selected = document.querySelector(`.option[data-quiz="${qIdx}"].selected`);

            if (!selected) { alert(t('exercises.selectAnswer')); return; }

            const selectedIdx = parseInt(selected.dataset.option);
            const options = document.querySelectorAll(`.option[data-quiz="${qIdx}"]`);

            options.forEach((opt, idx) => {
                opt.style.pointerEvents = 'none';
                if (idx === quiz.correct) opt.classList.add('correct');
                else if (idx === selectedIdx && selectedIdx !== quiz.correct) opt.classList.add('incorrect');
            });

            this.style.display = 'none';

            const resultDiv = document.getElementById(`quiz-result-${qIdx}`);
            if (selectedIdx === quiz.correct) {
                resultDiv.innerHTML = `<div class="result-message result-success">${t('quiz.correct', quiz.xp)}<br><br>${quiz.explanation}</div>`;
                addXP(quiz.xp);
                userProgress.quizzesCompleted++;
            } else {
                resultDiv.innerHTML = `<div class="result-message result-error">${t('quiz.incorrect')}<br><br>${quiz.explanation}</div>`;
            }
            saveProgress();
            updateProgressDisplay();
            showRetryButton();
        });
    });

    // --- Calculation ---
    document.querySelectorAll('[data-submit-calc]').forEach(btn => {
        btn.addEventListener('click', function () {
            const qIdx = parseInt(this.dataset.submitCalc);
            const quiz = quizzes[qIdx];
            const input = document.getElementById(`calc-input-${qIdx}`);
            const userAnswer = parseFloat(input.value.replace(/[^0-9.\-]/g, ''));

            if (isNaN(userAnswer)) { alert(t('exercises.enterNumeric')); return; }

            input.disabled = true;
            this.style.display = 'none';

            const resultDiv = document.getElementById(`quiz-result-${qIdx}`);
            const tolerance = quiz.tolerance || 0.05; // 5% default
            const isCorrect = Math.abs(userAnswer - quiz.answer) <= Math.abs(quiz.answer * tolerance);

            if (isCorrect) {
                input.style.borderColor = 'var(--color-success)';
                resultDiv.innerHTML = `<div class="result-message result-success">${t('quiz.correctCalc', quiz.answer, quiz.unit || '', quiz.xp)}<br><br>${quiz.explanation}</div>`;
                addXP(quiz.xp);
                userProgress.quizzesCompleted++;
            } else {
                input.style.borderColor = 'var(--color-danger)';
                resultDiv.innerHTML = `<div class="result-message result-error">${t('quiz.incorrectCalc', quiz.answer, quiz.unit || '')}<br><br>${quiz.explanation}</div>`;
            }
            saveProgress();
            updateProgressDisplay();
            showRetryButton();
        });
    });

    // --- True/False ---
    document.querySelectorAll('[data-submit-tf]').forEach(btn => {
        btn.addEventListener('click', function () {
            const qIdx = parseInt(this.dataset.submitTf);
            const quiz = quizzes[qIdx];
            const selected = document.querySelector(`.option[data-quiz="${qIdx}"].selected`);

            if (!selected) { alert(t('exercises.selectTrueFalse')); return; }

            const userAnswer = selected.dataset.option === 'true';
            const options = document.querySelectorAll(`.option[data-quiz="${qIdx}"]`);

            options.forEach(opt => {
                opt.style.pointerEvents = 'none';
                const val = opt.dataset.option === 'true';
                if (val === quiz.answer) opt.classList.add('correct');
                else if (val === userAnswer && userAnswer !== quiz.answer) opt.classList.add('incorrect');
            });

            this.style.display = 'none';

            const resultDiv = document.getElementById(`quiz-result-${qIdx}`);
            if (userAnswer === quiz.answer) {
                resultDiv.innerHTML = `<div class="result-message result-success">${t('quiz.correct', quiz.xp)}<br><br>${quiz.explanation}</div>`;
                addXP(quiz.xp);
                userProgress.quizzesCompleted++;
            } else {
                resultDiv.innerHTML = `<div class="result-message result-error">${t('quiz.incorrect')}<br><br>${quiz.explanation}</div>`;
            }
            saveProgress();
            updateProgressDisplay();
        });
    });
}

// ════════════════════════════════════════════════
// Scenario Rendering & Logic
// ════════════════════════════════════════════════
function renderScenarioCard(scenario, sIdx) {
    return `
        <div class="scenario-card" id="scenario-${sIdx}">
            <h4>🔧 ${scenario.title}</h4>
            <div class="scenario-desc">${scenario.description}</div>
            <div class="scenario-choices">
                ${scenario.choices.map((choice, cIdx) => `
                    <div class="choice-card" data-scenario="${sIdx}" data-choice="${cIdx}">${choice.text}</div>
                `).join('')}
            </div>
            <div class="scenario-result" id="scenario-result-${sIdx}"></div>
        </div>
    `;
}

function attachScenarioListeners(scenarios) {
    document.querySelectorAll('.choice-card[data-scenario]').forEach(card => {
        card.addEventListener('click', function () {
            const sIdx = parseInt(this.dataset.scenario);
            const cIdx = parseInt(this.dataset.choice);
            const scenario = scenarios[sIdx];
            const choice = scenario.choices[cIdx];

            // Disable all choices for this scenario
            document.querySelectorAll(`.choice-card[data-scenario="${sIdx}"]`).forEach(c => {
                c.style.pointerEvents = 'none';
            });

            const resultDiv = document.getElementById(`scenario-result-${sIdx}`);
            if (choice.correct) {
                this.style.borderColor = 'var(--color-success)';
                this.style.background = 'var(--color-success)';
                this.style.color = 'white';
                resultDiv.innerHTML = `<div class="result-message result-success">${t('scenario.excellent', choice.xp)}<br><br>${scenario.explanation}</div>`;
                addXP(choice.xp);
                userProgress.scenariosCompleted++;
            } else {
                this.style.borderColor = 'var(--color-danger)';
                this.style.background = 'var(--color-danger)';
                this.style.color = 'white';
                resultDiv.innerHTML = `<div class="result-message result-error">${t('scenario.notQuite')}<br><br>${scenario.explanation}</div>`;
            }
            saveProgress();
            updateProgressDisplay();
        });
    });
}

// ════════════════════════════════════════════════
// Topic Completion
// ════════════════════════════════════════════════
function completeTopic(levelId, topicName) {
    const level = roadmapData.levels.find(l => l.id === levelId);
    const topic = level.topics.find(t => t.name === topicName);

    if (!topic.completed) {
        topic.completed = true;
        userProgress.completedTopics.push(`${levelId}_${topicName}`);
        addXP(20);
        showNotification(t('notification.completed', topicLabel(topicName, levelId, level.topics.indexOf(topic))));
        renderSidebar();
        // Re-show the current topic to update the button
        if (currentView.levelId === levelId) {
            showTopic(levelId, currentView.topicIndex);
        }
    }
}

// ════════════════════════════════════════════════
// Visual Reference Modal (iframe overlay)
// ════════════════════════════════════════════════
function openVisualRef(url) {
    // Open in a new tab directly instead of an iframe to bypass the repeated 
    // Google cookie consent screen. Modern browsers block 3rd-party cookies 
    // in iframes, causing Google to ask for cookie permission every single time.
    window.open(url, '_blank', 'noopener,noreferrer');
}

function closeVisualRef() {
    const overlay = document.getElementById('visualRefOverlay');
    if (overlay) {
        overlay.classList.remove('active');
        setTimeout(() => overlay.remove(), 200);
    }
}

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeVisualRef();
});

// ════════════════════════════════════════════════
// Init
// ════════════════════════════════════════════════
applyTheme(localStorage.getItem(themeStorageKey) || getSystemTheme());
loadProgress();
updateStaticTexts();
updateProgressDisplay();
renderSidebar();
updateLanguageSwitcher();
showWelcome();
