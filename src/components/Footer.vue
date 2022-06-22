<template>
	<div class="footer-wrapper">
		<div class="copy-right-wrapper">
		</div>
	</div>
</template>

<script>
// import { getParamsDetail } from '_r/home.js'

export default {
	name: 'Footer',
	data() {
		return {
			logoUrl: require('_a/images/common/logo_footer.png'),
			webSiteName: '网站名称XXX',
			licenseNo: '备案号XXX',
			joinList: []
		}
	},
	computed: {
		copyrightYear() {
			return new Date().getFullYear()
		}
	},
	created() {
		// this.getParamsDetailData()
	},
	methods: {
		/**
		 * 获取系统参数信息
		 */
		// getParamsDetailData() {
		// 	getParamsDetail({ groupName: 'copyright' }).then((res) => {
		// 		if (res.success) {
		// 			this.licenseNo = res.data.licenseKey || '备案号XXX'
		// 			this.webSiteName = res.data.domainChineseName || '网站名称XXX'
		// 		}
		// 	})
		// }
	}
}
</script>

<style lang="stylus" scoped>
@import '~_a/styles/varibles.styl';

.footer-wrapper {
  margin-top: 20px;
  display: flex;

  .copy-right-wrapper {
    width: 100%;
    color: $BorderLight;
    background: linear-gradient(to right, $Primary, #66b1ff);
    padding: 16px 0 16px 5vw;
    font-size: 14px;
    color: $BorderLight;
    display: flex;
    align-items: center;

    .logo {
      width: 240px;
      display: block;
      @media screen and (max-width: 920px) {
        width: 160px;
      }
    }

    .split {
      margin: 0 8px;
    }

    .link {
      &:hover {
        text-decoration: underline;
      }
    }

    .tip-website {
      padding-top: 8px;
    }
  }

  .join-us {
    background: linear-gradient(to right, $Placeholder, $Info);
    width: 35%;
    padding: 16px 5vw 16px 40px;
    color: #fff;

    .join-list {
      margin-top: 16px;
      display: flex;
      list-style: none;

      .join-item {
        .iconfont {
          margin-right: 16px;
          font-size: 30px;
          cursor: pointer;
        }

        .qq {
          &:hover {
            color: $Primary;
          }
        }

        .wechat {
          &:hover {
            color: $Success;
          }
        }

        .gitee {
          &:hover {
            color: #c71d24;
          }
        }
      }
    }
  }
}
</style>
