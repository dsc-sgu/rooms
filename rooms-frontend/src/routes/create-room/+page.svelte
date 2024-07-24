<script lang="ts">
  import UploadRoomImg from '$lib/upload-room-img.svelte';
  import Wrapper from '$lib/wrapper.svelte';

  let imageUrl: string | null = '123';
</script>

<Wrapper>
  <form class="mt-3 flex flex-col" slot="sidebar">
    <label for="room-name" class="text-white text-xl mb-2 font-bold">Имя комнаты:</label>
    <input type="text" id="room-name" class="p-2 font-medium rounded-lg outline-none" placeholder="" />
    <button
      type="submit"
      class="p-2 mt-3 bg-indigo-500 rounded-lg text-xl text-white enabled:hover:bg-indigo-400 disabled:opacity-75 transition duration-100 font-semibold"
      disabled
    >
      Создать комнату
    </button>
  </form>

  {#if imageUrl === null}
    <UploadRoomImg />
  {:else}
    <div class="h-full flex flex-col justify-center">
      <span class="text-4xl font-bold">Комната</span>
      <img src="/room.png" class="object-contain max-w-full max-h-full img-height w-auto h-auto mt-2" alt="room">
    </div>
  {/if}
</Wrapper>

<style>
  .img-height {
    max-height: calc(100% - 50px);
  }
</style>
