exports.calcDistance = (lat1, lon1, lat2, lon2) => {
  const dLat = lat2 - lat1; // Difference in latitude
  const dLon = lon2 - lon1; // Difference in longitude
  return Math.sqrt(dLat * dLat + dLon * dLon) * 111;
};
