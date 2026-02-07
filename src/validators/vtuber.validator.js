const Joi = require("joi");

const baseField = {
  name: Joi.string(),
  nickname: Joi.string(),
  agency: Joi.string(),
  platform: Joi.string(),
  youtube_channel: Joi.string().uri(),
  twitch_channel: Joi.string(),
  twitter_handle: Joi.string(),
  debut_date: Joi.string(),
  birthday: Joi.string(),
  character_designer: Joi.string(),
  live2d_modeler: Joi.string(),
  fanbase_name: Joi.string(),
  tags: Joi.array().items(Joi.string()),
  description: Joi.string(),
  avatar_url: Joi.string(),
  status: Joi.string().valid("active", "graduated", "hiatus"),
  graduate_date: Joi.string(),
};

const createSchema = Joi.object({
  ...baseField,
  name: Joi.string().required(),
});

const updateSchema = Joi.object({
  ...baseField,
  name: Joi.string().required(),
});

const patchSchema = Joi.object({
  ...baseField,
}).min(1);

module.exports = {
  createSchema,
  updateSchema,
  patchSchema,
};
