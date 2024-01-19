// 读写 YAML 文件的方法
const fs = require('fs')
const yaml = require('js-yaml')

// 读取 YAML 文件
function readYamlFile(path) {
  try {
    const file = fs.readFileSync(path, 'utf8')
    const data = yaml.load(file)
    console.log('读取 YAML 文件成功')
    return data
  } catch (error) {
    console.error(error)
  }
}

// 写入 YAML 文件
function writeYamlFile(path, data) {
  try {
    console.log('写入 YAML 文件成功')
    const yamlStr = yaml.dump(data)
    fs.writeFileSync(path, yamlStr, 'utf8')
  } catch (error) {
    console.error(error)
  }
}
module.exports = {
  readYamlFile,
  writeYamlFile
}
