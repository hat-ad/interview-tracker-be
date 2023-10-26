const { db } = require("../../NOSQL/database/connection");

exports.createEntry = async (body) => {
  const blog = await db.Table.create(body);
  return blog;
};

exports.getEntries = async (query) => {
  const tables = await db.Table.find(query).populate("createdBy");
  return tables;
};

exports.countEntries = async (query) => {
  const tables = await db.Table.count(query);
  return tables;
};

exports.updateEntry = async (id, body) => {
  const blog = await db.Table.findByIdAndUpdate(id, { ...body }, { new: true });
  return blog;
};

exports.deleteEntry = async (id) => {
  const blog = await db.Table.deleteOne({ _id: id });
  return blog;
};
