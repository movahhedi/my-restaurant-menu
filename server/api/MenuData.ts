interface IMenuItem {
	name: string;
	price: string;
	memo?: string;
}

interface IMenuCategory {
	title: string;
	slug: string;
	items: IMenuItem[];
}

export const menuCategories: IMenuCategory[] = [
	{
		slug: "category-a",
		title: "Category A",
		items: [
			{
				name: "Item 1",
				price: "100",
			},
			{
				name: "Item 2",
				price: "200",
				memo: "This is a memo",
			},
		],
	},
];
