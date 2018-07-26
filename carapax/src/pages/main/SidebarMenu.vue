<style scoped>
    .layout-text {
        display: inline-block;
        white-space: nowrap;
    }
</style>

<template>
    <Menu accordion theme="dark" width="auto" :open-names="[openName]" :active-name="activeName" @on-select="routeTo">
        <Submenu v-for="menu of menuList" :key="menu.name" :name="menu.name">
            <template slot="title">
                <Icon :type="menu.iconType" :size="iconSize"></Icon>
                <span class="layout-text">{{menu.title}}</span>
            </template>
            <!-- 每一个menu下还有各自的分类 -->
            <template v-if="menu.groups && !menu.members">
                <MenuGroup v-for="(group, index) of menu.groups" :key="index" :title="group.title">
                    <MenuItem v-for="item of group.members" :key="item.name" :name="item.name">
                        <Icon v-if="item.iconType" :type="item.iconType" :size="iconSize"></Icon>
                        <span class="layout-text">{{item.value}}</span>
                    </MenuItem>
                </MenuGroup>
            </template>
            <!-- 每一个menu下没有各自的分类 -->
            <template v-else>
                <MenuItem v-for="item of menu.members" :key="item.name" :name="item.name">
                    <Icon v-if="item.iconType" :type="item.iconType" :size="iconSize"></Icon>
                    <span class="layout-text">{{item.value}}</span>
                </MenuItem>
            </template>
        </Submenu>
    </Menu>
</template>

<script>
import { mapState } from 'vuex';
export default {
    data() {
        return {}
    },
    name: 'sidebarMenu',
    props: {
        menuList: Array,
        iconSize: {
            type: Number,
            default: 14
        }
    },
    computed: {
        activeName() {
            return this.$route.meta.activeName.replace('/','');
        },
        openName() {
            return this.$route.meta.type;
        }
    },
    methods: {
        routeTo(e) {
            this.$router.push(e);
        }
    }
}
</script>