class UploadController extends Controller {
  async upload() {
    const { ctx } = this
    console.log(ctx.request.body)
    console.log('got %d files', ctx.request.files.length)

    try {
      // 遍历处理多个文件
      for (const file of ctx.request.files) {
        console.log('field: ' + file.fieldname)
        console.log('filename: ' + file.filename)
        console.log('encoding: ' + file.encoding)
        console.log('mime: ' + file.mime)
        console.log('tmp filepath: ' + file.filepath)

        // 处理文件，比如上传到云端
        const result = await ctx.oss.put(
          'egg-multipart-test/' + file.filename,
          file.filepath
        )
        console.log(result)
      }
    } finally {
      // 需要删除临时文件
      await ctx.cleanupRequestFiles()
    }
  }
}
