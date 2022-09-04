import { useMemo } from "react";
import chineseToNumber from "../lib/chineseToNumber";
import { category, categorys } from "../lib/config";

export function useGetFilter(input) {
  let categoryNew = {
    vegetable: [],
    beef: [],
    meat: [],
    poultry: [],
    aquaculture: [],
    dryGoods: [],
    other: [],
  };

  return useMemo(() => {
    // 过滤特殊字符
    const emptyUtiData = input
      .replace(
        /[`~!@#_$%^&*()=|{}':;'\\\[\\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。、？\s]/g,
        ""
      )
      .replace(/,|，/g, ",")
      .split(",");

    // 分离标题和单位
    emptyUtiData.map((item, index) => {
      let temp = item;
      const quantityChinese = item
        ?.match(/[一二两三四五六七八九十百千万]+/g)
        ?.flat()
        ?.toString();

      if (quantityChinese !== undefined) {
        const unit = temp.slice(-1);
        const title = temp.slice(0, temp.indexOf(quantityChinese));
        const quantity = chineseToNumber(quantityChinese);
        const pushDate = (key, data) => categoryNew[key].push({ category: categorys[key], index: categoryNew[key].length + 1, ...data });

        for (const key in category) {
          if (Object.hasOwnProperty.call(category, key)) {
            const element = category[key];
            element.map((item) => (item === title ? pushDate(key, { title, quantity, unit }) : ""));
          }
        }
      }
    });

    return categoryNew;
  }, [input]);
}
