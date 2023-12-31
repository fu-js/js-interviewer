import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  data: {
    id: number;
    name: string;
  }[];
};

const mockData = [
  {
    id: 1,
    name: "Bàn chuyên môn 1",
  },
  {
    id: 2,
    name: "Bàn chuyên môn 2",
  },
  {
    id: 3,
    name: "Bàn văn hoá 1",
  },
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  setTimeout(() => {
    res.status(200).json({ data: mockData });
  }, 600);
}
