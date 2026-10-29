import sourceRows from './data/filament-source.json';
import {createParts,PART_CATEGORIES,ACCESSORY_SYSTEMS,partCategoryUz} from './parts';
export {PART_CATEGORIES,ACCESSORY_SYSTEMS,partCategoryUz};
import photoData from './data/filament-photos.json';
import {STOCK,ORDER_LEAD_TIME} from './stock';
export {ORDER_LEAD_TIME};
const photos:Record<string,{file:string;kind:string;manufacturerVariant:string;source:string;sourcePage:string}>=photoData;

export const PRINTER_MODELS=['A1 mini','A1','A2L','P1P','P1S','P2S','X1','X1C','X1E','X2D','H2S','H2D','H2D Pro','H2C'];
export type Product={id:string;name:string;material:string;color:string;uzColor:string;colorKey:string;hex:string;price:number|null;old?:number;stock:number|null;image?:string;photoKind?:string;tag?:string;type:'filament'|'parts';weight:string;format:string;models:string[];sourceRows?:number[];brand?:string;uzName?:string;category?:string;candidateModels?:string[];sourcePartRows?:number[];sourceSetRows?:number[];sourceSheet?:string;variantGroup?:string;variantLabel?:string;accessorySystems?:string[];selectModel?:boolean;leadTime?:string|null;componentIds?:string[];partNoteRu?:string;partNoteUz?:string;availability?:'unknown'|'order';compatibilityPending?:boolean;selectionNote?:boolean};

const baseProducts:Product[]=[
{id:'pla-basic-green',name:'PLA Basic',material:'PLA Basic',color:'Зелёный',uzColor:'Yashil',colorKey:'green',hex:'#3fa866',price:249000,old:279000,stock:42,image:'green.webp',tag:'hit',type:'filament',weight:'1',format:'spool',models:PRINTER_MODELS},
{id:'pla-matte-white',name:'PLA Matte',material:'PLA Matte',color:'Белый Ivory White',uzColor:'Ivory White oq',colorKey:'white',hex:'#edece5',price:269000,stock:28,image:'white.webp',type:'filament',weight:'1',format:'spool',models:PRINTER_MODELS},
{id:'petg-hf-orange',name:'PETG HF',material:'PETG HF',color:'Оранжевый',uzColor:'To‘q sariq',colorKey:'orange',hex:'#f77f23',price:289000,stock:16,image:'orange.webp',tag:'new',type:'filament',weight:'1',format:'spool',models:PRINTER_MODELS},
{id:'pla-basic-black',name:'PLA Basic',material:'PLA Basic',color:'Чёрный',uzColor:'Qora',colorKey:'black',hex:'#222323',price:249000,stock:65,image:'black.webp',type:'filament',weight:'1',format:'spool',models:PRINTER_MODELS},
{id:'pla-basic-blue',name:'PLA Basic',material:'PLA Basic',color:'Синий',uzColor:'Ko‘k',colorKey:'blue',hex:'#2478cd',price:249000,stock:23,image:'blue.webp',type:'filament',weight:'1',format:'refill',models:PRINTER_MODELS},
{id:'petg-hf-white',name:'PETG HF',material:'PETG HF',color:'Белый',uzColor:'Oq',colorKey:'white',hex:'#f0eee8',price:289000,stock:0,image:'petg-white.webp',type:'filament',weight:'1',format:'spool',models:PRINTER_MODELS},
{id:'hotend-x1c',name:'Hotend X1C · 0.2 mm',material:'Hotend',color:'Нержавеющая сталь',uzColor:'Zanglamas po‘lat',colorKey:'steel',hex:'#999da0',price:189000,stock:12,image:'hotend.webp',type:'parts',weight:'',format:'',models:['X1','X1C']},
{id:'textured-plate',name:'Textured PEI Plate · X1/P1/A1',material:'Plate',color:'Текстурированная пластина',uzColor:'Teksturali plastina',colorKey:'gold',hex:'#c9ad6b',price:329000,stock:8,image:'plate.webp',type:'parts',weight:'',format:'',models:['A1','P1P','P1S','X1','X1C','X1E']},
];
export const colorOptions:[string,string,string,string][]=[
['Чёрный','Qora','#222323','black'],['Белый','Oq','#edece5','white'],['Серый','Kulrang','#929595','gray'],['Красный','Qizil','#d3423d','red'],['Синий','Ko‘k','#2478cd','blue'],['Жёлтый','Sariq','#ecd344','yellow'],['Зелёный','Yashil','#3fa866','green'],['Оранжевый','To‘q sariq','#f77f23','orange'],['Бежевый','Bej','#d9c8aa','beige'],['Тёмно-синий','To‘q ko‘k','#243750','navy'],['Прозрачный','Shaffof','#f4f6f3','transparent'],
];
const slug=(v:string)=>v.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const identity=(p:Pick<Product,'name'|'colorKey'|'format'>)=>`${p.name}|${p.colorKey}|${p.format}`;
const existing=new Map(baseProducts.map(p=>[identity(p),p]));
const imported=new Map<string,Product>();
for(const row of sourceRows){
 const color=colorOptions.find(c=>c[0]===row.color);
 const uncertainColor=!color;
 const colorKey=color?.[3]||(row.material==='PLA Silk'?'choice':'request');
 const displayColor=color?.[0]||(row.material==='PLA Silk'?'Цвет на выбор':'Цвет уточняется');
 const formats=row.format.includes('рефил')?['spool','refill']:['spool'];
 for(const format of formats){
  const key=`${row.material}|${colorKey}|${format}`;
  const old=existing.get(key);
  const prev=imported.get(key);
  if(prev){prev.sourceRows!.push(row.sourceRow);continue;}
  const photo=photos[`${row.material}|${colorKey}`];
  const familyImage=baseProducts.find(p=>p.name===row.material&&p.colorKey===colorKey)?.image;
  // Source contains planned stocking locations, not confirmed inventory quantities.
  const p:Product={
   id:old?.id||`${slug(row.material)}-${colorKey}-${format}`,
   name:row.material,material:row.material,color:old?.color||displayColor,uzColor:old?.uzColor||color?.[1]||(row.material==='PLA Silk'?'Rang tanlanadi':'Rang aniqlanadi'),colorKey,
   hex:old?.hex||color?.[2]||'#e1e6dc',price:typeof row.price==='number'?row.price:old?.price??null,stock:old?.stock??null,
   image:old?.image||photo?.file||(colorKey==='green'&&row.material==='PLA Basic'&&format==='refill'?'green-sample.webp':familyImage),
   photoKind:old?.image?'color':photo?.kind,old:old?.old,tag:old?.tag,type:'filament',weight:old?.weight||'',format,
   models:['PLA Basic','PLA Matte','PETG HF','PETG Basic'].includes(row.material)?PRINTER_MODELS:[],
   sourceRows:[row.sourceRow],availability:row.plannedLocation==='Под заказ'?'order':'unknown',
   compatibilityPending:!['PLA Basic','PLA Matte','PETG HF','PETG Basic'].includes(row.material),
   selectionNote:uncertainColor||colorKey==='transparent'||row.material==='PVA / Support W',
  };
  imported.set(key,p);
 }
}
// Preserve prototype URLs, demonstrations and the parts catalog.
const filamentProducts=baseProducts.filter(p=>p.type==='filament').map(p=>imported.get(identity(p))||p).concat([...imported.values()].filter(p=>!existing.has(identity(p))));
// Наличие и цены склада берутся только из app/stock.ts; всё остальное — под заказ.
const applyStock=(p:Product):Product=>{
 const s=STOCK[p.id];
 if(s&&s.qty>0)return {...p,stock:s.qty,price:s.price,old:undefined,availability:undefined,leadTime:null,weight:p.type==='filament'?(p.weight||'1'):p.weight};
 return {...p,stock:0,old:undefined,leadTime:null,tag:p.tag==='hit'?undefined:p.tag};
};
const allProducts=[...filamentProducts,...createParts(baseProducts.filter(p=>p.type==='parts'),PRINTER_MODELS)].map(applyStock);
export const products:Product[]=[...allProducts.filter(p=>(p.stock??0)>0),...allProducts.filter(p=>!((p.stock??0)>0))];
export const inStockNow=(p:Product)=>(p.stock??0)>0;
export const materials=['Все',...new Set(sourceRows.map(r=>r.material))];
export function matchesMaterial(p:Product,m:string){
 if(m==='Все')return true;
 if(m==='PLA')return p.name.startsWith('PLA');
 if(m==='PETG')return p.name.startsWith('PETG');
 if(m==='ABS / ASA')return p.name==='ABS'||p.name==='ASA';
 if(m==='TPU')return p.name.startsWith('TPU');
 if(m==='PA / композиты')return p.name.includes('-CF')||p.name.startsWith('PA')||p.name==='PC';
 return p.material===m;
}
export const canOrder=(p:Product)=>p.price!==null&&(p.stock??0)>0;
export function colorVariants(p:Product){
 const variants=products.filter(v=>v.name===p.name&&v.format===p.format);
 return [...new Map(variants.map(v=>[v.colorKey,v])).values()];
}
export function formatVariants(p:Product){return products.filter(v=>v.name===p.name&&v.colorKey===p.colorKey);}

export const matchesPrinter=(p:Product,model:string)=>model==='all'||p.models.includes(model)||(p.candidateModels||[]).includes(model);
export const partVariants=(p:Product)=>p.variantGroup?products.filter(v=>v.variantGroup===p.variantGroup):[];
export const productBrand=(p:Product)=>p.brand===undefined?'Bambu Lab':p.brand;
export function relatedProducts(p:Product):Product[]{
 const ids=p.componentIds||(p.type==='filament'&&p.name.startsWith('PLA')?['glue-stick','textured-plate']:p.type==='filament'&&p.name.startsWith('PETG')?['filament-dryer','textured-plate']:[]);
 const related=ids.map(id=>products.find(v=>v.id===id)).filter((v):v is Product=>!!v);
 if(related.length)return related;
 return products.filter(v=>v.id!==p.id&&canOrder(v)).slice(0,4);
}
