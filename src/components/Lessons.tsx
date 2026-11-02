import {useState} from 'react';import {BASE,type Lesson} from '../data/categories';
import LessonCard from './LessonCard';import PreviewModal from './PreviewModal';
export default function Lessons({items,state}:{items:Lesson[];state:'loading'|'ok'|'error'}){
  const [p,setP]=useState<Lesson|null>(null);
  if(state==='loading')return <div className="grid">{[0,1,2].map(i=><div key={i} className="skel"/>)}</div>;
  if(state==='error')return <div className="empty"><h3>Bibliothèque indisponible</h3><p>Le fichier lessons.json n’a pas pu être chargé. Réessayez plus tard.</p></div>;
  if(!items.length)return <div className="empty"><h3>Aucune leçon pour le moment</h3><p>Aucun document ne correspond à cette sélection. Proposez le vôtre via la page <a href="#/contribuer">Proposer une leçon</a>.</p></div>;
  return <><div className="grid">{items.map(l=><LessonCard key={l.id} l={l} onPreview={setP}/>)}</div>{p&&<PreviewModal title={p.title} src={BASE+p.file} onClose={()=>setP(null)}/>}</>;}
