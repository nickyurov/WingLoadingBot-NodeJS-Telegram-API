const ratioKG = 0.4536
const equipmentWeight = 10

// Calculate total weight with equipment
exports.totalWeight = function(weight) {
  return ((weight + equipmentWeight) / ratioKG)
}
// Calculate wing loading
exports.load = function(weight, size) {
  return (weight / size)
}