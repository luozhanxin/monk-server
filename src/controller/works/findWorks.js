/**
 * @description 查询作品
 */

const {
  findOneWorkService,
  findWorkListService,
} = require("../../service/works");
const { ErrorRes, SuccessRes } = require("../../res-model/index");
const {
  findOneWorkFailInfo,
  findOneWorkDbErrorFailInfo,
} = require("../../res-model/failInfo/index");
const { DEFAULT_PAGE_SIZE } = require("../../config/constant");

/**
 * 查询单个作品
 * @param {string} id id
 * @param {string} author 作者 username
 */
async function findOneWork(id, author) {
  if (!id || !author) {
    return new ErrorRes(findOneWorkFailInfo, "id 或 author 为空");
  }

  let work;
  try {
    work = await findOneWorkService({
      id,
      author,
    });
  } catch (ex) {
    console.log("查询单个作品", ex);
    return new ErrorRes(findOneWorkDbErrorFailInfo);
  }
  if (work == null) {
    return new ErrorRes(findOneWorkFailInfo, "id 或 author 不匹配");
  }
  return new SuccessRes(work);
}

/**
 * 获取自己的作品或模板
 * @param {*} author
 * @param {*} queryInfo
 * @param {*} pageInfo
 */
async function findMyWorks(author, queryInfo = {}, pageInfo = {}) {
  const { id, uuid, title, status, isTemplate } = queryInfo;

  let { pageIndex, pageSize } = pageInfo;
  pageIndex = parseInt(pageIndex, 10) || 0;
  pageSize = parseInt(pageSize, 10) || DEFAULT_PAGE_SIZE;

  const { list, count } = await findWorkListService(
    {
      id,
      uuid,
      title,
      status,
      author,
      isTemplate: isTemplate === "1",
    },
    {
      pageIndex,
      pageSize,
    }
  );
  return new SuccessRes({ list, count });
}

module.exports = {
  findOneWork,
  findMyWorks,
};
