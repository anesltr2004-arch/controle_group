import {Candy,Wrench,Bug,Microscope,FlaskConical,TestTubes,Wheat,type LucideIcon} from 'lucide-react';
export const TELEGRAM='https://t.me/+9Kk6CfZU1p8wNmE0';
export const BASE=import.meta.env.BASE_URL;
export interface Category{slug:string;name:string;desc:string;Icon:LucideIcon}
export interface Lesson{id:string;title:string;description:string;category:string;date:string;size:number;pages?:number;file:string;sample?:boolean}
// Pour ajouter une catégorie : une entrée ici, puis utilisez son "slug" dans lessons.json.
export const CATEGORIES:Category[]=[
{slug:'controle-du-sucre',name:'Contrôle du sucre',desc:'Polarimétrie, Brix, pureté et analyses des produits sucrés.',Icon:Candy},
{slug:'preparation-du-materiel',name:'Préparation du matériel',desc:'Verrerie, stérilisation et mise en place du poste de travail.',Icon:Wrench},
{slug:'microbiologie-alimentaire',name:'Microbiologie alimentaire',desc:'Flores d’altération, pathogènes et hygiène des aliments.',Icon:Bug},
{slug:'analyse-microbiologique',name:'Analyse microbiologique',desc:'Dénombrements, milieux de culture et identification.',Icon:Microscope},
{slug:'analyse-physico-chimique',name:'Analyse physico-chimique',desc:'pH, acidité, densité, conductivité et titrages.',Icon:FlaskConical},
{slug:'dosage-des-constituants',name:'Dosage des constituants biochimiques des aliments',desc:'Protéines, lipides, glucides, vitamines et minéraux.',Icon:TestTubes},
{slug:'controle-des-cereales',name:'Contrôle des céréales',desc:'Humidité, cendres, gluten et qualité des farines.',Icon:Wheat}];
export const catOf=(s:string)=>CATEGORIES.find(c=>c.slug===s);
