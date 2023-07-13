
const express = require('express');
const router = express.Router();
const Package = require('../models/Package');
const  getCoordinatesFromAddress =  require('../location/index');

// Endpoint to create a new package
router.post('/', async (req, res) => {
  try {
    const locationFromAddress = await getCoordinatesFromAddress(req.body.from_address);
    const locationToAddress = await getCoordinatesFromAddress(req.body.to_address);
    const package = new Package({
        active_delivery: req.body.active_delivery,
        description: req.body.description,
        weight: req.body.weight,
        width: req.body.width,
        height: req.body.height,
        depth: req.body.depth,
        from_name: req.body.from_name,
        from_address: req.body.from_address,
        from_location: {
          lat: locationFromAddress.latitude,
          lng: locationFromAddress.longitude
        },
        to_name: req.body.to_name,
        to_address: req.body.to_address,
        to_location: {
          lat: locationToAddress.latitude,
          lng: locationToAddress.longitude
        }
    });
    const savedPackage = await package.save();
    
    res.json({code: 200, message: "package created", data: savedPackage});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to retrieve parcels details
router.get('/', async (req, res) => {
    try{
        const package = await Package.find();
        res.json({code: 200, message: "success", data: package});
    } catch(error) {
        res.status(500).json({error: error.message});
    }
});

// Endpoint to retrieve details of a specific package
router.get('/:package_id', async (req, res) => {
  try {
    const package = await Package.findById(req.params.package_id);
    res.json({code: 200, message: "success", data: package});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to delete details of a specific package
router.delete('/:package_id', async (req, res) => {
    try {
        const { package_id } = req.params;
        const deletedPackage = await Package.deleteOne({ package_id });
        if (deletedPackage) {
        res.json({code: 200, message: "Package deleted", data: deletedPackage});
          } else {
            res.status(404).json({ error: 'Package not found' });
          }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

// Endpoint to update the details of a specific package
  router.put('/:package_id', async (req, res) => {
    try {
            const { package_id } = req.params;
            const { data } = req.body;
            const package = await Package.findById(package_id);
            package.update(data);
            await package.save();
            if (package) {
                res.json({code: 200, message: "package updated", data: package});
              } else {
                res.status(404).json({ error: 'Package not found' });
              }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

module.exports = router;
