const Route = require('../models/Route');

// Get all routes
exports.getAllRoutes = async (req, res) => {
  try {
    const routes = await Route.find();
    res.json(routes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get route by from & to cities (query: ?from=CityA&to=CityB)
exports.getRouteByCity = async (req, res) => {
  try {
    const { from, to } = req.query;

    if (!from || !to) {
      return res.status(400).json({ message: 'from and to cities are required' });
    }

    const route = await Route.findOne({
      sourceCity: from,
      destinationCity: to,
    });

    if (!route) {
      return res.status(404).json({ message: 'Route not found' });
    }

    res.json(route);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get route by ID
exports.getRouteById = async (req, res) => {
  try {
    const route = await Route.findById(req.params.id);
    if (!route) {
      return res.status(404).json({ message: 'Route not found' });
    }
    res.json(route);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create route
exports.createRoute = async (req, res) => {
  try {
    const { sourceCity, destinationCity, routePolyline, totalDistanceKm, totalDurationMin } = req.body;
    const route = new Route({ sourceCity, destinationCity, routePolyline, totalDistanceKm, totalDurationMin });
    const savedRoute = await route.save();
    res.status(201).json(savedRoute);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
