
async function populateTimeSlots(date) {
    const selectElement = document.getElementById('appointment-time');
    selectElement.innerHTML = '';

    try {
        const response = await fetch(`http://localhost:4000/booking/available-slots/${date}`);
        const availableSlots = await response.json();

        if (availableSlots.length === 0) {
            alert('No available slots for this date.');
            return;
        }

        
        availableSlots.forEach((slot) => {
            const option = document.createElement('option');
            option.value = slot;
            option.textContent = slot;
            selectElement.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching available slots:', error);
        alert('Error fetching available slots.');
    }
}


function displayAvailableSlots() {
    const date = document.getElementById('appointment-date').value; 
    if (date) {
        populateTimeSlots(date);
    }
}


document.getElementById('booking-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const date = document.getElementById('appointment-date').value;
    const timeSlot = document.getElementById('appointment-time').value;

    if (!date || !timeSlot) {
        alert('Please select both  date and  time slot.');
        return;
    }
    if (!name || !phone) {
        alert('Please select both name and  phone .');
        return;
    }

    try {
        const response = await fetch('http://localhost:4000/booking/saveBooking', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, phone, date, timeSlot }),
        });

        const result = await response.json();

        if (response.ok) {
            alert(result.message);
        } else {
            alert(result.message);
        }
    } catch (error) {
        alert('Error booking appointment.');
    }

    reset()
});
function reset() {
   
    document.getElementById('name').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('appointment-date').value = '';
    document.getElementById('appointment-time').innerHTML = '';
}