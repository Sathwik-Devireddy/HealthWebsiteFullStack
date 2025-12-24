const generateFamilyId = () => {
  return `FAM-${Math.floor(1000 + Math.random() * 9000)}`;
};

const generateMemberId = () => {
  return `MEM-${Date.now().toString().slice(-5)}`;
};

module.exports = {
  generateFamilyId,
  generateMemberId,
};
