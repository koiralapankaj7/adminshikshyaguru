
	var config = {
    	apiKey: "AIzaSyDgJTKGsbxCeMumPX_IXi4N1mulK1j0VSo",
    	authDomain: "shikshyaguru-182814.firebaseapp.com",
    	databaseURL: "https://shikshyaguru-182814.firebaseio.com",
    	projectId: "shikshyaguru-182814",
    	storageBucket: "shikshyaguru-182814.appspot.com",
    	messagingSenderId: "697329831707"
  	};
  	firebase.initializeApp(config);

	function logout() {
		alert("logout");
		firebase.auth().signOut().then(function() {
		  // Sign-out successful.
		   window.open("authentication.html");
		}).catch(function(error) {
		  // An error happened.
		  alert(error.message);
		});
	}



	// Temp variavle to store active page ID
	var activePage;

	$(".page-content").load("admin-dashboard.html");
	navClick("dashboardNavBtn");

	$("#mainLogoBtn").click(function() {
		$(".page-content").load("admin-dashboard.html");
		location.reload();
	});

	$("#dashboardNavBtn").click(function() {
		$(".page-content").load("admin-dashboard.html");
		navClick($(this).attr("id"));
		location.reload();	
	});

	$("#homeNavBtn").click(function() {
		// location.reload();	
		$(".page-content").load("app-home.html");
		navClick($(this).attr("id"));
	});

	$("#programmesNavBtn").click(function() {
		$(".page-content").load("app-programmes.html");
		navClick($(this).attr("id"));
	});

	$("#studentsNavBtn").click(function() {
		$(".page-content").load("app-students.html");
		navClick($(this).attr("id"));
	});

	$("#managementNavBtn").click(function() {
		$(".page-content").load("app-management.html");
		navClick($(this).attr("id"));
	});

	$("#galleryNavBtn").click(function() {
		$(".page-content").load("app-gallery.html");
		navClick($(this).attr("id"));
	});

	$("#teachersNavBtn").click(function() {
		$(".page-content").load("app-teachers.html");
		navClick($(this).attr("id"));
	});

	$("#staffNavBtn").click(function() {
		$(".page-content").load("app-staff.html");
		navClick($(this).attr("id"));
	});

	$("#activitiesNavBtn").click(function() {
		$(".page-content").load("app-activities.html");
		navClick($(this).attr("id"));
	});

	$("#contactsNavBtn").click(function() {
		$(".page-content").load("app-contact.html");
		navClick($(this).attr("id"));
	});

	$("#reviewsNavBtn").click(function() {
		$(".page-content").load("app-reviews.html");
		navClick($(this).attr("id"));
	});


	function navClick(targerPage) {
		$("#"+activePage).removeClass("opened");
		activePage = targerPage;
		$("#"+targerPage).addClass("opened");		
	}