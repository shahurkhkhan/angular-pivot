import { NgModule } from '@angular/core';

// Custom Pipes
import { AssetsimagePipe } from './assetsimage.pipe';

const pipes: any[] = [
    AssetsimagePipe,
]

@NgModule({
  imports: [
  ],
  exports: pipes,
  declarations: pipes,
  providers: [],
})
export class SharedPipesModule { }
