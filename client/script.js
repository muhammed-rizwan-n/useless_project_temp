async function fetchStudentData() {
    try {
        const response = await fetch('http://localhost:3000/users'); // Replace with your API endpoint
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const students = await response.json();
        generateStudentCards(students);
    } catch (error) {
        console.error('Error fetching student data:', error);
    }
}

// Generate student cards based on fetched data
function generateStudentCards(students) {
    const studentList = document.getElementById('student-list');
    studentList.innerHTML = ''; // Clear existing content

    students.forEach(student => {
        // Create a div for the student card
        const card = document.createElement('div');
        card.className = 'student-card';

        // Create an image element
        //const image = document.getElementById("profile-picker");
        //const imageUrl = `https://raw.githubusercontent.com/username/`;
        //image.src = imageUrl;
        const img = document.createElement('img');
        img.src = `https://raw.githubusercontent.com/muhammed-rizwan-n/useless_project_temp/photos/${student.thumbnail_url}`
        //img.src = `https://https://raw.githubusercontent.com/muhammed-rizwan-n/useless_project_temp/refs/heads/photos/${student.thumbnail_url}` //"https://img.freepik.com/premium-photo/stylish-man-flat-vector-profile-picture-ai-generated_606187-310.jpg"; // Assuming 'photo' is the field in your API
        img.alt = student.name;
        img.className = 'student-photo';

        // Create a div for student details
        const details = document.createElement('div');
        details.className = 'student-details';

        // Create a link to the profile
        const link = document.createElement('a');
        //link.href = `profile.html?=${student.name}&skills=${student.AcademicProfile.skillsAcquired.join(',')}&marks=${student.marks}&grade=${student.grade}`;
        link.href = `profile.html?userId=${student._id}`; 
        link.textContent = `${student.name} (${student.department})`;

        // Create paragraphs for hobbies, marks, and grades
        const hobbiesPara = document.createElement('p');
        hobbiesPara.textContent = `Skills: ${student.AcademicProfile.skillsAcquired.join(' ,')}`;

        const marksPara = document.createElement('p');
        marksPara.textContent = `CGPA: ${student.AcademicProfile.currentGPA}`;

        // Append elements to details and card
        details.appendChild(link);
        details.appendChild(hobbiesPara);
        details.appendChild(marksPara);
        card.appendChild(img);
        card.appendChild(details);

        // Append card to the student list
        studentList.appendChild(card);
    });
}
    

// Call the fetch function on page load
document.addEventListener('DOMContentLoaded', fetchStudentData);
