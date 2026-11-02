import {Send} from 'lucide-react';import {TELEGRAM} from '../data/categories';
export default function Telegram(){return <section className="wrap band"><div><span className="eyebrow">Communauté</span><h2>Rejoignez le groupe Telegram de la classe</h2><p className="muted">Annonces, échanges et envoi de vos documents aux administrateurs pour validation.</p></div>
<a className="btn" href={TELEGRAM} target="_blank" rel="noopener noreferrer"><Send size={17}/>Rejoindre le groupe</a></section>;}
