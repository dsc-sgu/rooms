<script lang="ts">
  import RoomView from '$lib/room-view.svelte';
  import Wrapper from '$lib/wrapper.svelte';
  import type { PageData } from './$types';

  export let data: PageData;

  let selectedDeskNum: number | null = null;
</script>

<Wrapper>
  <RoomView
    bind:selectedDeskNum
    roomName={data.name}
    desks={data.desks}
    imgUrl={data.imgUrl}
    editorMode={false}
  />
</Wrapper>
