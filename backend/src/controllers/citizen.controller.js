const Citizen = require("../models/Citizen");
const { generateFamilyId, generateMemberId } = require("../utils/generateIds");

exports.registerCitizen = async (req, res) => {
  try {
    const { fullName, dob, gender, bloodGroup, emergencyContact, address } =
      req.body;

    // Basic validation
    if (
      !fullName ||
      !dob ||
      !gender ||
      !bloodGroup ||
      !emergencyContact ||
      !address
    ) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided",
      });
    }

    const citizen = new Citizen({
      fullName,
      dob,
      gender,
      bloodGroup,
      emergencyContact,
      address,
      familyId: generateFamilyId(),
      memberId: generateMemberId(),
    });

    await citizen.save();

    return res.status(201).json({
      success: true,
      message: "Health card registered successfully",
      familyId: citizen.familyId,
      memberId: citizen.memberId,
    });
  } catch (error) {
    console.error("Registration error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Server error during registration",
    });
  }
};
exports.getCitizenByMemberId = async (req, res) => {
  try {
    const { memberId } = req.params;

    const citizen = await Citizen.findOne({ memberId }).select(
      "fullName dob bloodGroup emergencyContact memberId familyId"
    );

    if (!citizen) {
      return res.status(404).json({
        success: false,
        message: "Citizen not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: citizen,
    });
  } catch (error) {
    console.error("QR fetch error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Server error while fetching data",
    });
  }
};
