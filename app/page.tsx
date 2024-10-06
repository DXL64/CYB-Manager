export default function Home() {
  return (
    <>
      <div>      
        <section id="about" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Giới thiệu</h2>
          <p className="text-gray-700 leading-relaxed">
            Trang web quản lý của Trường THPT Chuyên Nguyễn Tất Thành Yên Bái cung cấp một nền tảng hiện đại và thân thiện với người dùng, giúp nhà trường quản lý hiệu quả các hoạt động học tập và giáo dục. Đây là công cụ hỗ trợ đắc lực trong việc quản lý thông tin học sinh, giáo viên và các hoạt động ngoại khóa, giúp nâng cao chất lượng giáo dục và tạo môi trường học tập thuận lợi cho tất cả mọi người.
          </p>
        </section>

        <section id="features" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Tính năng nổi bật</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Quản lý hồ sơ học sinh và giáo viên dễ dàng.</li>
            <li>Theo dõi kết quả học tập và điểm danh của học sinh.</li>
            <li>Quản lý các sự kiện và hoạt động ngoại khóa.</li>
            <li>Tích hợp hệ thống thông báo và liên lạc với phụ huynh.</li>
            <li>Báo cáo và phân tích dữ liệu để cải tiến chất lượng giáo dục.</li>
          </ul>
        </section>

        <section id="contact" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Liên hệ</h2>
          <p className="text-gray-700 leading-relaxed">
            Địa chỉ: 123 Đường Lý Thường Kiệt, Yên Bái, Việt Nam
          </p>
          <p className="text-gray-700 leading-relaxed">
            Điện thoại: (0216) 3 456 789
          </p>
          <p className="text-gray-700 leading-relaxed">
            Email: contact@ntthighschool.edu.vn
          </p>
        </section>
      </div>
    </>
  )
}
