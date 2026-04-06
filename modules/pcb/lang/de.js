// ════════════════════════════════════════════════════════
// German Language Pack (de)
// ════════════════════════════════════════════════════════
// To add a new language, copy this file to lang/XX.js and:
//   1. Change the code ('de' → 'XX') and label.
//   2. Translate all string values.
//   3. Translate all lesson content in lang/de/*.js (no runtime auto-translate).
//   4. Add 'XX' to lang/manifest.js.
// ════════════════════════════════════════════════════════

i18n.registerLanguage('de', 'Deutsch', {

    // ── App Header ──
    'app.title': 'Elektronik- & PCB-Design-Trainer',
    'header.progress': 'Fortschritt',
    'header.xp': 'XP',
    'header.level': 'Stufe %s',
    'header.streak': 'Serie',
    'header.statsToggle.expand': 'Details zu Fortschritt, XP und Serie anzeigen',
    'header.statsToggle.expandWithSummary': 'Details zu Fortschritt, XP und Serie anzeigen (aktuell %s)',
    'header.statsToggle.collapse': 'Details zu Fortschritt, XP und Serie ausblenden',
    'header.appToggle.expand': 'Vollständige Kopfzeile öffnen (%s)',
    'header.appToggle.collapse': 'Kopfzeile schließen',
    'header.appToggle.collapseLabel': 'Kopfzeile schließen',

    // ── Sidebar ──
    'sidebar.title': '📚 Kursübersicht',
    'sidebar.menu': 'Menü',
    'search.label': '🔎 Inhalte suchen',
    'search.placeholder': 'Lektionen, Übungen, Szenarien und Quellen durchsuchen',
    'search.clear': 'Löschen',
    'search.help': 'Suche im Lektionstext, in Kernpunkten, Übungen, Szenarien und Quellen.',
    'search.summary': '%s Themen gefunden · %s Treffer',
    'search.noResults': 'Keine Treffer für "%s"',
    'search.topicCount': '%s Themen',

    // ── Level Names ──
    'level.level1.name': 'Stufe 1: Anfänger',
    'level.level2.name': 'Stufe 2: Fortgeschrittene',
    'level.level3.name': 'Stufe 3: Experten',
    'level.level4.name': 'Stufe 4: Post-Advanced',

    // ── Category Names ──
    'category.essential': 'Grundlagen',
    'category.embedded': 'Embedded',
    'category.robotics': 'Robotik',

    // ── Welcome View ──
    'welcome.heading': 'Willkommen beim Elektronik- & PCB-Design-Trainer',
    'welcome.description': 'Wähle in der Seitenleiste ein Thema, um zu starten. Jedes Thema enthält Lerninhalt, die wichtigsten Erkenntnisse und interaktive Übungen zum Überprüfen deines Verständnisses.',
    'welcome.totalXP': 'Gesamt-XP',
    'welcome.exercisesDone': 'Abgeschlossene Übungen',
    'welcome.scenariosSolved': 'Gelöste Szenarien',

    // ── Achievements ──
    'achievements.title': '🏆 Erfolge',
    'achievement.first_steps.title': 'Erste Schritte',
    'achievement.first_steps.desc': 'Erstes Thema abgeschlossen',
    'achievement.beginner_master.title': 'Anfänger-Meister',
    'achievement.beginner_master.desc': 'Stufe 1 abgeschlossen',
    'achievement.quiz_master.title': 'Quiz-Meister',
    'achievement.quiz_master.desc': '10 Übungen abgeschlossen',
    'achievement.scenario_solver.title': 'Szenario-Löser',
    'achievement.scenario_solver.desc': '5 Szenarien gelöst',
    'achievement.intermediate.title': 'Ingenieur (Fortgeschritten)',
    'achievement.intermediate.desc': 'Stufe 2 abgeschlossen',
    'achievement.advanced.title': 'Fortgeschrittener Designer',
    'achievement.advanced.desc': 'Stufe 3 abgeschlossen',
    'achievement.expert.title': 'Experte',
    'achievement.expert.desc': 'Stufe 4 abgeschlossen',
    'achievement.perfectionist.title': 'Perfektionist',
    'achievement.perfectionist.desc': '100 % abgeschlossen',

    // ── Topic View ──
    'topic.comingSoon': 'Die Inhalte zu diesem Thema folgen in Kürze.',
    'topic.keyTakeaways': '🎯 Wichtigste Erkenntnisse',
    'topic.relatedTopics': '🔗 Verwandte Themen',
    'topic.furtherReading': '📚 Weiterführende Quellen',
    'topic.markCompleted': '✅ Als erledigt markieren (+20 XP)',
    'topic.completed': '✅ Abgeschlossen',
    'topic.nextTopic': 'Nächstes Thema →',
    'topic.nextLevel': 'Nächste Stufe →',

    // ── Exercises ──
    'exercises.title': '🎯 Übungen — Wissen testen',
    'exercises.retry': '🔄 Übungen wiederholen',
    'exercises.submitAnswer': 'Antwort absenden',
    'exercises.checkAnswer': 'Antwort prüfen',
    'exercises.selectAnswer': 'Bitte wähle eine Antwort aus.',
    'exercises.selectTrueFalse': 'Bitte wähle Richtig oder Falsch aus.',
    'exercises.enterNumeric': 'Bitte gib eine numerische Antwort ein.',
    'exercises.calculation': '📐 Berechnung',
    'exercises.trueOrFalse': '✅ Richtig oder Falsch',
    'exercises.true': '✅ Richtig',
    'exercises.false': '❌ Falsch',
    'exercises.typePlaceholder': 'Antwort eingeben ...',

    // ── Quiz Results ──
    'quiz.correct': '✅ Richtig! +%s XP',
    'quiz.correctCalc': '✅ Richtig! (Antwort: %s%s) +%s XP',
    'quiz.incorrect': '❌ Nicht richtig.',
    'quiz.incorrectCalc': '❌ Nicht ganz. Die richtige Antwort ist %s%s.',

    // ── Scenarios ──
    'scenarios.title': '🔧 Praxis-Szenario',
    'scenario.excellent': '✅ Sehr gut! +%s XP',
    'scenario.notQuite': '❌ Nicht ganz.',

    // ── Notifications ──
    'notification.levelUp': '🎉 Stufenaufstieg! Du bist jetzt Stufe %s.',
    'notification.achievement': '🏆 Erfolg: %s!',
    'notification.completed': '✅ Abgeschlossen: %s',

    // ── Visual Reference Modal ──
    'visualRef.title': '🖼️ Visuelle Referenz',
    'visualRef.openNewTab': 'In neuem Tab öffnen ↗',

    // ── Language Switcher ──
    'language.label': '🌐',

    // ── Theme Toggle ──
    'theme.dark': 'Dunkel',
    'theme.light': 'Hell',
    'theme.switchToDark': 'Zum dunklen Modus wechseln',
    'theme.switchToLight': 'Zum hellen Modus wechseln'
});
