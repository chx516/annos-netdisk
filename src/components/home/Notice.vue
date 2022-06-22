<template>
	<div class="notice-wrapper">
	</div>
</template>

<script>
// import { getNoticeList } from '_r/home.js'

export default {
	name: 'Notice',
	data() {
		return {
			noticeImg: require('_a/images/home/notice/noticeTip.png'),
			activeNoticeIndex: 0,
			noticeList: [],
			noticeIntervalTimer: null
		}
	},
	mounted() {
		// this.getNoticeListData()
	},
	methods: {

		setNoticeInterval() {
			this.noticeIntervalTimer = setInterval(() => {
				if (this.activeNoticeIndex < this.noticeList.length - 1) {
					this.activeNoticeIndex++
				} else {
					this.activeNoticeIndex = 0
				}
			}, 3000)
		},
	
	}
}
</script>

<style lang="stylus" scoped>
@import '~_a/styles/varibles.styl';
@import '~_a/styles/mixins.styl';

.notice-wrapper {
  background: $PrimaryHover;
  .notice-inner {
    margin: 0 auto;
    width: 1200px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .notice-img {
      margin-right: 8px;
      height: 24px;
    }
    .notice-list {
      height: 40px;
      line-height: 40px
      padding-right: 24px;
      overflow: hidden;
      flex: 1;
      list-style: none;
      .notice-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: $RegularText;
        font-size: 14px;
        cursor: pointer;
        &:hover {
          color: $Primary;
        }
        .notice-title {
          padding-right: 16px;
          setEllipsis(1)
        }
      }
    }
    .change-btn {
      ::v-deep i[class^=el-icon-] {
        font-weight: 600;
      }
    }
    .page-count {
      margin: 0 8px;
      font-size: 14px;
      color: $RegularText;
    }
  }
}
</style>
