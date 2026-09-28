'use strict';
// Optional SCORM 1.2 adapter. Standalone launches do not require an LMS.
window.CourseLMS = (() => {
  let api=null,active=false,finished=false,warning='';
  function find(start){let w=start;for(let i=0;w&&i<10;i++){try{if(w.API)return w.API;if(w.parent===w)break;w=w.parent;}catch{break;}}return null;}
  function call(name,...args){try{return api[name](...args);}catch{warning='The LMS connection failed. Keep this window open and ask your instructor to check the recorded result.';return 'false';}}
  try{api=find(window)||find(window.opener);}catch{}
  if(api){active=String(call('LMSInitialize',''))==='true';if(!active)warning='The LMS could not start this session. Your activity may not be recorded.';}
  function set(name,value){if(String(call('LMSSetValue',name,String(value)))!=='true')warning='The LMS could not save a course value. Ask your instructor to verify your progress.';}
  return {
    get active(){return active;},
    get warning(){return warning;},
    load(){if(!active)return null;try{const value=call('LMSGetValue','cmi.suspend_data');return value?JSON.parse(value):null;}catch{return null;}},
    save(state){if(!active||finished)return;set('cmi.suspend_data',JSON.stringify(state));set('cmi.core.lesson_location',state.step+':'+state.slide);set('cmi.core.lesson_status',state.complete[3]?'passed':state.submitted?'failed':'incomplete');if(state.score!==null){set('cmi.core.score.min',0);set('cmi.core.score.max',100);set('cmi.core.score.raw',state.score);}set('cmi.core.exit','suspend');if(String(call('LMSCommit',''))!=='true')warning='The LMS could not commit your result. Ask your instructor to verify it.';},
    finish(){if(active&&!finished){call('LMSFinish','');finished=true;}}
  };
})();
