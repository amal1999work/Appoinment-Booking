

const Appointment = require('./appointmentBookingModal');

const saveBooking = async (req, res) => {
    const { name, phone, date, timeSlot } = req.body;

    try {
       
        const existingAppointment = await Appointment.findOne({ date, timeSlot });
        
        if (existingAppointment) {
            return res.status(400).json({ message: 'This time slot is already booked.' });
        }

        
        const newBooking = new Appointment({
            name,
            phone,
            date,
            timeSlot
        });

        await newBooking.save();

        res.status(200).json({ message: 'Appointment booked successfully!' });
    } catch (error) {
        console.error('Error booking appointment:', error);
        res.status(500).json({ message: "Internal server error", error });
    }
};





const generateAvailableSlots = () => {
    const timeSlots = ['10:00 AM-10:30 AM','10:30 AM-11:00 AM','11:00 AM-11:30 AM','11:30 AM-12:00 PM','12:00 PM-12:30 PM','12:30 PM-1:00 PM','2:00 PM-2:30 PM','2:30 PM-3:00 PM','3:00 PM-3:30 PM','3:30 PM-4:00 PM','4:00 PM-4:30 AM','4:30 PM-5:00 PM'];
   
    
    return timeSlots;
};


  
 
  const getAvailableSlots = async (req, res) => {
    const { date } = req.params;
  
    try {
      const allSlots = generateAvailableSlots(); 
     
      const bookedAppointments = await Appointment.find({ date });
 
      const bookedSlots = bookedAppointments.map(appointment => appointment.timeSlot);
      const availableSlots = allSlots.filter(slot => !bookedSlots.includes(slot));
  
      res.status(200).json(availableSlots);
    } catch (error) {
      console.error('Error fetching available slots:', error);
      res.status(500).json({ message: 'Error fetching available slots' });
    }
  };
  
  module.exports = { saveBooking, getAvailableSlots };


