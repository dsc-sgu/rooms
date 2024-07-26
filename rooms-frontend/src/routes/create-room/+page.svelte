<script lang="ts">
  import UploadRoomImg from '$lib/upload-room-img.svelte';
  import Wrapper from '$lib/wrapper.svelte';
  import RoomView from '$lib/room-view.svelte';
  import type { Desk } from '$lib/desk';

  let imageUrl: string | null = '123';

  let desks: Desk[] = [];
</script>

<Wrapper>
  <form class="mt-3 flex flex-col" slot="sidebar">
    <label for="room-name" class="text-white text-xl mb-2 font-bold">Имя комнаты:</label>
    <input
      type="text"
      id="room-name"
      class="p-2 font-medium rounded-lg outline-none"
      placeholder=""
    />
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
    <RoomView roomName="Комната" {desks} imgUrl="/room.png" editorMode={true} />
  {/if}
</Wrapper>
