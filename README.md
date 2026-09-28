# The API Classroom

An accessible, self-paced introduction to REST APIs, using the [Spring Boot grading microservice](https://github.com/justinspratt07/spring-boot-grading-microservice) as a practical case study.

## Course overview

**Introduction to REST APIs** takes approximately 15 minutes. Learners follow a linear sequence: objectives, six short lesson screens, three guided practice tasks, a five-question quiz, and a learning summary.

### Learning objectives

By the end of the course, learners can:

1. Choose the method, endpoint, and JSON fields for a grading request.
2. Predict HTTP 200 or 400 and interpret a grade response.
3. Repair an invalid score and pass the quiz with at least 80%.

## Features

- Local API simulation based on the service's actual endpoint and grading rules.
- Immediate practice feedback, quiz explanations, and unlimited retries.
- One task per screen, progress indicators, course outline, and sticky navigation.
- Responsive layout with at least 20% of viewport width reserved as open side margins.
- Four color schemes, three font choices, and text sizes up to 200%.
- Keyboard navigation, semantic controls, status announcements, and optional device-local read aloud.
- Saved progress and preferences, plus a copyable learning summary.
- SCORM 1.2 package with score, completion status, and resume support.

## Run locally

Download the repository and open `course/index.html` in a modern browser. Keep its companion files together. No build step, external library, or live API is required.

Alternatively, with Python installed:

```sh
python -m http.server 8000 --directory course
```

Then open `http://localhost:8000`.

Practice uses fictional submission details and does not send requests to the grading service. Built-in narration requires a local English voice exposed by the browser.

## Use in an LMS

Import [the SCORM 1.2 package](packages/introduction-to-rest-apis-scorm12.zip) into an LMS sandbox without unzipping it. The pass mark is 80%. The adapter has been tested against a mock LMS API; a live Brightspace import, gradebook, and resume acceptance test remain necessary.

## Documentation

- [Design, testing, and accessibility](docs/DESIGN-AND-TESTING.md)
- [Storyline and Brightspace practice guide](docs/STORYLINE-D2L-GUIDE.md)

This is an HTML course and custom SCORM package, not a native Articulate Storyline project. Full assistive-technology and target-LMS acceptance testing are still pending. At enlarged text sizes, content may scroll vertically rather than being clipped into a fixed-height slide.
