(function($) {
	Drupal.behaviors.JCEcomBookNow = {
		attach: function (context, settings) {

			var defaultCountry = Drupal.settings.defaultCountry;
			var jcFormID =  $('input[name="jc_form_id"]').val();
			var baseUrl = Drupal.settings.baseUrl;
			var imageUrl = Drupal.settings.imageUrl;
			var data; //data sends to get centre list
			var centreUrl = 'https://app-abm.marketo.com/index.php/form/getForm';
			var localCentreURL = '/statics/marketo/centres.json'
			var bcStateRegion;
			var rcStateRegion;
			var selectedBCCentre = $('input[name="jc_bc_centre"]').val();
			var selectedRCCentre = $('input[name="jc_rc_centre"]').val();
			var navigation = ($('#bn-navigation').length > 0) ? true : false;
			var steps;
			var formSubmit = false;
			var allowedFormIDs = ['1579', '1626', '2257', '2258'];
			var thankYouURL = 'https://pages.jennycraig.com.au/thank-you-for-booking.html';
			var navSteps = (navigation) ? ['2', '3', '4'] : steps = ['1', '2', '3'];

			/**
			* Marketo variables
			**/
			var mktoBCFormID = '2257';
			var mktoRCFormID = '1579';

			if (defaultCountry == 'NZ') {
				mktoBCFormID = '2258';
				mktoRCFormID = '1626';
			}

			var munchkinId = '139-RET-710';
			var formID = mktoBCFormID;

			/**
			* Separate Nav Images for desktop and mobile
			*/
			var navImages = ['book-now-nav-1.svg', 'book-now-nav-11.svg', 'book-now-nav-2.svg', 'book-now-nav-22.svg'];

			if($(window).width() <= 767) {
				navImages = ['book-now-nav-mob-1.svg', 'book-now-nav-mob-11.svg', 'book-now-nav-mob-2.svg', 'book-now-nav-mob-22.svg'];
      }
			//Set width of Nav Images
			//We need to stretch images to full width
			//Since svg won't get pixelated
			var navWidth = $('div.bn-form-step-title').width();
			$('.bn-nav-items img').css('width', navWidth/2);

			/**
			* For the A-B tests, we may need parse the URL to get form id
			* So Dual form
			*/
			var currentURL = window.location.href;

			var formIDFromURL;
			if (currentURL.indexOf('?form_id=') >= 0) {
				var formIDFromURL = currentURL.split('?')[1].split('=')[1];
				if (formIDFromURL) {
					switch (formIDFromURL) {
						case '2257':
							jcFormID = 'jc_ecom_book_now_form_bc1';
							break;
						case '2258':
							jcFormID = 'jc_ecom_book_now_form_bc1';
							break;
						case '1579':
							jcFormID = 'jc_ecom_book_now_form_rc1';
							break;
						case '1626':
							jcFormID = 'jc_ecom_book_now_form_rc1';
							break;
						case 'mk_form_a':
							jcFormID = 'jc_ecom_book_now_form_bc1';
							break;
						case 'mk_form_b':
							jcFormID = 'jc_ecom_book_now_form_rc1';
							break;
					}
				}
			}

			// Since no Region/State fo NZ, centres must load by default
			loadCentres(centreUrl, munchkinId, formID);

			//Hide Stage/Region if country is not Australia
			if (defaultCountry != 'AU'){
				$('.bn-state-region').hide();
			}

			//Navigation on load
			if(!jcFormID) {
				formID = mktoBCFormID;
				showFormBookConsultant(navImages);
				$('input[name="jc_form_id"]').val('jc_ecom_book_now_form_bc1');
				$('form.jc-ecom-form').prop('id', 'jc-book-now-form-bc1');
				initializeFormSteps();
			}

			//`
			if (jcFormID == 'jc_ecom_book_now_form_bc1') {
				formID = mktoBCFormID;
				showFormBookConsultant(navImages);
				$('form.jc-ecom-form').prop('id', 'jc-ecom-book-now-form-bc1');
				$('form.jc-ecom-form').prop('name', 'mktoForm_'+mktoBCFormID);
				initializeFormSteps();
				if (navigation) {
					$('img#bn-form-step-1').attr('src',imageUrl+"green_tick.png");
				}
			}
			if (jcFormID == 'jc_ecom_book_now_form_rc1') {
				formID = mktoRCFormID;
				showFormRequestACall(navImages);
				$('form.jc-ecom-form').prop('id', 'jc-ecom-book-now-form-rc1');
				$('form.jc-ecom-form').prop('name', 'mktoForm_'+mktoRCFormID);
				initializeFormSteps('rc');
				if (navigation) {
					$('img#bn-form-step-1').attr('src',imageUrl+"green_tick.png");
				}

			}
			// Handle navigation on Click
			$('div#bn-nav1').click(function() {
				formID = mktoBCFormID;
				showFormBookConsultant(navImages);
				$('input[name="jc_form_id"]').val('jc_ecom_book_now_form_bc1');
				$('form.jc-ecom-form').prop('name', 'mktoForm_'+mktoBCFormID);
				initializeFormSteps();
				loadCentres(centreUrl, munchkinId, formID);
				$('img#bn-form-step-1').attr('src',imageUrl+"green_tick.png");
				adjustFormSteps(navSteps, formID);
				handleDateTimeInput(navigation);
				checkFormExistence_nTrackFocus_nTrackSubmit();
				if (!selectedBCCentre) {
					loadCentres(centreUrl, munchkinId, formID);
				}
			});
			$('div#bn-nav2').click(function() {
				formID = mktoRCFormID;
				showFormRequestACall(navImages);
				$('form.jc-ecom-form').prop('id', 'jc-ecom-book-now-form-rc1');
				$('form.jc-ecom-form').prop('name', 'mktoForm_'+mktoRCFormID);
				initializeFormSteps('rc');
				if (!selectedRCCentre) {
					loadCentres(centreUrl, munchkinId, formID);
				}
				adjustFormSteps(navSteps, formID);
				handleDateTimeInput(navigation);
				checkFormExistence_nTrackFocus_nTrackSubmit();
			});

	    //Form actions
	    // 1. State/Region
	    // BC Form

			$('#edit-bc-state-region').change(function() {
				$('#edit-bc-centre').empty(); //clear existing entries
				bcStateRegion = $(this).val();
				if (bcStateRegion) {
					data = {'state_region' : bcStateRegion};
					getStateRegionalCentres(data, centreUrl, 'edit-bc-centre', munchkinId, formID);
					$('#edit-bc-centre').focus();
				}
			});
			// RC form

			$('#edit-rc-state-region').change(function() {
				$('#edit-rc-centre').empty();
				rcStateRegion = $(this).val();
				data = {'state_region' : rcStateRegion };
				getStateRegionalCentres(data, centreUrl, 'edit-rc-centre', munchkinId, formID);
				$('#edit-rc-centre').focus();
			});

			// Centre (need to load the selected centre as Drupal form does not handle this)
			if (selectedBCCentre && jcFormID == 'jc_book_now_form_bc1') {
				$('#edit-bc-centre').val(selectedBCCentre);
			}
			if (selectedRCCentre && jcFormID == 'jc_book_now_form_rc1') {
				$('#edit-rc-centre').val(selectedRCCentre);
			}
			//Save the centre on the  input
			$('#edit-bc-centre').on('change', function() {
				$('input[name="jc_bc_centre"]').val($(this).val());
			});
			$('#edit-rc-centre').on('change', function() {
				$('input[name="jc_rc_centre"]').val($(this).val());
			});

			// 2. Date & Time
	    //Load calendar
	    $("#datepicker-custom").datepicker({
	      dateFormat: 'dd/mm/yy - DD', // Date format
	      navigationAsDateFormat: true,
	      minDate: 0,
	      nextText: '',
	      prevText: '',
	      onSelect: function(dt, obj) {
	        $('#edit-bc-date').empty();
	        $('#edit-bc-date').val($(this).val());
	        $('#datepicker-custom').hide();

	      }
	    });

	    // Show/Hide Calendar
	    $('#edit-bc-date').click(function() {
				handleDateTimeInput(navigation);
	    	$('#datepicker-custom').toggle();
	    })
			$('#edit-bc-date').blur(function() {
				//$('#datepicker-custom').hide();
			});

	    //Time slots onLoad
	    var bcDateTimeId = $('input[name="jc_book_time"]').val();
	    if (bcDateTimeId) {
				$('td#'+bcDateTimeId).removeClass('bc-time-selected');
				$('td#'+bcDateTimeId).addClass('bc-time-selected');
			}

	    //Time slots on Click
			$('.bc-date-time').click(function() {
	     	var bcDateTime = $(this).attr('id');
	     	$('input[name="jc_book_time"]').val(bcDateTime);
	     	$('#edit-bc-time').val(bcDateTime);
	      $('.bc-date-time').each(function() {
					$(this).removeClass('bc-time-selected');
	      });
	      $(this).addClass('bc-time-selected');
				 validate('edit-bc-date');
	    });

			$('#no-centre-image').hide();
			$('#edit-bc-centre, #edit-rc-centre').change(function() {
				if ($(this).val() == "na") {
					$('#no-centre-image').show();
				}
				else {
					$('#no-centre-image').hide();
				}
			});


			/**
			* Update Nav Steps Images
			*/
			$('form.jc-ecom-form input, form.jc-ecom-form select').on('change', function() {
				validate($(this).attr('id'));
				adjustFormSteps(navSteps, formID);
			});

			//Time input
			$('td.bc-date-time').on('click', function() {
				$(this).parent().css('border', '1px solid #999');
				handleDateTimeInput(navigation);
			});

			/**
			* Marketo
			* Hide Mketo Forms (added by todens)
			* Forms IDs: mktoBCFormID, mktoRCFormID will set by the language (country)
			**/

			$('div#mk-form-wrapper').hide();

			$('button#edit-bc-submit, button#edit-rc-submit').click(function(e) {
				e.preventDefault();

				var fieldPrefix = '';
				var requiredInputs = new Array();
				var targetID = e.target.id;

				switch(targetID) {
					case 'edit-bc-submit':
						fieldPrefix = 'bc';
					break;
					case 'edit-rc-submit':
						fieldPrefix = 'rc';
						thankYouURL = 'https://www.jennycraig.com.au/start-today/thank-you';
					break;
				}
				if (targetID == 'edit-bc-submit') {
					if(defaultCountry == 'AU') {
						requiredInputs.push('edit-'+fieldPrefix+'-state-region');
					}
					requiredInputs.push('edit-'+fieldPrefix+'-centre');
				}

				if (targetID == 'edit-bc-submit') {
					requiredInputs.push('edit-'+fieldPrefix+'-date');
					requiredInputs.push('edit-'+fieldPrefix+'-time');
				}
				requiredInputs.push('edit-'+fieldPrefix+'-first-name');
				requiredInputs.push('edit-'+fieldPrefix+'-last-name');
				requiredInputs.push('edit-'+fieldPrefix+'-email');
				requiredInputs.push('edit-'+fieldPrefix+'-contact-number');
				if (targetID == 'edit-rc-submit') {
					if(defaultCountry == 'AU') {
						requiredInputs.push('edit-'+fieldPrefix+'-state-region');
					}
					requiredInputs.push('edit-'+fieldPrefix+'-centre');
				}
				requiredInputs.push('edit-'+fieldPrefix+'-being-to-jc');
				//requiredInputs.push('dummy');
				var validForm = true;
				$.each(requiredInputs, function(i,v) {
						validForm = validForm && validate(v);
				});
				// Here we processed the Marketo
				if (validForm) {
					var mktoFields = {};
					var fname = $('#edit-'+fieldPrefix+'-first-name').val();
					var lname = $('#edit-'+fieldPrefix+'-last-name').val();
					var email = $('#edit-'+fieldPrefix+'-email').val();
					var phone = $('#edit-'+fieldPrefix+'-contact-number').val();
					var state = $('#edit-'+fieldPrefix+'-state-region').val();
					var centre = $('input[name="jc_'+fieldPrefix+'_centre"]').val();

					var beingToJC = $('#edit-'+fieldPrefix+'-being-to-jc').val();
					var homeDelivery = $('#edit-'+fieldPrefix+'-home-delivery').val();

					var subscribe = $('#edit-'+fieldPrefix+'-subscribe').val();
					subscribe = (subscribe) ? 'yes' : 'no';

					var country = $('input[name="Country"]').val();
					$('select#chosenCentreEmail').val(centre);

		      mktoFields['FirstName'] = fname;
		      mktoFields['LastName'] = lname;
		      mktoFields['Email'] = email;
		      mktoFields['MobilePhone'] = phone;
		      mktoFields['State'] = state;
		      mktoFields['chosenCentreEmail'] = centre;

					if (targetID == 'edit-bc-submit') {
						var appDate = $('#edit-'+fieldPrefix+'-date').val();
						var appTime = $('input[name="jc_book_time"]').val();
						var mkDate = appDate.substring(0,10).split('/');
			      mktoFields['apptDate'] = mkDate[2]+'-'+mkDate[1]+'-'+mkDate[0];
			      mktoFields['apptTime'] = appTime;
					}
					beingToJC = (beingToJC=='Y') ? beingToJC : 'N';
		      mktoFields['sSLastVisited'] = beingToJC;
					homeDelivery = (homeDelivery) ? homeDelivery : 'no';
		      mktoFields['interestedInJCAH'] = homeDelivery;
		      mktoFields['Spare14Char'] = subscribe;
					//Add common and hidden fields to array
					mktoFields = addMarketoFields(mktoFields, formID, country, mktoBCFormID, mktoRCFormID);
					//Check if Marketo is available to submit via Marketo API
					//country is the only value read from Marketo form
					//We assume if it is set, then the Marketo form is loaded
					if (country) {
						mktoForm = MktoForms2.getForm(formID);
						mktoForm.addHiddenFields(mktoFields);
						if (!formSubmit) {
		    			var mktSubmit = mktoForm.submit();
							formSubmit = true;
						}
					}
					else {
						//Post to Google Spreadsheet
						//Set the Country
						mktoFields['Country'] = defaultCountry;
						$.ajax( {
							data : mktoFields,
							dataType: "json",
							async: false,
							type: "POST",
							url : '/ecom/googleSpreadsheet',
							success : function (returnData) {
								// Redirect to thank you page.
								window.location.href = thankYouURL;
							},
							error: function(error){
								//Keep following for testing
								console.log("Something went wrong");
								console.log(error);
							}

						});
					}

				}
			});

		}

	};

	/**
	*
	*/
	function adjustFormSteps(navSteps, formID) {

		var defaultCountry = Drupal.settings.defaultCountry;
		var baseUrl = Drupal.settings.baseUrl;
		var imageUrl = Drupal.settings.imageUrl;
		var mktoBCFormID = '2257';
		var mktoRCFormID = '1579';

		if (defaultCountry == 'NZ') {
			mktoBCFormID = '2258';
			mktoRCFormID = '1626';
		}

		var bcPersonalFields = ['edit-bc-first-name', 'edit-bc-last-name', 'edit-bc-email', 'edit-bc-contact-number', 'edit-bc-being-to-jc'];
		var rcPersonalFields = ['edit-rc-first-name', 'edit-rc-last-name', 'edit-rc-email', 'edit-rc-contact-number', 'edit-rc-being-to-jc'];

		if (formID == mktoBCFormID) {
			if( ( defaultCountry == 'AU' &&
					$('#edit-bc-state-region').val() &&
					$('#edit-bc-centre').val()) ||
					( defaultCountry == 'NZ' && $('#edit-bc-centre').val())
				) {
				$('img#bn-form-step-'+navSteps[0]).attr('src', imageUrl+'green_tick.png');
				if ($('img#bn-form-step-'+navSteps[1]).attr('src').indexOf('inactive') >= 0 ) {
					$('img#bn-form-step-'+navSteps[1]).attr('src', imageUrl+navSteps[1]+'_active.png');
				}

			}
			else if( ( defaultCountry == 'AU' &&
					( $('#edit-bc-state-region').val() || $('#edit-bc-centre').val() ) ) ||
					( defaultCountry == 'NZ' ) ) {
						$('img#bn-form-step-'+navSteps[0]).attr('src', imageUrl+navSteps[0]+'_active.png');

			}
			else {
				$('img#bn-form-step-'+navSteps[0]).attr('src', imageUrl+navSteps[0]+'_active.png');
			}

			if( $('#edit-bc-first-name').val() &&
					$('#edit-bc-last-name').val() &&
					$('#edit-bc-email').val() &&
					$('#edit-bc-contact-number').val()
					&&  $('#edit-bc-being-to-jc').val()
				) {
					var bcPersonalDeatilsTrue = true;
					$.each(bcPersonalFields, function(i,v) {
						bcPersonalDeatilsTrue = bcPersonalDeatilsTrue && validate(v, bcPersonalFields);
					});

					if (bcPersonalDeatilsTrue) {
						$('img#bn-form-step-'+navSteps[2]).attr('src', imageUrl+'green_tick.png');
					}
					else {
						$('img#bn-form-step-'+navSteps[2]).attr('src', imageUrl+navSteps[2]+'_active.png');
					}
			}
			else if ($('#edit-bc-first-name').val() || $('#edit-bc-last-name').val() || $('#edit-bc-email').val() ||
				$('#edit-bc-contact-number').val() || $('#edit-bc-being-to-jc').val()
			) {
				$('img#bn-form-step-'+navSteps[2]).attr('src', imageUrl+navSteps[2]+'_active.png');
			}
			else {
				$('img#bn-form-step-'+navSteps[2]).attr('src', imageUrl+navSteps[2]+'_inactive.png');
			}
		}

		if (formID == mktoRCFormID) {
			if( $('#edit-rc-first-name').val() &&
					$('#edit-rc-last-name').val() &&
					$('#edit-rc-email').val() &&
					$('#edit-rc-contact-number').val() &&
					$('#edit-rc-being-to-jc').val() &&
					((defaultCountry == 'AU' && $('#edit-rc-state-region').val() && $('#edit-rc-centre').val()) ||
						( defaultCountry == 'NZ' && $('#edit-rc-centre').val()))
			) {
				var rcPersonalDeatilsTrue = true;
				if (defaultCountry == 'AU') {
					rcPersonalFields.push('edit-rc-state-region');
				}
				rcPersonalFields.push('edit-rc-centre');
				$.each(rcPersonalFields, function(i,v) {
					rcPersonalDeatilsTrue = rcPersonalDeatilsTrue && validate(v, rcPersonalFields);
				});

				if (rcPersonalDeatilsTrue) {
					$('img#bn-form-step-'+navSteps[0]).attr('src', imageUrl+'green_tick.png');
				}
				else {
					$('img#bn-form-step-'+navSteps[0]).attr('src', imageUrl+navSteps[0]+'_active.png');
				}

			}

			else if ( $('#edit-rc-first-name').val() || $('#edit-rc-last-name').val() || $('#edit-rc-email').val() ||
				$('#edit-rc-contact-number').val() || $('#edit-rc-being-to-jc').val() ||  $('#edit-rc-state-region') || $('#edit-rc-centre').val()
			) {
				$('img#bn-form-step-'+navSteps[0]).attr('src', imageUrl+navSteps[0]+'_active.png');
			}
			else {
				$('img#bn-form-step-'+navSteps[0]).attr('src', imageUrl+navSteps[0]+'_inactive.png');
			}

		}
	}
	/**
	*
	*/
	function handleDateTimeInput (navigation) {
		var navSteps = (navigation) ? ['2', '3', '4'] : steps = ['1', '2', '3'];
		var imageUrl = Drupal.settings.imageUrl;

		if( $('#edit-bc-date').val() && $('input[name="jc_book_time"]').val()){
			$('img#bn-form-step-'+navSteps[1]).attr('src', imageUrl+'green_tick.png');
		}
		else if( $('#edit-bc-date').val() || $('input[name="jc_book_time"]').val()){
			$('img#bn-form-step-'+navSteps[1]).attr('src', imageUrl+navSteps[1]+'_active.png');
		}
		else {
			//$('img#bn-form-step-'+navSteps[1]).attr('src', imageUrl+navSteps[1]+'_active.png');
		}
	}

	/**
	*
	*/
	function validate(id, fields=null) {

		var requiredInputs = new Array();
		var defaultCountry = Drupal.settings.defaultCountry;
		var jcFormID =  $('input[name="jc_form_id"]').val();

		if(jcFormID == 'jc_ecom_book_now_form_bc1') {
			if (defaultCountry == 'AU') {
				requiredInputs.push('edit-bc-state-region');
			}
			requiredInputs.push('edit-bc-centre');
			requiredInputs.push('edit-bc-date');
			requiredInputs.push('edit-bc-time');
			requiredInputs.push('edit-bc-first-name');
			requiredInputs.push('edit-bc-last-name');
			requiredInputs.push('edit-bc-email');
			requiredInputs.push('edit-bc-contact-number');
			requiredInputs.push('edit-bc-being-to-jc');

		}
		if(jcFormID == 'jc_ecom_book_now_form_rc1') {
			requiredInputs.push('edit-rc-first-name');
			requiredInputs.push('edit-rc-last-name');
			requiredInputs.push('edit-rc-email');
			requiredInputs.push('edit-rc-contact-number');
			if (defaultCountry == 'AU') {
				requiredInputs.push('edit-rc-state-region');
			}
			requiredInputs.push('edit-rc-centre');
			requiredInputs.push('edit-rc-being-to-jc');
		}

		//Add a dummy element to make one more iteration to capture last required
		requiredInputs.push('dummy');

		//If list of fields supplied
		if (fields) {
			requiredInputs = fields;
		}

		var inputValue = $('#'+id).val();
		if(!inputValue) {
			$('#'+id).css('border', '#ff0000 1px solid');
			//$('#'+id).attr('placeholder','Required');
		}

		var done = false; // This is set to true, once iterate through to the current element

		var formValid = true;
		$.each(requiredInputs, function(i,v) {
			if (!done) {
				var input = $('#'+v).val();
				var element = $('#'+v);
				var thisValid = true; //Current element is valid or not
				if (!input) {
					thisValid = false;
				}

				if (v.indexOf('time') > -1 ) {
					var bcTime = $('input[name="jc_book_time"]').val();
					if (!bcTime) {
						thisValid = false;
						$('tr#tr-bc-time').css('border', 'none').css('border', '2px solid red');
					}

				}
				if (v.indexOf('email') > -1 ) {
					var regexEmail = /\S+@\S+\.\S+/;
					(element).parent().find('.bc-inline-error').remove();
					if (!regexEmail.test(input)) {
						thisValid = false;
						(element).parent().append('<div class="bc-inline-error">Invalid email address</div>');
					}
				}
				if (v.indexOf('contact') > -1 ) {
					input = input.replace(/ /g, '');
					(element).parent().find('.bc-inline-error').remove();
					var regexPhone = /^(?:\+?[61|64])?\d{8,12}$/;
					if (!regexPhone.test(input)) {
						thisValid = false;
						(element).parent().append('<div class="bc-inline-error">Invalid contact number</div>');
					}
				}
				if (v.indexOf('being-to-jc') > -1 ) {
					if (input) {
							thisValid = true;
					}
				}
				if (v.indexOf('dummy') > -1 ) {
					thisValid = true;
				}

				if(thisValid === true) {
					$('#'+v).css('border', '');
				}
				if(thisValid === false) {
					$('#'+v).css('border', '');
					$('#'+v).css('border', '1px solid #ff0000');
				}

				formValid = formValid && thisValid;
			}

			if((v == id)) {
				done = true;
			}
			//Stop the loop at the current element
			//This is to prevent showing required error messages from yet to fill inputs
			//But if this is the last required element, then it has to be treated separately
		});

		return formValid;

	}

	/**
	*
	*/
	function showFormBookConsultant(navImages) {
		var imageUrl = Drupal.settings.imageUrl;
		var navigation = ($('#bn-navigation').length > 0) ? true : false;
		if (navigation) {
			step1 = 'img#bn-form-step-2';
			step2 = 'img#bn-form-step-3';
			step3 = 'img#bn-form-step-4';
			stepImage1 = '2_active.png';
			stepImage2 = '3_inactive.png';
			stepImage3 = '4_inactive.png';
			$('img#bn-form-step-1').attr('src', imageUrl+"green_tick.png");
		}
		else {
			step1 = 'img#bn-form-step-1';
			step2 = 'img#bn-form-step-2';
			step3 = 'img#bn-form-step-3';
			stepImage1 = '1_active.png';
			stepImage2 = '2_inactive.png';
			stepImage3 = '3_inactive.png';
		}

		$('#no-centre-image').hide();

		$('div#bn-nav1').children().attr('src',imageUrl+navImages[1]);
		$('div#bn-nav2').children().attr('src',imageUrl+navImages[2]);
		$(step1).attr('src', imageUrl+stepImage1);
		$(step2).attr('src', imageUrl+stepImage2);
		$(step3).attr('src', imageUrl+stepImage3);
		$('#rc-form-container').hide();
		$('#bc-form-container').show();
		$('input[name="jc_form_id"]').val('jc_ecom_book_now_form_bc1');
	}

	/**
	*
	*/
	function showFormRequestACall(navImages) {

		var imageUrl = Drupal.settings.imageUrl;
		$('#no-centre-image').hide();
		$('img#bn-form-step-1').attr('src', imageUrl+"green_tick.png");
		$('img#bn-form-step-2').attr('src', imageUrl+"2_active.png");
		$('div#bn-nav2').children().attr('src', imageUrl+navImages[3]);
		$('div#bn-nav1').children().attr('src', imageUrl+navImages[0]);
		//$('div#bn-nav2').click();
		$('#bc-form-container').hide();
		$('#rc-form-container').show();
		$('input[name="jc_form_id"]').val('jc_ecom_book_now_form_rc1');

	}

	/**
	*
	*/
	function getStateRegionalCentres(data, url, elementId,  munchkinId, formID) {
		//If NZ set state_region to NZ
		if (Drupal.settings.defaultCountry == 'NZ') {
			data = {'state_region' : 'NZ'}
		}

		$.ajax({
    	type: "POST",
    	dataType: "json",
    	async: false,
    	url: url+'?munchkinId='+munchkinId+'&form='+formID,
    	success: function(mktoData){
				populateCentres(mktoData, data, elementId, formID);
    	},
    	error: function(e){
				console.log("Unable to download Centre Data from Marketo!!");
				$.getJSON('/statics/marketo/centres.json', function(json) {
					populateCentres(json, data, elementId);
				});
    	}
		});
	}

	/**
	*
	*/
	function populateCentres(centresObj, data, elementId, formID) {
		var states = ["ACT", "NSW", "QLD", "SA", "NT", "TAS", "VIC", "WA", "New Zealand", "NZ"];
		var centres = centresObj.rows[6][0].VisibilityRule.rules;
		var state = data.state_region;
		var formType = getFormTypeById(formID);
		var currentCentre = $('input[name="jc_'+formType+'_centre"]').val();
		if (state) {
			var index = states.indexOf(state);
			var centreList = centres[index];
			$('#'+elementId).empty();
			$.each(centreList.picklistFilterValues, function(i, d) {
				if (d.label != "Home Delivery") {
					$('#'+elementId).append('<option value="' + d.value + '">' + d.label + '</option>');
				}
			});
		}
		if (currentCentre) {
			$('#'+elementId).val(currentCentre);
		}
	}

	/*
	*
	*/
	function getFormTypeById(formID) {
		var formType = '';
		switch(formID) {
			case '2257':
				formType = 'bc';
				break;
			case '2258':
				formType = 'bc';
				break;
			case '1579':
				formType = 'rc';
				break;
			case '1626':
				formType = 'rc';
				break;
		}
		return formType;

	}
	/**
	*
	*/
	function loadCentres(centreUrl, munchkinId, formID) {

		var bcStateRegion = $('#edit-bc-state-region').val();
		var rcStateRegion = $('#edit-rc-state-region').val();
		var data;

		bcStateRegion = (bcStateRegion) ? bcStateRegion : '';
		data = {'state_region' : bcStateRegion};
		getStateRegionalCentres(data, centreUrl, 'edit-bc-centre',  munchkinId, formID);

		rcStateRegion = (rcStateRegion) ? rcStateRegion : '';
		data = {'state_region' : rcStateRegion};
		getStateRegionalCentres(data, centreUrl, 'edit-rc-centre',  munchkinId, formID);

	}

	/**
	*
	*/
	function initializeFormSteps(formType='bc') {

		var imageUrl = Drupal.settings.imageUrl;
		var navigation = ($('div#bn-navigation').length > 0) ? true : false;

		//Check values in fields
		var region = $('#edit-bc-state-region').val();
		var centre = $('input[name="jc_'+formType+'_centre"]').val();
		var date = $('#edit-bc-date').val();
		var time = $('input[name="jc_book_time"]').val();

		var step1;
		var step2;
		var step3;

		var stepImage1;
		var stepImage2;
		var stepImage3;
		var stepImage4;

		if (navigation) {
			step1 = 'img#bn-form-step-2';
			step2 = 'img#bn-form-step-3';
			step3 = 'img#bn-form-step-4';
			stepImage1 = '2_active.png';
			stepImage2 = '3_inactive.png';
			stepImage3 = '4_inactive.png';
		}
		else {
			step1 = 'img#bn-form-step-1';
			step2 = 'img#bn-form-step-2';
			step3 = 'img#bn-form-step-3';
			stepImage1 = '1_active.png';
			stepImage2 = '2_inactive.png';
			stepImage3 = '3_inactive.png';
		}

		if (centre) {
			$('#edit-'+formType+'-centre').val(centre);
		}

	}

	/**
	* Add optional/common/hidden Marketo fields to form
	**/
	function addMarketoFields(mktoFields, formId, country, mktoBCFormID, mktoRCFormID) {

		var drupalID = document.cookie.replace(/(?:(?:^|.*;\s*)DrupalID\s*\=\s*([^;]*).*$)|^.*$/, "$1");

		mktoFields['Country'] = country;
		mktoFields['drupalID'] = drupalID;
		mktoFields['formid'] = formId;

		switch(formId) {
			case mktoBCFormID:
				mktoFields['LeadSource'] = 'Appointment';
				mktoFields['munchkinId'] = '139-RET-710';
				break;
			case mktoRCFormID :
			  mktoFields['LeadSource'] = 'Call Back';
				mktoFields['munchkinId'] = '139-RET-710';
				break;
		}

		mktoFields['nZPhone'] = '';
		mktoFields['utmCampaign'] = '';
		mktoFields['utmSource'] = '';
		mktoFields['utmMedium'] = '';
		mktoFields['utmTerm'] = '';
		mktoFields['utmContent'] = '';
		mktoFields['utmDevice'] = '';
		mktoFields['utmCreative'] = '';
		mktoFields['utmMatchtype'] = '';
		mktoFields['utmPosition'] = '';
		mktoFields['utmDeviceModel'] = '';
		mktoFields['optedinLeadnurtureemails'] = 'Y';
		mktoFields['optedinNewsletteremail'] = 'Y';
		mktoFields['optedinOfferonlyemail'] = 'Y';
		mktoFields['optedinWeightlossInfoemail'] = 'Y';

		return mktoFields;

	}

})(jQuery);
