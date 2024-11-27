const db = require("./../model");
const { calcDistance } = require("./../Utils/calcDistance");

exports.addSchool = async (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  // Validating input

  try {
    if (
      !name ||
      !address ||
      typeof latitude !== "number" ||
      typeof longitude !== "number"
    ) {
      return res.status(400).json({
        status: "success",
        message: "Enter valid fields.",
      });
    }

    const [result] = await db.query(
      "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)",
      [name, address, latitude, longitude]
    );
    if (!result) {
      return res.status(404).json({
        status: "failed",
        message: "Error in insert query",
      });
    }

    return res.status(201).json({ status: "success", id: result.insertId });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: "Database error.",
    });
  }
};

exports.listSchools = async (req, res) => {
  //fetching from parameters
  const { lat, lng } = req.params;

  if (!lat || !lng) {
    return res.status(400).json({
      status: "failed",
      message: "Latitude and longitude are required.",
    });
  }

  try {
    const [schools] = await db.query(
      "SELECT name,latitude,longitude FROM schools"
    );

    //Sorting
    const sortedSchools = schools
      .map((school) => ({
        ...school,
        distance: calcDistance(
          parseFloat(lat),
          parseFloat(lng),
          parseFloat(school.latitude),
          parseFloat(school.longitude)
        ),
      }))
      .sort((a, b) => a.distance - b.distance);

    res.status(200).json({
      status: "success",
      data: sortedSchools,
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      message: err.message,
    });
  }
};
