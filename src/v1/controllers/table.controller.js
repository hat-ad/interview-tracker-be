const { OK, ERROR } = require("../../../utils/responseHelper");
const TableService = require("../services/table.services");

exports.createEntry = async (req, res) => {
  try {
    const { userCode } = req.payload;
    console.log(userCode);
    const { name, status, feedback, rating } = req.body;
    const entry = await TableService.createEntry({
      name,
      status,
      feedback,
      rating,
      userCode,
    });
    await entry.save();
    return OK(res, entry, "Entry Created Successfully!");
  } catch (error) {
    return ERROR(res, null, error.message || "Something went Wrong");
  }
};

exports.getEntries = async (req, res) => {
  try {
    const { userCode } = req.payload;
    const entries = await TableService.getEntries({ userCode });

    if (entries.length) return OK(res, entries, "Entries Found Successfully!");
    else return OK(res, [], "No entries found!");
  } catch (error) {
    return ERROR(res, null, error.message || "Something went Wrong");
  }
};

exports.updateEntry = async (req, res) => {
  try {
    const { name, status, feedback, rating } = req.body;
    const { id } = req.params;

    const body = {};
    if (name) body.name = name;
    if (status) body.status = status;
    if (feedback) body.feedback = feedback;
    if (rating) body.rating = rating;

    const entryCount = await TableService.countEntries({
      _id: id,
    });

    if (entryCount) {
      const updatedEntry = await TableService.updateEntry(id, body);
      return OK(res, updatedEntry, "Entry updated Successfully!");
    }

    return ERROR(res, null, "No entry found!");
  } catch (error) {
    return ERROR(res, null, error.message || "Something went Wrong");
  }
};

exports.deleteEntry = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await TableService.deleteEntry(id);

    if (blog.acknowledged) {
      return OK(res, null, "Entry deleted Successfully!");
    }
    return ERROR(res, null, "Failed to delete entry!");
  } catch (error) {
    return ERROR(res, null, error.message || "Something went Wrong");
  }
};
