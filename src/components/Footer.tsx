import {CATEGORIES,TELEGRAM,BASE} from '../data/categories';
export default function Footer(){return <footer className="ftr"><div className="wrap fgrid">
  <div><div className="logo static">Codex</div><p className="muted">Votre savoir, au même endroit. Une bibliothèque de cours accessible à tous.</p></div>
  <div><h4>Navigation</h4><a href="#/">Accueil</a><a href="#/lecons">Toutes les leçons</a><a href="#/contribuer">Proposer une leçon</a><a href={TELEGRAM} target="_blank" rel="noopener noreferrer">Groupe Telegram</a></div>
  <div><h4>Catégories</h4>{CATEGORIES.map(c=><a key={c.slug} href={`#/categorie/${c.slug}`}>{c.name}</a>)}</div>
  <div><h4>Rejoindre le groupe</h4><a className="qr" href={TELEGRAM} target="_blank" rel="noopener noreferrer" aria-label="Rejoindre le groupe Telegram"><img src={`${BASE}qr-telegram.png`} alt="QR code d’invitation au groupe Telegram" width="168" height="168"/></a><p className="muted sm">Scannez ou cliquez pour rejoindre.</p></div></div>
  <div className="wrap legal">© {new Date().getFullYear()} Codex · Contenus soumis à validation avant publication.</div></footer>;}
