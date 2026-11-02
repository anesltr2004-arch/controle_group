import {ArrowUpRight} from 'lucide-react';import {CATEGORIES,type Lesson} from '../data/categories';
export default function CategoryGrid({lessons}:{lessons:Lesson[]}){
  return <div className="cgrid">{CATEGORIES.map(({slug,name,desc,Icon},i)=>{const n=lessons.filter(l=>l.category===slug).length;
    return <a key={slug} href={`#/categorie/${slug}`} className="ccard"><span className="num">{String(i+1).padStart(2,'0')}</span><Icon size={28} strokeWidth={1.25}/>
    <h3>{name}</h3><p>{desc}</p><span className="count">{n} leçon{n>1?'s':''}<ArrowUpRight size={16}/></span></a>})}</div>;}
