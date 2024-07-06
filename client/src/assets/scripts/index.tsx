import { menuItems } from "./MenuData";

console.log("Vite env", import.meta.env.VITE_API_URL);

// interface IMenuItem_Props {
// 	name: string;
// 	price: string;
// 	memo?: string;
// }

// function MenuItem(props: IMenuItem_Props) {
// 	return (
// 		<div class="item">
// 			<h3 class="item-name">{props.name}</h3>
// 			<p class="item-price">${props.price}</p>
// 			<p class="item-desc">{props.memo}</p>
// 		</div>
// 	);
// }

interface IMenuItem {
	name: string;
	price: string;
	memo?: string;
	// memo: string | undefined;
}

interface IMenuItem_Props {
	item: IMenuItem;
}

function MenuItem(props: IMenuItem_Props) {
	return (
		<div class="item">
			<h3 class="item-name">{props.item.name}</h3>
			<p class="item-price">${props.item.price}</p>
			{props.item.memo && <p class="item-desc">{props.item.memo}</p>}
		</div>
	);
}

function MenuItem3(item: IMenuItem) {
	return (
		<div class="item">
			<h3 class="item-name">{item.name}</h3>
			<p class="item-price">${item.price}</p>
			{item.memo && <p class="item-desc">{item.memo}</p>}
		</div>
	);
}

interface IMenuPart_Props {
	title: string;
	items: IMenuItem[];
	special?: boolean;
}

function MenuPart(props: IMenuPart_Props) {
	return (
		<section class="menu-part">
			<div class={["part-title", props.special && "special"]}>{props.title}.</div>
			<div class="item-list">{props.items.map(MenuItem3)}</div>
		</section>
	);
}

const pageContent = (
	<main id="main">
		<section class="menu-part">
			<h1 id="menu-title">
				<span>ME</span>
				<span>NU</span>
			</h1>
		</section>

		<MenuPart title="Appetizers" items={menuItems.appetizers} />
		<MenuPart title="Main Course" items={menuItems.mainCourse} />
		<MenuPart title="Chef Specials" items={menuItems.chefSpecials} special />
		<MenuPart title="Desserts" items={menuItems.desserts} />
		<MenuPart title="Drinks" items={menuItems.drinks} />

		<section id="footer" class="menu-part">
			<p>YOUR LOGO</p>

			<p>1234 Main St. | City, State 12345</p>

			<p>myfancyrestaurant.com</p>
		</section>
	</main>
);

document.body.appendChild(pageContent);
