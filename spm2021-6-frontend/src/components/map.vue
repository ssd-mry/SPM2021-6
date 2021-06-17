<template>
    <div>
        <baidu-map
                :center="center"
                :zoom="zoom"
                @ready="handler"
                class="bm-view"
                :dragging="true"
                :scroll-wheel-zoom="true">
            <!--<bm-city-list anchor="BMAP_ANCHOR_TOP_LEFT"></bm-city-list>-->
            <bm-control>
                <bm-city-list anchor="BMAP_ANCHOR_TOP_LEFT"></bm-city-list>
                <el-button type="primary" style="margin-left: 90px; margin-top: 8px" size="mini"
                           @click="dialogFormVisible = true">筛选
                </el-button>
            </bm-control>
            <div v-for="(content, index) in points" :key="index">
                <bm-marker :position="{lng:content.lng, lat: content.lat}" @click="infoWindowOpen(index)">
                    <bm-info-window :show=content.show @close="infoWindowClose(index)" @open="infoWindowOpen(index)"
                                    style="white-space: pre-wrap;">
                        经度：{{content.lng}}
                        <br/>
                        维度：{{content.lat}}
                        <br/>
                        震级：{{content.level}}
                        <br/>
                        发生时间：{{content.time}}
                    </bm-info-window>
                </bm-marker>
            </div>
        </baidu-map>

        <el-dialog title="筛选地震信息" :visible.sync="dialogFormVisible">
            <el-form :model="filter" :rules="rules" label-width="100px" ref="filter" class="demo-ruleForm">
                <el-form-item label="日期筛选" required>
                    <el-form-item prop="date">
                        <el-date-picker
                                v-model="filter.date"
                                ref="filterForm"
                                type="daterange"
                                format="yyyy-M-d"
                                value-format="yyyy-M-d"
                                style="width: 100%;"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                </el-form-item>
                <el-form-item label="震级筛选" prop="level" style="margin-top: 35px">
                    <el-input v-model.number="filter.level"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="filterData('filter', 'filter')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "map",
        data() {
            return {
                center: {lng: 0, lat: 0},
                points: [{lng: 114.220941, lat: 22.690015, show: false, level: 5.3, time: '2021/6/16  20:17'},
                    {lng: 90.220941, lat: 30.690015, show: false, level: 5.3, time: '2021/6/17  20:17'}],
                zoom: 0,
                dialogFormVisible: false,
                filter: {
                    date: '',
                },
                formLabelWidth: '120px',
                rules: {
                    date: [
                        {required: true, message: '请选择筛选的日期', trigger: 'blur'}
                    ],
                    level: [
                        {required: true, message: '筛选震级不能为空'},
                        {type: 'number', message: '筛选震级必须为数字值'}
                    ]
                }
            }
        },
        methods: {
            handler({BMap, map}) {
                console.log(BMap, map)
                this.center.lng = 116.404
                this.center.lat = 39.915
                this.zoom = 5
            },
            addPoint() {
                var submit = {}
                this.$axios({
                    method: 'post',
                    url: '/spm/basicshock/Mapmsg',
                    contentType: 'application/json; charset=UTF-8', // 解决415错误
                    headers: {'Content-Type': 'application/json;charset=UTF-8'},
                    dataType: 'json',
                    data: JSON.stringify(submit)
                }).then(res => { // 注意：后端需要返回userID
                    console.log(res.data)
                    /*var dataNum = string1.length //储存数据条数
                    for(var i=0;i<dataNum;i++){
                        var objectToInsert = JSON.parse(string1[i]);
                        that.blockContents.push(objectToInsert);
                    }*/
                }).catch(error => {
                    alert(error)
                    console.log(error)
                })
            },
            infoWindowClose(index) {
                this.points[index].show = false
            },
            infoWindowOpen(index) {
                this.points[index].show = true
            },
            remark() {
                return this.str.split('\n').join('<br/>')
            },
            filterData(type, formName) {
                var self = this
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        if (type === 'filter') {
                            var submit = {
                                'level': this.filter.level,
                                'startDate': this.filter.date[0],
                                'endDate': this.filter.date[1],
                            }
                        } else {
                            var submit = {}
                        }
                        this.$axios({
                            method: 'post',
                            url: '/spm/basicshock/Mapmsg',
                            contentType: 'application/json; charset=UTF-8', // 解决415错误
                            headers: {'Content-Type': 'application/json;charset=UTF-8'},
                            dataType: 'json',
                            data: JSON.stringify(submit)
                        }).then(res => { // 注意：后端需要返回userID
                            console.log(res.data)
                            /*var dataNum = string1.length //储存数据条数
                            for(var i=0;i<dataNum;i++){
                                var objectToInsert = JSON.parse(string1[i]);
                                that.blockContents.push(objectToInsert);
                            }*/
                        }).catch(error => {
                            alert(error)
                            console.log(error)
                        })
                        this.dialogFormVisible = false
                    }
                })
            }
        },
        mounted() {
            this.addPoint()
        }
    }
</script>

<style scoped>
    .bm-view {
        width: 100%;
        height: 700px;
    }
</style>
