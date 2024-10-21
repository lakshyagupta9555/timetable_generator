document.getElementById("numTeachers").addEventListener("input", function() {
    const numTeachers = parseInt(document.getElementById("numTeachers").value);
    const teacherInputs = document.getElementById("teacherInputs");
    
    // Clear previous teacher inputs
    teacherInputs.innerHTML = '';
  
    // Create inputs for teacher names dynamically
    for (let i = 1; i <= numTeachers; i++) {
      const div = document.createElement('div');
      div.className = 'mb-4';
      div.innerHTML = `
        <label for="teacher${i}" class="block text-lg font-medium text-gray-700">Teacher ${i} Name</label>
        <input type="text" id="teacher${i}" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
      `;
      teacherInputs.appendChild(div);
    }
  });
  
  document.getElementById("generateTimetable").addEventListener("click", function() {
    const numClasses = parseInt(document.getElementById("numClasses").value);
    const numTeachers = parseInt(document.getElementById("numTeachers").value);
    const numLectures = parseInt(document.getElementById("numLectures").value);
  
    if (isNaN(numClasses) || isNaN(numTeachers) || isNaN(numLectures) || numClasses < 1 || numTeachers < 1 || numLectures < 1) {
      alert("Please enter valid numbers for classes, teachers, and lectures.");
      return;
    }
  
    // Get teacher names
    const teacherNames = [];
    for (let i = 1; i <= numTeachers; i++) {
      const teacherName = document.getElementById(`teacher${i}`).value;
      if (teacherName) {
        teacherNames.push(teacherName);
      } else {
        alert(`Please enter a name for Teacher ${i}`);
        return;
      }
    }
  
    const timetableBody = document.getElementById("timetableBody");
    timetableBody.innerHTML = ''; // Clear the previous table
  
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday' , 'Saturday']; // 5 days
    const timeSlots = ['9:45 AM - 10:35 AM', '10:35 AM - 11:25 AM', '11:30 AM - 12:20 PM', '12:20 PM - 1:10 PM', '2:05 PM - 2:55 PM', '3:00 PM - 3:50 PM' , '3:50 PM - 4:40 PM']; // Example time slots
  
    // Loop over each time slot
    for (let i = 0; i < timeSlots.length; i++) {
      const row = document.createElement("tr");
  
      // Time slot column
      row.innerHTML = `<td class="border px-4 py-2">${timeSlots[i]}</td>`;
  
      // Loop over each day of the week
      for (let j = 0; j < days.length; j++) {
        let availableTeachers = [...teacherNames]; // Clone teacherNames to reset availability for each day
  
        // For each day, we need to assign a teacher to each class
        let dayColumn = `<td class="border px-4 py-2">`;
  
        for (let k = 1; k <= numClasses; k++) {
          // Randomly assign a teacher to each class from the available teachers pool
          const teacherIndex = Math.floor(Math.random() * availableTeachers.length);
          const assignedTeacher = availableTeachers[teacherIndex];
  
          dayColumn += `
            <div class="p-2">
              Class ${k}: ${assignedTeacher}
            </div>`;
  
          // Remove the assigned teacher from the available pool for this time slot
          availableTeachers.splice(teacherIndex, 1);
  
          // If teachers run out and there are still classes, we can reuse them, or if needed, break it.
          if (availableTeachers.length === 0) {
            availableTeachers = [...teacherNames]; // Reset teacher pool if exhausted
          }
        }
  
        dayColumn += `</td>`;
        row.innerHTML += dayColumn;
      }
  
      timetableBody.appendChild(row);
    }
  });
  