<script>
  import UploadRoomImg from '$lib/upload-room-img.svelte';
  import Wrapper from '$lib/wrapper.svelte';
</script>

<Wrapper>
  <form class="mt-3 flex flex-col" slot="sidebar">
    <label for="room-name" class="text-white text-xl mb-2 font-bold">Имя комнаты:</label>
    <input type="text" id="room-name" class="p-2 font-medium rounded-lg outline-none" />
    <button
      type="submit"
      class="p-2 mt-3 bg-indigo-500 rounded-lg text-xl text-white hover:bg-indigo-400 transition duration-100 font-semibold"
      >Создать комнату</button
    >
  </form>

  <UploadRoomImg />
</Wrapper>
