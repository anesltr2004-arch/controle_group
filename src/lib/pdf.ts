import {fmtSize} from './format';
export const MAX_BYTES=15*1024*1024;
export interface PdfReport{ok:boolean;errors:string[];warnings:string[];info:{size:string;version:string;pages:number}}
// Contrôles côté navigateur uniquement : NE remplacent PAS un antivirus ni une revue humaine.
const RISKY=/\/(JavaScript|JS|Launch|OpenAction|AA|EmbeddedFile|RichMedia|SubmitForm|URI)\b/g;
export async function inspectPdf(f:File):Promise<PdfReport>{
  const errors:string[]=[],warnings:string[]=[];
  if(!/\.pdf$/i.test(f.name))errors.push('L’extension doit être .pdf.');
  if(f.type!=='application/pdf')errors.push(`Type MIME refusé : « ${f.type||'inconnu'} ».`);
  if(f.size===0)errors.push('Le fichier est vide.');
  if(f.size>MAX_BYTES)errors.push(`Fichier trop volumineux (max ${fmtSize(MAX_BYTES)}).`);
  let version='—',pages=0;
  if(f.size>0&&f.size<=MAX_BYTES){
    const txt=new TextDecoder('latin1').decode(await f.arrayBuffer());
    const m=/^%PDF-(\d\.\d)/.exec(txt.slice(0,16));
    if(!m)errors.push('Signature PDF (%PDF-) absente : fichier non valide ou déguisé.');else version=m[1];
    if(!txt.slice(-2048).includes('%%EOF'))errors.push('Structure PDF incomplète (%%EOF manquant).');
    pages=(txt.match(/\/Type\s*\/Page[^s]/g)||[]).length;
    const risky=[...new Set(txt.match(RISKY)||[])];
    if(risky.length)warnings.push(`Éléments actifs détectés (${risky.join(', ')}) : revue administrateur renforcée.`);
    if(/\/Encrypt\b/.test(txt))warnings.push('PDF chiffré : impossible à vérifier.');
  }
  return{ok:!errors.length,errors,warnings,info:{size:fmtSize(f.size),version,pages}};
}
const WORDS=['porn','xxx','sex','nude','nsfw','erotic','hentai','nu ','porno','sexe','érotique'];
// Filtre textuel préliminaire sur titre/description : très incomplet, ne remplace pas la modération humaine.
export const nsfwHint=(t:string)=>WORDS.some(w=>t.toLowerCase().includes(w));
