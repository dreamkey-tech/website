// Local interaction checks: real validation schemas, mocked API/store/navigation.
// No credentials are sent and no accounts are created by these checks.
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const ts = require('typescript');
const React = require('react');
function compile(path, mocks) {
  const source = fs.readFileSync(path, 'utf8');
  const code = ts.transpileModule(source, {compilerOptions: {
    module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true,
  }}).outputText;
  const exports = {};
  const localRequire = (name) => {
    if (name in mocks) return mocks[name];
    if (name.endsWith('.module.css')) return {__esModule:true, default:{}};
    return require(name);
  };
  vm.runInNewContext(code, {exports, require:localRequire, window:mocks.window});
  return exports;
}
const schema = compile('zod/auth.ts', {});
const errorHelper = compile('components/auth/auth-errors.ts', {});
function nodes(tree) {
  if (!tree || typeof tree !== 'object') return [];
  const children = tree.props?.children;
  return [tree, ...[children].flat(Infinity).flatMap(nodes)];
}
function harness(mode, values, failure) {
  const setters=[], updates=[], calls=[], focus=[];
  let hook=0;
  const initial=[values,{},null,false,false];
  const react={...React,
    useState:() => {const index=hook++; const set=(value)=>updates.push({index,value}); setters.push(set); return [initial[index],set];},
    useRef:() => ({current:{querySelector:selector=>({focus:()=>focus.push(selector)})}}),
  };
  const mocks={
    react,
    'next/link':{__esModule:true,default:'a'},
    'next/navigation':{useRouter:()=>({push:url=>calls.push(['push',url]),refresh:()=>calls.push(['router.refresh'])})},
    '@phosphor-icons/react':{ArrowRight:'ArrowRight'},
    sonner:{toast:{success:message=>calls.push(['toast',message])}},
    '@/api/auth':{authApi:Object.fromEntries(['login','register'].map(action=>[action,async data=>{calls.push([action,data]);if(failure)throw failure;}]))},
    '@/zod/auth':schema,
    '@/store/authStore':{useAuthStore:()=>({refreshUser:async()=>calls.push(['refreshUser'])})},
    './AuthField':{__esModule:true,default:'AuthField'},
    './AuthFormFrame':{__esModule:true,default:'AuthFormFrame'},
    './GoogleSignInButton':{GoogleSignInButton:'GoogleSignInButton'},
    './auth-errors':errorHelper,
  };
  const Component=compile('components/auth/AuthForm.tsx',mocks).default;
  const tree=Component({mode});
  const form=nodes(tree).find(n=>n.type==='form');
  return {updates,calls,focus,tree,submit:()=>form.props.onSubmit({preventDefault(){}})};
}
(async()=>{
  for(const mode of ['login','register']) {
    const h=harness(mode,{name:'',email:'',password:''});await h.submit();
    assert.equal(h.calls.length,0,'invalid input must not reach API');
    const errors=h.updates.findLast(u=>u.index===1).value;
    assert.equal(Object.keys(errors).length,mode==='login'?2:3);
    assert.equal(h.focus[0],`[name="${mode==='login'?'email':'name'}"]`);
  }
  for(const mode of ['login','register']) {
    const values={name:'Test Resident',email:'resident@example.com',password:'test-password'};
    const h=harness(mode,values);await h.submit();
    const payload=JSON.parse(JSON.stringify(h.calls[0][1]));
    assert.deepEqual(payload,mode==='login'?{email:values.email,password:values.password}:values);
    assert.equal(h.calls[0][0],mode);
    assert.equal(h.calls[1][0],'refreshUser');
    assert.deepEqual(h.calls[3],['push','/buy']);
    assert.equal(h.calls[4][0],'router.refresh');
    assert.equal(h.updates.findLast(u=>u.index===3).value,false);
  }
  for(const code of ['USE_GOOGLE_LOGIN','INVALID_CREDENTIALS']) {
    const h=harness('login',{name:'',email:'resident@example.com',password:'test-password'},
      {isAxiosError:true,response:{data:{code,message:'Test API failure'}}});
    await h.submit();
    const message=h.updates.findLast(u=>u.index===2).value;
    assert.ok(code==='USE_GOOGLE_LOGIN'?message.includes('Continue with Google'):message==='Test API failure');
    assert.equal(h.calls.some(c=>c[0]==='push'),false);
    assert.equal(h.updates.findLast(u=>u.index===3).value,false);
  }
  for(const fail of [false,true]) {
    let hook=0;const updates=[],busy=[],window={location:{href:''}};
    const mocks={react:{...React,useState:()=>{const index=hook++;return[index===0?false:null,v=>updates.push({index,value:v})];}},
      '@/api/auth':{authApi:{googleSignIn:async()=>{if(fail)throw new Error('mock failure');return 'https://accounts.google.com/mock-sign-in';}}},
      './auth-errors':errorHelper,window};
    const Google=compile('components/auth/GoogleSignInButton.tsx',mocks).GoogleSignInButton;
    const tree=Google({onBusyChange:v=>busy.push(v)});
    await nodes(tree).find(n=>n.type==='button').props.onClick();
    if(fail){assert.ok(updates.findLast(u=>u.index===1).value.includes('Please try again'));assert.deepEqual(busy,[true,false]);}
    else {assert.equal(window.location.href,'https://accounts.google.com/mock-sign-in');assert.deepEqual(busy,[true]);}
  }
  const result={passed:['login and registration validation block invalid API requests','first invalid field receives focus','existing login/register payloads, refresh and /buy redirect preserved','API and Google-only account errors stay on the form','Google sign-in success redirect and recoverable failure state']};
  fs.writeFileSync('output/auth/interaction-checks.json',JSON.stringify(result,null,2));
  console.log(result.passed.join('\n'));
})().catch(error=>{console.error(error);process.exitCode=1;});
