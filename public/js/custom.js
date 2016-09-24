$(document).ready(function () {
    $('#search-profile').bootstrapValidator({
		feedbackIcons: {
			valid: 'glyphicon glyphicon-ok',
			invalid: 'glyphicon glyphicon-remove',
			validating: 'glyphicon glyphicon-refresh'
		},
		fields: {
			provider: {
				validators: {
					notEmpty: {
						message: 'Please select a provider.'
					}
				}
			},
			country: {
				validators: {
					notEmpty: {
						message: 'Please select a country.'
					}
				}
			},
			category: {
				validators: {
					notEmpty: {
						message: 'Please select a category.'
					}
				}
			},
			price: {
				validators: {
					notEmpty: {
						message: 'Please enter a price.'
					}
				}
			}
		}
	});

});