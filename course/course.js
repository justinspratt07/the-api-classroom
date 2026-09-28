'use strict';
(() => {
const $=id=>document.getElementById(id),data=window.COURSE;
const names=['Start','Learn','Practice','Quiz','Finish'];
const fullNames=['Start here','Learn the request–response cycle','Practice with the grading API','Check your understanding','Finish and review'];
const key='rest-course-linear-v2';
const fresh=()=>({step:0,slide:0,unlocked:0,complete:[false,false,false,false,false],practice:[false,false,false],answers:[null,null,null,null,null],submitted:false,score:null,attempts:0});
let state=fresh(),prefs={theme:'academic',font:'system',size:'100',rate:'1',voice:''},storage=true;
try{const saved=window.CourseLMS.active?window.CourseLMS.load():JSON.parse(localStorage.getItem(key)||'null');if(saved&&Number.isInteger(saved.step)&&saved.step>=0&&saved.step<=4&&Array.isArray(saved.complete)&&saved.complete.length===5&&Array.isArray(saved.answers)&&saved.answers.length===5&&Number.isInteger(saved.slide)&&saved.slide>=0&&saved.slide<=10)state={...state,...saved};prefs={...prefs,...JSON.parse(localStorage.getItem(key+'-preferences')||'{}')};}catch{storage=false;}
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function save(){try{if(!window.CourseLMS.active)localStorage.setItem(key,JSON.stringify(state));localStorage.setItem(key+'-preferences',JSON.stringify(prefs));}catch{storage=false;}window.CourseLMS.save(state);$('storage-status').textContent=window.CourseLMS.warning||(storage?'':'Storage unavailable. Keep this tab open; progress will not be saved.');}
function applyPrefs(){for(const k of ['theme','font','size','rate']){if(!Array.from($(k).options).some(o=>o.value===String(prefs[k])))prefs[k]=({theme:'academic',font:'system',size:'100',rate:'1'})[k];$(k).value=prefs[k];}document.documentElement.dataset.theme=prefs.theme;document.documentElement.dataset.font=prefs.font;document.documentElement.dataset.size=prefs.size;document.documentElement.style.fontSize=prefs.size+'%';save();}
for(const k of ['theme','font','size','rate'])$(k).onchange=()=>{prefs[k]=$(k).value;applyPrefs();if(k==='rate')stopSpeech('Speed changed. Start reading again to use it.');};
$('restore-preferences').onclick=()=>{prefs={...prefs,theme:'academic',font:'system',size:'100'};applyPrefs();};
$('preferences-toggle').onclick=()=>$('preferences').showModal();
$('outline-toggle').onclick=()=>{updateOutline();$('outline').showModal();};
document.querySelectorAll('[data-close]').forEach(b=>b.onclick=()=>$(b.dataset.close).close());
function updateOutline(){$('roadmap').innerHTML=fullNames.map((n,i)=>`<li><button data-step="${i}" ${i>state.unlocked?'disabled':''} ${i===state.step?'aria-current="step"':''}>${n}<small>${i===state.step?'Current · ':''}${state.complete[i]?'Complete':i<=state.unlocked?'Available':'Complete earlier steps first'}</small></button></li>`).join('');$('roadmap').querySelectorAll('button').forEach(b=>b.onclick=()=>{$('outline').close();navigate(Number(b.dataset.step),0);});}
function setNav(label,nextHint,disabled=false){$('next').textContent=label;$('next').disabled=disabled;$('next').hidden=false;$('next-label').textContent=nextHint;$('back').hidden=state.step===0;}
function page(title,html,label){return `<p class="chunk-label">${label}</p><h2 id="module-title">${title}</h2>${html}`;}
function render(){
 $('step-label').textContent=`Step ${state.step+1} of 5 · ${names[state.step]}`;
 const count=state.complete.filter(Boolean).length;$('completed-label').textContent=`${count} of 5 steps complete`;$('progress').value=count;
 $('activity-status').textContent='';
 let html='';
 if(state.step===0){html=`<p class="chunk-label">15 minutes · Self-paced</p><h1 id="module-title">Introduction to REST APIs</h1><p>Learn with the Spring Boot grading microservice.</p><h2 class="small-heading">By the end, you can:</h2><ol class="objectives"><li>Choose the method, endpoint, and JSON fields for a grading request.</li><li>Predict HTTP 200 or 400 and interpret a grade response.</li><li>Repair an invalid score and pass the quiz with at least 80%.</li></ol><p class="hint">No coding experience required. Practice, then answer five questions. Unlimited retries; no time limit.</p>`;setNav('Continue to lesson','Next: learn the request–response cycle');}
 if(state.step===1){const l=data.lessons[state.slide]||data.lessons[0];html=page(l.title,l.html,`Lesson ${state.slide+1} of 6`);setNav(state.slide===5?'Continue to practice':'Continue',state.slide===5?'Next: build a grading request':`Next: ${data.lessons[state.slide+1].title.toLowerCase()}`);}
 if(state.step===2){
  if(state.slide===0){html=page('Build a grading request',`<p>Choose the method and endpoint that calculate a letter grade.</p><p class="hint">Local simulation; no data is sent. Fictional submission: Jordan Lee, Midterm Exam.</p><form id="request-form"><label>HTTP method<select id="method"><option value="">Choose a method</option><option>GET</option><option>POST</option></select></label><label>Endpoint<select id="endpoint"><option value="">Choose an endpoint</option><option>/api/grades/health</option><option>/api/grades</option></select></label><button class="primary" type="submit">Check request</button></form>`,`Practice 1 of 3`);setNav('Continue','Next: send an invalid score',!state.practice[0]);}
  else {const repair=state.slide===2;html=page(repair?'Repair the score':'Inspect a rejected request',`<p>${repair?'Change the score to <strong>89.9</strong> and send it. Check that the response is HTTP 200 with grade B.':'Send a score of <strong>105</strong>. Read the validation error.'}</p><p class="hint">Simulation: POST /api/grades · JSON<br>Jordan Lee · Midterm Exam</p><form id="score-form" novalidate><label>Score<input id="score" type="number" step="any" value="105" aria-describedby="score-help"></label><p class="hint" id="score-help">The service accepts scores from 0 to 100.</p><button class="primary" type="submit">Send simulated request</button></form><div id="response-area" hidden><p id="response-summary"></p><details><summary>View full JSON response</summary><pre id="response"></pre></details></div>`,`Practice ${state.slide+1} of 3`);setNav(repair?'Continue to quiz':'Continue',repair?'Next: five-question quiz':'Next: repair the score',!state.practice[state.slide]);}
 }
 if(state.step===3){
  if(state.slide<5){const q=data.questions[state.slide];html=`<p class="chunk-label">Question ${state.slide+1} of 5 · Pass: 4 correct (80%)</p><h2 id="module-title" class="sr-only">Quiz question ${state.slide+1}</h2><fieldset><legend>${esc(q.q)}</legend>${q.choices.map((c,j)=>`<label class="choice"><input type="radio" name="answer" value="${j}" ${state.answers[state.slide]===j?'checked':''}><span>${esc(c)}</span></label>`).join('')}</fieldset><p class="hint">Feedback appears after you submit all five answers.</p>`;setNav(state.slide===4?'Submit quiz':'Save and continue',state.slide===4?'Next: quiz results':`Next: question ${state.slide+2}`);}
  else if(state.slide===5){html=page(state.score>=80?'Quiz passed':'Keep practicing',`<p class="score">${state.score}% · ${state.score/20} of 5 correct</p><p>${state.score>=80?'You met the 80% pass mark. Continue to finish, or review the answer explanations.':'You need four correct answers to pass. Review the explanations, then try again.'}</p><p class="hint">Attempt ${state.attempts}. Each question is worth 20 points.</p><div class="actions"><button id="review">Review answers</button><button id="retry">Retry quiz</button></div>`,'Quiz results');setNav('Continue to finish','Next: summary and takeaways',state.score<80);}
  else {const i=state.slide-6,q=data.questions[i],correct=state.answers[i]===q.correct;html=page(correct?'Correct':'Review this answer',`<p><strong>${esc(q.q)}</strong></p><p>Your answer: ${esc(q.choices[state.answers[i]])}</p><p class="note">${esc(q.why)}</p>`,`Answer review ${i+1} of 5`);setNav(i===4?'Back to results':'Next explanation',i===4?'Next: quiz results':`Next: answer review ${i+2}`);}
 }
 if(state.step===4){html=page('You have completed the course',`<p class="score">${state.score}% · Passed</p><p>You completed practice and met the quiz pass mark.</p><ul><li>Use <strong>POST /api/grades</strong> with names and a score.</li><li>Read the status and body: 200 succeeds; 400 needs correction.</li><li>Scores are not rounded. Submissions are not stored.</li></ul><button id="download" class="primary">View learning summary</button><p class="hint">A personal learning record, not professional certification. View and copy your summary below.</p>`,'Course complete');setNav('Review lesson','Optional: revisit the learning material');}
 $('module').innerHTML=html;
 if($('request-form'))$('request-form').onsubmit=checkRequest;
 if($('score-form'))$('score-form').onsubmit=sendScore;
 if(state.step===3&&state.slide<5)document.querySelectorAll('[name=answer]').forEach(input=>input.onchange=()=>{state.answers[state.slide]=Number(input.value);save();});
 if($('review'))$('review').onclick=()=>navigate(3,6);
 if($('retry'))$('retry').onclick=()=>{state.answers=[null,null,null,null,null];state.score=null;state.submitted=false;state.complete[3]=false;state.complete[4]=false;state.unlocked=3;navigate(3,0);};
 if($('download'))$('download').onclick=downloadSummary;
 updateOutline();
}
function navigate(step,slide=0){if(step>state.unlocked)return;if(step===3&&state.submitted&&slide<5)slide=5;stopSpeech();state.step=step;state.slide=slide;save();render();window.scrollTo({top:0,behavior:'instant'});$('module').focus({preventScroll:true});}
function advanceStep(){state.complete[state.step]=true;state.unlocked=Math.max(state.unlocked,state.step+1);if(state.step===3)state.complete[4]=true;navigate(state.step+1,0);}
$('next').onclick=()=>{
 if(state.step===0){advanceStep();return;}
 if(state.step===1){if(state.slide<5)navigate(1,state.slide+1);else advanceStep();return;}
 if(state.step===2){if(!state.practice[state.slide])return;if(state.slide<2)navigate(2,state.slide+1);else advanceStep();return;}
 if(state.step===3){
  if(state.slide<5){if(state.answers[state.slide]===null){$('activity-status').textContent='Choose an answer before continuing.';document.querySelector('[name=answer]').focus();return;}
   if(state.slide<4){navigate(3,state.slide+1);return;}
   const missing=state.answers.indexOf(null);if(missing!==-1){navigate(3,missing);$('activity-status').textContent='Answer this question before submitting the quiz.';return;}
   state.score=state.answers.reduce((n,a,i)=>n+(a===data.questions[i].correct?20:0),0);state.attempts++;state.submitted=true;state.complete[3]=state.score>=80;if(state.score>=80)state.unlocked=4;navigate(3,5);return;
  }
  if(state.slide===5){if(state.score>=80)advanceStep();return;}
  navigate(3,state.slide===10?5:state.slide+1);return;
 }
 if(state.step===4)navigate(1,0);
};
$('back').onclick=()=>{
 if(state.step===3&&state.slide>=5){if(state.slide===5)navigate(2,2);else navigate(3,state.slide===6?5:state.slide-1);return;}
 if(state.slide>0)navigate(state.step,state.slide-1);else if(state.step>0)navigate(state.step-1,state.step===2?5:state.step===3?2:state.step===4?5:0);
};
function checkRequest(e){e.preventDefault();stopSpeech();const ok=$('method').value==='POST'&&$('endpoint').value==='/api/grades';state.practice[0]=state.practice[0]||ok;$('activity-status').textContent=ok?'Correct. POST /api/grades sends data for calculation. Continue to send a score.':'Choose POST and /api/grades. GET /api/grades/health checks availability only.';$('next').disabled=!state.practice[0];save();}
function sendScore(e){e.preventDefault();stopSpeech();const input=$('score'),raw=input.value,score=raw===''?null:Number(raw);let errors={},grade;
 if(score===null||!Number.isFinite(score))errors.score=['score is required'];else if(score<0)errors.score=['score must be at least 0'];else if(score>100)errors.score=['score must be at most 100'];
 const invalid=Object.keys(errors).length>0;input.setAttribute('aria-invalid',String(invalid));
 const body=invalid?{status:400,message:'Validation failed',errors}:{studentName:'Jordan Lee',assignmentName:'Midterm Exam',score,letterGrade:(grade=score>=90?'A':score>=80?'B':score>=70?'C':score>=60?'D':'F')};
 $('response-area').hidden=false;$('response').textContent=JSON.stringify(body,null,2);$('response-summary').textContent=invalid?'HTTP 400 Bad Request — '+errors.score.join('. '):`HTTP 200 OK — score ${score}, grade ${grade}.`;
 const done=state.slide===1?score===105:score===89.9&&!invalid;
 state.practice[state.slide]=state.practice[state.slide]||done;
 $('activity-status').textContent=(invalid?'HTTP 400. '+errors.score.join('. ')+'. ':`HTTP 200. Grade ${grade}. `)+(done?(state.slide===1?'Task complete. Continue to repair the score.':'Task complete. 89.9 is not rounded to 90. Continue to the quiz.'):(state.slide===1?'Use 105 to complete this task.':'Use 89.9 to complete this task.'));
 $('next').disabled=!state.practice[state.slide];save();
}
$('restart').onclick=()=>{$('restart-confirm').hidden=false;$('cancel-restart').focus();};
$('cancel-restart').onclick=()=>{$('restart-confirm').hidden=true;$('restart').focus();};
$('confirm-restart').onclick=()=>{state=fresh();$('restart-confirm').hidden=true;$('outline').close();navigate(0);};
function downloadSummary(){const body=`Introduction to REST APIs\n\nQuiz: ${state.score}% (passed)\nAttempts: ${state.attempts}\nPractice: selected POST /api/grades, inspected score 105 error, repaired to 89.9 (B).\n\nObjectives: choose a request; interpret HTTP responses; repair invalid input.\n\nRemember: POST /api/grades with Content-Type: application/json. JSON fields: studentName, assignmentName, score. Score 0–100, no rounding. HTTP 200 for success, 400 for invalid input. Submissions are not stored.\n\nSource revision b07f2145b385b14322ecd9198f5ea6b6639017ca\nhttps://github.com/justinspratt07/spring-boot-grading-microservice\n\nThis personal learning record is not professional certification.\n`;$('summary-text').value=body;$('copy-status').textContent='';$('summary-dialog').showModal();}
$('copy-summary').onclick=async()=>{try{await navigator.clipboard.writeText($('summary-text').value);$('copy-status').textContent='Summary copied.';}catch{$('summary-text').focus();$('summary-text').select();$('copy-status').textContent='Text selected. Press Control+C (Windows) or Command+C (Mac) to copy.';}};
const synth=window.speechSynthesis;let voices=[],token=0,reading=false,paused=false,utterance;
function audioButtons(){$('pause').hidden=!reading;$('stop').hidden=!reading;$('pause').textContent=paused?'Resume':'Pause';}
function stopSpeech(message=''){token++;if(synth)synth.cancel();reading=false;paused=false;audioButtons();$('speech-status').textContent=message;}
function loadVoices(){if(!synth)return;voices=synth.getVoices().filter(v=>v.localService&&/^en(?:-|_)/i.test(v.lang));const s=$('voice');s.replaceChildren();if(!voices.length){s.add(new Option('No local English voice available',''));return;}voices.forEach(v=>s.add(new Option(`${v.name} (${v.lang})`,v.voiceURI)));s.value=voices.some(v=>v.voiceURI===prefs.voice)?prefs.voice:voices[0].voiceURI;prefs.voice=s.value;}
$('voice').onchange=()=>{prefs.voice=$('voice').value;save();stopSpeech('Voice changed. Start reading again to use it.');};
$('read').onclick=()=>{
 if(!synth||!window.SpeechSynthesisUtterance){$('speech-status').textContent='Built-in read aloud is unavailable. All course text remains accessible to your screen reader.';return;}
 loadVoices();if(!voices.length){$('speech-status').textContent='No local English voice is available. Enable a device voice, use another browser, or use your screen reader.';return;}
 stopSpeech();const current=token;
 const text=$('module').innerText+' '+$('activity-status').innerText;
 const chunks=text.split(/\n+|(?<=[.!?])\s+/).map(s=>s.trim()).filter(Boolean);let i=0;reading=true;audioButtons();$('speech-status').textContent='Reading aloud. Pause and Stop are available above.';
 function next(){if(current!==token)return;if(i>=chunks.length){reading=false;paused=false;audioButtons();$('speech-status').textContent='Finished reading.';return;}utterance=new SpeechSynthesisUtterance(chunks[i++]);utterance.voice=voices.find(v=>v.voiceURI===prefs.voice)||voices[0];utterance.lang=utterance.voice.lang;utterance.rate=Number(prefs.rate);utterance.onend=next;utterance.onerror=()=>{if(current===token)stopSpeech('Reading could not continue. Try another device voice or use your screen reader.');};synth.speak(utterance);}next();
};
$('pause').onclick=()=>{if(!reading)return;paused=!paused;if(paused)synth.pause();else synth.resume();audioButtons();$('speech-status').textContent=paused?'Reading paused. Choose Resume to continue.':'Reading resumed.';};
$('stop').onclick=()=>stopSpeech('Reading stopped.');
if(synth){synth.addEventListener('voiceschanged',loadVoices);loadVoices();}else $('voice').replaceChildren(new Option('Read aloud unavailable',''));
window.addEventListener('pagehide',()=>{stopSpeech();window.CourseLMS.finish();});
applyPrefs();render();
})();




