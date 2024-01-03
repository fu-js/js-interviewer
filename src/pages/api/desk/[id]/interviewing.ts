import type { NextApiRequest, NextApiResponse } from "next";

// export const runtime = 'edge' // 'nodejs' (default) | 'edge'

type ResponseData = {
  data: {
    id: number;
    name: string;
    dept: string;
  };
};

const mockData = {
  name: "Trịnh Phạm Đoan Trang",
};
const fakeNames = [
  "Trịnh Phạm Đoan Trang",
  "Nguyễn Thị Hồng Hạnh",
  "Lê Thị Thanh Hằng",
  "Trần Bảo Ngọc",
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { id } = req.query;
  const fakeName = fakeNames[Number(id) - 1];
  mockData.name = fakeName;
  res.status(200).json({
    data: {
      id: 5,
      name: fakeName,
      dept: "Ban chuyên môn",
    },
  });
}
