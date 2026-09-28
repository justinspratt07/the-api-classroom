'use strict';
window.COURSE = {
 lessons:[
 {title:'A conversation between programs',html:`<p>An <strong>API</strong> is an agreed way for programs to communicate. A client sends a request; a server returns a response.</p><p>Here, a grading form is the client. Your Spring Boot microservice is the server: it turns an assignment score into a letter grade.</p><p class="note">REST is an architectural style with a resource-oriented interface, commonly over HTTP. JSON is a data format, not REST itself.</p>`},
 {title:'Choose the operation',html:`<p>The <strong>method</strong> describes an action. The <strong>endpoint</strong> is its address.</p><p><strong>GET /api/grades/health</strong><br>Checks availability. Returns HTTP 200 and <code>{"status":"ok"}</code>.</p><p><strong>POST /api/grades</strong><br>Sends assignment data for a grade calculation.</p><p class="note">GET retrieves information. POST sends data for processing; it does not always create a stored record.</p>`},
 {title:'Send data as JSON',html:`<p>JSON pairs field names with values. Names use double quotes; the score is a number.</p><pre aria-label="Example request body"><code>{
  "studentName": "Jordan Lee",
  "assignmentName": "Midterm Exam",
  "score": 91.5
}</code></pre><p><code>Content-Type: application/json</code> tells the server how to read the body.</p>`},
 {title:'Interpret the response',html:`<p>A valid <code>POST /api/grades</code> returns <strong>HTTP 200 OK</strong> with the original fields and a calculated grade:</p><pre aria-label="Successful response"><code>{
  "studentName": "Jordan Lee",
  "assignmentName": "Midterm Exam",
  "score": 91.5,
  "letterGrade": "A"
}</code></pre><p>The service does not store the submission. HTTP 200 means the calculation succeeded, not that a student record was created.</p>`},
 {title:'Apply the grading rules',html:`<p>Both names must be nonblank. A numeric score from <strong>0 to 100</strong> is required. Decimals are not rounded.</p><table><caption>Score boundaries</caption><thead><tr><th scope="col">Score</th><th scope="col">Grade</th></tr></thead><tbody><tr><td>90–100</td><td>A</td></tr><tr><td>80 to less than 90</td><td>B</td></tr><tr><td>70 to less than 80</td><td>C</td></tr><tr><td>60 to less than 70</td><td>D</td></tr><tr><td>0 to less than 60</td><td>F</td></tr></tbody></table><p>89.9 returns B; 90 returns A. Even an F grade returns HTTP 200 when the request is valid.</p>`},
 {title:'Read the error, then repair',html:`<p>A score of 105 returns <strong>HTTP 400 Bad Request</strong>:</p><pre aria-label="Validation error response"><code>{
  "status": 400,
  "message": "Validation failed",
  "errors": {
    "score": ["score must be at most 100"]
  }
}</code></pre><p>Correct the named field and resend. Missing scores, blank names, and malformed JSON also produce HTTP 400.</p>`}
 ],
 questions:[
 {q:'Which request calculates a grade?',choices:['GET /api/grades/health','POST /api/grades','POST /api/grades/health'],correct:1,why:'POST /api/grades sends submission data for calculation. GET /api/grades/health only checks availability.',objective:1},
 {q:'Both names are nonblank. Which score field makes the JSON body valid?',choices:['Omit the score field','"score": 105','"score": 91.5'],correct:2,why:'The score must be present and numeric, from 0 to 100 inclusive. 91.5 is valid; a missing score or 105 is not.',objective:1},
 {q:'A valid request has score 89.9. What is the response?',choices:['HTTP 200 with grade B','HTTP 200 with grade A','HTTP 400: decimals are invalid'],correct:0,why:'Decimals are accepted without rounding. 89.9 is below 90, so the grade is B. The successful calculation returns HTTP 200.',objective:2},
 {q:'HTTP 400 says “score must be at most 100.” How do you repair it?',choices:['Change POST to GET','Use a score from 0 to 100 and resend','Round 105 up to 110'],correct:1,why:'The error identifies an out-of-range score. Repair that value and resend the POST request. Changing the method does not fix the score.',objective:3},
 {q:'What does a successful grading response tell you about storage?',choices:['A permanent student record was created','The grade can be retrieved later','The grade was calculated, not stored'],correct:2,why:'This microservice is stateless and has no database. HTTP 200 confirms a calculation, not creation of a stored student record.',objective:2}
 ]
};
