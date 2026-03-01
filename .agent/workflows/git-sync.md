---
description: Synchronisiert Haupt-Branches (main & master) und verhindert divergierende Stände
---

// turbo-all

Dieser Workflow stellt sicher, dass die Entwicklung immer auf dem aktuellsten Stand erfolgt und keine Branch-Wildwuchs entsteht. Er sollte zu Beginn jeder größeren Arbeitssitzung oder bei Branch-Verwirrung ausgeführt werden.

### 1. Status-Check

Überprüfe den aktuellen Branch und vergleiche ihn mit dem Remote-Stand.

```powershell
git fetch origin
git branch -vv
git log master..origin/master --oneline
```

### 2. Haupt-Branch Sicherstellung (Master)

Stelle sicher, dass wir auf `master` arbeiten und dieser aktuell ist.

```powershell
git checkout master
git pull origin master
```

### 3. Synchronisation

Pushe den aktuellen Stand auf GitHub.

```powershell
git push origin master
```

### 4. Bereinigung

Lösche veraltete lokale Branches, die bereits gemergt wurden.

```powershell
git remote prune origin
```

> [!TIP]
> **Goldene Regel:** Erstelle für neue Features immer einen kurzen Feature-Branch (`feat/name`), aber merge ihn zeitnah (spätestens am Ende des Tages) wieder in den `main`. Vermeide es, Wochenlang in einem Branch "festzustecken".
