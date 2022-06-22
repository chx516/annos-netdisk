<template>
	<div>
		<el-dialog
			:modal="true"
			title="编辑数据"
			:visible.sync="tableEditBool"
			width="30%"
			:before-close="handleClose"
		>
			<el-form :model="dataEdit" label-width="150px" size="small">
				<el-form-item
          :v-if="dataEdit[item.prop]!=null"
					:label="item.label"
					:prop="item.prop"
					v-show="index != 0"
					v-for="(item, index) in this.$props.tableType[this.$props.fileType]"
					:key="index"
				>
					<el-input
						type="text"
						v-model="dataEdit[item.prop]"
					></el-input>
				</el-form-item>
				<el-form-item>
					<el-button @click="cancelEvent">取 消</el-button>
					<el-button type="primary" @click="defineEvent">确 定</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
  
</template>

<script>
export default{
  name:"DialogEdit",
  props:{
    tableEditBool:{
      require:true,
      type:Boolean
    },
    handleClose:{
      require:true
    },
    dataEdit:{
      require:true
    },
    tableType:{
      require:true
    },
    cancelEvent:{
      require:true
    },
    defineEvent:{
      require:true
    },
    fileType:{
      require:true
    }
  },
  data(){
    return{
      fromType:{}
    }
  },

  methods:{
    
  }
}
</script>
