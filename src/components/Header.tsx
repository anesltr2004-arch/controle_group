import {useState} from 'react';import {Menu,Send,X,Library} from 'lucide-react';import {TELEGRAM} from '../data/categories';
const L=[['#/','Accueil'],['#/categories','Catégories'],['#/lecons','Toutes les leçons'],['#/contribuer','Proposer une leçon']];
export default function Header({route}:{route:string}){const [open,set]=useState(false);
  const cur=(h:string)=>('#/'+route)===h||(h==='#/categories'&&route.startsWith('categorie'));
  return <header className="hdr"><div className="wrap hrow"><a className="logo" href="#/"><Library size={22} strokeWidth={1.5}/><span>Codex<small>Bibliothèque de cours</small></span></a>
    <button className="icon burger" aria-expanded={open} aria-label="Menu" onClick={()=>set(!open)}>{open?<X/>:<Menu/>}</button>
    <nav className={open?'nav open':'nav'} onClick={()=>set(false)}>{L.map(([h,t])=><a key={h} href={h} className={cur(h)?'on':''}>{t}</a>)}
    <a href={TELEGRAM} target="_blank" rel="noopener noreferrer" className="tg"><Send size={15}/>Telegram</a></nav></div></header>;}
