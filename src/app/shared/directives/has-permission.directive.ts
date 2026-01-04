import { Directive, OnInit, TemplateRef, ViewContainerRef, Input } from '@angular/core';
import { PermissionService } from '../services/permission.service';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[hasPermission]'
})
export class HasPermissionDirective implements OnInit {
  @Input('hasPermission') permissions: number[];

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private permissionService: PermissionService,
  ) {}

  ngOnInit() {
    const hasPermission = this.permissionService.can(this.permissions);
    if (hasPermission) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
