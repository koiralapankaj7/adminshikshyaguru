/**
  * 1. Firebase configuration
  * 2. News and Events form data processing
  * 3. Inserting insert images form data into firebase database
  * 4. Fetching gallery data from firebase database and displaying theme
  * 5. Append category list
  * 6. Fetch category wise images 
  * 7. Displaying images categories wise
  * 8. Filter click listener events for data-group
  * 9. Image popup listener for images
**/

//1. Firebase configuration file
 	var config = {
    	apiKey: "AIzaSyDgJTKGsbxCeMumPX_IXi4N1mulK1j0VSo",
    	authDomain: "shikshyaguru-182814.firebaseapp.com",
    	databaseURL: "https://shikshyaguru-182814.firebaseio.com",
    	projectId: "shikshyaguru-182814",
    	storageBucket: "shikshyaguru-182814.appspot.com",
    	messagingSenderId: "697329831707"
  	};
  	firebase.initializeApp(config);

//2. processing create news and events form data
  	document.getElementById('createGalleryForm').addEventListener('submit', addGallery);
	function addGallery(e) {

		e.preventDefault();

		var categoryName = $("#categoryName").val().toLowerCase();
		var imageDescription = $("#imageDescription").val();
		var imageURL = $("#download").attr("href");
		// var currentTime = new Date($.now());
		var currentdate = new Date(); 
    	var currentTime = currentdate.getDate() + ":"
        	+ (currentdate.getMonth())  + ":" 
            + currentdate.getFullYear() + ":"  
            + currentdate.getHours() + ":"  
            + currentdate.getMinutes() + ":" 
            + currentdate.getSeconds();

		var imageName = $("#download").attr("download");

		var storageRef = firebase.storage().ref("client-02/app-gallery/" + imageName);
		var uploadTask = storageRef.putString(imageURL, 'data_url');
		// Register three observers:
		// 1. 'state_changed' observer, called any time the state changes
		// 2. Error observer, called on failure
		// 3. Completion observer, called on successful completion
		uploadTask.on('state_changed', function(snapshot){
		  	// Observe state change events such as progress, pause, and resume
		  	// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
		  	var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
		  	console.log('Upload is ' + progress + '% done');
		  	switch (snapshot.state) {
		    	case firebase.storage.TaskState.PAUSED: // or 'paused'
		      		console.log('Upload is paused');
		      		break;
		    	case firebase.storage.TaskState.RUNNING: // or 'running'
		      		console.log('Upload is running');
		      		break;
		  	}
			}, function(error) {
		  		// Handle unsuccessful uploads
		  		alert(error.message());
			}, function() {
		  		// Handle successful uploads on complete
		  		// For instance, get the download URL: https://firebasestorage.googleapis.com/...
		  		var downloadURL = uploadTask.snapshot.downloadURL;
		  		console.log(downloadURL);

		  		insertIntoGallery(categoryName, imageDescription, downloadURL, currentTime);
		});
	}

//3. Inserting insert images form data into firebase database
	function insertIntoGallery(categoryName, imageDescription, downloadURL, time) {

		var galleryRef = firebase.database().ref("clients/client-02/app_gallery/" + categoryName);

		galleryRef.child(time).set({
			image_url: downloadURL,
			image_description: imageDescription
		});
		callScript();
	}	

//4. Fetching gallery data from firebase database and displaying theme
	(function () {
		var galleryRootRef = firebase.database().ref().child("clients/client-02/app_gallery");

		galleryRootRef.once("value", function(snapshot) {

			snapshot.forEach(function(childSnapshot) { 
				var categoryName = childSnapshot.key;
				appendCategoryName(categoryName);
				fetchData(categoryName);				
			});

		});
	}());

//5. Append category list
	function appendCategoryName(categoryName) {
		
		// Making first letter of string uppercase
		var categoryHeading = categoryName.toLowerCase().replace(/\b[a-z]/g, function(letter) {
		    return letter.toUpperCase();
		});

		// Removing space inside string
		var categoryGroup = categoryName.replace(/\s/g, '')

		console.log(categoryGroup + " ," + categoryHeading);

		var imageCategory = '<li class="list-inline-item"><a data-group="'+ categoryGroup +'"> '+ categoryHeading +' </a></li>';

		$("#filter").append(imageCategory);

		filterScript();
	}

//6. Fetch category wise images 
	function fetchData(key) {
		
		var galleryRef = firebase.database().ref().child("clients/client-02/app_gallery/" + key);

		galleryRef.on("child_added", data => {
		
			var categoryName = key;
			var imageDescription = data.child("image_description").val();	
			var downloadURL = data.child("image_url").val();

			displayGallery(categoryName, imageDescription, downloadURL);

		});
	}

//7. Displaying images categories wise
	function displayGallery(categoryName, imageDescription, downloadURL) {

		// Removing space inside string
		var categoryGroup = categoryName.replace(/\s/g, '');

		var categoryImage = 
			'<div class="portfolio-item col-xs-12 col-sm-4 col-md-3" data-groups=["'+ categoryGroup +'","all"] style="min-height: 125px;"> '
              	+' <div class="portfolio-bg">'
                	+'<div class="portfolio">'
                  		+'<div class="tt-overlay"></div>'
                  		+'<div class="links">'
                    		+'<a class="image-link" href=" '+ downloadURL +' "><i class="fa fa-search-plus"></i></a>'
                    		+'<a href="#"><i class="fa fa-download"></i></a>'                          
                  		+'</div>'
                  		+'<img src=" '+ downloadURL +' " alt="image">'
                  		+'<div class="portfolio-info">'
                  	  		+'<p style="padding: 5px;"> '+ imageDescription +' </p>'
                  		+'</div>' 				            
                	+'</div>'
              	+'</div>'
            +'</div>'
            ;
		
	   	$("#grid").append(categoryImage);

	   	popupScript();
	}

//8. Filter click listener events for data-group
	function filterScript() {

		$('#filter a').click(function (e) {
	        e.preventDefault();

	        // set active class
	        $('#filter a').removeClass('active');
	        $(this).addClass('active');

	        // get group name from clicked item
	        var groupName = $(this).attr('data-group');

	        // reshuffle grid
	       $("#grid").shuffle('shuffle', groupName );
	    });		
	}

//9. Image popup listener for images
	function popupScript() {

		$('.image-link').magnificPopup({

		    gallery: {
		      enabled: true
		    },
		    removalDelay: 300, // Delay in milliseconds before popup is removed
		    mainClass: 'mfp-with-zoom', // this class is for CSS animation below
		    type:'image'
	 	 });		
	}