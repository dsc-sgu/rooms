<script>
  import { goto } from '$app/navigation';
  import { browser } from '$app/environment';
  import Wrapper from '$lib/wrapper.svelte';

  if (browser) {
    goto('/create-room', {
      replaceState: true
    });
  }
</script>

<Wrapper />
