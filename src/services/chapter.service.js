const Chapter = require("../models/chapter.model");

exports.createChapter = async (chapterData) => {
  return await Chapter.create(chapterData);
};

exports.getChapters = async (limit, offset) => {
  console.log("service limit ", limit);
  console.log("service offset ", offset);
  return await Chapter.findAndCountAll({
    limit,
    offset,
  });
};
exports.getChapterById = async (id) => {
  return await Chapter.findByPk(id);
};
exports.getChapterBySlug = async (slug) => {
  return await Chapter.findOne({ where: { slug: slug } });
};

exports.updateChapter = async (id, chapterData) => {
  const [updated] = await Chapter.update(chapterData, {
    where: { id },
  });
  if (updated) {
    return await Chapter.findByPk(id);
  }
  return null;
};

exports.deleteChapter = async (id) => {
  return await Chapter.destroy({ where: { id } });
};
