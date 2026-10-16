import source from './data/parts-source.json';
import photoSource from './data/parts-photos.json';
import type {Product} from './catalog';
const photos:Record<string,{file:string;kind:string;source:string;sourcePage:string;manufacturerVariant:string}>=photoSource;
export const PART_CATEGORIES=['Все','Хотэнды и сопла','Печатные пластины','Мелкие расходники','AMS','Хранение и сушка','Ремонт','Наборы обслуживания'];
export const ACCESSORY_SYSTEMS=['AMS','AMS Lite','AMS 2 Pro','AMS HT'];
export const partCategoryUz:Record<string,string>={'Все':'Barcha toifalar','Хотэнды и сопла':'Hotend va soplolar','Печатные пластины':'Bosma plastinalari','Мелкие расходники':'Sarf materiallari','AMS':'AMS','Хранение и сушка':'Saqlash va quritish','Ремонт':'Ta’mirlash','Наборы обслуживания':'Xizmat to‘plamlari'};
type Spec={row:number;id:string;name:string;uzName:string;label?:string;models?:string[];candidates?:string[];group?:string;systems?:string[];selectModel?:boolean;brand?:string;photoKey?:string;components?:string[];noteRu?:string;noteUz?:string};
const A1=['A1','A1 mini'],P1=['P1P','P1S'],X1=['X1','X1C'];
const PLATE=['A1','P1P','P1S','X1','X1C','X1E'];
export function createParts(existing:Product[],allModels:string[]):Product[]{
 const specs:Spec[]=[];
 const put=(row:number,id:string,name:string,uzName:string,extra:Partial<Spec>={})=>specs.push({row,id,name,uzName,...extra});
 const hotend=(row:number,size:string,hardened=false)=>{
  const group=`hotend-${row}`;
  for(const [family,models] of [['a1',A1],['p1',P1],['x1',X1]] as const){
   const id=row===4&&family==='x1'?'hotend-x1c':`hotend-${family}-${size.replace('.','')}${hardened?'-hardened':''}`;
   const name=hardened?`Хотэнд закалённый ${size.replace('.',',')} мм`:`Хотэнд / сопло ${size.replace('.',',')} мм`;
   put(row,id,name,hardened?`Toblangan hotend ${size} mm`:`Hotend / soplo ${size} mm`,{group,label:models.join(' / '),models:[...models],photoKey:`${family}-${size}-${hardened?'hardened':'standard'}`});
  }
 };
 put(1,'hotend-a1-04-steel','Хотэнд A1 · 0,4 мм (сталь)','A1 hotend · 0.4 mm (po‘lat)',{label:'A1 / A1 mini',models:A1,photoKey:'a1-0.4-steel'});
 put(2,'hotend-p1-04','Хотэнд в сборе · 0,4 мм','Hotend yig‘masi · 0.4 mm',{group:'complete-hotend-04',label:'P1P / P1S',models:P1,photoKey:'p1-0.4-standard'});
 put(2,'hotend-x1-04','Хотэнд в сборе · 0,4 мм','Hotend yig‘masi · 0.4 mm',{group:'complete-hotend-04',label:'X1 / X1C',models:X1,photoKey:'x1-0.4-standard'});
 hotend(3,'0.4',true);hotend(4,'0.2');hotend(5,'0.6');
 for(const model of ['P2S','H2D','H2C'])put(6,`hotend-${model.toLowerCase()}`,'Хотэнд · '+model,model+' hotend',{group:'new-series-hotends',label:model,models:model==='H2D'?['H2D']:[],candidates:[model],selectModel:false,photoKey:model==='H2D'?'h2d-hotend':undefined});
 put(7,'hotend-silicone-sock','Силиконовый чехол на хотэнд','Hotend uchun silikon qoplama',{candidates:allModels,selectModel:true,photoKey:'silicone-sock'});
 put(8,'textured-plate-180','Textured PEI Plate · 180 мм','Textured PEI Plate · 180 mm',{label:'A1 mini',models:['A1 mini'],photoKey:'textured-mini'});
 put(9,'textured-plate','Textured PEI Plate · 256 мм','Textured PEI Plate · 256 mm',{label:'A1 / P1 / X1',models:PLATE,photoKey:'textured-256'});
 put(10,'smooth-pei-plate','Smooth PEI Plate','Smooth PEI Plate',{group:'smooth-cool-plate',label:'A1 / P1 / X1',models:PLATE,photoKey:'smooth-256'});
 put(10,'cool-plate-supertack','Cool Plate SuperTack','Cool Plate SuperTack',{group:'smooth-cool-plate',label:'A1 / P1 / X1',models:PLATE,photoKey:'supertack-256'});
 put(11,'engineering-plate','Engineering Plate','Engineering Plate',{candidates:[...P1,...X1,'X1E'],selectModel:true,photoKey:'engineering-plate'});
 put(12,'glue-stick','Клей-карандаш для стола','Bosma stoli uchun yelim',{label:'Для печатного стола',models:allModels,photoKey:'glue-stick'});
 put(13,'lubrication-kit','Смазка: масло + густая смазка','Moy + quyuq moylash materiali',{label:'Обслуживание принтера',models:allModels,photoKey:'lubricant'});
 put(14,'ptfe-tubes','Тефлоновые трубки (PTFE)','Teflon naychalar (PTFE)',{candidates:allModels,selectModel:true,systems:ACCESSORY_SYSTEMS,photoKey:'ptfe-tubes'});
 put(15,'filament-cutter','Нож для обрезки филамента','Filament kesish pichog‘i',{models:[...A1,...P1,...X1,'X1E'],photoKey:'filament-cutter'});
 put(16,'nozzle-cleaning-kit','Иглы и щётки для чистки сопла','Soplo tozalash ignalari va cho‘tkalari',{label:'Для обслуживания сопла',candidates:allModels,selectModel:true,brand:'',photoKey:'cleaning-kit'});
 put(17,'carbon-filter','Угольный фильтр','Ko‘mirli filtr',{models:['P1S','X1C'],photoKey:'carbon-filter'});
 put(18,'reusable-spool','Многоразовая катушка для рефиллов','Refill uchun qayta ishlatiladigan g‘altak',{models:allModels,systems:ACCESSORY_SYSTEMS,photoKey:'reusable-spool',noteRu:'Для установки рефилла нужна совместимая многоразовая катушка.',noteUz:'Refillni o‘rnatish uchun mos qayta ishlatiladigan g‘altak kerak.'});
 put(19,'desiccant','Влагопоглотитель (силикагель)','Namlik yutgich (silikagel)',{candidates:allModels,systems:['AMS','AMS Lite'],brand:'',noteRu:'Тип и упаковку подберём под вашу систему хранения.',noteUz:'Tur va qadoq saqlash tizimingizga mos tanlanadi.'});
 put(20,'ams-feeding-rollers','Подающие ролики AMS','AMS uzatish roliklari',{candidates:allModels,systems:['AMS','AMS Lite'],selectModel:true,photoKey:'ams-feeder'});
 put(20,'ams-buffer','Буфер AMS','AMS buferi',{models:[...P1,...X1,'X1E'],systems:['AMS'],photoKey:'ams-buffer'});
 put(20,'ams-hub','Хабы AMS / AMS Lite','AMS / AMS Lite hublari',{candidates:allModels,systems:['AMS','AMS Lite'],selectModel:true,photoKey:'ams-hub'});
 put(21,'ams-lite','AMS Lite','AMS Lite',{group:'ams-systems',label:'A1 / A1 mini',models:A1,systems:['AMS Lite'],photoKey:'ams-lite'});
 put(21,'ams-2-pro','AMS 2 Pro','AMS 2 Pro',{group:'ams-systems',candidates:allModels,systems:['AMS 2 Pro'],selectModel:true,photoKey:'ams-2-pro'});
 put(21,'ams-ht','AMS HT','AMS HT',{group:'ams-systems',candidates:allModels,systems:['AMS HT'],selectModel:true,photoKey:'ams-ht'});
 put(22,'filament-dryer','Сушилка на 1–2 катушки','1–2 g‘altak uchun quritgich',{label:'Подбор по размеру катушек',candidates:allModels,brand:'',noteRu:'Бренд и вместимость уточняются при подборе.',noteUz:'Brend va sig‘im tanlash vaqtida aniqlanadi.'});
 put(23,'vacuum-storage-bags','Вакуумные пакеты для катушек','G‘altaklar uchun vakuum paketlar',{label:'Для хранения филамента',models:allModels,brand:''});
 const repairs=[['belts','Ремни','Kamarlar'],['motors','Моторы','Motorlar'],['fans','Вентиляторы','Ventilyatorlar'],['boards','Платы','Platalar'],['extruders','Экструдеры','Ekstruderlar'],['thermistors','Термисторы','Termistorlar'],['cables','Кабели','Kabellar']];
 repairs.forEach(([kind,name,uzName],i)=>put(24+i,`repair-${kind}`,name,uzName,{candidates:allModels,selectModel:true,photoKey:`repair-${kind}`}));
 const existingById=new Map(existing.map(p=>[p.id,p]));
 const rows=specs.map(spec=>{
  const row=source.rows.find(r=>r.sourceId===spec.row)!;
  const old=existingById.get(spec.id);const photo=spec.photoKey?photos[spec.photoKey]:undefined;
  const candidate=spec.candidates||[];const models=spec.models||[];
  const p:Product={id:spec.id,name:spec.name,uzName:spec.uzName,brand:spec.brand,material:row.category,category:row.category,type:'parts',color:spec.label||(models.length?models.join(' / '):'Подбор по модели'),uzColor:spec.label?.startsWith('A1')||spec.label?.startsWith('P1')||spec.label?.startsWith('X1')?spec.label:models.length?models.join(' / '):'Modelga mos tanlanadi',colorKey:spec.id,hex:'#dbe2d1',price:typeof row.price==='number'?row.price:old?.price??null,stock:old?.stock??null,old:old?.old,image:old?.image||photo?.file,photoKind:old?.image?'color':photo?.kind,weight:'',format:'',models,candidateModels:candidate,compatibilityPending:models.length===0,availability:row.plannedLocation==='Под заказ'?'order':'unknown',sourcePartRows:[row.sourceRow],sourceSheet:'parts',variantGroup:spec.group,variantLabel:spec.label||spec.name,accessorySystems:spec.systems,selectModel:spec.selectModel,leadTime:typeof row.leadTime==='string'?row.leadTime:null,partNoteRu:spec.noteRu,partNoteUz:spec.noteUz};
  return p;
 });
 const kits:Product[]=[{id:'maintenance-kit-a1',name:'Набор «обслуживание A1»',uzName:'A1 xizmat ko‘rsatish to‘plami',models:['A1'],componentIds:['hotend-a1-04-steel','textured-plate','lubrication-kit','nozzle-cleaning-kit'],sourceSetRows:[4]},{id:'maintenance-kit-p1s',name:'Набор «обслуживание P1S»',uzName:'P1S xizmat ko‘rsatish to‘plami',models:['P1S'],componentIds:['hotend-p1-04','textured-plate','lubrication-kit','nozzle-cleaning-kit'],sourceSetRows:[5]}].map(k=>({...k,brand:'Forma 3D',category:'Наборы обслуживания',material:'Наборы обслуживания',type:'parts',color:k.models[0],uzColor:k.models[0],colorKey:k.id,hex:'#dbe2d1',price:null,stock:null,weight:'',format:'',availability:'unknown',sourceSheet:'sets',leadTime:null,partNoteRu:'Комплектация и стоимость набора уточняются перед заказом.',partNoteUz:'To‘plam tarkibi va narxi buyurtmadan oldin aniqlanadi.'} as Product));
 return [...rows,...kits];
}
