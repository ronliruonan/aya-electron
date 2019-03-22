/**
 * electron模块提供的功能 是通过【命名空间】暴露出来的
 * electron.app 负责管理Electron应用程序的生命周期
 * electron.BrowserWindow类负责创建窗口
 */
const { app, BrowserWindow } = require('electron')

/**
 * 保证对window对象的全局引用
 * 如果不这么做的话，当js对象被垃圾回收时，window对象将自动关闭
 */
let win

function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 600
    })

    // 加载App的index.html
    win.loadFile('index.html')

    // 打开开发者工具
    win.webContents.openDevTools()

    // 生命周期【关闭】
    // 当window被关闭时，这个事件会触发
    win.on('closed', () => {
        // 取消引用window对象，如果你的应用支持多个窗口
        // 通常会把多个window对象存放在一个数组里面
        // 与此同时，你应该删除相应的元素
        win = null
    })
}

// 生命周期【ready】
// Electron会在初始化后，并准备创建浏览器窗口时，
// 调用这个函数
app.on('ready', createWindow)

/**
 * 当全部窗口关闭时，退出
 */
app.on('window-all-closed', () => {
    // 在macos上，除非用户使用cmd+q确认退出，
    // 否则绝大部分应用及其菜单栏会保持激活
    process.platform !== 'darwin' && app.quit()
})

app.on('activate', () => {
    // 在macos上，当单机dock图标并且没有其他窗口打开时，
    // 通常在应用程序中重新传建一个窗口
    win === null && createWindow()
})
