export default interface Product {
	category: string;
	popular: string;
	price: string;
	id: string;
	name: string;
	subtitle: string;
	imagename: string;
	sections: Section[];
	warnings: string[];
}

interface Section {
	title: string;
	ps?: string[];
	subsections?: {
		title: string;
		ps: string[];
	}[];
}
