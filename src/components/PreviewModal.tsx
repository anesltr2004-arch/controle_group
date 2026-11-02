import {useEffect} from 'react';import {X} from 'lucide-react';
// Aperçu via le lecteur PDF natif du navigateur, dans une iframe (jamais injecté dans le DOM).
export default function PreviewModal({title,src,onClose}:{title:string;src:string;onClose:()=>void}){
  useEffect(()=>{const k=(e:KeyboardEvent)=>e.key==='Escape'&&onClose();addEventListener('keydown',k);document.body.style.overflow='hidden';return()=>{removeEventListener('keydown',k);document.body.style.overflow=''}},[onClose]);
  return <div className="modal" role="dialog" aria-modal="true" aria-label={`Aperçu : ${title}`} onClick={onClose}>
    <div className="mbox" onClick={e=>e.stopPropagation()}><header><strong>{title}</strong><button className="icon" onClick={onClose} aria-label="Fermer"><X/></button></header>
    <iframe title={title} src={src}/><p className="note">Si l’aperçu ne s’affiche pas sur votre appareil, utilisez le bouton Télécharger.</p></div></div>;}
