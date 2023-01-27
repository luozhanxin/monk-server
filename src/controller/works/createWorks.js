const { v4: uuidV4 } = require("uuid");
const {
  createWorkService,
  findOneWorkService,
  updateWorkService,
} = require("../../service/works");

const { ErrorRes, SuccessRes } = require("../../res-model/index");

const {
  createWorkDbErrorFailInfo,
  createWorkSFailInfo,
  forceOffLineFailInfo,
} = require("../../res-model/failInfo/index");

/**
 * 创建作品
 * @param {string} author 作者 username
 * @param {object} data 作品数据
 * @param {object} content 作品内容
 */
async function createWorks(author, data = {}, content = {}) {
  const { title } = data;
  if (!title) {
    return new ErrorRes(createWorkSFailInfo, "标题不能为空");
  }
  const uuid = uuidV4().slice(0, 4);
  try {
    const newWork = await createWorkService(
      {
        ...data,
        author,
        uuid,
      },
      content
    );
    return new SuccessRes(newWork);
  } catch (ex) {
    console.log("创建作品失败", ex);
    return new ErrorRes(createWorkDbErrorFailInfo);
  }
}

/**
 * 复制作品
 * @param {string} id 作品 id
 * @param {string} author 作者 username
 */
async function copyWorks(id, author) {
  // 被复制的项目不一定是自己的，所以查询条件**不加 author**
  const work = await findOneWorkService({ id });

  // 是否强制下线
  if (parseInt(work.status, 10) === 3) {
    return new ErrorRes(forceOffLineFailInfo);
  }

  const { content } = work;
  // 新项目的信息，要符合 WorksModel 属性规则
  const newData = {
    title: `${work.title}-复制`,
    desc: work.desc,
    coverImg: work.coverImg,

    // 其他信息，如 isTemplate status 等，都不需要
  };

  // 创新新项目
  const res = await createWorks(author, newData, content);

  // 更新源项目的使用次数
  await updateWorkService(
    {
      copiedCount: work.copiedCount + 1,
    },
    { id }
  );
  return res;
}

module.exports = {
  createWorks,
  copyWorks,
};
