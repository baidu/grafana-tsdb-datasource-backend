# grafana-tsdb-datasource-backend

为百度的TSDB数据源插件[grafana-tsdb-datasource](https://github.com/baidu/grafana-tsdb-datasource)提供的后台代理程序。主要完成访问认证和请求代理转发的功能。
由于Grafana不支持百度云使用公钥和私钥（AK&SK）计算签名的鉴权方式，为保证用户AK和SK的安全，因此需要通过一个代理服务进行签名计算和请求转发。
# 安装

强烈建议本代理服务与Grafana服务部署在同一台机器中，并配置代理服务只能本机访问。
```
git clone <git url>
cd grafana-tsdb-datasource-backend
```
安装依赖包：
```
npm install
```
编辑 config/config.js 来配置您的秘钥信息
```
{
    app: {      
            // 如需外网访问请填写本机ip或 0.0.0.0，强烈建议您保持默认只允许本机访问。
            host: '127.0.0.1',
            port: '3333'
    },
    tsdb: {
            // write your ak&sk there
            ak: '<your ak>',
            sk: '<your sk>'
    }
}
```
直接运行使用：
```
npm run start 
```
也可以使用PM2进程管理工具启动：
```
npm install pm2 -g
npm run prd
```