document.addEventListener('DOMContentLoaded', function () {
    // Simulate existing random appointments
    const existingAppointments = [
      { name: 'John Doe', age: 30, email: 'john@example.com', contact: '1234567890', date: '2025-03-06', time: '10:00' },
      { name: 'Jane Smith', age: 25, email: 'jane@example.com', contact: '0987654321', date: '2025-03-07', time: '11:00' },
      { name: 'Emily Williams', age: 40, email: 'emily@example.com', contact: '1122334455', date: '2025-03-08', time: '14:00' }
    ];
  
    // Function to display existing appointments
    function displayAppointments() {
      const appointmentsList = document.getElementById('appointments-list');
      appointmentsList.innerHTML = ''; // Clear the list
  
      existingAppointments.forEach(appointment => {
        const listItem = document.createElement('li');
        listItem.textContent = `Name: ${appointment.name}, Age: ${appointment.age}, Email: ${appointment.email}, Contact: ${appointment.contact}, Date: ${appointment.date}, Time: ${appointment.time}`;
        appointmentsList.appendChild(listItem);
      });
    }
  
    // Display appointments when page loads
    displayAppointments();
  
    // Form submit handler
    const appointmentForm = document.getElementById('appointment-form');
    appointmentForm.addEventListener('submit', function (e) {
      e.preventDefault();
  
      // Get user input from form
      const name = document.getElementById('name').value;
      const age = document.getElementById('age').value;
      const email = document.getElementById('email').value;
      const contact = document.getElementById('contact').value;
      const date = document.getElementById('appointment-date').value;
      const time = document.getElementById('appointment-time').value;
  
      // Create new appointment
      const newAppointment = { name, age, email, contact, date, time };
  
      // Add new appointment to the existing appointments list
      existingAppointments.push(newAppointment);
  
      // Display updated list
      displayAppointments();
  
      // Clear form
      appointmentForm.reset();
  
      // Show confirmation message
      const appointmentStatus = document.getElementById('appointment-status');
      appointmentStatus.textContent = `Appointment successfully booked for ${name} on ${date} at ${time}`;
      appointmentStatus.style.color = 'green';
    });
  });
  