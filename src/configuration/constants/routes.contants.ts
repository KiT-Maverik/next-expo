interface Route {
	href: string
	title: string
}

export enum ROOT_ROUTES {
	HOME = 'home',
}

const root: { [key in ROOT_ROUTES]: Route } = {
	[ROOT_ROUTES.HOME]: { href: '/', title: 'Home' },
}

export const route = {
	...root,
} as const
