# ⚰️ The Gravedigger Hook Guide

## What is the Gravedigger?

The Gravedigger is an automated hook that maintains the **BOOK_OF_THE_DEAD.md** - a haunted changelog that records every development cycle in the style of a crypt keeper.

## How to Use

### Trigger the Hook

When you're done with a development session, simply say:

```
"Seal the Tomb"
```

Or any of these variations:
- "Seal Tomb"
- "Close the Crypt"

### What Happens

1. The Gravedigger is summoned
2. You describe what was built/changed
3. The Gravedigger inscribes it in the Book of the Dead
4. Entry is written in crypt keeper style

## Entry Format

Each entry follows this haunted format:

```markdown
### ⚰️ Cycle [Number]: [Feature Name]
**Date Sealed:** [Date]
**Gravedigger's Notes:**

[Crypt keeper style description of what was built]

**Artifacts Interred:**
- File 1
- File 2
- Feature 3

**Status:** Sealed and Buried ✅

---
```

## Example Entry

```markdown
### ⚰️ Cycle 1: The Séance Chamber
**Date Sealed:** December 1, 2025
**Gravedigger's Notes:**

The Séance feature was stitched onto the main body... A Frankenstein 
creation that brings dead links back to life through the Ouija Engine. 
The spirits now speak through keyword-based responses, their words 
appearing character by character like whispers from beyond the grave.

**Artifacts Interred:**
- backend/services/OuijaEngine.js - The mystical board
- backend/services/LLMService.js - The medium
- backend/routes/seanceRoutes.js - The ritual chamber
- frontend/components/SeanceModal.jsx - The portal
- 40+ ghost responses with typing effects

**Status:** Sealed and Buried ✅
```

## The Crypt Keeper's Voice

Entries should be written as if a theatrical crypt keeper is recording them:

- Use dramatic language ("stitched together", "brought to life", "sealed in the crypt")
- Reference death, graves, spirits, and the supernatural
- Be poetic but informative
- Include emojis: 💀 ⚰️ 👻 🕯️ 🪦 ⚡

## Manual Recording

If you want to add an entry manually without the hook:

1. Open `BOOK_OF_THE_DEAD.md`
2. Add a new cycle entry at the bottom
3. Follow the format above
4. Use the crypt keeper's voice

## Hook Configuration

The hook is configured in `.kiro/hooks/gravedigger.json`:

```json
{
  "name": "Gravedigger",
  "trigger": {
    "type": "manual",
    "keywords": ["seal the tomb", "seal tomb", "close the crypt"]
  },
  "enabled": true
}
```

## Benefits

- **Haunted Documentation** - Changelog that matches your theme
- **Automatic Recording** - No need to manually update
- **Theatrical Style** - Makes documentation fun to read
- **Complete History** - Every cycle is preserved
- **Hackathon Ready** - Shows off agent hooks feature

---

*May your code rest in peace... until it's time to resurrect it.* 👻
