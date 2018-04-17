/**
  * 1. Firebase configuration
  * 2. News and Events form data processing
  * 3. Inserting news and events into database
  * 4. Fetching news and events data from database
  * 5. Displaying news and events in admin page
  * 6. processing create message to users form data
  * 7. Inserting create message to users form data into firebase database
  * 8. Fetching message to users data from firebase database
  * 9. Displaying message to users in admin page
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
  	document.getElementById('createNewsForm').addEventListener('submit', createNews);
	function createNews(e) {

		e.preventDefault();

		var fullName = $("#fullName").val();
		var placeName = $("#placeName").val();
		var newsHeading = $("#newsHeading").val();
		var newsContent = $("#newsContent").val();
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

		var storageRef = firebase.storage().ref("/inst1/" + imageName);
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

		  		insertNewsData(fullName, placeName, newsHeading, newsContent, downloadURL, currentTime);
		});
	}

//3. Inserting create news and events form data into firebase database
	function insertNewsData(fullName, placeName, newsHeading, newsContent, downloadURL, time) {

		var newsAndEventsRef = firebase.database().ref("clients/client-02/app_home/news_and_events");

		newsAndEventsRef.child(time).set({
			full_name: fullName,
			place_name: placeName,
			news_heading: newsHeading,
			news_content: newsContent,
			image_url: downloadURL
		});
	}	

//4. Fetching news and events data from firebase database
	var newsAndEventsRootRef = firebase.database().ref().child("clients/client-02/app_home/news_and_events");
	newsAndEventsRootRef.on("child_added", data => {
		
		var fullName = data.child("full_name").val();
		var placeName = data.child("place_name").val();
		var newsHeading = data.child("news_heading").val();
		var newsContent = data.child("news_content").val();
		var downloadURL = data.child("image_url").val();
		//var time = data.child("image_url").val();

		// alert(data.val());
		// console.log(fullName + " ," + placeName + " ," + newsHeading + " ," + newsContent + " ," + downloadURL);	

		displayNewsAndEvents(fullName, placeName, newsHeading, newsContent, downloadURL, "time");
	});

//5. Displaying news and events in admin page
	function displayNewsAndEvents(fullName, placeName, newsHeading, newsContent, downloadURL, time) {
		
		var storageRef = firebase.storage().ref("/inst1/");

		var appendThis = 
			'<div class="column size-1of4">'
				+ '<div class="card-grid-col"> ' 
					+ '<article class="card-typical"> '
						+ '<div class="card-typical-section"> '
							+ '<div class="user-card-row"> '
								+ '<div class="tbl-row"> '
									+ '<div class="tbl-cell tbl-cell-photo"> '
										+ '<a href="#"> '
											+ '<img src="../img/avatar-1-64.png" alt=""> '
										+ '</a> '
									+ '</div> '
									+ '<div class="tbl-cell"> '
										+ '<p class="user-card-row-name"><a href="#"> '+ fullName +' </a></p> '
										+ '<p class="color-blue-grey-lighter"> '+ time + " | " + placeName  +'</p> '
									+ '</div> '
								+ '</div> '
							+ '</div> '
						+ '</div> '
						+ '<div class="card-typical-section card-typical-content"> '
							+ '<div class="photo"> '
								+ '<img src=" '+ downloadURL +' " alt=""> '
							+ '</div> '
							+ '<header class="title"><a href="#"> '+ newsHeading +' </a></header> '
							+ '<p> '+ newsContent +' </p> '
						+ '</div> '
					+ '</article> '
				+ '</div> '
			+ '</div> '
			;

		$("#newsAndEventsDiv").append(appendThis);
		// alert("inside");
	}

//6. processing create message to users form data
	document.getElementById("messageToUsersForm").addEventListener("submit" , createMessage);
	function createMessage(e) {
		e.preventDefault();

		var messageHeading = $("#messageHeading").val();
		var messageContent = $("#messageContent").val();

		var imageURL = $("#download").attr("href");
		var imageName = $("#download").attr("download");

		var currentdate = new Date(); 
    	var currentTime = currentdate.getDate() + ":"
        	+ (currentdate.getMonth())  + ":" 
            + currentdate.getFullYear() + ":"  
            + currentdate.getHours() + ":"  
            + currentdate.getMinutes() + ":" 
            + currentdate.getSeconds();

		var storageRef = firebase.storage().ref("Message to users/" + imageName);
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

		  		insertMessage(messageHeading, messageContent, downloadURL, currentTime);
		});
	}
	
//7. Inserting create message to users form data into firebase database		
	function insertMessage(messageHeading, messageContent, downloadURL, time) {

		var newsAndEventsRef = firebase.database().ref("clients/client-02/app_home/message_to_users");

		newsAndEventsRef.child(time).set({
			message_heading: messageHeading,
			message_content: messageContent,
			image_url: downloadURL
		});
	}

//8. Fetching message to users data from firebase database
	var messageToUsersRootRef = firebase.database().ref().child("clients/client-02/app_home/message_to_users");
	messageToUsersRootRef.on("child_added", data => {
		
		var newsHeading = data.child("message_heading").val();
		var newsContent = data.child("message_content").val();
		var imageURL = data.child("image_url").val();

		displayMessageToUsers(newsHeading, newsContent, imageURL);
	});

//9. Displaying message to users in admin page
	function displayMessageToUsers(newsHeading, newsContent, imageURL) {
		
		// var storageRef = firebase.storage().ref("Message to users/");
		
		var appendThis =
			'<div class="column size-1of4">'
				+' <div class="card-grid-col"> '
					+' <article class="card-typical"> '
						+' <div class="card-typical-section card-typical-content"> ' 
							+' <div class="photo"> '
								+' <img src=" '+ imageURL +' " alt=""> '
							+' </div> '
							+' <header class="title"><a href="#"> '+ newsHeading +' </a></header> '
							+' <p> '+ newsContent +' </p> '
						+' </div> '
					+' </article> '
				+' </div> '
			+'</div> '
			;

		$("#messageToUsersDiv").append(appendThis);

	}