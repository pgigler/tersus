import React from "react";
import { Link } from "gatsby";

const GetInTouch = () => {
	return (
		<div id="getInTouch" className="bg-brand-blue text-black">
			<div className="container p-4">
				<h1 className="mb-4 text-xl font-semibold">Lépjen velünk kapcsolatba!</h1>
				<ul className="list-disc list-inside mb-4">
					<li>Nem tudja milyen tisztószert vásároljon?</li>
					<li>
						Egy megbízható szolgáltatóra van szüksége, aki megfelelő szakmai segítséget is tud nyújtani?
					</li>
					<li>Már vásárolt máshol és nem elégedett az eredménnyel?</li>
				</ul>
				<p>Nyugodtan forduljon hozzánk, segítünk amiben tudunk.</p>
				<a className="text-right link-inverse" href={`mailto:info@tersus.hu?subject=weboldalról`}>
					<div className="uppercase">Email &#10230;</div>
				</a>
			</div>
		</div>
	);
};

export default GetInTouch;
