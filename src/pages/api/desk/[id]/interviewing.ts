import type { NextApiRequest, NextApiResponse } from "next";

// export const runtime = 'edge' // 'nodejs' (default) | 'edge'

type ResponseData = {
  data: {
    id: number;
    name: string;
    dept: string;
    metadata: {
      title: string;
      content: string;
    }[];
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
      metadata: [
        { title: "Mã số sinh viên:", content: "HE190182" },
        {
          title: "Link Facebook:",
          content: "https://www.facebook.com/viet.buiquoc.284?mibextid=ZbWKwL",
        },
        {
          title: "Chuyên ngành học của bạn là gì?",
          content: "Công nghệ thông tin",
        },
        {
          title: "Bạn hãy miêu tả bản thân bằng 3 từ:",
          content: "Thích Nhật Bản",
        },
        {
          title:
            "Bạn có sở thích hay tài năng đặc biệt nào không? Đừng ngần ngại khoe với chúng mình những thế mạnh hay tài lẻ của bạn nhé, biết đâu đó là những điểm cộng rất lớn đấy!",
          content:
            "Mình khá thích Nhật, nếu không vì bác Yên mất giá là mình đi rồi 😥",
        },
        {
          title: "Lý do bạn muốn tham gia vào JS Club là gì?",
          content: "Học hỏi là chính, kiếm drl là phụ :3",
        },
        {
          title:
            "Bạn có thể gửi chúng mình 1 tấm ảnh của mình ở bên dưới để chúng mình có thể dễ dàng nhận ra bạn được không?",
          content:
            "https://drive.google.com/open?id=132Ulu02ssMrSDCzZv74-OP7ci-Ad9iTl",
        },
        { title: "Bạn muốn ứng tuyển vào ban nào", content: "Ban Chuyên môn" },
        {
          title:
            "Tại sao bạn lại lựa chọn trở thành thành viên ban Chuyên môn? Điều gì khiến bạn cảm thấy phù hợp tại vị trí này?",
          content: "Mình học CNTT và cũng có biết 1 chút tiếng Nhật",
        },
        {
          title: "Bạn muốn đăng ký ban chuyên môn chuyên về mảng gì nhỉ?",
          content: "Cả 2",
        },
        {
          title:
            "Cho chúng mình biết nhiều hơn và chi tiết hơn những kinh nghiệm và kỹ năng bạn có nhé",
          content: "Từng học xong N4 (từ năm lớp 10 😥)",
        },
      ],
    },
  });
}
