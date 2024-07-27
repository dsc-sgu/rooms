<script lang="ts">
  import RoomView from '$lib/room-view.svelte';
  import Wrapper from '$lib/wrapper.svelte';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<Wrapper>
  <RoomView roomName={data.name} desks={data.desks} imgUrl={data.imgUrl} editorMode={false} />
</Wrapper>
