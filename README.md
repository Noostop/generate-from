# generate-from

根据文字过滤生成表格

# 添加类别菜单

``` js
// 打开src/lib/config.js
//定义蔬菜分类
export const categorys = {
  vegetable: "蔬菜",
  beef: "牛肉",
  meat: "肉类",
  poultry: "家禽",
  aquaculture: "水产",
  dryGoods: "干货",
  other: "其他",
};

export const category = {
  vegetable: ["土豆", "香菜", "小葱", "菜心", "包菜", "毛豆米", "蒜苗", "青尖椒", "大白菜", "白芹", "洋葱", "后腿肉"],
  beef: ["牛肉", "牛腩", "牛肚", "黄喉"],
  meat: ["猪脚肉", "猪脚尖", "背柳肉", "五花肉", "哨子", "精品五花肉"],
  poultry: ["鸭子", "鸡", "鹅", "大土杂鸡"],
  aquaculture: ["鲫鱼", "鲤鱼", "罗非鱼", "大头鱼", "大草鱼"],
  dryGoods: ["鸡精", "味精", "幺麻油", "香油", "花椒", "盐蛋", "咸蛋"],
  other: ["魔芋", "鸡蛋", "豆腐", "散白花"],
};

```

