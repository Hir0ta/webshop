import{	trigger,state,style,animate,transition } from '@angular/animations';

export const menuAnimations =
[
	/*Open-close main categories*/
	trigger('toggle',
		[
			//Menu animation
			state('menuOpened', style({
				height: '*',
				overflow: '*'
			})),
			state('menuClosed', style({
				height: '0',
				overflow: 'hidden'
			})),
			state('rotateOpened', style({
				transform: '*'
			})),
			
			state('rotateClosed', style({
				transform: 'rotate(180deg)'
			})),
			transition('menuOpened => menuClosed',
				[
					animate('0.3s')
				]),
			transition('menuClosed => menuOpened',
				[
					animate('0.3s')
				]),
			transition('rotateOpened => rotateClosed',
				[
					animate('0.3s')
				]),
			transition('rotateClosed => rotateOpened',
				[
					animate('0.3s')
				])
		])	
]