# Portfolio Task B2 – Trello Full Answer (Nepali + Practical Guide)

## 1) B2 Scenario ko clear analysis

Timro assignment ko core goal:
- Node/Express use गरेर **database-driven REST API** बनाउने
- CRUD support (GET, POST, PUT, DELETE) देखाउने
- Client app बाट API consume भएको देखाउने
- Low-fidelity wireframe + Figma high-fidelity interactive prototype बनाउने
- Agile planning को proof का लागि **Kanban/Trello board** maintain गर्ने
- अन्त्यमा screencast (audio + webcam) मा सबै functionality र tests देखाउने

Yo assessment मा **planning evidence** धेरै important छ। त्यसैले Trello board मा:
- clear backlog (To Do cards)
- in-progress work (Doing)
- quality gate (In Review)
- verified completion (Done)
देखिनु पर्छ।

---

## 2) Timro existing codebase ko analysis (repo-based)

Current repository (`cet252/API` + `cet252/CLIENT`) बाट देखिएको अवस्था:

### API side (strong points)
- Express server entry: `server.js`
- JSON APIs available (`/`, `/api`, `/api/books`, `/api/books/:id`, `/api/books/genres`)
- CRUD behavior tests बाट verify भएको छ (GET/POST/PUT/DELETE)
- SQLite via `better-sqlite3`
- API docs support (`apidoc` script + `/docs` static route)
- Node engine requirement already aligned: `>=20.10.0`

### Client side (current points)
- Vanilla JS client structure
- Jest tests for helper logic and sanitization
- GET data presentation behavior aligned with API consumption idea

### Testing status
- `npm test` in both API and CLIENT currently pass.

### B2 requirement vs likely gap checklist
- [x] REST CRUD API
- [x] Local database usage
- [x] JSON responses
- [x] Node/Express tooling
- [x] Some tests present
- [ ] Low-fidelity wireframes (separate design evidence needed)
- [ ] Figma high-fidelity interactive prototype evidence
- [ ] Client functional test using TestCafe (or equivalent) if not yet added as required evidence
- [ ] Final screencast evidence tying all parts together

---

## 3) Trello board structure (4 columns as requested)

Use these exact columns:
1. **To Do**
2. **Doing**
3. **In Review**
4. **Done**

### Recommended labels (Trello tags)
- `API`
- `CLIENT`
- `DATABASE`
- `WIREFRAME`
- `FIGMA`
- `TEST`
- `DOCS`
- `VIDEO`
- `HIGH PRIORITY`

---

## 4) Trello ma राख्ने cards (copy-paste ready)

> Tip: Sabai cards initially **To Do** मा राख। काम सुरु हुँदा Doing, पूरा भएपछि In Review, verify भएपछि Done मा सार।

### Card 1: Project scope and topic finalize
**User Story:**  
As a junior developer, I want to finalize a clear prototype topic so that all later work stays consistent.

**Acceptance Criteria (flip side):**
- Topic defined and approved
- Core entities listed (e.g., books)
- Scope fits Friday prototype timeline

**Functionality Notes:**
- Keep MVP small and demo-friendly
- Must support full CRUD in API

---

### Card 2: Create API project setup
**User Story:**  
As a developer, I want Node + Express project initialized so I can build REST endpoints.

**Acceptance Criteria:**
- Node 20.10+ compatible setup
- Express installed
- Start/dev scripts working

**Functionality Notes:**
- Use NPM package management
- Ensure JSON middleware enabled

---

### Card 3: Database schema + seed data (20+ records)
**User Story:**  
As a developer, I want a realistic SQLite database so API can persist and return meaningful records.

**Acceptance Criteria:**
- SQLite schema created
- Minimum 20 realistic records seeded
- Fields support CRUD operations

**Functionality Notes:**
- Include title/author/genre/year/isbn/availability-like fields
- Keep ISBN unique

---

### Card 4: Implement GET endpoints
**User Story:**  
As a client user, I want to fetch all records and single records so I can browse data.

**Acceptance Criteria:**
- GET all endpoint works
- GET by id endpoint works
- JSON response format consistent

**Functionality Notes:**
- Add filtering/search query support if possible

---

### Card 5: Implement POST endpoint
**User Story:**  
As a user, I want to add a new record so data can grow dynamically.

**Acceptance Criteria:**
- Required field validation
- Valid creation response (201)
- Duplicate ISBN blocked

**Functionality Notes:**
- Return created object in JSON

---

### Card 6: Implement PUT endpoint
**User Story:**  
As a user, I want to update an existing record so I can fix or change data.

**Acceptance Criteria:**
- Record update works for valid id
- 404 for non-existing id
- 400 for invalid payload

**Functionality Notes:**
- Support partial update if your design allows

---

### Card 7: Implement DELETE endpoint
**User Story:**  
As a user, I want to delete a record so obsolete data can be removed.

**Acceptance Criteria:**
- Delete works for valid id
- 404 for missing id
- JSON confirmation message returned

**Functionality Notes:**
- Use HTTP DELETE method properly

---

### Card 8: API documentation (APIDOC)
**User Story:**  
As a team member, I want endpoint documentation so API usage is clear.

**Acceptance Criteria:**
- Every endpoint documented
- Generated APIDOC site available
- Request/response examples included

**Functionality Notes:**
- Keep docs synced with real endpoint behavior

---

### Card 9: Low-fidelity wireframes
**User Story:**  
As a designer/developer, I want low-fi screens so UI flow is clear before hi-fi work.

**Acceptance Criteria:**
- CRUD-related screens sketched
- Navigation flow shown
- Notes for major components included

**Functionality Notes:**
- Can use paper or simple digital wireframe

---

### Card 10: High-fidelity Figma prototype
**User Story:**  
As a stakeholder, I want an interactive hi-fi prototype so I can review UX before implementation.

**Acceptance Criteria:**
- All CRUD screens created
- Realistic data + good imagery
- Prototype mode clickable flow works

**Functionality Notes:**
- Show both design mode and prototype mode in demo

---

### Card 11: Build client GET integration
**User Story:**  
As an end user, I want to view API data in client UI so the system is useful.

**Acceptance Criteria:**
- Client calls GET endpoint successfully
- Data displayed clearly in UI
- Handles empty/error state

**Functionality Notes:**
- Keep API base URL configurable locally

---

### Card 12: Client UX polish and responsiveness
**User Story:**  
As an end user, I want readable and polished UI so data is easy to understand.

**Acceptance Criteria:**
- Consistent spacing/colors/typography
- Works on common desktop/laptop width
- Basic accessibility improvements

**Functionality Notes:**
- Match hi-fi prototype style as close as possible

---

### Card 13: Functional testing (client/API behavior)
**User Story:**  
As a developer, I want automated functional checks so regressions are caught early.

**Acceptance Criteria:**
- Core workflow tests executed
- Test results captured
- Failures fixed before final demo

**Functionality Notes:**
- Use TestCafe or equivalent accepted framework

---

### Card 14: Git workflow and feature branches
**User Story:**  
As a developer, I want structured commits/branches so progress is traceable.

**Acceptance Criteria:**
- Feature branches used
- Meaningful commit messages
- Merge history reflects planned tasks

**Functionality Notes:**
- Map branch names to Trello card IDs if possible

---

### Card 15: Final screencast preparation
**User Story:**  
As an assessor, I want a clear narrated demo so I can verify quality and decisions.

**Acceptance Criteria:**
- Webcam + audio + screen captured
- API + Client + Tests + Figma all shown
- Design decisions explained

**Functionality Notes:**
- Keep demo structured: Intro → API → Client → Tests → Figma → Conclusion

---

### Card 16: Final QA and submission pack
**User Story:**  
As a student, I want a final quality check so submission is complete and consistent.

**Acceptance Criteria:**
- All required artifacts present
- Trello board fully updated
- Recording and links verified

**Functionality Notes:**
- Use same naming format for files and folders

---

## 5) Photo/Screenshot attach garna milxa vane कुन photo halne?

Yes, attach garna milxa भने यी photo/screenshots राख्दा board strongly professional देखिन्छ:

1. **Trello board full view screenshot** (all 4 columns visible)
2. **Each important card back screenshot** (user story + acceptance criteria + notes visible)
3. **Wireframe screenshots** (low-fi)
4. **Figma design mode screenshot**
5. **Figma prototype mode screenshot**
6. **API endpoint test screenshot** (GET/POST/PUT/DELETE outputs e.g., Postman/Thunder Client)
7. **APIDOC page screenshot**
8. **Client UI screenshot with fetched API data**
9. **Test pass screenshot** (`npm test` outputs)
10. **Git commit history screenshot** (feature branch evidence)

If short recording मा सबै देखाउने हो भने पनि कम्तीमा 1, 2, 4, 5, 8, 9 राख।

---

## 6) In Review column कसरी use गर्ने? (important)

`In Review` मा पुगेको card मा यो checklist add गर:

- [ ] Requirement meet भएको छ
- [ ] Acceptance criteria सबै tick गरिएको छ
- [ ] Demo/screenshot proof attached
- [ ] Related test pass भएको छ
- [ ] Documentation updated
- [ ] Move to Done approved

Yo use गर्दा “Done” column सिर्फ truly verified कामको लागि हुन्छ।

---

## 7) Trello मा जानकारी कसरी राम्रोसँग include गर्ने (Guideline)

For each card:
1. **Title** = clear action (e.g., “Implement POST /api/books”)
2. **Description top** = user story format  
   `As a <user>, I want <goal>, so that <benefit>`
3. **Checklist 1** = Acceptance Criteria
4. **Checklist 2** = Technical Tasks
5. **Attachments** = screenshot/proof/docs links
6. **Labels** = API/CLIENT/TEST/etc.
7. **Due date** = realistic timeline
8. **Members** = owner assign
9. **Comments** = progress updates + blockers

---

## 8) Short recording script (submission ko lagi)

1. Board overview (4 columns)
2. To Do card breakdown and why tasks are manageable
3. 2–3 cards खोलेर flip side acceptance criteria देखाउने
4. Doing → In Review → Done flow explain गर्ने
5. API running + CRUD quick demo
6. Client GET demo
7. Tests pass देखाउने
8. Figma prototype navigation देखाउने
9. Final reflection (what went well / next improvements)

---

## 9) Quick “ready-to-copy” Trello card back template

```text
User Story:
As a <type of user>,
I want <some goal>,
so that <some reason>.

Acceptance Criteria:
- [ ] ...
- [ ] ...
- [ ] ...

Functionality Notes:
- ...
- ...

Evidence Attachments:
- Screenshot:
- Test output:
- Link:
```

---

## 10) Suggested board name

**B2 Portfolio – Book Manager Prototype (Kanban)**

Yo file ko content directly Trello मा use गर्न मिल्छ।  
Need भए next step मा ma timilai **direct Trello import-friendly CSV format** पनि बनाएर दिन सक्छu.

