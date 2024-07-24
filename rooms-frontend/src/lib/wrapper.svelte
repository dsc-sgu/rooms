<script>
  import Sidebar from '$lib/sidebar.svelte';
</script>

<div class="flex">
  <div class="w-1/3 xl:w-1/4 2xl:w-1/5">
    <Sidebar>
      <slot name="sidebar"></slot>
    </Sidebar>
  </div>
  <div class="p-6 w-2/3 xl:w-3/4 2xl:w-4/5 flex justify-center items-center box-border h-screen">
    <slot></slot>
  </div>
</div>
