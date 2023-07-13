const express = require('express');
const router = express.Router();
const Delivery = require('../models/Delivery');
const  getCoordinatesFromAddress =  require('../location/index');


const startDelivery = (pickupTime, givenStatus) =>{

  // Convertir l'heure de ramassage en objet Date
  const pickupDateTime = pickupTime ? new Date(pickupTime) : new Date();
  const pickupHours = pickupDateTime.getHours();
  const pickupMins = pickupDateTime.getMinutes();
  const pickupSeconds = pickupDateTime.getSeconds();
  const currentTime = pickupDateTime.getHours() + 1;
  
  let deliveryStatus = givenStatus ? givenStatus : "open";

  // Calculer l'heure de début et de fin en fonction de l'heure de ramassage
  const startTime = pickupHours + ":" + pickupMins + ":" + pickupSeconds ;
  const endTime = currentTime + ":" + pickupMins + ":" + pickupSeconds ;

  
  const picked =
      { 
      start_time: startTime,
      end_time: endTime,
      status: deliveryStatus
    };
    return picked ;
}

 const createDelivery = async (params, packageId) => {
  const coordinates = await getCoordinatesFromAddress(params?.to_address);
    const status = params?.status;
  const pickedStatus = await startDelivery(params?.pickup_time, status);
    const delivery = new Delivery({
      package_id: packageId,
      pickup_time: params?.pickup_time,
      start_time: pickedStatus?.start_time,
      end_time: pickedStatus?.end_time,
      location: {
        lat: coordinates.latitude,
        lng: coordinates.longitude
      },
      status: pickedStatus?.status
    });
     await delivery.save();
     return delivery;
    
}

// Endpoint to create a new delivery
router.post('/', async (req, res) => {
  try {
    const toDoCreate = await createDelivery(req.body, req.body?.package_id);
    let message = " ";
    if (req.body?.status === "picked-up"){
      message = "package picked";
    } else if(req.body?.status === "in-transit"){
      message = "package in transit";
    }else if(req.body?.status === "delivered"){
      message = "package delivered";
    }else if(req.body?.status === "failed"){
      message = "blur, i don't known raison "
    }else {
      message = "in progress";
    }
    res.json({code: 200, message: message, data: toDoCreate});
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to retrieve details of a specific package
router.get('/:delivery_id', async (req, res) => {
  try {
    const delivery = await Delivery.findById(req.params.delivery_id);
    res.json({code: 200, message: "success", data: delivery});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to update the status of a specific delivery
router.put('/:delivery_id/status', async (req, res) => {
  try {
    const { delivery_id } = req.params;
    const { status } = req.body;
    const updatedDelivery = await Delivery.findOneAndUpdate({ delivery_id }, { status }, { new: true });
    res.json({code: 200, message: "status updated", data: updatedDelivery});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = { createDelivery };
module.exports = router;
