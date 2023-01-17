# 数据库设计
![database design](/docs/data.jpg "database")

# 数据表设计
## 用户
| 列 | 类型 | 注释 |
| :-----: | :----: | :----: |
| id | bigint | 用户 id |
| username | varchar | 用户名，唯一 |
| password | varchar | 密码，保留字段，暂时不用 |
| phoneNumber | varchar | 手机号 |
| nickName | varchar | 昵称 |
| gender | int | 性别(1 男性,2 女性, 0 保密) |
| picture | varchar | 用户头像 |
| city | varchar | 城市 |
| lasestLoginAt | date | 最后登录时间 |
| isFrozen | boolean | 用户是否冻结 |
| createdAt | date | 创建时间 |
| updatedAt | date | 更新时间 |

## 作品/模版
| 列 | 类型 | 注释 |
| :-----: | :----: | :----: |
| id | bigint | 作品 id |
| uuid | varchar | uuid, h5 url 中使用，隐藏真正的 id，避免被爬 |
| title | varchar | 标题 |
| desc | varchar | 副标题 |
| contentId | varchar | 未发布内容 id，内容存储在 mongodb 中 |
| publishContentId | varchar | 发布内容 id，内容存储在 mongodb 中，未发布的为空 |
| author | varchar | 作者 username，和用户表关联 |
| coverImg | varchar | 封面图片 url |
| isTemplate | boolean | 是否模版 |
| status | int | 状态: 0-删除 1-未发布 2-发布 3-强制下线 |
| copiedCount | int | 模版被使用次数 |
| isHot | boolean | hot 标签，模版使用 |
| isNew | boolean | new 标签，模版使用 |
| orderIndex | int | 排序参数 |
| isPublish | boolean | 模版是否公开显示 |
| createdAt | date | 创建时间 |
| updatedAt | date | 更新时间 |

## 渠道
| 列 | 类型 | 注释 |
| :-----: | :----: | :----: |
| id | bigint | 渠道 id |
| name | varchar | 渠道名称 |
| workId | int | 作品 id |
| status | int | 状态：0-删除 1-正常  |
| orderIndex | int | 排序参数 |
| createdAt | date | 创建时间 |
| updatedAt | date | 更新时间 |

## 作品内容
1. 未发布
2. 已发布
```
{
  // 页面的组件列表
  components: [Object],
  // 页面的属性，如页面背景图片
  props: Object,
  // 配置信息，如微信分享配置
  setting: Object
}
```
