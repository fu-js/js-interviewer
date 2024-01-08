import type { NextApiRequest, NextApiResponse } from "next";

// export const runtime = "edge"; // 'nodejs' (default) | 'edge'

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
  res.status(200).json({ data: mockData });
}
