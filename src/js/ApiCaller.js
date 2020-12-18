import axios from 'axios';

let ApiUrl = process.env.VUE_APP_ApiUrl + '/api/';
let Config = {
    headers: {
        'Content-Type': 'application/json'
    }
};

export default {
    Get_SampleGridDatas: function () { //查詢-範例Grid資料
        return new Promise(function (Resolve, Reject) {
            axios.get(ApiUrl + 'Samples', Config)
                .then(Res => {
                    Resolve(Res.data.Data);
                })
                .catch(Res => {
                    var rstData = Res == null ? null : Res.response
                    Reject(rstData);
                })
        });
    },
    Create_SampleData: function (dto) { //新增-範例資料
        return new Promise(function (Resolve, Reject) {
            axios.post(ApiUrl + 'Sample', dto, Config)
                .then(Res => {
                    Resolve(Res.data.Data);
                })
                .catch(Res => {
                    var rstData = Res == null ? null : Res.response
                    Reject(rstData);
                })
        });
    },
    Update_SampleData: function (dto) { //更新-範例資料
        return new Promise(function (Resolve, Reject) {
            axios.put(ApiUrl + 'Sample', dto, Config)
                .then(Res => {
                    Resolve(Res.data.Data);
                })
                .catch(Res => {
                    var rstData = Res == null ? null : Res.response
                    Reject(rstData);
                })
        });
    },
    Delete_SampleData: function (sampleId) { //刪除-範例資料
        return new Promise(function (Resolve, Reject) {
            axios.delete(ApiUrl + 'Sample/' + sampleId, Config)
                .then(Res => {
                    Resolve(Res.data.Data);
                })
                .catch(Res => {
                    var rstData = Res == null ? null : Res.response
                    Reject(rstData);
                })
        });
    },
};