import hotelModel from "../models/hotelModel.js";

const changeAvailability = async (req, res) => {
  try {
    const { roomId } = req.body;

    const roomData = await hotelModel.findById(roomId);
    await hotelModel.findByIdAndUpdate(roomId, {
      available: !roomData.available,
    });
    res.json({ success: true, message: "Availability Changed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { changeAvailability };
