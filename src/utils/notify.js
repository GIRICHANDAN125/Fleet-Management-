// src/utils/notify.js
module.exports = {
  sendAssignmentNotification: ({ trip, driverId, vehicleId }) => {
    console.log("NOTIFY assignment:", {
      tripId: trip._id,
      driverId,
      vehicleId,
      message: `Trip ${trip._id} assigned to driver ${driverId}`,
    });
  },

  sendStatusChangeNotification: ({ trip, status }) => {
    console.log("NOTIFY status change:", {
      tripId: trip._id,
      status,
      message: `Trip ${trip._id} status changed to ${status}`,
    });
  },
};
