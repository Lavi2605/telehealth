// Existing function for video call
function startVideoCall(doctorId) {
  let googleMeetLink = '';
  
  // Define Google Meet links for each doctor
  switch (doctorId) {
      case 'alice-johnson':
          googleMeetLink = 'https://meet.google.com/abc-defg-hij';  // Replace with actual link for Alice
          break;
      case 'robert-smith':
          googleMeetLink = 'https://meet.google.com/xyz-robert-smith';  // Replace with actual link for Robert
          break;
      case 'emily-davis':
          googleMeetLink = 'https://meet.google.com/xyz-emily-davis';  // Replace with actual link for Emily
          break;
      case 'lavish':
          googleMeetLink = 'https://meet.google.com/dwj-ykrg-sag';  // Replace with actual link for Lavish
          break;
      default:
          alert('Doctor not found');
          return;
  }

  // Redirect to the selected doctor's Google Meet link
  window.location.href = googleMeetLink;
}

// Medical report upload functionality
const doctorSelect = document.getElementById('doctor-select');
const fileUpload = document.getElementById('file-upload');
const shareButton = document.getElementById('share-report-btn');
const reportsList = document.getElementById('reports-list');

// Enable the share button only when a file is selected and a doctor is chosen
fileUpload.addEventListener('change', checkFileAndDoctor);
doctorSelect.addEventListener('change', checkFileAndDoctor);

function checkFileAndDoctor() {
  console.log('Checking file and doctor...');
  if (fileUpload.files.length > 0 && doctorSelect.value) {
      shareButton.disabled = false;
      console.log('Share button enabled');
  } else {
      shareButton.disabled = true;
      console.log('Share button disabled');
  }
}

// Handle the report sharing
shareButton.addEventListener('click', () => {
  const doctorName = doctorSelect.value;
  const file = fileUpload.files[0];
  
  if (!doctorName || !file) {
      alert("Please select both a doctor and a file.");
      return;
  }

  console.log(`Sharing report with doctor: ${doctorName}`);
  const report = {
      doctor: doctorName,
      fileName: file.name,
      fileType: file.type,
      fileSize: file.size,
      date: new Date().toLocaleString()
  };

  // Get previous reports from local storage
  const reports = JSON.parse(localStorage.getItem('reports')) || [];
  reports.push(report);

  // Save the updated reports in local storage
  localStorage.setItem('reports', JSON.stringify(reports));

  // Update the UI with the new report
  displayReports();
  
  // Clear the file input and reset the form
  fileUpload.value = '';
  doctorSelect.value = '';
  shareButton.disabled = true;
  console.log('Report shared successfully!');
});

// Display the list of uploaded reports
function displayReports() {
  reportsList.innerHTML = '';
  const reports = JSON.parse(localStorage.getItem('reports')) || [];

  // Add logs to verify data
  console.log('Displaying reports:', reports);

  reports.forEach((report, index) => {
      const li = document.createElement('li');
      li.innerHTML = `
          <strong>Doctor: </strong>${report.doctor}<br>
          <strong>File Name: </strong>${report.fileName}<br>
          <strong>Type: </strong>${report.fileType}<br>
          <strong>Size: </strong>${(report.fileSize / 1024).toFixed(2)} KB<br>
          <strong>Date: </strong>${report.date}
      `;
      reportsList.appendChild(li);
  });
}

// Display reports on page load
document.addEventListener('DOMContentLoaded', displayReports);

// -----------------------------------------------
// Appointment Booking Functionality

// DOM Elements
const appointmentDate = document.getElementById('appointment-date');
const appointmentTime = document.getElementById('appointment-time');
const bookButton = document.getElementById('book-appointment-btn');
const appointmentStatus = document.getElementById('appointment-status');
const appointmentsList = document.getElementById('appointments-list');

// Enable/Disable book button based on inputs
appointmentDate.addEventListener('input', checkForAppointmentConflict);
appointmentTime.addEventListener('input', checkForAppointmentConflict);

// Check if both date and time are selected
function checkForAppointmentConflict() {
console.log('Checking date and time inputs...');
console.log('Date:', appointmentDate.value);
console.log('Time:', appointmentTime.value);

if (appointmentDate.value && appointmentTime.value) {
  bookButton.disabled = false;
} else {
  bookButton.disabled = true;
}
}

// Handle appointment booking
bookButton.addEventListener('click', () => {
const date = appointmentDate.value;
const time = appointmentTime.value;

// Check if both date and time are selected
if (!date || !time) {
  alert("Please select both date and time.");
  return;
}

const appointment = { date, time };

// Get the list of existing appointments from localStorage
const appointments = JSON.parse(localStorage.getItem('appointments')) || [];

// Check for conflicting appointments
const conflict = checkForTimeConflict(appointments, appointment);

if (conflict) {
  appointmentStatus.textContent = "Appointment cannot be scheduled at this time. There is already a conflicting appointment.";
  appointmentStatus.style.color = "red";
} else {
  // If no conflict, store the appointment and show confirmation
  appointments.push(appointment);
  localStorage.setItem('appointments', JSON.stringify(appointments));

  // Show appointment booked message
  appointmentStatus.textContent = `Your appointment has been successfully booked for ${date} at ${time}!`;
  appointmentStatus.style.color = "green";

  // Display all appointments
  displayAppointments(appointments);
}
});

// Check for time conflicts within 15-30 minutes difference
function checkForTimeConflict(appointments, newAppointment) {
for (let i = 0; i < appointments.length; i++) {
  const existingAppointment = appointments[i];
  const existingDateTime = new Date(existingAppointment.date + 'T' + existingAppointment.time);
  const newDateTime = new Date(newAppointment.date + 'T' + newAppointment.time);

  const timeDifference = Math.abs(newDateTime - existingDateTime) / (1000 * 60); // difference in minutes

  if (timeDifference <= 30) {
    return true; // Conflict found
  }
}
return false; // No conflict
}

// Display all appointments
function displayAppointments(appointments) {
console.log('Displaying appointments:', appointments); // Log appointments to check if they are being loaded
// Clear the previous list of appointments
appointmentsList.innerHTML = '';

// Add each appointment to the list
appointments.forEach(appointment => {
  const li = document.createElement('li');
  li.textContent = `Appointment scheduled for ${appointment.date} at ${appointment.time}`;
  appointmentsList.appendChild(li);
});
}

// Display all appointments when the page loads
document.addEventListener('DOMContentLoaded', () => {
const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
console.log("Appointments loaded:", appointments); // Log to check if appointments are loaded from localStorage
displayAppointments(appointments);
});

// Adding the functionality for entering details and getting precautions
const form = document.getElementById('user-details-form');
const precautionsSection = document.getElementById('precautions-section');
const precautionsList = document.getElementById('precautions-list');

// Define basic symptoms-based precautions (this can be enhanced with a more complex model later)
const precautionsDatabase = {
'fever': 'Stay hydrated, rest, and avoid strenuous activities.',
'cough': 'Drink warm liquids, rest, and avoid smoking.',
'headache': 'Take pain relievers like ibuprofen, stay in a dark, quiet room.',
'sore throat': 'Gargle with warm saltwater and stay hydrated.',
'nausea': 'Eat small, frequent meals, and stay hydrated.',
};

// Listen for form submission to process data
form.addEventListener('submit', function(event) {
event.preventDefault();

const age = document.getElementById('age').value;
const gender = document.getElementById('gender').value;
const bloodGroup = document.getElementById('blood-group').value;
const symptomsInput = document.getElementById('symptoms').value;

// Log symptoms input to debug
console.log('Symptoms Input:', symptomsInput);

// Split symptoms by commas and trim any extra spaces
const symptoms = symptomsInput.toLowerCase().split(',').map(symptom => symptom.trim());

// Log processed symptoms to debug
console.log('Processed Symptoms:', symptoms);

// Process symptoms and generate precautions
const precautions = generatePrecautions(symptoms);

// Display the precautions on the page
displayPrecautions(precautions);

// Clear form inputs
form.reset();
});

// Function to generate precautions based on symptoms
function generatePrecautions(symptoms) {
const precautions = [];

symptoms.forEach(symptom => {
  // Check if the symptom exists in the database
  if (precautionsDatabase[symptom]) {
    precautions.push(precautionsDatabase[symptom]);
  } else {
    precautions.push(`No precautions available for ${symptom}. Please consult a doctor.`);
  }
});

return precautions;
}

// Function to display precautions
function displayPrecautions(precautions) {
precautionsList.innerHTML = ''; // Clear any previous data
precautionsSection.style.display = 'block'; // Show the precautions section

// Log precautions to debug
console.log('Displaying Precautions:', precautions);

precautions.forEach(precaution => {
  const li = document.createElement('li');
  li.textContent = precaution;
  precautionsList.appendChild(li);
});
}

// JavaScript to trigger the DNA helix animation
function triggerHelixAnimation() {
const helixContainer = document.getElementById('helix-container');
helixContainer.style.display = 'block'; // Show the helix animation container

// Hide the animation after 3 seconds (animation duration)
setTimeout(() => {
  helixContainer.style.display = 'none'; // Hide the helix after 3 seconds
}, 3000); // 3000ms = 3 seconds
}

// Trigger on page load
window.addEventListener('load', function () {
triggerHelixAnimation();
});

// Optionally trigger on form submission
document.getElementById('details-form').addEventListener('submit', function (e) {
e.preventDefault(); // Prevent form submission
triggerHelixAnimation(); // Show helix animation
// Continue with form submission logic here (like collecting form data)
});
