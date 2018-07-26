<template>
    <div>
        <template v-for="menu of menuList">
            <div style="text-align: center;"> 
                <Dropdown  transfer placement="right-start" :key="menu.name">
                    <Button style="width: 70px; margin-left: -5px; padding:10px 0;" type="text">
                        <Icon :size="iconSize" :color="iconColor" :type="menu.iconType"></Icon>
                    </Button>
                    <!-- 每一个menu下还有各自的分类 -->
                    <template v-if="menu.groups && !menu.members">
                        <DropdownMenu slot="list" v-for="(group, index) of menu.groups" :key="index" >
                            <Dropdown transfer placement="right-start" @on-click="changeMenu">
                                <DropdownItem style="width: 150px;">
                                    {{group.title}}
                                    <Icon type="ios-arrow-right"></Icon>
                                </DropdownItem>
                                <DropdownMenu slot="list">
                                    <DropdownItem v-for="member of group.members" :key="member.name" :name="member.name" style="width: 150px;">
                                        {{member.value}}
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </DropdownMenu>
                    </template>
                    <!-- 每一个menu下没有各自的分类 -->
                    <template v-else>
                        <DropdownMenu slot="list" v-for="(member, index) of menu.members" :key="index">
                            <DropdownItem style="width: 150px;">{{member.value}}</DropdownItem>
                        </DropdownMenu>
                    </template>
                </Dropdown>
            </div>
        </template>
    </div>

</template>

<script>
import { mapState } from 'vuex';
export default {
    data() {
        return {}
    },
    name: 'sidebarMenuShrink',
    props: {
        menuList: Array,
        iconSize: {
            type: Number,
            default: 20
        },
        iconColor: {
            type: String,
            default: 'white'
        }
    },
    computed: {

    },
    methods: {
        changeMenu(name) {
            this.$router.push('/' + name);
        }
    }
}
</script>