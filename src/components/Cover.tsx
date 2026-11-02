import {catOf,type Lesson} from '../data/categories';
export default function Cover({l}:{l:Lesson}){const c=catOf(l.category);const I=c?.Icon;
  return <div className="cover" aria-hidden="true"><span className="cover-tag">{l.sample?'EXEMPLE':'PDF'}</span>{I&&<I size={30} strokeWidth={1.25}/>}<b>{l.title}</b><i>{c?.name}</i></div>;}
