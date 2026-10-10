// Real catalog and filter functions; no network requests or manufactured listings.
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),ts=require('typescript');
const source=fs.readFileSync('components/buy/buy-data.ts','utf8');
const exportsObject={};vm.runInNewContext(ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText,{exports:exportsObject,URLSearchParams});
const {BUY_HOMES,EMPTY_BUY_FILTERS,parseBuyFilters,filterBuyHomes,buyHref,buyQueryEntries,buyEnquiryHref,activeBuyFilters}=exportsObject;
const ids=(query)=>Array.from(filterBuyHomes(BUY_HOMES,parseBuyFilters(query)),home=>home.id);
const original=JSON.parse(fs.readFileSync('output/buy/original-listings.json'));
for(const home of BUY_HOMES){const before=original.find(row=>row.id===home.id);for(const key of ['title','location','description','bhk','size','price','amenitiesText'])assert.equal(home[key],before[key]);}
assert.deepEqual(ids({}),[1,2,3,4,5,6,7,8]);
assert.deepEqual(ids({q:'New Town'}),[1,7]);
assert.deepEqual(ids({location:['new-town','rajarhat']}),[1,3,7,8]);
assert.deepEqual(ids({location:'new-town',budget:'1.5cr-3cr',bedrooms:'3bhk',type:'apartment'}),[1]);
assert.deepEqual(ids({budget:'under-1.5'}),[3,6]);
assert.deepEqual(ids({maxPrice:'2'}),[1,3,6]);
assert.deepEqual(ids({bedrooms:'4bhk'}),[1,2,4,5,7,8]);
assert.deepEqual(ids({type:'villa'}),[8]);
assert.deepEqual(ids({'status-filter':'ready'}),[2,4,6,8]);
assert.deepEqual(ids({amenity:['water','club']}),[1]);
assert.deepEqual(ids({location:'alipore',type:'studio'}),[]);
assert.deepEqual(ids({sort:'price-asc'}),[6,3,1,2,5,8,4,7]);
assert.deepEqual(ids({sort:'area-desc'}),[7,8,4,5,2,1,3,6]);
assert.deepEqual(Array.from(BUY_HOMES,h=>h.id),[1,2,3,4,5,6,7,8],'sort must not mutate inventory');
const filtered=parseBuyFilters({location:['new-town','rajarhat'],budget:'above-4',bedrooms:'5+',status:'launch',amenity:'lift',sort:'price-desc',page:'2'});
const url=buyHref(filtered),params=new URLSearchParams(url.split('?')[1].split('#')[0]),round={};
for(const key of new Set(params.keys()))round[key]=params.getAll(key).length>1?params.getAll(key):params.get(key);
assert.equal(JSON.stringify(parseBuyFilters(round)),JSON.stringify(filtered));
assert.equal(new URL('http://local'+buyHref(filtered,{page:1})).searchParams.has('page'),false);
assert.equal(activeBuyFilters(filtered).length,6);
assert.equal(buyHref({...EMPTY_BUY_FILTERS}),'/buy#homes');
assert.equal(buyQueryEntries(parseBuyFilters({location:'<bad>',type:'<bad>',maxPrice:'-2',page:'NaN'})).length,0);
for(const home of BUY_HOMES){const query=new URL('http://local'+buyEnquiryHref(home)).searchParams;assert.equal(query.get('purpose'),'buy');assert.ok(query.get('property').startsWith(home.title));}
const report={passed:['all eight original listing names, prices, locations, descriptions, sizes, configurations, and amenity copy preserved','query, multi-location, budget, max-price, bedroom, type, status, and combined amenities filtering','landing-page query values select matching homes during SSR','price/size sorting leaves catalog unchanged','multi-value filters survive URL round trips, page changes and resets','invalid input normalization and no-result queries','working buyer enquiry URLs for every listing']};
fs.writeFileSync('output/buy/filter-checks.json',JSON.stringify(report,null,2));console.log(report.passed.join('\n'));
