$(function() {
	let cdProducts = $('div.cd-Product');

	cdProducts.each(function() {
		const href = $(this).find('a.cd-ProductBVisualImgLink').attr('href');
		const ean13 = href.split("/")[1];
		
		let productContainer = $(this).find('.cd-ProductContainer');

		const successCallback = function(grade) {

			if (grade !== null) {

				const productHref = openfoodfacts.getProductURL(ean13);
				let ngContainer = $('<a/>', {
					href: productHref,
					target: '_blank'
				}).attr('class', 'nutrition-grade-container');
				
				const imgSrc = openfoodfacts.getImage(grade);
				let ngImage = $('<img/>', { src: imgSrc }).attr('class', 'nutrition-grade-image');

				ngContainer.append(ngImage);

				productContainer.prepend(ngContainer);
			}
		};

		const errorCallback = function(error) {
			console.log('Open Food Facts api: ' + ean13 + ' - ' + error);
		};

		openfoodfacts.getGrade(ean13, successCallback, errorCallback);
	});
});