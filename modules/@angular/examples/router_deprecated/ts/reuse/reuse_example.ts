import {Component, ComponentRef} from '@angular/core';
import {bootstrap} from '@angular/platform-browser';
import {
  RouteConfig,
  ComponentInstruction,
  ROUTER_DIRECTIVES,
  CanReuse,
  RouteParams,
  OnReuse
} from '@angular/router-deprecated';
import {APP_BASE_HREF} from '@angular/common';


// #docregion reuseCmp
@Component({
  selector: 'my-cmp',
  template: `
    <div>hello {{name}}!</div>
    <div>message: <input id="message"></div>
  `
})
class MyCmp implements CanReuse,
    OnReuse {
  name: string;
  constructor(params: RouteParams) { this.name = params.get('name') || 'NOBODY'; }

  routerCanReuse(next: ComponentInstruction, prev: ComponentInstruction) { return true; }

  routerOnReuse(next: ComponentInstruction, prev: ComponentInstruction) {
    this.name = next.params['name'];
  }
}
// #enddocregion


@Component({
  selector: 'example-app',
  template: `
    <h1>Say hi to...</h1>
    <a [routerLink]="['/HomeCmp', {name: 'naomi'}]" id="naomi-link">Naomi</a> |
    <a [routerLink]="['/HomeCmp', {name: 'brad'}]" id="brad-link">Brad</a>
    <router-outlet></router-outlet>
  `,
  directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
  {path: '/', component: MyCmp, name: 'HomeCmp'},
  {path: '/:name', component: MyCmp, name: 'HomeCmp'}
])
export class AppCmp {
}


export function main(): Promise<ComponentRef<AppCmp>> {
  return bootstrap(AppCmp,
                   [{provide: APP_BASE_HREF, useValue: '/@angular/examples/router/ts/reuse'}]);
}
