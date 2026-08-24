/**
 * Zalo Mini App Webhook
 * Xử lý sự kiện "rút lại sự đồng ý" / "xoá dữ liệu" mà Zalo gửi tới khi
 * người dùng thu hồi quyền trên Mini App.
 *
 * Endpoint sau khi deploy: https://<your-domain>.vercel.app/api/zalo-webhook
 */
export default function handler(req, res) {
  // Một số bước xác thực/kiểm tra endpoint có thể gọi GET trước.
  if (req.method === "GET") {
    return res.status(200).send("OK");
  }

  if (req.method === "POST") {
    try {
      console.log("[zalo-webhook] event received:", JSON.stringify(req.body));

      // TODO: bổ sung logic thật ở đây, ví dụ:
      // - Đọc user id / mini app id từ req.body
      // - Xoá / vô hiệu hoá dữ liệu người dùng tương ứng trong database của bạn
      // Xem cấu trúc payload chính xác tại trang "tại đây" trong mục
      // Thiết lập Webhook URL của Zalo Mini App console.

      return res.status(200).json({ success: true });
    } catch (err) {
      console.error("[zalo-webhook] error:", err);
      // Vẫn trả 200 để tránh Zalo đánh dấu endpoint là không hợp lệ vì lỗi tạm thời;
      // chỉ log lỗi để bạn tự kiểm tra, không throw ra ngoài.
      return res.status(200).json({ success: true });
    }
  }

  return res.status(405).send("Method Not Allowed");
}