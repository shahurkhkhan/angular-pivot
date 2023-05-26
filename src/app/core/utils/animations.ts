import {
  animate,
  group,
  query,
  sequence,
  stagger,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const bounceAnimation = trigger('bounce', [
  state('active', style({ transform: 'translateY(0)' })),
  transition('* => active', [
    sequence([
      style({ transform: 'translateY(0)' }),
      animate(
        '400ms cubic-bezier(0,0,0,1)',
        style({ transform: 'translateY(-14px)' })
      ),
      animate(
        '300ms cubic-bezier(1,0,1,1)',
        style({ transform: 'translateY(0)' })
      ),
      animate(
        '200ms cubic-bezier(0,0,0,1)',
        style({ transform: 'translateY(-10px)' })
      ),
      animate(
        '150ms cubic-bezier(1,0,1,1)',
        style({ transform: 'translateY(0)' })
      ),
      animate(
        '100ms cubic-bezier(0,0,0,1)',
        style({ transform: 'translateY(-5px)' })
      ),
      animate(
        '80ms cubic-bezier(1,0,1,1)',
        style({ transform: 'translateY(0)' })
      ),
    ]),
  ]),
]);
export const listAnimation = trigger('listAnimation', [
  transition('* <=> *', [
    query(':enter',
      [style({ opacity: 0 }), stagger('60ms', animate('600ms ease-out', style({ opacity: 1 })))]
    ),
    query(':leave',
      animate('0ms', style({ opacity: 0 }))
    )
  ])
]);
