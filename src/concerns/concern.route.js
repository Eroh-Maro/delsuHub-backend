import Concern from "./concern.model.js";
import express from 'express';
const router = express.Router();

router.get('/', async (req, res)=> {
try {
    const concerns = await Concern.find();
    res.status(200).json({
        success: true,
        concerns: concerns
    });
} catch (error) {
    res.status(500).json({
        success: false,
        message: 'Error fetching concerns',
        error: error.message
    });
}
})

router.get('/:id', async (req, res) => {
    try {
        const concern = await Concern.findById(req.params.id);
        if (!concern) {
            return res.status(404).json({
                success: false,
                message: 'Concern not found'
            });
        }
        res.status(200).json({
            success: true,
            concerns: concern
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching concerns',
            error: error.message
        });
    }
    })
    

router.post('/addConcern', async (req, res) => {
    try {
      const newConcern = new Concern({...req.body});
      await newConcern.save();
      res.status(201).json({
        success: true,
        message: 'Concern created successfully',
        concern: newConcern,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error submitting concern',
        error: error.message,
      });
    }
  })

router.delete('/:id', async (req, res) => {
    try {
        const concern = await Concern.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            message: 'Concern deleted successfully',
            concern: concern
        });
        res.status(200).json({
            success: true,
            message: 'Concern deleted successfully',
            concern: concern
        });
    } catch (error) {
        
    }
})

router.patch('/:id', async (req, res) => {
    try {
        const updatedConcern = await Concern.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true, runValidators: true }
        )
        if (!updatedConcern) {
            return res.status(404).json({
                success: false,
                message: 'Concern not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Concern updated successfully',
            concern: updatedConcern
        });
    } catch (error) {
        
    }
})

export default router;