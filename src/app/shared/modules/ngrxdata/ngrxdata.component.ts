import { AfterContentInit, AfterViewInit, Component, HostBinding, Input } from '@angular/core';
import { NgrxListSelector } from 'src/app/core/interfaces/general.interface';

interface ISelectorData {
  data: any,
  isSend: boolean,
  paginator: any,
  isFetching: boolean,
  isDone: boolean,
  isFailed: boolean,
  isSuccess: boolean,
  isAgain: boolean,
  successMsg: any,
  errorMsg: any,
}

@Component({
  selector: 'app-ngrxdata',
  templateUrl: './ngrxdata.component.html',
  styleUrls: ['./ngrxdata.component.scss'],
  exportAs: "ngrxdata"
})
export class NgrxdataComponent implements AfterViewInit {
  @HostBinding('class')
  public hostClass = 'app-ngrxdata d-block';
  @Input()
  public selector!: NgrxListSelector<any>;
  @Input()
  public isDefaultError: boolean = true;
  @Input()
  public isDefaultLoader: boolean = true;

  public content: ISelectorData = {} as ISelectorData;

  constructor() {
  }

  ngAfterViewInit(): void {
    this.selector?.getList$.subscribe(d => this.content.data = d);
    this.selector?.isSend$.subscribe(d => this.content.isSend = d);
    this.selector?.paginator$.subscribe(d => this.content.paginator = d);
    this.selector?.isFetching$.subscribe(d => this.content.isFetching = d);
    this.selector?.isDone$.subscribe(d => this.content.isDone = d);
    this.selector?.isFailed$.subscribe(d => this.content.isFailed = d);
    this.selector?.isSuccess$.subscribe(d => this.content.isSuccess = d);
    this.selector?.isAgain$.subscribe(d => this.content.isAgain = d);
    this.selector?.successMsg$.subscribe(d => this.content.successMsg = d);
    this.selector?.errorMsg$.subscribe(d => this.content.errorMsg = d);
  }
}
