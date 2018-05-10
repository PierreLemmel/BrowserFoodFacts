const openfoodfacts = (function() {

	const getGrade = function(ean13, success, error) {

		const url = 'https://ssl-api.openfoodfacts.org/api/v0/product/' + ean13 + '.json';

		const _successCallback = function(data, status, jqXhr) {

			if (data.status === 1) {
				const product = data.product;
				const grade = product.nutrition_grade_fr;

				if (typeof(grade) !== 'undefined') {
					success(grade);
				}
				else {
					success('Unknown');
				}
			}
			else {
				error(data.status_verbose);
			}
			
		};

		const _errorCallback = function() {
			error('Ajax error');
		};

		$.ajax({
			url: url,
			async: true,
			success: _successCallback,
			error: _errorCallback
		});
	};

	const _getImageFromGrade = function(grade) {
		return chrome.extension.getURL('shared/img/nutriscore-' + grade + '.svg');
	};

	const getImage = function(grade) {
		let image = null;

		switch (grade) {
			case 'a':
				image = _getImageFromGrade('a');
				break;
			case 'b':
				image = _getImageFromGrade('b');
				break;
			case 'c':
				image = _getImageFromGrade('c');
				break;
			case 'd':
				image = _getImageFromGrade('d');
				break;
			case 'e':
				image = _getImageFromGrade('e');
				break;
		}

		return image;
	};

	const getProductURL = function(ean13) {
		return 'https://fr-en.openfoodfacts.org/product/' + ean13;
	};

	return {
		getGrade: getGrade,
		getImage:  getImage,
		getProductURL: getProductURL
	};

})();