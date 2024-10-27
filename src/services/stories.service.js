const Story = require("../models/story.model");

exports.createStory = async (storyData) => {
  return await Story.create(storyData);
};

exports.getStories = async () => {
  return await Story.findAll();
};

exports.getStoryById = async (id) => {
  return await Story.findByPk(id);
};

exports.updateStory = async (id, storyData) => {
  const [updated] = await Story.update(storyData, { where: { id } });
  if (updated) {
    return await Story.findByPk(id);
  }
  return null;
};

exports.deleteStory = async (id) => {
  return await Story.destroy({ where: { id } });
};
