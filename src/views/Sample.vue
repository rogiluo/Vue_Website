<template>
  <div>
    <b-card v-if="TableArg.Items">
      <font slot="header">
        <b-row>
          <b-col align-self="center">
            <i class="fa fa-file-text-o"></i> 查詢結果
          </b-col>
          <b-col style="text-align:right">
            <b-button variant="success" v-b-modal="'Create'">
              <i class="fa fa-plus"></i> 新增
            </b-button>
          </b-col>
        </b-row>
      </font>
      <b-row>
        <b-col md="12">
          <b-table
            :hover="true"
            :striped="true"
            :bordered="true"
            :items="TableArg.Items"
            :fields="TableArg.Fields"
            :current-page="TableArg.CurrentPage"
            :per-page="TableArg.PerPage"
          >
            <template v-slot:cell(Actions)="row">
              <b-button variant="info" v-b-modal="'Edit'" @click="SelectItem(row.item)">
                <i class="fa fa-pencil-square-o"></i> 編輯
              </b-button>&nbsp;
              <b-button variant="danger" v-b-modal="'Delete'" @click="SelectItem(row.item)">
                <i class="fa fa-trash-o"></i> 刪除
              </b-button>
            </template>
          </b-table>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="4">
          <b-pagination
            :total-rows="TableArg.Items.length"
            :per-page="TableArg.PerPage"
            v-model="TableArg.CurrentPage"
          />
        </b-col>
        <b-col sm="8" class="text-right">
          <strong style="font-size:16px;">總筆數：{{ TableArg.Items.length }} 筆</strong>
        </b-col>
      </b-row>
    </b-card>
    <b-modal
      id="Create"
      header-bg-variant="success"
      body-bg-variant="light"
      headerClass="p-2"
      footerClass="p-2"
      centered
      no-close-on-backdrop
      v-if="SelectedItem"
    >
      <template slot="modal-header" class="p-2">
        <font>
          <i class="fa fa-plus"></i> 新增
        </font>
      </template>
      <b-row>
        <b-col md="2.5" class="p-2">
          <font style="font-weight:bold;">名字：</font>
        </b-col>
        <b-col md="9" class="p-2">
          <b-form-input v-model="AddArg.Name"></b-form-input>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="2.5" class="p-2">
          <font style="font-weight:bold;">性別：</font>
        </b-col>
        <b-col md="9" class="p-2">
          <b-form-input v-model="AddArg.Gender"></b-form-input>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="2.5" class="p-2">
          <font style="font-weight:bold;">電子郵件：</font>
        </b-col>
        <b-col md="9" class="p-2">
          <b-form-input v-model="AddArg.Email"></b-form-input>
        </b-col>
      </b-row>
      <template slot="modal-footer" slot-scope="{ ok, cancel }">
        <b-button variant="success" @click="ok();Create();">
          <i class="fa fa-check"></i> 確認
        </b-button>
        <b-button @click="cancel();">
          <i class="fa fa-close"></i> 取消
        </b-button>
      </template>
    </b-modal>
    <b-modal
      id="Edit"
      header-bg-variant="info"
      body-bg-variant="light"
      headerClass="p-2"
      footerClass="p-2"
      centered
      no-close-on-backdrop
      v-if="SelectedItem"
    >
      <template slot="modal-header" class="p-2">
        <font>
          <i class="fa fa-pencil-square-o"></i> 編輯
        </font>
      </template>
      <b-row>
        <b-col md="2.5" class="p-2">
          <font style="font-weight:bold;">名字：</font>
        </b-col>
        <b-col md="9" class="p-2">
          <b-form-input v-model="SelectedItem.Name"></b-form-input>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="2.5" class="p-2">
          <font style="font-weight:bold;">性別：</font>
        </b-col>
        <b-col md="9" class="p-2">
          <b-form-input v-model="SelectedItem.Gender"></b-form-input>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="2.5" class="p-2">
          <font style="font-weight:bold;">電子郵件：</font>
        </b-col>
        <b-col md="9" class="p-2">
          <b-form-input v-model="SelectedItem.Email"></b-form-input>
        </b-col>
      </b-row>
      <template slot="modal-footer" slot-scope="{ ok, cancel }">
        <b-button variant="info" @click="ok();Update();">
          <i class="fa fa-check"></i> 確認
        </b-button>
        <b-button @click="cancel()">
          <i class="fa fa-close"></i> 取消
        </b-button>
      </template>
    </b-modal>
    <b-modal
      id="Delete"
      header-bg-variant="danger"
      body-bg-variant="light"
      headerClass="p-2"
      footerClass="p-2"
      centered
      no-close-on-backdrop
      size="sm"
      v-if="SelectedItem"
    >
      <template slot="modal-header">
        <font>
          <i class="fa fa-trash-o"></i> 刪除
        </font>
      </template>
      <font>確認刪除?</font>
      <template slot="modal-footer" slot-scope="{ ok, cancel }">
        <b-button variant="danger" @click="ok();Delete();">
          <i class="fa fa-check"></i> 確認
        </b-button>
        <b-button @click="cancel()">
          <i class="fa fa-close"></i> 取消
        </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      TableArg: {
        Fields: [
          {
            key: "SampleId",
            label: "ID",
            sortable: true,
            thClass: "table-info",
            thStyle: { width: "5% !important" },
            class: "text-center align-middle"
          },
          {
            key: "Name",
            label: "名字",
            sortable: true,
            thClass: "table-info",
            thStyle: { width: "10% !important" },
            class: "text-center align-middle"
          },
          {
            key: "Gender",
            label: "性別",
            sortable: true,
            thClass: "table-info",
            thStyle: { width: "10% !important" },
            class: "text-center align-middle"
          },
          {
            key: "Email",
            label: "電子郵件",
            sortable: true,
            thClass: "table-info",
            thStyle: { width: "10% !important" },
            class: "text-center align-middle"
          },
          {
            key: "CreTime",
            label: "建立時間",
            sortable: true,
            thClass: "table-info",
            thStyle: { width: "10% !important" },
            class: "text-center align-middle"
          },
          {
            key: "Actions",
            label: "維護功能",
            thClass: "table-success",
            thStyle: { width: "20% !important" },
            class: "text-center align-middle"
          }
        ],
        Items: null,
        CurrentPage: 1,
        PerPage: 10
      },
      AddArg: {
        Name: null,
        Gender: null,
        Email: null
      },
      SelectedItem: null
    };
  },
  created: function() {
    this.Query();
  },
  methods: {
    Query: function() {
      var loading = this.$loading.show();
      this.$ApiCaller
        .Get_SampleGridDatas(this.QueryArg)
        .then(res => {
          loading.hide();
          this.TableArg.Items = res;
        })
        .catch(res => {
          loading.hide();
          alert("異常");
        });
    },
    Create: function() {
      var loading = this.$loading.show();
      this.$ApiCaller
        .Create_SampleData(this.AddArg)
        .then(res => {
          loading.hide();
          this.Query();
        })
        .catch(res => {
          loading.hide();
          alert("異常");
        });
    },
    Update: function() {
      var loading = this.$loading.show();
      this.$ApiCaller
        .Update_SampleData(this.SelectedItem)
        .then(res => {
          loading.hide();
          this.Query();
        })
        .catch(res => {
          loading.hide();
          alert("異常");
        });
    },
    Delete: function() {
      var loading = this.$loading.show();
      this.$ApiCaller
        .Delete_SampleData(this.SelectedItem.SampleId)
        .then(res => {
          loading.hide();
          this.Query();
        })
        .catch(res => {
          loading.hide();
          alert("異常");
        });
    },
    SelectItem: function(Item) {
      this.SelectedItem = Item;
    }
  }
};
</script>