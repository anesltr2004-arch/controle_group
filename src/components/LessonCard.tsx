import {Download,Eye} from 'lucide-react';
import {BASE,catOf,type Lesson} from '../data/categories';
import {fmtDate,fmtSize} from '../lib/format';
import Cover from './Cover';
export default function LessonCard({l,onPreview}:{l:Lesson;onPreview:(l:Lesson)=>void}){
  return <article className="lcard"><Cover l={l}/><div className="lbody">
    <span className="eyebrow">{catOf(l.category)?.name??'Divers'}</span><h3>{l.title}</h3><p>{l.description}</p>
    <div className="meta">{fmtDate(l.date)} · {fmtSize(l.size)}{l.pages?` · ${l.pages} p.`:''}</div>
    <div className="row"><button className="btn sm" onClick={()=>onPreview(l)}><Eye size={16}/>Aperçu</button>
    <a className="btn sm ghost" href={BASE+l.file} download><Download size={16}/>Télécharger</a></div></div></article>;}
