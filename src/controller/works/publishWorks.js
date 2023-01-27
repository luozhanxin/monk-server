const _ = require("lodash");
const {
  updateWorkService,
  findOneWorkService,
  updatePublishContentService,
} = require("../../service/works");
const { ErrorRes, SuccessRes } = require("../../res-model/index");
const {
  publishWorkFailInfo,
  publishWorkDbErrorFailInfo,
  forceOffLineFailInfo,
} = require("../../res-model/failInfo/index");
const { h5Origin } = require("../../config/index");
const { publishWorkClearCache } = require("../../cache/works/publish");
const { isDev } = require("../../utils/env");

/**
 *  发布项目
 * @param {string} id id
 * @param {string} author 作者
 * @param {string} isTemplate 是否设置为模版
 */
async function publishWork(id, author, isTemplate = false) {
  const work = await findOneWorkService({
    id,
    author,
  });
  if (work === null) {
    return new ErrorRes(publishWorkFailInfo, "id 或者作者不匹配");
  }

  if (parseInt(work.status, 10) === 3) {
    return new ErrorRes(forceOffLineFailInfo);
  }

  // 发布，需要更新数据
  const updateData = {
    status: 2,
    latestPublishAt: new Date(),
  };

  if (isTemplate) {
    // 发布为模版
    Object.assign(updateData, {
      isTemplate: true,
    });
  }

  let result;
  try {
    // 更新发布的内容
    const publishContentId = await updatePublishContentService(
      work.content,
      work.publishContentId
    );
    // 发布项目
    result = await updateWorkService(
      {
        publishContentId,
        ...updateData,
      },
      {
        id,
        author,
      }
    );
  } catch (ex) {
    console.error("发布作品错误", id, ex);
    return new ErrorRes(publishWorkDbErrorFailInfo);
  }

  if (!result) {
    return new ErrorRes(publishWorkFailInfo);
  }

  // 清空缓存
  publishWorkClearCache(id);

  // 返回链接
  const url = `${h5Origin}/p/${work.id}-${work.uuid}`;
  return new SuccessRes({ url });
}

module.exports = {
  publishWork,
};
