const strRule = {
  type: "string",
  maxLength: 255,
};

const workInfoSchema = {
  type: "object",
  required: ["title"],
  properties: {
    title: strRule,
    desc: strRule,
    coverImg: strRule,
    contentId: strRule,

    // 符合 WorkModel 属性
    content: {
      type: "object",
      properties: {
        _id: strRule,
        components: {
          type: "array",
        },
        props: {
          type: "object",
        },
        setting: {
          type: "object",
        },
      },
    },
  },
};

module.exports = {
  workInfoSchema,
};
