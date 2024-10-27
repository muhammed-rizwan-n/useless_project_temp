// Get the URL parameters
const urlParams = new URLSearchParams(window.location.search);

const id = urlParams.get('userId');
//const hobbies = urlParams.get('hobbies');
//const marks = urlParams.get('marks');
//const grade = urlParams.get('grade');

async function fetchStData() {
    try {
        const response = await fetch(`http://localhost:3000/users/${id}`); // Replace with your API endpoint
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const students = await response.json();
        setdata(students);

        const response2 = await fetch(`http://localhost:3000/photos/${id}`); // Replace with your API endpoint
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const photos = await response.json();
        setdata(photos);
    } catch (error) {
        console.error('Error fetching student data:', error);
    }
}

async function setdata(students) {
    const img = document.getElementById("profile-picker");
    img.src = `https://raw.githubusercontent.com/muhammed-rizwan-n/useless_project_temp/photos/${students.thumbnail_url}`
    // Set the student details in the profile page
document.getElementById('student-name').innerText = students.name;
document.getElementById('student-hobbies').innerText = students.AcademicProfile.skillsAcquired.join(' , ');
document.getElementById('student-marks').innerText = students.AcademicProfile.currentGPA;

// Optional functionality for the request button
document.getElementById('request-button').onclick = function() {
    alert(`Friend request sent to ${students.name}!`); // Corrected this line

};

const photoContainer = document.getElementById("photo-container");

// Loop through each URL and create an image element
photoUrls.forEach(url => {
    const img = document.createElement("img");
    img.src = url;
    img.alt = "Extra Photo";
    photoContainer.appendChild(img);
});
document.getElementById("request-button").addEventListener("click", function() {
    alert("Friend Request Sent!");
});
}

document.addEventListener('DOMContentLoaded', fetchStData);
