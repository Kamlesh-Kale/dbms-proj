const firebaseConfig = {
	apiKey: "AIzaSyCQfsUjYgMa9I3DRLm3xNt8nvhxLYvvEtQ",
	authDomain: "starbucks-testimonial.firebaseapp.com",
	databaseURL: "https://starbucks-testimonial-default-rtdb.firebaseio.com",
	projectId: "starbucks-testimonial",
	storageBucket: "starbucks-testimonial.appspot.com",
	messagingSenderId: "301644246556",
	appId: "1:301644246556:web:c1e11d8d50bb8aeec7b9d9",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Reference to Database
const reviewsDB = firebase.database().ref("reviews");

//funcn
document.getElementById("reviews").addEventListener("submit", submitReview);

function submitReview(event) {
	event.preventDefault();

	const selectedStar = document
		.querySelector('input[name="rate"]:checked')
		.getAttribute("data-rate");
	const name = document.getElementById("name").value;
	const email = document.getElementById("email").value;
	const description = document.getElementById("textarea").value;

	saveMessages(name, email, description, selectedStar);

	document.querySelector(".alert").style.display = "block";

	setTimeout(() => {
		document.querySelector(".alert").style.display = "none";
	}, 3000);

	document.getElementById("reviews").reset();
}


function saveMessages(name, email, description, stars) {
	const newReview = reviewsDB.push();

	newReview.set(
		{
			name: name,
			email: email,
			description: description,
			stars: stars,
		},
		function (error) {
			if (error) {
				console.error("Error saving message:", error);
			} else {
				const starWidget = document.querySelector(".star-widget");
				const postWidget = document.querySelector(".post");

				starWidget.style.display = "none";
				postWidget.style.display = "block";
			}
		},
	);
}

let menu = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");
menu.onclick = () => {
	menu.classList.toggle("bx-x");
	navbar.classList.toggle("active");
};
window.onscroll = () => {
	menu.classList.remove("bx-x");
	navbar.classList.remove("active");
};

document.getElementById("refresh").addEventListener("click", function () {
	location.reload();
});
