import { Directive, OnInit, TemplateRef, ViewContainerRef, Input } from '@angular/core';
import { PermissionService } from '../services/permission.service';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[hasAnyPermission]'
})
export class HasAnyPermissionDirective implements OnInit {
  @Input('hasAnyPermission') permissions: number[];

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private permissionService: PermissionService,
  ) {}

  ngOnInit() {
    const hasPermission = this.permissionService.canAny(this.permissions);
    if (hasPermission) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
