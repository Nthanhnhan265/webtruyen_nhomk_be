module.exports = {
  user: {
    createFailed: 'Tạo người dùng thất bại',
    createSuccess: 'Tạo người dùng thành công',
    notFound: 'Không tìm thấy người dùng',
    fetchSuccess: 'Lấy dữ liệu người dùng thành công',

    usernameExisted: 'Tên người dùng đã tồn tại',
    emailExisted: 'Email đã tồn tại',

    updateSuccess: 'Cập nhật người dùng thành công',
    updateFailed: 'Cập nhật người dùng không thành công',

    deleteSuccess: 'Xóa người dùng thành công',
    deleteFailed: 'Xóa người dùng thất bại',

    usernameRequired: 'Vui lòng nhập tên người dùng hợp lệ (1 - 255 ký tự).',
    usernameSpecialChars: 'Vui lòng nhập tên người dùng hợp lệ.',
    emailRequired: 'Vui lòng nhập email hợp lệ.',
    emailExists: 'Email đã tồn tại, vui lòng thử email khác.',
    emailLength: 'Vui lòng nhập email hợp lệ (1 - 255 ký tự).',
    passwordRequired: 'Vui lòng nhập mật khẩu hợp lệ (1 - 255 ký tự).',
    passwordStrength:
      'Mật khẩu phải bao gồm chữ thường, in hoa, số và ký tự đặc biệt (!@#$%^&*).',
    passwordsNotMatch: 'Mật khẩu không khớp.',
    passwordRepeatLength: 'Vui lòng nhập mật khẩu hợp lệ (1-255 ký tự).',
    passwordsDoNotMatch: 'Mật khẩu không khớp',
    coverImageRequired: 'Vui lòng chọn ảnh bìa cho tài khoản.',
    coverImageFormat: 'Vui lòng chọn định dạng hợp lệ.',
    coverImageSize:
      'Ảnh tải lên có kích thước lớn hơn 5 MB, vui lòng chọn ảnh có kích thước hợp lệ.',
    coverImageUploadError: 'Tải lên ảnh bìa thất bại, vui lòng thử lại sau.',
    roleNotFound: 'Vai trò được chọn không hợp lệ.',
    statusNotFound: 'Trạng thái được chọn không hợp lệ.',
    uploadError: 'Vui lòng chọn ảnh bìa cho tài khoản.',
    formatError: 'Vui lòng chọn định dạng hợp lệ (JPG, PNG, WEBP).',
    sizeError: 'Vui lòng chọn ảnh có kích thước hợp lệ (tối đa 5MB).',
    uploadFail: 'Tải lên ảnh bìa thất bại, vui lòng thử lại sau.',
  },
  auth: {
    emailRequired: 'Vui lòng nhập email',
    emailNotFound: 'Email không tồn tại',
    passwordRequired: 'Vui lòng nhập mật khẩu',
    unauthorized: 'Email hoặc mật khẩu không đúng',
    invalidToken: 'Token không hợp lệ',
    expiredToken: 'Token đã hết hạn',
    missedToken: 'Yêu cầu refresh token',
  },
  chapter: {
    createFailed: 'Tạo chương thất bại',
    createSuccess: 'Tạo chương thành công',
    notFound: 'Không tìm thấy chương',
    fetchSuccess: 'Lấy dữ liệu chương thành công',

    updateSuccess: 'Cập nhật chương thành công',
    updateFailed: 'Cập nhật chương không thành công',

    deleteSuccess: 'Xóa chương thành công',
    deleteFailed: 'Xóa chương thất bại',

    chapterNameRequired: 'Vui lòng nhập tên chương hợp lệ.',
    contentRequired: 'Nội dung chương không được để trống.',
    slugRequired: 'Slug chương không được để trống.',
    chapterOrderRequired: 'Thứ tự chương không được để trống.',
  },
  generalErrors: {
    findSuccess: 'Tìm kiếm thành công',
    notFound: 'Không tìm thấy tài nguyên',
    serverError: 'Có lỗi xảy ra',
    dataInvalid: 'Dữ liệu không hợp lệ',
    NoUpdate: 'Không có thông tin nào được cập nhật',
    invalidDataQuery: 'Dữ liệu truy vấn không hợp lệ',
  },
}
