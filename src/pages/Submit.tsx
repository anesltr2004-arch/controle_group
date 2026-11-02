import {useEffect,useRef,useState} from 'react';import {FileUp,ShieldAlert,Send,CheckCircle2} from 'lucide-react';
import {CATEGORIES,TELEGRAM} from '../data/categories';import {clean,safeName} from '../lib/format';
import {inspectPdf,nsfwHint,type PdfReport} from '../lib/pdf';import PreviewModal from '../components/PreviewModal';
const save=(blob:Blob,name:string)=>{const u=URL.createObjectURL(blob);const a=document.createElement('a');a.href=u;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(u),1000)};
export default function Submit(){
  const [file,setFile]=useState<File|null>(null);const [rep,setRep]=useState<PdfReport|null>(null);const [url,setUrl]=useState('');const [view,setView]=useState(false);
  const [title,setTitle]=useState('');const [desc,setDesc]=useState('');const [cat,setCat]=useState(CATEGORIES[0].slug);const [done,setDone]=useState(false);const [drag,setDrag]=useState(false);const inp=useRef<HTMLInputElement>(null);
  useEffect(()=>()=>{if(url)URL.revokeObjectURL(url)},[url]);
  async function pick(f?:File){if(!f)return;setDone(false);setUrl('');setFile(f);const r=await inspectPdf(f);setRep(r);if(r.ok)setUrl(URL.createObjectURL(f));else setFile(null)}
  const t=clean(title,120),d=clean(desc,500),flag=nsfwHint(t+' '+d);const ready=!!file&&rep?.ok&&t.length>=3;
  function build(){if(!file||!ready)return;const n=safeName(t);
    const meta={schema:1,status:'EN ATTENTE DE VALIDATION',title:t,description:d,category:cat,originalFilename:clean(file.name,120),file:`${n}.pdf`,size:file.size,pages:rep!.info.pages,pdfVersion:rep!.info.version,warnings:rep!.warnings,nsfwTextHint:flag,createdAt:new Date().toISOString()};
    save(new Blob([JSON.stringify(meta,null,2)],{type:'application/json'}),`${n}.meta.json`);setTimeout(()=>save(file,`${n}.pdf`),300);setDone(true)}
  return <section className="wrap sec page narrow"><span className="eyebrow">Contribuer</span><h1 className="h1s">Proposer une leçon</h1>
  <p className="lead sm">Ce site est statique : il ne peut pas publier votre fichier pour les autres visiteurs. Vous préparez ici un dossier de soumission, puis vous l’envoyez aux administrateurs sur Telegram. Rien n’est publié sans validation.</p>
  <div className={'drop'+(drag?' on':'')} onDragOver={e=>{e.preventDefault();setDrag(true)}} onDragLeave={()=>setDrag(false)} onDrop={e=>{e.preventDefault();setDrag(false);pick(e.dataTransfer.files[0])}}>
    <FileUp size={32} strokeWidth={1.25}/><p><b>Glissez votre PDF ici</b> ou</p><button className="btn sm" onClick={()=>inp.current?.click()}>Choisir un fichier</button>
    <input ref={inp} type="file" accept="application/pdf,.pdf" hidden onChange={e=>{pick(e.target.files?.[0]);e.target.value=''}}/><small>PDF uniquement · 15 Mo maximum</small></div>
  {rep&&!rep.ok&&<div className="alert err" role="alert"><b>Fichier refusé</b><ul>{rep.errors.map(e=><li key={e}>{e}</li>)}</ul></div>}
  {file&&rep?.ok&&<div className="alert ok"><CheckCircle2 size={18}/> <b>{clean(file.name,80)}</b> — {rep.info.size} · PDF {rep.info.version} · ~{rep.info.pages||'?'} page(s)
    {rep.warnings.map(w=><p key={w} className="warn"><ShieldAlert size={15}/> {w}</p>)}<button className="link" onClick={()=>setView(true)}>Aperçu local</button></div>}
  <div className="form"><label>Titre<input value={title} maxLength={120} onChange={e=>setTitle(e.target.value)} placeholder="Ex. Dosage du glucose par la méthode DNS"/></label>
  <label>Description<textarea value={desc} maxLength={500} rows={3} onChange={e=>setDesc(e.target.value)}/></label>
  <label>Catégorie<select value={cat} onChange={e=>setCat(e.target.value)}>{CATEGORIES.map(c=><option key={c.slug} value={c.slug}>{c.name}</option>)}</select></label>
  {flag&&<p className="warn"><ShieldAlert size={15}/> Termes sensibles détectés : votre soumission sera examinée avec une attention particulière.</p>}
  <button className="btn" disabled={!ready} onClick={build}>Générer le dossier de soumission</button></div>
  {done&&<div className="alert ok" role="status"><b>Dossier généré.</b> Deux fichiers ont été téléchargés (le PDF et ses métadonnées .meta.json). Envoyez-les maintenant aux administrateurs dans le <a href={TELEGRAM} target="_blank" rel="noopener noreferrer"><Send size={14}/> groupe Telegram</a>. Ils vérifieront le contenu (antivirus + modération) avant toute publication.</div>}
  {view&&url&&<PreviewModal title={file?.name??'Aperçu'} src={url} onClose={()=>setView(false)}/>}</section>;}
