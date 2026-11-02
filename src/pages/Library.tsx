import {useMemo,useState} from 'react';import {Search} from 'lucide-react';import {CATEGORIES,catOf,type Lesson} from '../data/categories';
import {norm} from '../lib/format';import Lessons from '../components/Lessons';
export default function Library({lessons,state,cat}:{lessons:Lesson[];state:'loading'|'ok'|'error';cat?:string}){
  const [q,setQ]=useState('');const c=cat?catOf(cat):undefined;
  const items=useMemo(()=>{const n=norm(q);return lessons.filter(l=>(!cat||l.category===cat)&&(!n||norm(l.title+' '+l.description).includes(n)))},[lessons,q,cat]);
  return <section className="wrap sec page"><span className="eyebrow">{c?'Catégorie':'Bibliothèque'}</span><h1 className="h1s">{c?c.name:'Toutes les leçons'}</h1>
  {c&&<p className="lead sm">{c.desc}</p>}{cat&&!c&&<div className="empty"><h3>Catégorie introuvable</h3><p><a href="#/categories">Voir les catégories</a></p></div>}
  <div className="tools"><label className="search"><Search size={18}/><input type="search" value={q} onChange={e=>setQ(e.target.value)} placeholder="Rechercher un titre ou un mot-clé…" aria-label="Rechercher"/></label>
  <div className="chips" role="list"><a role="listitem" href="#/lecons" className={!cat?'on':''}>Toutes</a>{CATEGORIES.map(k=><a role="listitem" key={k.slug} href={`#/categorie/${k.slug}`} className={cat===k.slug?'on':''}>{k.name}</a>)}</div></div>
  <p className="muted sm" aria-live="polite">{items.length} résultat{items.length>1?'s':''}</p>{(!cat||c)&&<Lessons items={items} state={state}/>}</section>;}
