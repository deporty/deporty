import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { logEvent } from 'firebase/analytics';
import { environment } from 'src/environments/environment';
import { COMPONENTS_MAPPER } from '../components.mapper';
import { AdDirective } from '../components/ad.directive';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.scss'],
})
export class NewsDetailComponent implements OnInit, AfterViewInit {

  
  @Input() body: any;

  @ViewChild(AdDirective, { static: true }) adHost!: AdDirective;

  constructor(
    private route: ActivatedRoute,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}
  ngAfterViewInit(): void {}

  ngOnInit(): void {
    // this.route.params.subscribe((params) => {
    //   // this.date = params['date'];
    //   // this.data = this.datesInformationService.getPublicationByMatch(this.date);
    //   this.body = this.data.body;
    //   // if (environment.analytics) {
    //   //   logEvent(analytics, 'magazine.detail', { date: params['date'] });
    //   // }
    // });
    this.render(this.body, this.adHost);
  }

  render(body: any, parent: AdDirective): void {
    let newParent = parent;
    if (body.component) {
      const component = (COMPONENTS_MAPPER as any)[body.component];

      const componentFactory =
        this.componentFactoryResolver.resolveComponentFactory(component);
      // this.viewContainerRef.clear();
      const componentRef: ComponentRef<any> =
        parent.viewContainerRef.createComponent(componentFactory);
      newParent = componentRef.instance.adHost;
      (<any>componentRef.instance).data = body.data;
    }
    if (body.children) {
      for (const child of body.children) {
        this.render(child, newParent);
      }
    }
  }
}
