import Event from "./event.model.js"


// Controller function to handle the creation of a new event
const postAnEvent = async (req, res) => {
    try {
        const newEvent = await Event({...req.body});
        await newEvent.save();
        res.status(201).json({
            success: true,
            message: 'Event created successfully',
            event: newEvent
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error creating event',
            error: error.message
        });
        
    }
   }
  
const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            events: events
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error fetching events',
            error: error.message
        });
    }
}

const getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({
                success: false,
                message: 'Event not found'
            });
        }
        res.status(200).json({
            success: true,
            event: event
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error fetching event',
            error: error.message
        });
    }
}

const updateEvent = async (req, res) => {
    try {
        const updatedEvent = await Event.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true, runValidators: true }
        );
        if (!updatedEvent) {
            return res.status(404).json({
                success: false,
                message: 'Event not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Event updated successfully',
            event: updatedEvent
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error updating event',
            error: error.message
        });
    }
}
const deleteEvent = async (req, res) => {   
    
        try {
            const event = await Event.findByIdAndDelete(req.params.id);
            if (!event) {
                return res.status(404).json({
                    success: false,
                    message: 'Event not found'
                });
            }
            res.status(200).json({
                success: true,
                message: 'Event deleted successfully'
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                success: false,
                message: 'Error deleting event',
                error: error.message
            });
        }
}   

export { postAnEvent, getAllEvents, getEventById, updateEvent, deleteEvent };
