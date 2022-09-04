import { utils, writeFile } from "xlsx";
import { useState } from "react";
import { useGetFilter } from "./hook/useGetFilter";
import dayjs from "dayjs";

dayjs.locale("zh-cn");

function App() {
  const [input, setInput] = useState("");

  const listData = useGetFilter(input);

  const handleChange = (e) => setInput(e.target.value);

  const handleClick = async () => {
    let worksheet = utils.json_to_sheet([], {});
    let subtotal = 1;
    const generateTable = (data) => {
      // 添加数据导表格
      const addDataForTabele = (index = "A1", list) => {
        utils.sheet_add_json(
          worksheet,
          [
            {
              category: `消防 ${dayjs().format("MM.DD")} 配送单`,
              index: "",
              title: "",
              quantity: "",
              unit: "",
              note: "",
            },
            {
              category: "分类",
              index: "序号",
              title: "产品名称",
              quantity: "数量",
              unit: "单位",
              note: "备注",
            },
            ...list,
          ],
          {
            skipHeader: true,
            origin: index,
          }
        );
      };

      if (data.length > 1) {
        addDataForTabele(`A${subtotal}`, data);
        subtotal = data.length + subtotal + 2;

        if (!worksheet["!merges"]) worksheet["!merges"] = [];
        //合并标题
        worksheet["!merges"].push(
          utils.decode_range(
            `A${subtotal - data.length - 2}:F${subtotal - data.length - 2}`
          )
        );
        //合并类别
        worksheet["!merges"].push(
          utils.decode_range(`A${subtotal - data.length}:A${subtotal - 1}`)
        );
      }
    };

    for (const key in listData) {
      if (Object.hasOwnProperty.call(listData, key)) {
        generateTable(listData[key]);
      }
    }

    // // //创建表格
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, "merges");

    /* create an XLSX file and try to save to Presidents.xlsx */
    writeFile(workbook, `消防${dayjs().format("MM-DD")}配送单.xlsx`, {
      Props: {
        Title: "蔬菜菜单",
        Subject: "批发菜单列表",
        Author: "延顺",
      },
    });
  };

  return (
    <div className="container mx-auto">
      <div className="min-h-screen p-4 grid gap-5 grid-cols-1 md:grid-cols-2">
        <div className="h-full rounded-lg border-1 border-violet-600 shadow-lg bg-violet-100">
          <div className="p-4">
            <h3 className="text-2xl font-semibold py-2">菜单输入</h3>
            <textarea
              className="w-full h-60 border-violet-300 focus:ring focus:ring-violet-500 rounded-lg"
              name="message"
              id="message"
              onChange={handleChange}
              defaultValue=""
            ></textarea>
            <div className="mt-4 text-right">
              <button
                onClick={handleClick}
                className="bg-violet-500 hover:bg-violet-600 focus:outline-none focus:ring focus:ring-violet-300 active:bg-violet-700 px-10 py-4 text-lg leading-5 rounded-full font-semibold text-white"
              >
                生成
              </button>
            </div>
            <div className="mt-4">
              <div className="w-full h-40">
                <textarea
                  className="w-full h-full border-violet-600 focus:ring focus:ring-violet-500 rounded-lg"
                  defaultValue="土豆两百八十斤，香菜一斤，小葱两斤，菜心七斤，包菜七斤，牛肉十斤，猪脚尖三斤，背篓肉三斤，鸭子三个，鲫鱼六条，鸡精十包，藤椒油两瓶，魔芋五斤，鸡蛋两板，牛腩五斤，鹅两斤，哨子两斤"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
        <div
          className="h-60 md:h-96 overflow-y-auto rounded-lg border-1 border-indigo-500 shadow-lg bg-slate-300"
        >
          <div className="p-4">{JSON.stringify(listData)}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
