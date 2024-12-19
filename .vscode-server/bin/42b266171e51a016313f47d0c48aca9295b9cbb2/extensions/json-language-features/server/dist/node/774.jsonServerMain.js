"use strict";exports.id=774,exports.ids=[774],exports.modules={6694:function(e,t,n){var o,r=this&&this.__createBinding||(Object.create?function(e,t,n,o){void 0===o&&(o=n);var r=Object.getOwnPropertyDescriptor(t,n);r&&!("get"in r?!t.__esModule:r.writable||r.configurable)||(r={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,o,r)}:function(e,t,n,o){void 0===o&&(o=n),e[o]=t[n]}),i=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),s=this&&this.__importStar||(o=function(e){return o=Object.getOwnPropertyNames||function(e){var t=[];for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[t.length]=n);return t},o(e)},function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n=o(e),s=0;s<n.length;s++)"default"!==n[s]&&r(t,e,n[s]);return i(t,e),t});Object.defineProperty(t,"__esModule",{value:!0}),t.startServer=function(e,t){function n(n=["https","http","file"]){const o={};for(const e of n)"file"===e?o[e]=t.file:"http"!==e&&"https"!==e||(o[e]=t.http);return t=>{const n=t.substr(0,t.indexOf(":")),r=o[n];return r?r.getContent(t):e.sendRequest(p.type,t).then((e=>e),(e=>Promise.reject(e.message)))}}let o=(0,l.getLanguageService)({workspaceContext:b,contributions:[],clientCapabilities:l.ClientCapabilities.LATEST});const r=new c.TextDocuments(l.TextDocument);r.listen(e);let i,s=!1,d=!1,x=!1,j=Number.MAX_VALUE,A=Number.MAX_VALUE,w=Number.MAX_VALUE,P=Number.MAX_VALUE,R=Number.MAX_VALUE,E=Number.MAX_VALUE,_=Number.MAX_VALUE;e.onInitialize((u=>{const m=u.initializationOptions||{},f=m?.handledSchemaProtocols;function g(e,t){const n=e.split(".");let o=u.capabilities;for(let e=0;o&&e<n.length;e++){if(!o.hasOwnProperty(n[e]))return t;o=o[n[e]]}return o}o=(0,l.getLanguageService)({schemaRequestService:n(f),workspaceContext:b,contributions:[],clientCapabilities:u.capabilities}),s=g("textDocument.completion.completionItem.snippetSupport",!1),d=g("textDocument.rangeFormatting.dynamicRegistration",!1)&&"boolean"!=typeof m.provideFormatter,j=g("textDocument.foldingRange.rangeLimit",Number.MAX_VALUE),x=g("textDocument.documentSymbol.hierarchicalDocumentSymbolSupport",!1),_=m.customCapabilities?.rangeFormatting?.editLimit||Number.MAX_VALUE;const p=g("textDocument.diagnostic",void 0);return i=void 0===p?(0,a.registerDiagnosticsPushSupport)(r,e,t,N):(0,a.registerDiagnosticsPullSupport)(r,e,t,N),{capabilities:{textDocumentSync:c.TextDocumentSyncKind.Incremental,completionProvider:s?{resolveProvider:!1,triggerCharacters:['"',":"]}:void 0,hoverProvider:!0,documentSymbolProvider:!0,documentRangeFormattingProvider:!0===m.provideFormatter,documentFormattingProvider:!0===m.provideFormatter,colorProvider:{},foldingRangeProvider:!0,selectionRangeProvider:!0,documentLinkProvider:{},diagnosticProvider:{documentSelector:null,interFileDependencies:!1,workspaceDiagnostics:!1},codeActionProvider:!0}}}));let C,L,O=null,M=!0,T=!1;function q(){const e={validate:M,allowComments:!0,schemas:new Array};if(L)if(Array.isArray(L))Array.prototype.push.apply(e.schemas,L);else for(const t in L){const n=L[t];Array.isArray(n)&&n.forEach((n=>{e.schemas.push({uri:n,fileMatch:[t]})}))}C&&C.forEach(((t,n)=>{let o=t.url;!o&&t.schema&&(o=t.schema.id||`vscode://schemas/custom/${n}`),o&&e.schemas.push({uri:o,fileMatch:t.fileMatch,schema:t.schema,folderUri:t.folderUri})})),o.configure(e),i?.requestRefresh()}async function N(e){if(0===e.getText().length)return[];const t=F(e),n="jsonc"===e.languageId?{comments:"ignore",trailingCommas:"warning"}:{comments:"error",trailingCommas:"error"};return await o.doValidation(e,t,n)}e.onDidChangeConfiguration((n=>{const o=n.settings;t.configureHttpRequests?.(o?.http?.proxy,!!o.http?.proxyStrictSSL),C=o.json?.schemas,M=!!o.json?.validate?.enable,T=o.json?.keepLines?.enable||!1,q();const r=e=>Math.trunc(Math.max(e,0));if(A=r(o.json?.resultLimit||Number.MAX_VALUE),w=r(o.json?.jsonFoldingLimit||j),P=r(o.json?.jsoncFoldingLimit||j),R=r(o.json?.jsonColorDecoratorLimit||Number.MAX_VALUE),E=r(o.json?.jsoncColorDecoratorLimit||Number.MAX_VALUE),d){const t=o.json?.format?.enable;if(t){if(!O){const t=[{language:"json"},{language:"jsonc"}];O=[e.client.register(c.DocumentRangeFormattingRequest.type,{documentSelector:t}),e.client.register(c.DocumentFormattingRequest.type,{documentSelector:t})]}}else O&&(O.forEach((e=>e.then((e=>e.dispose())))),O=null)}})),e.onNotification(g.type,(e=>{L=e,q()})),e.onNotification(h.type,(e=>{let t=!1;if(Array.isArray(e))for(const n of e)o.resetSchema(n)&&(t=!0);else t=o.resetSchema(e);t&&i?.requestRefresh()})),e.onRequest(y.type,(async e=>{const t=r.get(e);return t?(q(),await N(t)):[]})),e.onRequest(v.type,(async e=>{const t=r.get(e);if(t){const e=F(t);return o.getLanguageStatus(t,e)}return{schemas:[]}})),e.onRequest(D.type,(async e=>{const t=e.uri,n=e.options,i=r.get(t);return i?o.sort(i,n):[]})),e.onDidChangeWatchedFiles((e=>{let t=!1;e.changes.forEach((e=>{o.resetSchema(e.uri)&&(t=!0)})),t&&i?.requestRefresh()}));const $=(0,m.getLanguageModelCache)(10,60,(e=>o.parseJSONDocument(e)));function F(e){return $.get(e)}function I(e,t,n){n.keepLines=T;const i=r.get(e.uri);if(i){const e=o.format(i,t??S(i),n);if(e.length>_){const t=l.TextDocument.applyEdits(i,e);return[c.TextEdit.replace(S(i),t)]}return e}return[]}r.onDidClose((e=>{$.onDocumentRemoved(e.document)})),e.onShutdown((()=>{$.dispose()})),e.onCompletion(((e,n)=>(0,u.runSafeAsync)(t,(async()=>{const t=r.get(e.textDocument.uri);if(t){const n=F(t);return o.doComplete(t,e.position,n)}return null}),null,`Error while computing completions for ${e.textDocument.uri}`,n))),e.onHover(((e,n)=>(0,u.runSafeAsync)(t,(async()=>{const t=r.get(e.textDocument.uri);if(t){const n=F(t);return o.doHover(t,e.position,n)}return null}),null,`Error while computing hover for ${e.textDocument.uri}`,n))),e.onDocumentSymbol(((e,n)=>(0,u.runSafe)(t,(()=>{const t=r.get(e.textDocument.uri);if(t){const e=F(t);return x?o.findDocumentSymbols2(t,e,{resultLimit:A}):o.findDocumentSymbols(t,e,{resultLimit:A})}return[]}),[],`Error while computing document symbols for ${e.textDocument.uri}`,n))),e.onCodeAction(((e,n)=>(0,u.runSafeAsync)(t,(async()=>{if(r.get(e.textDocument.uri)){const e=c.CodeAction.create("Sort JSON",c.CodeActionKind.Source.concat(".sort",".json"));return e.command={command:"json.sort",title:f.t("Sort JSON")},[e]}return[]}),[],`Error while computing code actions for ${e.textDocument.uri}`,n))),e.onDocumentRangeFormatting(((e,n)=>(0,u.runSafe)(t,(()=>I(e.textDocument,e.range,e.options)),[],`Error while formatting range for ${e.textDocument.uri}`,n))),e.onDocumentFormatting(((e,n)=>(0,u.runSafe)(t,(()=>I(e.textDocument,void 0,e.options)),[],`Error while formatting ${e.textDocument.uri}`,n))),e.onDocumentColor(((e,n)=>(0,u.runSafeAsync)(t,(async()=>{const t=r.get(e.textDocument.uri);if(t){const e=F(t),n="jsonc"===t.languageId?E:R;return o.findDocumentColors(t,e,{resultLimit:n})}return[]}),[],`Error while computing document colors for ${e.textDocument.uri}`,n))),e.onColorPresentation(((e,n)=>(0,u.runSafe)(t,(()=>{const t=r.get(e.textDocument.uri);if(t){const n=F(t);return o.getColorPresentations(t,n,e.color,e.range)}return[]}),[],`Error while computing color presentations for ${e.textDocument.uri}`,n))),e.onFoldingRanges(((e,n)=>(0,u.runSafe)(t,(()=>{const t=r.get(e.textDocument.uri);if(t){const e="jsonc"===t.languageId?P:w;return o.getFoldingRanges(t,{rangeLimit:e})}return null}),null,`Error while computing folding ranges for ${e.textDocument.uri}`,n))),e.onSelectionRanges(((e,n)=>(0,u.runSafe)(t,(()=>{const t=r.get(e.textDocument.uri);if(t){const n=F(t);return o.getSelectionRanges(t,e.positions,n)}return[]}),[],`Error while computing selection ranges for ${e.textDocument.uri}`,n))),e.onDocumentLinks(((e,n)=>(0,u.runSafeAsync)(t,(async()=>{const t=r.get(e.textDocument.uri);if(t){const e=F(t);return o.findLinks(t,e)}return[]}),[],`Error while computing links for ${e.textDocument.uri}`,n))),e.listen()};const c=n(2861),u=n(211),a=n(9178),l=n(7547),m=n(5908),d=n(7608),f=s(n(5747));var g,p,h,y,v,D;!function(e){e.type=new c.NotificationType("json/schemaAssociations")}(g||(g={})),function(e){e.type=new c.RequestType("vscode/content")}(p||(p={})),function(e){e.type=new c.NotificationType("json/schemaContent")}(h||(h={})),function(e){e.type=new c.RequestType("json/validate")}(y||(y={})),function(e){e.type=new c.RequestType("json/languageStatus")}(v||(v={})),function(e){e.type=new c.RequestType("json/sort")}(D||(D={}));const b={resolveRelativePath:(e,t)=>{const n=t.substring(0,t.lastIndexOf("/")+1);return d.Utils.resolvePath(d.URI.parse(n),e).toString()}};function S(e){return l.Range.create(l.Position.create(0,0),e.positionAt(e.getText().length))}},5908:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.getLanguageModelCache=function(e,t,n){let o,r={},i=0;return t>0&&(o=setInterval((()=>{const e=Date.now()-1e3*t,n=Object.keys(r);for(const t of n)r[t].cTime<e&&(delete r[t],i--)}),1e3*t)),{get(t){const o=t.version,s=t.languageId,c=r[t.uri];if(c&&c.version===o&&c.languageId===s)return c.cTime=Date.now(),c.languageModel;const u=n(t);if(r[t.uri]={languageModel:u,version:o,languageId:s,cTime:Date.now()},c||i++,i===e){let e=Number.MAX_VALUE,t=null;for(const n in r){const o=r[n];o.cTime<e&&(t=n,e=o.cTime)}t&&(delete r[t],i--)}return u},onDocumentRemoved(e){const t=e.uri;r[t]&&(delete r[t],i--)},dispose(){void 0!==o&&(clearInterval(o),o=void 0,r={},i=0)}}}},6774:function(e,t,n){var o,r=this&&this.__createBinding||(Object.create?function(e,t,n,o){void 0===o&&(o=n);var r=Object.getOwnPropertyDescriptor(t,n);r&&!("get"in r?!t.__esModule:r.writable||r.configurable)||(r={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,o,r)}:function(e,t,n,o){void 0===o&&(o=n),e[o]=t[n]}),i=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),s=this&&this.__importStar||(o=function(e){return o=Object.getOwnPropertyNames||function(e){var t=[];for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[t.length]=n);return t},o(e)},function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n=o(e),s=0;s<n.length;s++)"default"!==n[s]&&r(t,e,n[s]);return i(t,e),t});Object.defineProperty(t,"__esModule",{value:!0});const c=n(1327),u=n(211),a=n(6694),l=n(9323),m=n(7608),d=s(n(9896)),f=(0,c.createConnection)();console.log=f.console.log.bind(f.console),console.error=f.console.error.bind(f.console),process.on("unhandledRejection",(e=>{f.console.error((0,u.formatError)("Unhandled exception",e))}));const g={timer:{setImmediate(e,...t){const n=setImmediate(e,...t);return{dispose:()=>clearImmediate(n)}},setTimeout(e,t,...n){const o=setTimeout(e,t,...n);return{dispose:()=>clearTimeout(o)}}},file:{getContent:(e,t)=>new Promise(((n,o)=>{const r=m.URI.parse(e);d.readFile(r.fsPath,t,((e,t)=>{if(e)return o(e);n(t.toString())}))}))},http:{getContent:(e,t)=>(0,l.xhr)({url:e,followRedirects:5,headers:{"Accept-Encoding":"gzip, deflate"}}).then((e=>e.responseText),(e=>Promise.reject(e.responseText||(0,l.getErrorStatusDescription)(e.status)||e.toString())))},configureHttpRequests:l.configure};(0,a.startServer)(f,g)},211:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.formatError=r,t.runSafeAsync=function(e,t,n,o,s){return new Promise((c=>{e.timer.setImmediate((()=>{if(!s.isCancellationRequested)return t().then((e=>{s.isCancellationRequested?c(i()):c(e)}),(e=>{console.error(r(o,e)),c(n)}));c(i())}))}))},t.runSafe=function(e,t,n,o,s){return new Promise((c=>{e.timer.setImmediate((()=>{if(s.isCancellationRequested)c(i());else try{const e=t();if(s.isCancellationRequested)return void c(i());c(e)}catch(e){console.error(r(o,e)),c(n)}}))}))};const o=n(2861);function r(e,t){if(t instanceof Error){const n=t;return`${e}: ${n.message}\n${n.stack}`}return"string"==typeof t?`${e}: ${t}`:t?`${e}: ${t.toString()}`:e}function i(){return console.log("cancelled"),new o.ResponseError(o.LSPErrorCodes.RequestCancelled,"Request cancelled")}},9178:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.registerDiagnosticsPushSupport=function(e,t,n,o){const i={},s=[];function c(e){const t=i[e.uri];t&&(t.dispose(),delete i[e.uri])}function u(e){c(e);const s=i[e.uri]=n.timer.setTimeout((async()=>{if(s===i[e.uri])try{const n=await o(e);s===i[e.uri]&&t.sendDiagnostics({uri:e.uri,diagnostics:n}),delete i[e.uri]}catch(n){t.console.error((0,r.formatError)(`Error while validating ${e.uri}`,n))}}),500)}return e.onDidChangeContent((e=>{u(e.document)}),void 0,s),e.onDidClose((e=>{c(e.document),t.sendDiagnostics({uri:e.document.uri,diagnostics:[]})}),void 0,s),{requestRefresh:()=>{e.all().forEach(u)},dispose:()=>{s.forEach((e=>e.dispose())),s.length=0;const e=Object.keys(i);for(const t of e)i[t].dispose(),delete i[t]}}},t.registerDiagnosticsPullSupport=function(e,t,n,i){function s(e){return{kind:o.DocumentDiagnosticReportKind.Full,items:e}}const c=t.languages.diagnostics.on((async(t,o)=>(0,r.runSafeAsync)(n,(async()=>{const n=e.get(t.textDocument.uri);return s(n?await i(n):[])}),s([]),`Error while computing diagnostics for ${t.textDocument.uri}`,o)));return{requestRefresh:function(){t.languages.diagnostics.refresh()},dispose:()=>{c.dispose()}}};const o=n(2861),r=n(211)}};
//# sourceMappingURL=https://main.vscode-cdn.net/sourcemaps/42b266171e51a016313f47d0c48aca9295b9cbb2/extensions/json-language-features/server/dist/node/774.jsonServerMain.js.map