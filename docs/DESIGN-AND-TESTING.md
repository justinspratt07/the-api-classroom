# Design, testing, and accessibility record

Course: **Introduction to REST APIs**  
Course identity: **The API Classroom**  
Review date: September 27, 2026

## Learning design

Audience: learners new to APIs; no coding prerequisite. Estimated duration: 15 minutes, including practice and one quiz attempt. Sequence: start → learn → practice → quiz → finish. Previously unlocked content remains available for review. Completion requires all three practice tasks and at least four correct quiz answers.

| Measurable objective | Instruction | Activity and evidence |
|---|---|---|
| Choose the method, endpoint, and JSON fields for a grading request | Lesson screens 2–3 | Practice request selection; quiz questions 1–2 |
| Predict HTTP 200 or 400 and interpret a grade response | Lesson screens 4–6 | Practice rejection and success responses; quiz questions 3 and 5 |
| Repair an invalid score and pass the quiz with at least 80% | Lesson screens 5–6 | Change 105 to 89.9; quiz question 4 and overall 4/5 pass requirement |

The formative activity provides immediate corrective feedback. The quiz presents one question at a time, then gives a score and one explanation per review screen. Every question has equal weight (20 points); unanswered questions cannot be submitted. Retrying clears the answers and current completion status. It is a learning assessment, not a secure examination.

## Source fidelity

Reviewed [source revision b07f2145b385b14322ecd9198f5ea6b6639017ca](https://github.com/justinspratt07/spring-boot-grading-microservice/tree/b07f2145b385b14322ecd9198f5ea6b6639017ca), including `GradeController`, `GradeRequest`, `GradeService`, `ApiExceptionHandler`, and README.

- POST `/api/grades` returns HTTP 200 with studentName, assignmentName, score, and letterGrade.
- GET `/api/grades/health` returns HTTP 200 and `{"status":"ok"}`.
- Required nonblank names; required numeric score from 0 to 100 inclusive.
- A ≥90, B ≥80, C ≥70, D ≥60, F otherwise; no rounding.
- Missing and out-of-range scores receive HTTP 400 field errors.
- The service calculates without storing the submission.

The exercise is explicitly a local simulation, not a connection to the Java service. Fictional names remain fixed. Invalid method/endpoint choices receive instructional feedback rather than invented server responses. The simulated input surface covers numeric scores; it is not a full Spring/Jackson emulator. Malformed JSON and blank-name behavior are taught from source, not exercised through a free-form JSON editor.

HTTP concepts were checked against [RFC 9110](https://www.rfc-editor.org/rfc/rfc9110.html). POST does not inherently mean creation; this specific operation returns 200, not 201.

## Layout

The course uses an academic, linear modular layout with progress at a glance, sticky navigation, and one task per screen. White/navy is the default palette; high-contrast alternatives are available.

The content column is `min(80vw, 800px)` wide, reserving at least 20% of viewport width as open side gutters. Dialogs use no more than 80vw. All six lesson chunks fit at 390×844 with standard text in the executed check.

Chunks are not fixed-height slides. Large text, expanded response details, and smaller displays can scroll vertically. On narrow screens at 150%–200% text, the header scrolls with the page while bottom navigation stays sticky. Very short viewports release both sticky regions to preserve access.

## Executed tests

Environment: Chromium on Windows, using a local course server. Functional checks used accessible controls and browser automation. Viewports: 1440×1000, 1505×1045, 390×844, and 320×740. Syntax and adapter checks used Node.js.

| Check | Result and observed evidence |
|---|---|
| Page identity / nonblank | Correct course title and meaningful course content in accessibility tree |
| Runtime health | No relevant browser warnings/errors in the final captured log; no framework overlay |
| Linear navigation | Start, all six lesson chunks, three practice screens, five questions, review, results, and finish exercised |
| Request selection | Incorrect selection received correction; POST `/api/grades` unlocked Continue |
| Invalid score | 105 returned HTTP 400 with `score must be at most 100` |
| Required score | Cleared field by keyboard; HTTP 400 with `score is required` |
| Outside boundaries | −1 and 101 returned appropriate HTTP 400 errors |
| Valid boundaries | 0→F, 59.9→F, 60→D, 69.9→D, 70→C, 79.9→C, 80→B, 89.9→B, 90→A, 100→A; all HTTP 200 |
| Repair task | 105→89.9 yielded HTTP 200/B and unlocked quiz |
| Missing quiz answer | Continue announced a correction and focused the first answer |
| Failed quiz | 3/5 produced 60%; Continue to finish disabled |
| Review / retry | Explanations traversed; retry cleared selections and allowed another attempt |
| Pass threshold | 4/5 produced 80%; finish unlocked; completion counter reached 5/5 |
| Resume | Reload retained current question and later retained completed result |
| Themes | Academic, black/white, white/black, and yellow/black verified through controls and computed colors |
| Text customization | System sans serif, Georgia, and monospace applied correctly; 200% applied; restore defaults worked |
| Responsive fit | Six lesson chunks at 390×844 remained above footer, with no horizontal overflow |
| Enlarged text | 320×740 at 200% allowed vertical access; no page horizontal overflow; bottom controls reachable |
| Keyboard / dialogs | Keyboard field clearing, Tab navigation, focused validation, and Escape dismissal; focus returned to preferences opener |
| Read aloud | Local English voices populated; Read, Pause, Resume, and Stop produced correct control/status transitions |
| Learning summary | Summary modal opened; Copy summary returned “Summary copied” |
| Package | XML well formed; launch resources present; ZIP integrity passed; manifest at archive root |
| SCORM adapter | Mock-API checks passed for initialization, incomplete/failed/passed, 80% score, resume data, lesson location, suspend-data size, finish once, standalone launch, and init/commit errors |
| Contrast calculation | Every tested theme passed 4.5:1 text and 3:1 UI/focus thresholds; values in `contrast-results.json` |

An early empty-field attempt using the browser automation’s fill operation did not clear the control, so that result was rejected and repeated using keyboard selection/deletion. The confirmed missing-score outcome is documented above.

## Issues found and addressed

1. A long instructional page was replaced with six one-idea lesson chunks and single-question quiz screens.
2. At 200% on a narrow screen, a sticky header could occupy more than the viewport. It now scrolls with the page in that setting; bottom navigation remains accessible.
3. Quiz results could otherwise become inconsistent after editing a submitted attempt. Reopening a submitted quiz now leads to results; changing answers requires Retry.
4. The embedded browser did not expose a download event for the Blob-based summary. The feature was replaced with a visible, copyable learning-summary dialog; copying was verified.
5. A narrow enlarged-text Back button wrapped awkwardly. Its padding was reduced without reducing font size or target height.

## Accessibility approach and limits

Implemented with reference to [WCAG 2.2](https://www.w3.org/TR/WCAG22/) and the [WAI quick reference](https://www.w3.org/WAI/WCAG22/quickref/):

- Semantic main/header/footer, headings, labels, fieldsets/legends, real buttons and radios, progress label, and current-step indicator.
- A keyboard-visible skip link; native tab order; focus moved to the current module; native modal dialog containment and Escape support.
- Polite status regions for practice, speech, storage, and copy feedback. Invalid score input is marked with `aria-invalid`.
- Meaning communicated in text, never color alone. Text/button contrast meets calculated targets for all themes.
- Minimum 44px control height, responsive wrapping, relative font sizes, and 100/125/150/200% controls; browser zoom is not disabled.
- No timers, motion, drag requirements, automatic audio, or essential imagery.
- Built-in read aloud uses only English voices marked device-local by the browser, with voice, rate, pause/resume, and stop. It includes visible module text and activity feedback. It is an optional reading aid, not a replacement for a full screen reader. The [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance) underlies the feature.

Primary text contrast: academic 14.37:1; black/white 21:1; white/black 21:1; yellow/black 19.56:1. Academic secondary text: 7.58:1. See the JSON evidence for panel, border, focus, and progress measurements.

**Not yet verified:** a full NVDA/JAWS/VoiceOver/Narrator session, audible pronunciation/voice quality, Safari/Firefox, mobile operating-system voices, browser zoom at 400%, user research, actual Brightspace gradebook/resume behavior, or a Storyline-authored build. DOM and control testing is not a WCAG conformance certification. Before deployment, test assistive technology with actual users and the target LMS/browser combination.

Recommended final manual acceptance: complete all tasks with keyboard only; read each chunk with NVDA or VoiceOver; confirm status announcements are not duplicated; test forced-colors mode and 400% zoom; import SCORM into a sandbox and verify 60%, 80%, retry, exit, and resume with a learner account.
