# Storyline and D2L practice guide

This guide turns this HTML course into a practical learning exercise for Articulate Storyline and D2L Brightspace. It does not establish hands-on proficiency by itself.

## What is complete

The course is functional HTML/CSS/JavaScript. The ZIP includes a custom SCORM 1.2 manifest and adapter for score, status, and resume data. Adapter behavior was tested with a mock API. No native `.story` project was created, and no Brightspace tenant was accessed.

## Storyboard for a native Storyline rebuild

| Scene | Slides | Learner action |
|---|---|---|
| 1. Start | Welcome and three objectives | Begin the course |
| 2. Learn | Conversation; operations; JSON; response; boundaries; errors | Continue through six short chunks |
| 3. Practice | Request selection; rejected score; score repair | Select POST and endpoint; inspect 105; repair to 89.9 |
| 4. Quiz | Five graded multiple-choice slides and a result slide | Score at least 80%; review or retry |
| 5. Finish | Takeaways | Review learning summary |

Use `course/content.js` for lesson text, question choices, correct answers, and explanations. It is editable plain text; you do not need to run the script to read it.

## Storyline practice session

1. Create and save `Introduction-to-REST-APIs.story`. Build the five scenes above, with a consistent master layout, generous whitespace, Back/Next controls, and visible progress.
2. Build practice using native choice controls, variables, and feedback layers. Use a Boolean for each practice task. Keep Next unavailable until its task succeeds, and retain completed states when learners revisit.
3. Add the five graded questions with equal weight. Configure a result slide with an 80% pass mark, review, and retry. Check that its tracked questions are exactly these five. See [Articulate’s result-slide guidance](https://www.articulatesupport.com/article/Storyline-360-Adding-Result-Slides).
4. Review focus order, accessible names, and keyboard access. Test the text and contrast settings in the version you have installed. Do not assume that a fixed Storyline slide automatically reproduces responsive HTML or arbitrary font switching. Preserve the supplied HTML accessibility version alongside any native rebuild unless equivalent behavior is verified.
5. Preview, then publish an LMS package using quiz results for tracking. Save the editable project, published package, and screenshots of result and tracking settings. Consult the [Storyline 360 guide](https://www.articulatesupport.com/article/Storyline-360-User-Guide) for the current interface.

Evidence to retain: scene view, a practice variable/trigger, a feedback layer, focus-order review, result-slide configuration, published package, and a dated keyboard/screen-reader test note. These are stronger evidence of platform practice than merely displaying an HTML course inside Storyline.

## Brightspace sandbox session

1. Use a sandbox course and an account authorized to add content. Upload `introduction-to-rest-apis-scorm12.zip` through the SCORM/xAPI content workflow. Keep the ZIP intact. Exact menu labels vary by content experience and permissions.
2. Associate the package with a grade item and deliberately choose the grade calculation method. Confirm availability and completion settings before testing as a learner. See [D2L’s SCORM import and management guide](https://community.d2l.com/brightspace/kb/articles/5387-import-and-manage-scorm) and [content guidance](https://community.d2l.com/brightspace/kb/articles/4983-add-and-organize-course-content).
3. With a test learner, exit partway through the lesson and relaunch. Verify the same chunk resumes. Submit a 60% attempt and check failed status, then retry at 80% and check passed status and the grade item. Confirm your selected LMS attempt/grade policy matches the intended behavior.
4. Repeat keyboard and assistive-technology checks inside the actual LMS frame. Verify local voices, display settings, and content access on a phone.

The package reports SCORM `incomplete` until submission, `failed` below 80%, and `passed` at or above 80%. It writes the latest submitted numeric score and stores course state in suspend data. While a retry is in progress, the prior submitted score may remain in the LMS until the new submission; the course’s current attempt status becomes incomplete. Brightspace’s grade aggregation policy can affect the displayed grade, so verify rather than assume.

Evidence to retain: content listing, package settings, grade-item association, learner launch, resumed screen, failed/passed states, gradebook record, and a dated issue/fix log. Avoid including real learner records in portfolio screenshots.

## Accurate portfolio language

For the current project: “Designed an interactive REST API microcourse with measurable objectives, guided practice, formative feedback, a five-question assessment, and documented accessibility and functional testing.”

After you personally complete and verify the platform exercises, you can add specific evidence-based wording such as: “Rebuilt the course in Articulate Storyline and validated SCORM results, resume behavior, and gradebook integration in a D2L Brightspace sandbox.” Do not use that second statement until those activities are complete.
