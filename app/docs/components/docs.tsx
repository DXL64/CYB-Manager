import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusCircle, Pencil, Trash2, Eye, Search } from 'lucide-react'

export default function GuidePage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Hướng dẫn sử dụng Hệ thống Quản lý Học sinh</h1>
      
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
              <CardTitle>Thêm Học sinh Mới</CardTitle>
              <CardDescription>Hướng dẫn thêm thông tin học sinh mới vào hệ thống</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>1. Nhấn vào nút <Button size="sm"><PlusCircle className="mr-2 h-4 w-4" /> Thêm thông tin</Button> ở góc trên bên phải của trang.</p>
              <p>2. Điền đầy đủ thông tin học sinh vào biểu mẫu xuất hiện:</p>
              <ul className="list-disc list-inside pl-4 space-y-2">
                <li>Tải lên ảnh đại diện</li>
                <li>Nhập họ và tên</li>
                <li>Chọn giới tính</li>
                <li>Nhập địa chỉ email</li>
                <li>Nhập số điện thoại</li>
                <li>Chọn môn chuyên</li>
                <li>Chọn ngày sinh</li>
                <li>Nhập niên khóa</li>
              </ul>
              <p>3. Sau khi điền đầy đủ thông tin, nhấn nút "Lưu" để thêm học sinh mới vào hệ thống.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="edit">
          <Card>
            <CardHeader>
              <CardTitle>Chỉnh sửa Thông tin Học sinh</CardTitle>
              <CardDescription>Cách cập nhật thông tin của học sinh đã có trong hệ thống</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>1. Tìm học sinh cần chỉnh sửa trong danh sách.</p>
              <p>2. Nhấn vào biểu tượng chỉnh sửa <Button variant="ghost" size="icon"><Pencil className="h-4 w-4" /></Button> bên cạnh thông tin học sinh.</p>
              <p>3. Một biểu mẫu chỉnh sửa sẽ xuất hiện với thông tin hiện tại của học sinh.</p>
              <p>4. Cập nhật các thông tin cần thiết.</p>
              <p>5. Nhấn "Lưu" để cập nhật thông tin học sinh trong hệ thống.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="view">
          <Card>
            <CardHeader>
              <CardTitle>Xem Thông tin Chi tiết Học sinh</CardTitle>
              <CardDescription>Cách xem thông tin đầy đủ của một học sinh</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>1. Trong danh sách học sinh, tìm học sinh bạn muốn xem thông tin chi tiết.</p>
              <p>2. Nhấn vào biểu tượng xem <Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button> bên cạnh thông tin học sinh.</p>
              <p>3. Một cửa sổ mới sẽ hiển thị với đầy đủ thông tin của học sinh đó, bao gồm:</p>
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
              <CardTitle>Xóa Thông tin Học sinh</CardTitle>
              <CardDescription>Hướng dẫn xóa thông tin học sinh khỏi hệ thống</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>1. Tìm học sinh cần xóa trong danh sách.</p>
              <p>2. Nhấn vào biểu tượng xóa <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4" /></Button> bên cạnh thông tin học sinh.</p>
              <p>3. Một hộp thoại xác nhận sẽ xuất hiện để đảm bảo bạn không xóa nhầm.</p>
              <p>4. Nếu chắc chắn muốn xóa, nhấn "Xác nhận" trong hộp thoại.</p>
              <p>5. Thông tin học sinh sẽ được xóa khỏi hệ thống.</p>
              <p className="font-semibold text-red-500">Lưu ý: Hành động này không thể hoàn tác. Hãy chắc chắn trước khi xóa thông tin học sinh.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="search">
          <Card>
            <CardHeader>
              <CardTitle>Tìm kiếm Thông tin Học sinh</CardTitle>
              <CardDescription>Cách tìm kiếm nhanh thông tin học sinh trong hệ thống</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>1. Tại đầu trang, bạn sẽ thấy một ô tìm kiếm <span className="inline-flex items-center border rounded px-2 py-1"><Search className="h-4 w-4 mr-2" /> Tìm kiếm theo tên</span>.</p>
              <p>2. Nhập tên học sinh bạn muốn tìm vào ô tìm kiếm.</p>
              <p>3. Khi bạn gõ, hệ thống sẽ tự động lọc và hiển thị các học sinh có tên phù hợp với từ khóa bạn nhập.</p>
              <p>4. Kết quả tìm kiếm sẽ được cập nhật trong bảng bên dưới, hiển thị tất cả học sinh phù hợp với từ khóa tìm kiếm.</p>
              <p>5. Bạn có thể nhấn vào các biểu tượng hành động bên cạnh mỗi kết quả để xem chi tiết, chỉnh sửa hoặc xóa thông tin học sinh.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}