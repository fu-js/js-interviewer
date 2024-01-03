import type { NextApiRequest, NextApiResponse } from "next";

// export const runtime = 'edge' // 'nodejs' (default) | 'edge'

type ResponseData = {
  data: {
    id: number;
    name: string;
    dept: string;
    note: string;
    status: string;
  }[];
};

let pastInterviewees = [
  {
    id: 1,
    name: "Trịnh Phạm Đoan Trang",
    dept: "Ban Chuyên môn",
    note: "Đạt",
    status: "Đạt",
  },
  {
    id: 2,
    name: "Nguyễn Thị Thanh Huyền",
    dept: "Ban Chuyên môn",
    note: "Chờ",
    status: "Chờ",
  },
  {
    id: 3,
    name: "Vũ Lê Băng Tâm",
    dept: "Ban Văn hóa",
    note: "Chờ",
    status: "Chờ",
  },
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  return res.status(200).json({ data: pastInterviewees });
}
