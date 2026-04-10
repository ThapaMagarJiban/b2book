# Git/SCM Assignment Runbook (Nepali)

यो document को उद्देश्य: **project start देखि submission सम्म Git/SCM process follow गरेको clear प्रमाण देखाएर marks maximize गर्नु**।

---

## 0) Scope (यो runbook कुन project को लागि हो)

- Project root (sandbox path):  
  `/home/runner/work/b2book/b2book/BOOK MANAGER/ismt-week-2-copilot-create-trello-board-for-assessment`
- Main app folders:
  - `cet252/API`
  - `cet252/CLIENT`
- API Node requirement: `>=20.10.0`

---

## 1) Setup Evidence (start को प्रमाण)

> Viva/demo को सुरुमा यी commands चलाएर screenshot/log राख।

```bash
cd "/home/runner/work/b2book/b2book/BOOK MANAGER/ismt-week-2-copilot-create-trello-board-for-assessment"
git status
git remote -v
git branch -a
git log --oneline --graph --decorate --all -n 20
```

### What examiner लाई भन्नु
- Repo cloned छ र remote सही छ।
- Work tracked via Git history हुन्छ।
- Main branch stable राखिन्छ।

---

## 2) Branching Rule (marks-friendly workflow)

### Main नियम
- `main` मा direct ठूलो काम नगर्ने।
- हरेक task/feature/fix को लागि छुट्टै branch बनाउने।

```bash
cd "/home/runner/work/b2book/b2book/BOOK MANAGER/ismt-week-2-copilot-create-trello-board-for-assessment"
git checkout main
git pull origin main
git checkout -b feature/<short-task-name>
```

### Good branch name examples
- `feature/book-crud`
- `feature/ui-filter`
- `fix/isbn-validation`
- `docs/scm-runbook`

---

## 3) Daily Work Cycle (one feature को standard flow)

### Step A — change अघि clean state देखाऊ
```bash
git status
```

### Step B — code/doc change गर
- सानो logical change मात्र एउटै commit मा राख।

### Step C — diff देखाऊ (proof of change)
```bash
git diff
```

### Step D — stage + commit
```bash
git add <file1> <file2>
git commit -m "feat(api): add genre filter endpoint"
```

### Step E — commit proof
```bash
git show --stat HEAD
git log --oneline --graph --decorate --all -n 20
```

---

## 4) Commit Message Format (high-scoring habit)

Recommended style:
- `feat(client): add search by title`
- `fix(api): handle duplicate isbn validation`
- `test(api): add books endpoint integration tests`
- `docs: update scm workflow evidence section`
- `chore: update npm scripts`

### Avoid
- `update`
- `changes`
- `final`

---

## 5) Test Proof (merge अघि अनिवार्य)

> यस project मा API र CLIENT दुवै test चलाउनु पर्ने।

```bash
cd "/home/runner/work/b2book/b2book/BOOK MANAGER/ismt-week-2-copilot-create-trello-board-for-assessment/cet252/API"
npm install
npm test

cd "/home/runner/work/b2book/b2book/BOOK MANAGER/ismt-week-2-copilot-create-trello-board-for-assessment/cet252/CLIENT"
npm install
npm test
```

### Evidence attach
- command screenshot
- pass भएको final lines

---

## 6) Push + PR Workflow (review proof)

```bash
cd "/home/runner/work/b2book/b2book/BOOK MANAGER/ismt-week-2-copilot-create-trello-board-for-assessment"
git push -u origin feature/<short-task-name>
```

PR description मा 3 section अनिवार्य राख:
1. **What changed**
2. **Why changed**
3. **How tested**

### Self-review भए पनि
- checklist राख (files checked, tests passed, no secrets, no unrelated files)।

---

## 7) Demo Checklist (हरेक feature मा देखाउने)

- [ ] `git status` change अघि clean थियो
- [ ] `git diff` देखाइयो
- [ ] meaningful commit message गरियो
- [ ] `git show <commit>` देखाइयो
- [ ] `git log --oneline --graph --decorate --all` देखाइयो
- [ ] API + CLIENT tests run गरियो
- [ ] PR opened and reviewed/merged

---

## 8) Do / Don’t (marks काटिने गल्ती रोक्न)

### DO (के गर्ने)
- frequent, small commits
- clear branch names
- PR-based merge
- `.gitignore` maintain (e.g., `node_modules`, env files)
- docs changes separate commit
- milestone मा tag/release (optional but useful)

### DON’T (के नगर्ने)
- main मा direct major development
- vague commit messages
- single commit मा unrelated multiple changes
- secrets / API keys commit
- generated junk वा `node_modules` commit
- failing tests हुँदा push/merge
- submission phase मा repeated force-push/history rewrite

---

## 9) Final Submission Evidence Pack

Submission भन्दा अगाडि यो set complete गर:

1. branch list proof  
   `git branch -a`
2. clean history proof  
   `git log --oneline --graph --decorate --all`
3. PR screenshots (opened + reviewed + merged)
4. test pass proofs (API + CLIENT)
5. optional tag proof:
   ```bash
   git tag -a v1.0.0 -m "Final assignment submission"
   git show v1.0.0
   git push origin v1.0.0
   ```
6. 5–8 line SCM summary (workflow + branching + commit policy + test/review process)

---

## 10) Viva Short Script (memorize-friendly)

- “मैले `main` लाई stable branch राखेर feature branches मा काम गरेको छु।”
- “हरेक feature सानो logical commits मा split गरेको छु।”
- “PR flow follow गरेर merge अगाडि API र CLIENT दुवै tests pass गरेको छु।”
- “Git history, diff, commit show, PR evidence र test logs बाट मेरो SCM process प्रमाणित हुन्छ।”

---

## 11) Quick Rehearsal Commands (one-shot demo)

```bash
cd "/home/runner/work/b2book/b2book/BOOK MANAGER/ismt-week-2-copilot-create-trello-board-for-assessment"
git status
git remote -v
git branch -a
git log --oneline --graph --decorate --all -n 20
git show --stat HEAD
```

यही evidence confidence साथ देखायौ भने Git/SCM marks राम्रो आउँछ।
