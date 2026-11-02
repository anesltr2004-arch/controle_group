export const fmtSize=(b:number)=>b<1024?`${b} o`:b<1048576?`${(b/1024).toFixed(0)} Ko`:`${(b/1048576).toFixed(1)} Mo`;
export const fmtDate=(d:string)=>new Date(d).toLocaleDateString('fr-FR',{day:'numeric',month:'long',year:'numeric'});
export const norm=(s:string)=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
export const clean=(s:string,max:number)=>s.replace(/[\u0000-\u001f\u007f<>]/g,' ').replace(/\s+/g,' ').trim().slice(0,max);
export const safeName=(s:string)=>norm(s).replace(/\.pdf$/,'').replace(/[^a-z0-9._-]+/g,'-').replace(/^-+|-+$/g,'').slice(0,60)||'lecon';
