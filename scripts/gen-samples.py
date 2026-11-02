# Génère des PDF d'EXEMPLE (une page) + lessons.json. À remplacer par vos vrais cours.
import json,os
def pdf(t):
    s=f"BT /F1 20 Tf 60 740 Td ({t}) Tj ET\nBT /F1 11 Tf 60 710 Td (DOCUMENT D'EXEMPLE - remplacez par un vrai cours.) Tj ET"
    o=["<</Type/Catalog/Pages 2 0 R>>","<</Type/Pages/Kids[3 0 R]/Count 1>>","<</Type/Page/Parent 2 0 R/MediaBox[0 0 595 842]/Contents 4 0 R/Resources<</Font<</F1 5 0 R>>>>>>",f"<</Length {len(s)}>>\nstream\n{s}\nendstream","<</Type/Font/Subtype/Type1/BaseFont/Helvetica>>"]
    b=b"%PDF-1.4\n";off=[]
    for i,x in enumerate(o,1): off.append(len(b)); b+=f"{i} 0 obj\n{x}\nendobj\n".encode('latin1')
    x=len(b); b+=f"xref\n0 {len(o)+1}\n0000000000 65535 f \n".encode()+b"".join(f"{n:010d} 00000 n \n".encode() for n in off)+f"trailer\n<</Size {len(o)+1}/Root 1 0 R>>\nstartxref\n{x}\n%%EOF".encode()
    return b
L=[("exemple-sucre","Polarimétrie et dosage du saccharose","Polarimetrie et dosage du saccharose","controle-du-sucre","Principe de la polarisation et calcul de la pureté d'un jus sucré.","2026-10-28"),
("exemple-materiel","Stérilisation et préparation de la verrerie","Sterilisation et preparation de la verrerie","preparation-du-materiel","Nettoyage, conditionnement et stérilisation du matériel de laboratoire.","2026-10-20"),
("exemple-microbio-alim","Flore d'altération des denrées","Flore d'alteration des denrees","microbiologie-alimentaire","Principaux micro-organismes d'altération et de contamination.","2026-10-14"),
("exemple-analyse-micro","Dénombrement sur milieu gélosé","Denombrement sur milieu gelose","analyse-microbiologique","Dilutions décimales, ensemencement et lecture des boîtes.","2026-10-09"),
("exemple-physico","pH, acidité titrable et densité","pH, acidite titrable et densite","analyse-physico-chimique","Mesures physico-chimiques de base sur un échantillon alimentaire.","2026-09-30"),
("exemple-dosage","Dosage des protéines par la méthode de Kjeldahl","Dosage des proteines - methode de Kjeldahl","dosage-des-constituants","Minéralisation, distillation et titrage de l'azote.","2026-09-22"),
("exemple-cereales","Humidité et cendres des céréales","Humidite et cendres des cereales","controle-des-cereales","Détermination de l'humidité et du taux de cendres d'une farine.","2026-09-15"),
("exemple-cereales-2","Qualité boulangère des farines","Qualite boulangere des farines","controle-des-cereales","Gluten, force boulangère et indice de chute.","2026-09-05")]
os.makedirs("public/lessons",exist_ok=True);out=[]
for f,t,a,c,d,dt in L:
    b=pdf(a);open(f"public/lessons/{f}.pdf","wb").write(b)
    out.append({"id":f,"title":t,"description":d,"category":c,"date":dt,"size":len(b),"pages":1,"file":f"lessons/{f}.pdf","sample":True})
json.dump(out,open("public/lessons/lessons.json","w"),ensure_ascii=False,indent=2)
