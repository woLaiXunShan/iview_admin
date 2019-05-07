<template>
  <Breadcrumb>
    <BreadcrumbItem to="/">首页</BreadcrumbItem>
    <template v-for="item in $route.matched">
      <BreadcrumbItem v-if="$route.name !== 'home' && item.name !== ''" :key="item.name" :to="item.path">{{item.meta.title}}</BreadcrumbItem>
    </template>
  </Breadcrumb>
</template>

<script>
export default {
}
</script>
