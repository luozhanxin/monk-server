# 接口设计
包含 B 端，用户注册，作品管理，模版，编辑器，单个作品的内容获取，修改，预览和发布
接口统一输出格式
```
{
    errno: 0, // 错误码，无错误则返回 0
    data: {...} // 或者 [...]
    message: 'xxx'
}
```
## 用户信息
### 获取手机短信验证码
### 登录(包含注册)
### 获取用户信息

## 作品管理
### 创建空白作品
### 复制作品（通过模版创建）
### 删除作品
### 恢复作品
### 转增作品
### 我的作品列表（搜索，分页）
### 我的回收站列表（搜索，分页）

## 模版
### 首页推荐模版列表（搜索，分页)--不需要登录校验
### 获取单个模版--不需要登录校验
### 我的模版列表（搜索，分页）

## 编辑器 
### 查询单个作品信息
### 保存作品
### 预览作品
### 发布作品
### 发布为模版

## 渠道
### 创建渠道
### 删除渠道
### 修改渠道名称
### 获取单个作品的所有渠道

## 工具类
### 上传图片
