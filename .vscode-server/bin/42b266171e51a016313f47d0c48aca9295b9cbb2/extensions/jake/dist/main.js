(()=>{"use strict";var e={184:function(e,t,s){var r,o=this&&this.__createBinding||(Object.create?function(e,t,s,r){void 0===r&&(r=s);var o=Object.getOwnPropertyDescriptor(t,s);o&&!("get"in o?!t.__esModule:o.writable||o.configurable)||(o={enumerable:!0,get:function(){return t[s]}}),Object.defineProperty(e,r,o)}:function(e,t,s,r){void 0===r&&(r=s),e[r]=t[s]}),i=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),n=this&&this.__importStar||(r=function(e){return r=Object.getOwnPropertyNames||function(e){var t=[];for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&(t[t.length]=s);return t},r(e)},function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var s=r(e),n=0;n<s.length;n++)"default"!==s[n]&&o(t,e,s[n]);return i(t,e),t});Object.defineProperty(t,"__esModule",{value:!0}),t.activate=function(e){g=new P,g.start()},t.deactivate=function(){g.dispose()};const a=n(s(928)),c=n(s(896)),d=n(s(317)),u=n(s(398));function h(e){return new Promise(((t,s)=>{c.exists(e,(e=>{t(e)}))}))}const l=["build","compile","watch"];function p(e){for(const t of l)if(-1!==e.indexOf(t))return!0;return!1}const f=["test"];function k(e){for(const t of f)if(-1!==e.indexOf(t))return!0;return!1}let w,g;function v(){return w||(w=u.window.createOutputChannel("Jake Auto Detection")),w}function m(){u.window.showWarningMessage(u.l10n.t("Problem finding jake tasks. See the output for more information."),u.l10n.t("Go to output")).then((()=>{v().show(!0)}))}async function j(e){let t;const s=process.platform;return t="win32"===s&&await h(a.join(e,"node_modules",".bin","jake.cmd"))?a.join(".","node_modules",".bin","jake.cmd"):"linux"!==s&&"darwin"!==s||!await h(a.join(e,"node_modules",".bin","jake"))?"jake":a.join(".","node_modules",".bin","jake"),t}class _{constructor(e,t){this._workspaceFolder=e,this._jakeCommand=t}get workspaceFolder(){return this._workspaceFolder}isEnabled(){return"on"===u.workspace.getConfiguration("jake",this._workspaceFolder.uri).get("autoDetect")}start(){const e=a.join(this._workspaceFolder.uri.fsPath,"{node_modules,Jakefile,Jakefile.js}");this.fileWatcher=u.workspace.createFileSystemWatcher(e),this.fileWatcher.onDidChange((()=>this.promise=void 0)),this.fileWatcher.onDidCreate((()=>this.promise=void 0)),this.fileWatcher.onDidDelete((()=>this.promise=void 0))}async getTasks(){return this.isEnabled()?(this.promise||(this.promise=this.computeTasks()),this.promise):[]}async getTask(e){const t=e.definition.task;if(t){const s=e.definition,r={cwd:this.workspaceFolder.uri.fsPath};return new u.Task(s,this.workspaceFolder,t,"jake",new u.ShellExecution(await this._jakeCommand,[t],r))}}async computeTasks(){const e="file"===this._workspaceFolder.uri.scheme?this._workspaceFolder.uri.fsPath:void 0,t=[];if(!e)return t;let s=a.join(e,"Jakefile");if(!await h(s)&&(s=a.join(e,"Jakefile.js"),!await h(s)))return t;const r=`${await this._jakeCommand} --tasks`;try{const{stdout:t,stderr:s}=await(o=r,i={cwd:e},new Promise(((e,t)=>{d.exec(o,i,((s,r,o)=>{s&&t({error:s,stdout:r,stderr:o}),e({stdout:r,stderr:o})}))})));s&&(v().appendLine(s),m());const n=[];if(t){const e=t.split(/\r{0,1}\n/);for(const t of e){if(0===t.length)continue;const e=/^jake\s+([^\s]+)\s/g.exec(t);if(e&&2===e.length){const s=e[1],r={type:"jake",task:s},o={cwd:this.workspaceFolder.uri.fsPath},i=new u.Task(r,s,"jake",new u.ShellExecution(`${await this._jakeCommand} ${s}`,o));n.push(i);const a=t.toLowerCase();p(a)?i.group=u.TaskGroup.Build:k(a)&&(i.group=u.TaskGroup.Test)}}}return n}catch(e){const s=v();return e.stderr&&s.appendLine(e.stderr),e.stdout&&s.appendLine(e.stdout),s.appendLine(u.l10n.t("Auto detecting Jake for folder {0} failed with error: {1}', this.workspaceFolder.name, err.error ? err.error.toString() : 'unknown")),m(),t}var o,i}dispose(){this.promise=void 0,this.fileWatcher&&this.fileWatcher.dispose()}}class P{constructor(){this.detectors=new Map}start(){const e=u.workspace.workspaceFolders;e&&this.updateWorkspaceFolders(e,[]),u.workspace.onDidChangeWorkspaceFolders((e=>this.updateWorkspaceFolders(e.added,e.removed))),u.workspace.onDidChangeConfiguration(this.updateConfiguration,this)}dispose(){this.taskProvider&&(this.taskProvider.dispose(),this.taskProvider=void 0),this.detectors.clear()}updateWorkspaceFolders(e,t){for(const e of t){const t=this.detectors.get(e.uri.toString());t&&(t.dispose(),this.detectors.delete(e.uri.toString()))}for(const t of e){const e=new _(t,j(t.uri.fsPath));this.detectors.set(t.uri.toString(),e),e.isEnabled()&&e.start()}this.updateProvider()}updateConfiguration(){for(const e of this.detectors.values())e.dispose(),this.detectors.delete(e.workspaceFolder.uri.toString());const e=u.workspace.workspaceFolders;if(e)for(const t of e)if(!this.detectors.has(t.uri.toString())){const e=new _(t,j(t.uri.fsPath));this.detectors.set(t.uri.toString(),e),e.isEnabled()&&e.start()}this.updateProvider()}updateProvider(){if(!this.taskProvider&&this.detectors.size>0){const e=this;this.taskProvider=u.tasks.registerTaskProvider("jake",{provideTasks:()=>e.getTasks(),resolveTask:t=>e.getTask(t)})}else this.taskProvider&&0===this.detectors.size&&(this.taskProvider.dispose(),this.taskProvider=void 0)}getTasks(){return this.computeTasks()}computeTasks(){if(0===this.detectors.size)return Promise.resolve([]);if(1===this.detectors.size)return this.detectors.values().next().value.getTasks();{const e=[];for(const t of this.detectors.values())e.push(t.getTasks().then((e=>e),(()=>[])));return Promise.all(e).then((e=>{const t=[];for(const s of e)s&&s.length>0&&t.push(...s);return t}))}}async getTask(e){if(0!==this.detectors.size){if(1===this.detectors.size)return this.detectors.values().next().value.getTask(e);if(e.scope!==u.TaskScope.Workspace&&e.scope!==u.TaskScope.Global&&e.scope){const t=this.detectors.get(e.scope.uri.toString());if(t)return t.getTask(e)}}}}},398:e=>{e.exports=require("vscode")},317:e=>{e.exports=require("child_process")},896:e=>{e.exports=require("fs")},928:e=>{e.exports=require("path")}},t={},s=function s(r){var o=t[r];if(void 0!==o)return o.exports;var i=t[r]={exports:{}};return e[r].call(i.exports,i,i.exports,s),i.exports}(184),r=exports;for(var o in s)r[o]=s[o];s.__esModule&&Object.defineProperty(r,"__esModule",{value:!0})})();
//# sourceMappingURL=https://main.vscode-cdn.net/sourcemaps/42b266171e51a016313f47d0c48aca9295b9cbb2/extensions/jake/dist/main.js.map