// const express = require('express');
// const router = express.Router();
// const controller = require('../controllers/route.controller');

// // GET /api/routes - return all routes
// router.get('/', controller.getAllRoutes);

// // GET /api/routes/search?from=CityA&to=CityB - find by cities
// router.get('/search', controller.getRouteByCity);

// // GET /api/routes/:id - get route by ID
// router.get('/:id', controller.getRouteById);

// // POST /api/routes - create a new route
// router.post('/', controller.createRoute);

// module.exports = router;
const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { start, end } = req.query;

    // 1️⃣ Geocode START
    const sGeo = await axios.get(
      "https://nominatim.openstreetmap.org/search",
      {
        params: { q: start, format: "json", limit: 1 },
        headers: { "User-Agent": "fleet-app" },
      }
    );

    // 2️⃣ Geocode END
    const eGeo = await axios.get(
      "https://nominatim.openstreetmap.org/search",
      {
        params: { q: end, format: "json", limit: 1 },
        headers: { "User-Agent": "fleet-app" },
      }
    );

    if (!sGeo.data[0] || !eGeo.data[0]) {
      return res.status(400).json({ error: "Invalid locations" });
    }

    const sLat = sGeo.data[0].lat;
    const sLng = sGeo.data[0].lon;
    const eLat = eGeo.data[0].lat;
    const eLng = eGeo.data[0].lon;

    // 3️⃣ OSRM ROUTE
    const routeRes = await axios.get(
      `https://router.project-osrm.org/route/v1/driving/${sLng},${sLat};${eLng},${eLat}`,
      { params: { overview: "full", geometries: "geojson" } }
    );

    res.json(routeRes.data);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Route failed" });
  }
});

module.exports = router;
