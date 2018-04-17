/**
  * 1. Firebase configuration
  * 2. News and Events form data processing
  * 3. Inserting news and events into database
  * 4. Fetching news and events data from database
  * 5. Displaying news and events in admin page
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
  	document.getElementById('addNewMemberForm').addEventListener('submit', addNewMember);
	function addNewMember(e) {

		e.preventDefault();

		var fullName = $("#fullName").val();
		var designation = $("#designation").val();
		var qualification = $("#qualification").val();
		var university = $("#university").val();
		var memberContent = $("#memberContent").val();		
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

		var storageRef = firebase.storage().ref("client-02/app-management/" + imageName);
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
		  		console.log(currentTime);

		  		insertNewMember(fullName, designation, qualification, university, memberContent, downloadURL, currentTime);
		});
	}

//3. Inserting create news and events form data into firebase database
	function insertNewMember(fullName, designation, qualification, university, memberContent, downloadURL, time) {

		var newMemberRef = firebase.database().ref("clients/client-02/app_management/members");

		newMemberRef.child(time).set({
			full_name: fullName,
			designation: designation,
			qualification: qualification,
			university: university,
			member_content: memberContent,
			image_url: downloadURL
		});
	}	

//4. Fetching news and events data from firebase database
	var memberRootRef = firebase.database().ref().child("clients/client-02/app_management/members");
	memberRootRef.on("child_added", data => {
		
		var fullName = data.child("full_name").val();
		var designation = data.child("designation").val();
		var qualification = data.child("qualification").val();
		var university = data.child("university").val();
		var memberContent = data.child("member_content").val();
		var downloadURL = data.child("image_url").val();
		//var time = data.child("image_url").val();

		// alert(data.val());
		// console.log(fullName + " ," + placeName + " ," + newsHeading + " ," + newsContent + " ," + downloadURL);	

		displayMembers(fullName, designation, qualification, university, memberContent, downloadURL);
	});

//5. Displaying news and events in admin page
	function displayMembers(fullName, designation, qualification, university, memberContent, downloadURL) {
		
		var appendThis =
			'<div class="column size-1of4">'
				+ '<div class="card-grid-col">'
					+ '<article class="card-typical">'
						+ '<div class="card-typical-section">'
							+ '<div class="user-card-row">'
								+ '<div class="tbl-row">'								
									+ '<div class="tbl-cell">'
										+ '<p class="user-card-row-name"><a href="#"> '+ fullName +' </a></p>'
										+ '<p class="color-blue-grey-lighter"> '+ qualification +' , '+ university +' </p>'
									+ '</div>'
								+ '</div>'
							+ '</div>'
						+ '</div>'
						+ '<div class="card-typical-section card-typical-content">'
							+ '<div class="photo">'
								+ '<img src=" '+ downloadURL +' " alt="">'
							+ '</div>'
							+ '<p> '+ memberContent +' </p>'
						+ '</div>'
						+ '<div class="card-typical-section">'
							+ '<div class="card-typical-linked"> '+ designation +' </div>'
						+ '</div>'
					+ '</article>'
				+ '</div>'
			+ '</div> '
			;

		$("#membersDiv").append(appendThis);

	}
