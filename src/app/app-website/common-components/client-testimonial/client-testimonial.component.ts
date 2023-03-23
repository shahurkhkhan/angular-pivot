import { Component, HostBinding, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
// Mat
import { MatIconModule } from '@angular/material/icon';
import { SharedPipesModule } from 'src/app/shared/pipes/shared-pipes.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-client-testimonial',
  templateUrl: './client-testimonial.component.html',
  styleUrls: ['./client-testimonial.component.scss'],
  standalone: true,
  imports: [CommonModule, MatIconModule, SharedPipesModule, NgxSkeletonLoaderModule],
})
export class ClientTestimonialComponent {
  @HostBinding('class')
  public hostClass = 'd-block app-client-testimonial';
  @Input()
  public testimonial: any;
  @Input()
  public loading: any = false;
}
