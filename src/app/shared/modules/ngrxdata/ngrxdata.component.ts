import { AfterViewInit, Component, HostBinding, Input } from '@angular/core';
import { ActionSelector } from 'src/app/core/interfaces/general.interface';
import { isValueType } from 'src/app/core/utils';

interface ISelectorData<T> {
  data: T,
  isSend: boolean,
  paginator: any,
  isFetching: boolean,
  isDone: boolean,
  isFailed: boolean,
  isSuccess: boolean,
  isAgain: boolean,
  successMsg: any,
  errorMsg: any,
  state: any
}

@Component({
  selector: 'app-ngrxdata',
  templateUrl: './ngrxdata.component.html',
  styleUrls: ['./ngrxdata.component.scss'],
  exportAs: "ngrxdata"
})
export class NgrxdataComponent<T = any[]> implements AfterViewInit {
  @HostBinding('class')
  public hostClass = 'app-ngrxdata d-block';
  @Input()
  public selector!: ActionSelector<T>;
  @Input()
  public isDefaultError: boolean = true;
  @Input()
  public isDefaultLoader: boolean = true;
  @Input()
  public isDefaultLoaderAgain: boolean = true;
  @Input()
  public isDefaultNoData: boolean = true;


  public content: ISelectorData<T> = { } as ISelectorData<T>;

  constructor() {
  }

  ngAfterViewInit(): void {
    this.selector?.state$.subscribe(d => this.content.state = d);
    this.selector?.data$.subscribe(d => this.content.data = d);
    this.selector?.isSend$.subscribe(d => this.content.isSend = d);
    // this.selector?.paginator$.subscribe(d => this.content.paginator = d);
    // this.selector?.isFetching$?.subscribe(d => this.content.isFetching = d);
    this.selector?.isDone$.subscribe(d => this.content.isDone = d);
    this.selector?.isFailed$.subscribe(d => this.content.isFailed = d);
    this.selector?.isSuccess$.subscribe(d => this.content.isSuccess = d);
    this.selector?.isAgain$.subscribe(d => this.content.isAgain = d);
    this.selector?.successMsg$.subscribe(d => this.content.successMsg = d);
    this.selector?.errorMsg$.subscribe(d => this.content.errorMsg = d);
  }

  public get isDataEmpty () {
    return (
      isValueType(this.content.data, 'Array')
      &&
      !(this.content?.data as any[]).length
    )
  }
}
