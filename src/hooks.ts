import {useEffect,useState} from 'react';
import {BASE,type Lesson} from './data/categories';
export function useLessons(){
  const [lessons,set]=useState<Lesson[]>([]);const [state,setState]=useState<'loading'|'ok'|'error'>('loading');
  useEffect(()=>{fetch(`${BASE}lessons/lessons.json`).then(r=>{if(!r.ok)throw 0;return r.json()}).then((d:Lesson[])=>{set([...d].sort((a,b)=>b.date.localeCompare(a.date)));setState('ok')}).catch(()=>setState('error'))},[]);
  return{lessons,state};
}
export function useRoute(){
  const get=()=>location.hash.replace(/^#\/?/,'').split('/');const [r,set]=useState(get());
  useEffect(()=>{const f=()=>{set(get());window.scrollTo(0,0)};addEventListener('hashchange',f);return()=>removeEventListener('hashchange',f)},[]);
  return r;
}
