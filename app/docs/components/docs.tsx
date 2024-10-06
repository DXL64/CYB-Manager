import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusCircle, Pencil, Trash2, Eye, Search } from 'lucide-react'

export default function GuidePage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Hướng dẫn sử dụng Hệ thống quản lý</h1>
      
      <Tabs defaultValue="add" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="add">Thêm</TabsTrigger>
          <TabsTrigger value="edit">Chỉnh sửa</TabsTrigger>
          <TabsTrigger value="view">Xem</TabsTrigger>
          <TabsTrigger value="delete">Xóa</TabsTrigger>
          <TabsTrigger value="search">Tìm kiếm</TabsTrigger>
        </TabsList>
        
        <TabsContent value="add">
          <Card>
            <CardHeader>
              <CardTitle>Thêm Dữ liệu Mới</CardTitle>
              <CardDescription>Hướng dẫn thêm thông tin mới vào hệ thống</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>1. Nhấn vào nút <Button size="sm"><PlusCircle className="mr-2 h-4 w-4" /> Thêm thông tin</Button> ở góc trên bên phải của trang.</p>
              <p>2. Điền đầy đủ thông tin dữ liệu vào biểu mẫu xuất hiện:</p>
              <p style={{fontWeight: 'bold'}}>Học sinh</p>
              <ul className="list-disc list-inside pl-4 space-y-2">
                <li>Tải lên <strong>ảnh đại diện</strong></li>
                <li>Nhập <strong>họ và tên</strong></li>
                <li>Chọn <strong>giới tính</strong></li>
                <li>Nhập <strong>địa chỉ email</strong></li>
                <li>Nhập <strong>số điện thoại</strong></li>
                <li>Chọn <strong>môn chuyên</strong></li>
                <li>Chọn <strong>ngày sinh</strong></li>
                <li>Nhập <strong>niên khóa</strong></li>
              </ul>
              <p style={{fontWeight: 'bold'}}>Giáo viên: Tương tự</p>
              <p style={{border: '1px solid black', padding: '15px', backgroundColor: 'rgba(128, 128, 128, 0.5)', borderRadius: '8px'}}>
                <strong>Lưu ý:</strong> Giáo viện hiện nay vẫn còn tiếp tục làm việc để trống trường Kết thúc làm việc.
              </p>
              <p>3. Sau khi điền đầy đủ thông tin, nhấn nút <strong>Lưu</strong> để thêm  mới vào hệ thống.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="edit">
          <Card>
            <CardHeader>
              <CardTitle>Chỉnh sửa thông tin</CardTitle>
              <CardDescription>Cách cập nhật thông tin của dữ liệu đã có trong hệ thống</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>1. Tìm dữ liệu cần chỉnh sửa trong danh sách.</p>
              <p>2. Nhấn vào biểu tượng chỉnh sửa <Button variant="ghost" size="icon"><Pencil className="h-4 w-4" /></Button> bên cạnh thông tin dữ liệu.</p>
              <p>3. Một biểu mẫu chỉnh sửa sẽ xuất hiện với thông tin hiện tại của dữ liệu.</p>
              <p>4. Cập nhật các thông tin cần thiết.</p>
              <p>5. Nhấn Lưu để cập nhật thông tin dữ liệu trong hệ thống.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="view">
          <Card>
            <CardHeader>
              <CardTitle>Xem thông tin chi tiết</CardTitle>
              <CardDescription>Cách xem thông tin đầy đủ của một dữ liệu</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>1. Trong danh sách dữ liệu, tìm dữ liệu bạn muốn xem thông tin chi tiết.</p>
              <p>2. Nhấn vào biểu tượng xem <Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button> bên cạnh thông tin dữ liệu.</p>
              <p>3. Một cửa sổ mới sẽ hiển thị với đầy đủ thông tin của dữ liệu đó, bao gồm:</p>
              <ul className="list-disc list-inside pl-4 space-y-2">
                <li>Ảnh đại diện</li>
                <li>Họ và tên</li>
                <li>Giới tính</li>
                <li>Email</li>
                <li>Số điện thoại</li>
                <li>Ngày sinh</li>
                <li>Niên khóa</li>
                <li>Môn chuyên</li>
                <li>Các thông tin khác (nếu có)</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="delete">
          <Card>
            <CardHeader>
              <CardTitle>Xóa thông tin (Chưa hỗ trợ)</CardTitle>
              <CardDescription>Hướng dẫn xóa thông tin dữ liệu khỏi hệ thống</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>1. Tìm dữ liệu cần xóa trong danh sách.</p>
              <p>2. Nhấn vào biểu tượng xóa <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4" /></Button> bên cạnh thông tin dữ liệu.</p>
              <p>3. Một hộp thoại xác nhận sẽ xuất hiện để đảm bảo bạn không xóa nhầm.</p>
              <p>4. Nếu chắc chắn muốn xóa, nhấn Xác nhận trong hộp thoại.</p>
              <p>5. Thông tin dữ liệu sẽ được xóa khỏi hệ thống.</p>
              <p className="font-semibold text-red-500">Lưu ý: Hành động này không thể hoàn tác. Hãy chắc chắn trước khi xóa thông tin dữ liệu.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="search">
          <Card>
            <CardHeader>
              <CardTitle>Tìm kiếm thông tin</CardTitle>
              <CardDescription>Cách tìm kiếm nhanh thông tin dữ liệu trong hệ thống</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>1. Tại đầu trang, bạn sẽ thấy một ô tìm kiếm <span className="inline-flex items-center border rounded px-2 py-1"><Search className="h-4 w-4 mr-2" /> Tìm kiếm theo tên</span>.</p>
              <p>2. Nhập tên dữ liệu bạn muốn tìm vào ô tìm kiếm.</p>
              <p>3. Khi bạn gõ, hệ thống sẽ tự động lọc và hiển thị các dữ liệu có tên phù hợp với từ khóa bạn nhập.</p>
              <p>4. Kết quả tìm kiếm sẽ được cập nhật trong bảng bên dưới, hiển thị tất cả dữ liệu phù hợp với từ khóa tìm kiếm.</p>
              <p>5. Bạn có thể nhấn vào các biểu tượng hành động bên cạnh mỗi kết quả để xem chi tiết, chỉnh sửa hoặc xóa thông tin dữ liệu.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}