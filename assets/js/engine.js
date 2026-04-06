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
let searchState = {
    query: '',
    tokens: []
};
const collapsedLevelGroups = new Set();

const themeStorageKey = 'appTheme';
const searchInputId = 'sidebarSearchInput';
const headerAppPanelStorageKey = 'oadsAppHeaderPanel';
const headerStatsMobileMq = '(max-width: 900px)';

const _storageKey = (window.MODULE_CONFIG && window.MODULE_CONFIG.storageKey)
    ? window.MODULE_CONFIG.storageKey
    : 'electronicsProgress';

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
    try { localStorage.setItem(themeStorageKey, theme); } catch (e) {}
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

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function stripDiacritics(value) {
    return String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function normalizeSearchText(value) {
    return stripDiacritics(value).toLowerCase();
}

function tokenizeSearchQuery(query) {
    const normalized = normalizeSearchText(query).replace(/[^a-z0-9]+/g, ' ').trim();
    if (!normalized) return [];
    return [...new Set(normalized.split(/\s+/).filter(Boolean))].sort((a, b) => b.length - a.length);
}

function extractTextFromHtml(html) {
    const container = document.createElement('div');
    container.innerHTML = html || '';
    return container.textContent || '';
}

function countTokenOccurrences(text, token) {
    let count = 0;
    let start = text.indexOf(token);
    while (start !== -1) {
        count++;
        start = text.indexOf(token, start + token.length);
    }
    return count;
}

function countSearchMatches(text, tokens) {
    return tokens.reduce((sum, token) => sum + countTokenOccurrences(text, token), 0);
}

function buildSearchRanges(text, tokens) {
    if (!tokens.length || !text) return [];

    const codePoints = Array.from(String(text));
    let normalizedText = '';
    const indexMap = [];
    let sourceIndex = 0;

    codePoints.forEach(char => {
        const normalizedChar = normalizeSearchText(char);
        const charLength = char.length;

        if (!normalizedChar) {
            sourceIndex += charLength;
            return;
        }

        for (let i = 0; i < normalizedChar.length; i++) {
            normalizedText += normalizedChar[i];
            indexMap.push(sourceIndex);
        }

        sourceIndex += charLength;
    });

    const ranges = [];
    tokens.forEach(token => {
        let start = normalizedText.indexOf(token);
        while (start !== -1) {
            const end = start + token.length;
            ranges.push([indexMap[start], indexMap[end - 1] + 1]);
            start = normalizedText.indexOf(token, start + 1);
        }
    });

    ranges.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    return ranges.reduce((merged, range) => {
        const previous = merged[merged.length - 1];
        if (!previous || range[0] > previous[1]) {
            merged.push(range);
            return merged;
        }
        previous[1] = Math.max(previous[1], range[1]);
        return merged;
    }, []);
}

function renderHighlightedText(text, tokens) {
    const value = String(text || '');
    const ranges = buildSearchRanges(value, tokens);
    if (!ranges.length) return escapeHtml(value);

    let output = '';
    let cursor = 0;
    ranges.forEach(([start, end]) => {
        output += escapeHtml(value.slice(cursor, start));
        output += `<mark class="search-highlight">${escapeHtml(value.slice(start, end))}</mark>`;
        cursor = end;
    });
    output += escapeHtml(value.slice(cursor));
    return output;
}

function clearSearchHighlights(root) {
    if (!root) return;

    root.querySelectorAll('mark.search-highlight').forEach(mark => {
        const textNode = document.createTextNode(mark.textContent || '');
        mark.replaceWith(textNode);
    });

    root.normalize();
}

function applySearchHighlights(root, tokens) {
    if (!root) return;

    clearSearchHighlights(root);
    if (!tokens.length) return;

    const textNodes = [];
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
        acceptNode(node) {
            if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;

            const parent = node.parentElement;
            if (!parent) return NodeFilter.FILTER_REJECT;
            if (parent.closest('script, style, noscript, mark.search-highlight, input, textarea, select, option')) {
                return NodeFilter.FILTER_REJECT;
            }

            return NodeFilter.FILTER_ACCEPT;
        }
    });

    while (walker.nextNode()) {
        textNodes.push(walker.currentNode);
    }

    textNodes.forEach(node => {
        const text = node.nodeValue || '';
        const ranges = buildSearchRanges(text, tokens);
        if (!ranges.length) return;

        const fragment = document.createDocumentFragment();
        let cursor = 0;

        ranges.forEach(([start, end]) => {
            if (cursor < start) {
                fragment.appendChild(document.createTextNode(text.slice(cursor, start)));
            }

            const mark = document.createElement('mark');
            mark.className = 'search-highlight';
            mark.textContent = text.slice(start, end);
            fragment.appendChild(mark);
            cursor = end;
        });

        if (cursor < text.length) {
            fragment.appendChild(document.createTextNode(text.slice(cursor)));
        }

        node.parentNode.replaceChild(fragment, node);
    });
}

function buildTopicSearchText(level, topic, topicIndex, content, topicQuizzes, topicScenarios) {
    const pieces = [
        topic.name,
        topicLabel(topic.name, level.id, topicIndex),
        t(level.name),
        categoryLabel(topic.category)
    ];

    if (content) {
        pieces.push(content.title || '');
        pieces.push(extractTextFromHtml(content.content || ''));
        pieces.push(Array.isArray(content.keyPoints) ? content.keyPoints.join(' ') : '');
        pieces.push(Array.isArray(content.relatedTopics) ? content.relatedTopics.map(rt => rt.label).join(' ') : '');
        pieces.push(Array.isArray(content.resources) ? content.resources.map(r => `${r.title || ''} ${r.url || ''}`).join(' ') : '');
    }

    pieces.push((topicQuizzes || []).map(q => [
        q.question || '',
        q.explanation || '',
        Array.isArray(q.options) ? q.options.join(' ') : '',
        q.unit || ''
    ].join(' ')).join(' '));

    pieces.push((topicScenarios || []).map(s => [
        s.title || '',
        s.description || '',
        s.explanation || '',
        Array.isArray(s.choices) ? s.choices.map(choice => choice.text || '').join(' ') : ''
    ].join(' ')).join(' '));

    return normalizeSearchText(pieces.join(' '));
}

function getSidebarSearchResults(tokens) {
    const allQuizzes = i18n.getContent('quizzes') || [];
    const allScenarios = i18n.getContent('scenarios') || [];

    if (!tokens.length) {
        return {
            totalTopics: roadmapData.levels.reduce((sum, level) => sum + level.topics.length, 0),
            totalMatches: 0,
            groups: roadmapData.levels.map(level => ({
                level,
                topics: level.topics.map((topic, topicIndex) => ({
                    topic,
                    topicIndex,
                    matchCount: 0
                })),
                matchCount: 0
            }))
        };
    }

    const groups = [];
    let totalTopics = 0;
    let totalMatches = 0;

    roadmapData.levels.forEach(level => {
        const levelContentArray = i18n.getContent(level.id) || [];
        const matchingTopics = [];
        let levelMatchCount = 0;

        level.topics.forEach((topic, topicIndex) => {
            const content = levelContentArray[topicIndex] || null;
            const topicQuizzes = allQuizzes.filter(q => q.level === level.id && q.topicIndex === topicIndex);
            const topicScenarios = allScenarios.filter(s => s.level === level.id && s.topicIndex === topicIndex);
            const searchText = buildTopicSearchText(level, topic, topicIndex, content, topicQuizzes, topicScenarios);

            if (!tokens.every(token => searchText.includes(token))) return;

            const matchCount = countSearchMatches(searchText, tokens);
            matchingTopics.push({ topic, topicIndex, matchCount });
            levelMatchCount += matchCount;
            totalTopics++;
            totalMatches += matchCount;
        });

        if (matchingTopics.length > 0) {
            groups.push({
                level,
                topics: matchingTopics,
                matchCount: levelMatchCount
            });
        }
    });

    return { groups, totalTopics, totalMatches };
}

function restoreSearchFocus(selectionStart, selectionEnd) {
    const input = document.getElementById(searchInputId);
    if (!input) return;

    try {
        input.focus({ preventScroll: true });
    } catch (error) {
        input.focus();
    }

    if (typeof selectionStart === 'number' && typeof selectionEnd === 'number' && typeof input.setSelectionRange === 'function') {
        try {
            input.setSelectionRange(selectionStart, selectionEnd);
        } catch (error) {}
    }
}

function updateSearchHighlights() {
    const main = document.getElementById('mainContent');
    applySearchHighlights(main, searchState.tokens);
}

function setSearchQuery(query) {
    const input = document.getElementById(searchInputId);
    const shouldRestoreFocus = input && document.activeElement === input;
    const selectionStart = shouldRestoreFocus ? input.selectionStart : null;
    const selectionEnd = shouldRestoreFocus ? input.selectionEnd : null;

    searchState.query = typeof query === 'string' ? query : '';
    searchState.tokens = tokenizeSearchQuery(searchState.query);

    renderSidebar();
    updateSearchHighlights();

    if (shouldRestoreFocus) {
        restoreSearchFocus(selectionStart, selectionEnd);
    }
}

function clearSearch() {
    setSearchQuery('');
    restoreSearchFocus(0, 0);
}

function syncAppHeaderOpenClass() {
    const header = document.getElementById('appHeader');
    const panel = document.getElementById('headerAppPanel');
    if (!header || !panel) return;
    header.classList.toggle('app-header--open', panel.classList.contains('is-open'));
}

function updateAppHeaderToggleAccessibility() {
    const expandBtn = document.getElementById('headerAppExpandBtn');
    if (!expandBtn) return;
    const title = t('app.title');

    if (!isHeaderStatsMobileViewport()) {
        expandBtn.setAttribute('tabindex', '-1');
        expandBtn.setAttribute('aria-hidden', 'true');
        expandBtn.setAttribute('aria-expanded', 'true');
        return;
    }

    expandBtn.removeAttribute('tabindex');
    expandBtn.removeAttribute('aria-hidden');
    const panel = document.getElementById('headerAppPanel');
    const open = panel && panel.classList.contains('is-open');
    expandBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    expandBtn.setAttribute('aria-label', open
        ? t('header.appToggle.collapse')
        : t('header.appToggle.expand', title));
}

function applyAppHeaderPanelLayout() {
    const panel = document.getElementById('headerAppPanel');
    const header = document.getElementById('appHeader');
    if (!panel || !header) {
        return;
    }

    const expandBtn = document.getElementById('headerAppExpandBtn');

    if (!isHeaderStatsMobileViewport()) {
        panel.classList.add('is-open');
        syncAppHeaderOpenClass();
        if (expandBtn) {
            expandBtn.setAttribute('aria-expanded', 'true');
            expandBtn.setAttribute('aria-hidden', 'true');
            expandBtn.setAttribute('tabindex', '-1');
        }
        updateAppHeaderToggleAccessibility();
        return;
    }

    if (expandBtn) {
        expandBtn.removeAttribute('aria-hidden');
        expandBtn.removeAttribute('tabindex');
    }

    let expanded = false;
    try { expanded = sessionStorage.getItem(headerAppPanelStorageKey) === 'expanded'; } catch (e) {}
    if (expanded) {
        panel.classList.add('is-open');
    } else {
        panel.classList.remove('is-open');
    }
    syncAppHeaderOpenClass();
    updateAppHeaderToggleAccessibility();
}

function setAppHeaderPanelOpen(willOpen) {
    const panel = document.getElementById('headerAppPanel');
    if (!panel) return;
    if (willOpen) {
        panel.classList.add('is-open');
        try { sessionStorage.setItem(headerAppPanelStorageKey, 'expanded'); } catch (e) {}
    } else {
        panel.classList.remove('is-open');
        try { sessionStorage.removeItem(headerAppPanelStorageKey); } catch (e) {}
    }
    syncAppHeaderOpenClass();
    const expandBtn = document.getElementById('headerAppExpandBtn');
    if (expandBtn) expandBtn.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
    updateAppHeaderToggleAccessibility();
}

function toggleAppHeaderPanel() {
    if (!isHeaderStatsMobileViewport()) return;
    const panel = document.getElementById('headerAppPanel');
    if (!panel) return;
    setAppHeaderPanelOpen(!panel.classList.contains('is-open'));
}

function initAppHeaderPanel() {
    const panel = document.getElementById('headerAppPanel');
    if (!panel) {
        return;
    }
    const expandBtn = document.getElementById('headerAppExpandBtn');
    if (expandBtn && !expandBtn.dataset.appToggleBound) {
        expandBtn.dataset.appToggleBound = '1';
        expandBtn.addEventListener('click', (e) => {
            e.preventDefault();
            toggleAppHeaderPanel();
        });
    }
    const mq = window.matchMedia(headerStatsMobileMq);
    const apply = () => applyAppHeaderPanelLayout();
    apply();
    if (mq.addEventListener) mq.addEventListener('change', apply);
    else if (mq.addListener) mq.addListener(apply);
}

function isHeaderStatsMobileViewport() {
    return window.matchMedia && window.matchMedia(headerStatsMobileMq).matches;
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

    const sidebarToggle = document.getElementById('sidebarToggle');
    if (sidebarToggle) {
        sidebarToggle.setAttribute('aria-label', t('sidebar.menu'));
        sidebarToggle.setAttribute('title', t('sidebar.menu'));
    }

    const mobileSidebarToggle = document.getElementById('mobileSidebarToggle');
    if (mobileSidebarToggle) {
        mobileSidebarToggle.setAttribute('aria-label', t('sidebar.menu'));
        mobileSidebarToggle.setAttribute('title', t('sidebar.menu'));
    }

    updateThemeToggle();
    document.title = t('app.title');
    updateAppHeaderToggleAccessibility();
}

// ════════════════════════════════════════════════
// Persistence
// ════════════════════════════════════════════════
function loadProgress() {
    let saved;
    try {
        saved = localStorage.getItem(_storageKey);
    } catch (e) {
        saved = null;
    }
    if (saved) {
        try {
            userProgress = JSON.parse(saved);
        } catch (e) {
            userProgress = {
                completedTopics: [],
                xp: 0,
                level: 1,
                quizzesCompleted: 0,
                scenariosCompleted: 0,
                streak: 0,
                achievements: []
            };
        }
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
    try {
        localStorage.setItem(_storageKey, JSON.stringify(userProgress));
    } catch (e) {}
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

    const stripStats = document.getElementById('headerStripStats');
    if (stripStats) stripStats.textContent = `${percentage}% · ${userProgress.xp} XP · ${userProgress.streak} 🔥`;

    const overallProgress = document.getElementById('overallProgress');
    if (overallProgress) {
        overallProgress.style.background =
            `conic-gradient(var(--color-accent) ${percentage * 3.6}deg, var(--color-bg-tertiary) 0deg)`;
        const pctSpan = overallProgress.querySelector('span');
        if (pctSpan) pctSpan.textContent = `${percentage}%`;
    }
    const completedEl = document.getElementById('completedTopics');
    if (completedEl) completedEl.textContent = completedCount;
    const totalEl = document.getElementById('totalTopics');
    if (totalEl) totalEl.textContent = totalTopics;
    const xpEl = document.getElementById('xpDisplay');
    if (xpEl) xpEl.textContent = userProgress.xp;
    const levelEl = document.getElementById('levelDisplay');
    if (levelEl) levelEl.textContent = t('header.level', userProgress.level);
    const streakEl = document.getElementById('streakCount');
    if (streakEl) streakEl.textContent = userProgress.streak;

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
    if (!nav) return;

    const previousScrollTop = nav.scrollTop;
    const activeElement = document.activeElement;
    const wasSearchFocused = activeElement && activeElement.id === searchInputId;
    const selectionStart = wasSearchFocused ? activeElement.selectionStart : null;
    const selectionEnd = wasSearchFocused ? activeElement.selectionEnd : null;
    const searchResults = getSidebarSearchResults(searchState.tokens);
    const query = searchState.query.trim();
    const hasSearch = searchState.tokens.length > 0;

    nav.innerHTML = `
        <div class="sidebar-search">
            <label class="sidebar-search-label" for="${searchInputId}">${t('search.label')}</label>
            <div class="sidebar-search-row">
                <input
                    type="search"
                    id="${searchInputId}"
                    class="sidebar-search-input"
                    value="${escapeHtml(searchState.query)}"
                    placeholder="${escapeHtml(t('search.placeholder'))}"
                    aria-label="${escapeHtml(t('search.label'))}"
                    autocomplete="off"
                    autocapitalize="off"
                    spellcheck="false"
                    oninput="setSearchQuery(this.value)"
                    onkeydown="if (event.key === 'Escape') { clearSearch(); event.preventDefault(); }">
                <button class="sidebar-search-clear" type="button" onclick="clearSearch()" ${hasSearch ? '' : 'disabled'}>${t('search.clear')}</button>
            </div>
            <div class="sidebar-search-summary ${hasSearch ? (searchResults.totalTopics > 0 ? 'has-results' : 'no-results') : ''}" aria-live="polite" aria-atomic="true">
                ${hasSearch
                    ? (searchResults.totalTopics > 0
                        ? escapeHtml(t('search.summary', searchResults.totalTopics, searchResults.totalMatches))
                        : escapeHtml(t('search.noResults', query)))
                    : escapeHtml(t('search.help'))}
            </div>
        </div>
        ${searchResults.groups.length > 0
            ? searchResults.groups.map(levelGroup => {
                const completed = levelGroup.level.topics.filter(topic => topic.completed).length;
                const total = levelGroup.level.topics.length;
                const visibleCount = levelGroup.topics.length;
                const progressLabel = hasSearch
                    ? t('search.topicCount', visibleCount)
                    : `(${completed}/${total})`;
                const isCollapsed = !hasSearch && collapsedLevelGroups.has(levelGroup.level.id);
                return `
                    <div class="level-group">
                        <div class="level-group-header ${isCollapsed ? 'collapsed' : ''}" onclick="toggleLevelGroup('${levelGroup.level.id}')">
                            <span>${hasSearch ? renderHighlightedText(t(levelGroup.level.name), searchState.tokens) : escapeHtml(t(levelGroup.level.name))} <span class="level-group-progress">${progressLabel}</span></span>
                            <span class="chevron">▼</span>
                        </div>
                        <div class="level-group-topics ${isCollapsed ? 'collapsed' : ''}" id="topics-${levelGroup.level.id}">
                            ${levelGroup.topics.map(({ topic, topicIndex, matchCount }) => `
                                <div class="topic-nav-item ${topic.completed ? 'completed' : ''} ${(currentView.levelId === levelGroup.level.id && currentView.topicIndex === topicIndex) ? 'active' : ''}"
                                     id="nav-${levelGroup.level.id}-${topicIndex}"
                                     onclick="showTopic('${levelGroup.level.id}', ${topicIndex})">
                                    <span class="status-dot"></span>
                                    <span class="topic-name">${hasSearch ? renderHighlightedText(topicLabel(topic.name, levelGroup.level.id, topicIndex), searchState.tokens) : escapeHtml(topicLabel(topic.name, levelGroup.level.id, topicIndex))}</span>
                                    ${hasSearch ? `<span class="topic-match-count">${matchCount}</span>` : ''}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
            }).join('')
            : `
                <div class="sidebar-search-empty">
                    <strong>${escapeHtml(t('search.noResults', query))}</strong>
                    <span>${escapeHtml(t('search.help'))}</span>
                </div>
            `}
    `;

    nav.scrollTop = previousScrollTop;
    if (wasSearchFocused) {
        restoreSearchFocus(selectionStart, selectionEnd);
    }
}

function toggleLevelGroup(levelId) {
    const topics = document.getElementById(`topics-${levelId}`);
    const header = topics.previousElementSibling;
    const isCollapsed = topics.classList.toggle('collapsed');
    header.classList.toggle('collapsed');

    if (isCollapsed) collapsedLevelGroups.add(levelId);
    else collapsedLevelGroups.delete(levelId);
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return;

    const isOpen = sidebar.classList.toggle('open');
    const expanded = isOpen ? 'true' : 'false';

    const sidebarToggle = document.getElementById('sidebarToggle');
    if (sidebarToggle) sidebarToggle.setAttribute('aria-expanded', expanded);

    const mobileSidebarToggle = document.getElementById('mobileSidebarToggle');
    if (mobileSidebarToggle) mobileSidebarToggle.setAttribute('aria-expanded', expanded);
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
        let savedTheme;
        try { savedTheme = localStorage.getItem(themeStorageKey); } catch (e) { savedTheme = null; }
        if (!savedTheme) {
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

    updateSearchHighlights();
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
        updateSearchHighlights();
        return;
    }

    const allQuizzes = i18n.getContent('quizzes') || [];
    const topicQuizzes = allQuizzes.filter(q => q.level === levelId && q.topicIndex === topicIndex);

    const allScenarios = i18n.getContent('scenarios') || [];
    const topicScenarios = allScenarios.filter(s => s.level === levelId && s.topicIndex === topicIndex);
    const keyPoints = Array.isArray(content.keyPoints) ? content.keyPoints : [];
    const relatedTopics = Array.isArray(content.relatedTopics) ? content.relatedTopics : [];
    const resources = Array.isArray(content.resources) ? content.resources : [];

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
                    ${keyPoints.map(p => `<li>${p}</li>`).join('')}
                </ul>
            </div>

            ${relatedTopics.length > 0 ? `
                <div class="related-topics">
                    <h3>${t('topic.relatedTopics')}</h3>
                    <div class="related-chips">
                        ${relatedTopics.map(rt => `<span class="related-chip" onclick="showTopic('${rt.level}', ${rt.index})">${rt.label}</span>`).join('')}
                    </div>
                </div>
            ` : ''}

            ${resources.length > 0 ? `
                <div class="external-resources">
                    <h3>${t('topic.furtherReading')}</h3>
                    <ul>
                        ${resources.map(r => `<li><a href="${r.url}" target="_blank" rel="noopener">${r.title} ↗</a></li>`).join('')}
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
    updateSearchHighlights();
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
(function () {
    let savedTheme;
    try { savedTheme = localStorage.getItem(themeStorageKey); } catch (e) { savedTheme = null; }
    applyTheme(savedTheme || getSystemTheme());
})();
loadProgress();
updateStaticTexts();
updateProgressDisplay();
initAppHeaderPanel();
renderSidebar();
updateLanguageSwitcher();
showWelcome();
