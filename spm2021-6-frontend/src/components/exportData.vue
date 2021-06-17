<template>
    <div>
        <div class="container">
            <h2>选择导出的数据类型</h2>
            <el-row>
                <!--<h2>选择导出的文件类型</h2>-->
                <el-select v-model="value" placeholder="请选择" style="margin-left: 20px">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <el-button type="primary" style="margin-left: 20px" :disabled="value === ''?true:false" @click="download">下 载</el-button>
            </el-row>
            <br>
            <el-row style="width: 30%; margin-left: -50px;">
                <div>
                    <div style="text-indent: 2em" v-if="percentageNum > 0">
                        <el-progress :text-inside="true" :stroke-width="15" :percentage="percentageNum"
                                     status="success"></el-progress>
                    </div>
                </div>
            </el-row>
        </div>
    </div>
</template>

<script>
    import FileSaver from 'file-saver'
    export default {
        name: "exportData",
        data() {
            return {
                percentageNum: 0,
                options: [{
                    value: '基本震情',
                    label: '基本震情'
                }, {
                    value: '房屋损坏',
                    label: '房屋损坏'
                }, {
                    value: '生命线',
                    label: '生命线'
                }, {
                    value: '人员伤亡',
                    label: '人员伤亡'
                }, {
                    value: '预测',
                    label: '预测'
                }, {
                    value: '次生灾害',
                    label: '次生灾害'
                }],
                value: ''
            }
        },
        methods: {
            download() {
/*                var that = this;
                var submit = { // JSON数据    名称-值对
                    type: this.value,
                }
                this.$axios({
                    method: 'post',
                    url: '/spm/data/downData',
                    contentType: 'application/json; charset=UTF-8', // 解决415错误
                    headers: {'Content-Type': 'application/json;charset=UTF-8;application/octet-stream'},
                    dataType: 'json',
                    data: JSON.stringify(submit),
                    responseType: 'arraybuffer',
                    onDownloadProgress(progress) {
                        that.percentageNum = (progress.loaded / that.size) * 100
                    }
                }).then((res) => {
                    if (!res) {
                        this.$message.error("下载文件失败");
                        return false;
                    }
                    console.log(res)
                    //const blob = new Blob([res.data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'});
                    const blob = new Blob([res.data])
                    const downloadElement = document.createElement('a');
                    const href = window.URL.createObjectURL(blob);

                    let contentDisposition = res.headers['content-disposition'];  //从response的headers中获取filename, 后端response.setHeader("Content-disposition", "attachment; filename=xxxx.docx") 设置的文件名;
                    let patt = new RegExp("filename=([^;]+\\.[^\\.;]+);*");
                    let result = patt.exec(contentDisposition);
                    let filename = decodeURI(result[1]);
                    downloadElement.style.display = 'none';
                    downloadElement.href = href;
                    //window.open(href)
                    downloadElement.download = filename; //下载后文件名
                    document.body.appendChild(downloadElement);
                    downloadElement.click(); //点击下载
                    document.body.removeChild(downloadElement); //下载完成移除元素
                    window.URL.revokeObjectURL(href); //释放掉blob对象
                    if (that.percentageNum === 100) {
                        this.$message({
                            message: '文件' + filename + '下载完成！',
                            type: 'success'
                        });
                        that.percentageNum = 0
                    } else {
                        this.$message.error('文件下载失败！');
                        that.percentageNum = 0
                    }
                }).catch(error => {
                    alert(error)
                    console.log(error)
                    that.percentageNum = 0
                })*/
                var self = this
                var submit = { // JSON数据    名称-值对
                    type: this.value,
                }
                this.$axios({
                    method: 'post',
                    url: '/spm/data/downData',
                    contentType: 'application/json; charset=UTF-8', // 解决415错误
                    headers: {'Content-Type': 'application/json;charset=UTF-8'},
                    dataType: 'json',
                    data: JSON.stringify(submit),
                }).then((res) => {
                    if (!res) {
                        this.$message.error("下载文件失败");
                        return false;
                    }
                    else{
                        const data = JSON.stringify(res.data)
                        const blob = new Blob([data], {type: ''})
                        FileSaver.saveAs(blob, 'export_file_'+self.value+'.json')
                    }
                })
                this.dialogFormVisible = false
            }
        }
    }
</script>

<style scoped>
    .container {
        display: flex;
        /*垂直居中 */
        align-items: center;
        /*水平居中*/
        justify-content: center;
        /*text-align: justify;*/
        margin: 0 auto;
        height: 700px;
        flex-direction: column
    }

    /*    .container {
            margin: 5px 40px 0px 10px;
            align-items: center;
            width: 90%;
            padding: 40px;
            display: inline-grid;
        }*/
</style>
