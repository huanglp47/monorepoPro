# monorepoPro

项目使用pnpm + workspace + changesets

项目vue-admin[packages\vue-admin]
```
pnpm install
pnpm dev
pnpm build
```
目录说明：
```
api: packages/api, axios相关；
components: packages/components,公用组件demo；
utils: 公用方法，npm仓库：@pense/utils
```

##### Changesets
Changesets是一个用于 Monorepo 项目下版本以及 Changelog 文件管理的工具
管理包的version和生成changelog
```
pnpm add -Dw @changesets/cli
pnpm changeset init
// 会生成一个 changeset 的 config 文件

changeset publish
CHANGELOG 描述不同的 changeset 文件
```