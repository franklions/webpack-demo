var WebConfig = {
	//服务器地址
	cloudUrl: "http://cfmplatapi-dev.united-iot.com/api/platform/",
	//cloudUrl : "http://127.0.0.1:8086/api/platform/",
	//cloudUrl : "http://192.168.12.23:8081/api/platform/",
	//跳转前部分地址
	path: "/#",
	// 未记住密码cookie保存时间
	loginStateTimeout: 20 * 60 * 1000,
	// 记住密码cookie保存时间
	isRememberLoginStateTimeout: 7 * 24 * 60 * 60 * 1000,
	//上传图片文件配置
	fileMaxSize : 1024 * 1024 * 5,
	postfixArr: ["jpeg", "jpg", "gif", "bmp", "png"],
	//表格显示项数配置
	tableSize : 10,
	

}
export default WebConfig