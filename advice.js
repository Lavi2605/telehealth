// Function to get health advice based on user data (no API call)
function getHealthAdvice(userData) {
  const advice = generateAdvice(userData);
  displayAdvice(advice);
}

// Function to generate advice based on user data
function generateAdvice(userData) {
  const { age, gender, symptoms } = userData;
  let adviceMessage = '';

  // Gender-based advice
  if (gender === 'male') {
    adviceMessage += 'As a male, ensure you maintain a healthy heart and stay active. ';
  } else if (gender === 'female') {
    adviceMessage += 'As a female, make sure you maintain your bone health and get regular screenings. ';
  } else if (gender === 'other') {
    adviceMessage += 'Regardless of gender, health maintenance is essential at all ages. ';
  }

  // Age-based advice
  if (age < 18) {
    adviceMessage += 'Being under 18, it’s important to get enough sleep and follow a balanced diet. ';
  } else if (age >= 18 && age < 40) {
    adviceMessage += 'For young adults, managing stress and maintaining regular physical activity is key. ';
  } else if (age >= 40 && age < 60) {
    adviceMessage += 'For those in their 40s and 50s, ensure regular health check-ups and healthy weight management. ';
  } else if (age >= 60) {
    adviceMessage += 'For seniors, make sure to monitor bone health, manage chronic conditions, and stay active with low-impact exercises. ';
  }

  // Symptoms-based advice
  if (symptoms.includes('fever')) {
    adviceMessage += 'Fever can be a sign of an infection or underlying condition. Drink fluids and rest. Seek medical attention if it persists. ';
  }

  if (symptoms.includes('headache')) {
    adviceMessage += 'Headaches might be caused by stress, dehydration, or a variety of conditions. Make sure to stay hydrated, rest, and manage stress. ';
  }

  if (symptoms.includes('cough')) {
    adviceMessage += 'A cough could indicate a respiratory infection. Make sure to rest and hydrate. If the cough persists, seek medical attention. ';
  }

  if (symptoms.includes('fatigue')) {
    adviceMessage += 'Fatigue can result from poor sleep, stress, or nutritional deficiencies. Ensure you get enough sleep, rest, and eat a balanced diet. ';
  }

  if (symptoms.includes('nausea')) {
    adviceMessage += 'Nausea can be caused by many factors including dehydration, stress, or digestive issues. Stay hydrated and try to eat light foods. ';
  }

  if (symptoms.includes('dizziness')) {
    adviceMessage += 'Dizziness may result from dehydration, low blood pressure, or inner ear problems. Rest and stay hydrated. If dizziness persists, consult a doctor. ';
  }

  if (symptoms.includes('coughing up blood')) {
    adviceMessage += 'Coughing up blood could indicate a serious condition like a lung infection or other respiratory problems. Seek medical attention immediately. ';
  }

  if (symptoms.includes('chest pain')) {
    adviceMessage += 'Chest pain can be a symptom of a heart attack or anxiety. If you experience chest pain, seek immediate medical attention. ';
  }

  // Add more specific conditions
  // Example: for a condition like asthma
  if (symptoms.includes('asthma')) {
    adviceMessage += 'Asthma requires careful management. Avoid triggers, use inhalers as prescribed, and have regular check-ups with your doctor. ';
  }

  // Severe conditions requiring immediate medical attention
  if (symptoms.includes('bleeding') || symptoms.includes('severe bleeding')) {
    adviceMessage += 'Severe bleeding can be life-threatening. Apply pressure to the wound, elevate the limb if possible, and seek emergency medical attention immediately. ';
  }

  if (symptoms.includes('nosebleed')) {
    adviceMessage += 'If you have a nosebleed, pinch your nostrils together and lean forward to avoid blood flowing down your throat. If it persists, consult a doctor. ';
  }

  if (symptoms.includes('broken bone') || symptoms.includes('fracture')) {
    adviceMessage += 'A broken bone requires immediate medical attention. Immobilize the limb and go to the nearest emergency facility or call for help. ';
  }

  if (symptoms.includes('severe cuts') || symptoms.includes('lacerations')) {
    adviceMessage += 'Severe cuts or lacerations can cause heavy bleeding and infection. Clean the wound and seek medical attention immediately. ';
  }

  if (symptoms.includes('head injury') || symptoms.includes('concussion')) {
    adviceMessage += 'Head injuries or concussions require immediate medical attention. Monitor for symptoms such as dizziness, confusion, or nausea. Seek help immediately. ';
  }

  if (symptoms.includes('loss of consciousness') || symptoms.includes('fainting')) {
    adviceMessage += 'Loss of consciousness or fainting can indicate a serious health problem. Call for emergency assistance immediately. ';
  }

  // Conditions based on age group
  if (age < 18 && symptoms.includes('fever')) {
    adviceMessage += 'As a child, fever should be monitored closely. Keep the child hydrated and ensure they get rest. If fever lasts for more than 48 hours, see a pediatrician. ';
  }

  if (age > 50 && symptoms.includes('shortness of breath')) {
    adviceMessage += 'Shortness of breath in older adults can be a sign of cardiovascular problems. Seek immediate medical advice. ';
  }

  if (age > 40 && symptoms.includes('joint pain')) {
    adviceMessage += 'Joint pain at this age could be due to arthritis or other musculoskeletal issues. Stay active and consider visiting a rheumatologist. ';
  }

  // Symptom combinations
  if (symptoms.includes('fever') && symptoms.includes('headache')) {
    adviceMessage += 'Fever and headache together could be a sign of a viral infection like the flu or COVID-19. Stay hydrated, rest, and seek medical care if symptoms worsen. ';
  }

  // Add more predefined cases as needed
  // Example: Skin conditions like acne, eczema, rashes
  if (symptoms.includes('acne')) {
    adviceMessage += 'Acne can be caused by hormonal changes, stress, or diet. Try to keep your skin clean, avoid harsh chemicals, and consider seeing a dermatologist. ';
  }

  if (symptoms.includes('rash')) {
    adviceMessage += 'A rash could be due to an allergic reaction or infection. If the rash is widespread or painful, consult a healthcare provider. ';
  }

  // More conditions
  if (symptoms.includes('stomach pain')) {
    adviceMessage += 'Stomach pain can be caused by indigestion, gas, or infections. Try drinking warm water and avoid heavy meals. If pain persists, consult a doctor. ';
  }

  if (symptoms.includes('breathing difficulty')) {
    adviceMessage += 'Breathing difficulty can be a sign of an asthma attack, allergic reaction, or other severe respiratory conditions. Seek immediate medical help. ';
  }

  return adviceMessage;
}

// Function to display the advice
function displayAdvice(advice) {
  const adviceSection = document.getElementById('health-advice');
  adviceSection.innerHTML = `<p>${advice}</p>`;
}

// Add event listener to submit the form
document.getElementById('details-form').addEventListener('submit', function (e) {
  e.preventDefault();

  // Get user input from the form
  const name = document.getElementById('name').value;
  const age = document.getElementById('age').value;
  const gender = document.getElementById('gender').value;
  const symptoms = document.getElementById('symptoms').value.split(','); // Assuming symptoms are entered as a comma-separated list

  // Prepare user data object
  const userData = {
    name: name,
    age: parseInt(age), // Ensure age is treated as a number
    gender: gender,
    symptoms: symptoms
  };

  // Call the function to get health advice
  getHealthAdvice(userData);
});
