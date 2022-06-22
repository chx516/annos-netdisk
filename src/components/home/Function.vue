<template>
	<div class="function-wrapper">
		<div class="function-title">功能介绍</div>
		<ul class="function-list">
			<li
				class="function-item"
				v-for="(item, index) in functionList"
				:key="index"
			>
				<div
					class="function-link"
					title="查看说明文档"
					target="_blank"
				>
					<div class="img-wrapper">
						<img class="img" :src="item.icon" />
					</div>
					<div class="content">
						<h3 class="title">{{ item.title }}</h3>
						<p class="desc">{{ item.desc }}</p>
					</div>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	name: 'Function',
	data() {
		return {
			functionList: [
				{
					icon: require('_a/images/home/function/delete.png'),
					title: '回收站功能',
					desc: '回收站可以轻松帮助找回误删文件，对回收站进行清理后文件才将彻底删除',
				},
				{
					icon: require('_a/images/home/function/type.png'),
					title: '多种文件分类 & 查看模式',
					desc: '支持以图片、文档、视频、音乐、其他五种分类查看文件；提供了列表、网格、时间线模式，网格模式下支持手动调整图标大小',
				},
				{
					icon: require('_a/images/home/function/search.png'),
					title: '全局搜索',
					desc: '支持搜索文件名，快速定位文件并可以打开文件所处位置',
				},
				{
					icon: require('_a/images/home/function/share.png'),
					title: '分享',
					desc: '支持分享文件，设置过期时间，自动生成提取码；可查看个人分享过的文件列表',
				},
				{
					icon: require('_a/images/home/function/operation.png'),
					title: '基本操作',
					desc: '上传文件，支持文件重命名、下载、删除、还原',
				},
				{
					icon: require('_a/images/home/function/preview.png'),
					title: '在线预览',
					desc: '支持图片、部分文档文档的在线查看功能在线预览',
				}
			]
		}
	}
}
</script>

<style lang="stylus" scoped>
@import '~_a/styles/varibles.styl'

.function-wrapper {
  margin-bottom: 40px;

  .function-title {
    padding: 60px 0;
    text-align: center;
    font-size: 28px;
  }

  .function-list {
    max-width: 1200px;
    margin: 0 auto;
    display flex
    flex-wrap wrap
    justify-content space-between
    list-style: none;
    .function-item {
      margin-bottom 24px
      width: 32%;
      .function-link {
        display: block;
        border-radius: 10px;
        background: #ecf5ff;
        width: 100%;
        height: 100%
        padding: 40px;
        text-align: center;
        &:hover {
          background linear-gradient(to right bottom, $Primary, #66b1ff)
          .content {
            .title,
            .desc {
              color #fff
            }
          }
        }
        .img-wrapper {
          border-radius 50%
          background #fff
          margin 0 auto
          padding 15px 0
          width: 100px;
          height 100px
          .img {
            width: 70px
            height 70px
          }
        }
        .content {
          margin-top: 32px;
          .title {
            margin 0 0 24px
            color: #333;
            font-weight: normal;
            font-size: 18px;
          }

          .desc {
            color: #808080;
          }
        }
      }
    }
  }
}
</style>
