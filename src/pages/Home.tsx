import {ArrowRight,Upload} from 'lucide-react';import type {Lesson} from '../data/categories';
import CategoryGrid from '../components/CategoryGrid';import Lessons from '../components/Lessons';import Telegram from '../components/Telegram';
export default function Home({lessons,state}:{lessons:Lesson[];state:'loading'|'ok'|'error'}){return <>
<section className="hero wrap"><div><span className="eyebrow">Bibliothèque pédagogique</span><h1>Votre savoir, <em>au même endroit.</em></h1>
<p className="lead">Retrouvez vos cours, supports et documents pédagogiques dans une bibliothèque organisée et accessible à tous.</p>
<div className="row"><a className="btn" href="#/lecons">Parcourir les leçons<ArrowRight size={17}/></a><a className="btn ghost" href="#/categories">Explorer les catégories</a></div></div>
<div className="hero-art" aria-hidden="true"><span>7</span><i>catégories<br/>d’analyse &amp; de contrôle</i></div></section>
<section className="wrap sec"><div className="sh"><h2>Catégories</h2><a href="#/categories">Voir tout</a></div><CategoryGrid lessons={lessons}/></section>
<section className="wrap sec"><div className="sh"><h2>Dernières leçons</h2><a href="#/lecons">Toutes les leçons</a></div><Lessons items={lessons.slice(0,6)} state={state}/></section>
<section className="wrap band"><div><span className="eyebrow">Contribuer</span><h2>Partagez vos supports de cours</h2><p className="muted">Préparez votre PDF, vérifié dans votre navigateur, puis envoyez-le aux administrateurs : chaque document est relu avant publication.</p></div><a className="btn" href="#/contribuer"><Upload size={17}/>Proposer une leçon</a></section>
<Telegram/></>;}
