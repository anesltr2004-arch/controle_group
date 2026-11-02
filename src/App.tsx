import {useState} from 'react';import {useLessons,useRoute} from './hooks';
import Header from './components/Header';import Footer from './components/Footer';import CategoryGrid from './components/CategoryGrid';
import Home from './pages/Home';import Library from './pages/Library';import Submit from './pages/Submit';
function DevPreview(){const [w,setW]=useState(0);
  return <><div className="dev">{[['Desktop',0],['Tablette',820],['Mobile',390]].map(([n,v])=><button key={n} className={w===v?'on':''} onClick={()=>setW(v as number)}>{n}</button>)}</div>
  {w>0&&<div className="devframe"><iframe title="Aperçu responsive" src={location.href} style={{width:w}}/></div>}</>}
export default function App(){
  const r=useRoute();const {lessons,state}=useLessons();const p=r[0];
  return <><Header route={r.join('/')}/><main key={r.join('/')} className="pg">
    {p===''&&<Home lessons={lessons} state={state}/>}
    {p==='categories'&&<section className="wrap sec page"><span className="eyebrow">Explorer</span><h1 className="h1s">Catégories</h1><CategoryGrid lessons={lessons}/></section>}
    {p==='lecons'&&<Library lessons={lessons} state={state}/>}
    {p==='categorie'&&<Library lessons={lessons} state={state} cat={r[1]}/>}
    {p==='contribuer'&&<Submit/>}
    {!['','categories','lecons','categorie','contribuer'].includes(p)&&<section className="wrap sec page"><h1 className="h1s">Page introuvable</h1><a className="btn" href="#/">Retour à l’accueil</a></section>}
  </main><Footer/>{import.meta.env.DEV&&window.top===window&&<DevPreview/>}</>;}
